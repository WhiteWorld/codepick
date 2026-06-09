---
title: "自建 AI 编程中转站：sub2api 部署与 Claude Code / Codex / Gemini 接入指南"
description: "想自己搭建 Claude Code、Codex、Gemini CLI 的 API 中转站？本文以 Wei-Shaw/sub2api 为例，讲清楚适用场景、部署架构、Docker Compose 安装、Nginx 配置、Simple Mode、安全边界和风险提醒。"
date: "2026-05-28"
updated_at: "2026-05-28"
article_type: howto
tags: ["sub2api", "api-relay", "claude-code", "codex", "gemini-cli", "self-hosted", "docker"]
pillar: plans
content_status: keep
locale_strategy: mirrored
draft: false
---

## 先说结论

如果你只是个人偶尔用 Claude Code / Codex / Gemini CLI，**不建议一上来就自建中转站**。买一个靠谱的 API 中转站、小额试用、随用随走，运维成本最低。

但如果你已经遇到下面这些问题，自建就开始有价值：

- 团队里多人共享 Claude / Codex / Gemini 等订阅或账号额度，需要统一分发 API Key。
- 想知道每个人、每个项目、每个工具到底消耗了多少 token。
- 想做并发限制、速率限制、账号池调度，避免一个人把额度打爆。
- 不想把内部代码和 prompt 交给第三方中转站。
- 想把 [Claude Code](/zh/tool/claude-code)、[Codex](/zh/tool/codex)、[Gemini CLI](/zh/tool/gemini-cli)、[Antigravity](/zh/tool/antigravity) 等工具统一接入同一个网关。

[Wei-Shaw/sub2api](https://github.com/Wei-Shaw/sub2api) 就是为这类场景准备的。它不是普通的 OpenAI 兼容转发器，而是一个偏「订阅配额分发」的 AI API Gateway：上游可以接 OAuth / API Key，平台给用户发自己的 API Key，并负责鉴权、计费、负载均衡和请求转发。

一句话：**sub2api 适合内部团队自用，不适合新手拿来无脑公开商业化。**

---

## sub2api 是什么？

官方 README 对它的定位是：**AI API Gateway Platform for Subscription Quota Distribution**。中文可以理解为：面向 AI 订阅额度分发管理的 API 网关。

它的核心能力包括：

| 能力 | 解决什么问题 |
|---|---|
| 多账号管理 | 管理多个上游账号，支持 OAuth、API Key 等类型 |
| API Key 分发 | 给团队成员生成独立 Key，而不是共享上游密钥 |
| Token 级计费 | 按 token 追踪用量和成本 |
| 智能调度 | 在多个上游账号之间选择，支持粘性会话 |
| 并发控制 | 限制单用户、单账号并发，避免把账号打挂 |
| 速率限制 | 配置请求速率和 token 速率 |
| 内置支付 | 支持 EasyPay、支付宝、微信、Stripe 等自助充值场景 |
| 管理后台 | 通过 Web UI 监控用户、账号、请求和用量 |

技术栈也比较标准：后端 Go + Gin + Ent，前端 Vue 3 + Vite + TailwindCSS，数据库 PostgreSQL 15+，缓存 / 队列 Redis 7+，并提供 Docker 部署。

---

## 适合谁，不适合谁？

### 适合

**1. 小团队内部共享额度。**  
比如 3-10 人团队买了 Claude / Codex / Gemini 相关订阅或 API 额度，不想把上游账号直接发给所有人，希望每个人拿自己的内部 Key。

**2. 想做成本分摊。**  
sub2api 有 token 级用量追踪和余额 / 计费能力，适合统计「谁用了多少」「哪个项目烧钱最多」。

**3. 企业或工作室重视数据路径。**  
第三方中转站理论上可以看到你的请求内容。自建至少能把网关、日志、数据库掌握在自己手里。

**4. 需要多账号调度。**  
当单个上游账号有并发或速率限制时，账号池 + 粘性会话 + 并发控制会比手工切 Key 稳定很多。

### 不适合

**1. 完全没有服务器维护经验。**  
你至少要会管理 Linux、Docker、域名、HTTPS、备份、日志和防火墙。

**2. 只是想省钱。**  
自建并不等于免费。服务器、域名、维护、安全事故、账号风险，都是真成本。

**3. 想公开卖服务但不懂合规。**  
README 的免责声明明确提醒：使用项目可能违反 Anthropic 等上游服务条款，账号封禁、服务中断等风险由使用者自担。把它公开商业化之前，一定先搞清楚上游条款、主体资质、发票、隐私政策和数据处理责任。

---

## 推荐架构

最小可用架构：

```text
Claude Code / Codex / Gemini CLI
        |
        v
HTTPS 域名，例如 https://relay.example.com
        |
        v
Nginx / Caddy 反向代理
        |
        v
sub2api
        |
        +--> PostgreSQL：用户、Key、账号、账单
        +--> Redis：缓存、队列、状态
        |
        v
上游 Claude / Codex / Gemini / Antigravity / OpenAI 兼容服务
```

个人或内部团队建议先从 **Docker Compose + HTTPS + 内网后台访问** 开始。不要一开始就做公开注册、支付、代理分销和复杂套餐。

---

## 部署方式怎么选？

sub2api 官方 README 提供三种方式：

| 方式 | 适合谁 | 备注 |
|---|---|---|
| 脚本安装 | 想用 systemd 管理单机服务的人 | 需要提前准备 PostgreSQL 和 Redis |
| Docker Compose | 大多数自建用户 | 官方推荐，包含 PostgreSQL 和 Redis 容器 |
| 源码构建 | 要二次开发的人 | 需要 Go、Node.js、pnpm、PostgreSQL、Redis |

我建议普通用户选 Docker Compose。它更容易迁移和备份，也更适合放在一台轻量 VPS 上跑。

---

## Docker Compose 快速部署

官方 README 给的自动化流程大概是：

```bash
mkdir -p sub2api-deploy
cd sub2api-deploy

curl -sSL https://raw.githubusercontent.com/Wei-Shaw/sub2api/main/deploy/docker-deploy.sh | bash

docker compose up -d
docker compose logs -f sub2api
```

这个脚本会下载 `docker-compose.local.yml` 和 `.env.example`，生成 `.env`，并自动生成 `JWT_SECRET`、`TOTP_ENCRYPTION_KEY`、`POSTGRES_PASSWORD` 等密钥。

如果你偏好手工部署，可以：

```bash
git clone https://github.com/Wei-Shaw/sub2api.git
cd sub2api/deploy

cp .env.example .env
```

然后编辑 `.env`：

```bash
POSTGRES_PASSWORD=your_secure_password_here
JWT_SECRET=your_jwt_secret_here
TOTP_ENCRYPTION_KEY=your_totp_key_here
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
SERVER_PORT=8080
```

生成密钥可以用：

```bash
openssl rand -hex 32
```

启动：

```bash
mkdir -p data postgres_data redis_data
docker compose -f docker-compose.local.yml up -d
docker compose -f docker-compose.local.yml ps
docker compose -f docker-compose.local.yml logs -f sub2api
```

浏览器打开：

```text
http://YOUR_SERVER_IP:8080
```

生产环境不要直接暴露 8080，应该放到 HTTPS 反向代理后面。

---

## Nginx 反向代理注意事项

如果你用 Nginx，并且要支持 Codex CLI 或依赖粘性会话的多账号调度，需要在 `http` block 里加：

```nginx
underscores_in_headers on;
```

原因是 Nginx 默认会丢弃带下划线的 header，例如 `session_id`。sub2api README 明确提醒：这会破坏多账号场景下的 sticky session routing。

一个极简反代示例：

```nginx
http {
  underscores_in_headers on;

  server {
    listen 443 ssl http2;
    server_name relay.example.com;

    ssl_certificate /etc/letsencrypt/live/relay.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/relay.example.com/privkey.pem;

    client_max_body_size 50m;

    location / {
      proxy_pass http://127.0.0.1:8080;
      proxy_http_version 1.1;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
      proxy_buffering off;
    }
  }
}
```

如果你不想维护 Nginx，Caddy 也可以，但要确认它不会破坏工具需要的 header 和 streaming。

---

## Simple Mode：内部自用优先考虑

sub2api 有一个 Simple Mode，官方说明它适合个人开发者或内部团队快速访问，不启用完整 SaaS 功能和计费流程。

启用方式：

```bash
RUN_MODE=simple
SIMPLE_MODE_CONFIRM=true
```

我的建议是：**内部团队先用 Simple Mode 跑通，再决定要不要开放注册、余额、支付和套餐。**

原因很简单：多数团队一开始要解决的不是「卖服务」，而是「让自己人稳定用、看得见用量、别互相抢额度」。Simple Mode 更符合这个目标。

---

## 接入 Claude Code / Codex / Gemini CLI

不同上游和不同客户端的环境变量不完全一样，下面只给通用思路，最终以 sub2api 后台和客户端文档为准。

### Claude Code

如果你暴露的是 Anthropic 兼容路径，常见配置形式是：

```bash
export ANTHROPIC_BASE_URL="https://relay.example.com"
export ANTHROPIC_API_KEY="sk-your-sub2api-key"

claude
```

如果使用 Antigravity 专用 endpoint，README 示例是：

```bash
export ANTHROPIC_BASE_URL="http://localhost:8080/antigravity"
export ANTHROPIC_AUTH_TOKEN="sk-xxx"
```

实际部署时请把 `localhost:8080` 换成你的 HTTPS 域名。

### OpenAI 兼容客户端 / Codex 相关工具

很多工具读取的是 OpenAI 兼容变量：

```bash
export OPENAI_BASE_URL="https://relay.example.com/v1"
export OPENAI_API_KEY="sk-your-sub2api-key"
```

有些工具使用 `OPENAI_API_BASE`，有些使用 `OPENAI_BASE_URL`。不要硬猜，按具体工具文档来。

### Gemini CLI

Gemini 相关客户端可能使用 Google 原生路径，也可能通过兼容层接入。sub2api README 提到 Antigravity 账号有 `/v1beta/` Gemini endpoint；如果你走这条路，要把 Claude 和 Gemini 的路径、账号组和上下文隔离清楚。

特别注意：README 提醒 Anthropic Claude 和 Antigravity Claude 不能混在同一个会话上下文里，需要用 groups 隔离。

---

## 安全加固清单

自建网关最容易犯的错，是部署跑起来就直接公开。至少做完这些再长期使用：

1. **必须启用 HTTPS。**  
   不要在生产环境用 HTTP 传 API Key 和代码内容。

2. **后台不要裸奔。**  
   管理后台建议限制 IP、加 Basic Auth、放内网，或者至少启用强密码和 2FA。

3. **密钥不要进 Git。**  
   `.env`、数据库备份、日志压缩包都不要提交到仓库。

4. **日志要脱敏。**  
   不要长期保存完整 prompt、代码片段、API Key、上游响应 header。

5. **做备份，但备份也要加密。**  
   PostgreSQL 数据里会有用户、Key、账号和账单信息。

6. **限制注册和充值。**  
   内部使用时不要开放公开注册。支付功能先关掉，等你真的需要 SaaS 化再开。

7. **设置限流和并发。**  
   给每个用户、每个账号设置合理的 RPM、TPM、并发上限，防止误操作烧光额度。

8. **只允许可信上游域名。**  
   sub2api README 提到 `security.url_allowlist`、CORS、response headers、billing circuit breaker、trusted proxies、Turnstile 等配置。生产环境不要随意关闭 URL 校验，更不要允许任意 HTTP 上游。

---

## 备份与升级

如果你使用 `docker-compose.local.yml`，官方 README 建议数据存储在本地目录，迁移会更容易。

升级：

```bash
docker compose -f docker-compose.local.yml pull
docker compose -f docker-compose.local.yml up -d
```

备份前先停服务：

```bash
docker compose -f docker-compose.local.yml down
cd ..
tar czf sub2api-complete.tar.gz sub2api-deploy/
```

恢复：

```bash
tar xzf sub2api-complete.tar.gz
cd sub2api-deploy/
docker compose -f docker-compose.local.yml up -d
```

生产环境建议做定期 PostgreSQL 备份，而不是只靠整目录压缩。

---

## 和 OneAPI / New API / CRS 怎么选？

| 方案 | 更适合 |
|---|---|
| sub2api | 订阅额度分发、用户 Key、账号池、计费、Claude Code / Codex / Gemini 等编程工具中转 |
| OneAPI / New API | 通用模型聚合、OpenAI 兼容 API、多模型路由 |
| claude-relay-service / CRS | Claude Code 场景更专一的 relay |
| 商业中转站 | 不想运维，只想开箱即用 |

如果你要的是「内部团队统一入口 + 成本统计 + 账号池调度」，sub2api 更对味。  
如果你要的是「接入很多模型做应用开发」，OneAPI / New API 可能更直观。  
如果你只服务 Claude Code，一个更轻的 CRS 类项目也可能够用。

---

## 最小落地路线

第一次自建不要贪多，按这个顺序来：

1. 准备一台干净 VPS，开放 80 / 443，后台端口不公网暴露。
2. 用 Docker Compose 部署 sub2api。
3. 配 HTTPS 反向代理，并确认 streaming 正常。
4. 创建管理员账号，关闭公开注册。
5. 添加一个上游账号或 API Key。
6. 给自己生成一个内部 API Key。
7. 用 Claude Code 或 Codex 跑一个低风险测试任务。
8. 配置用户级限流和并发。
9. 观察日志和用量统计 1-2 天。
10. 再邀请团队成员接入。

这个顺序慢一点，但能避开大多数「刚搭好就把账号打爆」「后台暴露」「Key 泄露」的问题。

---

## 风险提醒

这类工具的边界一定要讲清楚：

- **上游条款风险**：README 明确提醒，使用项目可能违反 Anthropic 等服务条款。是否允许订阅额度转 API、是否允许共享、是否允许转售，都要以官方条款为准。
- **账号风控风险**：多用户共享、异常并发、跨地域流量、频繁切换上下文，都可能触发上游风控。
- **数据安全风险**：自建网关能减少第三方中转站风险，但网关管理员仍然可能看到请求内容。
- **运维风险**：Redis / PostgreSQL / Docker / Nginx / HTTPS / 备份任何一环出问题，都可能导致团队不可用。
- **商业化风险**：如果公开售卖，你需要承担用户数据、支付、发票、客服、退款、合规和上游账号稳定性的责任。

所以 CodePick 的建议是：**先内部自用，后评估扩展；先小流量验证，后接入核心工作流。**

---

## 官方链接

- [Wei-Shaw/sub2api GitHub 仓库](https://github.com/Wei-Shaw/sub2api)
- [sub2api 英文 README](https://github.com/Wei-Shaw/sub2api/blob/main/README.md)
- [sub2api 中文 README](https://github.com/Wei-Shaw/sub2api/blob/main/README_CN.md)
- 延伸阅读：[AI 编程 API 中转站选型指南](/zh/compare/api-relay-guide/)
