---
title: "How to choose a Gemini 4 model: Carbon, Neon, Hydrogen, and Argon"
description: "A guide to the four official Gemini 4 models—access, pricing, context, and fit—plus a comparison with Gemini 3.8 Flash, Claude Sonnet 5.5, and GPT-6.2 Sol. This article did not make paid API calls or run speed or coding benchmarks."
date: "2026-11-19"
article_type: explainer
tags: [gemini, gemini-4, model-comparison, api, pricing]
pillar: compare
content_status: keep
locale_strategy: mirrored
draft: false
---

> Checked on November 19, 2026 (Asia/Shanghai), against Google's official blogs, the [Gemini API models page](https://aistudio.google.com/docs/models), [Latest Gemini models](https://aistudio.google.com/docs/latest-model), [developer pricing](https://aistudio.google.com/docs/pricing), [rate limits](https://aistudio.google.com/docs/rate-limits), the [Gemini subscriptions page](https://gemini.google/subscriptions/), and the [Google AI plans page](https://one.google.com/about/google-ai-plans/). For peer models, we also opened Anthropic's [Claude pricing](https://platform.claude.com/docs/en/about-claude/pricing) and [Sonnet 5.5 overview](https://platform.claude.com/docs/en/models/sonnet-5-5/overview), plus OpenAI's [API pricing](https://developers.openai.com/api/docs/pricing) and [GPT-6.2 Sol page](https://developers.openai.com/api/docs/models/gpt-6.2-sol). This article only organizes public pages. It did not call the Gemini, Claude, or OpenAI APIs, did not use any API keys, and did not independently measure speed, coding quality, or cost.

Gemini 4 is not a single model. It is a family of models with official API IDs already published in Google's documentation. Which one to use depends on the difficulty of the work and on how you pay: API usage is billed per token and is not the same bill as a Google AI subscription.

For plan and model access inside Antigravity, see the [Antigravity tool page](/en/tool/antigravity/) and [Antigravity vs Cursor](/en/compare/antigravity-vs-cursor/). When replacing older model IDs, see the [model deprecation checklist](/en/guides/model-deprecation-checklist/).

## Choose by the work you have

The official [Latest Gemini models](https://aistudio.google.com/docs/latest-model) page says to start with `gemini-4-hydrogen` for everyday coding, agentic workflows, and multimodal knowledge work, and to use `gemini-4-carbon` or `gemini-4-neon` when you need deeper frontier reasoning. Hydrogen's "what's new" guide also presents it as the recommended upgrade from Gemini 3.8 Flash and earlier Gemini 3 and 2.5 models.

A practical reading of the four official IDs:

| The problem you need to solve | Start here | Why (official wording, not our measurements) |
| --- | --- | --- |
| Everyday coding, tool-using agents, a free API tier, or a lower unit price | Gemini 4 Hydrogen | Docs call it the default general-purpose model. It has a free tier, the lowest paid list price in the family, and the official speed label Fast. |
| Complex engineering, knowledge work, or science, where you want strong results and faster completion | Gemini 4 Neon | Positioned as frontier-level intelligence with faster end-to-end task completion. The official speed label is Moderate. The default thinking level is `high`, and `xhigh` is also available. |
| The hardest architecture, root-cause debugging, scientific proofs, or security review | Gemini 4 Carbon | Docs call it the strongest reasoning model. The official speed label is Deliberate. The default thinking level is `medium`. Google says it spends more thinking tokens per turn. |
| Frontier reasoning, but with less token spend and lower latency per turn than Carbon | Gemini 4 Argon | Docs call it the efficient frontier reasoning model. The default thinking level is `medium`; official Argon docs do not list `xhigh`. Consumer plan pages are covered separately below. |

Fast, Moderate, and Deliberate are official speed labels on the Latest models page, not latencies we measured.

## Official names and release dates

Use the official IDs. Do not refer to the family as if it were one model.

| Display name | Model ID | Official blog timeline (all 2026; the posts do not state a timezone) |
| --- | --- | --- |
| Gemini 4 Argon | `gemini-4-argon` | Announced on September 30; [opened on October 13](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-argon/) for developers and enterprises via the API, for Ultra subscribers in Antigravity, and for Pro and Ultra subscribers in the Gemini app and AI Mode in Search |
| Gemini 4 Carbon | `gemini-4-carbon` | Announced on October 28; [opened to paying developers, enterprises, and Ultra users on November 10](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/) |
| Gemini 4 Hydrogen | `gemini-4-hydrogen` | [Announced on November 12](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/) for broader developer, enterprise, and consumer surfaces |
| Gemini 4 Neon | `gemini-4-neon` | [Announced on November 18](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/) |

All four IDs remain on the [models catalog](https://aistudio.google.com/docs/models) and the pricing page. On November 19, 2026, the [Latest Gemini models](https://aistudio.google.com/docs/latest-model) highlight cards featured Carbon, Neon, Hydrogen, and high-throughput Gemini 3.5 Flash-Lite. Argon was not in that highlight set, but it has not been removed from the catalog or the price list.

Carbon's November 10 availability post still described Argon as the better default for most software engineering and knowledge work, with Carbon reserved for harder tasks. That wording is not identical to later pages that treat Hydrogen as the default general-purpose model and Neon and Carbon as the flagship reasoning options. This article follows the Latest models page and the per-model guides that were still online on November 19. It does not treat one official page as quietly retiring another.

## How the specs compare

The four Gemini 4 models share many capabilities. The meaningful differences are positioning, thinking levels, price, and access.

| Item | Carbon | Neon | Hydrogen | Argon |
| --- | --- | --- | --- | --- |
| Model ID | `gemini-4-carbon` | `gemini-4-neon` | `gemini-4-hydrogen` | `gemini-4-argon` |
| Context | Unified 1,048,576-token window | Same | Same | Same |
| Default max output | 65,536; long decode can use the remaining window, up to 1,048,576 | Same | Same | Same |
| Input modalities | Text, image, audio, video, PDF | Same | Same | Same |
| Output modality | Text | Text | Text | Text |
| Thinking levels | `low`, `medium` (default), `high` | `low`, `medium`, `high` (default), `xhigh` | `low`, `medium`, `high` (default), `xhigh` | `low`, `medium` (default), `high` |
| Official speed label | Deliberate | Moderate | Fast | Not listed on the Latest models highlight cards; Argon's guide says it is faster and uses fewer tokens per turn than Carbon |
| Developer API free tier | No | No | Yes, rate-limited | No |
| Paid input / output (per 1M tokens, USD) | $2 / $10 through 2026-11-30; $4 / $20 from 2026-12-01 | $3 / $15 | $1.50 / $7.50 | Same introductory and later prices as Carbon |
| Implicit cached input | $0.10 through 2026-11-30; $0.20 after that | $0.15 | $0.075 | Same as Carbon |

Terms worth unpacking:

- **Token:** The unit used for context and billing. It is not the same as a Chinese character or an English word. The same text can tokenize differently on different models.
- **Unified window:** Input, thinking, and output share 1,048,576 tokens. This is not "1M input plus another 1M output."
- **Long decode:** Model pages list a default single-response cap of 65,536 tokens, including thinking. For longer results, raise `max_output_tokens` above 65,536 and use background execution or foreground continuation; the total can use the remaining window. A hop is the chunk written in one request, not the total cap. Per the Output limits table in [Long decode](https://aistudio.google.com/docs/long-decode): background execution uses internal hops of up to 65,536 tokens. Streaming hops stay at 65,536 even if automatic continuation is off or you use REST. The 32,768 limit applies only to foreground non-streaming hops when automatic continuation is off or you use REST (the table row with `background: false` and `max_output_tokens` greater than 65,536). In that case Carbon and Argon are limited to 32,768 tokens per hop; Hydrogen and Neon remain at 65,536. The official SDK defaults to `automatic_continuation: true` and continues for you; with REST, or when automatic continuation is off, loop with `continuation_token`. The [Hydrogen what's-new guide](https://aistudio.google.com/docs/whats-new-gemini-4-hydrogen) describes Carbon and Argon's 32,768 cap only as a non-streaming REST hop, and does not mention streaming. Do not read 32,768 as the total output limit.
- **Thinking level:** This controls how much internal reasoning the model does. Thinking tokens are billed as output. Higher levels usually cost more and take longer, but this article did not measure that relationship.

All four models support code execution, function calling, computer use, structured outputs, Grounding with Google Search and Maps, and URL context. Official model pages say they do not support image generation, audio generation, or the Live API. Image, speech, or realtime voice work belongs on other specialized models in the catalog, not on these four text-reasoning models.

As of June 2026, Google documents the Interactions API as the default interface. `generateContent` still works, but is described as legacy. New projects should follow the current docs; this article does not walk through migration.

## API pricing: units, the December change, and easy-to-miss charges

The figures below are paid-tier prices from the [Gemini Developer API pricing page](https://aistudio.google.com/docs/pricing), in USD per 1 million tokens. They are not Google AI monthly subscription prices.

The pricing page also states these boundaries:

- **Thinking and tool instructions are billed.** Every token the model processes counts, including thinking tokens and the internal tool system instructions and function declarations used with grounding.
- **Gemini 4 lists implicit caching only.** Cache hits are billed at a 95% discount off the corresponding input price. Official docs say these models do not support explicit caching (`cachedContents` / `caches.create`). The Gemini 4 price tables do not add an hourly cache storage line.
- **Paid list prices are flat across the 1M window.** Hydrogen's guide says standard paid pricing is flat across the full 1 million-token context window. The Carbon, Neon, and Argon tables also do not add a higher prompt-length tier. That differs from [Gemini 3.1 Pro Preview](https://aistudio.google.com/docs/pricing), which still prices prompts above 200k tokens separately.
- **The Batch API is documented as a 50% cost reduction.** All four models support Batch. The rate-limits page caps enqueued batch tokens at 5,000,000 for Carbon, Argon, and Neon, and 3,000,000 for Hydrogen.
- **Search grounding is billed separately.** Gemini 3 and newer models share 5,000 free search requests per month, then $14 per 1,000 requests, with a default developer-API cap of 1,500 requests per project per day. One user request can trigger multiple searches, and you are charged for each search.
- **Free-tier content may be used to improve products; paid-tier content is not.** That line appears in the pricing tables. Hydrogen and Gemini 3.8 Flash have a free tier; Carbon, Neon, and Argon do not.

The introductory price for Carbon and Argon runs through November 30, 2026, and becomes $4 / $20 on December 1, 2026. The official pages do not state a timezone for that cutoff, and this article does not invent a Beijing-time minute. Carbon's availability post also says the later price applies to the Carbon model intended for public access.

The model pages list Flex inference and Priority inference as supported. This article does not quote dollar multipliers for those tiers, because the main pricing tables opened for this check did not provide a complete, citable multiplier. The rate-limits page only states that Priority defaults to 0.3× the standard limit for each model and tier.

Standard interactive RPM and TPM values, according to the official rate-limits page, are the ones shown for your project in Google AI Studio and change with usage tier. The page opened for this article does not publish a fixed RPM / TPM table for the four Gemini 4 models. It does publish spend-based limits on a rolling 10-minute window ($10 for paid Tier 1, $200 for Tiers 2 and 3) and the Batch enqueued-token caps above.

This check used public Gemini Developer API (Google AI Studio) pages. It did not open Vertex AI price lists, so the same unit prices should not be treated as confirmed on Google Cloud.

## Consumer subscriptions are a separate bill

API usage is billed per token. The Gemini app, AI Mode in Search, and Antigravity use Google AI plans and usage limits. You cannot convert $1.50 / $7.50 into "how many chat turns a month includes."

The US official plan and subscription pages opened on November 19, 2026 can be summarized as follows:

| Plan (US official list price) | Monthly price | Gemini 4 models named on the plan pages | Public usage notes |
| --- | --- | --- | --- |
| Free (Google Account) | $0 | Includes Gemini 4 Hydrogen | Hydrogen's announcement says free users get it through auto model selection when the product considers it appropriate. Do not assume the free tier includes a full manual model picker. |
| Google AI Plus | $4.99 | Gemini 4 Hydrogen | Usage limits are 2× the Free plan. |
| Google AI Pro | $19.99 | Gemini app: Neon and Hydrogen. The plan pages also say Carbon is available in AI Mode in Search in select countries, at a lower allowance than Ultra | Usage limits are 4× the Free plan. The subscriptions page includes Google Antigravity. |
| Google AI Ultra 5x / 20x | $99.99 / $199.99 | Highest access to Gemini 4 Carbon, Neon, and Hydrogen, including a higher Carbon allowance in AI Mode in Search than Pro | Usage limits are 5× or 20× the Pro plan. Antigravity agent rate limits are also split between 5x and 20x. |

The dollar prices come from the comparison table on the [Google AI plans page](https://one.google.com/about/google-ai-plans/). The Ultra prices of $99.99 and $199.99 also appear on the [subscriptions page](https://gemini.google/subscriptions/). Official pages say availability varies by country and that age and other restrictions apply. This article did not check other regional price lists, and it does not treat older figures such as $20 or $249.99 as current prices.

The subscriptions footnote for Gemini app usage says limits factor in prompt complexity, the features you use, and conversation length; they refresh every 5 hours until you reach a weekly limit; and you can extend them with AI credits. The page does not publish a fixed "requests per day" number. Footnote 4 on the [plans page](https://one.google.com/about/google-ai-plans/) and the [subscriptions page](https://gemini.google/subscriptions/) says Gemini 4 Carbon and Nano Banana Pro in AI Mode in Search are available in select countries. In the plan copy, Pro is described as getting access to Carbon in AI Mode, and Ultra as getting higher access. Do not treat Pro's Carbon access as the same allowance as Ultra, and do not assume Carbon in AI Mode is available in every country.

On Argon: the [October 13 availability post](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-argon/) split the surfaces. Developers and enterprises used the API; Google Antigravity was listed for Google AI Ultra subscribers; the Gemini app and AI Mode in Search were listed for Google AI Pro and Ultra subscribers. Do not read that Antigravity access as including Pro. The subscription and plan pages opened on November 19, 2026 name Hydrogen, Neon, and Carbon in current plan benefits, and they do not list Argon. This article did not open a signed-in app or Antigravity model picker, so it does not decide whether Argon still appears in some account's dropdown. For consumer access, use the current plan pages and the models actually shown in the product. For API access, `gemini-4-argon` remains a paid model on the pricing page.

## What changed versus the previous Gemini generation

Google still describes [Gemini 3.8 Flash](https://aistudio.google.com/docs/models/gemini-3.8-flash) (`gemini-3.8-flash`) as the previous-generation Flash model for software engineering, autonomous agents, and complex enterprise workflows. Hydrogen's guide uses it as the main everyday upgrade comparison.

The important difference is not "whether there is a 1M context." It is how that window is shared, how long a single response can be, and the paid unit price:

| Item | Gemini 4 (all four models) | Gemini 3.8 Flash |
| --- | --- | --- |
| Context | Input, thinking, and output share 1,048,576 tokens | 1,048,576 input tokens; 65,536 output tokens |
| Long decode up to a 1M output | Officially supported, limited by the remaining window | The model page lists a 65,536 output cap and does not describe the same unified long-decode window |
| Paid input / output | See the family table; Hydrogen is $1.50 / $7.50 | $0.75 / $3.75 through 2026-12-31; $1.50 / $7.50 from 2027-01-01 |
| Developer API free tier | Hydrogen only | Yes |
| Caching | Implicit cache only, at a 95% discount | The price table still lists a storage fee; do not treat the rules as identical to Gemini 4 |

If the work is high-volume, low-latency classification or routing, the Latest models page still points to `gemini-3.5-flash-lite` as the high-volume, low-cost option. Not every older workload is meant to move to Gemini 4.

The pricing page also still lists Gemini 3.1 Pro Preview (`gemini-3.1-pro-preview`): no free tier, $2 / $12 for prompts up to 200k tokens, and $4 / $18 above 200k. It is a remaining 3.x Pro preview model, not part of Gemini 4, and it should not be ranked as a retired previous flagship. It is not the main comparison in this article.

Gemini 2.5 Pro is already unselectable in Google AI Studio, according to the pricing page. From December 1, 2026, API requests to `gemini-2.5-pro` will automatically route to `gemini-3.8-flash` and will be billed at Gemini 3.8 Flash rates. An old 2.5 Pro model string should not be read as still providing 2.5 Pro quality or 2.5 Pro prices.

## Current Claude and OpenAI peers

To keep the comparison tight, this article uses only two current official peers whose list prices sit near the mid-tier Gemini 4 rates: Claude Sonnet 5.5 (`claude-sonnet-5-5`) and GPT-6.2 Sol (`gpt-6.2-sol`). Both are documented as everyday coding and agent workhorses, and both list short-context prices of $2 / $10 per 1 million tokens (USD). That does not mean the three models are equally capable.

| Item | Gemini 4 Hydrogen | Gemini 4 Neon | Gemini 3.8 Flash | Claude Sonnet 5.5 | GPT-6.2 Sol |
| --- | --- | --- | --- | --- | --- |
| Model ID | `gemini-4-hydrogen` | `gemini-4-neon` | `gemini-3.8-flash` | `claude-sonnet-5-5` | `gpt-6.2-sol` |
| Context | Unified 1,048,576 | Same | 1,048,576 input / 65,536 output | 1M | 1,050,000 (maximum input 922,000) |
| Default / max output | 65,536 / up to the remaining window | Same | 65,536 | 128K (synchronous Messages API) | 128,000 |
| Paid input / output | $1.50 / $7.50, flat across the window | $3 / $15, flat across the window | $0.75 / $3.75 (through 2026-12-31) | $2 / $10 | $2 / $10 for short context; if input exceeds 272K tokens, the full request uses the long-context rates, including $4 / $15 |
| Caching | Implicit hits at $0.075 | Implicit hits at $0.15 | Storage fees appear on the price table; the rules differ | Separate write and hit prices; hits are $0.10 | Short-context hits are $0.10, with separate 30-minute and 12-hour write prices |
| Input modalities | Text, image, audio, video, PDF | Same | Same | Text and images | Text and images; official docs say audio and video are unsupported |
| Free API tier | Yes, rate-limited | No | Yes | New users may receive trial credits; that is not equivalent to Gemini's ongoing free-tier model access | The model page opened for this check does not describe an equivalent ongoing free tier |

Two price anchors are useful but stay out of the main table: Claude Opus 5.5 is $4 / $20, matching Carbon and Argon's list price after December 1, 2026; GPT-6.2 Astra is $8 / $40 at short context, a higher-priced OpenAI flagship. Matching list prices only makes the billing units comparable. They are not a ranking.

Google's launch blogs cite third-party indexes such as Artificial Analysis and the Vals Index, plus internal Google Antigravity tests. Those figures are vendor-reported or vendor-cited, and the test conditions are not always comparable—especially when a harness such as Antigravity is involved. Neon's announcement, for example, reports 12.8% on SWE-sweep with the mini-SWE harness and 39.0% in Google Antigravity. This article does not use those numbers to name an absolute winner, and it does not present them as results we reproduced.

## Limits, and what this article did not verify

- The four text-reasoning models do not generate images, do not generate audio, and do not use the Live API.
- Carbon, Neon, and Argon have no developer API free tier. Only Hydrogen does, and that free tier is rate-limited and may be used to improve Google's products.
- "Highest access" and "4× limits" on consumer plans are not unlimited usage, and they do not convert directly into API tokens.
- Cybersecurity access includes limited programs such as Fairwind. Neon's announcement says access for trusted defenders is rolling out. That is not a default capability of the ordinary API or an ordinary subscription, and this article did not verify eligibility.
- Whether Gemini CLI already exposes these four IDs depends on the current CLI documentation. Do not assume the API names work there by default.
- This article did not measure standard RPM / TPM values, complete Flex / Priority dollar multipliers, whether every Gemini 4 model uses the same minimum prompt length for implicit cache, or the model list inside a signed-in product.
- It did not make paid or free API calls, run benchmarks, measure latency, or check whether a non-US plan page matches the US list prices.

## Sources

- [Gemini API models](https://aistudio.google.com/docs/models)
- [Latest Gemini models](https://aistudio.google.com/docs/latest-model)
- [Developer API pricing](https://aistudio.google.com/docs/pricing)
- [Rate limits](https://aistudio.google.com/docs/rate-limits)
- [Long decode](https://aistudio.google.com/docs/long-decode)
- [Gemini 4 Carbon model page](https://aistudio.google.com/docs/models/gemini-4-carbon) · [what's new](https://aistudio.google.com/docs/whats-new-gemini-4-carbon)
- [Gemini 4 Neon model page](https://aistudio.google.com/docs/models/gemini-4-neon) · [what's new](https://aistudio.google.com/docs/whats-new-gemini-4-neon) · [launch blog](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/)
- [Gemini 4 Hydrogen model page](https://aistudio.google.com/docs/models/gemini-4-hydrogen) · [what's new](https://aistudio.google.com/docs/whats-new-gemini-4-hydrogen) · [launch blog](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/)
- [Gemini 4 Argon model page](https://aistudio.google.com/docs/models/gemini-4-argon) · [what's new](https://aistudio.google.com/docs/whats-new-gemini-4-argon) · [October 13 availability post](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-argon/)
- [Gemini 4 Carbon November 10 availability post](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/)
- [Gemini 3.8 Flash model page](https://aistudio.google.com/docs/models/gemini-3.8-flash)
- [Gemini subscriptions](https://gemini.google/subscriptions/) · [Google AI plans](https://one.google.com/about/google-ai-plans/)
- [Claude pricing](https://platform.claude.com/docs/en/about-claude/pricing) · [Claude Sonnet 5.5](https://platform.claude.com/docs/en/models/sonnet-5-5/overview)
- [OpenAI API pricing](https://developers.openai.com/api/docs/pricing) · [GPT-6.2 Sol](https://developers.openai.com/api/docs/models/gpt-6.2-sol)
