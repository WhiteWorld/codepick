---
title: "Muse Architecture Explained: Agent Loops, Dedicated VMs, Memory, and Background Work"
description: "Follow a task through Meta Muse: Hatch advances the agent loop inside a dedicated VM, inference runs outside it, and context, memory, subagents, and permissions keep the work moving. Includes an architecture diagram and evidence limits."
date: "2026-09-24"
article_type: explainer
tags: [muse, meta, agent, agent-harness, agent-runtime, memory, sandbox]
pillar: stack
content_status: keep
locale_strategy: mirrored
draft: false
faq:
  - q: "Does Muse's agent loop run inside the VM?"
    a: "Hatch, the loop controller, runs in the dedicated VM's systemd-nspawn runtime cell. Each model inference request goes through a proxy to infrastructure outside the VM. The complete task loop therefore crosses that boundary."
  - q: "Does the model see every saved memory on every turn?"
    a: "Only material included in the current context is visible to that inference request. Being stored, being searchable, and being loaded into context are distinct states. We cannot assume that all memory files are injected in full on every turn."
  - q: "Does a succeeded background run prove that the user received its result?"
    a: "No. Execution completion, handoff, notification generation, and delivery need separate evidence. The observations described here do not establish a universal delivery or recovery contract."
---

## A Mental Model for Muse

**Muse gives the model task material, gets a decision, executes the next step through Hatch, and returns the actual result to the model. Memory, durable state, and background work let this process continue across conversations.**

This article covers Meta's personal agent **Muse at muse.ai**. Muse Spark is the model; the personal product also includes a harness, a dedicated computing environment, tools, state, and permissions. Public Model API examples explain useful patterns, but are not documentation of the personal product's internal protocol.

Keep three questions in mind:

1. **Who advances the task?** The model produces decisions; Hatch coordinates execution and the next input.
2. **What persists?** Files, memories, and run state can outlive an inference request. The current context contains a selection of that material.
3. **When does an action actually happen?** A tool request still needs execution and, where applicable, permission.

> Scope: research observations are dated September 23, 2026. This article was prepared on September 24, with the main official pages checked again. Deployment claims follow Meta's description of the launch architecture. Internal documents, tool schemas, and run metadata were reported by Muse after authorized questions in its main chat. The research did not directly log into the VM or obtain complete execution logs.

## Architecture: The Dedicated VM Is Part of Meta's Backend

[![Muse architecture: Meta hosts a dedicated VM and external inference infrastructure; Hatch advances the task inside the VM and returns tool results to the next context](/images/guides/muse-architecture-en.svg)](/images/guides/muse-architecture-en.svg)

Open the diagram to enlarge it. Components are grouped by responsibility; arrows are learning aids rather than an exact RPC sequence or a complete infrastructure map.

Meta places **Hatch inside a systemd-nspawn runtime cell in the dedicated VM**, with inference reached through a proxy outside the VM. Meta also provides an external telemetry path and continuous VM backups. The published explanation does not detail ingress, user routing, push delivery, or VM scheduling topology. [Official architecture](https://research.meta.ai/blog/security-and-safety-for-ai-agents-our-approach-with-muse)

There are two nested boundaries: the **VM** and the **runtime cell**. A process listing inside a container only shows its visible environment. Failing to see a service there does not prove that the service runs on another machine.

For learning purposes, follow these responsibilities:

| Component | What to look for |
|---|---|
| Client | Goals, corrections, results, and approval responses |
| Model | An answer or a proposed tool call based on visible material |
| Hatch / harness | Prepared inputs, dispatched calls, collected results, and the next iteration |
| Tools and working files | Parameters becoming execution results, artifacts, and reusable material |
| State and permission services | Recorded progress and decisions about whether controlled actions may proceed |

This division is consistent with Meta's [Agent frameworks documentation](https://dev.meta.ai/docs/agent-frameworks). It is a teaching abstraction, not a claim about every internal Hatch module.

## Follow One Task Through the Agent Loop

Suppose a user asks: “Compare how three developer tools are deployed and write a report.” The following is an illustrative walkthrough, not a captured production trace.

### 1. Prepare the Current Input

The runtime needs a **context** for this inference request: the user's goal, relevant history, available evidence, constraints, and tool definitions.

What the model can consider depends on this input. A document existing in the working directory does not mean the model has read it.

### 2. Obtain a Decision

The model might request another source, or conclude that it already has enough information to answer.

A tool call describes an intended operation and its arguments. The call itself does not establish that a page was retrieved or that a report was written.

### 3. Execute and Observe

The runtime dispatches the request to a tool or controlled execution service. The return value might contain page content, an artifact path, or a status. It might instead report a denial, timeout, or error.

The next decision must account for that **actual return value**: try another source, change approach, ask for missing information, or finish the report.

### 4. Feed Results into the Next Iteration

```text
Goal and constraints
        ↓
Hatch: context (inside VM)
        ↓
Model inference (outside VM)
        ├─ Answer → deliver / wait
        └─ Tool request
                ↓
       Execution → result / error
                └→ next context
```

Meta's [Tool calling documentation](https://dev.meta.ai/docs/tool-calling) illustrates the request, execution, and result-return pattern. This walkthrough borrows that logical relationship without assuming the personal product uses the same SDK or internal fields.

A task may need several iterations or parallel subtasks. **The loop describes feedback, not a requirement to serialize every task into one queue.**

## Memory, History, and Context Have Different Jobs

Separate three representations:

- **History:** previous interactions and execution records.
- **Persistent memory:** selected information intended to help future tasks.
- **Current context:** what this particular model request actually contains.

Meta's [product design account](https://introducing.muse.ai/) describes memory files that users can inspect and edit. Documents and tool descriptions reported by Muse in this research expose several distinct transformations:

| Operation | Transformation | Purpose and information loss |
|---|---|---|
| History compaction | Long history → summary and retained recent entries | Continue the present task; some detail is omitted |
| Memory consolidation | Conversations and experience → longer-lived facts and notes | Support future tasks; notes are not verbatim chat archives |
| On-demand skill reading | Short description → detailed instructions | Add methods and constraints when needed; reading a skill grants no permission |
| Deferred tool loading | Namespace overview → full schema | Describe how to call a tool; a schema is not executable tool code |

For example, a user might prefer official sources in reports. The original statement can remain in history, while a selected preference becomes memory. For the next report, relevant material still needs to enter the current context to inform that request.

**Stored, searchable, and loaded are different states.** “The memory contains this fact” and “the model saw it on this turn” require different evidence.

### What the Observations Establish

Muse reported seven `compaction_checkpoint` records containing trigger information and before/after token counts. Those records establish the presence of compaction checkpoints in the sample. They did not contain a model field, so they do not identify a dedicated compaction model or a fixed threshold algorithm.

The reported interfaces also distinguish `memory_search`, which searches memories, from `chat.read_messages`, which reads a specified chat. The client has a chat-search surface. A limitation of one agent tool must not be generalized into a claim that the whole product lacks chat search.

These are environment observations from September 23, not a public stable-interface contract. They do not identify a particular vector database, remote index, or retrieval algorithm.

## Background Work Has More Than One Completion Point

Continuing after the app closes requires server-side execution, recorded progress, and a way to return useful results. Meta's [design account](https://introducing.muse.ai/) describes scheduled and event-driven work, followed by a judgment about whether the outcome warrants notifying the user.

When investigating a background task, ask four separate questions:

| Stage | Question |
|---|---|
| Trigger | Did the scheduled time or relevant event occur? |
| Execution | Was a run created, and what state did it report? |
| Handoff | Did the main agent receive a result it could act on? |
| User receipt | Was a notification chosen, and did delivery occur? |

This is an investigation framework, not a claim that every task traverses four identical physical services.

The research received three cron records marked `succeeded`, one successful memory-consolidation run, and five subtask-completion handoffs associated with worker identifiers. They demonstrate samples of execution and handoff. **They are not one joined trace** from scheduled trigger to user delivery.

A query finding no matching rows in one handoff-deduplication table also cannot prove that no other message path has a record. Without the connecting keys, the gap remains open.

### Where a Subagent Starts

The reported `subagent.spawn` schema says a general subtask inherits the parent's transcript as its starting point. Parent and child then advance separately, with results returned by the runtime. The exact snapshot boundary and trimming rules remain unclear; this is not evidence of a continuously shared mutable context.

The useful distinction is: **background can be inherited; subsequent progress must be communicated.** Knowing the parent's initial material does not mean the parent automatically knows everything the child later does.

## Permissions Are a Separate Part of Execution

Meta locates PostgreSQL, `hatch-authd`, Sentinel, controlled connector workers, and the browser broker outside the runtime cell. Sentinel determines permission and, when needed, exchanges approval requests directly with the client. [Official safety architecture](https://research.meta.ai/blog/security-and-safety-for-ai-agents-our-approach-with-muse)

Return to the report example: preparing a report and sending it to someone are separate actions. Even after a sending request has been generated, execution can be awaiting approval, denied, or failed. Later records need to preserve those distinctions.

From an engineering perspective, three representations carry different authority:

- **Model output** expresses the proposed action.
- **Permission state** determines whether a controlled action is authorized.
- **Execution results** describe what actually happened.

Collapsing these into conversational prose makes it easy to confuse intention, authorization, and completion. That is a design lesson drawn from the architecture.

## How Self-Improvement Can Affect Later Tasks

The reported material supports this path:

```text
Task experience
    ↓
Memory / skill revision
    ↓
Later context
    ↓
Changed action
```

A successful procedure written into a skill can become useful instructions for a similar future task. The observable change is initially in material the agent can read.

A successful consolidation run establishes its reported run state; verifying a file change still requires the corresponding artifact. This investigation obtained no evidence that a self-improvement task inside the user's VM updates the base model's weights online.

## What Remains Unconfirmed

| Observation or claim | Supported interpretation |
|---|---|
| A service is absent from the container's process list | Container visibility is limited; its location outside the VM does not follow |
| Compaction records or related binary strings exist | There are implementation clues, but the active model, threshold, and routing remain unknown |
| Memory retrieval returns related content | Retrieval exists; the index location and algorithm are not established |
| Cleanup records appear about 90 minutes apart on average | That measures record spacing, not a VM reboot interval without matching evidence across boots |
| A background run succeeded | The run reports success; a memory change or user delivery does not automatically follow |
| VM backups exist | This does not establish lossless recovery of arbitrary running work or exactly-once execution |

Ingress, push delivery, and VM scheduling topology; full retry, deduplication, and recovery semantics; and memory-index and compaction policies remain outside the evidence obtained here.

## What Agent Developers Can Take Away

Use four questions to examine your own system:

1. **Can you trace an iteration?** Find its model input, proposed calls, actual returns, and reason for continuing.
2. **Are representations distinct?** Raw records, summaries, memories, and current inputs serve different purposes.
3. **Are asynchronous outcomes distinct?** Execution success, result consumption, and user delivery should be observable separately.
4. **Does authorization have independent state?** A model's sentence should not simultaneously serve as request, approval, and proof of completion.

With these questions, Muse becomes understandable as a system for sustained work: models make current decisions, the runtime connects action to feedback, information management bridges time, and permissions constrain execution.

## Sources and Scope

- [How We Built Safety Into Muse](https://research.meta.ai/blog/security-and-safety-for-ai-agents-our-approach-with-muse): deployment and permission boundaries at launch.
- [How We Designed Muse](https://introducing.muse.ai/): conversations, background work, notification decisions, and editable memory.
- [Meta Model API — Agent frameworks](https://dev.meta.ai/docs/agent-frameworks): responsibilities of models and frameworks.
- [Meta Model API — Tool calling](https://dev.meta.ai/docs/tool-calling): the general tool-request and result-return pattern.
- Research material dated September 23, 2026: a user-supplied Muse implementation summary and authorized questions in Muse's main chat, followed by reported documentation, tool schemas, and read-only metadata. This article summarizes mechanisms and evidence limits without publishing private chats, account information, or raw run identifiers. Those environment observations cannot be independently reproduced from the public links alone.

Continue reading: [Agent Runtime Responsibilities and Selection](/en/guides/agent-runtime-ax-agyn-dapr/) and [AI Coding Agent Security](/en/guides/ai-coding-agent-security-2026/).
