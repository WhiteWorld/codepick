---
title: "Google AX, Agyn, and Dapr Agents Compared: Choosing an Agent Runtime"
description: "Google AX points to a new class of distributed agent runtime. This guide compares the two closest open-source projects, Agyn and Dapr Agents, across execution units, recovery, isolation, deployment, and fit."
date: "2026-06-06"
updated_at: "2026-06-06"
article_type: review
tags: ["agent-runtime", "google-ax", "agyn", "dapr-agents", "durable-execution", "agent-infrastructure"]
draft: false
---

## Short Answer

If you are looking at [Google AX](https://github.com/google/ax), do not treat it as another LangGraph, CrewAI, or OpenAI Agents SDK. AX is closer to an **agent execution control plane**. It cares about controllers, event logs, executions, conversations, remote agents, tools, resume, fork, and traces rather than how to write a prompt or graph.

Among public projects, the two closest comparisons are:

| Project | Why it is close to AX | Biggest difference | Recommendation |
|---|---|---|---|
| [Agyn](https://github.com/agynio/platform) | Self-hosted, Kubernetes-native, agent runtime, runs arbitrary agent containers, emphasizes enterprise isolation and governance | More like an enterprise agent fleet platform; its public story is less centered on event-log semantics than AX | Choose Agyn if you want to move Claude Code, Codex, or custom agents onto company infrastructure |
| [Dapr Agents](https://github.com/dapr/dapr-agents) | Built on Dapr workflow, actors, and state stores; focused on resilient, observable, Kubernetes-native agent systems | More of an agent framework plus durable workflow runtime; its agent protocol boundary is less low-level than AX | Choose Dapr Agents if you already like Dapr/Kubernetes and want multi-agent durable workflows |

**My take: Agyn is closer to AX's deployment and security direction; Dapr Agents is closer to AX's reliable execution direction.**  
If you are building a coding-agent runtime or control plane, borrow AX's event log / resume / fork model, Agyn's container and MCP isolation, and Dapr Agents' workflow / actor / state-store foundation.

---

## Why Not Center LangGraph or Temporal?

They matter, but they answer a different question.

LangGraph is a strong agent workflow framework. Temporal, Restate, and DBOS are durable execution substrates. They can all host agent workloads, but they are not the closest architectural peers to AX.

AX asks a lower-level runtime question:

> How should an agent execution be started, recorded, resumed, forked, audited, and connected to remote agents, tools, and environments?

That is why this article focuses on **Agyn** and **Dapr Agents**.

---

## Runtime Comparison

| Dimension | Google AX | Agyn | Dapr Agents |
|---|---|---|---|
| Core positioning | Distributed agent runtime / executor | Self-hosted Kubernetes-native agent runtime | Resilient agent framework on Dapr |
| Main execution unit | conversation, execution, remote agent, tool | agent container, MCP container, conversation sandbox | agent, workflow, actor, task |
| Control plane | AX Controller for execution, event log, registry | Platform control plane plus Terraform/IaC and console | Dapr sidecar / workflow / actor runtime |
| State model | Event log with single-writer controller | Platform activity, traces, config, run state | Dapr Workflow state, state store, actor state |
| Recovery semantics | resume, last-sequence catch-up, fork from checkpoint | serverless spawn, idle scale-to-zero, activity history | workflow retry, recovery from state, actor state retention |
| Isolation boundary | remote agent / tool / environment actor | separate containers for agents and MCP servers, zero-trust networking | app / sidecar / actor / workflow boundary |
| Target integrations | harness/model agnostic remote agent protocol | Claude Code, Codex, custom agent containers | Python agent framework plus Dapr building blocks |
| Deployment | self-hosted, Kubernetes-friendly | self-hosted Kubernetes with Terraform / Helm ecosystem | Dapr / Kubernetes / self-hosted |
| Maturity | early, likely breaking changes | very new, platform-heavy, AGPL | built on Dapr, still moving quickly |

---

## Google AX: Agent Execution as a First-Class Object

AX's most interesting idea is not that it can run Gemini or expose a CLI. It is that it turns several agent-execution concepts into first-class runtime objects:

- **Controller**: coordinates agents, tools, skills, and environments.
- **Event log**: turns execution into durable, recoverable, auditable state.
- **Conversation / execution**: not a one-off request, but an execution stream that can continue, resume, and fork.
- **`last_seq` catch-up**: a disconnected client can receive missed events by sequence instead of restarting.
- **`fork`**: a new execution can branch from a checkpoint.
- **Trace UI**: execution logs become inspectable rather than being buried in a transcript.

This model fits long-running agents, especially coding agents. They call tools, modify files, wait for confirmation, get interrupted, recover context, and sometimes need to branch from an earlier point to try another implementation.

AX is still early. Its README warns that core protocols and runtime specifications may change before stability. Treat it as a valuable architectural reference, not yet as a boring production dependency.

---

## Agyn: The Enterprise Deployment Cousin of AX

[Agyn](https://github.com/agynio/platform) has a direct pitch: move Claude Code, Codex, and custom agents from laptops to company infrastructure. It is less about designing agent graphs and more about answering the operational questions enterprises ask:

- How do agents get deployed centrally?
- How do secrets stay out of the LLM context?
- Can MCP servers be isolated from the agent process?
- Can budgets be controlled per agent, team, or organization?
- Can agents scale to zero when idle?
- Can agent configuration live in Terraform and go through review?

That makes Agyn close to AX. Both are about **agent serving, runtime, and control planes**, not just agent SDKs.

### Agyn Strengths

**1. Isolation and security are productized.**  
Agyn emphasizes agent containers, MCP servers in separate containers, credentials injected only into the tools that need them, and zero-trust networking. This is one of the easiest layers to underestimate when running enterprise agents.

**2. Existing coding agents are a primary target.**  
AX is more protocol- and runtime-oriented. Agyn more directly says it can run Claude Code, Codex, or a custom agent container. For teams that already use coding-agent CLIs, that is a simpler mental model.

**3. IaC is central.**  
Managing agents, models, MCP servers, secrets, and runners through Terraform fits how infrastructure teams work. Agents become reviewable infrastructure objects rather than temporary processes on someone's laptop.

### Agyn Risks

**1. It is very new.**  
As of June 6, 2026, the public repository is young. Stability, ecosystem depth, and upgrade paths need hands-on validation.

**2. The AGPL license matters.**  
If you plan to embed it into a commercial product or internal platform, check your company's AGPL policy first.

**3. Its recovery semantics are less explicit than AX's.**  
Agyn talks more clearly about deployment, isolation, and governance. AX's `event log + last_seq + fork` execution semantics are still more explicit.

### Best Fit

Choose Agyn if your problem is: "We already have Claude Code, Codex, or custom agents. How do we run them securely on company infrastructure?"

---

## Dapr Agents: The Reliable Execution Cousin of AX

[Dapr Agents](https://github.com/dapr/dapr-agents) is not a direct AX replacement, but it is close in a different way. It places agents on top of Dapr's workflow, actor, state, pub/sub, and service invocation primitives.

Its core idea is not "run any agent container." It is "use Dapr's distributed-systems foundation to make agent workflows recoverable, observable, and scalable."

### Dapr Agents Strengths

**1. Durable workflow is first-class.**  
Dapr Agents explicitly puts agentic workflows on a durable execution workflow engine. When tasks fail, nodes crash, or the network breaks, workflows can retry and recover from state. That goal is close to AX's event-log and resume model.

**2. The actor model fits agents.**  
Agents often have identity, state, and sequential message handling. Dapr actors provide a mature abstraction: each actor is a thread-safe state unit that can be reclaimed when idle and activated again when needed.

**3. Enterprise integration is broad.**  
Dapr already has state stores, pub/sub, bindings, service invocation, resiliency policies, and mTLS. For enterprise backend teams, this can be easier than building agent runtime primitives from scratch.

### Dapr Agents Risks

**1. It is more framework plus runtime than pure runtime.**  
AX explicitly says it is not an agentic framework. Dapr Agents exposes agent APIs, multi-agent features, contextual memory, tool selection, and other higher-level primitives. You need to accept its development model.

**2. Isolation is less emphasized than in Agyn.**  
Dapr gives you app and sidecar boundaries, but if you need to run untrusted coding agents, isolate MCP servers, constrain filesystems, and protect credentials, you still need extra design.

**3. Dapr knowledge is a prerequisite.**  
If your team does not already use Dapr, you need to learn sidecars, components, actors, and workflows before the agent layer feels natural.

### Best Fit

Choose Dapr Agents if your problem is: "We want to build our own agent applications with built-in workflow recovery, state, pub/sub, and observability."

---

## How to Choose

### 1. Are you hosting existing agents or building your own?

If you want to host **existing coding agents or CLI agents**, start with **Agyn**. Its mental model is containerize, centralize, and govern agents.

If you want to build **your own agent application** with durable workflow and distributed state, start with **Dapr Agents**.

### 2. Is the first priority isolation or recovery?

If the priority is **secrets, MCP servers, network access, and container isolation**, look at Agyn.

If the priority is **workflow retry, actor state, pub/sub, and service invocation**, look at Dapr Agents.

### 3. Which part of AX are you trying to reproduce?

| AX idea you want | Closest project |
|---|---|
| remote agent / tool isolation | Agyn |
| agent fleet management | Agyn |
| IaC-managed agent configuration | Agyn |
| durable workflow recovery | Dapr Agents |
| actor-like long-lived agent identity | Dapr Agents |
| enterprise integration primitives | Dapr Agents |
| event log, last_seq, fork, trace semantics | AX itself remains the clearest reference |

---

## Advice for Developers

If you are just building a normal AI app, you probably do not need AX, Agyn, or Dapr Agents first. LangGraph, OpenAI Agents SDK, Google ADK, or Vercel AI SDK may get you further faster.

Agent runtime becomes worth studying when:

- agent tasks run for a long time and cannot restart from scratch;
- agents call privileged tools and need audit or approval;
- multiple agents, tools, or MCP servers need isolation;
- you want to move agents from laptops to team infrastructure;
- you need trace, resume, fork, or replay;
- the agent is not just a chat surface but a long-running execution entity.

That is where AX, Agyn, and Dapr Agents become interesting.

---

## CodePick Recommendation

**Learn from AX first, but implement with Agyn or Dapr Agents depending on your problem.**

- Building an enterprise coding-agent platform: study **Agyn** first.
- Building durable multi-agent applications: study **Dapr Agents** first.
- Designing your own agent runtime or control plane: read **Google AX** carefully, especially its controller, proto, event log, resume, fork, and trace model.

The strongest architecture is not necessarily choosing one. Think in layers:

1. Use AX to learn execution and event-log semantics.
2. Use Agyn to learn agent/tool/container/security boundaries.
3. Use Dapr Agents to learn workflow/actor/state reliability patterns.
4. Then decide whether your product needs an agent platform or a durable workflow runtime.

---

## Official Links

- [Google AX GitHub](https://github.com/google/ax)
- [Agyn GitHub](https://github.com/agynio/platform)
- [Dapr Agents GitHub](https://github.com/dapr/dapr-agents)
- [Dapr Agents docs](https://docs.dapr.io/developing-ai/dapr-agents/dapr-agents-core-concepts/)

