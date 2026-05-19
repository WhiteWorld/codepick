---
title: "Orkas Setup Guide: Local Desktop Commander + Workers Agent Team (2026)"
description: "Orkas is an MIT-licensed open-source desktop agent collaboration client with a unique Commander + Workers architecture. This 10-minute guide covers: git clone one-line start → configure LLM APIs → command an agent team through conversation → understand the COMPETENCE.md self-evolution mechanism."
date: "2026-05-19"
updated_at: "2026-05-19"
article_type: "howto"
tags: ["orkas", "agent-platform", "agent-collaboration", "desktop", "local-first", "commander", "setup"]
draft: false
faq:
  - q: "Is Orkas a replacement for Claude Code?"
    a: |
      No. Orkas is a **desktop multi-agent dispatcher** — it doesn't write code itself, it commands Claude Code / Codex / OpenClaw to write code.
      Use Orkas when you want several agents working in parallel with a commander to aggregate. For single-agent single-task work, just use Claude Code directly — lighter weight.
  - q: "How is Commander + Workers different from Multi-Agent frameworks (CrewAI / AutoGen)?"
    a: |
      CrewAI / AutoGen are **frameworks** (you write code to define agent collaboration); Orkas is a **product** (chat-driven, UI-operated).
      Want programmatic control of agent collaboration → CrewAI; want to work like talking to a commander → Orkas.
  - q: "Is COMPETENCE.md self-evolution real or hype?"
    a: |
      Early product — long-term effectiveness TBD. The mechanism: after each task, the Worker reflects on what went right/wrong and updates its `meta/COMPETENCE.md` and `meta/LEARNING_STRATEGIES.md`.
      In theory it learns your style over time; in practice we need real long-term usage data. Treat it as "more structured Agent self-notes than MEMORY.md," but don't expect it to know you well within a week.
  - q: "Does it work from China?"
    a: |
      Yes — open-source, runs locally, just git clone. Configure domestic LLM APIs (DeepSeek / Kimi / GLM / Volcengine Ark).
      One caveat: first launch downloads an embedding model (~95MB). If pulling from Hugging Face is slow, set `HF_ENDPOINT=https://hf-mirror.com`.
---

[Orkas](/en/tool/orkas) is an MIT-licensed "desktop multi-agent collaboration client" with a unique **Commander + Workers** architecture — one Commander LLM takes your request, decomposes it, dispatches to Worker Agents, then aggregates results. This guide gets you running in 10 minutes.

## Who This Is For

- Prefer a desktop app (over web UI / CLI)
- Solo heavy users (data fully local, offline except model API calls)
- Want to try "self-evolving agents" (COMPETENCE.md / LEARNING_STRATEGIES.md)
- Don't mind early-stage projects

Not for: remote team collaboration (no web UI), or production-stable workflows (project is still early).

## TL;DR

```bash
# 1. Clone + one-line start
git clone https://github.com/Orkas-AI/Orkas
cd Orkas
./run.sh

# 2. First launch auto-installs deps + embedding model (~95MB)
# 3. After the desktop app opens, Settings → AI Providers → enter API keys
# 4. Chat with the Commander; it decomposes and dispatches to Workers
```

---

## Prerequisites

- macOS / Windows / Linux desktop
- Python 3.10+ (script checks and prompts if missing)
- At least one LLM API key (Claude / GPT recommended; also supports DeepSeek / Kimi / GLM)
- ~500MB disk (app + embedding model + generated data)
- Stable network for first launch (dependencies and embedding model)

---

## Step 1: Clone and Start

```bash
git clone https://github.com/Orkas-AI/Orkas
cd Orkas
./run.sh
```

`run.sh` does:

1. Checks Python version
2. Creates a virtualenv
3. Installs dependencies
4. Downloads the embedding model (~95MB, for memory retrieval)
5. Launches the desktop client

> 💡 **Slow embedding model download from China**: run `export HF_ENDPOINT=https://hf-mirror.com` before `./run.sh` for a 10× speedup.

---

## Step 2: Configure LLM Providers

In the desktop app:

1. **Settings** → **AI Providers**
2. Configure at least one provider:
   - **Anthropic** Claude Sonnet 4.5 (recommended for Commander)
   - **OpenAI** GPT-5 / GPT-5-mini
   - **DeepSeek** V4-Pro (domestic + 75% discount)
   - **Volcengine Ark** Doubao-Seed-Code (Chinese gateway)
3. Separate Commander vs Worker models — Commander handles decomposition/aggregation (use flagship), Workers can use cheaper models to spread cost

---

## Step 3: Chat with the Commander

The main UI's chat box is the Commander entry point. Example:

```
Refactor all handlers in src/api/handlers/ to use try/catch + structured logging,
and give me a summary of the changes when done.
```

The Commander will:

1. Scan `src/api/handlers/` for all files
2. Spawn N Workers (one per file)
3. Dispatch tasks in parallel
4. Aggregate worker reports into a final summary

You can watch each Worker's live status in the UI.

---

## Step 4: Understand the Self-Evolution Mechanism (Optional)

Each Worker Agent has its own metadata files on disk:

```
~/.orkas/workers/<worker-id>/
  meta/COMPETENCE.md         # What this Worker is good at
  meta/LEARNING_STRATEGIES.md # Strategies learned from past tasks
  meta/SKILLS/               # Successful patterns auto-crystallized into reusable skills
```

After each task, the Worker reflects on what went right/wrong and updates COMPETENCE.md. In theory, the more you use it, the better it understands your code style and preferences.

> ⚠️ **Early-stage mechanism — long-term effectiveness TBD**. Think of it as "more structured agent self-notes than a single MEMORY.md," but don't expect it to grok you within a week.

---

## Step 5: Advanced — Let the Commander Invoke a Skill

As you run more tasks, Orkas auto-extracts Skills from successful paths. For example, "run tests → fix failures → re-run until pass" might be crystallized as an `auto-fix-tests` skill.

Next time, you say "auto-fix-tests on this branch" and the Commander invokes the skill directly instead of decomposing from scratch. This is the "self-evolution" path that differentiates Orkas from Slock / Multica.

---

## Common Pitfalls

1. **`./run.sh` complains about Python version** → install Python 3.10+; recommend `pyenv` for multi-version management
2. **Embedding model download hangs** → set `export HF_ENDPOINT=https://hf-mirror.com` and rerun
3. **Commander spawns too many Workers and burns API quota** → limit `max_concurrent_workers` in Settings
4. **Want domestic APIs but only see OpenAI/Anthropic options** → use an OpenAI-compatible provider; set Base URL to your Ark / DeepSeek endpoint
5. **Pro version features?** → Orkas open-source edition is fully free; community mentions a Pro edition with team collaboration and expert agents, but verify on the official GitHub for current status

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

> Verified through 2026-05-19. Orkas is a young project — commands and features may evolve quickly; check [Orkas GitHub](https://github.com/Orkas-AI/Orkas) for the latest.
