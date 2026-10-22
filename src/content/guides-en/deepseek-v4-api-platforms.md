---
title: "DeepSeek API Model IDs and Where to Call Them (2026-10-18)"
description: "Rechecked on 2026-10-18. Call deepseek-flash (V4.1-Flash-1017) or deepseek-v4-pro (V4-Pro-0813). The old Flash names still work, but those models are retired. Includes peak pricing, the 1M context, and the OpenRouter, Fireworks, and Together pages opened that day."
date: "2026-10-18"
updated_at: "2026-10-22"
article_type: "howto"
tags: ["deepseek", "deepseek-v4", "api", "openrouter", "together", "fireworks"]
pillar: plans
content_status: keep
locale_strategy: mirrored
draft: false
---

Checked on **2026-10-18**. Pages opened that day:

- [DeepSeek changelog](https://api-docs.deepseek.com/updates)
- [Models & Pricing](https://api-docs.deepseek.com/quick_start/pricing)
- [News post, 2026-09-10](https://api-docs.deepseek.com/news/news260910)
- [DeepSeek-V4.1-Flash-1017](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017) and [DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash)
- [github.com/deepseek-ai](https://github.com/deepseek-ai)
- The two OpenRouter model pages, the Fireworks 1017 model page, and Together's serverless model catalog

Bailian, Tencent Cloud, SiliconFlow, Novita, and Replicate were not reopened. This guide does not say whether they serve V4.1-Flash.

## Which ID to send

The pricing page has two columns:

| Model name | Version on the pricing page | Vision |
| --- | --- | --- |
| `deepseek-flash` | DeepSeek-V4.1-Flash-1017 | Supported |
| `deepseek-v4-pro` | DeepSeek-V4-Pro-0813 | Not supported |

Both columns are 1M context, 384K max output. Thinking mode is the default, and you can turn it off. JSON output, tool calls, the Responses API, and the Anthropic API are on both. FIM is non-thinking mode only.

`deepseek-v4-flash` and `deepseek-v4-flash-vision-exp` are still accepted. The models behind those names are retired. Requests are served by V4.1-Flash-1017 and billed at the Flash price. New code should send `deepseek-flash`.

On 2026-04-24 the changelog said `deepseek-chat` and `deepseek-reasoner` would stop on **2026-07-24**. The pricing page opened on 2026-10-18 does not list them. Whether they still respond is **unknown**. No test call was sent.

OpenAI-compatible base URL: `https://api.deepseek.com`. Anthropic-compatible base URL: `https://api.deepseek.com/anthropic`.

## Price (official, USD per 1M tokens)

The official page lists USD only. There is no CNY price. Off-peak is half of peak. Peak hours are **Monday–Friday 01:00–04:00 and 06:00–10:00 UTC**, excluding Chinese public holidays. In Beijing time that is **09:00–12:00 and 14:00–18:00**. Weekends and Chinese public holidays are off-peak for the whole day.

Peak and off-peak prices took effect at **16:00 UTC on 2026-08-16**. The V4.1-Flash price level took effect at **04:00 UTC on 2026-09-10**.

| | Flash off-peak | Flash peak | V4-Pro off-peak | V4-Pro peak |
| --- | --- | --- | --- | --- |
| Input, cache hit | $0.003 | $0.006 | $0.022 | $0.044 |
| Input, cache miss | $0.15 | $0.30 | $0.66 | $1.32 |
| Output | $0.60 | $1.20 | $1.98 | $3.96 |

Concurrency limits: Flash 2500, V4-Pro 500. The rate-limit page was not opened, so this guide does not repeat rules from it.

Search and Fetch are per request, not per token: **$0.75 per 1,000 successful requests** each. The 2026-10-17 changelog is titled as opening the in-house Search API. That entry does not give Fetch its own launch date. Fetch's price is on the pricing page opened the same day. This guide does not turn that into a changelog sentence that Fetch launched the same day.

When you call the DeepSeek API through DeepSeek Harness, Claude Code, or Codex, server-side tools already hit Search and Fetch. Those calls are free until **00:00 Beijing time on 2026-11-01**, then the per-request price applies. The pricing page does not say direct Search or Fetch API calls are in that free window.

## Two documents disagree about V4-Pro routing

The 2026-09-10 news post is still online. It says that from **04:00 UTC on 2026-09-14**, every `deepseek-v4-pro` request would route to V4.1-Flash at V4.1-Flash rates, until V4.1-Pro.

The changelog entry for the same day says the opposite: after user requests, DeepSeek would **keep serving V4 Pro after 2026-09-14, with billing unchanged**.

The pricing page on 2026-10-18 still lists `deepseek-v4-pro` as DeepSeek-V4-Pro-0813, at Pro prices, not Flash prices. Treat the pricing page as the live catalog. The routing sentence on the news post was not edited.

## Official self-reported scores, comparison only

1017 is a minor update of V4.1-Flash. The changelog and the Hugging Face card both report these gains over the previous V4.1-Flash. These are **official self-reported** numbers:

| Benchmark | V4.1-Flash-1017 | Previous V4.1-Flash |
| --- | --- | --- |
| HLE, no tools | 42.6 (44.0 on the text-only subset) | 36.8 (39.1 on the text-only subset) |
| Terminal-Bench 4.0 | 42.3 | 31.2 |
| DeepSWE v1.1 | 77.0 | 74.2 |
| ProgramBench | 29.1 | 20.3 |

Terminal-Bench 4.0 used the Claude Code harness. DeepSWE used Mini-SWE-V2. DeepSeek chose the rows. On the same Hugging Face table, Opus 5 is still ahead on HLE without tools (56.3) and Terminal-Bench 4.0 (51.8). The GLM and Kimi cells from that table are in [GLM vs DeepSeek vs Kimi](/en/compare/glm-vs-deepseek-vs-kimi-2026/).

An older draft of this site cited V4-Flash at "$0.14/M and 82.6% HumanEval" and V4-Pro at "80.6% SWE-bench, 75% off until 2026-05-31". Those figures are not on the official pages opened this round. They are removed.

Parameter counts come in two wordings. DeepSeek does not explain the gap. The 2026-09-10 news post says a **552B-parameter MoE backbone**, with 8B active on input and 16B active on output. Both Hugging Face cards show a model size of **763B**. Both figures are listed. No reason is added.

The weights are MIT licensed.

## Third-party platforms (their own pages, 2026-10-18)

Prices move. The numbers below are what those pages showed when opened. They are not DeepSeek's peak and off-peak table.

| Platform | IDs confirmed that day | Price on the page (USD per 1M tokens) |
| --- | --- | --- |
| DeepSeek official | `deepseek-flash`, `deepseek-v4-pro` | Table above |
| OpenRouter | Both `deepseek/deepseek-v4.1-flash-1017` and `deepseek/deepseek-v4.1-flash` had pages | 1017 headline: $0.05 input / $0.60 output, cache read $0.008. The same page's provider table shows a DeepSeek row at $0.15 input, $0.60 output, $0.003 cache read. The page without 1017 headlines $0.0648 / $0.144. Providers differ |
| Fireworks | `accounts/fireworks/models/deepseek-v4p1-flash-1017` | Serverless: $0.30 input / $0.006 cached input / $1.20 output. Context is listed as 1040k. The parameter field says 755B. That is Fireworks' own label, not the 552B / 763B pair above |
| Together serverless catalog | `deepseek-ai/DeepSeek-V4.1-Flash`, `deepseek-ai/DeepSeek-V4-Pro-0813` | Flash: $0.30 / $0.006 cached / $1.20, context 1,000,000. Pro: $1.32 / $0.13 cached / $3.96, context 1,048,576. No 1017 snapshot in that catalog |

Together's dedicated catalog was not opened. Whether it lists 1017 is **unknown**.

The old OpenRouter slug `deepseek/deepseek-v4` was not opened. This update does not repeat the 2026-04-29 note that the page existed but was unavailable.

Volcengine Ark Coding Plan: on 2026-10-22 the plan overview, get-started page, and model-release note were opened. All three list `deepseek-v4.1-flash`. The same day also lists `deepseek-v4.1-flash-economy`. The release note says it uses the same weights as the standard model. These pages do not say 1017, and they do not say the September 10 snapshot. Which snapshot it is remains **unknown**. The Ark pay-as-you-go pricing page was not opened.

## One official request

```bash
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-flash",
    "messages": [
      {"role": "user", "content": "Which snapshot does deepseek-flash point at today?"}
    ],
    "stream": false
  }'
```

For Pro, set `model` to `deepseek-v4-pro`. For images, use `deepseek-flash`. Do not treat the retired `deepseek-v4-flash-vision-exp` as the primary ID. Image input is in the [vision guide](/en/guides/deepseek-v4-flash-vision-guide/).

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["DEEPSEEK_API_KEY"],
    base_url="https://api.deepseek.com",
)

resp = client.chat.completions.create(
    model="deepseek-flash",
    messages=[{"role": "user", "content": "Which rate is the cache-hit price?"}],
)
print(resp.choices[0].message.content)
```

The changelog says DeepSeek Harness **0.2.1-rc.1** or later is the best fit for the new model. Stars and the preview label are in the [Harness guide](/en/guides/deepseek-harness-intro/).

## Timeline (changelog wording)

- **2026-04-24**: The API added V4-Pro and V4-Flash.
- **2026-07-31**: V4-Flash-0731. The changelog says official release and **public beta**. It does not say GA. Only the Flash API changed.
- **2026-08-13**: V4-Pro GA. Responses API. Thinking effort low / high / max. Peak pricing was announced for three days later.
- **2026-08-16, 16:00 UTC**: Peak and off-peak prices took effect.
- **2026-08-21**: V4-Flash-Vision-Exp.
- **2026-09-10**: V4.1-Flash, model name `deepseek-flash`. New prices at 04:00 UTC. The previous Flash and Vision-Exp models were retired.
- **2026-10-17**: Upgrade to V4.1-Flash-1017. The call path and the Flash price stayed the same. The same changelog opened the in-house Search API.
