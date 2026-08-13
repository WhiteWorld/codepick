---
title: "What Is Paseo? Self-Hosted Remote Agent Orchestration: Manage 39 Coding Agents (Claude Code, Codex, and More) from Phone, Desktop, and Web"
description: "Paseo is a self-hosted, open-source daemon that unifies 39 coding agent CLIs (Claude Code, Codex, Copilot, OpenCode, Pi) under one interface. Agents run on your own machine with your full dev environment; you control them from iOS, Android, desktop, web, or CLI. This guide explains what it is, how it compares with Conductor, Superset, OpenChamber, Happy Coder, and the Codex App, how to get started, and what to watch for."
date: "2026-08-12"
article_type: explainer
tags: [paseo, self-hosted, agent-orchestrator, claude-code, codex, opencode, mobile-coding, remote-agent]
pillar: workflow
content_status: keep
locale_strategy: mirrored
draft: false
---

## What Is Paseo?

[Paseo](https://paseo.sh/) (GitHub: [getpaseo/paseo](https://github.com/getpaseo/paseo), AGPL-3.0) is a **self-hosted, open-source orchestrator for coding agents**. It runs a local service (the daemon) on your own machine that manages **39 agent CLIs** — Claude Code, Codex, GitHub Copilot, OpenCode, Pi, and more — and exposes them through **iOS / Android / desktop (macOS, Windows, Linux) / web / CLI** clients.

Unlike Mac-only desktop orchestrators such as Conductor, Paseo is built around a **daemon + multi-client** architecture:

- Agents still run in your full local dev environment (your configs, skills, MCP servers, SSH keys, databases stay intact);
- Start a task at your desk, then review diffs, approve permissions, and merge from your phone on the go;
- Or run the daemon on a server or in Docker and connect from anywhere.

It is not another AI coding tool — it is a **control plane** on top of official agent CLIs. The underlying agents are still the Claude Code, Codex, or Copilot you already subscribe to and use.

> Research timestamp: 2026-08-12. Facts in this guide come from paseo.sh, the official docs, and the GitHub README. GitHub stars, version numbers, and app-store status change quickly, so they are not used as the main ranking signal.

## Why It Matters

1. **Open source + no telemetry**: AGPL-3.0, and the project states no telemetry, tracking, or forced login. Friendly if you care about keeping code and data on your own machines.
2. **Parallel agents with isolation**: each workspace gets its own git worktree and branch, so agents don't collide; each worktree also gets its own local dev-server URL, so parallel tasks don't fight over ports.
3. **Full platform coverage with mobile parity**: the phone app has the same feature set as desktop, which is rare in this category.
4. **Ecosystem and automation**: scheduled tasks (cron), skills, MCP, a browser pane, a TypeScript SDK, a scriptable CLI, a Hub, and Docker deployment.

## Core Concepts and Features

### Daemon + clients

The daemon is the only process that actually runs agents. Desktop, web, mobile, and CLI clients all connect to the same daemon — you can have several connected at once.

### Workspaces / git worktrees

One workspace = one isolated worktree + branch + environment. One feature per workspace, so parallel agents never interfere. When a task finishes, review the diff, open a PR, and merge — all inside the app.

### Supported agents

The official list covers **39 coding agent CLIs**, with native support for Claude Code, Codex, OpenCode, Pi, and GitHub Copilot, plus more via the in-app catalog over ACP, and any custom CLI agent.

### Voice, schedules, Skills / MCP

- **Voice**: speech-to-text and text-to-speech run locally on your device — handy for dictating tasks while commuting.
- **Schedules**: `paseo schedule create --cron "..."` runs agents on a timer (for example, a weekly codebase audit).
- **Skills / MCP**: reuse your existing skills and MCP servers, so agents work exactly like they do on your machine.

### CLI

`paseo run --provider codex "implement OAuth"`, `paseo ls`, `paseo send <agent-id> "add tests"`, `paseo schedule …`, and `paseo run --host <devbox>:6767` to reach a remote daemon.

## How to Choose Among Similar Tools

These tools all live in the "parallel / remote control for coding agents" category. Positioning below was checked against each project's official pages on 2026-08-12:

| Tool | Positioning | Where code runs | Platforms | Open source / license | Mobile | Pricing |
|---|---|---|---|---|---|---|
| **Paseo** | Self-hosted remote orchestration daemon | Local / self-hosted / Docker | macOS, Windows, Linux + iOS/Android/Web/CLI | AGPL-3.0 | Native iOS + Android | Free (sponsored) |
| [Conductor](https://www.conductor.build/) | Mac parallel orchestration desktop app | Local Mac | macOS | Closed source | No | Free (you pay the underlying agents) |
| [Superset](https://superset.sh/) | Agentic IDE orchestrating 100+ CLI agents | Local + remote hosts | macOS desktop (remote via CLI/SDK/MCP) | Elastic License 2.0 | No native app | Free single seat / local |
| [OpenChamber](https://github.com/openchamber/openchamber) | Open-source workspace: desktop/browser/mobile PWA | Local / remote | Desktop + Web + VS Code extension + mobile PWA | MIT | PWA | Open source, free |
| [Happy Coder](https://github.com/slopus/happy) | Mobile + web client for Claude Code / Codex | Local (wraps your session) | iOS, Android, Web | MIT | Native | Open source, free |
| [Codex App (ChatGPT desktop)](https://learn.chatgpt.com/docs/app) | OpenAI's first-party Codex desktop | Local / cloud | macOS, Windows | Closed source (first-party) | Via Codex Remote connections (ChatGPT app) | Requires a ChatGPT subscription |
| [Claude Desktop](https://code.claude.com/docs/en/desktop) | Anthropic's first-party desktop (Chat + Cowork + Claude Code) | Local | macOS, Windows | Closed source (first-party) | Via Remote Control (Claude app) | Requires a Claude subscription / API |
| [OpenCode Desktop](https://opencode.ai/) | OpenCode's official desktop app (beta) | Local | macOS, Windows, Linux | MIT | No | Open source, free |

How to pick:

- If you want **native mobile + multi-agent + open source**, start with **Paseo**;
- If you live on macOS and heavily use Claude Code / Codex with a desktop workflow, **Conductor / Superset** fit better;
- If OpenCode is your main agent, **OpenChamber / OpenCode Desktop** are the smoother path;
- If you only want your phone to take over an existing Claude Code / Codex session, **Happy Coder or the official Remote features** are lighter.

> See also our [Conductor guide](/en/guides/conductor-build-intro) and [Mobile AI Coding Tools 2026](/en/guides/mobile-ai-coding-tools-2026).

## Who It's For / Not For

**Good fit**:

- Developers running several agents who want to escape the single-agent serial bottleneck;
- Remote workflows where you start on a computer and review diffs / approve / get notified from your phone;
- Individuals and teams who want code to stay on their own machines instead of a third-party SaaS;
- Automation-minded users who want scheduled tasks and scriptable CLI control over agents.

**Not a fit**:

- Beginners who only occasionally use an agent for small fixes — master a single agent first;
- Scenarios that can't accept "the machine must be online / you maintain your own daemon";
- Teams without the appetite to run and secure a self-hosted daemon (see below).

## Getting Started in 5 Steps

1. Install the daemon and any client (desktop, web, or mobile) from [paseo.sh/download](https://paseo.sh/download);
2. Make sure at least one agent CLI (Claude Code, Codex, OpenCode, Copilot, …) is installed and logged in locally;
3. Connect to the daemon and create a workspace (it auto-creates a branch + worktree);
4. Describe a task inside the workspace and launch the agent;
5. Track progress, review diffs, approve permissions, and merge from your phone or web — no need to stay at your desk.

## Security Notes (Important)

- **Do not** expose the daemon's port / WebSocket directly to the public internet; prefer Tailscale, WireGuard, or a protected reverse proxy for remote access.
- The daemon runs on your machine, so agent credentials (Claude / Codex logins, MCP keys) live there — **machine security equals credential security**.
- Keep remote approval scoped: don't grant blanket shell access; route high-risk commands through human approval.
- Self-hosting means no vendor backstop: update regularly and watch the [changelog](https://paseo.sh/changelog).

## Notes for Users in China

Paseo itself is self-hosted and doesn't depend on overseas SaaS — between the daemon and your clients you can use Tailscale or an internal network, with no API relay involved. The underlying Claude Code / Codex agents still face the usual network and payment restrictions in China and may need official onboarding or a domestic relay; that constraint is the same as using Claude Code / Codex directly on your computer.
