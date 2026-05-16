---
title: "Conductor.build 介绍：在 Mac 上并行跑一队 AI 编程 Agent"
description: "Conductor 是 Melty Labs 推出的 Mac 端 Agent 编排工具，让你同时跑多个 Claude Code / Codex 实例，每个 Agent 在独立 git worktree 里干活。免费使用，自带 Claude/Codex 订阅即可。"
date: "2026-05-16"
tags: [conductor, claude-code, codex, parallel-agents, mac, melty-labs]
article_type: review
draft: false
---

## Conductor 是什么

[Conductor](https://www.conductor.build/) 是 Melty Labs 出品的一款 **Mac 桌面应用**，定位是「**Agent 并行执行器**」（Parallel Runner App）——你在它里面同时启动多个 Claude Code 或 Codex 实例，每个 Agent 在隔离的工作区里独立干活，最后再统一回到你这里 review、合并。

它不是另一个 AI 编程工具，而是**架在 Claude Code / Codex 之上的指挥层**：底层 Agent 还是 Anthropic / OpenAI 的官方 CLI，Conductor 解决的是「**一个人怎么同时管 5 个 Agent**」这个问题。

> 注意：搜索时容易撞到一家叫 Conductor 的企业 SEO 平台（conductor.com）——不是同一个东西。AI 编程工具在 **conductor.build**。

---

## 它解决的核心问题

当你已经习惯让 Claude Code 干活，下一个瓶颈就出现了：**等 Agent 跑完任务的时间太长**。

一个 Agent 跑一个中等任务可能要 5-15 分钟。这段时间你能做什么？

- 切换到另一个分支再开一个 Claude Code？ → 文件冲突
- 开第二个 terminal？ → 同一个 repo，git 状态打架
- 手动 `git worktree add`？ → 每次都得搭一遍环境

Conductor 把这套流程**产品化**了：

1. 你在 UI 里点「新建 workspace」，它自动 `git worktree add` 一个新分支
2. 在这个 workspace 里启动 Claude Code（用你已有的登录态）
3. 同时再开一个、再开一个——每个 workspace 互不干扰
4. 仪表盘上一眼看到每个 Agent 在干什么、卡在哪
5. 任务完成后直接发 PR 合并

简单说：**Conductor 让你从「串行使用 1 个 Agent」变成「并行指挥 5 个 Agent」**。

---

## 关键特性

### 并行 Agent 执行

同时跑多个 Claude Code / Codex 实例，每个跑独立任务。这是它最核心的卖点。官方建议「**一个 workspace 干一个 feature**」。

### Git Worktree 隔离

每个 workspace 是一个独立的 git worktree + 独立分支。Conductor 只复制 git 跟踪的文件，所以 `node_modules` / `.env` 这类不会重复占空间。Agent 之间互不串味，就像团队里几个人各自开分支并行开发。

### Linear 集成

直接从 Linear 的 issue 列表里开任务——选一个 issue，Conductor 自动建 workspace、拉分支、把 issue 描述喂给 Agent。

### Review & Merge 工作流

Agent 跑完之后，你在 Conductor 里 review diff、发 PR、merge。整套流程不用离开 Conductor。

### 自带登录态

Conductor 不收你的 API Key 也不绑订阅。它**复用你本机 Claude Code / Codex 的登录**：

- 已经登录了 Claude Pro / Max → Conductor 自动用
- 用 API Key 登的 → 它也直接用
- Codex 同理

这意味着 Conductor 本身**完全免费**，钱花在底层 Agent 上。

---

## 定价：App 免费，按订阅算成本

Conductor 应用本体免费。实际成本由你用的底层 Agent 决定：

| 底层方案 | 月成本 | 并行能力 |
|---|---|---|
| Claude Pro ($20) | $20 | 受 5h 配额限制，3-5 个 Agent 偶尔会撞配额 |
| Claude Max ($200) | $200 | 实际可并行更多，撞到限额后切 API 计费 |
| Claude API（按量） | 视用量 | 不限并发，但成本最高 |
| Codex（GPT-5） | 视订阅/API | 同上 |

**重要**：并行跑 Agent 会快速消耗配额。如果你打算同时开 5 个 Claude Code，Pro 计划很容易撞墙——Max 更合适，或者考虑混合 Codex 摊销。

---

## 适用人群

**适合你如果：**

- 你已经在用 Claude Code / Codex，且想突破「等 Agent 跑完」的串行瓶颈
- 你在 Mac 上开发，仓库托管在 GitHub
- 你的工作流是 issue / feature 驱动（适合 Linear 用户）
- 你愿意为节省时间多花点 token

**不适合你如果：**

- 你在 Windows / Linux 上（目前只支持 Mac）
- 你的代码不在 GitHub 上（不支持 GitLab / Bitbucket / 自建 Git）
- 你刚开始用 AI 编程工具——先把单 Agent 玩熟再说
- 你预算紧——并行跑很烧 token，Pro 计划撑不住

---

## 和同类工具的关系

「Agent 并行执行器」这个品类还很新，但已经有几个玩家：

- **[Conductor](/zh/tool/conductor)**：Mac 原生 App，Claude Code + Codex
- **[Claude Squad](/zh/tool/claude-squad)**：终端 / tmux 多 pane，开源跨平台
- **[Crystal](/zh/tool/crystal)**：开源桌面 App，Mac + Linux
- **[Parallel Code](/zh/tool/parallel-code)**：开源跨平台，支持 4 种 Agent CLI
- **[Slock](/zh/tool/slock)** / **[Multica](/zh/tool/multica)** / **[Orkas](/zh/tool/orkas)**：偏「人 + Agent 团队协作」

差别主要在**交互模型**：

- Conductor / Orkas → 桌面 App，可视化看每个 Agent 干什么
- Slock → 聊天式，把 Agent 当同事
- Multica → Issue 板，把 Agent 当 assignee

如果你只想要「**并行跑 Claude Code，少操心**」，Conductor 最直接。
如果你需要**协作、自托管、跨平台**，看 Multica / Slock。

---

## 快速上手

1. 在 [conductor.build](https://www.conductor.build/) 下载 Mac 应用
2. 登录 / 确认本机已有 Claude Code 或 Codex 登录态
3. 打开你的 GitHub repo，点「New Workspace」
4. 给这个 workspace 起名（比如 `add-search-api`），它会自动建分支
5. 在 workspace 里启动 Agent，描述任务
6. 同时开第二个 workspace 做别的 feature
7. 任务完成后 review diff，发 PR

官方建议保持 **3-5 个并行 workspace** 是体感最好的——再多管不过来，再少没必要用 Conductor。

---

## 一句话总结

Conductor 是给「**已经离不开 Claude Code，但又嫌单线程慢**」的 Mac 开发者准备的并行调度层。免费、轻量、和官方 CLI 深度绑定——代价是只支持 Mac + GitHub，以及账单会涨。

---

## 相关阅读

- [2026 Agent 协作平台选型指南：Slock / Multica / LobeHub / Orkas 对比](/zh/guides/agent-collaboration-platforms-2026)
- [Claude Code 国内使用完整指南](/zh/guides/claude-code-china-usage)
- [Claude Code Token 省钱实战](/zh/guides/claude-code-token-saving)

---

*最后更新：2026-05-16*
