---
title: "Volcengine Ark Coding Plan Guide: Tiers, Agent Plan Differences, and Setup Notes"
description: "Based on the official Volcengine Ark Agent/Coding Plan export: Coding Plan is a two-tier coding-focused subscription for individual developers, while Agent Plan is the upgraded multimodal + Harness package. Covers the boundary, model/activity changes, Base URL/API key rules, and setup notes for Cline, Claude Code, OpenCode, and Codex CLI."
date: "2026-05-17"
updated_at: "2026-06-27"
article_type: "explainer"
tags: ["ark", "coding-plan", "agent-plan", "bytedance", "api", "cline", "claude-code", "roo-code", "opencode", "trae", "codex-cli"]
faq:
  - q: "Is ¥9.9 the long-term price for Coding Plan Lite?"
    a: |
      No. In the official 2026-06 export, the explicit ¥9.9 / ¥49.9 promotion belongs to **Agent Plan Small / Medium** from 2026-06-08 to 2026-08-08, with at most two discounted months per user before returning to list price.
      Coding Plan is still a separate two-tier coding package. Check the Coding Plan console or campaign page for live pricing, stock, and benefits.
  - q: "What is the main difference between Coding Plan and Agent Plan?"
    a: |
      Coding Plan targets coding workloads for individual developers, covering language and embedding models and described through estimated model calls. Agent Plan is the upgraded package with visual/audio models, Doubao Search, Volcengine Supabase, Agent memory, and AFP-based deduction.
  - q: "Should I buy Coding Plan or Agent Plan?"
    a: |
      If you mainly use Cline, Claude Code, OpenCode, or Codex CLI for text coding, start with Coding Plan. If you need image/video generation, audio, search, memory, or Supabase Harness, evaluate Agent Plan instead. Small is only for lightweight trials; official guidance recommends Medium or above for video generation.
  - q: "Which model changes matter now?"
    a: |
      The official June campaign lists `deepseek-v4-pro`, `kimi-k2.6`, `kimi-k2.7-code`, and `glm-5.2 (glm-latest)` for Agent/Coding Plan personal editions. `glm-5.1` is marked as retiring, with `glm-5.2` recommended.
      Actual available models, deduction coefficients, and context windows should be checked in the console.
  - q: "What is the easiest setup mistake?"
    a: |
      Mixing Base URLs and API keys across plan types. Agent Plan uses `/api/plan` for Anthropic-compatible tools and `/api/plan/v3` for OpenAI-compatible tools. Coding Plan should use the dedicated Base URL and Ark API key from the Coding Plan console.
pillar: plans
content_status: keep
locale_strategy: mirrored
---

Volcengine Ark Coding Plan is ByteDance's AI coding model subscription for individual developers. Based on the official exported document, **Coding Plan and Agent Plan now have clearly different product boundaries**. Coding Plan remains coding-focused; Agent Plan is the upgraded multimodal and Harness-oriented package.

That means pricing such as "Lite ¥9.9 / Pro ¥49.9" should be checked against the plan it belongs to. In this export, the explicit ¥9.9 / ¥49.9 campaign is for **Agent Plan Small / Medium**, not a fixed Coding Plan Lite/Pro price.

## Quick Take

| Need | Pick |
|---|---|
| Cline / Claude Code / OpenCode / Codex CLI for text coding | **Coding Plan** |
| Simpler quota mental model based on estimated calls | **Coding Plan** |
| Image, video, or audio generation inside coding tools | **Agent Plan** |
| Doubao Search, Agent memory, Volcengine Supabase Harness | **Agent Plan** |
| You see ¥9.9 / ¥49.9 promo pricing | Confirm whether it is **Agent Plan Small / Medium** first |

## Coding Plan vs Agent Plan

| Dimension | Coding Plan | Agent Plan |
|---|---|---|
| Positioning | Coding model service package for individual developers | Upgraded package for Agent, multimodal, and Harness workflows |
| Model scope | Language and embedding models | Language, embedding, visual, and audio models |
| Harness | None | Doubao Search, Volcengine Supabase, Agent memory |
| Tiers | 2 tiers | Small / Medium / Large / Max |
| Usage model | Estimated model calls | AFP (Agent Fuel Point) deduction |
| Base URL / API Key | Dedicated Base URL and Ark API key from the Coding Plan console | Dedicated Base URL and dedicated API key from the Agent Plan console |

Do not mix credentials across plan types. The official export repeatedly notes that Agent Plan's dedicated Base URL/API key should not be mixed with Coding Plan keys, and the same principle applies in reverse.

## Check Which Plan the ¥9.9 / ¥49.9 Promo Belongs To

The official campaign page states:

| Campaign | Dates | Tier | List price | Promo | Rule |
|---|---|---|---|---|---|
| Agent Plan Small & Medium 2.5x discount | 2026-06-08 to 2026-08-08 | Small | ¥40 | ¥9.9 | Up to first two months per user, then list price |
| Agent Plan Small & Medium 2.5x discount | 2026-06-08 to 2026-08-08 | Medium | ¥200 | ¥49.9 | New purchase, renewal, and upgrade share the same promo eligibility |

So, in this official export, **¥9.9 / ¥49.9 is Agent Plan campaign pricing**. If you are buying Coding Plan, verify live price, stock, and benefits on the Coding Plan page or console.

## Current Model Notes

The June 2026 campaign says Agent/Coding Plan personal users get temporary deduction discounts from 2026-06-10 18:00:00 to 2026-06-30 23:59:59:

| Model | Official note |
|---|---|
| `deepseek-v4-pro` | 4x discount on deduction coefficient; quota effectively ~250% of normal |
| `kimi-k2.6` | 4x discount on deduction coefficient; quota effectively ~250% of normal |
| `kimi-k2.7-code` | 4x discount on deduction coefficient; quota effectively ~250% of normal |
| `glm-5.2 (glm-latest)` | New model, 2.5x discount; quota effectively ~400% of normal |

Two caveats:

- `glm-5.1` is marked as retiring; switch to `glm-5.2`
- After the campaign, model deduction coefficients return to normal rules; always check the console

## Compatible Clients

The official export covers Claude Code, OpenCode, OpenClaw, Hermes Agent, TRAE, OpenViking, and "other tools" such as Cursor, Roo Code, Kilo Code, and Codex CLI through OpenAI-compatible configuration.

For Coding Plan users, the key checks are:

- Use the dedicated Base URL from the **Coding Plan console**
- Use the API key for the same plan type
- Pick a model currently enabled for your plan
- Confirm whether the client uses Anthropic-compatible or OpenAI-compatible protocol

## Setup: Cline + Ark

Cline uses OpenAI Compatible configuration. Older Coding Plan setups commonly look like this, but after subscribing you should copy the console-provided dedicated URL first:

```text
API Provider: OpenAI Compatible
Base URL: https://ark.cn-beijing.volces.com/api/coding/v3
API Key: your Ark API key
Model: ark-code-latest or a specific enabled model
```

If you bought Agent Plan instead, use the Agent Plan OpenAI-compatible endpoint:

```text
Base URL: https://ark.cn-beijing.volces.com/api/plan/v3
API Key: Agent Plan dedicated API key
Model: ark-code-latest or a supported model for your tier
```

See our [Cline + Ark plan](/en/plan/cline-ark).

## Setup: Claude Code + Ark

Claude Code uses the Anthropic-compatible path. Older Coding Plan setups commonly use:

```bash
export ANTHROPIC_BASE_URL="https://ark.cn-beijing.volces.com/api/coding"
export ANTHROPIC_AUTH_TOKEN="your-ark-api-key"
export ANTHROPIC_MODEL="ark-code-latest"
claude
```

If you bought Agent Plan, the official export gives:

```bash
export ANTHROPIC_BASE_URL="https://ark.cn-beijing.volces.com/api/plan"
export ANTHROPIC_AUTH_TOKEN="your-agent-plan-dedicated-api-key"
export ANTHROPIC_MODEL="ark-code-latest"
claude
```

Rule of thumb: use the Base URL and API key from the console for the plan you actually bought.

## Cost Tips

1. **Confirm plan type first**: pure coding usually points to Coding Plan; multimodal/Harness points to Agent Plan
2. **Treat ¥9.9 as campaign pricing**: in this export it is Agent Plan Small's first-two-month campaign, not long-term Coding Plan pricing
3. **Start with `ark-code-latest`**: let Ark route based on current activation, then manually switch if needed
4. **Review real usage before renewing**: Coding Plan uses call estimates; Agent Plan uses AFP with 5-hour, weekly, and monthly limits
5. **Do not mix keys and Base URLs**: mixing may fail to deduct package quota or trigger extra billing

## Ark vs Bailian

| Dimension | Ark Coding Plan | Bailian Coding Plan |
|---|---|---|
| Positioning | China-native coding API package | Qwen-centric coding API package |
| Tiering | Official export describes two tiers | Check official live page |
| Model route | Doubao / DeepSeek / Kimi / GLM mix, console-dependent | Qwen-first, with other models depending on console |
| Usage model | Estimated model calls | Monthly quota / calls |
| Domestic access | Direct China access | Direct China access |

Full comparison: [Bailian vs Ark Coding Plan](/en/compare/bailian-coding-plan-vs-ark-coding-plan).

## Who It's For

- Developers in China who mainly need coding through Cline, Claude Code, OpenCode, or Codex CLI
- People who do not need multimodal generation or Harness tools
- Users comfortable configuring OpenAI-compatible or Anthropic-compatible endpoints
- Not for anyone assuming ¥9.9 is a permanent Coding Plan price
- Not for users who need image/video/audio/search/memory/Supabase; evaluate Agent Plan instead

## Related Articles

- [Ark Agent Plan Guide](/en/guides/ark-agent-plan/)
- [Coding Plan vs Agent Plan vs Token Plan](/en/compare/coding-plan-vs-agent-plan-vs-token-plan/)
- [Bailian vs Ark Coding Plan Comparison](/en/compare/bailian-coding-plan-vs-ark-coding-plan)
- [Cline + Ark Plan](/en/plan/cline-ark)
- [Cline + Ark Setup Guide](/en/guides/cline-ark-setup)
- [Bailian Coding Plan Guide](/en/guides/bailian-coding-plan)

> Data source: user-provided Volcengine Ark official PDF export, "Agent/Coding Plan subscription" (verified 2026-06-27). Pricing, campaigns, models, Base URLs, and API keys are subject to the live Volcengine Ark site and console.
