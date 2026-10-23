---
title: "DeepSeek Search 与 Fetch：免费到 2026-11-01 00:00"
description: "核查日 2026-10-23。Harness、Claude Code、Codex 的服务端 Search 与 Fetch 在北京时间 2026-11-01 00:00 前不计次。英文价格页是 $0.75/千次成功请求，中文价格页是 5元。独立 API 现在就按成功请求计费。本文没有实测调用。"
date: "2026-10-23"
updated_at: "2026-10-23"
article_type: howto
tags: [deepseek, deepseek-v4, harness, search, fetch]
pillar: plans
content_status: keep
locale_strategy: mirrored
draft: false
faq:
  - q: "直接 POST Search 或 Fetch，现在免费吗？"
    a: "不在免单窗口里。价格页的免单注只点了 DeepSeek Harness、Claude Code、Codex 里的服务端工具调用。独立 API 按成功请求计费，英文页 $0.75/千次，中文页 5元/千次。"
  - q: "失败后再试一次，会按两次收费吗？"
    a: "指南写失败、空结果、超时不计费。计费的是之后那次 HTTP 200 且有结果的请求。同一次成功的搜索再做一遍，才是另一次费用。"
  - q: "Claude Code 或 Codex 有关闭搜索的开关吗？"
    a: "2026-10-23 打开的两份接入页没有给出关闭开关。Harness 的包说明里有「启用新版 Web 搜索 API」。这个开关算不算免单窗口，价格页没写，未知。"
  - q: "5元和 $0.75 是同一个价吗？"
    a: "中文价格页写 5元，英文价格页写 $0.75。本文不换算。同一个账号扣哪一种，页面没写，未知。"
---

核查日 **2026-10-23**（Asia/Shanghai）。当天打开的页面列在文末。没有调用 Search、Fetch 或聊天接口。下面没有用量实测。

模型 ID、token 单价和看图，分别在 [API 平台现状](/zh/guides/deepseek-v4-api-platforms/) 和 [看图指南](/zh/guides/deepseek-v4-flash-vision-guide/)。[Harness 入门](/zh/guides/deepseek-harness-intro/) 讲框架。这篇只写 Search 与 Fetch 的截止日、计费和截止前要记的数。

## 截止时间

英文和中文价格页写的是同一件事。通过 DeepSeek Harness、Claude Code 或 Codex 使用 DeepSeek API 时，服务端工具调用已经在访问 Search 和 Fetch。这些调用目前不计费。按次计费从 **2026-11-01 00:00 北京时间** 开始。

英文新闻 [news261017](https://api-docs.deepseek.com/news/news261017) 把同一时刻写成 **2026-10-31 16:00 UTC**。北京时间是 UTC+8，全年不实行夏令时，所以这是同一个时刻。中文新闻写的是北京时间 2026 年 11 月 1 日 00:00。

2026-10-23 打开 [https://api-docs.deepseek.com/updates](https://api-docs.deepseek.com/updates)，页面是 Your First API Call，不是一份按日期排列的更新日志。Search 与 Fetch 的发布说明在上面那则新闻里。

英文新闻写 "$0.75 per 1,000 calls"。中文新闻写「5 元 / 千次」。哪一次算成功，以价格页和 Search 指南为准。

## 两条计费路径

独立 API 现在就按成功请求计费。

| API | 端点 | 英文价格页 | 中文价格页 |
| --- | --- | --- | --- |
| Search | `POST https://api.deepseek.com/v1/tools/search` | $0.75 / 1,000 次成功请求 | 5元 / 1,000 次成功请求 |
| Fetch | `POST https://api.deepseek.com/v1/tools/fetch` | $0.75 / 1,000 次成功请求 | 5元 / 1,000 次成功请求 |

两页都写：不按 token，也不按返回条数。`count` 只决定返回几条，不改变这一次的价格。

中文页的 5元 和英文页的 $0.75 是各自页面上的标价。本文不换算。同一个账号扣哪一种：**未知**。

价格页的免单注没有写独立 API。直接 POST 这两个地址，按成功请求计费。免到 11 月 1 日的句子覆盖的是下面这条路径。

服务端工具路径只点了三个名字：DeepSeek Harness、Claude Code、Codex。截止时间之前，这类服务端 Search / Fetch 调用不计次。模型 token 另算。扣费规则写：模型费用等于 token 数乘单价；Search 和 Fetch 按成功请求另计。赠送余额和充值余额同时存在时，先扣赠送余额。免单注没有写免 token。

价格可能变动。价格页写 DeepSeek 保留调价的权利。

Claude Code 接入页另外写了两句。调用 Web Search 会再发模型请求来总结结果，因此产生额外 token 费用。搜索请求本身还按 Search API 计费。接入页没有重复免单截止日期。

2026-10-23 的中文价格页也列出了人民币 token 价。英文价格页列出美元 token 价。[API 平台现状](/zh/guides/deepseek-v4-api-platforms/) 里的 token 表抄的是英文页。token 单价以你打开的那一版价格页为准，这里不另抄一张表。

## 什么算一次成功

Search 指南写：只有 HTTP 200，并且真的产生结果，才计费。Search 的 `results` 必须非空。Fetch 必须返回网页正文。失败、搜索无结果、超时不计费。

一串 429 或超时本身不加 Search / Fetch 费用。后面那一次 200 且有结果，算 1 次。

空结果在计费上是 0 次。Harness 包 `@deepseek-ai/dsh-web-deepseek-api` 的 README 把空的 `results` 数组看成提供者层面的成功。那是工具状态，不是价格页上的计费次数。

账号级 QPS 和计费分开。Search 100，Fetch 25，互不影响，也和模型并发分开。超过会收到 HTTP 429。Fetch 还有按目标域名的 QPS，指南没有写出数字。**未知**。429 不计费。

## 次数会怎么变多

价格按成功请求计。同一次成功的搜索再做一遍，就是另一次。

Search 指南要求：HTTP 408、429 或 5xx，先等再重试。其它 4xx，不改请求就不要重试。402 先充值。失败的那些次不计费。重试加上去的，是后来那次成功。

本文没有测量 Harness、Claude Code、Codex 会自动重试几次。

文档里已经能对上的，是另外两处上限。它们是上限，不是实测账单。

1. Harness 面向模型的 `web_search` 接受 `queries`，1 到 4 条。Web 子系统文档写：每条会拆成各自的搜索。一条工具调用可以变成多次搜索。一次只放 1 条 query，就是一次搜索。
2. 内置 Messages 搜索提供者的 id 是 `deepseek-official`，包是 `@deepseek-ai/dsh-web-search-deepseek`。README 写：一次搜索是一整次 Messages 模型调用，里面最多 `maxUses` 次服务端 web search，默认 **5**。5 次都成功、并且都算计费请求时，Search 费用是 `5 / 1000 × 单价`。README 没有保证每次都会打满 5 次，也没有保证每次都是非空结果。这条路径还会另计模型 token。

`queries` 的 4 和 `maxUses` 的 5 是两处上限。把它们乘成 20 次成功请求，没有文档依据。账单只认成功请求数。截止日前把这个数记下来。

`@deepseek-ai/dsh-web-deepseek-api` 的 README 写：这个提供者每次操作只发一次直接请求，没有自动重试，也没有换一个提供者再试。走这条路径时，次数变多来自再次发起操作，不来自这个包自己的重试。

## Harness 上能改的

包 README 按 GitHub master `687f282e8625c6b8d11ff58211a90524be2e4317` 核对。这次提交在 2026-10-17，说明是合并 0.2.1-rc.2。仓库根 README 没有 Search 计费，也没有关闭开关。

`dsh-web-deepseek-api` 的 README 写：

- 内置配置会挂上这个包，选中的是 Messages 搜索和本地 HTTP 抓取。
- 在 **插件 > 内置插件配置 > 网页搜索** 里打开 **启用新版 Web 搜索 API**（英文 README 的按钮文字是 **Use the new Web Search API**）并保存，会同时选中 `deepseek-search-api` 和 `deepseek-fetch-api`。
- 关掉之后恢复内置选择。保存的选择从下一次操作开始生效。

对应配置：

```yaml
- name: '@deepseek-ai/dsh-web'
  config:
    searchProvider: deepseek-search-api
    fetchProvider: deepseek-fetch-api
```

`deepseek-search-api` 直接请求 `https://api.deepseek.com/v1/tools/search`。`deepseek-fetch-api` 请求同一前缀下的 `/fetch`。README 写：不另发辅助模型请求；检索费用和模型 token 分开。`count` 默认 10。请求里更小的 `maxResults` 优先。`need_content` 固定为 false。`count` 不改变价格页上的单次价格。

这条直接请求是不是免单注里的「服务端工具调用」：**未知**。免单注点了产品名，没有点这两个插件 id。独立 API 的价目表没有写免单。打开这个开关时，先按「可能已经在按次计费」做预算，直到官方写明它属于免单窗口。

关掉开关之后，搜索回到 `deepseek-official`。那条 README 用的词是 server-side web search，和价格页的 server-side tool calls 对得上。它仍会花模型 token。默认 `maxUses` 是 5。抓取回到 README 说的本地 HTTP 抓取。本地抓取会不会打 DeepSeek Fetch API，这句 README 没写。匿名 HTTP 抓取是另一个包 `@deepseek-ai/dsh-web-fetch-http`。内置选择是不是这个包的 id：**未知**。

发布的 [Web 子系统页](https://deepseek-harness.github.io/deepseek-harness/en/reference/subsystems/web) 写了配置字段 `searchProvider` 和 `fetchProvider`，并说有对应的环境变量。页上没有写出变量名。master 上 `packages/web/web/src/index.ts` 读取 `DSH_WEB_SEARCH_PROVIDER` 和 `DSH_WEB_FETCH_PROVIDER`。注释写它们等价于这两个字段，不是另一条优先级。这是源码里的名字，不是接入页上的开关说明。

## Claude Code 和 Codex

Claude Code 接入页列出的环境变量是 `ANTHROPIC_BASE_URL`、`ANTHROPIC_AUTH_TOKEN`、`ANTHROPIC_MODEL`、三个 `ANTHROPIC_DEFAULT_*` 模型、`CLAUDE_CODE_SUBAGENT_MODEL`、`CLAUDE_CODE_EFFORT_LEVEL`、`CLAUDE_CODE_AUTO_COMPACT_WINDOW`。2026-10-23 的示例把模型写成 `deepseek-flash[1m]` 或 `deepseek-flash`。页上没有关闭 Web Search 的变量。怎么在 Claude Code 里关掉它：**未知**。

同一页写模型名映射。`claude-opus` 开头映射到 `deepseek-v4-pro`，按 V4 Pro 价格。`claude-haiku` 和 `claude-sonnet` 开头映射到 `deepseek-flash`。

Codex 接入页的 `models.json` 示例里，`deepseek-v4-flash`、`deepseek-v4-pro`、`deepseek-v4-flash-vision-exp` 都写着 `"web_search_tool_type": "text"`。页上没有写别的取值可以关闭搜索。改这个字段会不会停掉 Search 计费：**未知**。

[Responses API](https://api-docs.deepseek.com/guides/responses_api) 写：`web_search` 只在 `deepseek-v4-pro` 上由服务端执行，加进上下文后继续生成。`deepseek-flash` 会忽略这个工具。`max_tool_calls` 被忽略，不能靠它限制次数。`tool_choice` 支持 `none`、`auto`、`required`，以及指定一个 function。对一次原始 Responses 请求，`none` 表示不用工具。Codex 接入页没有把 `tool_choice` 写成 `config.toml` 里的字段。Codex 会话会不会照做：**未知**。

Claude Code 走的是 Anthropic 兼容端点 `https://api.deepseek.com/anthropic`。Responses API 那句「flash 忽略 web_search」是否同样适用于 Claude Code：**未知**。

## 截止日前记什么

价格页只写费用从充值余额或赠送余额扣，有赠送余额时先扣赠送余额。免费窗口里控制台会不会出现一行 Search：**未知**。本文没有控制台字段名。

自己记这几项：

1. 成功的 Search 次数和成功的 Fetch 次数，分开记。失败、空结果、超时不要加进这个数。
2. 路径。直接 POST `/v1/tools/search` 或 `/fetch`，Harness 的哪个 provider，Claude Code 的 Web Search，还是 Codex。
3. Harness 里「启用新版 Web 搜索 API」是开还是关。
4. 若走 Messages 搜索，README 写会话里会有只记日志的事件 `web/deepseek-search-llm-request`。内容是发出去的请求体，不含密钥。它不是账单。
5. 用下一节的公式，把成功次数换成截止后的 Search / Fetch 费用。模型 token 另加。

截止后是否继续开着搜索，用这个数决定。窗口本身是用来量基线的。

## 用官方单价算

只使用页面上的「每 1,000 次成功请求」。1 次成功等于这个单价除以 1,000。

英文价格页：1 次成功 = $0.75 / 1000 = $0.00075。

| 成功次数 | 单个 API 的费用 |
| --- | --- |
| 1 | $0.00075 |
| 1,000 | $0.75 |
| 8,000 | $6.00 |

Search 和 Fetch 分开算，再相加。8,000 次成功 Search 加 2,000 次成功 Fetch = $6.00 + $1.50 = $7.50。

一次任务如果记到 3 次成功 Search、6 次成功 Fetch：Search $0.00225，Fetch $0.0045，合计 $0.00675。同样的成功次数再出现 10 遍，是 $0.0675。中间的失败不要乘进去。

中文价格页：1 次成功 = 5元 / 1000 = 0.005元。

| 成功次数 | 单个 API 的费用 |
| --- | --- |
| 1 | 0.005元 |
| 1,000 | 5元 |
| 8,000 | 40元 |

3 次成功 Search 加 6 次成功 Fetch = 0.015元 + 0.03元 = 0.045元。再来 10 遍是 0.45元。

`maxUses` 默认 5，且 5 次都算成功 Search 时：英文页 $0.00375，中文页 0.025元。这是上限算术，不是测量。Messages 路径上的模型 token 还要另加。

## 当天打开的页面

- [模型与价格（中文）](https://api-docs.deepseek.com/zh-cn/quick_start/pricing)
- [Models & Pricing](https://api-docs.deepseek.com/quick_start/pricing)
- [网页搜索与抓取（中文）](https://api-docs.deepseek.com/zh-cn/guides/search)
- [Search & Fetch](https://api-docs.deepseek.com/guides/search)
- [中文新闻 news261017](https://api-docs.deepseek.com/zh-cn/news/news261017)
- [英文新闻 news261017](https://api-docs.deepseek.com/news/news261017)
- [接入 Claude Code](https://api-docs.deepseek.com/zh-cn/quick_start/agent_integrations/claude_code)
- [Integrate with Claude Code](https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code)
- [接入 Codex](https://api-docs.deepseek.com/zh-cn/quick_start/agent_integrations/codex)
- [Integrate with Codex](https://api-docs.deepseek.com/quick_start/agent_integrations/codex)
- [Responses API](https://api-docs.deepseek.com/guides/responses_api)
- [Harness Web 子系统](https://deepseek-harness.github.io/deepseek-harness/en/reference/subsystems/web)
- [deepseek-harness](https://github.com/deepseek-ai/deepseek-harness) master `687f282e8625c6b8d11ff58211a90524be2e4317` 上的 `packages/web/web-deepseek-api/README.md` 与 `packages/web/web-search-deepseek/README.md`

## 这次标成未知的

- 没有发真实请求，没有控制台截图。
- Harness「启用新版 Web 搜索 API」是否享受免单窗口。
- 账号扣 5元 还是 $0.75。
- Claude Code 和 Codex 的关闭开关。
- `deepseek-flash` 在 Claude Code 里会不会打出 Search。
- Fetch 按域名的 QPS 数字。
- 内置「本地 HTTP 抓取」的 provider id。
