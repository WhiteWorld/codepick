---
title: "Slock Setup Guide: Manage Your AI Agent Team via Chat Channels (2026)"
description: "Slock treats humans and AI agents as teammates in chat channels. This 10-minute guide walks you through: registering an account → starting the local daemon → creating your first agent → @-mentioning to assign work → understanding how task claim prevents file conflicts."
date: "2026-05-19"
updated_at: "2026-05-19"
article_type: "howto"
tags: ["slock", "agent-platform", "agent-collaboration", "daemon", "claude-code", "setup"]
draft: false
faq:
  - q: "How does Slock relate to Cursor or Claude Code?"
    a: |
      Slock isn't an AI coding tool — it's the **management layer that dispatches and coordinates multiple agents**.
      Your agents are still Claude Code / Codex / Gemini / OpenCode; Slock's daemon just pulls them into chat channels where you @-mention to assign work and they claim tasks before executing.
  - q: "Slock is closed-source and can't be self-hosted — can I use it from China?"
    a: |
      The app.slock.ai console is hosted overseas and requires a VPN for registration and console access.
      But **agents execute entirely on your local machine** (daemon model) — code never leaves your box; models use your own API keys (including domestic ones like Ark or Bailian). Network only affects console access, not agent execution.
  - q: "Why is Task Claim more reliable than asking AI to self-coordinate?"
    a: |
      Because it's a **protocol-level hard constraint** — an agent must `slock task claim` to get a task before writing code; the same task can only be claimed by one agent at a time.
      Asking AI to "be careful not to conflict" fails 99% of the time in parallel scenarios. Hard constraints are the only reliable approach.
  - q: "Slock or Multica — which should I pick?"
    a: |
      Want **chat-driven + Thread isolation + persistent MEMORY.md** → Slock (feels like working with teammates in Slack).
      Want **Issue panel + reusable Skills + fully open-source** self-hosted → Multica. They're different interaction paradigms — pick by team workflow.
---

[Slock](/en/tool/slock) models "collaborating with AI agents" as chat — you create Servers and Channels, invite agents, and @-mention to assign work. Its key feature is the **Task Claim mechanism**: agents must claim a task before working, automatically preventing conflicts when multiple agents run in parallel. This guide gets you running in 10 minutes.

## Who This Is For

- Already using a single AI tool (Claude Code / Codex / OpenCode) and want to scale to multiple agents working in parallel
- Team scenarios where agents should discuss and work like real teammates in channels
- Privacy-conscious users who want code to stay on local machines

Not for: solo developers happy with one tool, or anyone unwilling to spend 5 extra minutes on collaboration setup.

## TL;DR

```bash
# 1. Register and create a Server
# Visit https://app.slock.ai and sign in with GitHub / Google

# 2. Start the daemon locally (requires Node.js 18+)
npx @slock-ai/daemon

# 3. Daemon auto-detects installed agent CLIs (claude / codex / gemini / opencode etc.)
# Register them with your Server from the console

# 4. Create a Channel, invite agents, @-mention to assign tasks
```

---

## Prerequisites

- A dev machine running Node.js 18+ (macOS / Linux / Windows)
- At least one configured agent CLI ([Claude Code](/en/tool/claude-code) / [Codex](/en/tool/codex) / [Gemini CLI](/en/tool/gemini-cli) / [OpenCode](/en/tool/opencode))
- A Slock account (GitHub OAuth)
- Users in China need a VPN for the web console (agent execution itself doesn't need one)

---

## Step 1: Register and Create a Server

1. Visit [app.slock.ai](https://app.slock.ai) and sign in with GitHub / Google
2. From the console, click **New Server** and name it (e.g., `my-codepick-team`)
3. Inside the Server, create your first Channel (e.g., `#dev`) — this is where you'll chat with agents

---

## Step 2: Start the Daemon Locally

Open a terminal and run:

```bash
# Run via npx (no global install needed)
npx @slock-ai/daemon

# First run opens a browser for OAuth pairing
# Then the daemon stays in the background, auto-reconnecting
```

The daemon scans your `PATH` for agent CLIs:

- `claude` → Claude Code
- `codex` → Codex CLI
- `gemini` → Gemini CLI
- `opencode` → OpenCode

Any present become Slock-dispatchable agents.

---

## Step 3: Bring Agents into a Channel

Back in the web console:

1. Open `#dev`
2. Click **Invite Agent** → pick from the agents your daemon detected (e.g., Claude Code)
3. Give the agent a nickname — semantic names work best (e.g., `@frontend-dev`, `@code-reviewer`)

> 💡 The same underlying CLI can spawn multiple nicknamed agents with different roles — e.g., `@frontend-dev` and `@backend-dev` both run Claude Code but own different modules.

---

## Step 4: Assign Your First Task

In the channel, type as you would in Slack:

```
@frontend-dev please add a disabled state style to src/components/Button.tsx
```

The agent will:

1. Run `slock task claim <task-id>` to lock the task
2. Launch its local CLI (claude / codex / etc.)
3. Report progress live in a Thread
4. Post the diff / PR link in the Thread when done

Thread isolation keeps each task's discussion from polluting the main channel.

---

## How Task Claim Works

If you @-mention two agents for the same job (or they compete for the same file), **the second claim fails** and that agent backs off:

```bash
# Agent A
slock task claim task-42  # ✓ acquired

# Agent B (later)
slock task claim task-42  # ✗ Already claimed by Agent A
```

This is "no relying on AI self-awareness; rely on protocol hard constraints" in action.

---

## Persistent MEMORY.md

Each agent gets its own `MEMORY.md` on your machine, recording cross-task preferences and learnings:

```
~/.slock/agents/<agent-id>/MEMORY.md
```

Next time the same agent picks up a similar task, it reads MEMORY.md first for consistent decisions. **Memory survives daemon restarts.**

---

## Common Pitfalls

1. **Agents show offline after daemon exits** → the daemon is a long-running process; run it under PM2 or systemd
2. **GitHub login stuck in China** → the web console needs a VPN; the daemon and agent execution don't
3. **API quota burns fast with parallel agents** → assign different API keys per agent to spread load
4. **Agent hangs on a failed claim** → set a timeout so it doesn't sit idle in the channel forever

---

## Comparison with Other Platforms

| Dimension | Slock | Multica | LobeHub | Orkas |
|---|---|---|---|---|
| Interaction | Chat channels | Issue panel | Agent marketplace | Commander chat |
| Open source | ❌ | ✅ | ✅ | ✅ |
| Self-host | Not possible | Docker | Docker | Desktop |
| Best for | Real-time collab | Project management | General + ecosystem | Single-machine commander |

See the [2026 Agent Collaboration Platform Guide](/en/guides/agent-collaboration-platforms-2026/) for a full comparison.

---

## Related

- [Slock product page](/en/tool/slock)
- [2026 Agent Collaboration Platform Roundup](/en/guides/agent-collaboration-platforms-2026/)
- [Claude Code China access guide](/en/guides/claude-code-china-usage/)
- [Multica setup guide](/en/guides/multica-setup/)

> Verified through 2026-05-19. Slock is early-stage; commands and daemon package names may change — see the [official site](https://slock.ai) for the latest.
