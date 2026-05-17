---
title: "Bailian Coding Plan: Complete Guide to Pricing, Quotas, and Client Setup"
description: "Alibaba Cloud's Bailian Coding Plan is a subscription-based API package for AI coding. This guide covers the Pro tier, supported models, compatible clients, and configuration steps."
date: "2026-05-17"
article_type: "explainer"
tags: ["bailian", "coding-plan", "alibaba", "qwen", "api", "claude-code", "cline", "opencode", "cursor"]
---

Bailian Coding Plan is Alibaba Cloud's dedicated AI coding API package at ¥200/month (verify current pricing on the official site). It provides guaranteed request quotas plus access to 8 models, ideal for developers who prefer the Qwen model ecosystem. No VPN required — subscribe via Alipay or WeChat Pay.

## Current Plans

Only **Pro** is available for new subscriptions (Lite was discontinued in March 2026).

| Item | Pro |
|------|-----|
| Monthly fee | ¥200 (verify on official site) |
| Per 5 hours | ~6,000 requests |
| Per week | ~45,000 requests |
| Per month | ~90,000 requests |
| Payment | Alipay / WeChat Pay |
| Network | **No VPN required** |
| Sub-accounts | ❌ Primary account only |

> ⚠️ Quota is consumed per request (not per token). Simple tasks ~5–10 requests, complex tasks 10–30+. Service stops when quota is exhausted — no pay-as-you-go fallback.

## Supported Models (8)

| Model | Category |
|-------|----------|
| qwen3.6-plus | Qwen flagship general (Pro exclusive, with vision) |
| qwen3.5-plus | Qwen general flagship |
| qwen3-max-2026-01-23 | Qwen flagship Max |
| qwen3-coder-next | Qwen coding flagship |
| qwen3-coder-plus | Qwen coding enhanced |
| MiniMax-M2.5 | MiniMax coding model |
| GLM-5 | Zhipu latest flagship |
| Kimi-K2.5 | Moonshot coding model |

**Recommendation**: `qwen3-coder-next` for daily coding; switch to `qwen3.6-plus` for complex reasoning; use `GLM-5` or `Kimi-K2.5` as alternatives.

## Compatible Clients

Bailian works with 7 AI coding clients:

- **Claude Code** — CLI agent, easiest setup via ANTHROPIC_BASE_URL
- **Cline** — Most popular VS Code extension option
- **Cursor** — API-based integration
- **OpenCode** — Terminal-first developers
- **Qwen Code** — Alibaba's native client (best compatibility)
- **OpenClaw** — Universal AI coding client
- **Kilo IDE** — Open-source IDE

## Setup: Cline + Bailian

1. **Subscribe**: Go to [Bailian Coding Plan](https://www.aliyun.com/benefit/scene/codingplan), activate Pro
2. **Get API Key**: Alibaba Cloud Console → Model Studio → API Key Management
3. **Configure Cline**:
   - API Provider: `OpenAI Compatible`
   - Base URL: `https://coding.dashscope.aliyuncs.com/v1`
   - API Key: paste your key
   - Model: `qwen3-coder-next`

See our [Cline + Bailian plan](/en/plan/cline-bailian) for a full walkthrough.

## Setup: Claude Code + Bailian

```bash
export ANTHROPIC_BASE_URL="https://coding.dashscope.aliyuncs.com/apps/anthropic"
export ANTHROPIC_API_KEY="your-bailian-api-key"
claude
```

Bailian's Anthropic-compatible endpoint lets Claude Code connect directly with no middleware needed.

## Quick Comparison: Bailian vs Volcengine Ark

| Dimension | Bailian | Volcengine Ark |
|-----------|---------|----------------|
| Monthly | ¥200 | From ¥9.9 |
| Quota model | Monthly total | Rolling 5-hour window |
| Model count | 8 | 5 |
| Auto mode | ❌ | ✅ |
| Anthropic protocol | ✅ | ✅ |
| Entry price | Higher (¥200) | Lower (¥9.9) |

Full comparison: [Bailian vs Ark Coding Plan](/en/compare/bailian-coding-plan-vs-ark-coding-plan).

## Who It's For

- ✅ Developers who prefer the Qwen model ecosystem
- ✅ Existing Alibaba Cloud users with a primary account
- ✅ Consistent monthly usage patterns
- ❌ Budget-conscious developers (¥200 entry vs ¥9.9 for Ark)
- ❌ Teams needing sub-account management
- ❌ Bursty high-intensity usage (monthly cap less flexible than Ark's 5-hour window)

## Related Articles

- [Bailian vs Volcengine Ark Coding Plan Comparison](/en/compare/bailian-coding-plan-vs-ark-coding-plan)
- [Cline + Bailian Plan](/en/plan/cline-bailian)
- [Volcengine Ark Coding Plan: Budget Guide](/en/guides/ark-coding-plan-guide)

> Data source: Alibaba Cloud Bailian official docs (2026-05). Pricing, quotas, and new-signup policies subject to change; verify on the official site.
