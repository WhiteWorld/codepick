---
title: "Codex 套餐性价比分析（2026）：Plus、$100、$200 还是 $500"
description: "按 2026-09-30 的官方定价页重算 Codex 订阅：Plus $20、Pro $100/$200/$500。Pro 已无 5 小时窗口，只有 $500 含 Astra Ultrafast（包含额度按 8 倍扣）。20 倍用量和无限 Voice 已不在现行页上；10 倍、25 倍与过渡 credits 只按报道标注。"
date: "2026-08-19"
updated_at: "2026-09-30"
article_type: review
tags: [codex, chatgpt, openai, pricing, subscription]
pillar: plans
content_status: keep
locale_strategy: mirrored
draft: false
---

## 先说结论

2026-08-19 那版把 **Pro $200** 当成高用量甜点，依据是当时的 20 倍 Plus：同样一份用量大约半价，外加无限 Voice。这两条在 2026-09-30 打开的官方定价页上都不成立。

现在能确认的是：个人 Pro 有三档，$100、$200、$500。Pro 没有 5 小时窗口，Plus 还有。个人方案里只有 Pro $500 能开 GPT-6 Astra Ultrafast，包含额度按标准速度的 8 倍扣。桌面 Voice 改成按分钟扣同一份额度，标价 $0.05/分钟。

倍数表定价页没有公布。Help Center 索引里的《About ChatGPT Pro tiers》仍写两档（$100 = 5 倍，$200 = 20 倍，且 $200 是最高档），和定价页、以及产品页上的「三档用量」对不上。二次报道说重开的 $200 按 API 花费大约只有旧版一半，Work/Codex 从约 20 倍降到约 10 倍，存量大约 2026-10-30 生效；Pro $500 约 25 倍。这些倍数下面都标成假设。

在这个假设下，Plus、$100、$200、$500 的单位价格都回到大约 **$20 / 每 1 倍 Plus**。旧的 $200 折扣（大约 $10 / 每 1 倍）没了。

所以日常甜点从 $200 挪到 **Pro $100**。它买的是「没有 5 小时窗口」，不是更便宜的 token。$200 只在 $100 的周额度经常打满时才有意义。$500 是速度档：全程 Ultrafast 会把包含额度打成大约八分之一，不该按「更多 token」来买。

一周只做几次会话，留在 Plus。次数忽高忽低，先用文中的 API 例子算一笔，再决定包不包月。

---

## 套餐结构（官方 2026-09-30 核对）

Codex 和 ChatGPT Work 共用额度，跟着 ChatGPT 订阅走。下表价格和差异来自 [Codex Pricing](https://developers.openai.com/codex/pricing)，2026-09-30 打开的页面。

| 档位 | 月费 | 定价页写明的内容 |
|------|------|------|
| Free | $0 | 桌面端 GPT-6 Luna，标准速度，随灰度开放 |
| Go | $8 | 轻量编码；同样是桌面端 Luna，标准速度 |
| Plus | $20 | 网页、CLI、IDE、iOS；云端代码审查和 Slack；GPT-6 Sol 与 Luna；可另买 credits |
| Pro | $100 / $200 / $500 | 含 Plus。Pro 目前没有 5 小时上限。只有 $500 含 Astra Ultrafast |
| Business | 按座席 | 管理控制台、SSO；默认不用业务数据训练。Standard 座席的 5 小时估算与 Plus 相同 |
| API Key | 按量 | CLI、SDK、IDE。没有云端审查、Slack 等。按 API 价计 |

GPT-5.5 将于 2026-10-14 从 ChatGPT、ChatGPT Work 和 Codex 下线。OpenAI API 不受这一天影响。

## 用量怎么扣：Plus 仍按 5 小时估算，Pro 不按

定价页只给了 Plus 和 Standard Business 的本地消息估算，单位是 5 小时，并写明这不是固定条数。云端任务可能更费。每周上限仍可能另算。Pro 的行被拿掉了，替换说明是：Pro 目前没有 5 小时上限。

| 模型 | Plus / Standard Business：本地消息 / 5 小时 |
|------|------|
| GPT-6 Astra | 5–45 |
| GPT-6.1 Sol | 15–160 |
| GPT-6 Sol | 15–150 |
| GPT-6 Luna | 350–3,000 |

2026-08-19 那张「Plus / Pro 5x / Pro 20x」消息表不要再当现行规则用。里面的 GPT-5.6 Sol「Plus 10–100 条」也已经被上面的 GPT-6 区间换掉。

同一张 Plus 表里，Luna 的估算大约是 Astra 的几十倍。日常改动用 Luna 或 Sol，Astra 留给真正难的任务，5 小时窗口会耐用很多。

速度模式另有扣费倍率。官方写明：倍率说的是扣多少额度，不是快多少倍。

| 模式 | 包含的订阅额度 | 已购 credits、企业按量 |
|------|------|------|
| Fast | 2.5 倍 | 2 倍 |
| GPT-6 Astra Ultrafast | 8 倍 | 6 倍 |

生成速度是另一句话：[Codex Speed](https://developers.openai.com/codex/agent-configuration/speed) 写，Ultrafast 在 Codex 里生成 token，最多比标准模式的 GPT-6 Astra 快 8 倍。个人方案里它只在 Pro $500，以及符合条件的 Enterprise / Edu。其他自助方案即使用 credits 也不能开。$500 先扣包含额度，用完再扣 credits，credits 侧是 6 倍。

API 是分开的价目。短上下文（≤272K 输入）标准价，每百万 token 输入/输出：GPT-6 Astra $10 / $50，GPT-6 Sol 与 GPT-6.1 Sol $2 / $10，GPT-6 Luna $0.10 / $0.50。同一页的 Ultrafast 只有 Astra：$60 / $300，正好是标准价的 6 倍。API 文档写 Ultrafast 最多快 8 倍。用自己的 API Key 跑 Codex 时，不走上面的订阅倍率。

## 倍数：官方页互相冲突的地方

定价页、帮助页和报道没有合成一张表。核对日能分开的事实是这些：

[ChatGPT Pro 产品页](https://chatgpt.com/plans/pro/)写的是三档用量。定价页列出 $100、$200、$500，并单独点名 Ultrafast 在 $500。

[About ChatGPT Pro tiers](https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers) 的检索索引仍返回旧结构：Pro $100 比 Plus 高 5 倍用量，Pro $200 高 20 倍，且 $200 仍是最高档。核对日直接打开该页被 Cloudflare 挡住，所以这是索引正文，不是我们在浏览器里重读的全文。它和产品页冲突，不能单独当成 2026-09-30 的现行规则，也不能据此否定 $500。

二次来源（Engadget、The Next Web，以及引述 Codex 负责人 Thibault Sottiaux / Tibo 的转载）补充了定价页没写的句子：重开的 Pro $200，按 API 花费折算大约是旧版的一半；不会把 5 小时上限加回来；Work 与 Codex 从约 20 倍 Plus 降到约 10 倍，新订阅立即生效，存量大约用到 2026-10-29，2026-10-30 起改新额度；Chat 里的 GPT-6 Pro 从每周 200 条降到 100 条。Tibo 的原帖这次没有直接打开。

Pro $500「约 25 倍 Plus」出现在二次报道里。英文 DevDay 回顾页这次抓取超时。我们读到的 [速度页](https://developers.openai.com/codex/agent-configuration/speed) 确认的是最多快 8 倍，以及包含额度按 8 倍扣，没有写 25 倍。

存量订阅的过渡 credits：论坛和二次报道转述了一封邮件，里面有一笔一次性额度。金额和到期日没有出现在我们打开的公开帮助页上。这里不写具体数字。以账号里的 Settings → Usage 和 OpenAI 邮件为准。

若把报道倍数当成算术假设，每 1 倍 Plus 的月费如下。这不是报价。

| 档位 | 月费 | 假设的相对 Plus | 每 1 倍 Plus |
|------|------|------|------|
| Plus | $20 | 1 倍 | $20 |
| Pro $100 | $100 | 5 倍（帮助页仍如此写；报道未改这一档） | $20 |
| Pro $200 | $200 | 10 倍（报道）。帮助页索引仍写 20 倍 | 按 10 倍是 $20；若 20 倍仍有效则是 $10 |
| Pro $500 | $500 | 25 倍（仅报道，定价页未写） | 按 25 倍是 $20 |

在 25 倍这个假设下，把 $500 的额度全部花在 Ultrafast 上，标准速度的工作量大约只剩 25 ÷ 8 ≈ 3.1 倍 Plus。$500 买到的是出 token 的速度和更高的天花板。

## credits：一次任务大概多少钱

撞上限之后，Plus 和 Pro 可以买 credits 继续，也可以换更小的模型，或用 API Key 另开本地会话，按标准 API 价计。进行中的那一轮通常还能做完，受公平使用限制。

标准速度的 credits，每百万 token，2026-09-30 定价页：

| 模型 | 输入 | 缓存输入 | 输出 |
|------|------|---------|------|
| GPT-6 Astra | 250 | 25 | 1,250 |
| GPT-6.1 Sol | 50 | 2.5 | 250 |
| GPT-6 Sol | 50 | 5 | 250 |
| GPT-6 Luna | 2.5 | 0.25 | 12.5 |
| GPT-5.6 Sol | 100 | 10 | 500 |
| GPT-5.6 Terra | 50 | 5 | 300 |
| GPT-5.6 Luna | 5 | 0.5 | 30 |

官方写：一次典型的 GPT-5.6 Sol 任务大约 5–30 credits。8 月文里的「GPT-5.6 平均每条 5–40 credits」和 Sol 的 125 / 750 那一行，已经不是这张表。GPT-5.6 Sol 的促销价至少维持到 2026-11-21。Codex 的 credits 没有单独的 cache-write 一项；API 价目有。

把 credits 和标准 API 价并排，这几行大约是 1 credit = $0.04。例如 Astra 的 250 credits 对上 $10 输入，1,250 credits 对上 $50 输出。这是两张官方表对得上，不是 OpenAI 写明的兑换价。结账时 credits 卖多少钱，以付款页为准。

用一个短上下文任务做例子。GPT-6 Astra，20 万输入 token、2 万输出 token：

- 标准 API：0.2 × $10 + 0.02 × $50 = **$3**。
- credits：0.2 × 250 + 0.02 × 1,250 = **75 credits**。按上面的 $0.04 观察值，也是 $3。
- 同一任务开 Ultrafast，API 是 0.2 × $60 + 0.02 × $300 = **$18**。若扣的是订阅包含额度，则按 8 倍计，大约相当于 8 次标准速度的同类任务。

一个月 20 次这种 Astra 任务，API 大约 $60，低于 Pro $100，但没有云端审查和 Work。40 次大约 $120，和 $100 订阅同一量级。订阅是否更省，取决于包含额度折成多少 API 美元。定价页写明：不要用 API token 价去估算包含了多少次任务。Tibo 的「大约一半」只比较了新旧两版 $200，没有给出绝对金额。

同样的 20 万输入加 2 万输出，换成 GPT-6 Luna，标准 API 是 0.2 × $0.10 + 0.02 × $0.50 = $0.03。能用 Luna 做完的修改，不该开 Astra。上下文一旦从 20 万涨到 100 万，Astra 光输入就是 1.0 × $10 = $10，任务账单不再是 $3。

## 算账：为什么甜点离开了 $200

8 月的算法很具体。Pro $200 按 20 倍 Plus，每 1 倍大约 $10。Plus 和 Pro $100 都是大约 $20。所以重度用户先买 $100，周上限老是触顶再加到 $200：多付 $100，用量大约再翻 4 倍，还带无限 Voice。

9 月 30 日能改写这个算法的，是已经写在定价页上的变化，加上必须标成假设的倍数：

Pro 不再公布 5 小时消息表，并且没有 5 小时上限。$200 不再把无限 Voice 写进档位说明。个人顶档变成 $500，Ultrafast 按 8 倍扣包含额度。若报道中的 10 倍成立，$200 的单位价格回到和 Plus 一样，8 月那个折扣消失。若帮助页的 20 倍才是对的，折扣还在，但该页同时不承认 $500，和正在售卖的产品页冲突。在两套官方文本打架时，本文不把 20 倍写成现行事实。

落到选择上：

**Plus，$20。** 一周几次专注会话。Astra 的 5–45 条 / 5 小时，一次长任务就可能用掉；Luna 的 350–3,000 条则宽得多。一天写 1–2 小时、且主要用 Luna 或 Sol，Plus 通常够。Go（$8）只覆盖桌面端 Luna，灰度中，没有定价页上的 CLI / IDE / 云端审查。

**Pro $100。** Codex 已经是每天的工具，Plus 的 5 小时窗口经常先断，但一周的总量还没到必须再翻一倍。在 5 倍假设下，它和 Plus 的单位价格相同。多出来的是：可以把一周的量集中在某几天用完，以及 Pro 才有的 Chat 能力。产品页还列了 Dot；Dot 怎么扣 Codex 额度，定价页没写，不放进这笔账。

**Pro $200。** 只在 $100 的周额度经常打满时考虑。不要按 8 月的「20 倍 + 无限 Voice」买。新订阅若已经按报道中的 10 倍计，它相对 $100 是线性加量：大约双倍价钱、双倍用量。存量用户在 2026-10-30 之前可能仍是旧额度，这一个月看用量面板再决定留或降。

**Pro $500。** 两种情况才值。一是 Astra 出 token 的等待已经卡住你一天能做完的任务数，而 Ultrafast 的 8 倍生成速度对得上这个瓶颈。二是 $200 的周额度仍然不够，你需要更高的天花板，并且接受 Ultrafast 会更快吃完额度。若 25 倍假设成立，全程 Ultrafast 大约只相当于 3 倍出头的 Plus 标准速度用量，单位成本明显高于 $100。

**API Key。** 上面那种大约 $3 一次的 Astra 任务，月均明显少于 30 次时，按量往往低于 $100 订阅。波动大、或任务跑在自有框架里，用 Key。云端 GitHub 审查、Slack、Work 不在 Key 上。

## 和 Claude Max、国产方案比

[Claude Max 分析](/zh/guides/claude-max-plan-value-analysis/)写于 2026-08-19。当时两边都是 $100 / $200、5 倍和 20 倍。Codex 这边这个形状已经变了。那篇里的 Claude 价格今天没有重核。模型怎么选，看 [Claude Code vs Codex](/zh/compare/claude-code-vs-codex/)。

国产 Coding Plan（GLM、火山方舟、百炼）月费大约 ¥50–200，人民币支付，国内直连。Codex 要能打开 chatgpt.com，并完成境外支付。站内 `codex-cli` 的 china_friendly 仍是 1/10。人在国内、先看预算的话，从 [GLM-5.3 Coding Plan 评测](/zh/guides/glm-5.3-coding-plan-review/) 和 [GLM vs DeepSeek vs Kimi](/zh/compare/glm-vs-deepseek-vs-kimi-2026/) 读起。

## 适合谁买

**Plus**：一周几次，Luna 或 Sol 为主，接受 5 小时窗口。

**Pro $100**：每天用 Codex，Plus 的 5 小时窗口经常先断，周总量还没迫使你再买一倍用量。

**Pro $200**：已经在 $100 上打满周额度。按现行定价页，它不是半价额度，也不是无限 Voice。

**Pro $500**：需要 Astra Ultrafast，或 $200 的周额度仍不够。理由是速度或天花板，不是更低的单位 token 价格。

**Business**：需要座席管理和 SSO。定价页把 Standard Business 和 Plus 放在同一张 5 小时估算表里，没有另给更高座席的倍数。

**API Key**：次数波动大，或按 token 控制成本。长上下文会让单次账单从几美元跳到十几美元，先看用量再决定要不要回到订阅。

## 数据来源与复核

- 档位价格、Plus 的 5 小时估算、Pro 无 5 小时上限、Ultrafast 仅 Pro $500、速度扣费倍率、credits 表、Voice $0.05/分钟、GPT-5.5 的下线日：[Codex Pricing](https://developers.openai.com/codex/pricing)，2026-09-30。
- Ultrafast 最多快 8 倍、其他自助方案即使用 credits 也不能开：[Codex Speed](https://developers.openai.com/codex/agent-configuration/speed)，2026-09-30。
- API 标准价与 Ultrafast 价：[API Pricing](https://developers.openai.com/api/docs/pricing)，2026-09-30。API 侧「最多快 8 倍」：[Ultrafast mode](https://developers.openai.com/api/docs/guides/ultrafast-mode)。
- 「三档用量」的产品表述：[ChatGPT Pro](https://chatgpt.com/plans/pro/)，2026-09-30。
- 帮助页索引仍为两档 5 倍 / 20 倍：[About ChatGPT Pro tiers](https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers)。核对日直接抓取被 Cloudflare 拦截。
- 约 10 倍、约 2026-10-30 生效、GPT-6 Pro 每周 200 条降到 100 条、Tibo「大约一半 API 花费」、Pro $500 约 25 倍：Engadget、The Next Web 及引述 Tibo 的二次报道。原帖和订阅者邮件没有作为一手页面打开。过渡 credits 的金额与到期日未在公开帮助页确认，本文不引用具体数字。
- 消息数是官方给出的范围，随任务复杂度浮动。购买前以用量面板为准。OpenAI 会改额度和价格。
