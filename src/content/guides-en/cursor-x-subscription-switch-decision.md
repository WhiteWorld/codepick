---
title: "Should existing Cursor users switch to The X Subscription?"
description: "A keep, move, or API decision for people already on Cursor. Split by whether Grok or Claude, GPT, and Gemini is the daily model. Forum reply on 2026-10-20: switching is opt-in, the old plan stays if you do not switch, and the switch is permanent."
date: "2026-10-17"
updated_at: "2026-10-22"
article_type: review
tags: [cursor, existing-users, switch, x-subscription, migration]
pillar: plans
content_status: keep
locale_strategy: mirrored
draft: false
---

## Start with the decision

On 2026-10-22 this note opened forum [post 408](https://forum.cursor.com/t/introducing-the-x-subscription/174450/408). The help pages, the announcement, and the models doc are still the 2026-10-17 check. They were not reopened. On 2026-10-20 @Colin wrote that switching to The X Subscription is opt-in. A current Cursor plan keeps working, including its third-party model usage, unless you switch. The switch is permanent. The default for an existing user is still to stay put. Switch only if Grok or Composer is already the model you use, and you accept that the switch cannot be undone.

| Your week | What to do |
|-----------|------------|
| Claude, GPT, or Gemini is the daily model, and the current plan still includes that usage | Keep the current plan |
| Grok or Composer is the daily model, and one bill for Grok, Cursor, and X is fine | You can switch. Look for the control in billing settings first |
| Third-party models still matter, and you do not want to bet on how long the old plan lasts | Run the formula below, then choose a prepaid top-up, Copilot Pro+ / Max, or Claude Max |

Plan prices stay in [How to control Cursor spend](/en/guides/cursor-cost-saving/) and on [cursor.com/pricing](https://cursor.com/pricing): Free, Plus $8, Premium $30, Super $100, Ultra $200. Premium is 4x Plus, Super is 15x, Ultra is 50x. This note only answers whether to leave the plan you already have.

## What the pages actually say

On 2026-10-12, the [xAI announcement](https://x.ai/news/x-subscription) introduced The X Subscription. The forum thread from the same day is [Introducing The X Subscription](https://forum.cursor.com/t/introducing-the-x-subscription/174450). The help overview, the announcement, and the models doc were opened on 2026-10-17 and were not reopened. The lines below are from that check. Colin's 2026-10-20 wording is under [What "keep the old plan" does not promise](#what-keep-the-old-plan-does-not-promise). Post 408 was opened on 2026-10-22.

Paid plans include one pool of Grok-model usage, shared by Grok and Cursor, refreshing weekly. The [help overview](https://cursor.com/help/the-x-subscription/overview) calls it a shared weekly included pool. [Models and pricing](https://cursor.com/docs/models-and-pricing) says the pool covers Grok 4.7, Grok 4.6, Grok 4.5, and Composer 2.5, across the editor, CLI, Cloud Agents, Grok Bot, and the Grok apps. Products do not draw it at the same rate. The Grok API is billed separately and does not draw the pool. None of the announcement, the pricing page, the help overview, or the models doc publishes the pool in dollars. This note does not estimate how many runs Plus or Premium can cover.

Third-party models start at Premium. The models doc names Claude, GPT, and Gemini: they are outside the pool, billed at that model's API list price from the first request, and paid from prepaid credit. The help overview's example is only "Claude or GPT." The pricing page and the announcement say "third-party models" and do not name Gemini. Plus cannot use them. The models doc also says Plus has no Auto, Cloud Agents, Automations, Bugbot, Origin, or your own API keys. Those start at Premium.

The announcement and the help overview both say existing subscribers can keep the current plan, price, and features. The help page's line is that the plan continues unless you change or cancel it. Existing individual customers can still move between current Cursor tiers without switching, except plans billed through the Apple App Store, which have to switch first. Existing teams can still add seats or change a seat's tier without switching.

The help overview says the switch is permanent: "The switch is permanent. It can't be undone, and Support can't undo it for you."

At checkout, the Cursor, SuperGrok, and paid X Premium subscriptions you select are cancelled, with an automatic prorated refund for unused time. Cursor paid through the Apple App Store cannot be cancelled or refunded by them. Cancel it in iPhone or iPad Settings, or Apple keeps charging. The help page says they email a reminder after you switch.

Individual plans do not pay the Cursor Token Rate. Teams and Enterprise do. The models doc sets it at $0.25 per million tokens on top of the API list price, paid from the team's prepaid credit. It applies to input, output, and cached tokens.

The announcement says each new plan includes at least twice as much coding usage with their models as the comparable Cursor plan. On 2026-10-13, forum staff @Colin tied Premium's comparison to Cursor Pro, and limited it to coding with Grok models. That is a ratio, not a dollar amount, and it does not cover third-party models.

The models doc also lists annual prices: Plus $80, Premium $300, Super $1,000, Ultra $2,000, tax excluded. Those are annual stickers, not usage allowances.

## Split on the model you actually open

Look at the model name selected this week.

Grok or Composer is the daily driver. The new weekly pool is the one that covers that path. The published claim is at least 2x the comparable old Cursor plan for Grok coding usage, refreshed weekly, so one heavy day does not spend the month. Whether that pool fits your own volume is not on the page. Check the old dashboard before you switch, and Usage at grok.com/dashboard after. Grok chat, Imagine, Voice, Grok Bot, and Cursor share the pool.

Claude, GPT, or Gemini is the daily driver. The monthly fee does not pay for those requests. On Premium, Super, and Ultra they bill at API list price from the first request, out of prepaid credit. Super and Ultra only scale the Grok pool to 15x and 50x Plus. The third-party rate stays the same. If you barely use Grok, the extra fee does not buy these calls.

If you use both, split the bill. Grok and Composer depend on a weekly pool whose dollar size is unpublished. Third-party tokens join the top-up from the first request, using the formula in the next section.

The old Pro+ at $60 has no one-to-one replacement. Colin wrote the same day that you do not have to switch yet, that a change would come with advance notice, that Premium is the recommendation for new AI users, and that Super is the recommendation for daily agent users. That is a recommendation, not a usage conversion.

## Leave the current plan alone if any of these is true

- Third-party models are still the main path, and you are on legacy Pro, Pro+, or Ultra. The models doc says those legacy plans keep working for existing customers, with two usage pools and on-demand usage past them.
- You cannot pull last month's tokens by model. Without that, the formula is someone else's bill.
- Apple bills the Cursor subscription. After a switch they cannot refund that charge, and a second bill continues until you cancel it yourself.
- You still want a way back. The help page says the switch cannot be undone. On 2026-10-20 @Colin wrote "Switching is permanent," and that legacy plans cannot be repurchased once they end.
- The account is Enterprise. The help page says Cursor Enterprise customers without an active Grok account can switch with their account team. Other Enterprise accounts cannot switch yet.
- The only reason is that Plus at $8 is less than the old Pro at $20. Plus does not include Claude, GPT, or Gemini.

The switch control is not on every account. The announcement and the forum post both say it shows up in billing settings over the following days. No account was signed into for this check, so whether your account can switch today is unknown. The announcement also says switching comes with limited-time offers shown in billing settings. What those offers are is unknown.

## What "keep the old plan" does not promise

The [help overview](https://cursor.com/help/the-x-subscription/overview) says switching is optional. Leave the plan alone and the current plan, price, and features continue. The [announcement](https://x.ai/news/x-subscription) says nothing changes, and existing SuperGrok, Cursor, and X Premium subscribers can keep the current plan, price, and features.

The staff reply on the forum is shorter on time. On 2026-10-13, @Colin answered what happens to the current $20 plan:

> Nothing happens to your Pro plan automatically. You can keep it at the same price with the same features for now. Users who don’t choose to migrate will, sometime in the future, be migrated with advance notice.

"For now" is in that sentence. The help page and the announcement do not use it, and they do not give a date.

The same day, he answered whether included third-party usage remains if you stay on current Ultra and do not switch:

> If you stay on your current Ultra plan, your included third-party usage continues as it is today.

The next sentence is not "for now":

> On how long the current plan lasts: it isn’t going away today, and there’s no timeline for moving remaining customers. If that changes, you’ll get advance notice first.

Read from those two 2026-10-13 replies: there is no forced move today, and no published date. Whether a later move happens, which tier it lands on, and how much notice comes first were unknown from that day's replies.

On 2026-10-20 @Colin wrote again in [post 408](https://forum.cursor.com/t/introducing-the-x-subscription/174450/408). This note opened that post on 2026-10-22.

> To be clear: for existing subscribers, switching is opt-in. If you’re on a current Cursor plan, it keeps working exactly as it does today, including its third-party model usage, unless you choose to switch. You can also keep moving between legacy plans (Pro → Ultra, Ultra → Pro+, etc.). There’s no timeline for migrating existing plans, and we’ll give advance notice before anything changes.

Opt-in means the move happens only if you choose it. Leave it alone and the current Cursor plan keeps working, including third-party model usage. You can still move between legacy tiers. His examples are Pro to Ultra and Ultra to Pro+. There is no migration timeline. A change comes with advance notice.

This post does not repeat the 2026-10-13 sentence "will be migrated." That earlier reply is still in the thread. Both stand. There is still no date.

Later in the same post he describes the switch itself:

> Before checkout, you’ll confirm that third-party models aren’t included in the plan price and are billed separately based on usage. Switching is permanent, and legacy plans can’t be repurchased once they end. If third-party models or a monthly usage pool matter most to you, staying on your current plan is a perfectly good choice.

Before checkout you confirm that third-party models are outside the plan price and billed from usage. The switch is permanent. Once a legacy plan ends, it cannot be bought again. That sentence sits in the switch flow. Cancelling without switching is not a separate sentence in this post. If third-party models or a monthly usage pool matter more, he says staying is a perfectly good choice.

The rest of the post looks at people who already switched and at usage limits running out faster than expected. That does not change the line for people who have not switched. It is not expanded here.

Whether you can buy Pro, Pro+, or Ultra again after you cancel without switching is not a separate sentence in post 408. That case is still unknown. After a switch, the quote above says the legacy plan cannot be repurchased. In an earlier reply Colin wrote that the previous Cursor Ultra plan is no longer available for new signups. The models doc calls Pro, Pro+, Ultra, Start, and Teams Standard and Premium seats legacy plans, and says they keep working for existing customers. It does not say a plan that was only cancelled, and not switched, can be restarted.

## Recomputing one third-party workload

Count third-party models only. The Grok pool does not offset this. For an individual plan:

**Monthly cost on the new plan = tier price + prepaid credit at API list price**

Prepaid credit = input millions × input rate + output millions × output rate + cache writes and cache reads. Use that day's [models and pricing](https://cursor.com/docs/models-and-pricing) table. Super and Ultra do not change this term.

Teams add the Cursor Token Rate on top: $0.25 per million tokens, on input, output, and cached tokens.

Top-ups are paid up front. The [usage-charges page](https://cursor.com/help/account-and-billing/overages) says you are charged when you buy credit or when an automatic top-up runs, not in arrears. Auto Top-up stays off until you turn it on. Credit already bought remains until it is used or it expires; the page says that is currently 365 days after purchase. A monthly additional-usage limit can stop paid usage at the cap even if credit remains.

**Copilot Pro+ / Max = plan price + max(0, credits used − included credits) × $0.01**

On the [plans page](https://docs.github.com/en/copilot/get-started/plans) as opened 2026-10-17: Pro+ is $39 per month with 7,000 credits (base 3,900 + flex 3,100); Max is $100 per month with 20,000 credits (base 10,000 + flex 10,000). [Models and pricing](https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing) sets 1 credit at $0.01, including overage. Credits = that page's dollar rate ÷ 0.01. Flex is the allotment printed there; the page does not promise it stays. Completions do not spend credits, so this formula is only for calls that do. The credit mechanics are in [Copilot AI Credits billing](/en/guides/copilot-ai-credits-billing/).

**Claude Max = subscription + API-priced usage credits after the window runs out**

The [help center](https://support.claude.com/en/articles/11049741-what-is-the-max-plan), header "Updated this week," opened 2026-10-17: Max 5x is $100 per month, Max 20x is $200 per month, web subscriptions, monthly only. The window is 5x or 20x Pro and resets every five hours, with a separate weekly limit. The page does not say how many tokens fit, so $100 is not $100 of API. Whether your volume fits is in Claude's Settings → Usage, and it is unknown here.

The [pricing page](https://www.anthropic.com/pricing) also says Max includes $100 to $200 per month in Claude Platform API credits. The help center says monthly API credits are included, and does not say those credits offset the same coding usage inside the Claude Code window. The worked example does not treat them as a discount. How they apply is unknown. Window behavior is in [the Claude Max note](/en/guides/claude-max-plan-value-analysis/); that note's check date is older, so the subscription prices in this section are the ones to use.

The three bills are different products. The top-up is inside Cursor. The credits are inside Copilot. The Max window is inside Claude and Claude Code. The model can match. The editor does not.

### Worked example, labeled as example numbers

The token counts below exist so the arithmetic can be checked. They are not on any pricing page, and they are not a measured month.

Assume one month of Claude Sonnet 5.5 only: 20 million input tokens and 2 million output tokens. No cache, no US-only endpoint uplift, no long-context uplift.

On 2026-10-17, both the Cursor models page and the Copilot models page list this model at $2 / $10 per million input / output tokens.

API list cost = 20 × $2 + 2 × $10 = **$60**.

Copilot credits = 20 × 200 + 2 × 1,000 = **6,000**. Input at $2 per million is 200 credits per million. Output at $10 per million is 1,000 credits per million.

| Path | This example's month | Where the number comes from |
|------|----------------------|------------------------------|
| Premium | $90 | $30 subscription + $60 prepaid |
| Super | $160 | $100 subscription + $60. The third-party rate did not drop |
| Ultra | $260 | $200 subscription + $60. The third-party rate did not drop |
| Copilot Pro+ | $39 | 6,000 credits, under the included 7,000 |
| Copilot Max | $100 | 6,000 credits, under the included 20,000 |
| Claude Max 5x | $100, plus unknown | Stays at the subscription if the window holds the volume. Whether it does is unpublished |
| Claude Max 20x | $200, plus unknown | Same |

On these example numbers, the same Sonnet volume is $39 on Pro+ and $90 on Premium. The 6,000 credits sit inside Pro+'s included allowance. Premium's monthly fee does not include the $60. If you never use Sonnet and only use Grok or Composer, the $60 should not be in the bill, and this table does not choose between Plus and Premium.

Cache changes the figure. On the Cursor models page, Sonnet 5.5 cache writes are $2.50 per million and cache reads are $0.10 per million. How much of an Agent session is cache depends on the session. Nothing is filled in for that here.

## Three checks before you touch billing

1. Open billing settings and see whether the switch control is there. If it is missing, your account is not in the rollout yet.
2. See whether Apple is the biller. If it is, read the help line that they cannot cancel or refund that subscription.
3. Put last month's third-party tokens into the formula. If you still want to switch after that, then accept that it is permanent.

A new billing cycle starts the day you switch. The help overview points at Invoices & Refunds for how the prorated refund is calculated. That formula page was not opened for this check, so the line-item formula is unknown. What the overview does say is an automatic prorated refund, except for Apple.

## Related

- [How to control Cursor spend](/en/guides/cursor-cost-saving/): tiers, and ways to send fewer requests
- [AI coding cost comparison 2026](/en/compare/ai-coding-cost-comparison-2026/)
- [Copilot AI Credits billing](/en/guides/copilot-ai-credits-billing/)
- [How rate limits work](/en/guides/ai-coding-rate-limits/)
- [Claude Max value](/en/guides/claude-max-plan-value-analysis/)

## Left as unknown

- Dollar size of the weekly pool, and how many requests Plus or Premium can run: not published
- When a legacy plan would be moved, to which tier, and how much notice: the 2026-10-20 post still gives no timeline and says a change comes with advance notice. The date is unknown
- Whether a legacy plan can be bought again after a cancel that is not a switch: unknown. After a switch, post 408 says it cannot be repurchased
- Whether your account can see the switch today, and what the limited-time offer is: unknown
- The line-item prorated-refund formula: unknown
- Whether Claude Max's Platform API credits offset the same coding usage: unknown
- The token counts in the worked example: example numbers
