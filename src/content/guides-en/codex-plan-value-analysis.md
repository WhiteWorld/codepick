---
title: "Codex Plan Value Analysis (2026): Plus, $100, $200, or $500?"
description: "Recalculated against the official Codex pricing page on 2026-09-30: Plus $20 and Pro at $100, $200, or $500. Pro has no 5-hour window; only $500 includes Astra Ultrafast, which draws included usage at 8x. The old 20x allowance and unlimited Voice are gone from that page. The reported 10x and 25x ratios, and any legacy transition credits, are marked as unverified."
date: "2026-08-19"
updated_at: "2026-09-30"
article_type: review
tags: [codex, chatgpt, openai, pricing, subscription]
pillar: plans
content_status: keep
locale_strategy: mirrored
draft: false
---

## Bottom Line

The 2026-08-19 version treated **Pro $200** as the high-usage sweet spot because it was sold as 20x Plus: about half the price per unit of usage, plus unlimited Voice. Neither of those claims is on the official pricing page opened on 2026-09-30.

What that page does say: personal Pro is three prices, $100, $200, and $500. Pro has no five-hour window. Plus still does. Among personal plans, only Pro $500 includes GPT-6 Astra Ultrafast, and Ultrafast draws included usage at 8x the Standard rate. Desktop Voice now spends the same Codex budget at $0.05 per minute.

Multipliers have to be split by source. The Codex pricing page does not publish a Pro-versus-Plus ratio. [chatgpt.com/pricing](https://chatgpt.com/pricing/) and the [OpenAI pricing page](https://openai.com/chatgpt/pricing/) say Pro is "your choice of 3 usage tiers," with Ultrafast on eligible tiers. The text we extracted has no 5× / 10× / 20× / 25×. The Help Center index for "About ChatGPT Pro tiers" still describes two tiers: $100 at 5× Plus, $200 at 20× Plus, and $200 as the highest tier. That conflicts with three tiers. The 10× and 25× ratios, the "about half the API spend" line, and legacy transition credits are marked **reported** below. They are not treated as the current official table.

Choose from that split. Do not carry forward the August line that Pro 20x is the ceiling sweet spot:

- Light use stays on Plus.
- All-day agent work, if you do not want the five-hour window in the way: weigh Pro $100, newly opened Pro $200, and Pro $500 against each other. Reports say a new $200 subscription is about half the old 20× plan's API spend, so the unit price may be worse than the August tier. What $500 adds on the official pages is Ultrafast, which draws included usage at 8×.
- The August article called Pro 20x / $200 the high-usage sweet spot because it assumed 20× usage plus unlimited Voice. The pricing page no longer says that. If the help article's 20× still applies to existing subscribers, that is a transition, not the math for a new subscription.

---

## Plan Structure (verified 2026-09-30)

Codex and ChatGPT Work share one allowance, attached to the ChatGPT subscription. Prices and differences below are from [Codex Pricing](https://developers.openai.com/codex/pricing) as opened on 2026-09-30.

| Tier | Monthly | What the pricing page states |
|------|------|------|
| Free | $0 | GPT-6 Luna at Standard speed in the desktop app, subject to rollout |
| Go | $8 | Lightweight coding; same desktop Luna at Standard speed |
| Plus | $20 | Web, CLI, IDE, and iOS; cloud code review and Slack; GPT-6 Sol and Luna; credits can extend usage |
| Pro | $100 / $200 / $500 | Includes Plus. Pro currently has no five-hour limit. Only $500 includes Astra Ultrafast |
| Business | per seat | Admin controls and SSO; no training on business data by default. Standard seats use the same five-hour estimates as Plus |
| API Key | usage-based | CLI, SDK, and IDE. No cloud review, Slack, and similar features. Billed at API rates |

GPT-5.5 retires from ChatGPT, ChatGPT Work, and Codex on 2026-10-14. The OpenAI API is not part of that retirement.

## How Usage Works: Plus Still Has a 5-Hour Estimate, Pro Does Not

The pricing page publishes local-message estimates only for Plus and Standard Business, per five-hour period, and says they are not fixed message counts. Cloud tasks can use more of the allowance. Weekly limits may also apply. The Pro rows are gone. The replacement sentence is that Pro plans currently have no five-hour limit.

| Model | Plus / Standard Business: local messages / 5 hours |
|------|------|
| GPT-6 Astra | 5–45 |
| GPT-6.1 Sol | 15–160 |
| GPT-6 Sol | 15–150 |
| GPT-6 Luna | 350–3,000 |

Do not keep using the 2026-08-19 "Plus / Pro 5x / Pro 20x" message table. The GPT-5.6 Sol line of "10–100 on Plus" has been replaced by the GPT-6 ranges above.

On that Plus table, Luna's estimate is on the order of several dozen times Astra's. Routine edits on Luna or Sol, and Astra only for the hard task, make a five-hour window last much longer.

Speed modes have a separate billing multiplier. OpenAI says these multipliers describe how fast the allowance is consumed, not how fast tokens are generated.

| Mode | Included subscription usage | Purchased credits and Enterprise pay-as-you-go |
|------|------|------|
| Fast | 2.5x | 2x |
| GPT-6 Astra Ultrafast | 8x | 6x |

Generation speed is a different sentence. [Codex Speed](https://developers.openai.com/codex/agent-configuration/speed) says Ultrafast generates tokens up to 8x faster than GPT-6 Astra in Standard mode in Codex. On personal plans it is Pro $500 only, plus eligible Enterprise and Edu plans. Other self-serve plans do not get it at launch, even with purchased credits. On Pro $500, Ultrafast uses included usage first, then credits at the 6x rate.

API prices are separate. Standard short-context rates (≤272K input tokens), per 1M tokens, input/output: GPT-6 Astra $10 / $50, GPT-6 Sol and GPT-6.1 Sol $2 / $10, GPT-6 Luna $0.10 / $0.50. Ultrafast on that page is Astra only: $60 / $300, which is 6x Standard. The API docs say Ultrafast is up to 8x faster. Codex with your own API key follows API prices, not the subscription multipliers above.

## Comparison Table: Official Pages and What Is Only Reported

The [ChatGPT pricing page](https://chatgpt.com/pricing/) says Pro has three usage tiers, and the response-time row is "Ultrafast (on eligible tiers)." Dollar amounts were not in the text we extracted. The $20 / $100 / $200 / $500 figures are from [Codex Pricing](https://developers.openai.com/codex/pricing). "Pro currently has no five-hour limit" and "only $500 includes Astra Ultrafast" are that page plus the [speed page](https://developers.openai.com/codex/agent-configuration/speed).

[About ChatGPT Pro tiers](https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers) was blocked by Cloudflare on the review date, and a later fetch timed out. The search index still returns the older article: Pro $100 is 5× Plus, $200 is 20× Plus, and $200 remains the highest tier. That does not match three tiers. It is not, by itself, the 2026-09-30 multiplier, and it cannot be used to deny that $500 exists. Reports this round did not say the $100 tier was cut, so 5× stays attached to what the help article still says.

Cells marked "reported" are not sentences from openai.com or the Pro help article.

| Tier | Monthly | Codex / Work vs Plus | Notes |
|------|------|------|------|
| Plus | $20 | 1×, and it still has a 5-hour window | Official: Plus five-hour estimates are on the pricing page. 1× is the baseline, not a help-article sentence |
| Pro 100 / 5x | $100 | Help article still says about 5× | No report of a cut to this tier in this round. The pricing page does not republish the multiplier |
| Pro 200 (new subs) | $200 | Reported ~10× (was ~20×) | Reported: reopened; API-spend equivalent about half the old plan. Official: Pro currently has no five-hour limit. The help-article index still says 20× |
| Pro 200 (legacy transition) | $200 | Reported: old allowance through 2026-10-29, then reduced | Reported one-time credits of about $2,500 / 62,500, expiring at year end. Amount and date were not on a public help page we could open |
| Pro 500 | $500 | Higher; reported ~25×, plus Ultrafast | Official: the only personal tier with Ultrafast, and included usage bills at 8×. 25× is not on an official page |

GPT-6 Pro in Chat falling from 200 messages a week to 100 is also reported. It is not in the Codex / Work column. Tibo's (Thibault Sottiaux) original post was not opened. "About half the API spend" and "the five-hour limit is not coming back" are quotations from secondary coverage. The pricing page only confirms that Pro currently has no five-hour limit.

If the reported 10× and 25× ratios are used as arithmetic, each 1× of Plus is still about $20 ($100 ÷ 5, $200 ÷ 10, $500 ÷ 25). August's $200 at the help article's 20× was about $10 per 1×. Whether that discount still exists for a new subscription is not settled by an official multiplier, so it is not treated as confirmed. Spending a reported 25× allowance entirely in Ultrafast leaves about 25 ÷ 8 ≈ 3.1× Plus of Standard-speed work. That is an assumption, not a rate card.

## Credits: What One Task Costs

After a limit, Plus and Pro can buy credits, switch to a smaller model, or run extra local chats on an API key at standard API rates. An in-progress turn can usually finish, subject to fair-use limits.

Standard-speed credits per 1M tokens, from the pricing page on 2026-09-30:

| Model | Input | Cached input | Output |
|------|------|---------|------|
| GPT-6 Astra | 250 | 25 | 1,250 |
| GPT-6.1 Sol | 50 | 2.5 | 250 |
| GPT-6 Sol | 50 | 5 | 250 |
| GPT-6 Luna | 2.5 | 0.25 | 12.5 |
| GPT-5.6 Sol | 100 | 10 | 500 |
| GPT-5.6 Terra | 50 | 5 | 300 |
| GPT-5.6 Luna | 5 | 0.5 | 30 |

OpenAI says a typical GPT-5.6 Sol task may use 5–30 credits. The August wording ("GPT-5.6 averages 5–40 credits per message") and the Sol row of 125 / 750 credits are not this table. GPT-5.6 Sol's promotional pricing runs at least through 2026-11-21. Codex credit billing has no separate cache-write charge. API prices do.

Lined up against Standard API prices, these rows work out to about $0.04 per credit. Astra's 250 credits match $10 of input, and 1,250 credits match $50 of output. That is two official tables agreeing with each other, not a published redemption rate. The checkout price for credits is whatever the payment page charges.

Take one short-context task. GPT-6 Astra, 200K input tokens and 20K output tokens:

- Standard API: 0.2 × $10 + 0.02 × $50 = **$3**.
- Credits: 0.2 × 250 + 0.02 × 1,250 = **75 credits**. At the $0.04 observation above, that is also $3.
- The same task on Ultrafast is 0.2 × $60 + 0.02 × $300 = **$18** on the API. Against included subscription usage it bills at 8x, about eight Standard runs of the same shape.

Twenty such Astra tasks in a month are about $60 on the API, under Pro $100, without cloud review or Work. Forty are about $120, in the same range as the $100 plan. Whether the subscription is cheaper depends on how many API dollars the included allowance represents. The pricing page says not to estimate included tasks from API token prices. Tibo's "about half" compares the old and new $200 plans. It does not state an absolute dollar amount.

The same 200K in and 20K out on GPT-6 Luna is 0.2 × $0.10 + 0.02 × $0.50 = $0.03 at Standard API rates. Edits that Luna can finish should not be run on Astra. If context grows from 200K to 1M, Astra input alone is 1.0 × $10 = $10, and the task is no longer a $3 bill.

## Running the Numbers: Do Not Treat Pro 20x as the Ceiling Sweet Spot

The August math was specific. Pro $200 at 20× Plus was about $10 per 1×. Plus and the Pro 5× tier of that month were about $20 per 1×. Heavy users started at $100 and stepped up to $200 when the weekly cap kept hitting: another $100, about 4× the usage, and unlimited Voice.

That premise is not on the current pricing page. Pro no longer publishes a five-hour message table, and it has no five-hour cap. Codex desktop Voice is $0.05 per minute against the same allowance. The ChatGPT pricing page still marks Pro Voice as Unlimited*, with a footnote that this refers to Chat limits and reasonable use. That is not the same meter as Codex desktop Voice. The personal top tier is $500, and Ultrafast draws included usage at 8×.

Reports say a newly opened $200 plan is about 10× rather than 20×, and about half the old plan's API spend. If that report is right, the new $200 tier is back to Plus's unit price, the August discount is gone, and it is worse value than the old 20× plan. If the help-article index is the text still in force (still 20×), the discount survives, but that article does not acknowledge $500. While those texts disagree, this guide does not state "Pro 20x is the ceiling sweet spot" as a current conclusion.

How that lands:

**Light use: Plus, $20.** A few focused sessions a week. Astra's 5–45 local messages per five hours can disappear in one long task. Luna's 350–3,000 is much wider. One or two hours a day, mostly on Luna or Sol, generally fits. Go ($8) is desktop Luna only, still in rollout, without the CLI, IDE, or cloud review listed for Plus.

**All-day agents, if you do not want the rate window in the way: weigh Pro $100, new Pro $200, and Pro $500 together.** The shared difference the pricing page confirms is that Pro has no five-hour window. Which multiplier applies is in the table above, and several of those cells are reported.

- Pro $100: the help article still says about 5×, and this round of reports did not describe a cut. What you add is the ability to spend the week's allowance in a burst. The product page lists Dot. The pricing page does not say how Dot draws on the Codex allowance, so Dot stays out of this calculation.
- New Pro $200: reported at about 10×, which is about twice the price of $100 for about twice the usage, not the August step of "another $100 for about 4× the usage." It is worth it when the $100 weekly allowance actually runs out.
- Legacy Pro $200: reports say the old allowance lasts through 2026-10-29, plus a one-time credit grant (about $2,500 / 62,500, expiring at year end). Amount and date were not confirmed on a public help page. Read Settings → Usage this month before staying, dropping to $100, or moving to $500 for Ultrafast.
- Pro $500: the official extra is Ultrafast. It matches the fee when waiting on Astra tokens is what limits the work you finish in a day, and the up-to-8× generation speed fits that bottleneck. If the reported ~25× holds, an all-Ultrafast month is only a bit over 3× Plus at Standard speed.

**API key.** The roughly $3 Astra task above stays under the $100 subscription when you run clearly fewer than about 30 of them a month. Use a key when volume swings, or when the agent already runs in your own framework. Cloud GitHub review, Slack, and Work are not on the key.

## Compared with Claude Max and Domestic Plans

The [Claude Max analysis](/en/guides/claude-max-plan-value-analysis/) is from 2026-08-19, when both products were $100 / $200 plans at 5x and 20x. That shape no longer describes Codex. Claude's own prices in that article were not re-checked today. For the model choice, see [Claude Code vs Codex](/en/compare/claude-code-vs-codex/).

Domestic coding plans (GLM, Volcengine Ark, Bailian) are typically ¥50–200 a month, payable in RMB, with direct access inside China. Codex needs chatgpt.com and an international payment method. The site's `codex-cli` score for china_friendly is still 1/10. If you are in mainland China and the budget comes first, start with the [GLM-5.3 Coding Plan review](/en/guides/glm-5.3-coding-plan-review/) and the [GLM vs DeepSeek vs Kimi comparison](/en/compare/glm-vs-deepseek-vs-kimi-2026/).

## Who Should Buy

**Plus**: light use. A few sessions a week, mostly Luna or Sol, and a five-hour window is acceptable.

**All-day agents**: weigh Pro $100, newly opened Pro $200, and Pro $500. Do not treat Pro 20x / $200 as the ceiling sweet spot. The August "20× at about half the unit price" math is not what the pricing page says now, and 10× is reported, not official.

**Pro $500**: you need Astra Ultrafast, which the official pages do name, or a higher weekly ceiling. Speed and ceiling are the reasons. Whether the token price is lower depends on a 25× ratio the official pages do not state.

**Business**: you need seat admin and SSO. The pricing page puts Standard Business on the same five-hour estimate table as Plus. It does not publish a multiplier for a higher seat.

**API key**: volume swings, or you want per-token cost control. A long context can move one task from a few dollars to the tens. Check a week of usage before going back to a subscription.

## Sources and Review Dates

- Tier prices, Plus five-hour estimates, no five-hour limit on Pro, Ultrafast only on Pro $500, speed billing multipliers, the credits table, Voice at $0.05/minute, and the GPT-5.5 retirement date: [Codex Pricing](https://developers.openai.com/codex/pricing), 2026-09-30.
- Ultrafast up to 8x faster, and no Ultrafast on other self-serve plans even with credits: [Codex Speed](https://developers.openai.com/codex/agent-configuration/speed), 2026-09-30.
- Standard and Ultrafast API prices: [API Pricing](https://developers.openai.com/api/docs/pricing), 2026-09-30. The API "up to 8x faster" line: [Ultrafast mode](https://developers.openai.com/api/docs/guides/ultrafast-mode).
- "Three usage tiers," Ultrafast on eligible Pro tiers, and Pro Voice marked Unlimited* with a footnote that points at Chat limits: [ChatGPT Pricing](https://chatgpt.com/pricing/) and [openai.com/chatgpt/pricing](https://openai.com/chatgpt/pricing/), 2026-09-30. The extracted text did not include per-tier dollar prices.
- Help Center index still describing two tiers at 5× and 20×, and calling $200 the highest tier: [About ChatGPT Pro tiers](https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers). Direct fetch was blocked by Cloudflare, and a later attempt timed out.
- Reported, not quoted from an official page: new Pro $200 at about 10×, API spend about half the old plan, legacy allowance through 2026-10-29, one-time credits of about $2,500 / 62,500 expiring at year end, GPT-6 Pro from 200 to 100 messages a week, and Pro $500 at about 25×. Sources are Engadget, The Next Web, and secondary write-ups quoting Tibo. The original post and subscriber emails were not opened as primary pages.
- Message counts are official ranges and move with task complexity. Check the usage dashboard before buying. OpenAI changes allowances and prices.
