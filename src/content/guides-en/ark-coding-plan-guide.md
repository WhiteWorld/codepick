---
title: "Volcengine Ark Coding Plan: Complete Guide — Lite ¥40/mo (¥9.9 first month)"
description: "Volcengine Ark Coding Plan is one of China's most affordable AI coding API packages: Lite ¥40/mo (¥9.9 first month, down to ¥8.9 with referral coupon), Pro ¥200/mo (¥49.9 first month). Covers tier mechanics, renewal rules, Auto mode, supported clients, and how to start at minimum cost."
date: "2026-05-17"
updated_at: "2026-05-19"
article_type: "explainer"
tags: ["ark", "coding-plan", "bytedance", "api", "cline", "claude-code", "roo-code", "opencode", "trae"]
faq:
  - q: "Is Lite really only ¥9.9/month? What's the renewal price?"
    a: |
      ¥9.9 is the **first-month promotional price** for Lite (2.5× discount); referral coupons can push it to ¥8.9.
      **Renewal returns to the standard ¥40/month**. Pro is similar — ¥49.9 first month, ¥200 renewal. Pro's first-time 3-month bundle is 50% off, averaging ¥100/month.
  - q: "Lite ¥40 or Pro ¥200 — which should I pick?"
    a: |
      For steady daily coding without parallel Agents, Lite is enough (~1,200 requests per 5h sliding window).
      For long Agent runs, multi-file edits, or multiple clients in parallel, go straight to Pro (~6,000 / 5h, 5× Lite). Best practice: start with Lite at ¥9.9 first month, measure real usage, then decide whether to upgrade.
  - q: "Is Auto mode better than picking models manually?"
    a: |
      In most cases Auto saves more quota — it routes simple tasks to the cheapest capable model.
      If you know a task needs the flagship model (e.g. complex refactors), manual selection avoids Auto's misjudgments. For daily use, Auto is recommended.
  - q: "Can I use Claude Code with Ark?"
    a: |
      Yes, and setup is trivial. Ark provides an Anthropic-compatible endpoint — set two env vars (`ANTHROPIC_BASE_URL=https://ark.cn-beijing.volces.com/api/coding/anthropic` and the API key) and you're done.
      No proxy, no middleware. Models routed are Doubao / GLM / Kimi.
  - q: "Ark vs Bailian vs MiniMax — how to choose?"
    a: |
      Cheapest: **Ark** (Lite ¥9.9 first month / ¥40 renewal). Want the full Qwen lineup: **Bailian** (¥200, most models). Full multimodal incl. audio/music: **MiniMax Token Plan** (¥29 entry).
      Heavy >128k long-context users should avoid Agent Plan due to its 7.5× multiplier. See [Bailian vs Ark](/en/compare/bailian-coding-plan-vs-ark-coding-plan/).
---

Volcengine Ark Coding Plan is ByteDance's AI coding API package: **Lite standard ¥40/month, first month as low as ¥9.9**, no VPN required, Alipay/WeChat payment supported. One of the lowest-cost ways for developers in China to get AI coding API access — but be aware ¥9.9 is a first-month promo; renewal returns to ¥40.

## Plans

| Item | Lite | Pro |
|------|------|-----|
| Standard monthly | **¥40** | ¥200 |
| First-month promo | **¥9.9** (down to ¥8.9 with referral) | ¥49.9 |
| Renewal | ¥40/mo | ¥200/mo (first-time 3-month bundle 50% off, ~¥100/mo) |
| Per 5 hours | ~1,200 requests | ~6,000 requests (5× Lite) |
| Auto mode | ✅ | ✅ |
| Barrier to entry | Very low (first month) | Moderate |

- Quota uses a **rolling 5-hour window** (not calendar month) — great for consistent daily use
- Service pauses when window cap is hit; resumes automatically as time slides forward
- **New user signups open daily at 10:30 AM Beijing time** (since March 13, 2026)
- Referral program: both parties get discounts; referrer earns 10% coupon per order (uncapped)

> ⚠️ Promotional pricing changes frequently; verify on the official site.

## Supported Models (5)

| Model | Source |
|-------|--------|
| Doubao-Seed-Code | ByteDance proprietary coding model |
| GLM-4.7 | Zhipu AI |
| DeepSeek-V3.2 | DeepSeek |
| Kimi-K2.5 | Moonshot |
| Kimi-K2-Thinking | Moonshot (reasoning model) |

**Auto mode** automatically selects the best model per task — lightweight models for simple tasks (saving quota), flagship models for complex ones.

## Compatible Clients (11)

Claude Code, Cursor, Cline, Codex CLI, Kilo Code, Roo Code, OpenCode, Trae, Kilo CLI, OpenClaw, Moltbot.

Ark supports **both OpenAI and Anthropic protocols**, covering virtually all major AI coding clients. Claude Code users can connect natively via the Anthropic-compatible endpoint.

## Setup: Cline + Ark (Recommended)

1. **Subscribe** (time your visit!): Go to [Volcengine Ark Coding Plan](https://www.volcengine.com/L/s3lNTNYxaEc/) — new signups open daily at 10:30 AM Beijing
2. **Get API Key**: Volcengine Console → API Key Management
3. **Configure Cline**:
   - API Provider: `OpenAI Compatible`
   - Base URL: `https://ark.cn-beijing.volces.com/api/coding`
   - API Key: your Ark key
   - Model: `doubao-seed-code-preview-latest` or enable Auto mode

See our [Cline + Ark plan](/en/plan/cline-ark) and [Cline + Ark setup guide](/en/guides/cline-ark-setup) for details.

## Setup: Claude Code + Ark

```bash
export ANTHROPIC_BASE_URL="https://ark.cn-beijing.volces.com/api/coding/anthropic"
export ANTHROPIC_API_KEY="your-ark-api-key"
claude
```

Two environment variables and you're done — Ark's Anthropic-compatible endpoint handles the rest.

## Money-Saving Tips

1. **Start with Lite** (¥9.9 first month): enough for light daily coding; measure usage before upgrading
2. **Stack the referral coupon**: friend referral gives both sides 10% off — Lite first month down to **¥8.9**
3. **Use Auto mode**: lightweight models for simple tasks, saving your quota
4. **Time your new-signup visit**: 10:30 AM Beijing daily
5. **Buy 3 months of Pro upfront**: 50% off (~¥100/mo) — Pro's long-term cheapest path

> ⚠️ Lite renewal returns to **¥40/month**, not ¥9.9 — budget against ¥40 for accuracy.

## Quick Comparison: Ark vs Bailian

| Dimension | Ark | Bailian |
|-----------|-----|---------|
| Standard monthly | ¥40 (Lite) / ¥200 (Pro) | ¥200 (Pro) |
| First-month promo | ¥9.9 / ¥49.9 | None |
| Quota model | 5-hour rolling window | Monthly total |
| Model count | 5 | 8 |
| Auto mode | ✅ | ❌ |
| Sub-accounts | ✅ | ❌ |

Full comparison: [Bailian vs Ark Coding Plan](/en/compare/bailian-coding-plan-vs-ark-coding-plan).

## Who It's For

- ✅ Developers wanting a ¥9.9 first-month trial
- ✅ Anyone OK with ¥40/month renewal
- ✅ Consistent daily coders (5-hour window suits steady usage)
- ✅ Developers who want multiple Chinese model options
- ✅ Claude Code users needing a domestic relay
- ✅ Teams needing sub-account management
- ❌ Anyone expecting permanent ¥9.9 pricing (first-month only; reverts to ¥40)
- ❌ Bursty users who code in intense sprints (monthly cap would suit better)

## Related Articles

- [Bailian vs Ark Coding Plan Comparison](/en/compare/bailian-coding-plan-vs-ark-coding-plan)
- [Cline + Ark Plan](/en/plan/cline-ark)
- [Cline + Ark Setup Guide](/en/guides/cline-ark-setup)
- [Bailian Coding Plan Guide](/en/guides/bailian-coding-plan)

> Data source: Volcengine Ark official docs (2026-05). Pricing, promotions, and signup policies subject to change; verify on the official site.
