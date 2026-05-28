---
title: "Multica 配置指南：开源自托管的多 Agent 项目管理平台（2026）"
description: "Multica 把 AI Agent 拉进 Issue 面板，像团队成员一样派活、追踪进度。本文带你跑通：make selfhost 自托管 → setup self-host 启动 daemon → 自动识别 11 种 AI coding tools → 创建 Issue 派给 Agent → 共享 Skills。"
date: "2026-05-19"
updated_at: "2026-05-28"
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
      不是完全一回事。Multica 采用 Anthropic Agent Skills 开放标准，可以把 `SKILL.md` + 附件作为工作区 Skill 共享给团队。
      挂到 Agent 后，daemon 会把 Skill 同步到对应工具的发现路径；但 Gemini / Hermes / OpenClaw 等工具是否真正读取 fallback 路径，还取决于工具自身。
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
# 官方自托管路径：拉仓库 + Docker Compose
git clone https://github.com/multica-ai/multica.git
cd multica
make selfhost

# Web 界面：http://localhost:3000
# Backend：http://localhost:8080
# daemon 自动检测 11 种工具：Claude Code / Codex / Cursor / Copilot /
# Gemini / Hermes / Kimi / Kiro CLI / OpenCode / OpenClaw / Pi
```

---

## 前置要求

- Docker + Docker Compose（部署服务器端）
- Git（拉取自托管仓库，官方推荐）
- 至少一个安装好的 Agent CLI（[Claude Code](/zh/tool/claude-code) / [OpenCode](/zh/tool/opencode) 等任一）
- 一个邮箱用于登录（生产环境建议配 Resend 或 SMTP；未配置邮件时验证码会打印到服务端日志）

---

## 第一步：启动自托管服务（官方路径）

```bash
git clone https://github.com/multica-ai/multica.git
cd multica
make selfhost
```

这条命令会：

1. 如果缺少 `.env`，从 `.env.example` 生成并创建随机 `JWT_SECRET`
2. 从 GHCR 拉 PostgreSQL、Multica backend、Multica frontend 官方 Docker 镜像
3. 用 `docker-compose.selfhost.yml` 拉起所有服务
4. 等待 backend `/health` 就绪

启动完成后访问 [http://localhost:3000](http://localhost:3000)，backend 默认在 [http://localhost:8080](http://localhost:8080)。

> 如果 GHCR 镜像尚未发布或拉取失败，可按官方文档切到稳定 release，或用 `make selfhost-build` 从源码构建。

---

## 第二步：登录方式选择

**生产环境（推荐）**：在 `.env` 里配 `RESEND_API_KEY` / `RESEND_FROM_EMAIL`，或使用 SMTP 变量，登录走邮件验证码。

**本机开发**：不配邮件服务时，验证码会打印在 backend 日志里；也可以在非生产私有环境设置 `MULTICA_DEV_VERIFICATION_CODE` 做固定验证码。

> ⚠️ **绝不要在公网可访问的服务器上设固定 DEV verification code**。官方文档也特别提醒：不要使用 `888888`，除非你明确在非生产私有环境设置了这个值。

---

## 第三步：启动本地 daemon

新开终端，回到本地开发机（不是服务器）：

```bash
# 如果 server 和 Web 都在本机，默认就是 localhost:8080 / localhost:3000
multica setup self-host

# 远程自托管时显式指定 backend 与 frontend
multica setup self-host \
  --server-url http://<your-server-address>:8080 \
  --app-url http://<your-server-address>:3000
```

`setup self-host` 会完成浏览器登录、在本机保存 PAT，并自动启动 daemon。后续你也可以手动运行 `multica daemon`。

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
| `cursor` | Cursor |
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

Skills 是**跨 Agent 共享**的知识包：一个 `SKILL.md` 加上可选脚本、配置、模板或参考文件。比如团队约定的「部署到 staging」能力：

```markdown
# Deploy to staging

Use this skill when a task asks you to deploy the current branch to staging.

1. Run `npm test`.
2. Run `npm run build`.
3. Run `./scripts/deploy.sh staging`.
4. Verify `https://staging.example.com/health`.
```

在 UI 中新建或从 GitHub / ClawHub / 本机导入这个 Skill，再挂到某个 Agent 上。下一次任务开始时，daemon 会把 Skill 放到对应工具的发现路径，例如 Claude Code 用 `.claude/skills/`、Cursor 用 `.cursor/skills/`。

随着团队沉淀更多 Skills，Agent 越来越像真正的「会用工具的同事」而不只是个写代码的模型。

---

## 常见坑

1. **`make selfhost` 失败** → 检查 Docker daemon 是否在跑、端口 3000/8080/5432 是否被占用；看 `docker compose -f docker-compose.selfhost.yml logs backend`
2. **daemon 连不上 Server** → 检查 `--server-url` 是否指向 backend（默认 8080），`--app-url` 是否指向 Web（默认 3000）
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
- [AI 编程工具月成本对比 2026](/zh/compare/ai-coding-cost-comparison-2026/)（如何给多 Agent 团队控预算）

> 数据核查截止 2026-05-28。Multica 官方文档：[Self-host quickstart](https://multica.ai/docs/self-host-quickstart) · [How Multica works](https://multica.ai/docs/how-multica-works) · [Skills](https://multica.ai/docs/skills)。
