---
title: "Coding Plan vs Agent Plan vs Token Plan: 2026 China AI Subscription Showdown"
description: "A full comparison of Ark Agent Plan, MiniMax Token Plan, and Bailian Token Plan (Team) — pricing, billing units, model lineups, modality coverage, Harness tools, and how to choose."
date: "2026-05-13"
tags: ["coding-plan", "agent-plan", "token-plan", "volcano-ark", "minimax", "bailian", "comparison", "agent", "multimodal"]
draft: false
---

In the first half of 2026, China's AI coding subscription market split into clearly different product shapes. What used to be a fairly uniform "Coding Plan" category got pulled in three different directions:

- **Volcano Ark Agent Plan** (launched 2026-05-11): coding + multimodal + Harness tooling, AFP credits
- **MiniMax Token Plan** (upgraded from Coding Plan on 2026-03-23): all-modal (text/image/video/voice/music)
- **Bailian Token Plan Team Edition**: multi-seat + multi-model + text/image

All three are "more than just a Coding Plan", but they're optimizing for different things. This piece compares them head-to-head so you can decide which one fits.

---

## TL;DR

| Product | Positioning | Entry price |
|---|---|---|
| **Ark Agent Plan** | Doubao full-stack + Harness toolchain Agent bundle | ¥40/mo |
| **MiniMax Token Plan** | World's first all-modal subscription, includes video & music | ¥29/mo |
| **Bailian Token Plan (Team)** | Team / enterprise multi-seat, broadest model lineup | ¥198/mo |

Need Doubao + image/video + Agent toolchain → **Ark Agent Plan**.
Need audio/video/music multimodal → **MiniMax Token Plan**.
Team collaboration + data compliance → **Bailian Token Plan (Team)**.

---

## Pricing & Tiers

| Vendor | Entry | Mid | High | Top |
|------|------|------|------|------|
| **Ark Agent Plan** | Small ¥40 | Medium ¥200 | Large ¥500 | Max ¥1000 |
| **MiniMax Token Plan** | Starter ¥29 | Plus ¥49 | Max ¥119 | Ultra (High-Speed) ¥899 |
| **Bailian Token Plan (Team)** | Standard ¥198 | Premium ¥698 | Enterprise ¥1398 | ¥5,000 shared pack |

**Takeaways**:
- **Lowest budget**: MiniMax at ¥29 (also the smallest quota)
- **Lowest entry with full bundle**: Ark at ¥40 — slightly more than MiniMax but bundles richer models/tools
- **Most expensive, broadest models**: Bailian Team edition starts at ¥198, targeted at teams/enterprises

---

## Billing Units

This is the easiest place to get confused and the most important difference:

| Product | Unit | Refresh mechanism | When exhausted |
|---|---|---|---|
| Ark Agent Plan | **AFP (Agent Fuel Points)** | Daily 00:00 release + 5h rolling window | Wait for next window or upgrade |
| MiniMax Token Plan | **request** (M2.7 calls) | 5h rolling window + per-day multimodal quotas | Wait for next window |
| Bailian Token Plan (Team) | **Credits** (weighted by model) | Monthly total + shared pack for overage | Upgrade or buy shared pack |

**Interpretation**:

- **Ark's AFP** rolls token volume, model tier and long-context multipliers into one fuel unit — long prompts burn fast (**7.5× multiplier above 128k context**)
- **MiniMax's request** is roughly 1 M2.7 call, simple and intuitive, but multimodal quotas are tracked per day separately
- **Bailian's Credits** scale with token usage and are uniform across models — easiest for enterprise budgeting

---

## Model Lineups

### Ark Agent Plan (6 models)

| Type | Model |
|---|---|
| Coding | Doubao-Seed |
| Video gen | Doubao-Seedance |
| Image gen | Doubao-Seedream |
| Multimodal embedding | Doubao-embedding-vision |
| Third-party | GLM-5.1, Kimi-K2.6 |

### MiniMax Token Plan (6 models)

| Type | Model |
|---|---|
| Coding | MiniMax-M2.7 / M2.7 High-Speed |
| Video | Hailuo Video |
| Voice | Speech 2.8 |
| Image | Image-01 |
| Music | Music-2.6 (100 free/day) |

### Bailian Token Plan Team (14 models)

| Type | Model |
|---|---|
| Coding / general | qwen3.6-plus, qwen3.6-flash |
| Reasoning | deepseek-v4-pro, deepseek-v4-flash, deepseek-v3.2 |
| Third-party | kimi-k2.6, kimi-k2.5, glm-5.1, glm-5, MiniMax-M2.5 |
| Image | qwen-image-2.0, qwen-image-2.0-pro, wan2.7-image, wan2.7-image-pro |

**Verdict**: Bailian has the widest catalogue, Ark bets on its own Doubao stack, and MiniMax is the only one with both music and video.

---

## Modality Coverage

|  | Ark Agent Plan | MiniMax Token Plan | Bailian Team |
|---|:-:|:-:|:-:|
| Text / code | ✅ | ✅ | ✅ |
| Image generation | ✅ | ✅ | ✅ |
| Image understanding | ✅ (embedding-vision) | — | ✅ (qwen-image) |
| Video generation | ✅ (Seedance) | ✅ (Hailuo) | — |
| Voice | — | ✅ (Speech 2.8) | — |
| Music | — | ✅ (Music-2.6) | — |
| Vector / Embedding | ✅ | — | ✅ |

**MiniMax is the only one with music + voice**. **Bailian is the only one without video**. Ark covers image/video/embedding but no audio yet.

---

## Harness / Agent Tooling

| Capability | Ark Agent Plan | MiniMax | Bailian Team |
|---|:-:|:-:|:-:|
| Web search | ✅ (shared with Doubao) | — | — |
| Built-in memory | ✅ (embedding) | — | — |
| Auto routing | ✅ | — | — |
| Multi-seat | — | — | ✅ |
| Shared usage pack | — | — | ✅ |
| No-train-on-data commitment | — | — | ✅ |
| 24/7 AI companion | ✅ (Medium+) | — | — |

**Ark Agent Plan's real moat is its Harness toolchain** — it bundles search, memory and Auto routing that you'd otherwise have to glue together yourself.
**Bailian Team's moat is organizational** — seats, shared packs, compliance.
**MiniMax doesn't differentiate on Agent orchestration; its strength is modality breadth.**

---

## Client Compatibility

| Client | Ark Agent Plan | MiniMax | Bailian Team |
|---|:-:|:-:|:-:|
| Claude Code | ✅ | ✅ | ✅ |
| OpenCode | ✅ | ✅ | ✅ |
| Trae | ✅ | ✅ | ✅ (via Qwen Code etc.) |
| OpenClaw | ✅ | — | ✅ |
| Hermes Agent | ✅ | — | ✅ |
| Cline | — | ✅ | ✅ |
| Codex CLI | — | ✅ | ✅ |
| Cursor | — | ✅ | ✅ |

**Ark Agent Plan** leans toward Agent frameworks (OpenClaw, Hermes), while **MiniMax / Bailian** cover open-source IDE plugins (Cline, Cursor) more widely.

---

## Decision Tree

```
What's your primary use case?
├─ Pure text / code coding
│   ├─ Solo dev on a budget → Ark Coding Plan (Lite ¥40/mo, ¥9.9 first month, not in this matchup)
│   └─ Team needing compliance → Bailian Token Plan Team (¥198+)
│
├─ Coding + image/video generation (multimodal Agent)
│   ├─ Want Doubao + Agent toolchain → Ark Agent Plan
│   └─ Want Hailuo video / MiniMax music → MiniMax Token Plan
│
├─ Coding + voice / music
│   └─ MiniMax Token Plan (the only choice)
│
└─ Multi-user team + mixed models
    └─ Bailian Token Plan (Team)
```

---

## Unit Price Estimate

Rough ¥/¥1000-unit comparison at the entry tier (indicative — real cost depends on model & context):

| Product | Entry price | Nominal quota | ¥ / 1,000 units |
|---|---|---|---|
| Ark Agent Plan Small | ¥40 | 20,000 AFP | ~¥2 / 1,000 AFP |
| MiniMax Token Plan Starter | ¥29 | 600 req/5h (≈ 18,000/mo) | ~¥1.6 / 1,000 req |
| Bailian Token Plan Standard | ¥198 | 25,000 Credits | ~¥8 / 1,000 Credits |

**Warning**: AFP / request / Credit are **not directly comparable**. Ark AFP is blown up by the 7.5× long-context multiplier; Bailian Credits scale with token weighting; MiniMax request is flat per call. **Real cost must be benchmarked against your own prompt patterns for a week before you decide**.

---

## Honest Weaknesses

- **Ark Agent Plan**: token unit price is **2~2.5× higher** than the old Coding Plan; the **7.5× long-context multiplier** is unfriendly to repo-dump-style prompting
- **MiniMax Token Plan**: models are all MiniMax-first-party — no Qwen / DeepSeek / GLM swap-in; video / music has per-day caps
- **Bailian Token Plan (Team)**: ¥198 entry is steep for solo devs; no video/voice models, not suitable for multimedia workloads

---

## Closing Thoughts

China's AI subscription market is fragmenting from "selling tokens" into three distinct directions: **selling Agent fuel / selling modalities / selling seats**:

- **Volcano Ark** is betting on **Agent toolchain + Doubao full stack**
- **MiniMax** is betting on **full-modal coverage**
- **Bailian** is betting on **enterprise multi-seat + multi-model aggregation**

In the short term these three won't fully substitute for each other. **Heavy users will likely subscribe to two of them** (a common combo: Ark Coding Plan for everyday text coding + MiniMax Token Plan for multimedia work). Run your real workflow against the entry tier for two weeks before committing to a main subscription.

---

## Related Reading

- [Volcano Ark Agent Plan Explained](/en/guides/ark-agent-plan/)
- [Bailian Coding Plan vs Ark Coding Plan](/en/compare/bailian-coding-plan-vs-ark-coding-plan/)
- [AI Coding Rate Limits Compared](/en/guides/ai-coding-rate-limits/)
