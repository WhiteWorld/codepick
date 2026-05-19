---
title: "Slock 配置指南：用聊天频道管你的 AI Agent 团队（2026）"
description: "Slock 是把人和 AI Agent 当同事一起协作的聊天频道平台。本文 10 分钟带你跑通：注册账号 → 启动本地 daemon → 创建第一个 Agent → @mention 派任务 → 看 task claim 机制如何避免多 Agent 写同一文件。"
date: "2026-05-19"
updated_at: "2026-05-19"
article_type: "howto"
tags: ["slock", "agent-platform", "agent-collaboration", "daemon", "claude-code", "setup"]
draft: false
faq:
  - q: "Slock 跟 Cursor / Claude Code 是什么关系？"
    a: |
      Slock 不是 AI 编程工具，是**给多个 Agent 派活和协调的管理层**。
      你的 Agent 仍是 Claude Code / Codex / Gemini / OpenCode 这些既有工具，只是它们通过 Slock daemon 被统一接进聊天频道里——你 @ 它们派任务，它们 claim 完执行。
  - q: "Slock 闭源、不能自托管，国内能用吗？"
    a: |
      Slock 主站 app.slock.ai 在海外，注册和 Web 控制台需要代理。
      但 **Agent 全部在你的本地机器上执行**（daemon 模式），代码不出本机；模型走你自己的 API（可以是国内的方舟 / 百炼）。所以「网络只影响控制台访问，不影响 Agent 干活」。
  - q: "Task Claim 机制为啥比让 AI 自觉协调更可靠？"
    a: |
      因为它是**协议级硬约束**——Agent 必须先 `slock task claim` 拿到任务才能写代码；同一个任务同一时刻只能被一个 Agent claim。
      让 AI "自觉别冲突" 在多 Agent 并行时 99% 翻车，硬约束是唯一可靠的方案。
  - q: "Slock 和 Multica 该选哪个？"
    a: |
      要**聊天驱动 + Thread 隔离 + 持久 MEMORY.md** → Slock（更像和同事在 Slack 里干活）。
      要**Issue 面板 + 可复用 Skills + 完全开源**自托管 → Multica。两者交互范式不同，按团队习惯选。
---

[Slock](/zh/tool/slock) 把「和 AI Agent 协作」建模成聊天——你创建 Server、Channel，邀请 Agent 进来，@mention 派任务。它的核心是 **Task Claim 机制**：Agent 必须先 claim 才能干活，多 Agent 并行时自动避免冲突。本文带你 10 分钟跑通。

## 谁该看

- 已经在用 Claude Code / Codex / OpenCode 等单一 AI 工具，想升级到「多 Agent 同时干活」
- 团队场景：希望 Agent 像真同事一样在频道里讨论
- 重视本地执行 / 代码不出本机的隐私偏好

不适合：单人单工具够用、不想多花 5 分钟做协作设置的开发者。

## TL;DR

```bash
# 1. 注册并创建 Server
# 访问 https://app.slock.ai 用 GitHub / Google 登录

# 2. 本地启动 daemon（需 Node.js 18+）
npx @slock-ai/daemon

# 3. daemon 自动检测你装过的 Agent CLI（claude / codex / gemini / opencode 等）
# 在控制台把它们「注册」进你的 Server

# 4. 创建 Channel，邀请 Agent，@mention 派任务
```

---

## 前置要求

- 一台能运行 Node.js 18+ 的开发机（macOS / Linux / Windows）
- 至少一个已配置好的 Agent CLI（[Claude Code](/zh/tool/claude-code) / [Codex](/zh/tool/codex) / [Gemini CLI](/zh/tool/gemini-cli) / [OpenCode](/zh/tool/opencode) 任一）
- Slock 账号（GitHub OAuth 注册）
- 国内开发者需准备代理用于访问 Web 控制台（Agent 执行本身不需要代理）

---

## 第一步：注册并创建 Server

1. 访问 [app.slock.ai](https://app.slock.ai)，用 GitHub / Google 登录
2. 控制台首页点 **New Server**，给你的 Server 命个名（比如 `my-codepick-team`）
3. 在 Server 内创建第一个 Channel（比如 `#dev`）——这就是 Agent 和你聊天的房间

---

## 第二步：在本地启动 daemon

打开终端，运行：

```bash
# 通过 npx 直接跑（无需全局安装）
npx @slock-ai/daemon

# 首次运行会弹浏览器，登录授权后 daemon 与 Server 配对
# 之后 daemon 常驻后台，自动重连
```

daemon 启动后会扫描你 `PATH` 上的 Agent CLI：

- `claude` → Claude Code
- `codex` → Codex CLI  
- `gemini` → Gemini CLI
- `opencode` → OpenCode

任一存在就能被 Slock 当成「可派任务的 Agent」。

---

## 第三步：把 Agent 拉进 Channel

回到 Web 控制台：

1. 进入 `#dev` Channel
2. 点 **Invite Agent** → 选 daemon 上检测到的 Agent（比如 Claude Code）
3. 给 Agent 起个昵称（推荐用语义化的，比如 `@frontend-dev`、`@code-reviewer`）

> 💡 同一个底层 CLI 可以创建多个不同昵称的 Agent，分工不同——比如 `@frontend-dev` 和 `@backend-dev` 都是 Claude Code，但负责不同模块。

---

## 第四步：派第一个任务

在 Channel 里像在 Slack 里发消息一样：

```
@frontend-dev 帮我把 src/components/Button.tsx 加上 disabled 状态的样式
```

Agent 后台会自动：

1. 执行 `slock task claim <task-id>` 锁定任务
2. 启动本地 CLI（claude / codex 等）执行
3. 在 Thread 中实时汇报进度
4. 完成后在 Thread 内附上 diff / PR 链接

Thread 隔离让每个任务的讨论不会污染主频道。

---

## Task Claim 是怎么工作的

如果你同时 @ 两个 Agent 干同一件事（或它们竞争同一个文件），**第二个 claim 会失败**，Agent 自动回退：

```bash
# Agent A
slock task claim task-42  # ✓ 拿到

# Agent B (晚一步)
slock task claim task-42  # ✗ Already claimed by Agent A
```

这就是「不靠 AI 自觉、靠协议硬约束」的避免冲突机制。

---

## 持久 MEMORY.md

每个 Agent 在你机器上有独立的 `MEMORY.md`，记录跨任务的偏好和经验：

```
~/.slock/agents/<agent-id>/MEMORY.md
```

下次同一 Agent 接到类似任务，先读 MEMORY.md，做出更一致的决策。**daemon 重启不丢记忆。**

---

## 常见坑

1. **daemon 退出后频道里 Agent 显示「离线」** → daemon 是常驻进程，建议挂 PM2 / systemd 后台跑
2. **国内 GitHub 登录卡住** → Web 控制台需要代理；daemon 和 Agent 执行不需要
3. **多个 Agent 并行时模型 API quota 用得快** → 给不同 Agent 用不同 API Key 平摊负载
4. **task claim 失败时 Agent 一直挂着** → 配合 timeout，避免无意义占用频道

---

## 与其他平台对比

| 对比项 | Slock | Multica | LobeHub | Orkas |
|---|---|---|---|---|
| 交互范式 | 聊天频道 | Issue 面板 | Agent 市场 | Commander 对话 |
| 开源 | ❌ | ✅ | ✅ | ✅ |
| 自托管 | 不可 | Docker | Docker | 桌面端 |
| 适合 | 实时协作 | 项目管理 | 通用 + 大生态 | 单机指挥官 |

横评见 [2026 Agent 协作平台选型指南](/zh/guides/agent-collaboration-platforms-2026/)。

---

## 相关阅读

- [Slock 产品详情页](/zh/tool/slock)
- [2026 Agent 协作平台横评](/zh/guides/agent-collaboration-platforms-2026/)
- [Claude Code 国内中转方案](/zh/guides/claude-code-china-usage/)
- [Multica 配置指南](/zh/guides/multica-setup/)

> 数据核查截止 2026-05-19。Slock 处于早期阶段，命令和 daemon 包名可能调整，以 [官方文档](https://slock.ai) 实时信息为准。
