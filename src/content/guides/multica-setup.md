---
title: "Multica 配置指南：开源自托管的多 Agent 项目管理平台（2026）"
description: "Multica 把 AI Agent 拉进 Issue 面板，像团队成员一样派活、追踪进度。本文 15 分钟带你跑通：Docker 一键自托管 → 启动 daemon 自动识别 11 种 Agent CLI → 创建 Issue 派给 Agent → 抽象出可复用 Skills。"
date: "2026-05-19"
updated_at: "2026-05-19"
article_type: "howto"
tags: ["multica", "agent-platform", "agent-collaboration", "self-hosted", "docker", "open-source", "setup"]
draft: false
faq:
  - q: "Multica 自托管需要多少资源？"
    a: |
      最低 2 核 4G 内存的服务器就能跑（postgres + 后端 + 前端 + WebSocket，全部 Docker Compose）。
      Agent 执行**不在 Multica 服务器上**——它跑在你的开发机/同事电脑上，所以服务器只承载协调和数据库，资源压力很小。
  - q: "为什么 daemon 不放进 Docker？"
    a: |
      因为 daemon 要执行 Agent CLI（claude / codex / openclaw 等），需要直接访问开发者本地的代码仓库和 CLI 工具。
      塞进容器会破坏「代码不出本机」的隐私边界，也让 CLI 状态难以维护。daemon 跑本机 + 服务器跑 Docker 是清晰的分工。
  - q: "Multica 的 Skills 系统跟 Claude Code 的 Skills 是一回事吗？"
    a: |
      不是。Claude Code Skills 是单 Agent 的能力封装；Multica Skills 是**跨 Agent 共享**的可复用工作流（部署、写迁移、Code Review 等）。
      写好一次，团队所有 Agent 都能调用——这是 Multica 区别于 Slock 的核心竞争力。
  - q: "国内能用吗？"
    a: |
      可以。Multica 是 MIT 开源，国内服务器直接 Docker Compose 部署即可，无需翻墙。
      Agent 执行也在本地，模型可以走方舟 / 百炼 / DeepSeek 等国内 API。整个链路都能国内闭环。
---

[Multica](/zh/tool/multica) 是开源的「Agent 项目管理平台」——把 Claude Code / OpenCode / Codex 等 Agent 拉进 Issue 面板，像团队成员一样派活、看进度。最大卖点是 **Skills 系统**（跨 Agent 复用工作流）和 **11 种 Runtime 支持**（覆盖面最广）。本文带你 15 分钟跑通自托管。

## 谁该看

- 团队习惯用 GitHub Issues / Jira / Linear，想让 Agent 无缝融入这套工作流
- 希望积累可复用 Agent 能力（部署 / 测试 / 审查可固化为 Skills）
- 重视数据隐私 + 想自托管的开发团队
- 同时用多种 Agent CLI（Claude Code + Codex + OpenClaw 等混合栈）

## TL;DR

```bash
# 一行命令：装 CLI + 拉起自托管服务（推荐）
curl -fsSL https://raw.githubusercontent.com/multica-ai/multica/main/scripts/install.sh \
  | bash -s -- --with-server

# Web 界面：http://localhost:3000
# daemon 自动检测：claude / codex / copilot / openclaw / opencode /
#                  hermes / gemini / pi / cursor-agent / kimi / kiro-cli
```

---

## 前置要求

- Docker + Docker Compose（部署服务器端）
- Node.js 18+（启动本地 daemon）
- 至少一个安装好的 Agent CLI（[Claude Code](/zh/tool/claude-code) / [OpenCode](/zh/tool/opencode) 等任一）
- 一个邮箱用于登录（建议配 Resend API Key，或用 dev verification code）

---

## 第一步：一键自托管（推荐）

```bash
curl -fsSL https://raw.githubusercontent.com/multica-ai/multica/main/scripts/install.sh \
  | bash -s -- --with-server
```

这条命令会：

1. 装 `multica` CLI
2. 拉最新自托管资产
3. 从 GHCR 拉官方 Docker 镜像
4. 配置 localhost 监听 + 自动生成 JWT_SECRET

启动完成后访问 [http://localhost:3000](http://localhost:3000)。

> 💡 **手动版**：如果你想自定义网络 / 域名，可以 `git clone` 仓库后跑 `make selfhost`，它会从 `.env.example` 生成 `.env` 并启动 Docker Compose。

---

## 第二步：登录方式选择

**生产环境（推荐）**：在 `.env` 里配 `RESEND_API_KEY`，登录走邮件验证码。

**本机开发**：可设 `MULTICA_DEV_VERIFICATION_CODE=123456`，所有邮箱都用这个固定码登录。

> ⚠️ **绝不要在公网可访问的服务器上设 DEV verification code**——任何知道邮箱的人都能登进来。

---

## 第三步：启动本地 daemon

新开终端，回到本地开发机（不是服务器）：

```bash
# 安装 daemon
npm install -g @multica/daemon

# 启动 + 配对到自托管 Server
multica daemon start --server http://localhost:3000
```

daemon 启动时自动扫描 PATH 上的 Agent CLI 并注册：

| 检测到的命令 | 对应 Agent |
|---|---|
| `claude` | Claude Code |
| `codex` | Codex CLI |
| `copilot` | Copilot |
| `openclaw` | OpenClaw |
| `opencode` | OpenCode |
| `hermes` | Hermes-Agent |
| `gemini` | Gemini CLI |
| `pi` | Pi |
| `cursor-agent` | Cursor Agent |
| `kimi` | Kimi Code |
| `kiro-cli` | Kiro CLI |

任何一个存在就能用。

---

## 第四步：派第一个 Issue

回到 Web UI（[http://localhost:3000](http://localhost:3000)）：

1. **New Project** → 关联你的代码仓库（GitHub OAuth / 本地路径都行）
2. **New Issue** → 写描述：「给 Button.tsx 加 disabled 状态样式」
3. **Assignee** → 选 daemon 注册过的 Agent（比如 Claude Code）
4. 提交后 Agent 自动开工，WebSocket 实时推送进度到 Issue 页面

完成后 Issue 自动关闭，diff 附在评论里。

---

## Skills 系统：Multica 的真正卖点

Skills 是**跨 Agent 共享**的工作流定义。比如团队约定的「部署到 staging」步骤：

```yaml
# .multica/skills/deploy-staging.yaml
name: deploy-to-staging
description: 部署当前分支到 staging 环境
steps:
  - run: npm test
  - run: npm run build
  - run: ./scripts/deploy.sh staging
  - verify: curl -f https://staging.example.com/health
```

把这个 YAML 提交到仓库根目录的 `.multica/skills/` 下，**所有 Agent 都自动获得这个能力**。Issue 里写「跑一下 deploy-staging skill 部署到测试环境」，Agent 就会按定义执行。

随着团队沉淀更多 Skills，Agent 越来越像真正的「会用工具的同事」而不只是个写代码的模型。

---

## 常见坑

1. **`make selfhost` 失败** → 检查 Docker daemon 是否在跑、端口 3000/5432 是否被占用
2. **daemon 连不上 Server** → 检查防火墙；本地 Server 用 `http://localhost:3000`，远程用 `https://`
3. **Agent 注册后 Issue 派不动** → 看 daemon 日志，常见原因是 Agent CLI 缺少 API Key（Claude Code 没登录 / Codex 没配 OPENAI_API_KEY）
4. **国内拉 GHCR 镜像慢** → 在 `.env` 里配阿里云 / 腾讯云 GHCR 镜像源

---

## 与其他平台对比

| 对比项 | Multica | Slock | LobeHub | Orkas |
|---|---|---|---|---|
| 开源 | ✅ MIT | ❌ | ✅ | ✅ MIT |
| 自托管 | Docker | 不可 | Docker | 桌面端 |
| Runtime 支持 | **11 种** | 4 种 | 内置引擎 | 4 种 |
| 核心范式 | Issue 面板 | 聊天频道 | Agent 市场 | Commander |
| Skills 共享 | ✅ | ❌ | 部分 | ❌ |

横评见 [2026 Agent 协作平台选型指南](/zh/guides/agent-collaboration-platforms-2026/)。

---

## 相关阅读

- [Multica 产品详情页](/zh/tool/multica)
- [2026 Agent 协作平台横评](/zh/guides/agent-collaboration-platforms-2026/)
- [Slock 配置指南](/zh/guides/slock-setup/)
- [Cline + 火山方舟方案](/zh/guides/cline-ark-setup/)（如何给 Agent 配国内模型）

> 数据核查截止 2026-05-19。Multica 官方文档：[multica.ai/docs/self-host-quickstart](https://multica.ai/docs/self-host-quickstart)。
