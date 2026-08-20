---
title: "OpenRouter Top-Up & Usage Guide (2026): One API for 500+ Models"
description: "OpenRouter is a unified API aggregating 500+ models across 80+ providers, with credit-based pay-as-you-go billing (no subscription) and support for credit cards, AliPay, and USDC crypto. This guide covers signup, topping up, wiring the key into Cline/Aider/OpenCode, fees and refund rules, and how it compares with API relay services and official subscriptions."
date: "2026-08-20"
article_type: howto
tags: [openrouter, api, credits, guide, billing]
pillar: plans
content_status: keep
locale_strategy: mirrored
draft: false
---

## Bottom Line

- **OpenRouter fits**: developers or teams who want one API key to switch across Claude/GPT/Gemini/DeepSeek and others on demand, with elastic usage - no per-vendor subscriptions.
- **Not a fit**: users who need mainland-China direct access, RMB payment, or rock-bottom prices. OpenRouter is billed with international cards (limited AliPay) and served overseas, so domestic experience trails domestic coding plans.
- **Cost profile**: no subscription, per-token billing, no markup on underlying model prices (only a small credit-purchase fee). At low usage it's far cheaper than a subscription.
- **Watch out**: the refund window is only 24 hours; on 2026-08-19 OpenRouter announced it is joining Stripe - long-term policy worth watching.

---

## What OpenRouter Is

OpenRouter is a **model-aggregation API**: one unified endpoint for 500+ models across 80+ providers, covering text, images, video, and audio, fully compatible with the OpenAI SDK. Three core selling points:

1. **One key for every model**: Claude, GPT, Gemini, DeepSeek, Kimi... no separate signup or billing per vendor.
2. **Automatic failover**: if one provider goes down, traffic falls back to others.
3. **Pay as you go**: no monthly fee, no subscription - buy credits, spend what you use.

It's natively supported by many tools - Cline, Aider, Roo Code, and OpenCode on this site all list `openrouter` as a compatible API; drop in the key and go.

## Signup and Top-Up

Official data (verified 2026-08-20 at openrouter.ai):

- **Signup**: Google / GitHub / MetaMask login; you can create a personal or organization (Org) workspace.
- **Credits**: top up a credit balance first, then it's deducted by actual usage; credits work with any model or provider.
- **Payment methods**: major credit cards, **AliPay**, and cryptocurrency (USDC); PayPal is listed as coming soon.
- **Fees**: OpenRouter does **not** mark up model pricing - it charges only a small fee when you purchase credits (exact rate not published; see the checkout page).
- **Refunds**: unused credits are refundable within **24 hours** of the transaction; after that, unused credits are non-refundable.

> Tip: rate limits for free models are tied to how many credits you've purchased - accounts that have bought credits get higher daily free-model limits.

## Usage Flow

1. **Sign up + top up**: openrouter.ai -> Sign up -> Credits page (start small, e.g. $10).
2. **Get an API key**: Dashboard -> Keys -> Create key (format `sk-or-v1-...`).
3. **Wire it into your tools**:
   - **Cline**: Settings -> API Provider -> OpenRouter, paste the key, pick a model (e.g. `anthropic/claude-opus-5`, `deepseek/deepseek-chat`).
   - **Aider / OpenCode / Roo Code**: set `OPENROUTER_API_KEY=sk-or-v1-...` and use the `org/model` model naming.
   - Or point the OpenAI SDK's base URL at OpenRouter as a drop-in replacement.
4. **Track usage**: the Dashboard shows token spend by model and date; set an Org budget to control costs.

## vs API Relay Services and Official Subscriptions

- **vs API relay services**: relay services sell "low-cost mainland access to Claude Code" - cheaper but with variable stability and security; OpenRouter is an official overseas aggregator with full model coverage and reliability, but higher China network/payment friction. See our [AI coding API relay selection guide](/en/compare/api-relay-guide/).
- **vs official subscriptions** (Claude Max / Codex Pro): subscriptions are "fixed monthly fee for a usage cap" - good for daily heavy use; OpenRouter is usage-based, ideal for elastic workloads where a subscription would go underutilized. Comparison context in [Claude Max plan analysis](/en/guides/claude-max-plan-value-analysis/) and [Codex plan analysis](/en/guides/codex-plan-value-analysis/).
- **A hybrid**: daily-driver work on a domestic coding plan (cheap, direct access), cross-model/hard problems on OpenRouter.

## Things to Watch

- **Mainland network**: openrouter.ai and the API endpoint need a stable proxy; confirm your network setup before topping up.
- **Cost control**: usage-based billing means cost scales with usage - set an Org budget and use cheap models for routine tasks.
- **BYOK**: bring your own provider keys (e.g. Anthropic); OpenRouter only routes. BYOK includes a free allowance measured at list-price inference cost.
- **Stripe acquisition**: announced 2026-08-19 - pricing/payment policy may change; check official announcements before any major commitment.

## Sources and Review Dates

- Model counts, payment methods, fees and refund policy, BYOK: OpenRouter official docs & FAQ (openrouter.ai/docs/faq), verified 2026-08-20.
- Tool integration: this site's `data/tools/` (cline / aider / opencode / roo-code compatible_apis).
- Re-verify payment and fee policies quarterly; if you spot stale content, please open an issue on the GitHub repo.
