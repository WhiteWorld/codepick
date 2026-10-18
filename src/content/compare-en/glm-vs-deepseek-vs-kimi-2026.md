---
title: "GLM-5.3, DeepSeek Flash, and Kimi K3: Only Numbers from the Same Official Table"
description: "Rechecked against DeepSeek's pages on 2026-10-18. The old lines — unpublished parameter count, about ¥0.5–2 per million tokens, and no peak-price gap — do not hold. GLM and Kimi appear only as cells on DeepSeek's own card, marked official self-reported and self-selected. Older scores without a shared source are removed."
date: "2026-10-18"
updated_at: "2026-10-18"
article_type: review
tags: [glm, deepseek, kimi, model-comparison, coding, china-model]
pillar: plans
content_status: keep
locale_strategy: mirrored
draft: false
---

Checked on **2026-10-18**. The pages reopened were DeepSeek's:

- [Changelog](https://api-docs.deepseek.com/updates)
- [Pricing](https://api-docs.deepseek.com/quick_start/pricing)
- [News post, 2026-09-10](https://api-docs.deepseek.com/news/news260910)
- [DeepSeek-V4.1-Flash-1017](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017)
- [DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash)

Zhipu's and Moonshot's own pricing pages and model cards were not opened. This update does not quote GLM or Kimi monthly fees, parameter counts, or SWE-bench numbers published by those vendors. The old HumanEval / MBPP / LiveCodeBench / SWE-bench table had no shared source on the pages opened this round. The whole table is gone.

## The old question, with the premise removed

The earlier draft asked: if you want the cheap option, do you stay on GLM or drop to DeepSeek Flash?

That question assumed Flash was the weaker model and that DeepSeek had no peak surcharge. The pages opened on 2026-10-18 do not support either assumption.

`deepseek-flash` is now **DeepSeek-V4.1-Flash-1017**, a minor update on 2026-10-17. Since **16:00 UTC on 2026-08-16**, the official API has peak and off-peak prices. Off-peak is half of peak. Peak hours are weekdays 01:00–04:00 and 06:00–10:00 UTC, which is 09:00–12:00 and 14:00–18:00 Beijing time, excluding Chinese public holidays.

## DeepSeek price and spec, as published

The official page is USD per 1M tokens. There is no CNY range, and no source for the old "about ¥0.5–2 per million tokens."

| | Off-peak | Peak |
| --- | --- | --- |
| Flash cache hit / cache miss / output | $0.003 / $0.15 / $0.60 | $0.006 / $0.30 / $1.20 |
| V4-Pro cache hit / cache miss / output | $0.022 / $0.66 / $1.98 | $0.044 / $1.32 / $3.96 |

Context is 1M. Max output is 384K. Flash supports vision. `deepseek-v4-pro` (V4-Pro-0813) does not. Concurrency limits are 2500 for Flash and 500 for V4-Pro.

Two parameter wordings, and DeepSeek does not explain the gap:

- The 2026-09-10 news post: a **552B MoE backbone**, 8B active on input, 16B active on output.
- Both Hugging Face cards show a model size of **763B**.

The V4.1-Flash card's base-model table lists DeepSeek-V4-Pro-Base at 1.6T backbone parameters and 49B activated. The pricing page does not say the served V4-Pro-0813 has that count. The base-model row is not treated here as the API spec.

## One table, official self-report

Every cell below is from the DeepSeek-V4.1-Flash-1017 Hugging Face card. DeepSeek ran the evals and chose the rows. Mark them **official self-reported**. The K3 and GLM-5.3 cells are that card's numbers. They were not checked against Zhipu or Moonshot pages on 2026-10-18.

The dagger is the text-only subset of HLE. Flash-1017's headline 42.6 and the 44.0† in parentheses are not the same subset. GLM-5.3 is given only as 42.0†. Do not rank 42.6 against 42.0.

| Benchmark | Flash-1017 | Previous V4.1-Flash | K3 | GLM-5.3 | Opus 5 |
| --- | --- | --- | --- | --- | --- |
| HLE, no tools | 42.6 (44.0†) | 36.8 (39.1†) | 43.5 | 42.0† | 56.3 |
| Terminal-Bench 4.0 | 42.3 | 31.2 | 12.6 | 37.9 | 51.8 |
| DeepSWE v1.1 | 77.0 | 74.2 | 67.5 | 66.9 | 74.0 |
| ProgramBench | 29.1 | 20.3 | 17.5 | 19.0 | 37.0 |
| NL2Repo-Bench | 68.2 | 65.4 | 58.0 | 58.0 | 75.3 |
| Automation-Bench v1.0.6 | 60.5 | 54.8 | 46.7 | 48.8 | 50.3 |
| Agents' Last Exam | 35.4 | 31.8 | 27.6 | 28.5 | 28.6 |
| Apex Bench v1.1 | 72.1 | 64.6 | 47.8 | 56.6 | 65.8 |

Chartography, BabyVision, and ZeroBench have no GLM-5.3 cell, so they are not compared. K3 does have cells: Chartography 68.1 (Flash-1017 83.0, Opus 5 84.0), BabyVision 85.7 (92.5, Opus 5 94.1), ZeroBench 41.0 (51.0; Opus 5 52.0, GPT-5.6 Sol 53.0).

The footnote for Terminal-Bench 4.0 is the Claude Code harness. The footnote for DeepSWE v1.1 is Mini-SWE-V2.

One mismatch inside DeepSeek's own pages: the V4.1-Flash instruct table lists NL2Repo-Bench as **64.0**. The 10 September changelog and the 1017 comparison table say **65.4**. Both are official pages. The reason for the gap is unknown. Neither number is picked as the only one.

On this self-selected table, Opus 5 is still higher on HLE without tools, Terminal-Bench 4.0, ProgramBench, NL2Repo-Bench, Chartography, and BabyVision. Flash-1017 is higher on DeepSWE v1.1, Automation-Bench, Agents' Last Exam, and Apex Bench. That is not "ahead of closed flagship models across the board."

## Whether to "drop to Flash"

The old answer does not carry over.

On DeepSeek's table, Flash-1017 is ahead of the GLM-5.3 and K3 cells on most of the agent rows. It is not a slightly worse cheap tier. On HLE without tools, K3's 43.5 is above Flash-1017's 42.6. GLM's 42.0† is a different subset. Opus 5 still leads the rows listed above.

Price is a separate axis. Flash's official price is a USD peak and off-peak schedule, not pay-as-you-go with no peak gap. Daytime agent runs inside the two Beijing windows pay the peak rate. GLM and Kimi monthly fees were not reopened, so the old ¥49 / ¥149 / ¥599 figures are not compared with this USD table.

Vision is also no longer "Kimi only." `deepseek-flash` supports vision. V4-Pro does not. Whether Kimi's vision is still stronger was not checked on both vendors' pages, so it is not claimed.

The current answer to the old question: on DeepSeek's own table, Flash-1017 is not a downgrade from the GLM-5.3 or K3 columns. If the bill is estimated for Beijing weekday daytime, use the peak rate. Subscription prices and each vendor's own scores wait until those pages are opened again.
