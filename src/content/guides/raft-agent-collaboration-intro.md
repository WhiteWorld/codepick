---
title: "Raft 入门：用 AI Agent 团队替代单人编程的协作平台"
description: "Raft 是 2025 年创立的人机协作平台，让 AI agents 像队友一样拥有持久身份、认领任务、共享频道。本文从定位、核心概念、与 Multica 对比、工作流到上手实操，讲清 Raft 怎么帮你从单兵作战升级到 Agent 团队。"
date: "2026-08-13"
article_type: explainer
tags: [raft, agent-collaboration, slock, multica, ai-agent-team]
pillar: workflow
content_status: keep
locale_strategy: mirrored
draft: false
---

## 先说结论

如果你已经在用 Claude Code、Codex 或 Cursor 让 AI 帮你写代码，下一步大概率不是"换一个更强的模型"，而是**让多个 Agent 像一个团队一样协作**。

Raft 就是干这个的。它不是你电脑上的又一个 AI 编程工具——它是 Agent 团队的操作系统：给每个 Agent 一个持久身份、一份记忆、一个频道，让它们认领任务、互相协作、在人类监督下把工作扛过线。

Raft 的前身是 Slock，2025 年由 Botiverse 创立。如果你在 CodePick 站内看过 Slock 的配置指南，Raft 就是它的正式品牌升级版——理念一脉相承，产品更成熟。

> 核查时间：2026-08-13。本文事实来自 raft.build 官网、官方 blog 与公开文档。

---

## 一、Raft 是什么

Raft 的定位很清楚：**Where humans and AI agents build together**（人类和 AI Agent 一起构建的地方）。

它不是又一个 IDE 插件，也不是又一个 CLI 工具。它的核心是**频道（Channel）**——一个人类和 Agent 共享的实时协作空间。在这个空间里：

- 你可以 @mention 一个 Agent，让它干活
- Agent 会认领任务（Task），更新状态，汇报进度
- 多个 Agent 可以同时在不同线程里工作，互不干扰
- Agent 拥有持久记忆（MEMORY.md），关了电脑再打开，它还记得你是谁、在做什么

简单说：**单人编程工具让你和一个 AI 对话；Raft 让你和一群 AI 协作。**

---

## 二、核心概念

### Agent：有名字、有记忆、有身份的 AI 队友

Raft 里的 Agent 不是一次性对话窗口。每个 Agent 有：

- **名字**：不是装饰——名字决定你怎么路由任务、怎么记住它的历史。Raft 官方 blog 有一篇专门讲 "[Agents Need Names](https://raft.build/resources/blog/agents-need-names/)"，核心观点是：有名字的 Agent 团队比一个匿名的"全能 agent"高效得多。
- **持久记忆**：每个 Agent 有自己的 `MEMORY.md`，在 workspace 里持久存储。Agent 进程重启后，记忆不丢失。
- **认领任务**：Agent 看到频道里的任务，会主动认领。认领失败的 Agent 不会抢别人的活。

### Channel：共享的房间

Channel 是 Raft 的协作单元。一个频道可以同时有多个 Agent 和人类。你可以把不同项目放在不同频道里——比如 `#codepick` 是内容团队、`#dev` 是开发团队。

Raft blog 的 "[Don't talk to me, talk to my agents](https://raft.build/resources/blog/dont-talk-to-me-talk-to-my-agents/)" 就是这个意思：共享一个房间，而不是整个服务器。Agent 只在它被拉入的频道里活动，不会到处乱跑。

### Thread 和 Task

- **Thread**：消息下的子对话，让讨论不污染主频道
- **Task**：可追踪的工作项，有状态流转（todo → in_progress → in_review → done），有 assignee

### 其他机制

- **Reminder**：Agent 可以给自己设置提醒，到期后唤醒继续工作
- **每日汇报**：Agent 每天早上向 owner 汇报进度
- **Inbox**：Agent 不会在频道里刷屏——它有自己的收件箱，按需读取

---

## 三、和单人用 Claude Code / Codex 的区别

| 维度 | 单人 AI 编程工具 | Raft |
|---|---|---|
| **Agent 生命周期** | 一次性会话，关了窗口就没了 | 持久身份，重启后记忆还在 |
| **任务分配** | 你手动描述每个任务 | Agent 认领任务，自动分工 |
| **上下文共享** | 每次对话独立，不共享 | 频道内所有 Agent 看同一段对话历史 |
| **多 Agent 协作** | 不支持 | 多个 Agent 同时工作，互不干扰 |
| **人类在环** | 你是操作者 | 你是团队管理者——审批、review、决策 |
| **权限边界** | 你给 Agent 什么权限就是什么 | 频道级隔离，Agent 只在被邀请的频道活动 |

**关键区别**：单人工具里，你是一个操作员指挥一个 AI。Raft 里，你是一个团队 leader 管理一群 AI 队友。

Raft blog 的 "[Trust Doesn't Live in Code Review](https://raft.build/resources/blog/trust-doesnt-live-in-the-code-review/)" 把这个转变讲得很透：agent 时代，信任不在 code review 那个单点上，而在整个交付过程里——Agent 认领任务、更新状态、接受 review、迭代修改——你信任的是这套流程，不是一次性的代码检查。

---

## 四、Raft vs Multica 对比

Multica 是站内另一个重点关注的 agent 协作平台，但设计思路不同。

| 维度 | Raft | Multica |
|---|---|---|
| **定位** | 人机实时协作平台 | 开源 agent 任务管理平台 |
| **开源/许可** | 闭源（SaaS） | Modified Apache 2.0，可自托管 |
| **部署方式** | 托管服务（raft.build） | 自托管（Docker Compose / K8s）或 Cloud |
| **持久记忆** | ✅ MEMORY.md，Agent 重启不丢失 | ❌ 无持久记忆机制 |
| **任务认领** | ✅ Agent 主动认领，冲突锁 | ✅ 任务管理 + issue 跟踪 |
| **Runtime 支持** | Claude Code、Codex、Gemini CLI、OpenCode | 12 种 runtime（Claude Code/Codex/Cursor/Copilot/Gemini CLI/Kimi/Kiro/Antigravity/OpenCode/Pi 等） |
| **频道模型** | ✅ 频道 + 线程 + DM，和 Slack/ Discord 类似 | ❌ 无频道概念，以项目和任务组织 |
| **中国可用性** | 需自行解决 API 访问 | 开源可自托管，国内可直接部署 |

**怎么选**：

- 想要**开源自托管 + 更广的 runtime 支持**，选 Multica
- 想要**持久记忆 + 频道式协作 + 人机实时交互**，选 Raft
- 两者可以互补——Multica 管任务执行，Raft 管团队沟通

> 站内另有 [Agent 协作平台全景对比](/zh/guides/agent-collaboration-platforms-2026) 和 [Slock 配置指南](/zh/guides/slock-setup) 可配合阅读。

---

## 五、Raft 上的典型工作流

参考 Raft 官方 blog "[How a Feature Ships, for Raft, on Raft](https://raft.build/resources/blog/how-a-feature-ships-for-raft-on-raft/)"，一个功能从想法到上线经历四个阶段：

### Bill → Contract → Gate → Launch

1. **Bill（提案）**：有人在频道里提出一个想法或需求。可能是人类，也可能是 Agent 在跑监控时发现的。
2. **Contract（契约）**：需求被拆成任务，分配给具体的 Agent。每个任务有明确的验收标准。
3. **Gate（关卡）**：Agent 完成工作后，进入 review。人类（或其他 Agent）审批通过才能进入下一步。
4. **Launch（上线）**：所有关卡通过，功能上线。

这个流程的核心是**每个阶段都有明确的 owner 和 gate**。不是"Agent 干完就完了"，而是"Agent 干完 → 人类确认 → 进入下一阶段"。

Raft blog 的 "[You Don't Need a Company Brain](https://raft.build/resources/blog/you-dont-need-a-company-brain/)" 补充了另一个视角：你不需要一个"公司大脑"来统一管理所有知识。你需要的是**多个有边界、能看同一房间的头脑**——每个 Agent 有自己的记忆和专长，但共享频道上下文。

---

## 六、快速上手

1. **访问 [raft.build](https://raft.build) 注册**，创建你的第一个 Server
2. **安装 Raft CLI**：在本地运行 daemon 连接你的机器
3. **创建 Agent**：配置名字、runtime（Claude Code / Codex 等）、指令
4. **加入频道**：把你的 Agent 拉入工作频道
5. **分配任务**：在频道里 @mention Agent，它会认领并开始工作

更详细的配置步骤（注册、daemon、任务派发），参考站内 [Slock 配置指南](/zh/guides/slock-setup)——Raft 是 Slock 的升级版，配置流程基本一致。

---

## 七、适合谁 / 不适合谁

**适合**：

- 已经在用 AI 编程工具、想从单兵升级到团队的开发者
- 一人公司或小团队，想用 Agent 分担开发、测试、文档、运维等不同角色
- 需要 Agent 持久记忆和多轮协作的复杂项目
- 认同"人管流程、Agent 管执行"理念的人

**不适合**：

- 只是偶尔用 AI 补一两行代码的新手——先把手头的 Claude Code 或 Copilot 用熟
- 不需要团队协作的纯个人项目
- 对 SaaS 托管有顾虑、必须全自托管的场景（这种情况可以先看 Multica）

---

## 总结

Raft 解决的不是"AI 能不能写代码"的问题——那个问题 Claude Code 和 Codex 已经回答了。Raft 解决的是：**当你有 3 个、5 个、10 个 AI 同时干活时，怎么管、怎么分工、怎么记住进度、怎么让人类保持在决策链上**。

如果你认同 "Don't talk to me, talk to my agents"，那 Raft 就是为这个理念设计的。
