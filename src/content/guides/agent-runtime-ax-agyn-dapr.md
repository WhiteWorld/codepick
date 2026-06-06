---
title: "Google AX、Agyn、Dapr Agents 对比：从 Agent 运行时视角怎么选"
description: "Google AX 代表了分布式 agent runtime 的新范式。本文只对比最接近 AX 的两个开源项目 Agyn 和 Dapr Agents，从执行单元、状态恢复、隔离边界、部署方式和适用场景判断怎么选。"
date: "2026-06-06"
updated_at: "2026-06-06"
article_type: review
tags: ["agent-runtime", "google-ax", "agyn", "dapr-agents", "durable-execution", "agent-infrastructure"]
pillar: market
content_status: keep
locale_strategy: mirrored
draft: false
---

## 先说结论

如果你在看 [Google AX](https://github.com/google/ax)，不要把它理解成另一个 LangGraph、CrewAI 或 OpenAI Agents SDK。AX 更像一个 **agent 执行控制面**：它关心 controller、event log、execution、conversation、remote agent、tool、resume、fork、trace，而不是教你怎么写一个 prompt 或 graph。

在公开项目里，最值得和 AX 放在一起看的两个是：

| 项目 | 最像 AX 的地方 | 最大差异 | 一句话建议 |
|---|---|---|---|
| [Agyn](https://github.com/agynio/platform) | 自托管、Kubernetes-native、agent runtime、运行任意 agent container、强调企业隔离和治理 | 更像企业 agent fleet 平台，事件日志/恢复语义不如 AX 那样作为核心协议公开 | 想把 Claude Code、Codex、自定义 agent 搬到公司基础设施，优先看 Agyn |
| [Dapr Agents](https://github.com/dapr/dapr-agents) | 基于 Dapr workflow、actors、state store，强调 resilient、observable、Kubernetes-native agent systems | 更像 agent framework + durable workflow runtime，agent 协议边界没有 AX 那么底层 | 已经在 Dapr / K8s 生态，想要多 agent + durable workflow，优先看 Dapr Agents |

**我的判断：Agyn 更像 AX 的部署和安全方向，Dapr Agents 更像 AX 的可靠执行方向。**  
如果你要做一个 coding-agent runtime/control plane，最值得借鉴的是：AX 的 event log / resume / fork，Agyn 的 container 与 MCP 隔离，Dapr Agents 的 workflow / actor / state store 组合。

---

## 为什么不把 LangGraph、Temporal 放进主对比？

不是因为它们不重要，而是因为比较口径不同。

LangGraph 是优秀的 agent workflow framework，Temporal / Restate / DBOS 是成熟的 durable execution substrate。它们都能承载 agent，但它们不是 AX 最直接的同类。

AX 的核心问题更底层：

> 一个 agent execution 怎么被启动、记录、恢复、分叉、审计，并和远程 agent / tool / environment 安全通信？

所以本文只看两个最接近这个问题的项目：**Agyn** 和 **Dapr Agents**。

---

## 快速对比：运行时维度

| 维度 | Google AX | Agyn | Dapr Agents |
|---|---|---|---|
| 核心定位 | Distributed agent runtime / executor | Self-hosted Kubernetes-native agent runtime | Resilient agent framework on Dapr |
| 主要执行单元 | conversation、execution、remote agent、tool | agent container、MCP container、conversation sandbox | agent、workflow、actor、task |
| 控制面 | AX Controller，负责执行、event log、registry | 平台控制面 + Terraform/IaC + console | Dapr sidecar / workflow / actor runtime |
| 状态模型 | event log，single-writer controller | 平台 activity、trace、配置和运行状态 | Dapr Workflow state、state store、actor state |
| 恢复语义 | resume、last sequence catch-up、fork from checkpoint | serverless spawn、idle scale-to-zero、运行记录 | workflow retry、recover from state、actor state retention |
| 隔离边界 | remote agent / tool / environment actor | agent 与 MCP server 分容器，zero-trust networking | app / sidecar / actor / workflow 边界 |
| 适配对象 | harness/model agnostic，remote agent protocol | Claude Code、Codex、自定义 agent container | Python agent framework + Dapr building blocks |
| 部署方式 | self-host，Kubernetes 友好 | self-host K8s，Terraform / Helm 生态 | Dapr / Kubernetes / self-host |
| 成熟度 | 早期，接口可能大改 | 很新，偏平台化，AGPL | 依托 Dapr，项目仍在快速发展 |

---

## Google AX：把 agent execution 变成一等对象

AX 最有价值的地方，不是它能跑 Gemini，也不是它有 CLI，而是它把 agent execution 里的几个概念显式化了：

- **Controller**：统一协调 agent、tool、skill、environment。
- **Event log**：把执行过程变成可恢复、可审计的 durable state。
- **Conversation / execution**：不是一次性 request，而是可继续、可恢复、可分叉的执行流。
- **`last_seq` catch-up**：客户端断线后可以按 sequence 补事件，不是从头重跑。
- **`fork`**：从某个 checkpoint 派生新 execution，用于探索另一条路径。
- **Trace UI**：把 agent 执行日志可视化，而不是只看文本 transcript。

这套模型非常适合长任务 agent，尤其是 coding agent：它们会调用工具、修改文件、等待用户确认、被中断、恢复上下文，还可能需要从某一步分叉尝试另一种实现。

AX 当前仍处于早期，README 也明确提示 core、resumption protocols、runtime specifications 都可能发生 breaking changes。因此它更像一个值得学习的架构参照，而不是可以无脑押注的生产基础设施。

---

## Agyn：最像 AX 的企业部署版本

[Agyn](https://github.com/agynio/platform) 的自我定位很直接：把 Claude Code、Codex、自定义 agent 从个人电脑搬到公司基础设施上运行。它不是只做 agent 编排，而是在尝试回答企业会问的几个现实问题：

- agent 怎么集中部署？
- secret 怎么不进 LLM context？
- MCP server 能不能和 agent 分开隔离？
- 每个 agent / team / org 能不能做预算控制？
- agent 能不能 scale to zero？
- 配置能不能进 Terraform，走 review 和自动化流程？

这让 Agyn 和 AX 很接近：二者都不是简单的 agent SDK，而是在做 **agent serving / runtime / control plane**。

### Agyn 的强项

**1. 隔离和安全边界更产品化。**  
Agyn 强调 agent container、MCP server 独立容器、凭证只注入需要的 tool、zero-trust networking。这是运行企业 agent 时最容易被低估的一层：不仅要记录 agent 做了什么，还要限制它能碰什么。

**2. 对现成 coding agent 更友好。**  
AX 更偏协议和 runtime，Agyn 更强调可以运行 Claude Code、Codex 或自定义 agent container。对于已经有 coding agent CLI 的团队，Agyn 的心智更直接。

**3. IaC 方向清晰。**  
Terraform 管 agent、model、MCP、secret、runner，很符合基础设施团队的工作方式。Agent 不再是某个人本机上的临时进程，而是可以 code review 的基础设施对象。

### Agyn 的风险

**1. 项目很新。**  
截至 2026-06-06，它的公开仓库还很年轻，生态、稳定性、升级路径都需要实际验证。

**2. AGPL 许可证需要注意。**  
如果你准备把它嵌入商业产品或内部平台，要先确认公司对 AGPL 的合规要求。

**3. 恢复语义没有 AX 那么清晰。**  
Agyn 对部署、隔离、治理讲得更完整，但 AX 那种 `event log + last_seq + fork` 的执行语义，目前不是 Agyn 公开叙事的中心。

### 适合谁？

如果你的问题是「公司里已经有人在用 Claude Code / Codex / 自定义 agent，怎么把它们安全地集中运行起来」，Agyn 是最接近 AX 的开源选择。

---

## Dapr Agents：最像 AX 的可靠执行底座

[Dapr Agents](https://github.com/dapr/dapr-agents) 不是 AX 的直接替代品，但它在另一个方向很接近：把 agent 放进 Dapr 的 workflow、actor、state、pub/sub、service invocation 体系里。

它的核心不是「运行任意 agent container」，而是「用 Dapr 的分布式系统能力，让 agent workflow 可恢复、可观测、可扩展」。

### Dapr Agents 的强项

**1. Durable workflow 是一等能力。**  
Dapr Agents 明确把 agentic workflows 放到 durable execution workflow engine 上。任务失败、节点崩溃、网络中断时，workflow 可以重试并从状态中恢复。这一点和 AX 的 event-log/resume 目标相通。

**2. Actor 模型天然适合 agent。**  
agent 常常是有身份、有状态、串行处理消息的实体。Dapr actors 提供了一个成熟抽象：每个 actor 是 thread-safe 的状态单元，空闲时可以回收，需要时再激活。

**3. 企业集成面广。**  
Dapr 原本就有 state store、pub/sub、bindings、service invocation、resiliency policies、mTLS。对企业后端团队来说，这比从零搭 agent runtime 更容易落地。

### Dapr Agents 的风险

**1. 它更像 framework + runtime，不是纯 runtime。**  
AX 明确说自己不是 agentic framework；Dapr Agents 则提供 agent API、multi-agent、contextual memory、tool selection 等上层能力。你需要接受它的开发模型。

**2. 隔离边界不如 Agyn 那样强调。**  
Dapr 能提供应用和 sidecar 层面的边界，但如果你要运行不可信 coding agent、隔离 MCP server、限制文件系统和凭证，仍然需要额外设计。

**3. Dapr 生态前置成本。**  
如果团队没有 Dapr 基础，先理解 sidecar、components、actors、workflow，学习曲线不低。

### 适合谁？

如果你的问题是「我们要构建自己的 agent 应用，并希望它天然具备 workflow recovery、state、pub/sub、observability」，Dapr Agents 比 Agyn 更贴近。

---

## 怎么选？

### 1. 你要托管现成 agent，还是写自己的 agent？

如果你要托管 **现成的 coding agent / CLI agent**，优先看 **Agyn**。它的心智是把 agent container 化、集中部署、集中治理。

如果你要写 **自己的 agent application**，并希望它天然有 durable workflow 和分布式状态，优先看 **Dapr Agents**。

### 2. 你的第一优先级是安全隔离还是恢复语义？

优先级是 **secret、MCP、网络、容器隔离**：看 Agyn。

优先级是 **workflow retry、actor state、pub/sub、service invocation**：看 Dapr Agents。

### 3. 你想复刻 AX 的哪一部分？

| 想借鉴的 AX 能力 | 更接近的项目 |
|---|---|
| remote agent / tool 隔离 | Agyn |
| agent fleet 管理 | Agyn |
| IaC 管理 agent 配置 | Agyn |
| durable workflow recovery | Dapr Agents |
| actor-like long-lived agent identity | Dapr Agents |
| enterprise integration primitives | Dapr Agents |
| event log、last_seq、fork、trace semantics | 仍然是 AX 自己最清晰 |

---

## 对开发者的建议

如果你只是想做一个普通 AI 应用，不需要先上 AX / Agyn / Dapr Agents。LangGraph、OpenAI Agents SDK、Google ADK、Vercel AI SDK 可能更快。

只有当你遇到下面这些问题时，才值得认真看 agent runtime：

- agent 任务会跑很久，中断后不能从头重来；
- agent 会调用高权限工具，需要审计和审批；
- 多个 agent / tool / MCP server 需要隔离；
- 你要把 agent 从个人电脑搬到团队基础设施；
- 你需要 trace、resume、fork、replay；
- agent 不只是 chat，而是一个长期运行的执行实体。

这时，AX、Agyn、Dapr Agents 的价值才会真正出现。

---

## CodePick 推荐

**短期学习 AX，落地优先 Agyn 或 Dapr Agents。**

- 想做企业 coding-agent 平台：先研究 **Agyn**。
- 想做 durable multi-agent 应用：先研究 **Dapr Agents**。
- 想设计自己的 agent runtime/control plane：认真读 **Google AX** 的 controller、proto、event log、resume、fork、trace 设计。

最稳妥的架构思路不是三选一，而是分层：

1. 用 AX 学习 execution/event-log 语义；
2. 用 Agyn 学习 agent/tool/container/security 边界；
3. 用 Dapr Agents 学习 workflow/actor/state 的可靠执行模式；
4. 最后再决定你的系统到底需要「agent 平台」还是「durable workflow runtime」。

---

## 官方链接

- [Google AX GitHub](https://github.com/google/ax)
- [Agyn GitHub](https://github.com/agynio/platform)
- [Dapr Agents GitHub](https://github.com/dapr/dapr-agents)
- [Dapr Agents 文档](https://docs.dapr.io/developing-ai/dapr-agents/dapr-agents-core-concepts/)
