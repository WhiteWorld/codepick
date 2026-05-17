---
title: "Volcengine Ark Coding Plan: Budget Guide — ¥9.9 AI Coding API"
description: "Volcengine Ark Coding Plan is China's most affordable AI coding API package (from ¥9.9/mo). Covers Lite/Pro tiers, Auto mode, compatible clients, and how to get started at minimum cost."
date: "2026-05-17"
article_type: "explainer"
tags: ["ark", "coding-plan", "bytedance", "api", "cline", "claude-code", "roo-code", "opencode", "trae"]
---

Volcengine Ark Coding Plan is ByteDance's AI coding API package, starting at **¥9.9/month with no VPN required**. It's one of the lowest-cost ways for developers in China to get AI coding API access.

## Plans

| Item | Lite | Pro |
|------|------|-----|
| Monthly | **¥9.9** (reg. ¥40) | ¥49.9 (reg. ¥200) |
| Per 5 hours | ~1,200 requests | ~6,000 requests |
| Auto mode | ✅ | ✅ |
| Barrier to entry | Very low | Moderate |

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

1. **Start with Lite** (¥9.9): enough for light daily coding; upgrade to Pro if needed
2. **Use Auto mode**: lightweight models for simple tasks, saving your quota
3. **Refer friends**: both sides get discounts
4. **Time your new-signup visit**: 10:30 AM Beijing daily
5. **Buy 3 months of Pro upfront**: up to 50% off for first-time quarterly purchase

## Quick Comparison: Ark vs Bailian

| Dimension | Ark | Bailian |
|-----------|-----|---------|
| Starting price | ¥9.9/mo | ¥200/mo |
| Quota model | 5-hour rolling window | Monthly total |
| Model count | 5 | 8 |
| Auto mode | ✅ | ❌ |
| Sub-accounts | ✅ | ❌ |

Full comparison: [Bailian vs Ark Coding Plan](/en/compare/bailian-coding-plan-vs-ark-coding-plan).

## Who It's For

- ✅ Budget-conscious individual developers (from ¥9.9)
- ✅ Consistent daily coders (5-hour window suits steady usage)
- ✅ Developers who want multiple Chinese model options
- ✅ Claude Code users needing a domestic relay
- ✅ Teams needing sub-account management
- ❌ Bursty users who code in intense sprints (monthly cap would suit better)

## Related Articles

- [Bailian vs Ark Coding Plan Comparison](/en/compare/bailian-coding-plan-vs-ark-coding-plan)
- [Cline + Ark Plan](/en/plan/cline-ark)
- [Cline + Ark Setup Guide](/en/guides/cline-ark-setup)
- [Bailian Coding Plan Guide](/en/guides/bailian-coding-plan)

> Data source: Volcengine Ark official docs (2026-05). Pricing, promotions, and signup policies subject to change; verify on the official site.
