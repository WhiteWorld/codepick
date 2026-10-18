---
title: "Getting Started with DeepSeek Harness: The Open-Source Agent Framework Where Everything Is a Plugin"
description: "DeepSeek Harness (dsh) is DeepSeek AI's official open-source agent harness. On 2026-10-18 the GitHub org page showed 252,529 stars. MIT licensed. The README still says developer preview. The API changelog recommends 0.2.1-rc.1 or later with V4.1-Flash-1017."
date: "2026-08-14"
updated_at: "2026-10-18"
article_type: explainer
tags: [deepseek, harness, agent-framework, dsh, plugin, cordis]
pillar: workflow
content_status: keep
locale_strategy: mirrored
draft: false
---

Checked on **2026-10-18**. Reopened [github.com/deepseek-ai](https://github.com/deepseek-ai), the repo README on `master`, and the 2026-10-17 entry on the [DeepSeek API changelog](https://api-docs.deepseek.com/updates).

> The README still says **developer preview**. Breaking changes are expected. When the org page was opened, `deepseek-harness` showed **252,529** stars. A few minutes later the GitHub API returned **252,533**. The count moves. Use the number you see.

The 2026-10-17 API changelog says DeepSeek Harness **0.2.1-rc.1** or later is the best fit for the new V4.1-Flash-1017. That is a pairing note. It does not say older builds cannot run.

## Bottom Line

DeepSeek Harness (the CLI command is `dsh`) is not another AI coding tool. It's DeepSeek AI's official open-source **agent harness** — a framework for building, orchestrating, and running AI agents.

Unlike Claude Code or Codex, which are ready-to-use coding agents, DeepSeek Harness is more like an **agent factory**: it gives you a plugin-based architecture foundation, and you assemble your own agents by plugging in models, tools, and workflows as plugins.

---

## 1. What Is DeepSeek Harness?

[DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) (`dsh`) is an open-source agent framework developed by DeepSeek AI, MIT licensed, written in TypeScript. The org page showed 252,529 stars on 2026-10-18.

Its core design philosophy is one sentence: **Everything is a Plugin.**

This isn't just a slogan — it's an architectural constraint driven by the underlying engine, [Cordis](https://github.com/cordiverse/cordis). Cordis's design is described in the paper "A Programming Paradigm for Spatiotemporal Composability" — in short, it enables software components to compose freely in both time and space dimensions.

In DeepSeek Harness:

- **Models are plugins**: You can plug in DeepSeek's own models, OpenAI, Anthropic, or any other provider
- **Tools are plugins**: File I/O, shell execution, network requests, MCP servers — all plugins
- **Workflows are plugins**: Agent lifecycle, task orchestration, context management — also plugins

This means you don't "write chains in LangChain, configure agents in AutoGen" — in DeepSeek Harness, everything is the same abstraction: a plugin.

---

## 2. Core Architecture: Everything Is a Plugin

### How It Differs from Traditional Agent Frameworks

| Dimension | Traditional (LangChain / AutoGen) | DeepSeek Harness |
|---|---|---|
| **Architecture model** | Pipeline-based: chain → agent → tool, layered abstractions | Plugin-based: everything is a plugin, unified abstraction |
| **Composition** | Predefined chains (SequentialChain, RouterChain) | Spatiotemporal composition: plugins compose freely in time and space |
| **Extensibility** | Extend by inheriting or implementing specific interfaces | Register a plugin — no framework code changes needed |
| **Underlying engine** | Custom or LangChain Expression Language | Cordis (independent open-source project, formal paper) |
| **Coding agent capability** | Depends on function calling | Native agent harness, built-in tool execution pipeline |

**Key difference**: Traditional frameworks give you "a set of blocks and a manual." DeepSeek Harness gives you "LEGO bricks where the plugins are the bricks themselves — you decide how to assemble them."

### The Cordis Engine

Cordis is the runtime core of DeepSeek Harness. Its "spatiotemporal composability" solves a real problem: agent behavior is not linear — it might be interrupted while executing task A, handle event B, then return to A. Traditional frameworks handle this with callbacks or state machines; Cordis supports it natively through plugin composition.

You don't need to understand Cordis's paper to use DeepSeek Harness. But knowing the engine is there helps you understand why it "feels" different from LangChain.

---

## 3. Relationship with Claude Code / Codex and Similar Tools

This isn't a "DeepSeek Harness vs. Claude Code" choice — they operate at different levels.

| Dimension | Claude Code / Codex | DeepSeek Harness |
|---|---|---|
| **Positioning** | Coding Agent (helps you write code) | Agent Harness (helps you build agents) |
| **Usage** | Ready to use, CLI or IDE plugin | Framework; requires assembling plugins and configuration |
| **Model binding** | Bound to Claude / GPT models | Model-agnostic; plug in any provider |
| **Use case** | Individual developer daily coding | Building custom agent workflows, agent products |
| **Maturity** | Production-ready | Developer preview |

**You can use both**: Build a code review agent in DeepSeek Harness with DeepSeek models, while continuing to use Claude Code for daily coding. They don't conflict.

---

## 4. Getting Started

### 5-Minute Quick Start

```bash
# Prerequisite: Node.js installed
npx @deepseek-ai/dsh web
```

The Web UI starts at `http://127.0.0.1:3080` by default. Open your browser and you're in.

### Running from Source

```bash
git clone https://github.com/deepseek-ai/deepseek-harness.git
cd deepseek-harness
pnpm install
pnpm run build
pnpm dsh web
```

### Configuring Providers

In the Web UI, configure your model provider (DeepSeek API, OpenAI API, etc.), then create agents and start working. The README points at the docs site [deepseek-harness.github.io](https://deepseek-harness.github.io/deepseek-harness/). The in-repo Web UI notes are at `docs/user/guide/index.md`.

If the model is the 2026-10-17 `deepseek-flash` (V4.1-Flash-1017), the API changelog recommends Harness **0.2.1-rc.1** or later.

The English README read on 2026-10-18 has no Python SDK section. Whether a separate Python package exists is **unknown**.

---

## 5. Plugin Ecosystem and Community

### Plugins

DeepSeek Harness plugins are discoverable through the GitHub [`dsh-plugin` topic](https://github.com/topics/dsh-plugin). You can:

- Browse existing community plugins
- Browse installable plugins in the community registry [dsplugin.app (dsh plugin registry)](https://dsplugin.app/), filterable by source and manifest status (community-maintained, not official)
- Tag your own plugin with `dsh-plugin` to make it discoverable
- Follow the official [plugin development guide](https://github.com/deepseek-ai/deepseek-harness/tree/master/docs) to write your own

### Community

- **Discord**: The invite in the English README is [discord.gg/4MrtZUhpxg](https://discord.gg/4MrtZUhpxg). The older invite in a previous draft of this page was not rechecked.
- **China groups**: The English README opened this round does not mention WeCom or a WeChat account. The Chinese README was not opened, so whether those channels still exist is **unknown**.
- **GitHub Discussions**: For feedback and bug reports

---

## 6. Who It's For / Not For

**Good fit**:

- Developers wanting to build custom agent workflows (not just "let AI write code," but "let AI follow your process")
- Engineers interested in plugin-based architectures and agent framework design
- Teams already using DeepSeek models who want to build agent products on top
- Early adopters willing to accept developer preview instability for early access

**Not a fit**:

- Anyone just looking for a ready-to-use AI coding tool — use Claude Code, Codex, or Cursor instead
- Production environments with zero tolerance for breaking changes — wait for stable release
- Anyone who doesn't want to learn a new framework — DeepSeek Harness has a steeper learning curve than coding agents

---

## Summary

DeepSeek Harness's value isn't "yet another agent tool." It's **a different way to build agents**.

When you're no longer satisfied with "let AI write this piece of code," and instead want "let AI follow my designed process, use my specified tools, and work continuously within my defined boundaries" — that's when you need an agent harness. DeepSeek Harness's plugin-based architecture is one of the most radical answers to this need in the open-source world today.

It's still in developer preview, but the direction is clear: **not giving you an agent, but giving you a factory to build agents.**

> Further reading: Our [Harness category overview](/en/guides/meta-harness-2026) compares Omnigent, Conductor, Zed ACP, and other harness products.
