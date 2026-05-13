---
title: "Volcano Ark Agent Plan Explained: The Industry's First Agent Subscription Bundle"
description: "On 2026-05-11 Volcano Ark launched Agent Plan, billed as the industry's first Agent subscription bundle. This guide breaks down its four pricing tiers, the AFP credits system, bundled multimodal models and Harness tools, and how it differs from Coding Plan."
date: "2026-05-13"
article_type: "explainer"
tags: ["volcano-ark", "ark", "agent-plan", "agent", "subscription", "AFP", "multimodal"]
draft: false
---

On May 11, 2026, Volcano Engine officially launched **Agent Plan**, branded as "the industry's first Agent subscription bundle". Building on the existing [Ark Coding Plan](/en/coding-plan/), Agent Plan rolls additional modalities and Harness tooling into a single subscription, and introduces a new credit unit called **AFP (Agent Fuel Points)**. For China-native developers running Claude Code, OpenCode, Trae, OpenClaw or Hermes Agent, it's worth re-evaluating against the legacy Coding Plan.

---

## TL;DR

- **Launched**: 2026-05-11
- **Positioning**: Coding Plan + multimodal models + Harness tools, bundled as an Agent subscription
- **Four tiers**: Small ¥40 / Medium ¥200 / Large ¥500 / Max ¥1000, monthly
- **Billing unit**: AFP (Agent Fuel Points) — credits released daily at 00:00 (CST) until sold out
- **Trade-off**: Token unit price is **2~2.5× higher** than the legacy Coding Plan; **7.5× multiplier** for context longer than 128k
- **Perk**: Medium tier and above include a 24/7 always-on AI companion, ready out of the box

---

## Tiers & Pricing

| Tier | Monthly | AFP/mo | AI Companion | Best for |
|------|--------|--------|---------|--------|
| Small | ¥40 | 20,000 | — | Light solo, pure text coding |
| Medium | ¥200 | 100,000 | ✅ 24/7 | Daily Agent dev workhorse |
| Large | ¥500 | 250,000 | ✅ 24/7 | Heavy multimodal + long flows |
| Max | ¥1000 | 500,000 | ✅ 24/7 | Team / enterprise |

> Small tier is officially documented as **2,000 AFP / 5h, 7,000 AFP / week, 10,000 AFP daily visual quota**; higher tiers scale proportionally. Refer to the official docs for exact caps.

> 💡 **Inventory rules**: stock is released daily at 00:00 and sold until exhausted — popular tiers can run out, so lock in early if you've already decided.

---

## Bundled Models

Agent Plan packages first-party ByteDance models with top third-party Chinese models in one subscription:

**ByteDance Doubao series**

- **Doubao-Seed** — primary coding model
- **Doubao-Seedance** — video generation
- **Doubao-Seedream** — image generation
- **Doubao-embedding-vision** — multimodal embeddings

**Third-party**

- **GLM-5.1** (Zhipu)
- **Kimi-K2.6** (Moonshot)

**Auto mode**: same as Coding Plan — it routes each task to the best-fit model automatically, no manual switching required.

---

## Agent Plan vs Coding Plan

|  | Ark Coding Plan | Ark Agent Plan |
|---|---|---|
| Core capability | Text / code coding models | **Coding + multimodal + Harness tools** |
| Modalities | Text | **Text / code / image / video / embedding** |
| Harness | Model layer only | **Web search, memory, Auto, multimodal integrated** |
| Billing | Request count (N / 5h) | **AFP credits** |
| Token unit price | Baseline | **2~2.5× higher** |
| Long context | No explicit multiplier | **7.5× above 128k context** |
| Entry price | ¥9.9 (Lite) / ¥49.9 (Pro) | ¥40 (Small) |
| AI Companion | — | **Free 24/7 companion on Medium+** |

One-liner: Coding Plan is still **the best value for pure coding**; Agent Plan is **the new pick when you need multimodal + Agent tooling**.

---

## Harness Tooling: The Real Selling Point

Agent Plan is the first to integrate Model + Harness (Agent toolchain) capabilities deeply, all turnkey:

1. **Web search** — real-time retrieval, same backend as Doubao, no need to build your own
2. **Memory** — long-term memory powered by built-in embedding models
3. **Auto mode** — task-aware routing, picks the most suitable model
4. **Multimodal** — unified API for text / code / image / video generation and understanding

Supported clients: **Claude Code, OpenCode, Trae, OpenClaw, Hermes Agent**. Configure the API key in your client and you're done.

---

## Who Should Buy? Who Shouldn't?

### Buy if you

- Run Agent flows that frequently invoke **image / video generation**
- Want to call Doubao-Seedance / Seedream directly for media work
- Budget around the Medium tier (¥200/mo) and want the 24/7 companion as a bonus
- Are a China-native Claude Code / OpenCode / Trae user choosing a relay

### Don't buy if you

- Do **pure text coding** — Ark Coding Plan (from ¥9.9) has a lower unit price
- Are a **long-context heavy user (>128k)** — the 7.5× multiplier burns AFP fast
- Only want **original Claude / GPT models** — this is a China-native subscription
- Are a low-volume tinkerer — pay-as-you-go OpenRouter may still be cheaper

---

## How It Compares to Other Agent / All-Modal Subscriptions

| Product | Entry price | Highlights | Modalities | Notes |
|---|---|---|---|---|
| **Ark Agent Plan** | ¥40 | Doubao + GLM + Kimi + Harness | Text/code/image/video/embedding | Industry's first Agent bundle, AFP credits |
| **MiniMax Token Plan** | ¥29 | M2.7 + Hailuo + Speech + Music | All-modal (incl. audio/music) | Upgraded from Coding Plan on 2026-03-23 |
| **Bailian Token Plan (Team)** | ¥198 | Qwen + DeepSeek + Kimi + GLM + Wan | Text + image | Multi-seat, enterprise-grade |

The three subscriptions emphasize different things: MiniMax leans into **audio/music multimodal**, Bailian into **wide model lineup + team multi-seat**, while Ark Agent Plan leans into **full-stack Doubao + Harness tooling**.

---

## Three Steps to Get Started

1. Visit the [Ark Agent Plan page](https://ai.volcengine.com/activity/agentplan) and pick a tier based on AFP estimates
2. Pay with Alipay / WeChat (mind the 00:00 daily restock cadence)
3. Create an API key in the [Volcano Engine console](https://console.volcengine.com/) and plug it into your client (Claude Code / OpenCode / Trae) using the Ark endpoint

> The integration steps are essentially identical to Coding Plan — just swap the API key. See [Cline + Ark setup guide](/en/guides/cline-ark-setup/) for a step-by-step walkthrough that applies here too.

---

## Closing Thoughts

Agent Plan is Volcano Ark's first attempt to bundle **Model + Harness** together, effectively shifting the business from "selling model tokens" to "selling Agent fuel". **For pure-coding users it isn't the best deal** — the unit price went up; **but for developers genuinely building multimodal Agents, it packs capabilities (search, memory, video/image generation) that previously required glue code into a single subscription**, eliminating significant integration and ops cost.

A pragmatic starting move: subscribe to Small (¥40) for one month, measure your real AFP consumption and how often you trigger the long-context multiplier, then decide whether to upgrade to Medium for the companion perk.

---

## Related Reading

- [Ark Coding Plan vs Bailian Coding Plan](/en/compare/bailian-coding-plan-vs-ark-coding-plan/)
- [Cline + Volcano Ark Setup Guide](/en/guides/cline-ark-setup/)
- [AI Coding Rate Limits Compared](/en/guides/ai-coding-rate-limits/)
