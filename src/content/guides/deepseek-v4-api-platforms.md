---
title: "DeepSeek API 模型 ID 与平台现状（2026-10-18）"
description: "2026-10-18 重开官方价格页和 changelog。现在应调 deepseek-flash（V4.1-Flash-1017）或 deepseek-v4-pro（V4-Pro-0813）。旧 Flash 别名仍能填，但模型已退役。附峰谷价、1M 上下文，以及当天核过的 OpenRouter、Fireworks、Together。"
date: "2026-10-18"
updated_at: "2026-10-22"
article_type: "howto"
tags: ["deepseek", "deepseek-v4", "api", "openrouter", "together", "fireworks"]
pillar: plans
content_status: keep
locale_strategy: mirrored
draft: false
---

核查日 **2026-10-18**。当天重新打开的页面：

- [DeepSeek changelog](https://api-docs.deepseek.com/updates)
- [Models & Pricing](https://api-docs.deepseek.com/quick_start/pricing)
- [2026-09-10 新闻](https://api-docs.deepseek.com/news/news260910)
- [DeepSeek-V4.1-Flash-1017](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017) 与 [DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash)
- [github.com/deepseek-ai](https://github.com/deepseek-ai)
- OpenRouter 的两个模型页、Fireworks 的 1017 模型页、Together 的 serverless 模型目录

百炼、腾讯云、硅基流动、Novita、Replicate 这次没有重开，下面不写它们是否支持 V4.1-Flash。

## 现在该填哪个 ID

价格页只有两列：

| 要填的模型名 | 价格页上的版本 | 视觉 |
| --- | --- | --- |
| `deepseek-flash` | DeepSeek-V4.1-Flash-1017 | 支持 |
| `deepseek-v4-pro` | DeepSeek-V4-Pro-0813 | 不支持 |

两列都是 1M 上下文，最大输出 384K。思考模式默认开着，也可以关掉。JSON、工具调用、Responses API、Anthropic API 两列都有。FIM 只在非思考模式。

`deepseek-v4-flash` 和 `deepseek-v4-flash-vision-exp` 价格页仍接受。对应模型已经退役，请求由 V4.1-Flash-1017 处理，按 Flash 价计。新代码直接写 `deepseek-flash`。

`deepseek-chat` 和 `deepseek-reasoner` 在 2026-04-24 的 changelog 里被预告于 **2026-07-24** 停用。2026-10-18 的价格页不再列出这两个名字。现在还能不能调：**未知**。这次没有发测试请求。

OpenAI 兼容 base URL 是 `https://api.deepseek.com`。Anthropic 兼容是 `https://api.deepseek.com/anthropic`。

## 价格（官方，USD / 100 万 token）

官方只给美元，没有人民币价。非高峰是高峰的一半。高峰是 **UTC 周一到周五 01:00–04:00 和 06:00–10:00**，中国法定节假日除外。换成北京时间是 **09:00–12:00 和 14:00–18:00**。周末和法定节假日整天都是非高峰。

峰谷价从 **2026-08-16 16:00 UTC** 起生效。V4.1-Flash 这一档新价格从 **2026-09-10 04:00 UTC** 起生效。

| | Flash 非高峰 | Flash 高峰 | V4-Pro 非高峰 | V4-Pro 高峰 |
| --- | --- | --- | --- | --- |
| 输入，缓存命中 | $0.003 | $0.006 | $0.022 | $0.044 |
| 输入，未命中 | $0.15 | $0.30 | $0.66 | $1.32 |
| 输出 | $0.60 | $1.20 | $1.98 | $3.96 |

并发上限：Flash 2500，V4-Pro 500。细则在官方 Rate Limit 页，本文不转述没打开的那一页。

Search 和 Fetch 按次收费，不是按 token：各 **$0.75 / 1000 次成功请求**。2026-10-17 的 changelog 标题是开放自研 Search API，正文没有单独写 Fetch 的发布日。Fetch 的价格是同一天价格页上的，不把「同一天发布」写成 changelog 原话。

通过 DeepSeek Harness、Claude Code 或 Codex 调用时，服务端已经在打 Search 和 Fetch。这两类调用在 **2026-11-01 00:00 北京时间** 之前免费，之后按上面的按次价格。直接打 Search / Fetch API 的单价，价格页没有写免单。截止日前要记的次数，以及 Harness 里哪个开关会改成直接请求这两个 API，见 [Search 与 Fetch 免费窗口](/zh/guides/deepseek-search-fetch-free-window/)。

## 一条对不上的路由说明

2026-09-10 的新闻页现在还能打开，上面写：从 **2026-09-14 04:00 UTC** 起，所有 `deepseek-v4-pro` 请求改路由到 V4.1-Flash，并按 Flash 价，直到 V4.1-Pro。

同一天的 changelog 后来改了口：应用户要求，**2026-09-14 之后继续提供 V4 Pro，计费方式不变**。

2026-10-18 的价格页仍把 `deepseek-v4-pro` 单列成 DeepSeek-V4-Pro-0813，价格也不是 Flash 的价格。以价格页为准：V4-Pro 还在，按 Pro 的峰谷价。新闻页那句路由没有改掉。

## 官方自报跑分，只列对照

1017 是 V4.1-Flash 的小版本。changelog 和 HF 模型卡都写，相对上一版 V4.1-Flash（官方自报）：

| 项目 | V4.1-Flash-1017 | 上一版 V4.1-Flash |
| --- | --- | --- |
| HLE，无工具 | 42.6（纯文本子集 44.0） | 36.8（纯文本子集 39.1） |
| Terminal-Bench 4.0 | 42.3 | 31.2 |
| DeepSWE v1.1 | 77.0 | 74.2 |
| ProgramBench | 29.1 | 20.3 |

Terminal-Bench 4.0 用的是 Claude Code；DeepSWE 用的是 Mini-SWE-V2。对比项是官方自己选的。同一张 HF 表里，Opus 5 在 HLE 无工具（56.3）和 Terminal-Bench 4.0（51.8）上仍更高。和 GLM、Kimi 的同表数字见 [GLM / DeepSeek / Kimi 对照](/zh/compare/glm-vs-deepseek-vs-kimi-2026/)。

旧稿里的 V4-Flash「$0.14/M、82.6% HumanEval」和 V4-Pro「80.6% SWE-bench、75% 折扣到 2026-05-31」在这次打开的官方页上没有出处，已删除。

参数有两个口径，官方没有解释差额。2026-09-10 新闻写 **552B backbone MoE**，输入激活 8B、输出激活 16B。两张 HF 模型卡的模型大小都显示 **763B**。这里只并列，不解释。

权重许可证是 MIT。

## 第三方平台（各自页面，2026-10-18）

价格会变。下面是打开页面时看到的数字，不是官方峰谷价。

| 平台 | 当天核到的 ID | 页面上的价格（USD / 100 万 token） |
| --- | --- | --- |
| DeepSeek 官方 | `deepseek-flash`、`deepseek-v4-pro` | 见上表 |
| OpenRouter | `deepseek/deepseek-v4.1-flash-1017` 和 `deepseek/deepseek-v4.1-flash` 两个页面都在 | 1017 页眉 $0.05 输入 / $0.60 输出，缓存读 $0.008。同页供应商表里 DeepSeek 一行是输入 $0.15、输出 $0.60、缓存读 $0.003。不带 1017 的那页页眉是 $0.0648 / $0.144。各供应商不同 |
| Fireworks | `accounts/fireworks/models/deepseek-v4p1-flash-1017` | serverless：$0.30 输入 / $0.006 缓存输入 / $1.20 输出。上下文写成 1040k。参数栏写 755B，这是 Fireworks 自己的标注，不并进上面的 552B / 763B |
| Together serverless 目录 | `deepseek-ai/DeepSeek-V4.1-Flash`、`deepseek-ai/DeepSeek-V4-Pro-0813` | Flash：$0.30 / $0.006 缓存 / $1.20，上下文 1,000,000。Pro：$1.32 / $0.13 缓存 / $3.96，上下文 1,048,576。目录里没有 1017 快照 |

Together 的 dedicated 目录这次没打开。那里有没有 1017：**未知**。

OpenRouter 旧 slug `deepseek/deepseek-v4` 这次没打开，不沿用 2026-04-29 那篇「页面存在但不可用」的结论。

火山方舟 Coding Plan：2026-10-22 打开了套餐概览、快速开始和模型上线公告。三页都列出 `deepseek-v4.1-flash`。同一天还有 `deepseek-v4.1-flash-economy`，上线公告写与标准版同一套权重。这几页没有写 1017，也没有写 9 月 10 日那一版。对应哪一版快照，仍是**未知**。方舟按量 API 价格页这次没开。

## 发一条官方请求

```bash
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-flash",
    "messages": [
      {"role": "user", "content": "用一句话说明 deepseek-flash 现在指向哪一版。"}
    ],
    "stream": false
  }'
```

要 Pro 就把 `model` 换成 `deepseek-v4-pro`。看图用 `deepseek-flash`，不要用已退役的 `deepseek-v4-flash-vision-exp` 当主 ID。传图方式见 [视觉指南](/zh/guides/deepseek-v4-flash-vision-guide/)。

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["DEEPSEEK_API_KEY"],
    base_url="https://api.deepseek.com",
)

resp = client.chat.completions.create(
    model="deepseek-flash",
    messages=[{"role": "user", "content": "缓存命中和未命中的差价在哪一档？"}],
)
print(resp.choices[0].message.content)
```

官方 changelog 写：DeepSeek Harness **0.2.1-rc.1** 及以上，对新模型体验最好。星标和 preview 状态见 [Harness 入门](/zh/guides/deepseek-harness-intro/)。

## 时间线（只记 changelog 原话）

- **2026-04-24**：API 提供 V4-Pro 与 V4-Flash。
- **2026-07-31**：V4-Flash-0731。changelog 写 official release，同时写 **public beta**，没有写 GA。当时只动 Flash API。
- **2026-08-13**：V4-Pro GA。Responses API。思考力度 low / high / max。并预告峰谷价。
- **2026-08-16 16:00 UTC**：峰谷价生效。
- **2026-08-21**：V4-Flash-Vision-Exp。
- **2026-09-10**：V4.1-Flash，模型名 `deepseek-flash`。新价格 04:00 UTC 生效。旧 Flash 与 Vision-Exp 退役。
- **2026-10-17**：升级到 V4.1-Flash-1017。调用方式和 Flash 价格不变。同日 changelog 开放自研 Search。
