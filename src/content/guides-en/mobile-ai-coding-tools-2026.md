---
title: "Mobile AI Coding Tools 2026: Control Claude Code, Codex, and OpenCode from Your Phone"
description: "As of June 2026, mobile coding is splitting into local agent remote control, cloud or on-device runtimes, and phone GUI agents. This guide maps the categories and trade-offs."
date: "2026-06-04"
updated_at: "2026-06-05"
article_type: explainer
tags: ["mobile-coding", "ai-coding", "claude-code", "codex", "opencode", "paseo", "mcp", "phone-agent"]
draft: false
---

## TL;DR

"Coding from your phone" is becoming real in 2026, but the useful version is not about typing code on a tiny keyboard. The phone is becoming a **control surface for coding agents**.

There are three separate categories:

1. **Remote-control local or VPS-based coding agents**: Codex Remote connections, Claude Code Remote Control, Paseo, Happy, CC Pocket, MobileCLI, Termly, OpenACP, Nimbalyst.
2. **Open a real development runtime from the phone**: Cosyra, Codem, Open Minis, Termux + Tailscale/SSH.
3. **Let an AI agent operate a phone UI**: Open-AutoGLM, Open-AutoGLM-Hybrid, MaaMCP, Appium MCP, Coze cloud phone.

For developers, the first two categories are the most relevant. The third category is important, but it solves a different problem: phone GUI automation and cloud-phone operation, not managing a codebase while you are away from your laptop.

> Research timestamp: 2026-06-05. This guide only uses claims that could be checked against official docs, product sites, or GitHub READMEs. GitHub stars, app-store availability, pricing, and supported agent lists change quickly, so they are not used as the main ranking signal.

---

## Why This Is Happening Now

Mobile coding used to mean SSH clients, Termux, iSH, GitHub Codespaces, or Replit. Those tools work, but the phone experience is rough: small keyboards, fragile sessions, difficult approvals, and lots of context switching.

Coding agents change the workflow. Tools like Claude Code, Codex CLI, OpenCode, and Gemini CLI turn many keystrokes into a loop of "describe the task, wait, review the diff, approve a command, answer a question." That loop maps well to mobile:

- Approve a blocked tool call while commuting.
- Review a refactor diff without going back to your desk.
- Join an existing terminal during an incident and let an agent help read logs or patch config.
- Queue the next task after your laptop is closed.

The durable need is not a mobile IDE. It is **agent continuity when you leave the desk**.

---

## Category 1: Remote-Control the Agent Running on Your Machine

These tools keep the real repo and agent process on your Mac, Windows, Linux machine, or VPS. The phone handles connection, display, input, approvals, notifications, and sometimes diff review.

The upside is that your local dev environment, SSH keys, MCP servers, databases, test commands, and project config stay where they already are. The downside is that the host machine must stay reachable, and networking/security must be configured carefully.

| Tool | Verified Positioning | Best For | Watch Out |
|---|---|---|---|
| [Codex Remote connections](https://developers.openai.com/codex/remote-connections) | Official OpenAI feature that connects ChatGPT on iOS/Android to a Codex App host on Mac or Windows, so you can continue threads, send instructions, approve actions, and review diffs, terminal output, and screenshots | Codex App users who want mobile access to local or remote-host projects | Mobile setup starts from the Codex App, not the Codex CLI or IDE Extension; the host must stay awake, online, and signed in to the same account and workspace |
| [Claude Code Remote Control](https://code.claude.com/docs/en/remote-control) | Official feature that connects Claude mobile or `claude.ai/code` to a local Claude Code session | Claude Code users who want the official path | Claude only; the session still runs on your machine; requires Claude account subscription login, not API keys |
| [Paseo](https://github.com/getpaseo/paseo) | One interface for Claude Code, Codex, Copilot, OpenCode, and Pi across phone, desktop, web, and CLI | Multi-agent users who want one control plane | Requires a daemon on your own machine |
| [Happy](https://github.com/slopus/happy) | Mobile and web client for Claude Code and Codex, launched via `happy claude` or `happy codex` | Users who want phone handoff, push notifications, and encryption around Claude/Codex | It wraps supported agents rather than acting as a general terminal |
| [CC Pocket](https://github.com/K9i-0/ccpocket) | Mobile and desktop client for Codex and Claude through a self-hosted Bridge Server | Codex + Claude users who want mobile approvals, file browsing, diffs, and worktree workflows | Requires Node.js and the bridge; the README recommends Tailscale for remote access |
| [MobileCLI](https://github.com/MobileCLI/mobilecli) | Rust daemon and React Native app that stream Claude Code, Codex, Gemini CLI, or any terminal session to mobile | Developers who want a true terminal stream | Terminal streaming is self-hosted; push notifications use Expo; do not expose the daemon directly to the public internet |
| [Termly](https://termly.dev/) | Free CLI that mirrors terminal AI tools such as Claude Code, Gemini CLI, OpenCode, and Qwen Code to iOS/Android | Lightweight QR-code setup | Product site claims zero-knowledge relay and end-to-end encryption; verify with low-risk repos first |
| [OpenACP](https://openacp.ai/) | Self-hosted bridge from coding agents to Telegram, Discord, and Slack through Agent Client Protocol | Teams or communities that already live in chat | The product's own roadmap lists a mobile app as upcoming; today the main surface is chat |
| [Nimbalyst](https://github.com/nimbalyst/nimbalyst) | Visual workspace and session manager for Codex, Claude Code, OpenCode alpha, and Copilot alpha, with a mobile companion | Builders who want sessions, tasks, files, and diffs in a desktop workspace | Not a phone-only product; the phone extends a broader workspace |

If you want one practical starting point, try **Paseo** or **CC Pocket** first. Paseo is closer to a multi-agent control plane; CC Pocket is more focused on Codex/Claude mobile handoff. For team chat workflows, look at **OpenACP**.

---

## Category 2: Open a Development Runtime from the Phone

This category matters when your laptop is not always on or you want the phone to open a real runtime directly.

[Cosyra](https://cosyra.com/) is the clearest example. The product site describes a mobile cloud terminal for iPhone and Android with Claude Code, Codex CLI, OpenCode, and Gemini CLI pre-installed. It provisions an isolated Ubuntu 24.04 x86_64 container on Azure, offers persistent storage, BYOK, and session hibernation. The benefit is that you do not need to maintain a VPS or keep a laptop awake. The trade-off is trust: private code and agent execution happen inside a third-party cloud container.

[Codem](https://codemapp.com/) is a similar but iPhone-first "stateful VM terminal" product. Its site emphasizes project-specific VMs, persistent state, snapshots, background runtime, and support for Codex, Claude Code, Gemini CLI, and Cursor workflows. It appears earlier-stage and should be treated as something to watch rather than a default production environment.

[Open Minis](https://openminis.app/) is not a pure coding-agent product. It is closer to an on-device general agent with an Alpine Linux shell, web browser, iOS integrations, multi-model support, and `SKILL.md`-style skills. It can cover lightweight scripting and automation, but iOS sandboxing, mobile hardware, and app lifecycle constraints mean it should not be treated as a full replacement for a development machine.

The older DIY route still matters: **Termux + Tailscale + tmux** on Android, or SSH from a phone into your own VPS, Mac mini, or home server. It is less polished, but it gives you the most control.

---

## Category 3: AI Operates the Phone, Not the Codebase

Open-AutoGLM, MaaMCP, and cloud-phone products often appear in the same discussion, but they are solving a different problem.

[Open-AutoGLM](https://github.com/zai-org/Open-AutoGLM) describes itself as a Phone Agent framework. It connects to devices through ADB, HDC, or WebDriverAgent-style tooling, uses a vision-language model to understand the screen, and plans actions such as taps, swipes, and text input. It is relevant to mobile GUI agents and app automation, not to managing a software repo from your phone.

[Open-AutoGLM-Hybrid](https://github.com/xietao778899-rgb/Open-AutoGLM-Hybrid) is a community hybrid approach that tries to run phone automation directly on Android through Termux, Open-AutoGLM, GRS AI, Accessibility Service, and LADB. The repo is early-stage, so success-rate and cost claims in the README should be treated as project claims, not stable benchmarks.

[MaaMCP](https://github.com/MAA-AI/MaaMCP) exposes MaaFramework automation capabilities as an MCP server. It lets AI assistants control Android devices/emulators or Windows apps through ADB, OCR, screenshots, clicks, swipes, text input, and pipeline generation. That makes it useful for app testing and UI automation, but it is a **tool interface for agents**, not a mobile coding-agent client.

[Coze / 扣子 Agent World](https://space.coze.cn/space-intro) is also worth watching because its official product story now includes cloud computers, cloud phones, IM channels, and 24/7 agent execution. That belongs more to cloud agent infrastructure and digital-employee workflows than to developer mobile coding tools.

---

## How to Choose

If your goal is "my Claude Code or Codex task should not wait for me when I leave the desk," start with **Codex Remote connections, Claude Code Remote Control, Paseo, Happy, CC Pocket, MobileCLI, or Termly**.

If your goal is "I do not have my laptop, but I still need git/npm/python/agent access," look at **Cosyra, Codem, SSH into a VPS, or Termux + Tailscale**.

If your goal is "the agent should operate Android/iOS apps for testing or automation," look at **Open-AutoGLM, MaaMCP, and Appium MCP**.

If your goal is "give an agent a cloud computer, cloud phone, email, and IM identity," look at **Coze and cloud agent workspaces**. That is adjacent to coding, but it is a broader infrastructure category.

---

## Six Questions Before You Trust One

### 1. Where does the code run?

Remote-control tools usually keep code on your machine or VPS. Cloud-terminal tools clone the repo into a vendor-managed container. On-device agents are limited by mobile filesystems and sandboxing. Private repos, client code, and production secrets should be evaluated before anything else.

### 2. Can the phone approve blocked actions?

The useful mobile surface is not just log viewing. It should handle tool approvals, command confirmations, MCP requests, agent questions, and diff review.

### 3. Does it support your actual agent?

Claude Code, Codex CLI, OpenCode, Gemini CLI, Copilot, and Cursor agents have different terminal behavior and permission flows. Confirm that your tool handles the one you really use.

### 4. How is remote access secured?

Prefer Tailscale, WireGuard, protected reverse proxies, end-to-end encryption, or a clearly documented relay model. Do not expose a local daemon WebSocket port directly to the internet.

### 5. What happens after lock screen, network changes, or app backgrounding?

Mobile reliability is about resuming sessions, queuing messages, delivering push notifications, and keeping long tasks running.

### 6. Is it a control surface, a runtime, or an automation tool?

Paseo/CC Pocket/MobileCLI are control surfaces. Cosyra/Codem are runtimes. MaaMCP/Open-AutoGLM are phone automation tools. Coze cloud phone is agent infrastructure. Comparing them as if they were the same product creates bad decisions.

---

## A Practical Test Path

1. **Codex Remote connections**: if you already use the Codex App, start with the official ChatGPT mobile + Codex host route.
2. **Claude Code Remote Control**: if you mainly use Claude Code, establish the baseline for official local-session handoff.
3. **Paseo**: test whether multi-agent, multi-provider control improves your normal workflow.
4. **CC Pocket or Happy**: test mobile approval, diff review, and notifications for Codex + Claude.
5. **Cosyra**: test whether a cloud-terminal model can replace carrying a laptop.
6. **MaaMCP / Open-AutoGLM**: evaluate phone GUI agents separately.

The category is early and fast-moving. The durable need is not "write a whole app on a phone." It is simpler and more useful: **when the agent needs you, can you see it, understand it, decide, and let the work continue?**

## Sources

- [Codex Remote connections docs](https://developers.openai.com/codex/remote-connections)
- [Claude Code Remote Control docs](https://code.claude.com/docs/en/remote-control)
- [OpenAI Codex CLI docs](https://developers.openai.com/codex/cli)
- [Paseo GitHub README](https://github.com/getpaseo/paseo)
- [Happy GitHub README](https://github.com/slopus/happy)
- [CC Pocket GitHub README](https://github.com/K9i-0/ccpocket)
- [MobileCLI GitHub README](https://github.com/MobileCLI/mobilecli)
- [Termly product site](https://termly.dev/)
- [OpenACP product site](https://openacp.ai/)
- [Nimbalyst GitHub README](https://github.com/nimbalyst/nimbalyst)
- [Cosyra product site](https://cosyra.com/)
- [Codem product site](https://codemapp.com/)
- [Open Minis product site](https://openminis.app/)
- [Open-AutoGLM GitHub README](https://github.com/zai-org/Open-AutoGLM)
- [Open-AutoGLM-Hybrid GitHub README](https://github.com/xietao778899-rgb/Open-AutoGLM-Hybrid)
- [MaaMCP GitHub README](https://github.com/MAA-AI/MaaMCP)
- [Coze / 扣子 Agent World page](https://space.coze.cn/space-intro)
