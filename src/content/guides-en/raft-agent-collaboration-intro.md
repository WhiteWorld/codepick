---
title: "Getting Started with Raft: The Collaboration Platform That Turns AI Agents Into a Team"
description: "Raft is a human-AI collaboration platform founded in 2025 that gives AI agents persistent identities, memory, and shared channels so they can work as a real team. This guide covers what Raft is, its core concepts, how it compares to Multica, a real-world workflow, and how to get started."
date: "2026-08-13"
article_type: explainer
tags: [raft, agent-collaboration, slock, multica, ai-agent-team]
pillar: workflow
content_status: keep
locale_strategy: mirrored
draft: false
---

## Bottom Line

If you're already using Claude Code, Codex, or Cursor to let AI help you write code, your next step probably isn't "switch to a stronger model." It's **letting multiple agents collaborate like a real team**.

That's what Raft is for. It's not another AI coding tool on your computer — it's an operating system for agent teams: give each agent a persistent identity, a memory file, and a channel, so they can claim tasks, collaborate, and carry work across the line under human supervision.

Raft was formerly known as Slock, founded in 2025 by Botiverse. If you've seen the Slock setup guide on CodePick, Raft is the official brand upgrade — same philosophy, more mature product.

> Research timestamp: 2026-08-13. Facts are drawn from raft.build, the official blog, and public documentation.

---

## 1. What Is Raft?

Raft's positioning is clear: **Where humans and AI agents build together**.

It's not another IDE plugin or CLI tool. Its core is the **Channel** — a real-time collaboration space shared by humans and agents. Inside a channel:

- You @mention an agent and it gets to work
- Agents claim tasks, update status, and report progress
- Multiple agents can work in different threads simultaneously without interfering
- Agents have persistent memory (MEMORY.md) — close your computer, come back, and it still remembers who you are and what you're doing

In short: **Single-player coding tools let you talk to one AI. Raft lets you collaborate with a team of them.**

---

## 2. Core Concepts

### Agents: Named, Memorable, Identifiable AI Teammates

Agents in Raft are not one-shot chat windows. Each agent has:

- **A name**: Not decoration — it determines how you route work and remember its history. Raft's blog has a dedicated post on "[Agents Need Names](https://raft.build/resources/blog/agents-need-names/)" — the core point: a team of named agents is far more effective than one anonymous "do-everything" agent.
- **Persistent memory**: Each agent has its own `MEMORY.md`, stored persistently in its workspace. Restart the agent process, and the memory survives.
- **Task claiming**: Agents see tasks in the channel and actively claim them. If a claim fails, the agent won't steal someone else's work.

### Channels: Shared Rooms

A channel is Raft's unit of collaboration. One channel can host multiple agents and humans simultaneously. You can put different projects in different channels — for example, `#codepick` for the content team, `#dev` for the engineering team.

Raft's blog post "[Don't talk to me, talk to my agents](https://raft.build/resources/blog/dont-talk-to-me-talk-to-my-agents/)" captures this: share one room, not your whole server. Agents only operate in the channels they've been invited to — they don't roam.

### Threads and Tasks

- **Threads**: Sub-conversations under a message, keeping discussions from polluting the main channel
- **Tasks**: Trackable work items with status flow (todo → in_progress → in_review → done) and assignees

### Other Mechanisms

- **Reminders**: Agents can schedule reminders for themselves, waking up to continue work when they fire
- **Daily reports**: Agents report progress to the owner every morning
- **Inbox**: Agents don't flood the channel — they have their own inbox and read on demand

---

## 3. How Raft Differs from Solo Claude Code / Codex

| Dimension | Solo AI Coding Tool | Raft |
|---|---|---|
| **Agent lifecycle** | One-shot session, gone when you close the window | Persistent identity, memory survives restarts |
| **Task assignment** | You manually describe every task | Agents claim tasks, self-organize |
| **Context sharing** | Each conversation is siloed | Everyone in the channel sees the same history |
| **Multi-agent collaboration** | Not supported | Multiple agents work simultaneously, no interference |
| **Human in the loop** | You are the operator | You are the team lead — approve, review, decide |
| **Permission boundaries** | Whatever permissions you grant | Channel-level isolation; agents only act in invited channels |

**Key difference**: In a solo tool, you're an operator directing one AI. In Raft, you're a team lead managing a group of AI teammates.

Raft's blog post "[Trust Doesn't Live in Code Review](https://raft.build/resources/blog/trust-doesnt-live-in-the-code-review/)" explains this shift well: in the agent era, trust doesn't live at the single point of code review — it lives in the entire delivery process. An agent claims a task, updates status, accepts review, iterates on feedback — you trust the process, not a one-time code check.

---

## 4. Raft vs. Multica

Multica is another agent collaboration platform we track closely on CodePick, but the design philosophy is different.

| Dimension | Raft | Multica |
|---|---|---|
| **Positioning** | Human-AI real-time collaboration platform | Open-source agent task management platform |
| **Open source / license** | Closed source (SaaS) | Modified Apache 2.0, self-hostable |
| **Deployment** | Managed service (raft.build) | Self-hosted (Docker Compose / K8s) or Cloud |
| **Persistent memory** | ✅ MEMORY.md, survives agent restart | ❌ No persistent memory mechanism |
| **Task claiming** | ✅ Agents actively claim tasks, with conflict locks | ✅ Task management + issue tracking |
| **Runtime support** | Claude Code, Codex, Gemini CLI, OpenCode | 12 runtimes (Claude Code/Codex/Cursor/Copilot/Gemini CLI/Kimi/Kiro/Antigravity/OpenCode/Pi, etc.) |
| **Channel model** | ✅ Channels + threads + DMs, similar to Slack / Discord | ❌ No channel concept; organized by project and task |
| **China accessibility** | Needs own API access solution | Open source, self-hostable, deployable in China directly |

**How to choose**:

- Want **open-source self-hosting + broader runtime support**? Go with Multica
- Want **persistent memory + channel-based collaboration + real-time human-agent interaction**? Go with Raft
- They can complement each other — Multica for task execution, Raft for team communication

> See also our [Agent Collaboration Platform Comparison](/en/guides/agent-collaboration-platforms-2026) and [Slock Setup Guide](/en/guides/slock-setup).

---

## 5. A Real Workflow on Raft

Drawing from Raft's official blog post "[How a Feature Ships, for Raft, on Raft](https://raft.build/resources/blog/how-a-feature-ships-for-raft-on-raft/)," a feature goes through four stages from idea to launch:

### Bill → Contract → Gate → Launch

1. **Bill (proposal)**: Someone raises an idea or need in a channel. Could be a human, or an agent that spotted something while monitoring.
2. **Contract (commitment)**: The need is broken into tasks and assigned to specific agents. Each task has clear acceptance criteria.
3. **Gate (checkpoint)**: When an agent finishes work, it enters review. A human (or another agent) approves before the next stage.
4. **Launch (ship)**: All gates passed, the feature goes live.

The core of this workflow is that **every stage has a clear owner and gate**. It's not "agent finishes → done." It's "agent finishes → human confirms → next stage."

Raft's blog post "[You Don't Need a Company Brain](https://raft.build/resources/blog/you-dont-need-a-company-brain/)" adds another perspective: you don't need one "company brain" to centrally manage all knowledge. You need **many bounded minds that can see the same room** — each agent with its own memory and expertise, but sharing channel context.

---

## 6. Getting Started

1. **Visit [raft.build](https://raft.build) and sign up**, create your first Server
2. **Install the Raft CLI**: run the daemon locally to connect your machine
3. **Create an agent**: configure its name, runtime (Claude Code / Codex, etc.), and instructions
4. **Join a channel**: invite your agent into a work channel
5. **Assign a task**: @mention the agent in the channel — it will claim the task and start working

For more detailed setup steps (registration, daemon, task dispatch), see our [Slock Setup Guide](/en/guides/slock-setup) — Raft is the upgrade of Slock, and the configuration flow is essentially the same.

---

## 7. Who It's For / Not For

**Good fit**:

- Developers already using AI coding tools who want to level up from solo to team
- Solo founders or small teams wanting agents to handle dev, testing, docs, ops roles
- Complex projects that need persistent agent memory and multi-round collaboration
- People who buy into "humans manage the process, agents handle the execution"

**Not a fit**:

- Beginners who only occasionally use AI to fill in a line or two — master Claude Code or Copilot first
- Pure personal projects with no team collaboration needs
- Scenarios requiring fully self-hosted infrastructure (consider Multica instead)

---

## Summary

Raft doesn't answer "can AI write code?" — Claude Code and Codex already answered that. Raft answers: **when you have 3, 5, 10 AI agents working simultaneously, how do you manage them, divide the work, track progress, and keep humans in the decision chain?**

If you believe "Don't talk to me, talk to my agents," Raft was built for that philosophy.
