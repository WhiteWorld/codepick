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

倍数要分开看。Codex 定价页没有公布 Pro 相对 Plus 的倍数。[chatgpt.com/pricing](https://chatgpt.com/pricing/) 和 [openai.com 定价页](https://openai.com/chatgpt/pricing/) 写的是 Pro「三档用量」，Ultrafast 只在符合条件的档位，页面正文里没有 5× / 10× / 20× / 25×。Help Center《About ChatGPT Pro tiers》的索引仍写两档：$100 为 Plus 的 5 倍，$200 为 20 倍，并称 $200 仍是最高档。这和「三档」冲突。10 倍、25 倍、API 花费减半、存量过渡 credits，下面一律写 **报道称**，不当成官方现行表。

选档按这个口径，不要沿用 8 月的「Pro 20x 是天花板甜点」：

- 用得轻，仍是 Plus。
- 全天跑 Agent、又不想被 5 小时窗口打断：把 Pro $100、新开的 Pro $200、Pro $500 重新放在一起称。报道称新订阅的 $200 大约只有旧 20 倍的一半 API 花费，单位价格可能比 8 月那档更差。$500 多出来的是 Ultrafast，包含额度按 8 倍扣。
- 8 月把 Pro 20x / $200 写成高用量甜点，前提是 20 倍用量再加无限 Voice。定价页已经不这么写。若帮助页的 20 倍对存量用户仍有效，那也只是过渡，不是新订阅的算法。

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

## 对照表：官方页和报道各写了什么

[ChatGPT 定价页](https://chatgpt.com/pricing/)写 Pro 有三档用量，响应速度一栏是「符合条件的档位可用 Ultrafast」。美元价格在我们抓到的正文里没有展开。$20 / $100 / $200 / $500 来自 [Codex Pricing](https://developers.openai.com/codex/pricing)。Pro 目前没有 5 小时上限、只有 $500 含 Astra Ultrafast，也是这页和 [速度页](https://developers.openai.com/codex/agent-configuration/speed) 写的。

[About ChatGPT Pro tiers](https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers) 核对日被 Cloudflare 挡住。检索索引仍返回旧文：Pro $100 比 Plus 高 5 倍，$200 高 20 倍，$200 仍是最高档。它和「三档」对不上，不能单独当成 2026-09-30 的现行倍数，也不能用来否定 $500。这轮报道没有说 $100 这一档被砍，所以 5× 先留在帮助页的表述上。

下表按这个边界写。标了「报道称」的格子，不是 openai.com 或 Pro 帮助页上的原句。

| 档位 | 月费 | Codex / Work 相对 Plus | 备注 |
|------|------|------|------|
| Plus | $20 | 1×，仍有 5 小时窗口 | 官方：Plus 的 5 小时估算在定价页上。1× 是基准，不是帮助页原句 |
| Pro 100 / 5x | $100 | 帮助页仍写约 5× | 这轮报道没有说这一档被砍。定价页未再公布这个倍数 |
| Pro 200（新订阅） | $200 | 报道称约 10×（原先约 20×） | 报道称已重开；按 API 花费大约是旧版一半；定价页写明 Pro 目前没有 5 小时上限。帮助页索引仍写 20× |
| Pro 200（存量过渡） | $200 | 报道称旧额度用到 2026-10-29，其后下调 | 报道称一次性 credits 约 $2,500 / 62,500，年底到期。公开帮助页未确认金额和日期 |
| Pro 500 | $500 | 更高；报道称约 25×，另有 Ultrafast | 官方：个人档里只有这一档含 Ultrafast，包含额度按 8 倍扣。25× 官方页未写 |

Chat 里的 GPT-6 Pro 周上限从 200 条降到 100 条，同样是报道称，不在上表的 Codex / Work 列里。Tibo（Thibault Sottiaux）的原帖这次没有直接打开，「大约一半 API 花费」和「不会把 5 小时上限加回来」都按引述处理。定价页能确认的只是：Pro 目前没有 5 小时上限。

若按报道的 10× 和 25× 做算术，每 1 倍 Plus 大约仍是 $20（$100 ÷ 5、$200 ÷ 10、$500 ÷ 25）。8 月的 $200 若按帮助页的 20× 算，大约是 $10 / 每 1 倍。这个折扣在新订阅上是否还在，官方页没有给出现行倍数，所以不算成已证实。把报道中的 25× 全部花在 Ultrafast 上，标准速度的工作量大约只剩 25 ÷ 8 ≈ 3.1 倍 Plus。这是假设，不是报价。

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

## 算账：不要再把 Pro 20x 写成天花板甜点

8 月的算法很具体。Pro $200 按 20 倍 Plus，每 1 倍大约 $10。Plus 和当时的 Pro 5x 都是大约 $20。所以重度用户先买 $100，周上限老是触顶再加到 $200：多付 $100，用量大约再翻 4 倍，还带无限 Voice。

那笔账的前提已经不在现行定价页上。Pro 不再公布 5 小时消息表，并且没有 5 小时上限。Codex 桌面 Voice 改为 $0.05/分钟，从同一份额度里扣。Chat 定价页仍把 Pro 的 Voice 标成 Unlimited*，脚注写的是 Chat 限额、须合理使用，和 Codex 桌面 Voice 不是同一件事。个人顶档是 $500，Ultrafast 按 8 倍扣包含额度。

报道称新开的 $200 大约是 10 倍而不是 20 倍，API 花费大约是旧版的一半。若这个报道成立，新 $200 的单位价格回到和 Plus 一样，8 月那个折扣没了，它会比旧的 20× 更不划算。帮助页索引若才是对的（仍是 20 倍），折扣还在，但该页同时不承认 $500。两套文本打架时，不把「Pro 20x 是天花板甜点」写成现行结论。

落到选择上：

**用得轻：Plus，$20。** 一周几次专注会话。Astra 的 5–45 条 / 5 小时，一次长任务就可能用掉；Luna 的 350–3,000 条则宽得多。一天写 1–2 小时、且主要用 Luna 或 Sol，Plus 通常够。Go（$8）只覆盖桌面端 Luna，灰度中，没有定价页上的 CLI / IDE / 云端审查。

**全天 Agent、又不想被限额打断：Pro $100、新 Pro $200、Pro $500 放在一起称。** 定价页能确认的共同差异是 Pro 没有 5 小时窗口。倍数要看上面那张表里哪些是报道。

- Pro $100：帮助页仍写约 5×，这轮没有报道说它被砍。它买到的是把一周的量集中用完。产品页列了 Dot；Dot 怎么扣 Codex 额度，定价页没写，不放进这笔账。
- 新开的 Pro $200：报道称约 10×，大约是双倍价钱换双倍于 $100 的用量，不再是 8 月那种「加 $100、用量再翻 4 倍」。只有 $100 的周额度真的打满，才值得上这一档。
- 存量 Pro $200：报道称旧额度保留到 2026-10-29，并有一笔一次性 credits（约 $2,500 / 62,500，年底到期）。金额和日期未在公开帮助页确认。这一个月看 Settings → Usage，再决定留下、降到 $100，还是为 Ultrafast 升到 $500。
- Pro $500：官方多出来的是 Ultrafast。等待 Astra 出 token 已经卡住一天能做完的任务数时，8 倍生成速度才对得上这笔钱。报道称的约 25× 若成立，全程 Ultrafast 大约只相当于 3 倍出头的 Plus 标准速度用量。

**API Key。** 上面那种大约 $3 一次的 Astra 任务，月均明显少于 30 次时，按量往往低于 $100 订阅。波动大、或任务跑在自有框架里，用 Key。云端 GitHub 审查、Slack、Work 不在 Key 上。

## 和 Claude Max、国产方案比

[Claude Max 分析](/zh/guides/claude-max-plan-value-analysis/)写于 2026-08-19。当时两边都是 $100 / $200、5 倍和 20 倍。Codex 这边这个形状已经变了。那篇里的 Claude 价格今天没有重核。模型怎么选，看 [Claude Code vs Codex](/zh/compare/claude-code-vs-codex/)。

国产 Coding Plan（GLM、火山方舟、百炼）月费大约 ¥50–200，人民币支付，国内直连。Codex 要能打开 chatgpt.com，并完成境外支付。站内 `codex-cli` 的 china_friendly 仍是 1/10。人在国内、先看预算的话，从 [GLM-5.3 Coding Plan 评测](/zh/guides/glm-5.3-coding-plan-review/) 和 [GLM vs DeepSeek vs Kimi](/zh/compare/glm-vs-deepseek-vs-kimi-2026/) 读起。

## 适合谁买

**Plus**：用得轻。一周几次，Luna 或 Sol 为主，接受 5 小时窗口。

**全天 Agent**：在 Pro $100、新开的 Pro $200、Pro $500 之间重称。不要默认 Pro 20x / $200 仍是天花板甜点；8 月那笔「20×、大约半价」的账，定价页已经不支持，10× 只是报道称。

**Pro $500**：需要官方写明的 Astra Ultrafast，或更高的周额度。速度和天花板是理由。单位 token 是否更便宜，官方页没有给出 25×，不能当成已证实。

**Business**：需要座席管理和 SSO。定价页把 Standard Business 和 Plus 放在同一张 5 小时估算表里，没有另给更高座席的倍数。

**API Key**：次数波动大，或按 token 控制成本。长上下文会让单次账单从几美元跳到十几美元，先看用量再决定要不要回到订阅。

## 数据来源与复核

- 档位价格、Plus 的 5 小时估算、Pro 无 5 小时上限、Ultrafast 仅 Pro $500、速度扣费倍率、credits 表、Voice $0.05/分钟、GPT-5.5 的下线日：[Codex Pricing](https://developers.openai.com/codex/pricing)，2026-09-30。
- Ultrafast 最多快 8 倍、其他自助方案即使用 credits 也不能开：[Codex Speed](https://developers.openai.com/codex/agent-configuration/speed)，2026-09-30。
- API 标准价与 Ultrafast 价：[API Pricing](https://developers.openai.com/api/docs/pricing)，2026-09-30。API 侧「最多快 8 倍」：[Ultrafast mode](https://developers.openai.com/api/docs/guides/ultrafast-mode)。
- 「三档用量」、Ultrafast 仅符合条件的 Pro 档、Chat 侧 Voice 标 Unlimited*（脚注指 Chat 限额）：[ChatGPT Pricing](https://chatgpt.com/pricing/) 与 [openai.com/chatgpt/pricing](https://openai.com/chatgpt/pricing/)，2026-09-30。抓取正文没有展开各档美元价格。
- 帮助页索引仍为两档 5 倍 / 20 倍，且称 $200 为最高档：[About ChatGPT Pro tiers](https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers)。核对日直接抓取被 Cloudflare 拦截，又超时过一次。
- 报道称，不是官方页原句：新 Pro $200 约 10×、API 花费约旧版一半、存量旧额度到 2026-10-29、一次性 credits 约 $2,500 / 62,500 且年底到期、GPT-6 Pro 每周 200 条降到 100 条、Pro $500 约 25×。来源是 Engadget、The Next Web 及引述 Tibo 的二次报道。原帖和订阅者邮件没有作为一手页面打开。
- 消息数是官方给出的范围，随任务复杂度浮动。购买前以用量面板为准。OpenAI 会改额度和价格。
