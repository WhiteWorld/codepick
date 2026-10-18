---
title: "GLM-5.3、DeepSeek Flash、Kimi K3：只比同一张官方表上的数字"
description: "2026-10-18 重开 DeepSeek 官方页。旧稿里的「参数未公开」「约 ¥0.5–2/百万 token」「DeepSeek 没有高峰差价」都不成立。GLM 与 Kimi 只采用 DeepSeek 模型卡同表数字，并标明是官方自报、对比项自选。没有同口径的旧跑分已删。"
date: "2026-10-18"
updated_at: "2026-10-18"
article_type: review
tags: [glm, deepseek, kimi, model-comparison, coding, china-model]
pillar: plans
content_status: keep
locale_strategy: mirrored
draft: false
---

核查日 **2026-10-18**。当天重新打开的是 DeepSeek 这边：

- [changelog](https://api-docs.deepseek.com/updates)
- [价格页](https://api-docs.deepseek.com/quick_start/pricing)
- [2026-09-10 新闻](https://api-docs.deepseek.com/news/news260910)
- [DeepSeek-V4.1-Flash-1017](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017)
- [DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash)

智谱和月之暗面自己的价格页、模型卡这次没打开。所以 GLM、Kimi 的月费、参数、以及它们自家公布的 SWE-bench，下面都不写。旧稿那张 HumanEval / MBPP / LiveCodeBench / SWE-bench 表，在这次打开的页面上没有同口径出处，整表删掉。

## 旧问题还在，前提变了

旧稿问的是：图便宜的话，停在 GLM，还是降到 DeepSeek Flash？

那句话默认 Flash 更弱、也没有高峰差价。2026-10-18 的页面不支持这两个前提。

`deepseek-flash` 现在是 **DeepSeek-V4.1-Flash-1017**（2026-10-17 的小版本）。从 **2026-08-16 16:00 UTC** 起，官方 API 有峰谷价，非高峰是高峰的一半。高峰是 UTC 工作日 01:00–04:00 和 06:00–10:00，也就是北京时间 09:00–12:00 和 14:00–18:00，法定节假日除外。

## DeepSeek 现在的价格和规格

官方只标 USD，每 100 万 token。没有「约 ¥0.5–2」这种人民币区间，那句没有官方出处。

| | 非高峰 | 高峰 |
| --- | --- | --- |
| Flash 缓存命中 / 未命中 / 输出 | $0.003 / $0.15 / $0.60 | $0.006 / $0.30 / $1.20 |
| V4-Pro 缓存命中 / 未命中 / 输出 | $0.022 / $0.66 / $1.98 | $0.044 / $1.32 / $3.96 |

上下文 1M，最大输出 384K。Flash 支持视觉，`deepseek-v4-pro`（V4-Pro-0813）不支持。并发上限 Flash 2500，V4-Pro 500。

参数两个口径，官方没解释差额：

- 2026-09-10 新闻：**552B backbone MoE**，输入激活 8B，输出激活 16B。
- 两张 HF 卡的模型大小都显示 **763B**。

V4.1-Flash 模型卡的 base 表把 DeepSeek-V4-Pro-Base 写成 1.6T backbone、激活 49B。价格页没有再写一版「在线的 V4-Pro-0813 就是这个参数量」。在线 Pro 的参数量不把 base 表直接当成 API 规格。

## 同一张表上的官方自报

下面全部来自 DeepSeek-V4.1-Flash-1017 的 HF 卡。DeepSeek 自己测、自己选行，标成**官方自报**。K3 和 GLM-5.3 的格子是这张卡上的数字，不是 2026-10-18 重开智谱或月之暗面页面核对过的。

† 是 HLE 的纯文本子集。Flash-1017 的主分 42.6 和括号里的 44.0† 不是同一个子集。GLM-5.3 那一格只给了 42.0†。所以 HLE 不能把 42.6 和 42.0 直接比大小。

| 项目 | Flash-1017 | 上一版 V4.1-Flash | K3 | GLM-5.3 | Opus 5 |
| --- | --- | --- | --- | --- | --- |
| HLE，无工具 | 42.6（44.0†） | 36.8（39.1†） | 43.5 | 42.0† | 56.3 |
| Terminal-Bench 4.0 | 42.3 | 31.2 | 12.6 | 37.9 | 51.8 |
| DeepSWE v1.1 | 77.0 | 74.2 | 67.5 | 66.9 | 74.0 |
| ProgramBench | 29.1 | 20.3 | 17.5 | 19.0 | 37.0 |
| NL2Repo-Bench | 68.2 | 65.4 | 58.0 | 58.0 | 75.3 |
| Automation-Bench v1.0.6 | 60.5 | 54.8 | 46.7 | 48.8 | 50.3 |
| Agents' Last Exam | 35.4 | 31.8 | 27.6 | 28.5 | 28.6 |
| Apex Bench v1.1 | 72.1 | 64.6 | 47.8 | 56.6 | 65.8 |

Chartography、BabyVision、ZeroBench 这三行，GLM-5.3 是空的，不比。K3 有数：Chartography 68.1（Flash-1017 为 83.0，Opus 5 为 84.0），BabyVision 85.7（92.5 / Opus 5 94.1），ZeroBench 41.0（51.0；Opus 5 为 52.0，GPT-5.6 Sol 为 53.0）。

Terminal-Bench 4.0 的脚注是 Claude Code。DeepSWE v1.1 的脚注是 Mini-SWE-V2。

另外一处对不齐：V4.1-Flash 模型卡的 instruct 表把 NL2Repo-Bench 写成 **64.0**。9 月 10 日 changelog 和 1017 对比表写的是 **65.4**。两处都是官方页面，差额原因未知，不取其中一个当唯一数。

Opus 5 在这张自选表上仍然更高的项：HLE 无工具、Terminal-Bench 4.0、ProgramBench、NL2Repo-Bench、Chartography、BabyVision。Flash-1017 更高的项：DeepSWE v1.1、Automation-Bench、Agents' Last Exam、Apex Bench。这不是「全面超过旗舰闭源模型」。

## 那还要不要「降到 Flash」

不能沿用旧结论。

在 DeepSeek 这张表上，Flash-1017 的 Agent 行多数高于同表的 GLM-5.3 和 K3，不是「略差两三个点的便宜货」。HLE 无工具上，K3 的 43.5 高于 Flash-1017 的 42.6；和 GLM 的 42.0† 不是同一子集。Opus 5 仍领着上面列出的几项。

价钱是另一轴。Flash 官方价是美元峰谷价，不是无高峰差价的按量。工作日白天在北京时间那两段里跑，按高峰付。GLM 和 Kimi 的套餐月费这次没重开，不能拿旧稿的 ¥49 / ¥149 / ¥599 和这张美元表比谁更便宜。

视觉也不再是「只有 Kimi」。`deepseek-flash` 支持视觉，V4-Pro 不支持。Kimi 的视觉是不是仍强于 Flash，两家页面没对照，不写。

所以这题的当前答案是：若只看 DeepSeek 自己的表，Flash-1017 不是 GLM-5.3 或 K3 的降级档。若账单按北京时间工作日白天估算，要把高峰价算进去。套餐月费和自家跑分，等重开智谱、月之暗面的页面再比。
