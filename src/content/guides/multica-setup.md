---
title: "Multica 私有化部署指南：Docker Compose、daemon、登录与生产加固（2026）"
description: "想把 multica-ai/multica 部署到自己的服务器或内网？本文按官方最新自托管路径，讲清 Docker Compose 快速安装、手动部署、登录验证码、Caddy/Nginx 反代、daemon 接入、Kubernetes 方案、升级与安全边界。"
date: "2026-05-19"
updated_at: "2026-06-06"
article_type: "howto"
tags: ["multica", "agent-platform", "agent-collaboration", "self-hosted", "private-deployment", "docker", "kubernetes", "open-source", "setup"]
pillar: workflow
content_status: keep
locale_strategy: mirrored
draft: false
faq:
  - q: "Multica 私有化部署需要多大服务器？"
    a: |
      服务器主要跑 frontend、backend、PostgreSQL 17 + pgvector 和 WebSocket 协调层。小团队试用通常 2 核 4G 就能起步；真正消耗 CPU、模型额度和磁盘的是每个开发者本机或自有云机器上的 daemon。
  - q: "Agent daemon 能不能放进 Docker 一起跑？"
    a: |
      官方架构把 daemon 放在每个执行机器上，而不是放进 Multica server 容器里。daemon 需要访问本机的代码仓库、Git 凭据、Claude Code / Codex / Copilot / Cursor Agent 等 CLI 登录状态，并在隔离工作目录里执行任务。
  - q: "没有邮件服务也能登录吗？"
    a: |
      可以。未配置 Resend 或 SMTP 时，验证码会打印到 backend 日志，适合单机测试或内网试跑。生产环境建议接 Resend 或企业 SMTP；不要在公网实例上启用固定 `MULTICA_DEV_VERIFICATION_CODE`。
  - q: "Multica 是 MIT 开源吗？能直接拿来做商业托管吗？"
    a: |
      不是纯 MIT。官方 LICENSE 写明它是 modified Apache 2.0：单个组织内部使用通常不需要商业许可，但用 Multica 源码对第三方提供托管服务，或作为商业产品组件嵌入分发，需要先确认额外许可条件。
---

[Multica](/zh/tool/multica) 是一个面向「人类 + 编程 Agent 团队」的开源管理层：你可以像分配给同事一样把 Issue 派给 Agent，看它认领任务、执行、报告阻塞、写评论、更新状态。它和直接打开 Claude Code、Codex 或 Cursor Agent 最大的区别是：**Multica 管任务、身份、队列、实时进度和团队 Skills；真正写代码的 agent CLI 仍运行在你的机器或自有运行环境里。**

这篇指南专门讲私有化部署，不做泛泛产品介绍。目标是让你知道：

- 怎样按官方推荐路径跑起一个自托管 Multica。
- 生产环境哪些变量必须改，哪些地方最容易导致登录或 WebSocket 失败。
- daemon 应该部署在哪里，如何接入自托管服务。
- 什么时候用 Docker Compose，什么时候再考虑 Kubernetes。
- license、邮件、注册、备份、升级这些上线前的边界怎么判断。

## 先说结论

个人试用或 2-10 人小团队，建议从官方两条命令开始：

```bash
# 1. 安装 CLI，并在本机拉起自托管 server
curl -fsSL https://raw.githubusercontent.com/multica-ai/multica/main/scripts/install.sh | bash -s -- --with-server

# 2. 配置 CLI、浏览器登录并启动 daemon
multica setup self-host
```

跑完后默认服务是：

```text
Frontend: http://localhost:3000
Backend:  http://localhost:8080
```

如果你要放到团队内网或公网域名下，最小生产形态应该是：

```text
Browser / CLI login
        |
        v
HTTPS: https://multica.example.com
        |
        v
Caddy / Nginx reverse proxy
        |
        +--> frontend: localhost:3000
        +--> backend + WebSocket: localhost:8080
        |
        v
PostgreSQL 17 + pgvector

Developer laptops / build boxes
        |
        v
multica daemon + Claude Code / Codex / Copilot / Cursor Agent / OpenCode ...
```

关键点：**Multica server 不应该被理解成“集中跑所有 Agent 的机器”。** 它是调度和协作面板；daemon 才是实际执行 runtime。

## 私有化部署前先判断是否适合

适合：

- 团队已经用 Issue / Kanban 管开发任务，想把 Agent 变成可分配的 assignee。
- 希望多台机器、多种 agent CLI 接到一个统一看板。
- 需要把任务状态、评论、运行轨迹、Skills 沉淀在自己的数据库里。
- 不想把任务编排和运行时管理交给第三方托管平台。

不适合：

- 你只是个人偶尔跑一次 Claude Code / Codex，直接用 CLI 更轻。
- 团队没有人愿意维护 Docker、域名、HTTPS、邮件、备份、升级。
- 想把 Multica 改成对外商业 SaaS。官方 license 对 hosted / embedded service 有额外限制，先做法务和商业授权确认。

## Multica 的三层架构

官方自托管文档把 Multica 拆成三块：

| 层 | 做什么 | 私有化部署关注点 |
|---|---|---|
| Frontend | Next.js Web 应用 | 域名、HTTPS、`FRONTEND_ORIGIN`、静态资源 |
| Backend | Go REST API + WebSocket | `JWT_SECRET`、CORS、WebSocket、邮件、注册控制、上传 |
| Database | PostgreSQL 17 + pgvector | 持久化、备份、迁移、连接数 |

每个要执行 Agent 的用户还需要安装 `multica` CLI，并在自己的机器上运行 daemon。daemon 会扫描 PATH 上的 agent CLI，并把可用 runtime 注册到 server。

官方 README 当前列出的自动检测命令包括：

```text
claude, codex, copilot, openclaw, opencode, hermes,
gemini, pi, cursor-agent, kimi, kiro-cli, agy
```

也就是说，Multica 不替代这些工具；它给这些工具提供任务队列、身份、Issue 面板和进度流。

## 方式一：官方快速安装

这是最适合试用和单机内网验证的路径：

```bash
curl -fsSL https://raw.githubusercontent.com/multica-ai/multica/main/scripts/install.sh | bash -s -- --with-server
multica setup self-host
```

这会完成几件事：

1. 安装 `multica` CLI。
2. 获取 self-host 资源。
3. 从 GHCR 拉取官方 frontend / backend / PostgreSQL 镜像。
4. 按 localhost 默认配置启动服务。
5. 通过 `multica setup self-host` 打开浏览器登录、保存 token、发现 workspace 并启动 daemon。

如果机器上只需要 CLI，不需要部署 server，可以用 Homebrew：

```bash
brew install multica-ai/tap/multica
```

## 方式二：手动 Docker Compose 部署

如果你想显式管理仓库、版本、`.env` 和 compose 文件，用手动路径：

```bash
git clone https://github.com/multica-ai/multica.git
cd multica
make selfhost
```

`make selfhost` 会从 `.env.example` 生成 `.env`，创建随机 `JWT_SECRET`，并通过 `docker-compose.selfhost.yml` 启动服务。默认拉 GHCR 最新稳定镜像。

如果 GHCR tag 尚未发布，或你要从当前 checkout 构建：

```bash
make selfhost-build
```

如果你偏好完全手动：

```bash
git clone https://github.com/multica-ai/multica.git
cd multica
cp .env.example .env

# 至少替换 JWT_SECRET
openssl rand -hex 32

docker compose -f docker-compose.selfhost.yml pull
docker compose -f docker-compose.selfhost.yml up -d
```

健康检查：

```bash
curl http://localhost:8080/health
curl http://localhost:8080/readyz
```

`/health` 只适合基础存活探测；`/readyz` / `/healthz` 会检查数据库和迁移状态，更适合部署平台 readiness probe。

## 登录、邮件和注册控制

Multica 登录依赖邮箱验证码。私有化部署时有三种选择：

| 方式 | 适合场景 | 注意 |
|---|---|---|
| Resend | 公网或云上部署 | 配 `RESEND_API_KEY`、`RESEND_FROM_EMAIL` |
| SMTP | 企业内网 / 私有邮件系统 | 配 `SMTP_HOST`、`SMTP_PORT`、TLS 相关变量 |
| backend 日志验证码 | 本机试跑 / 一次性测试 | 不适合长期生产 |

官方 advanced 文档说明：如果既没有 Resend 也没有 SMTP，验证码会打印到 server log。Docker self-host stack 默认 `APP_ENV=production`，没有固定验证码。

本机测试可以设置：

```bash
APP_ENV=development
MULTICA_DEV_VERIFICATION_CODE=888888
```

但这只适合非公网的短期测试。公网或团队实例不要这么做。

上线后建议按这个顺序锁住 workspace 创建：

1. 首次启动时保持 `DISABLE_WORKSPACE_CREATION=false`。
2. 管理员登录并创建共享 workspace。
3. 设置 `DISABLE_WORKSPACE_CREATION=true` 并重启 backend。
4. 如需禁止新账号注册，再设置 `ALLOW_SIGNUP=false`。

注意：`ALLOW_SIGNUP=false` 会阻止所有新账号创建，包括已经收到邀请但还没注册的人。很多团队更适合保留 `ALLOW_SIGNUP=true`，配合 `ALLOWED_EMAIL_DOMAINS` / `ALLOWED_EMAILS`，再单独禁用 workspace 创建。

## 生产反代：Caddy 单域名最省心

官方 advanced 文档推荐 Caddy。单域名部署时，前端和 backend 共用一个域名，`/ws` 单独转到 backend：

```text
multica.example.com {
    @multica_ws path /ws /ws/*
    handle @multica_ws {
        reverse_proxy localhost:8080 {
            flush_interval -1
        }
    }

    reverse_proxy localhost:3000
}
```

同时在 backend `.env` 里设置：

```bash
FRONTEND_ORIGIN=https://multica.example.com
CORS_ALLOWED_ORIGINS=https://multica.example.com
```

这是很多自托管实例的第一处坑：页面 HTTP 请求可能正常，但实时评论、任务进度、通知不动。原因通常是 WebSocket `Origin` 没进 allowlist，backend 会拒绝升级请求。

## Nginx 分域名部署

如果你想拆成 `app.example.com` 和 `api.example.com`：

```nginx
server {
    listen 443 ssl;
    server_name app.example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

server {
    listen 443 ssl;
    server_name api.example.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /ws {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_read_timeout 86400;
    }
}
```

对应 backend 配置：

```bash
FRONTEND_ORIGIN=https://app.example.com
CORS_ALLOWED_ORIGINS=https://app.example.com
```

如果你从源码构建 web image，还需要把 public API / WebSocket 地址烘进前端构建：

```bash
REMOTE_API_URL=https://api.example.com
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_WS_URL=wss://api.example.com/ws
```

## daemon 接入自托管 server

每个要执行 Agent 的开发者或运行机都需要：

```bash
brew install multica-ai/tap/multica
multica setup self-host \
  --server-url https://api.example.com \
  --app-url https://app.example.com
```

单域名反代时可以按你的实际 backend 入口填写；本机默认则不用参数：

```bash
multica setup self-host
```

检查 daemon：

```bash
multica daemon status
multica daemon logs -f
```

daemon 默认后台运行，日志在 `~/.multica/daemon.log`。如果要调试：

```bash
multica daemon start --foreground
```

常用运行时变量：

| 变量 | 用途 |
|---|---|
| `MULTICA_DAEMON_MAX_CONCURRENT_TASKS` | 限制单 daemon 并发任务数 |
| `MULTICA_WORKSPACES_ROOT` | 指定任务工作目录根路径 |
| `MULTICA_CODEX_PATH` / `MULTICA_CLAUDE_PATH` | 指定 agent CLI 路径 |
| `MULTICA_CODEX_MODEL` / `MULTICA_CLAUDE_MODEL` | 覆盖模型选择 |
| `MULTICA_DAEMON_POLL_INTERVAL` | 调整轮询间隔 |
| `MULTICA_DAEMON_HEARTBEAT_INTERVAL` | 调整心跳间隔 |

daemon 会为任务创建隔离 workdir，并有垃圾回收机制清理已完成或取消任务的目录和可再生成构建产物。生产运行机上建议把 `MULTICA_WORKSPACES_ROOT` 放到容量可控、可监控的磁盘上。

## Kubernetes 什么时候值得上

如果你已经有 k3s / Kubernetes、Ingress controller 和默认 `ReadWriteOnce` StorageClass，可以用官方 Helm chart：

```bash
kubectl create namespace multica

kubectl -n multica create secret generic multica-secrets \
  --from-literal=JWT_SECRET="$(openssl rand -hex 32)" \
  --from-literal=POSTGRES_PASSWORD="$(openssl rand -hex 16)" \
  --from-literal=RESEND_API_KEY="" \
  --from-literal=GOOGLE_CLIENT_SECRET="" \
  --from-literal=CLOUDFRONT_PRIVATE_KEY="" \
  --from-literal=MULTICA_DEV_VERIFICATION_CODE=""

helm install multica oci://ghcr.io/multica-ai/charts/multica \
  --version <chart-version> \
  -n multica
```

几个要点：

- chart 会创建 PostgreSQL、backend、frontend、两个 Ingress 和 ConfigMap。
- `multica-secrets` 不由 chart 管理，需要你先用 `kubectl` 创建。
- 预构建 web image 里有 `REMOTE_API_URL=http://backend:8080` 的兼容假设，官方提醒一个 namespace 里通常只跑一个 Multica release。
- daemon 仍然运行在开发者机器或自有运行机上，不运行在这个 chart 里。

小团队没有现成 K8s 的话，不建议为了 Multica 专门上集群。Docker Compose + 反代 + 备份更容易维护。

## 上传、附件和私有对象存储

默认 Docker Compose 可以先用本地持久卷。生产环境如果会上传附件、日志或 artifacts，建议尽早考虑 S3 兼容存储：

```bash
S3_BUCKET=my-bucket
S3_REGION=us-west-2
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_ENDPOINT_URL=https://s3-compatible.example.com
ATTACHMENT_DOWNLOAD_MODE=proxy
```

如果对象存储只在内网可访问，`ATTACHMENT_DOWNLOAD_MODE=proxy` 往往比公开 presigned URL 更好控。用 CloudFront 时再配置 `CLOUDFRONT_DOMAIN`、`CLOUDFRONT_KEY_PAIR_ID`、`CLOUDFRONT_PRIVATE_KEY`。

## 监控、备份和升级

上线前至少做四件事：

1. **备份 PostgreSQL**：Issue、workspace、agent、task、usage rollup 都在数据库里。
2. **保留 `.env` / Secret**：尤其是 `JWT_SECRET`、数据库密码、邮件凭据、对象存储凭据。
3. **监控 readiness**：用 `/readyz` 或 `/healthz`，不要只看 frontend 端口。
4. **限制 metrics 暴露**：`METRICS_ADDR` 默认关闭；如果启用 Prometheus，只绑定内网或加访问控制。

Docker Compose 升级：

```bash
docker compose -f docker-compose.selfhost.yml pull
docker compose -f docker-compose.selfhost.yml up -d
```

想锁版本，在 `.env` 里 pin：

```bash
MULTICA_IMAGE_TAG=v0.3.17
```

迁移会在 backend 启动时自动运行。官方文档特别提到：从 `v0.3.4` 升到 `v0.3.5+` 时，早期版本可能遇到 usage rollup 迁移保护；当前版本已在 migrate 流程里自动做 backfill。如果你维护的是旧二进制，遇到 `refusing to drop legacy daily rollups`，再按官方 advanced 文档运行 `backfill_task_usage_hourly`。

## 常见故障

| 现象 | 优先检查 |
|---|---|
| 页面能打开，但实时进度不动 | `/ws` 是否正确反代；`CORS_ALLOWED_ORIGINS` 是否包含浏览器 origin |
| 登录收不到验证码 | Resend / SMTP 配置；backend logs 里是否有 `[DEV] Verification code` |
| `make selfhost` 拉镜像失败 | GHCR 可达性；改用 `make selfhost-build` |
| daemon 不显示 runtime | agent CLI 是否在 PATH；`multica daemon logs -f` |
| agent 被分配后不执行 | daemon 是否登录同一个 workspace；本地 Claude/Codex/Copilot 是否已登录或配置 API key |
| LAN IP 打开页面异常 | `FRONTEND_ORIGIN` / `CORS_ALLOWED_ORIGINS` 改为实际 LAN origin；WebSocket 需反代或重建 web image |
| 升级后 dashboard usage 异常 | 检查 `sys_cron_executions` 和官方 usage rollup 文档 |

## 上线清单

- [ ] `JWT_SECRET` 已替换为随机值。
- [ ] PostgreSQL 持久卷或外部数据库已备份。
- [ ] 配置 Resend 或 SMTP，而不是依赖日志验证码。
- [ ] 公网实例没有启用固定 `MULTICA_DEV_VERIFICATION_CODE`。
- [ ] `FRONTEND_ORIGIN` / `CORS_ALLOWED_ORIGINS` 与实际域名一致。
- [ ] `/ws` WebSocket 路由经过反代并关闭不必要 buffering。
- [ ] 首个 workspace 创建后，按需设置 `DISABLE_WORKSPACE_CREATION=true`。
- [ ] 用 `ALLOW_SIGNUP` / `ALLOWED_EMAIL_DOMAINS` / `ALLOWED_EMAILS` 控制注册范围。
- [ ] daemon 运行机有足够磁盘，并设置合适的 `MULTICA_WORKSPACES_ROOT`。
- [ ] 确认 license 只用于组织内部私有化；对外托管或商业嵌入先确认授权。

## 什么时候该选 Multica

如果你要的是一个「多人 + 多 Agent + 多 runtime」的项目管理层，Multica 是目前最直接的选择：Issue 面板、assignee、runtime health、任务队列、实时输出、Skills 复用都围绕交付工作设计。

如果你只是想在一个终端里多跑几个 Claude Code / Codex session，Multica 可能偏重；可以先看更轻的本地 session 管理工具。反过来，如果你已经有团队工作流、想让 Agent 进入同一个看板，并且愿意维护私有化基础设施，Multica 的价值会明显放大。

## 参考资料

- [multica-ai/multica GitHub README](https://github.com/multica-ai/multica)
- [Multica Self-Hosting Guide](https://github.com/multica-ai/multica/blob/main/SELF_HOSTING.md)
- [Multica Advanced Self-Hosting Configuration](https://github.com/multica-ai/multica/blob/main/SELF_HOSTING_ADVANCED.md)
- [Multica CLI and Agent Daemon Guide](https://github.com/multica-ai/multica/blob/main/CLI_AND_DAEMON.md)
- [Multica LICENSE](https://github.com/multica-ai/multica/blob/main/LICENSE)
- [How Multica works](https://multica.ai/docs/how-multica-works)

数据核查截止：2026-06-06。
