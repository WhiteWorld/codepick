---
title: "Orkas Setup Guide: Local Desktop Commander + Workers Agent Team (2026)"
description: "Orkas is an MIT-licensed open-source desktop agent collaboration client with a unique Commander + Workers architecture. Covers installers, source setup, model configuration, built-in agents, external CLI backends, and conditional reflection."
date: "2026-05-19"
updated_at: "2026-09-28"
article_type: "howto"
tags: ["orkas", "agent-platform", "agent-collaboration", "desktop", "local-first", "commander", "setup"]
pillar: workflow
content_status: keep
locale_strategy: mirrored
draft: false
faq:
  - q: "Is Orkas a replacement for Claude Code?"
    a: |
      Not simply. Commander can handle analysis, writing, research, files and automation directly, or coordinate built-in specialist agents. Claude Code / Codex are optional external CLI backends.
      Use Orkas when you want several agents working in parallel with a commander to aggregate. For single-agent single-task work, just use Claude Code directly — lighter weight.
  - q: "How is Commander + Workers different from Multi-Agent frameworks (CrewAI / AutoGen)?"
    a: |
      CrewAI / AutoGen are **frameworks** (you write code to define agent collaboration); Orkas is a **product** (chat-driven, UI-operated).
      Want programmatic control of agent collaboration → CrewAI; want to work like talking to a commander → Orkas.
  - q: "Is COMPETENCE.md self-evolution real or hype?"
    a: |
      Early product — long-term effectiveness TBD. Reflection depends on new signals or session activity and scheduler gates; it does not run after every task. Results can update `meta/COMPETENCE.md` and `meta/LEARNING_STRATEGIES.md`.
      In theory it learns your style over time; in practice we need real long-term usage data. Treat it as "more structured Agent self-notes than MEMORY.md," but don't expect it to know you well within a week.
  - q: "Does it work from China?"
    a: |
      It runs locally and can use accessible model providers. Installers, dependencies and model resources still require downloads; verify connectivity on your own network.
---

[Orkas](/en/tool/orkas) is an MIT-licensed "desktop multi-agent collaboration client" with a unique **Commander + Workers** architecture — Commander can act directly, delegate to built-in specialists, or use external CLI backends. Splitting work, parallel execution and aggregation depend on the task and dispatch mode.

## Who This Is For

- Prefer a desktop app (over web UI / CLI)
- Solo heavy users (data fully local, offline except model API calls)
- Want to try "self-evolving agents" (COMPETENCE.md / LEARNING_STRATEGIES.md)
- Don't mind early-stage projects

Not for: remote team collaboration (no web UI), or production-stable workflows (project is still early).

## TL;DR

Use the [official release installers](https://github.com/Orkas-AI/Orkas/releases/tag/v2026.9.11) for macOS Apple Silicon / Intel or Windows x64. Linux currently runs from source.

Open **Settings → AI Providers**, configure a model, and describe your task. The packaged app requires initial sign-in; the repository source build has no account layer.

## Prerequisites

- Installers: macOS Apple Silicon / Intel or Windows 10+.
- Source: Git and Node 20+; Linux requires glibc 2.34+, x64 / arm64. Alpine and other musl distributions are unsupported.
- System Python 3 and a C/C++ toolchain are needed only if a native npm module lacks a compatible prebuilt binary.
- A model API key or local endpoint, plus network access and space for initial resource downloads.

## Step 1: Install or Run from Source

Prefer an installer above. For source builds:

```bash
git clone https://github.com/Orkas-AI/Orkas.git
cd Orkas
./run.sh  # macOS / Linux
```

On Windows, run this from the repository directory:

```bat
run.cmd
```

The bootstrap installs locked npm dependencies and prepares runtime and model resources. A manual Python 3.10 check and virtualenv creation are not the main setup flow. Inspect download or native-build errors if bootstrap fails.

---

## Step 2: Configure LLM Providers

In the desktop app:

1. **Settings** → **AI Providers**
2. Select a supported provider and supply credentials. For local or compatible services, use **Custom (OpenAI-compatible)** with the actual Base URL.
3. Configure agent models to suit the task, then check connectivity and costs with a small request.

---

## Step 3: Chat with the Commander

The main UI's chat box is the Commander entry point. Example:

```
Refactor all handlers in src/api/handlers/ to use try/catch + structured logging,
and give me a summary of the changes when done.
```

Commander may act directly or delegate. Do not assume it creates one Worker per file: inspect the actual assignments and results, then run your project tests.

---

## Step 4: Understand the Self-Evolution Mechanism (Optional)

Agents can maintain `meta/COMPETENCE.md` and `meta/LEARNING_STRATEGIES.md`. Reflection is conditional, not a guaranteed post-task step.

The pinned README calls it **signal-triggered reflection**, but its six-signal weighted-threshold description differs from the code at the same commit. The [actual scheduler](https://github.com/Orkas-AI/Orkas/blob/fbc64ca5443bc4abfca5d896841c2da7fae5c35c/src/main/features/reflection-orchestrator.ts) periodically checks for new signals or session activity, subject to cooldown and per-cycle limits. Treat this as eligibility-based reflection, not automatic improvement after each task.

Long-term effectiveness still needs independent validation. Compare task outcomes and human feedback, not just the number of saved notes.

## Step 5: Use Skills (Optional)

Agents can save methods as private `SKILL.md` files through `skill_manage`. This does not guarantee that every successful task produces a reliable skill; check scope and outcomes before relying on one.

---

## Common Pitfalls

1. **Source startup fails**: check Node 20+ first. Check Python 3 and a C/C++ toolchain when logs show a native-module build failure.
2. **Downloads fail**: inspect the failing resource, connectivity and disk space, then retry that step.
3. **Model errors or excessive costs**: verify provider, Base URL, model and quota; start with a smaller task.
4. **Does open source mean free models?** No. Your provider bills model usage; the optional built-in Orkas model uses its own credit plans.

---

## Comparison with Other Platforms

| Dimension | Orkas | Slock | Multica | LobeHub |
|---|---|---|---|---|
| Form factor | **Desktop** | Web + daemon | Web + daemon | Web + Docker |
| Remote collab | ❌ | ✅ | ✅ | ✅ |
| Data location | **Fully local** | Local + cloud console | Local + server | Local or self-host |
| Dispatch model | **Commander auto** | Human @ Agent | Human assigns Issue | Agent Group auto |
| Best for | Single-machine commander | Real-time chat | Project management | General + ecosystem |

See the [2026 Agent Collaboration Platform Guide](/en/guides/agent-collaboration-platforms-2026/) for full comparison.

---

## Related

- [Orkas product page](/en/tool/orkas)
- [2026 Agent Collaboration Platform Roundup](/en/guides/agent-collaboration-platforms-2026/)
- [LobeHub setup guide](/en/guides/lobehub-setup/) (if you want web + large ecosystem)
- [Multica setup guide](/en/guides/multica-setup/) (if you want Issue panel)

## Verification Sources

Installation and capability descriptions checked on 2026-09-28. Product scores were not re-evaluated; installation was not tested on a device.

- [Pinned README: downloads, FAQ, quick start and technical sections](https://github.com/Orkas-AI/Orkas/blob/fbc64ca5443bc4abfca5d896841c2da7fae5c35c/README.md)
- [v2026.9.11 installer assets](https://github.com/Orkas-AI/Orkas/releases/tag/v2026.9.11)
- [Reflection implementation and removed-scorer explanation](https://github.com/Orkas-AI/Orkas/blob/fbc64ca5443bc4abfca5d896841c2da7fae5c35c/src/core-agent/src/evolution/metacognition.ts)
