---
title: "How to Use Claude Code in China: 5 Working Methods in 2026"
description: "Claude Code is blocked in mainland China, but there are real workarounds. This guide covers 5 methods — from the Volcengine Ark relay (no VPN needed) to direct API and Kiro — with cost and effort compared."
date: "2026-04-05"
article_type: "explainer"
tags: ["claude-code", "china", "volcengine-ark", "kiro", "api", "workaround"]
draft: false
---

Claude Code has the highest coding ability score of any AI coding tool, but mainland China developers face three barriers: network restrictions, payment difficulties, and registration friction. This guide covers every working method in 2026.

---

## Options at a Glance

| Method | Monthly Cost | VPN Required | Effort | Best For |
|--------|-------------|-------------|--------|---------|
| Volcengine Ark Coding Plan relay | Official promo | ❌ No | ⭐⭐ | Budget-first, no VPN |
| Official Claude.ai subscription | ≥$20 | ✅ Yes | ⭐⭐⭐ | Full Claude experience |
| Anthropic API (pay-as-you-go) | Variable | ✅ Yes | ⭐⭐⭐ | Variable usage patterns |
| Kiro (AWS) | ~1/10 of Claude Code | ✅ Yes | ⭐⭐ | Real Claude models, lower cost |
| Kiro + AIClient-2-API proxy | ~1/10 of Claude Code | ✅ Yes | ⭐⭐⭐ | Claude Code CLI workflow + Kiro models |

---

## Method 1: Volcengine Ark Coding Plan (No VPN Required)

**The lowest-barrier option for China-based developers**

Volcengine Ark (ByteDance's cloud platform) provides an Anthropic API-compatible endpoint. Claude Code routes requests through Ark's infrastructure, which is accessible from mainland China without a proxy.

**Setup:**

```bash
# 1. Subscribe to Volcengine Ark Coding Plan
# Visit: volcengine.com — search for "Ark Coding Plan"
# Supports Alipay and WeChat Pay

# 2. Get your API Key from the Volcengine console

# 3. Set environment variables
export ANTHROPIC_API_KEY="your-ark-api-key"
export ANTHROPIC_BASE_URL="https://ark.cn-beijing.volces.com/api/v3/"

# 4. Install and run Claude Code
npm install -g @anthropic-ai/claude-code
claude
```

**Model capabilities:**
- `doubao-seed-code-preview-latest` — Doubao coding model, approaching Claude Sonnet 4.5 level on coding tasks
- DeepSeek-V3.2, GLM-4.7, Kimi-K2.5 also available
- Daily free quota: 500K tokens per model

**Cost:**
- Choose the tier that fits your usage; pricing changes, so check the official site
- Average cost ~63% lower than official Claude Code Pro pricing

**Limitation**: You're using Doubao / DeepSeek models rather than genuine Claude. For tasks where only Claude's reasoning matters, this is a trade-off.

---

## Method 2: Official Claude.ai Subscription (Full Claude, Needs VPN)

The most straightforward path if you have a stable proxy and a way to pay.

**Subscription options that work:**
- **International credit card** via claude.ai directly (some domestic dual-currency cards work, many don't)
- **Virtual card services** (landscape changes frequently — verify current options)
- **Apple App Store** (US Apple ID + gift card via Alipay): most reliable path for iOS users
- **Google Play** (for Android users with compatible payment method)

**Once subscribed:**

```bash
npm install -g @anthropic-ai/claude-code
claude  # Opens browser for OAuth login
```

**Cost**: $20/month (Pro), $100/month (Max 5x), $200/month (Max 20x)

**What you get**: Real Claude Sonnet 4.6 / Opus 4.6, full Agent Teams, Sub-agents, MCP, 1M context window.

---

## Method 3: Anthropic API Pay-as-You-Go (Needs VPN + International Payment)

Direct API access without a Claude.ai subscription. More flexible for developers with variable usage.

```bash
# Get API Key from console.anthropic.com
export ANTHROPIC_API_KEY="sk-ant-xxxx"

npm install -g @anthropic-ai/claude-code
claude
```

**API pricing (Sonnet 4.6)**: $3 input / $15 output per million tokens

**When this beats a subscription:**
- Light usage (10 requests/day) → ~$3–8/month vs $20 fixed
- You want to avoid rate limits entirely (API has higher limits than Pro plan)
- Usage is unpredictable month to month

**Requirements**: Anthropic API account with international payment method (credit card or PayPal).

---

## Method 4: Kiro (AWS) — Real Claude Models at ~1/10 the Cost (Needs VPN)

Kiro is an AI IDE from AWS that includes Anthropic's full model lineup (Claude Opus 4.5, Sonnet 4.5, etc.) billed through AWS accounts. Overall cost is approximately **1/10 of a direct Claude Code subscription**.

**Why it's cheaper**: AWS enterprise pricing for Anthropic models differs from Anthropic's consumer pricing.

**How to use:**
1. Create an AWS account (some China-issued dual-currency cards work)
2. Visit kiro.dev and subscribe using your AWS account
3. Use Kiro IDE (VS Code fork with full Claude access) or Kiro CLI

**What Kiro offers:**
- Full Claude Opus 4.5 / Sonnet 4.5 access
- Kiro IDE: VS Code fork with chat, code completion, Agent mode
- Kiro CLI: similar to Claude Code's terminal experience

**Requirement**: Stable proxy connection (AWS/Kiro servers are overseas).

---

## Method 5: Kiro + AIClient-2-API (Claude Code CLI Workflow, Needs VPN)

If you prefer Claude Code's terminal workflow but want Kiro's lower cost, [AIClient-2-API](https://github.com/justlovemaki/AIClient-2-API) proxies Kiro's Claude models as a standard API endpoint for Claude Code to use.

**How it works:**
AIClient-2-API reads Kiro's local OAuth token and runs a local API proxy. Claude Code points to this local proxy via `ANTHROPIC_BASE_URL`.

**Setup:**

```bash
# Step 1: Install Kiro IDE and sign in (generates auth token)
# Download from kiro.dev, sign in with AWS account
# Auth file: ~/.kiro/auth/kiro-auth-token.json

# Step 2: Run the proxy (Docker)
docker run -d -p 3000:3000 justlovemaki/aiclient-2-api

# Step 3: Configure via web UI at http://localhost:3000
# Upload the Kiro auth token, select claude-kiro-oauth endpoint

# Step 4: Point Claude Code at the proxy
export ANTHROPIC_BASE_URL="http://localhost:3000/claude-kiro-oauth"
export ANTHROPIC_API_KEY="any-string"
claude
```

**Advantage**: Keep using Claude Code CLI exactly as normal, but pay Kiro rates instead of Anthropic rates.

**Caveats**: Third-party open-source tool — evaluate security before use. Local proxy must stay running.

---

## Which Method Should You Choose?

```
Need to avoid VPN entirely?
└── Volcengine Ark Coding Plan (official pricing, Doubao/DeepSeek models)

Have VPN + international payment?
├── Budget-first → Kiro subscription (~1/10 of Claude Code cost)
│   ├── Prefer IDE → Use Kiro IDE directly
│   └── Prefer CLI → Kiro + AIClient-2-API proxy
└── Want full Claude Code experience → Official claude.ai subscription
    ├── Light usage → Anthropic API pay-as-you-go
    └── Heavy usage → Claude Pro/Max ($20–200/mo)
```

---

## Common Questions

**Q: Can I use Claude Code's free tier in China?**

Claude's free account can access Claude Code with very limited quota (tens of messages/day). Sufficient only for brief testing. For real use, subscribe to at least Pro.

**Q: Will using a proxy get my Claude account banned?**

There is some risk. Use a stable single-node proxy (US recommended), avoid frequent IP switching. API-mode usage has lower ban risk than web-based access.

**Q: How does Doubao (Volcengine Ark) compare to real Claude?**

Doubao-Seed-Code approaches Claude Sonnet 4.5 on coding tasks — daily development experience is close. For complex reasoning, long-context understanding, or Agent Teams tasks, genuine Claude maintains an advantage.

**Q: Is the Kiro pricing approach legitimate?**

Yes — Kiro is an official AWS product with real Anthropic model integration. The pricing difference stems from AWS's enterprise model agreements.

---

## Related

- [Cline + Volcengine Ark Setup Guide](/en/guides/cline-ark-setup) — VS Code alternative, same provider and pricing policy
- [Claude Code Is Too Expensive: Budget Alternatives](/en/guides/claude-code-budget-alternatives)
- [Claude Code vs Cline Comparison](/en/compare/claude-code-vs-cline)
- [AI Coding Rate Limits Guide](/en/guides/ai-coding-rate-limits)
