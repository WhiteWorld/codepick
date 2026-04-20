---
title: "Cursor Composer 2 Deep Dive: Kimi K2.5 Base + Reinforcement Learning, 37% Better"
description: "In March 2026 Cursor launched Composer 2 — a proprietary coding model trained on top of Moonshot AI's open-source Kimi K2.5. Here's the full story: the technology, the attribution controversy, and what it means for developers."
date: "2026-04-20"
article_type: "explainer"
tags: ["cursor", "composer-2", "kimi", "moonshot", "model", "open-source", "reinforcement-learning"]
draft: false
---

On March 18, 2026, Cursor announced Composer 2 — a purpose-built coding model it described as achieving 61.3 on CursorBench, a 37% improvement over Composer 1.5. The developer community lit up with excitement.

Three days later, a second wave of discussion followed: Composer 2 is built on top of **Kimi K2.5**, an open-source model from Chinese AI company Moonshot AI.

---

## What Is Composer 2

Composer 2 is Cursor's third in-house coding model (Composer 1 → Composer 1.5 → Composer 2), available in Cursor's Agent mode as part of existing subscriptions. Pricing: Standard $0.50/$2.50, Fast $1.50/$7.50 per million tokens (input/output).

Its target use cases: **long-context tasks, multi-file edits, and autonomous agent workflows** — the kind of work you want to delegate and walk away from.

### Benchmark Numbers

| Benchmark | Composer 2 | Composer 1.5 | Delta |
|-----------|------------|--------------|-------|
| CursorBench | 61.3 | 44.7 | +37% |
| SWE-bench Multilingual | 73.7 | — | — |

CursorBench was built from real coding sessions by Cursor's own engineering team. Tasks are intentionally terse and ambiguous, with solutions requiring changes across many files — closer to production work than synthetic benchmarks.

---

## Technical Background: What Is Kimi K2.5

**Kimi K2.5** is an open-source large language model released by Beijing-based Moonshot AI (月之暗面) in late 2025, focused on reasoning, technical problem-solving, and long-context tasks.

Key specs:
- **Architecture**: Mixture of Experts (MoE)
- **Total parameters**: ~1 trillion (1T)
- **Active parameters per token**: ~32B (384 total experts, 8+1 activated per token)
- **License**: Open-source, commercial use allowed, but products with MAU > 1M or monthly revenue > $20M must **prominently credit** Kimi K2.5

Cursor trained Composer 2 on top of Kimi K2.5 in two phases:
1. **Continued pretraining** on a code-heavy data mix to deepen the base model's programming knowledge.
2. **Large-scale reinforcement learning (RL)** in simulated real Cursor sessions, with task distributions matching what actual users ask Composer to do.

---

## The Controversy

### How It Was Discovered

On March 21, a developer spotted the model identifier in Cursor's API configuration:

```
kimi-k2p5-rl-0317-s515-fast
```

Decoded: **Kimi 2.5 + reinforcement learning + March 17 snapshot**. The screenshot spread immediately and hit the Hacker News front page: "Cursor Composer 2 is just Kimi K2.5 with RL."

### Cursor's Response

About a day after the backlash, Cursor co-founder Aman Sanger publicly acknowledged it:

> "We evaluated many base models on perplexity-based evals and Kimi K2.5 proved to be the strongest. It was a miss not to mention the Kimi base in our blog from the start."

VP of Developer Education Lee Robinson added:

> "Only ~1/4 of the compute spent on the final model came from the base; the rest is from our training."

Moonshot AI confirmed that Cursor used Kimi K2.5 "as part of an authorized commercial partnership" via Fireworks AI — license compliant.

### The Open-Source License Question

Kimi K2.5's license requires that products with more than 1M monthly active users or more than $20M in monthly revenue **must prominently attribute Kimi K2.5**. Cursor — valued at over $9B with millions of paying users — clearly qualifies.

Cursor's launch blog and product UI mentioned neither Kimi nor Moonshot AI. The issue wasn't illegality; it was a **transparency gap** between what users assumed (a fully in-house model) and what was actually shipped.

---

## What This Means for Developers

### 1. Real Performance Gains

CursorBench's +37% isn't over synthetic tasks — it's over the messy, ambiguous, multi-file work that defines real development. Composer 2 handles agent tasks that require inferring intent across a large codebase noticeably better than its predecessor.

### 2. No Price Change

Composer 2 is included in the existing Cursor Pro ($20/mo) credit pool — no additional charge. If you're on Pro, Cursor's Auto mode will route appropriate tasks to Composer 2 automatically.

### 3. What Does "Proprietary" Mean in 2026

The controversy sparked a broader industry question: **if you do continued pretraining and RL on top of an open-source model, is the result your own?**

Technically: Cursor's 75% compute contribution and the engineering work (real-session RL environment, production task distribution) are substantial. But from a user-trust perspective, not disclosing the base model at launch left many developers feeling misled.

The episode ended with Cursor publishing a full technical report with training details, Moonshot AI confirming the authorized partnership, and the controversy subsiding. The lasting lesson: **open-source model weights are transparent — your fine-tuning trail won't stay secret.**

### 4. Kimi K2.5 as Infrastructure

This story also highlights how Chinese open-source AI models are becoming legitimate infrastructure for global products. Kimi K2.5 was competitive enough to beat every other base model Cursor evaluated — including models from OpenAI, Anthropic, and Google — on Cursor's own coding-specific criteria.

For Chinese developers, this is notable: an open-source domestic model at the core of the world's most popular AI coding tool.

---

## Summary

Composer 2 is a genuine upgrade — 37% better on Cursor's own benchmark, competitive on SWE-bench Multilingual. It's built on Kimi K2.5, a high-quality open-source model, with continued pretraining and large-scale RL layered on top.

The attribution controversy has resolved and doesn't affect normal use.

**If you're on Cursor Pro**, you can select Composer 2 in Agent mode for heavy tasks — large codebase understanding, ambiguous multi-file rewrites, or any agent workflow where you want to run and come back to results.

**If you're evaluating base models**, Kimi K2.5's open weights are available for inspection. Cursor's full technical report (published at cursor.com) walks through the training methodology in detail.
