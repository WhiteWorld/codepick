---
title: "Claude Code Agent Teams: A Practical Guide to Multi-Agent Development"
description: "Complete tutorial for Claude Code Agent Teams: enabling multi-agent collaboration, Team Lead and Teammate roles, shared task lists and messaging, real-world use cases, and cost control strategies."
date: "2026-05-04"
article_type: "howto"
tags: ["claude-code", "agent-teams", "multi-agent", "parallel-development", "automation", "productivity"]
draft: false
---

On February 5, 2026, alongside Claude Opus 4.6, Anthropic quietly shipped one of the most ambitious features in AI-assisted development: **Agent Teams**. It lets multiple Claude Code instances work as a coordinated team — a Team Lead orchestrates, multiple Teammates execute tasks in parallel, and team members can communicate directly with each other rather than routing everything through the main agent.

This is a fundamental shift from the earlier Subagent model: Subagents can only report results back to the main agent, while Agent Teams members can message each other, share discoveries mid-task, and coordinate autonomously.

---

## Prerequisites

Before enabling Agent Teams, make sure you have:

| Requirement | Details |
|-------------|---------|
| Claude Code version | v2.1.32 or later |
| Claude subscription | Pro ($20/month) or Max ($100–$200/month) |
| Model | Claude Opus 4.6 (Agent Teams relies on its reasoning capabilities) |
| Optional | tmux (for per-agent terminal panels, useful for observation) |

> **Cost warning**: Agent Teams runs multiple Claude Opus instances simultaneously — token consumption is several times higher than single-instance usage. Test on small tasks first to estimate costs before applying to large projects.

---

## How to Enable

Agent Teams is off by default. Enable it via environment variable or `settings.json`:

**Option 1: Environment variable (temporary)**

```bash
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
claude  # restart Claude Code
```

**Option 2: settings.json (persistent)**

```json
// ~/.claude/settings.json
{
  "experimentalFeatures": {
    "agentTeams": true
  }
}
```

Once enabled, type `/team` in Claude Code to see team-related commands.

---

## How It Works

Agent Teams has four core components:

```
Team Lead
  ├── Creates the shared task list
  ├── Assigns tasks to Teammates
  └── Synthesizes results and reports back to you

Teammate A ←── messages ──→ Teammate B
  ├── Works in its own context window
  ├── Reads and writes the shared task list
  └── Can message other Teammates directly
```

### Shared Task List

All agents can read and write the same task list. This is the foundation of coordination — without it, parallel agents would either duplicate work or create conflicts. The task list tracks each item's:
- Status (pending / in progress / completed)
- Owner (which Teammate)
- Dependencies (B depends on A's output)

### Peer-to-Peer Messaging

Teammates communicate through a mailbox system. A practical example: the frontend Teammate can tell the backend Teammate directly "the API response format needs to change to X" without routing through the Team Lead. This makes collaboration more real-time and efficient.

---

## Real-World Use Cases

### Use Case 1: Parallel Code Review

```
Team Lead: Perform a thorough code review on this PR
├── Teammate A: Focus on security (SQL injection, XSS, auth checks)
├── Teammate B: Focus on performance (N+1 queries, memory leaks, caching)
└── Teammate C: Focus on test coverage (edge cases, error paths)
```

Three directions in parallel, Team Lead synthesizes at the end. A full PR review shrinks from 1 hour to 15 minutes.

**In March 2026**, Anthropic deployed Agent Teams in production for Claude Code Review, with internal code review coverage jumping from 16% to 54%.

### Use Case 2: Frontend/Backend Parallel Development

```
Team Lead: Implement a user comments feature
├── Teammate A (backend): Implement POST /comments API and database migration
└── Teammate B (frontend): Build the comment component, sync with A on API spec when ready
```

Teammate B builds the UI skeleton first, then syncs with A's API spec once it's defined — without waiting for the full backend to be complete.

### Use Case 3: Multi-Angle Research

```
Team Lead: Assess feasibility of migrating from REST to GraphQL
├── Teammate A: Identify affected API endpoints and clients
├── Teammate B: Catalog existing N+1 query problems
└── Teammate C: Assess the team's GraphQL learning curve
```

Three dimensions researched in parallel, Team Lead compiles a complete feasibility report at the end.

---

## Subagents vs Agent Teams: Which to Use

| Feature | Subagent | Agent Teams |
|---------|----------|-------------|
| **Communication** | Reports only to main agent | Members can message each other directly |
| **Context** | Shares main agent's context | Each member has its own context window |
| **Best for** | Quick, focused, isolated tasks | Complex multi-module tasks with coordination needs |
| **Startup cost** | Low | Medium (requires multiple Opus instances) |
| **Ideal when** | Tasks are clear and independent | Members need to share findings or depend on each other's output |

**Choose Subagents** when tasks are clear, independent, and fast — members don't need to talk to each other.

**Choose Agent Teams** when tasks are complex, multi-module, and parallel — members have coordination needs (one's output feeds another's input).

---

## Cost Control

The biggest risk with Agent Teams is runaway costs. Here are the most effective strategies:

### Use Opus for Team Lead, Sonnet for Teammates

Specify models when starting a team:

```
/team start --lead opus --members sonnet
Perform a comprehensive review of this codebase and generate a refactoring plan
```

The Team Lead does the strategic thinking (Opus); Teammates handle execution (Sonnet, roughly 1/5 the cost of Opus).

### Limit the Number of Teammates

2–3 Teammates is usually enough. Beyond 4, coordination overhead and token consumption grow rapidly while returns diminish.

### Set a Token Budget

```bash
export CLAUDE_CODE_MAX_TOKENS_PER_SESSION=100000
```

Each Teammate will stop gracefully when the limit is reached, preventing runaway sessions.

### Run `/plan` First, Then Start the Team

Before launching Agent Teams, use `/plan` to let Claude map out the task decomposition. Confirm the plan looks correct before officially starting the team. This prevents the team from heading in the wrong direction and wasting tokens.

---

## Practical Tips

**1. Use tmux to monitor all agents**

With tmux installed, each Teammate gets its own terminal panel so you can watch all agents work simultaneously:

```bash
brew install tmux  # macOS
# Claude Code automatically creates tmux splits when launching a team
```

**2. Set clear boundaries for each Teammate**

Define explicit ownership to prevent overlap:

```
Teammate A owns only files under src/api/
Teammate B owns only files under src/components/
```

**3. Use shared files for large outputs, not just messages**

For large outputs (research reports, analysis), have Teammates write to a shared intermediate file (e.g., `/tmp/research-output.md`) that the Team Lead reads at the end. More reliable than pure message passing.

**4. Start with a task you already understand**

For your first Agent Teams session, pick a mid-sized task you know well (like adding tests to a specific module). Observe how the team collaborates, then scale up to more complex scenarios.

---

## Known Limitations

- Agent Teams is an **experimental feature** — the API may change in future releases
- tmux panel splitting may be unstable on native Windows (non-WSL)
- Each Teammate has its own independent context and doesn't share file content with others — you need to pass information through messages or shared files
- With more than 5 Teammates, concurrent writes to the task list can cause race conditions

---

## Summary

Claude Code Agent Teams is the closest thing to a genuine "AI development team" in any current coding tool. It works best when: tasks can be clearly split into modules, those modules need coordination, and you're comfortable with the associated cost.

For most everyday tasks, a single Claude Code instance with well-used Subagents is plenty. Agent Teams is a powerful tool for when tasks truly need parallelism — not the default choice, but a significant step change in capability when the situation calls for it.
