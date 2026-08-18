---
title: "Cumora Guide: Team Chat Where AI Agents Are First-Class Teammates"
description: "Cumora is an open-source, cross-platform team-chat workspace where humans and AI agents share conversations, projects, Kanban, and calendars. Learn how Cloud and BYOA differ, how Cumora prevents multi-agent collisions, how to get started, and how it compares with Raft and Multica."
date: "2026-08-18"
article_type: explainer
tags: [cumora, agent-collaboration, ai-agent-team, byoa, claude-code, codex]
pillar: workflow
content_status: keep
locale_strategy: mirrored
draft: false
---

## Short Answer

**Cumora is not a chatbot dropped into Slack.** It is trying to make AI agents real teammates: they have names, personas, memory, and status; they can join group chats and DMs, claim work, coordinate with other agents, and run either as Cumora-hosted cloud agents or with Claude Code and Codex as their local “brains.”

If you need a workspace in which several agents can behave like a team, Cumora is worth watching. If you only need one terminal agent to fix a bug, Claude Code or Codex alone is the more direct choice.

> Checked on 2026-08-18. Cumora remains in invite-only preview. This guide follows the [official site](https://cumora.ai/) and [open-source repository](https://github.com/yetone/cumora); public capabilities and product timing can change.

---

## 1. What Is Cumora? Agents Live in the Team Room

[Cumora](https://cumora.ai/) describes itself as **“Where agent teams gather.”** It is cross-platform team chat: humans and agents share the same roster, DMs, and group conversations, along with projects, a Kanban board, and a calendar.

Its central claim is that an agent should not appear only when you open a chat box and type a prompt. It should be a **persistent teammate**. In Cumora, an agent can have:

- **A persona**: a role, voice, and editable system prompt. The official starter team uses Atlas the researcher, Iris the designer, Bram the engineer, and Nova the product manager to show role separation.
- **A private workspace**: files, notes, and observations stay with the agent instead of disappearing when a new conversation begins.
- **Initiative**: idle agents can wake on a cadence you set, inspect the team state, and decide whether to post, DM a teammate, or convene a smaller group.
- **Agent-to-agent collaboration**: agents can DM each other; Whisper rooms let humans observe without interrupting; a Convene can gather the relevant people around a focused topic and record the decision.

That is materially different from @mentioning a bot in an IM app. One is a question-and-answer surface; the other attempts to make agents first-class participants in a working relationship.

## 2. Two Brains: Cumora Cloud or BYOA?

Cumora separates the collaboration interface from the agent execution brain and offers two paths.

| Dimension | Cumora Cloud | BYOA (Bring Your Own Agent) |
|---|---|---|
| Where the agent runs | Cumora-managed per-agent pod | Your Mac, VPS, or another machine you control |
| Brain | A managed multi-hop tool loop on the OpenAI Responses API | Local Claude Code or Codex CLI |
| Key ownership | Handled through Cumora’s Cloud configuration and billing model | Provider keys/subscription remain on your machine; the server should not see them |
| Best for | People who want a working agent team quickly | People with existing Claude Code / Codex subscriptions who care about execution and key control |
| Main trade-off | You accept a hosted runtime, product access, and evolving billing details | You operate an online machine, CLI environment, and local permission boundary |

### Choose Cloud to Validate the Collaboration Experience

The Cloud path puts each agent in a separate managed pod. Agent turns use a tool-calling loop for bash, files, browser access, email, memory, skills, and more. It is a good way to test one specific proposition: **does putting research, design, engineering, and product roles in one room actually reduce your coordination load?**

Do not mistake a managed pod for automatic safety, though. Confirm what data and tools an agent can access, which actions can write, whether outbound email requires approval, and where spend limits live.

### Choose BYOA to Keep Existing Coding Agents and Key Control

The BYOA pairing command is:

```bash
npx cumora agent computer
```

It pairs the machine running that command with Cumora and lets local Claude Code or Codex CLI serve as the agent’s brain. The public documentation says provider keys are not given to the Cumora server. That is attractive to teams already paying for Claude Code or Codex and unwilling to hand keys to another SaaS layer.

The operational cost is real: the machine must stay available, the local agent’s shell/file/browser permissions need their own limits, and the team still needs rules for what can happen autonomously and what must wait for a human.

## 3. The Real Problem: How Several Agents Avoid Collisions

Multi-agent systems usually fail not because a model cannot answer, but because stale messages trigger duplicate replies, two agents take the same work, or every notification wakes an expensive model. Cumora’s open-source repository makes all three explicit coordination concerns.

### 1. The seen-cursor freshness gate

Before an agent sends a reply, the server checks whether the message position it saw is still current. If newer messages arrived while it was reasoning, the old reply is HELD and the agent receives the newer context to decide again. It does not promise zero duplicates; it adds a gate before an agent acts on an outdated room state.

### 2. Atomic claims

Real work units use atomic claims. The first agent to claim successfully gets the execution right; an agent that loses the claim should not quietly do the same work in parallel. This looks simple, but it is the foundation of avoiding duplicate labor.

### 3. Small-brain triage

Not every notification deserves to wake a large model. Cumora routes events through a smaller model first, so only events that need reasoning or action reach the “big brain.” This manages both cost and noise, but it is also an ongoing product trade-off: missed or mistaken routing affects the experience.

The transferable principle is more important than the terminology: establish that a message is fresh, work is unclaimed, and the event merits attention **before** asking an agent to act.

## 4. What the Architecture Means in Practice

Cumora’s UI is React 18 + Vite + TypeScript, with Electron, PWA, iOS, and Android shells. Its server uses Express + `ws`, Postgres for source-of-truth state, and Redis for pub/sub and presence. Cloud agents run in Kubernetes pods, while BYOA agents run on the machine hosting your daemon.

For a user, that translates into three practical observations:

1. **Cross-device state is part of the product.** Desktop, browser, and phone share a team state, which suits ongoing collaboration rather than one-off commands.
2. **Local development has infrastructure costs.** Running from source requires Postgres, Redis, and `OPENAI_API_KEY`; `npm run dev:all` starts the frontend and API. Open source does not mean a dependency-free, one-command self-hosted product.
3. **Cloud and BYOA share a collaboration protocol but not a risk model.** With Cloud, review the hosted execution surface. With BYOA, review your machine’s permissions, availability, and updates.

## 5. How Does It Fit Beside Raft and Multica?

All three are agent collaboration platforms, but they center different working objects. This is a workflow-oriented comparison based on public materials, not a feature-completeness ranking.

| Dimension | Cumora | Raft | Multica |
|---|---|---|---|
| Collaboration center | Agent-first chat, personas, memory, and proactive conversation | Human-agent channels, tasks, and delivery gates | Projects, tasks, issues, and agent execution |
| Runtime model | Cloud pods or local Claude Code / Codex through BYOA | Managed collaboration layer plus local agent runtimes | Open-source self-hosting or Cloud with many local runtime connections |
| Openness and deployment | MIT source; local development needs Postgres / Redis | Currently more oriented around a managed-platform experience | Modified Apache 2.0; self-host with Docker Compose / Kubernetes |
| Distinctive strengths | Personas, agent-to-agent chat, Whisper, Convene, seen-cursor | Persistent identity and memory, channels/threads/tasks, visible workflow | Broad runtime coverage, task and issue tracking, real-time execution progress |
| A good first experiment | Ongoing research, product exploration, and creative collaboration | Clear human-in-the-loop task flows and team communication | Privacy-first, self-hosted engineering task management |

If you have read our [Raft guide](/en/guides/raft-agent-collaboration-intro), think of Cumora as a different expression of the same trend: Raft puts more emphasis on visible collaboration process; Cumora puts more emphasis on agents “living” in the room as teammates. For the wider category map, see our [2026 agent collaboration platform guide](/en/guides/agent-collaboration-platforms-2026); for the existing scenario comparison, see [Helio vs Cumora](/en/guides/helio-vs-cumora-agent-collaboration).

## 6. Getting Started: Begin With One Low-Risk Team

Cumora is currently invite-only preview, so first request access on the [official site](https://cumora.ai/) and install it using the available device download. Once you have a workspace, do not begin by giving agents production access. Start in this order:

1. **Set up only two to four roles.** For example: research, product, engineering, and review. State each role’s deliverables, prohibited actions, and human-escalation conditions.
2. **Calibrate personas on low-risk work.** Research summaries, competitor tables, document drafts, and test ideas make better first-week tasks than deployments, destructive operations, or external email.
3. **Choose one execution path.** Use Cloud to test the collaboration surface quickly; use BYOA if you already have local Claude Code / Codex and want keys to stay on your machine.
4. **Create task and approval rules.** Use claims to prevent duplication. Make PRs, deployments, external email, payments, and production data explicit human gates.
5. **Set a cadence and notification budget.** Proactive agents are valuable when they surface the right things, not when they post all day. Begin infrequently, then increase only after proving that reminders are useful.

## 7. Who Is It For—and Who Should Wait?

**A good fit:**

- Individuals, founders, and small teams who already have several AI work roles and want to move from scattered prompts to a shared workspace.
- Research, product, design, and content teams that value long-lived memory, proactive observation, and agent-to-agent discussion.
- People with Claude Code or Codex who want local execution and key control but also a shared collaboration interface.
- Teams willing to validate a new workflow with low-risk projects while the product is in preview.

**Probably not yet a fit:**

- A solo developer who only needs a terminal coding agent.
- Teams that cannot accept invite-only preview access, rapid product change, or an immature enterprise-governance story.
- Environments that expect “install it and be fully offline/self-hosted”; runnable source code does not mean every product service is zero-operations self-hosting.
- Teams planning to connect agents to production, external communications, or high-privilege systems without clear human approval boundaries.

## Summary

Cumora is interesting not because it adds another agent chat, but because it asks a serious question: **when agents are real team members, what should chat, memory, initiative, task locking, and permission boundaries look like?**

If you want a small AI team that can keep talking and thinking, Cumora is a compelling experiment. If you want to use it for real work, define the Cloud/BYOA execution boundary, claiming rules, and human gates first. An agent acting like a colleague does not mean it should be able to bypass one.
