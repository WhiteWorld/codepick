---
title: "DeepSeek Search and Fetch: free until 2026-11-01 00:00"
description: "Checked 2026-10-23. Server-side Search and Fetch in Harness, Claude Code, and Codex are not billed per call before 00:00 Beijing time on 2026-11-01. The English pricing page lists $0.75 per 1,000 successful requests. The Chinese page lists 5 yuan. Standalone APIs are billed per successful request now. This guide did not measure live calls."
date: "2026-10-23"
updated_at: "2026-10-23"
article_type: howto
tags: [deepseek, deepseek-v4, harness, search, fetch]
pillar: plans
content_status: keep
locale_strategy: mirrored
draft: false
faq:
  - q: "Are direct Search and Fetch POSTs free right now?"
    a: "They are outside the free window. The waiver names server-side tool calls in DeepSeek Harness, Claude Code, and Codex. Standalone APIs bill per successful request: $0.75 per 1,000 on the English pricing page, 5 yuan per 1,000 on the Chinese page."
  - q: "Does a retry of a failure count as two charges?"
    a: "The guide says failures, empty results, and timeouts are not billed. The later HTTP 200 that actually returns a result is the billable request. Repeating a search that already succeeded is a new charge."
  - q: "Is there a switch to turn search off in Claude Code or Codex?"
    a: "The two integration pages opened on 2026-10-23 do not list one. The Harness package README documents Use the new Web Search API. Whether that switch is inside the free window is not on the pricing page. Unknown."
  - q: "Are 5 yuan and $0.75 the same price?"
    a: "The Chinese pricing page says 5 yuan. The English pricing page says $0.75. This guide does not convert them. Which one a given account is charged is not stated. Unknown."
---

Checked on **2026-10-23** (Asia/Shanghai). The pages opened that day are listed at the end. Search, Fetch, and chat were not called. There is no live usage measurement below.

Model IDs, token prices, and image input are in the [API platforms guide](/en/guides/deepseek-v4-api-platforms/) and the [vision guide](/en/guides/deepseek-v4-flash-vision-guide/). The [Harness intro](/en/guides/deepseek-harness-intro/) is about the framework. This page is the cutoff, the billing rules, and what to log before the cutoff.

## Cutoff

The English and Chinese pricing pages say the same thing. When you use the DeepSeek API through DeepSeek Harness, Claude Code, or Codex, server-side tool calls already hit Search and Fetch. Those calls are free of charge now. Per-request billing starts at **00:00 Beijing time on 2026-11-01**.

The English news post [news261017](https://api-docs.deepseek.com/news/news261017) writes the same instant as **16:00 UTC on 2026-10-31**. Beijing time is UTC+8, with no daylight saving, so that is the same moment. The Chinese news post says 00:00 Beijing time on 1 November 2026.

On 2026-10-23, [https://api-docs.deepseek.com/updates](https://api-docs.deepseek.com/updates) rendered Your First API Call, not a dated changelog. The Search and Fetch announcement is the news post above.

The English news post says "$0.75 per 1,000 calls". The Chinese news post says 5 yuan per 1,000 calls. What counts as success is the pricing page and the Search guide.

## Two billing paths

Standalone APIs are billed per successful request now.

| API | Endpoint | English pricing page | Chinese pricing page |
| --- | --- | --- | --- |
| Search | `POST https://api.deepseek.com/v1/tools/search` | $0.75 per 1,000 successful requests | 5 yuan per 1,000 successful requests |
| Fetch | `POST https://api.deepseek.com/v1/tools/fetch` | $0.75 per 1,000 successful requests | 5 yuan per 1,000 successful requests |

Both pages say the charge is not by tokens and not by the number of results. `count` only sets how many results come back. It does not change the price of that request.

5 yuan on the Chinese page and $0.75 on the English page are the prices printed on each page. This guide does not convert them. Which currency a given account is charged: **unknown**.

The free-window note does not mention the standalone APIs. A direct POST to these two URLs is billed per successful request. The sentence about 1 November covers the path below.

The server-side path names three products: DeepSeek Harness, Claude Code, and Codex. Until the cutoff, those server-side Search and Fetch calls are not charged per request. Model tokens are separate. The deduction rules say model cost equals token count times price, and Search and Fetch are charged per successful request on top of that. When a granted balance and a topped-up balance both exist, the granted balance is used first. The free-window note does not say tokens are free.

Prices can change. The pricing page says DeepSeek reserves the right to adjust them.

The Claude Code integration page adds two sentences. Invoking Web Search sends extra model requests to summarize the results, so it spends extra tokens. The search requests themselves are also subject to Search API billing. That page does not repeat the free-window date.

On 2026-10-23 the Chinese pricing page also lists token prices in yuan. The English pricing page lists them in USD. The token table in the [API platforms guide](/en/guides/deepseek-v4-api-platforms/) was copied from the English page. Use the pricing page in the language you have open. This guide does not copy another token table.

## What counts as one success

The Search guide says a request is billable only when it returns HTTP 200 and produces a result. Search must return a non-empty `results` array. Fetch must return page content. Failed requests, empty search results, and timeouts are not billed.

A run of 429s or timeouts adds nothing to the Search or Fetch fee. The later 200 that returns a result counts as 1.

An empty result is 0 billable requests. The README for the Harness package `@deepseek-ai/dsh-web-deepseek-api` treats an empty `results` array as success at the provider layer. That is tool status, not the billable count on the pricing page.

Account QPS limits are separate from billing. Search is 100, Fetch is 25. They do not share a quota, and they are separate from model concurrency. Requests over the limit get HTTP 429. Fetch also has a per-domain QPS limit. The guide does not print that number. **Unknown**. A 429 is not billed.

## How the count grows

The price is per successful request. Doing a successful search again is another request.

The Search guide says to wait and retry HTTP 408, 429, or 5xx. Do not retry other 4xx errors without changing the request. For HTTP 402, top up first. The failed attempts are not billed. What a retry adds is the later success.

This guide did not measure how many times Harness, Claude Code, or Codex retry on their own.

Two caps in the docs are separate from that. They are caps, not a measured bill.

1. The model-facing Harness tool `web_search` takes `queries`, from 1 to 4. The web subsystem doc says each query is fanned out into its own search. One tool call can become several searches. A one-item array is one search.
2. The shipped Messages search provider id is `deepseek-official`, package `@deepseek-ai/dsh-web-search-deepseek`. The README says one search is a full Messages model turn, with up to `maxUses` server-side web searches inside that request. The default is **5**. If all 5 succeed and each one is a billable Search request, the Search fee is `5 / 1000 × unit price`. The README does not say every search hits 5, and it does not say every one returns a non-empty result. That path also spends model tokens.

The 4 on `queries` and the 5 on `maxUses` are two caps. Multiplying them into 20 successful requests is not in the docs. The bill follows the successful-request count. Log that count before the cutoff.

The README for `@deepseek-ai/dsh-web-deepseek-api` says this provider sends one direct request per operation, with no automatic retry and no provider fallback. On this path the count grows when the operation is issued again, not because this package retries.

## What you can change in Harness

Package READMEs were checked at GitHub master `687f282e8625c6b8d11ff58211a90524be2e4317`. That commit is from 2026-10-17 and is the merge for 0.2.1-rc.2. The repository root README does not mention Search billing or an off switch.

The `dsh-web-deepseek-api` README says:

- Shipped profiles mount this package while selecting Messages search and local HTTP fetch.
- Turning on **Use the new Web Search API** under **Plugins > Built-in plugin settings > Web search** and saving selects both `deepseek-search-api` and `deepseek-fetch-api`. The Chinese README labels the control **启用新版 Web 搜索 API**.
- Turning it off restores the shipped selection. A saved selection applies to the next operation.

The matching config is:

```yaml
- name: '@deepseek-ai/dsh-web'
  config:
    searchProvider: deepseek-search-api
    fetchProvider: deepseek-fetch-api
```

`deepseek-search-api` calls `https://api.deepseek.com/v1/tools/search` directly. `deepseek-fetch-api` calls `/fetch` under the same prefix. The README says there is no auxiliary model request, and retrieval billing is independent of model tokens. `count` defaults to 10. A smaller `maxResults` on the request wins. `need_content` is fixed at false. `count` does not change the per-request price on the pricing page.

Whether this direct request is the "server-side tool call" in the free-window note: **unknown**. The note names products, not these plugin ids. The standalone price table does not mention a waiver. While the switch is on, budget as if per-request billing may already apply, until the docs say this path is inside the window.

With the switch off, search goes back to `deepseek-official`. That README's wording is server-side web search, which lines up with server-side tool calls on the pricing page. It still spends model tokens. The default `maxUses` is 5. Fetch goes back to what the README calls local HTTP fetch. That sentence does not say local fetch calls the DeepSeek Fetch API. Anonymous HTTP fetch is a different package, `@deepseek-ai/dsh-web-fetch-http`. Whether the shipped selection uses that package id: **unknown**.

The published [web subsystem page](https://deepseek-harness.github.io/deepseek-harness/en/reference/subsystems/web) names the config fields `searchProvider` and `fetchProvider`, and says a matching environment variable feeds the same field. It does not print the variable name. On master, `packages/web/web/src/index.ts` reads `DSH_WEB_SEARCH_PROVIDER` and `DSH_WEB_FETCH_PROVIDER`. The comment says they are equivalent to those fields, not a separate priority chain. Those names are in source, not on an integration page.

## Claude Code and Codex

The Claude Code integration page lists `ANTHROPIC_BASE_URL`, `ANTHROPIC_AUTH_TOKEN`, `ANTHROPIC_MODEL`, the three `ANTHROPIC_DEFAULT_*` models, `CLAUDE_CODE_SUBAGENT_MODEL`, `CLAUDE_CODE_EFFORT_LEVEL`, and `CLAUDE_CODE_AUTO_COMPACT_WINDOW`. The sample opened on 2026-10-23 sets the model to `deepseek-flash[1m]` or `deepseek-flash`. The page has no variable that turns Web Search off. How to disable it inside Claude Code: **unknown**.

The same page maps model names. Names starting with `claude-opus` map to `deepseek-v4-pro`, billed at the V4 Pro price. Names starting with `claude-haiku` or `claude-sonnet` map to `deepseek-flash`.

In the Codex integration page's `models.json` sample, `deepseek-v4-flash`, `deepseek-v4-pro`, and `deepseek-v4-flash-vision-exp` all set `"web_search_tool_type": "text"`. The page does not say another value turns search off. Whether editing that field stops Search billing: **unknown**.

The [Responses API](https://api-docs.deepseek.com/guides/responses_api) page says `web_search` runs on the server only for `deepseek-v4-pro`. The API adds the results to the context and continues. `deepseek-flash` ignores the tool. `max_tool_calls` is ignored, so it does not cap the count. `tool_choice` supports `none`, `auto`, `required`, and a specific function. On a raw Responses request, `none` means no tools. The Codex integration page does not show `tool_choice` as a `config.toml` field. Whether a Codex session honors it: **unknown**.

Claude Code uses the Anthropic-compatible endpoint `https://api.deepseek.com/anthropic`. Whether "flash ignores web_search" on the Responses API also applies to Claude Code: **unknown**.

## What to log before the cutoff

The pricing page says fees come out of the topped-up balance or the granted balance, and the granted balance is used first when both exist. Whether the console shows a Search line during the free window: **unknown**. This guide has no console field name.

Log these:

1. Successful Search count and successful Fetch count, separately. Leave out failures, empty results, and timeouts.
2. The path. A direct POST to `/v1/tools/search` or `/fetch`, which Harness provider, Claude Code Web Search, or Codex.
3. Whether **Use the new Web Search API** is on in Harness.
4. On the Messages search path, the README says the session log gets a log-only event named `web/deepseek-search-llm-request`. It stores the request body that was sent, without secrets. It is not a bill.
5. Turn the successful counts into a post-cutoff Search and Fetch fee with the formula in the next section. Add model tokens separately.

Use that number to decide whether search stays on after the cutoff. The free period is for measuring a baseline.

## Arithmetic from the published rates

Use only the published "per 1,000 successful requests" price. One success is that price divided by 1,000.

English pricing page: 1 success = $0.75 / 1000 = $0.00075.

| Successful requests | Fee for one API |
| --- | --- |
| 1 | $0.00075 |
| 1,000 | $0.75 |
| 8,000 | $6.00 |

Search and Fetch are added after they are computed separately. 8,000 successful Search requests plus 2,000 successful Fetch requests = $6.00 + $1.50 = $7.50.

A task that logs 3 successful Search requests and 6 successful Fetch requests: Search $0.00225, Fetch $0.0045, total $0.00675. The same successful counts issued 10 more times cost $0.0675. Do not multiply the failures in between.

Chinese pricing page: 1 success = 5 yuan / 1000 = 0.005 yuan.

| Successful requests | Fee for one API |
| --- | --- |
| 1 | 0.005 yuan |
| 1,000 | 5 yuan |
| 8,000 | 40 yuan |

3 successful Search requests plus 6 successful Fetch requests = 0.015 yuan + 0.03 yuan = 0.045 yuan. Ten more times is 0.45 yuan.

If the default `maxUses` of 5 all count as successful Search requests: $0.00375 on the English page, 0.025 yuan on the Chinese page. That is ceiling arithmetic, not a measurement. Model tokens on the Messages path are extra.

## Pages opened that day

- [模型与价格 (Chinese)](https://api-docs.deepseek.com/zh-cn/quick_start/pricing)
- [Models & Pricing](https://api-docs.deepseek.com/quick_start/pricing)
- [网页搜索与抓取 (Chinese)](https://api-docs.deepseek.com/zh-cn/guides/search)
- [Search & Fetch](https://api-docs.deepseek.com/guides/search)
- [Chinese news, news261017](https://api-docs.deepseek.com/zh-cn/news/news261017)
- [English news, news261017](https://api-docs.deepseek.com/news/news261017)
- [接入 Claude Code](https://api-docs.deepseek.com/zh-cn/quick_start/agent_integrations/claude_code)
- [Integrate with Claude Code](https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code)
- [接入 Codex](https://api-docs.deepseek.com/zh-cn/quick_start/agent_integrations/codex)
- [Integrate with Codex](https://api-docs.deepseek.com/quick_start/agent_integrations/codex)
- [Responses API](https://api-docs.deepseek.com/guides/responses_api)
- [Harness web subsystem](https://deepseek-harness.github.io/deepseek-harness/en/reference/subsystems/web)
- [deepseek-harness](https://github.com/deepseek-ai/deepseek-harness) master `687f282e8625c6b8d11ff58211a90524be2e4317`, files `packages/web/web-deepseek-api/README.md` and `packages/web/web-search-deepseek/README.md`

## Marked unknown this pass

- No live requests and no console screenshot.
- Whether Harness **Use the new Web Search API** is inside the free window.
- Whether an account is charged 5 yuan or $0.75.
- An off switch for Claude Code or Codex.
- Whether `deepseek-flash` in Claude Code actually emits Search calls.
- The per-domain Fetch QPS number.
- The provider id behind shipped "local HTTP fetch".
