---
title: "Volcengine Ark Coding Plan Guide: Tiers, Agent Plan Differences, and Setup Notes"
description: "Based on the official Volcengine Ark Agent/Coding Plan export: Coding Plan is a two-tier coding-focused subscription for individual developers, while Agent Plan is the upgraded multimodal + Harness package. Covers the boundary, model/activity changes, Base URL/API key rules, and setup notes for Cline, Claude Code, OpenCode, and Codex CLI."
date: "2026-05-17"
updated_at: "2026-10-22"
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
      The deprecation page opened on 2026-10-22 lists two shutdowns that have not arrived yet. `minimax-m3` stops at 2026-11-02 14:00:00 (UTC+8). The page suggests `doubao-seed-evolving` or `kimi-k3`. `kimi-k2.7-code` stops at 2026-10-28 14:00:00 (UTC+8). The page suggests `kimi-k3`. Both rows stop new users at 10:00:00 (UTC+8) on the day the retirement starts. A new user is someone who bought Coding Plan and has not used that model.
      The get-started page opened the same day does not include those two IDs in the Model Name list you can write into a config file. `deepseek-v4.1-flash-economy` was added on 2026-10-20. The feature-release page says the deduction coefficient is 50% through 2026-12-30 23:59:59. That line does not name a timezone.
      `kimi-k2.6`, `glm-5.2`, and `glm-5.1` from the June campaign are on the already-offline table. Do not follow the June instruction to switch to `glm-5.2`. The console was not opened.
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

## Models on the pages opened 2026-10-22

Pages opened: feature release, model deprecation, plan overview, get started, model release, and the deduction-coefficient campaign. The pricing campaign page was not opened. The console was not opened. If a page does not say it, this section says unknown.

### Two shutdown deadlines

The plan overview still lists both models and marks them as retiring. Times below are from the deprecation page.

| Model | New users stopped | Service shutdown | Suggested move |
|---|---|---|---|
| `minimax-m3` | 2026-10-19 10:00:00 (UTC+8) | 2026-11-02 14:00:00 (UTC+8) | `doubao-seed-evolving` or `kimi-k3` |
| `kimi-k2.7-code` | 2026-10-13 10:00:00 (UTC+8) | 2026-10-28 14:00:00 (UTC+8) | `kimi-k3` |

The page defines a new user as someone who bought the plan and has not used that model. People who already used it can keep calling it until shutdown. The page says an unmigrated setup will affect your work. It does not say the ID is rewritten for you.

The get-started Model Name list omits both IDs. The overview table still has them. Both pages were open the same day. Whether the console dropdown still shows them is unknown.

### `deepseek-v4.1-flash-economy`

The 10.20 model-release note says it uses the same weights as the standard model, with the same capability, slower generation, and multimodal input. The feature-release page says the deduction coefficient is 50% through 2026-12-30 23:59:59. The overview and the discount page say 2026-10-20 00:00:00 through 2026-12-30 23:59:59, at 50% of the existing coefficient. None of the three names a timezone.

The discount page also says usable quota is 200% of the previous amount. The release note's "lower price" and this 50% coefficient are not tied together on the page. Whether they are the same offer is unknown.

The overview lists this model's context as 1049k and max output as 384k. Another note on the same page groups it with models that support a 1M window. Whether 1049k is a typo is unknown. Whether this is DeepSeek's 1017 snapshot is not on these pages. Unknown.

### latest aliases still point at the old IDs

The latest-alias tables on both the deprecation page and the model-release page still say `minimax-latest` → `minimax-m3` and `kimi-latest` → `kimi-k2.7-code`. That is not the same sentence as the migration advice above.

`deepseek-latest` disagrees across those two pages. The deprecation page says `deepseek-v4.1-flash`. The model-release page says `deepseek-v4-pro`. Which page wins is unknown.

The get-started list includes `glm-5.3` (`glm-latest`). It does not list `kimi-latest`, `minimax-latest`, or `deepseek-latest`.

If the config file names a specific Model Name, change it before shutdown. `ark-code-latest` is still the console switch. Get started says a console switch takes 3–5 minutes. Auto cannot be written as a Model Name.

### Discount dates that do not match

These are recorded as conflicts. This guide does not pick a winner.

- `deepseek-v4.1-flash` at 50% of the existing deduction coefficient: the 09.23 feature-release row ends at 2026-10-30 18:00:00. The overview says 2026-09-23 00:00:00 through 2026-12-30 23:59:59. The discount page's activity window says 2026-09-15 00:00:00 through 2026-12-30 23:59:59, status in progress, quota 200% of the previous amount. Which end date applies is unknown.
- `kimi-k2.8-preview`: the overview and the discount page both say the usable amount matches the Agent Plan period when the deduction coefficient was 60%, and both end on 2026-12-14 23:59:59. The start differs by one day: 09-18 on the overview, 09-17 on the discount page.
- `kimi-k3`: the overview says the deduction coefficient is high, recommends Pro only, and says thinking cannot be turned off. The discount page has a separate window through 2026-10-25 23:59:59, with usable amount matching the Agent Plan period when the deduction coefficient was 50%. The overview's campaign notes do not list that window.
- Auto: the overview and the discount page both say 2026-06-10 18:00:00 through 2026-11-08 23:59:59, with deduction coefficient 1 on Coding Plan. The discount page adds that Auto can route to `kimi-k3`, and that the share rises sharply from 00:00 to 8:00 at night. The timezone of that night window is not stated.

The June export's discounts for `deepseek-v4-pro`, `kimi-k2.6`, `kimi-k2.7-code`, and `glm-5.2` are marked ended on the discount page. `kimi-k2.6`, `glm-5.2`, and `glm-5.1` are on the already-offline table. That old 40% / 25% table is not a current rule. The old export and the current discount table do not line up cell by cell, so the coefficients are not repeated here.

### Model Names the get-started page allows in a config file

`doubao-seed-evolving`, `doubao-seed-2.1-pro`, `doubao-seed-2.1-lite`, `doubao-seed-2.0-mini`, `glm-5.3` (`glm-latest`), `glm-5.3-flash`, `deepseek-v4.1-flash`, `deepseek-v4.1-flash-economy`, `deepseek-v4-flash`, `deepseek-v4-pro`, `kimi-k2.8-preview`, `kimi-k3`.

Lowercase is accepted. You can also paste the display name from the subscription console. Regional availability follows the console. The console was not opened.

The overview intro names `doubao-embedding-vision`. It is not in the model table, not in the list above, and not on the already-offline table. Whether it can still be selected is unknown.

## Compatible Clients

The plan overview and get-started pages opened on 2026-10-22 list Claude Code, TraeCode, Roo Code, Codex CLI, OpenCode, Cline, Kilo Code, OpenClaw, Cursor, and Hermes Agent. OpenViking is not on that list. Whether it still connects is unknown. The June export did name OpenViking.

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
3. **Read the model name in your config first**: `kimi-k2.7-code` and `minimax-m3` have shutdown times, in the section above. The docs still map `kimi-latest` and `minimax-latest` to those IDs. `ark-code-latest` switches the model in the console. It does not rewrite an ID you pinned.
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

> Models and shutdowns: Volcengine Ark docs opened on 2026-10-22 (feature release, model deprecation, plan overview, get started, model release, deduction-coefficient campaign). Which plan the CNY 9.9 / 49.9 promo belongs to is still from the official export checked on 2026-06-27. The pricing page was not reopened. The console was not opened.
