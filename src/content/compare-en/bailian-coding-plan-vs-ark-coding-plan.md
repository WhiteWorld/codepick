---
title: "Bailian Coding Plan vs Volcengine Ark Coding Plan: 2026 Deep Comparison"
description: "A comprehensive comparison of Alibaba Cloud Bailian and Volcengine Ark — two major China-native AI coding API plans: pricing, quota mechanisms, model ecosystems, client compatibility, and selection advice."
date: "2026-02-26"
updated_at: "2026-10-22"
tags: ["bailian", "volcengine-ark", "coding-plan", "china", "comparison", "api"]
pillar: compare
content_status: keep
locale_strategy: mirrored
draft: false
---

Bailian Coding Plan (by Alibaba Cloud) and Volcengine Ark Coding Plan (by ByteDance) are currently the two leading China-native AI coding API subscription plans, both offering developers subscription-based coding-specific request quotas. The two are similarly positioned and priced, but differ in quota mechanisms, model ecosystems, and client support.

## One-Line Summary

- **Bailian Coding Plan**: Slightly cheaper, the most complete Qwen model ecosystem — ideal for heavy users of Qwen-series models
- **Volcengine Ark Coding Plan**: Flexible Auto mode, native Anthropic protocol support — ideal for Claude Code users and multi-client setups

---

## Pricing Comparison

| Plan | Bailian Lite | Bailian Pro | Ark Lite | Ark Pro |
|------|-------------|-------------|----------|---------|
| Current new-purchase note | Lite no longer sold | Check official site | Official promo | Official promo |
| Pricing policy | Check official site | Check official site | Check official site | Check official site |

Historically the two platforms had similar regular price ladders, but their promo strategies now change quickly. Bailian no longer sells Lite to new users, and Ark's entry windows and promo pricing should also be verified on the official site.

---

## Quota Mechanism Comparison

This is the **most critical difference** between the two:

| Dimension | Bailian | Volcengine Ark |
|-----------|---------|----------------|
| Lite Quota | 18,000 requests/month | ~1,200 requests/5 hours |
| Pro Quota | 90,000 requests/month | ~6,000 requests/5 hours |
| Quota Cycle | Calendar month | Rolling 5-hour window |
| When Exhausted | Service stops; no pay-as-you-go fallback | Service stops until the window resets |

**Bailian** uses a monthly total quota, allowing burst usage — ideal for scenarios with occasional high-intensity calls (e.g., late-night intensive coding sessions).
**Ark** uses a rolling 5-hour sliding window rate limit, making it smoother for steady long-term daily use, but heavy short-burst usage can hit the ceiling quickly. The plan overview opened on 2026-10-22 also names a weekly limit and a monthly limit. The 1,200 / 6,000 request figures were not on the pages opened that day. The table above is still the older record.

---

## Model Ecosystem Comparison

### Bailian Supported Models (8)

| Model | Highlights |
|-------|-----------|
| qwen3.5-plus | Qwen flagship general-purpose model |
| qwen3-max-2026-01-23 | Qwen flagship Max |
| qwen3-coder-next | Qwen coding-specific flagship |
| qwen3-coder-plus | Qwen coding enhanced edition |
| MiniMax-M2.5 | MiniMax coding model |
| GLM-5 | Zhipu's latest flagship |
| GLM-4.7 | Zhipu coding-optimized version |
| Kimi-K2.5 | Moonshot coding model |

### Ark supported models

The five-model table that used to sit here is not a current list. The deprecation page opened on 2026-10-22 puts `doubao-seed-code`, `glm-4.7`, `deepseek-v3.2`, `kimi-k2-thinking`, and `kimi-k2.5` on the already-offline table.

The get-started page opened the same day allows these Model Names in a config file: `doubao-seed-evolving`, `doubao-seed-2.1-pro`, `doubao-seed-2.1-lite`, `doubao-seed-2.0-mini`, `glm-5.3` (`glm-latest`), `glm-5.3-flash`, `deepseek-v4.1-flash`, `deepseek-v4.1-flash-economy`, `deepseek-v4-flash`, `deepseek-v4-pro`, `kimi-k2.8-preview`, `kimi-k3`.

The plan overview also still lists `minimax-m3` and `kimi-k2.7-code`, marked as retiring. Shutdown is 2026-11-02 14:00:00 (UTC+8) and 2026-10-28 14:00:00 (UTC+8). Those two IDs are not on the get-started config list.

Bailian's eight models above were not rechecked. Bailian's pages were not reopened. "8 vs 5" is not a current conclusion. Ark migration notes are in the [guide](/en/guides/ark-coding-plan-guide/).

---

## Auto Mode

| Feature | Bailian | Volcengine Ark |
|---------|---------|----------------|
| Auto Mode | Not supported | Supported |

The plan overview opened on 2026-10-22 still lists Auto as the default and says it matches on effect and speed. The discount page says Auto's deduction coefficient on Coding Plan is 1 through 2026-11-08 23:59:59, that it can route to `kimi-k3`, and that the share rises sharply from 00:00 to 8:00 at night. That night window has no timezone on the page. "Lightweight models for simple tasks" is not a sentence from that page. Whether Bailian still has no Auto mode was not rechecked. Bailian's pages were not reopened.

---

## API Protocol & Client Compatibility

| Dimension | Bailian | Volcengine Ark |
|-----------|---------|----------------|
| API Protocol | OpenAI-compatible | OpenAI + Anthropic dual protocol |
| Supported Clients | 7 | 11 |

### Bailian Supported Clients

Claude Code, Cline, OpenClaw, Qwen Code, Cursor, OpenCode, Aider

### Ark Supported Clients

Claude Code, Cursor, Cline, Codex CLI, Kilo Code, Roo Code, OpenCode, Trae, Aider, OpenClaw, Moltbot

Ark additionally supports the Anthropic protocol, allowing Claude Code to connect using the **native Anthropic API format** directly without extra adapters. It also supports more terminal tools (Codex CLI, Kilo Code, Roo Code, Trae, Moltbot).

---

## Account Restrictions

| Restriction | Bailian | Volcengine Ark |
|-------------|---------|----------------|
| Multiple concurrent subscriptions | No (one plan only) | Yes (stackable) |
| Sub-account subscriptions | No (primary account only) | Yes |
| Referral rewards | Not explicitly offered | 10% discount for friend referrals |

---

## Overall Ratings

| Dimension | Bailian | Volcengine Ark |
|-----------|---------|----------------|
| Coding Ability | 8.5/10 | 8.0/10 |
| Cost Efficiency | 9.5/10 | 9.5/10 |
| Flexibility | 8.5/10 | 8.5/10 |
| China Accessibility | 9.5/10 | 9.8/10 |
| Privacy | 7.0/10 | 7.0/10 |

---

## Selection Advice

**Choose Bailian Coding Plan if you:**
- Prefer Qwen-series models (qwen3-coder-next / qwen3.5-plus)
- Need occasional high-intensity burst usage (the monthly total quota mechanism is more forgiving)
- Prefer monthly-total quotas and can accept Pro-only availability for new purchases
- Are already in the Alibaba Cloud ecosystem (RAM primary account)

**Choose Volcengine Ark Coding Plan if you:**
- Use Claude Code as your primary tool (native Anthropic protocol support)
- Want Auto mode to let the AI select the best model automatically
- Use multiple clients (Roo Code, Kilo Code, Trae, etc.)
- Need sub-account management or team sharing

---

## Related Plans

Both platforms have ready-to-use configuration plans:

- [Cline + Bailian Coding Plan](/plan/cline-bailian): The fastest way to get started with the Bailian ecosystem — current new-purchase policy on the official site
- [Cline + Ark Coding Plan](/plan/cline-ark): A high-value plan in the Ark ecosystem — promo pricing and entry windows vary by official site
- [OpenCode + Bailian Coding Plan](/plan/opencode-bailian): Top pick for terminal developers
- [OpenCode + Ark Coding Plan](/plan/opencode-ark): A terminal plan with Auto mode support

> Data based on February 2026 evaluation. Plan contents and promotions are subject to change at any time — please refer to the official websites for the latest information.
> Bailian: [Official site](https://www.aliyun.com/benefit/scene/codingplan) | Ark: [Official site](https://www.volcengine.com/activity/codingplan)
