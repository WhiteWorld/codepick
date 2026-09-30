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

The pricing page does not publish usage multipliers. The indexed Help Center article "About ChatGPT Pro tiers" still describes two tiers ($100 = 5x Plus, $200 = 20x Plus, and $200 as the top tier). That conflicts with the pricing page and with the product page's "three usage tiers." Secondary reports say the reopened $200 plan is about half the old plan's API-spend equivalent, with ChatGPT Work and Codex falling from about 20x Plus to about 10x, effective around 2026-10-30 for existing subscribers, and Pro $500 at about 25x. Those ratios are assumptions below, not a current official table.

Under that assumption, Plus, $100, $200, and $500 all land near **$20 per 1x of Plus**. The old $200 discount (about $10 per 1x) is gone.

The everyday sweet spot therefore moves from $200 to **Pro $100**. It buys the removal of the five-hour window, not cheaper tokens. $200 matters only after the $100 weekly allowance keeps running out. $500 is a speed tier: spending the whole allowance in Ultrafast cuts it to about an eighth, so it is the wrong purchase if the goal is more tokens per dollar.

A few sessions a week belong on Plus. Spiky usage should be checked against the API example below before you take a flat fee.

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

## Multipliers: Where the Official Pages Disagree

The pricing page, the help article, and the press do not add up to one table. What was separable on the review date:

The [ChatGPT Pro product page](https://chatgpt.com/plans/pro/) says there are three usage tiers. The pricing page lists $100, $200, and $500, and names Ultrafast on $500.

The search index for [About ChatGPT Pro tiers](https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers) still returns the older structure: Pro $100 is 5x Plus, Pro $200 is 20x Plus, and $200 remains the highest tier. A direct fetch of that page was blocked by Cloudflare on the review date, so this is indexed text, not a full page reread in a browser. It conflicts with the product page. It is not, by itself, the 2026-09-30 rule, and it cannot be used to deny that $500 exists.

Secondary coverage (Engadget, The Next Web, and write-ups quoting Codex lead Thibault Sottiaux / Tibo) adds sentences the pricing page does not: the reopened Pro $200 nets out at about half the API spend of the old Pro $200; the five-hour limit is not coming back; Work and Codex fall from about 20x Plus to about 10x, immediately for new subscribers, with existing subscribers keeping the old allowance through about 2026-10-29 and moving on 2026-10-30; GPT-6 Pro in Chat falls from 200 messages a week to 100. Tibo's original post was not opened directly for this review.

"Pro $500 is about 25x Plus" appears in secondary reports. The English DevDay recap timed out on fetch. The official speed page we did read confirms the 8x generation claim and the 8x billing rate. It does not state a 25x allowance.

Legacy transition credits: forum posts and secondary articles quote an email that grants a one-time credit balance. The amount and expiry were not on a public help page we could open. This article does not repeat those figures. Use Settings → Usage and the OpenAI email on the account.

If the reported ratios are used only as arithmetic, the monthly price per 1x of Plus is below. This is not a rate card.

| Tier | Monthly | Assumed ratio vs Plus | Price per 1x |
|------|------|------|------|
| Plus | $20 | 1x | $20 |
| Pro $100 | $100 | 5x (still what the help article says; reports did not change this tier) | $20 |
| Pro $200 | $200 | 10x (reports). The help-article index still says 20x | $20 at 10x; $10 if 20x is still in force |
| Pro $500 | $500 | 25x (reports only; not on the pricing page) | $20 if 25x is right |

Under the 25x assumption, spending all of the $500 allowance in Ultrafast leaves about 25 ÷ 8 ≈ 3.1x Plus of Standard-speed work. $500 buys token speed and a higher ceiling.

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

## Running the Numbers: Why the Sweet Spot Left $200

The August math was specific. Pro $200 at 20x Plus was about $10 per 1x. Plus and Pro $100 were about $20 per 1x. Heavy users started at $100 and stepped up to $200 when the weekly cap kept hitting: another $100, about 4x the usage, and unlimited Voice.

What changes that math on 30 September is already on the pricing page, plus ratios that have to stay labeled as assumptions.

Pro no longer publishes a five-hour message table, and it has no five-hour cap. $200 no longer lists unlimited Voice. The personal top tier is $500, and Ultrafast draws included usage at 8x. If the reported 10x ratio is right, $200's unit price is back in line with Plus, and the August discount is gone. If the help article's 20x ratio is the one still in force, the discount survives, but that article also does not acknowledge $500, which conflicts with the page that is selling it. While those two official texts disagree, this guide does not state 20x as the current fact.

How that lands:

**Plus, $20.** A few focused sessions a week. Astra's 5–45 local messages per five hours can disappear in one long task. Luna's 350–3,000 is much wider. One or two hours a day, mostly on Luna or Sol, generally fits. Go ($8) is desktop Luna only, still in rollout, without the CLI, IDE, or cloud review listed for Plus.

**Pro $100.** Codex is the daily tool, Plus's five-hour window keeps stopping the work, and the weekly total does not yet force another doubling. Under the 5x assumption its unit price matches Plus. What you add is the ability to spend the week's allowance in a burst, plus Pro-only chat access. The product page also lists Dot. The pricing page does not say how Dot draws on the Codex allowance, so Dot stays out of this calculation.

**Pro $200.** Consider it only when the $100 weekly allowance regularly runs out. Do not buy it for the August story of "20x plus unlimited Voice." If new subscriptions are already on the reported 10x ratio, $200 versus $100 is linear: about twice the price for twice the usage. Existing subscribers may still be on the old allowance until 2026-10-30. Read the usage dashboard this month before staying or stepping down.

**Pro $500.** It earns its fee in two cases. Token wait on Astra is what limits how much you finish in a day, and Ultrafast's up-to-8x generation speed matches that bottleneck. Or the $200 weekly allowance is still not enough, and you want the higher ceiling while accepting that Ultrafast spends the allowance faster. If the 25x assumption holds, an all-Ultrafast month is only a bit over 3x Plus at Standard speed, at a much higher unit cost than $100.

**API key.** The roughly $3 Astra task above stays under the $100 subscription when you run clearly fewer than about 30 of them a month. Use a key when volume swings, or when the agent already runs in your own framework. Cloud GitHub review, Slack, and Work are not on the key.

## Compared with Claude Max and Domestic Plans

The [Claude Max analysis](/en/guides/claude-max-plan-value-analysis/) is from 2026-08-19, when both products were $100 / $200 plans at 5x and 20x. That shape no longer describes Codex. Claude's own prices in that article were not re-checked today. For the model choice, see [Claude Code vs Codex](/en/compare/claude-code-vs-codex/).

Domestic coding plans (GLM, Volcengine Ark, Bailian) are typically ¥50–200 a month, payable in RMB, with direct access inside China. Codex needs chatgpt.com and an international payment method. The site's `codex-cli` score for china_friendly is still 1/10. If you are in mainland China and the budget comes first, start with the [GLM-5.3 Coding Plan review](/en/guides/glm-5.3-coding-plan-review/) and the [GLM vs DeepSeek vs Kimi comparison](/en/compare/glm-vs-deepseek-vs-kimi-2026/).

## Who Should Buy

**Plus**: a few sessions a week, mostly Luna or Sol, and a five-hour window is acceptable.

**Pro $100**: Codex every day, Plus's five-hour window is the thing that stops you, and the weekly total does not yet require another doubling.

**Pro $200**: you already exhaust Pro $100 every week. On the current pricing page it is not a half-price allowance, and it is not unlimited Voice.

**Pro $500**: you need Astra Ultrafast, or the $200 weekly allowance is still not enough. The reason is speed or ceiling, not a lower price per token.

**Business**: you need seat admin and SSO. The pricing page puts Standard Business on the same five-hour estimate table as Plus. It does not publish a multiplier for a higher seat.

**API key**: volume swings, or you want per-token cost control. A long context can move one task from a few dollars to the tens. Check a week of usage before going back to a subscription.

## Sources and Review Dates

- Tier prices, Plus five-hour estimates, no five-hour limit on Pro, Ultrafast only on Pro $500, speed billing multipliers, the credits table, Voice at $0.05/minute, and the GPT-5.5 retirement date: [Codex Pricing](https://developers.openai.com/codex/pricing), 2026-09-30.
- Ultrafast up to 8x faster, and no Ultrafast on other self-serve plans even with credits: [Codex Speed](https://developers.openai.com/codex/agent-configuration/speed), 2026-09-30.
- Standard and Ultrafast API prices: [API Pricing](https://developers.openai.com/api/docs/pricing), 2026-09-30. The API "up to 8x faster" line: [Ultrafast mode](https://developers.openai.com/api/docs/guides/ultrafast-mode).
- "Three usage tiers" on the product page: [ChatGPT Pro](https://chatgpt.com/plans/pro/), 2026-09-30.
- Help Center index still describing two tiers at 5x and 20x: [About ChatGPT Pro tiers](https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers). Direct fetch was blocked by Cloudflare on the review date.
- About 10x, an effective date around 2026-10-30, GPT-6 Pro from 200 to 100 messages a week, Tibo's "about half the API spend," and Pro $500 at about 25x: Engadget, The Next Web, and secondary write-ups quoting Tibo. The original post and subscriber emails were not opened as primary pages. Transition-credit amount and expiry were not confirmed on a public help page, so this article does not cite figures.
- Message counts are official ranges and move with task complexity. Check the usage dashboard before buying. OpenAI changes allowances and prices.
