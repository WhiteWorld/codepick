---
title: "GitHub Copilot Switches to AI Credits Billing in June: Will You Pay More?"
description: "GitHub Copilot is replacing Premium Request Units with AI Credits token-based billing on June 1, 2026. Here's a breakdown of what each plan includes, what models cost, and whether your bill goes up or down."
date: "2026-05-11"
updated_at: "2026-10-16"
article_type: "explainer"
tags: ["github-copilot", "copilot", "cursor", "cline", "billing", "ai-credits", "token", "pricing"]
pillar: plans
content_status: keep
locale_strategy: mirrored
draft: false
faq:
  - q: "Will Copilot's June billing change make me pay more?"
    a: |
      It depends on the model and the context length. On the rate table recorded on May 28, 2026, about 166 Sonnet agent tasks use up Pro's 1,500 credits. That rate table was not re-opened on October 16. Pro+ is 7,000 credits and Max is 20,000. Cline plus your own API bills tokens directly. Third-party models in Cursor start at Premium $30 and are billed extra. Cursor is not a flat-price substitute.
  - q: "Do code completions still consume Credits?"
    a: |
      They do not spend AI Credits. Free completions are still capped at 2,000 per month. Paid plans do not spend credits on completions or Next Edit Suggestions.
      Chat, Agent, CLI, Spaces, and Spark do spend credits.
  - q: "How do I avoid overage charges?"
    a: |
      Set your overage cap to **$0** in billing settings — usage stops once the monthly allowance is gone, with no extra charges.
      Heavy Agent users who want headroom can set a reasonable overage budget (e.g. $20). Org admins can configure per-seat caps in the cost center.
  - q: "When do annual subscribers migrate?"
    a: |
      The plans page checked on October 16, 2026 does not list annual prices, and it does not say annual subscribers still use request-count. That older rule is unverified. Business is 1,900 credits per seat and Enterprise is 3,900. The June–August bonus credits are not on that page.
---

On **June 1, 2026**, GitHub Copilot replaced **Premium Request Units** with **AI Credits**. Sticker prices stayed. The unit of billing changed. Quotas below follow the plans page checked on October 16, 2026. The per-million-token table is still the May 28, 2026 record. That table was not re-opened.

---

## The Change in One Table

| Old Model (until May 31) | New Model (from June 1) |
|---|---|
| Pro: 300 premium requests/month, overage $0.04/req | Pro: **1,500 AI Credits** (1,000 base + 500 flex), overage **$0.01/credit** |
| Pro+: 1,500 premium requests/month | Pro+: **7,000 AI Credits** (3,900 base + 3,100 flex) |
| Each "request" = one unit, regardless of token count | Charged by **actual tokens × model rate** |

**Code completions and Next Edit Suggestions do not spend AI Credits. Free completions are still capped at 2,000 per month. Paid plans do not meter completions this way.**

---

## Monthly AI Credits by Plan

| Plan | Monthly Price | Included AI Credits | USD Value |
|------|--------------|---------------------|-----------|
| Copilot Free | $0 | 50 chats/mo; 2,000 completions | — |
| Copilot Pro | $10 | 1,500 (1,000 base + 500 flex) | $15 at $0.01 |
| Copilot Pro+ | $39 | 7,000 (3,900 base + 3,100 flex) | $70 at $0.01 |
| Copilot Max | $100 | 20,000 (10,000 base + 10,000 flex) | $200 at $0.01 |
| Copilot Business | $19/user | 1,900, pooled | $19 at $0.01 |
| Copilot Enterprise | $39/user | 3,900, pooled | $39 at $0.01 |

> **Conversion**: 1 AI Credit = $0.01 USD. Flex allotments may change. June–August promo credits are not on the October 16, 2026 plans page, so they are not listed above. Overage on that page is $0.01 per credit.

---

## What Consumes Credits vs. What's Free

**Do not spend AI Credits:**
- Inline code completions. Free is still capped at 2,000 per month
- Next Edit Suggestions

**Consumes AI Credits:**
- Copilot Chat
- Copilot Agent / Autopilot sessions
- Copilot CLI
- Copilot Cloud Agent
- Copilot Spaces & GitHub Spark
- Third-party Copilot Extensions
- Code Review (also consumes GitHub Actions minutes)

---

## Model Token Pricing Table

> Prices per 1 million tokens, converted to AI Credits (100 Credits = $1). This table is the May 28, 2026 record. It was not re-opened on October 16, 2026. The monthly quotas above were updated from that day's plans page. Per-plan model checkmarks did not survive the fetch, so "Pro+ only" is not restated.

| Model | Input (credits/M) | Cached Input (credits/M) | Output (credits/M) |
|-------|-------------------|--------------------------|-------------------|
| GPT-5 mini | 25 | 2.5 | 200 |
| Raptor mini | 25 | 2.5 | 200 |
| Grok Code Fast 1 (xAI) | 20 | 2 | 150 |
| Gemini 3 Flash | 50 | 5 | 300 |
| GPT-4.1 | 200 | 50 | 800 |
| GPT-5.2 | 175 | 17.5 | 1,400 |
| Gemini 2.5 Pro | 125 | 12.5 | 1,000 |
| Claude Haiku 4.5 | 100 | 10 | 500 |
| GPT-5.4 | 250 | 25 | 1,500 |
| Claude Sonnet 4.x | 300 | 30 | 1,500 |
| GPT-5.5 | 500 | 50 | 3,000 |
| Claude Opus 4.x | 500 | 50 | 2,500 |

---

## What Does a Typical Session Actually Cost?

### Scenario A: Regular Chat

- Input: ~2,000 tokens (question + code context)
- Output: ~500 tokens (response)

| Model | Cost per chat (credits) | Sessions on Pro's 1,500 credits |
|-------|------------------------|---------------------------------------|
| GPT-5 mini | 0.15 | ~10,000 |
| Claude Haiku 4.5 | 0.45 | ~3,333 |
| Claude Sonnet 4.x | 1.35 | ~1,111 |
| Claude Opus 4.x | 2.25 | ~3,111 on Pro+'s 7,000 credits |

### Scenario B: Agentic Coding Session

Agents read multiple files, so context balloons significantly:
- Input: ~15,000 tokens
- Output: ~3,000 tokens

| Model | Cost per agent task (credits) | Tasks on the current allowance |
|-------|------------------------------|------------------------|
| GPT-5 mini | 0.98 | ~1,530 on Pro's 1,500 |
| Claude Haiku 4.5 | 3.0 | ~500 on Pro's 1,500 |
| Claude Sonnet 4.x | 9.0 | ~166 on Pro's 1,500 |
| Claude Opus 4.x | 15.0 | ~466 on Pro+'s 7,000 |

---

## More Expensive or Cheaper Than Before?

It depends entirely on your model choice and session size:

**Likely cheaper (light users):**
- Primarily using GPT-5 mini or Grok Code Fast for daily chat
- Under the old model, 300 premium requests was a hard cap — the new model gives equivalent usage with credits left over

**Likely more expensive (heavy agentic users):**
- Running frequent Claude Sonnet or GPT-5.4 Agent sessions on large codebases
- Under the old model, 300 requests was a fixed ceiling. On the May 28 rate table, about 166 Sonnet agent tasks use up Pro's current 1,500 credits. That rate was not re-checked on October 16
- Bottom line: **longer context + pricier models = faster credit burn**

**Community reaction**: A vocal segment of developers complained the change means "you will get less, but pay the same price" — particularly those relying on long-context sessions in large repos. GitHub's official position is that Copilot has evolved from a chat assistant into an agentic platform, and token-based billing better reflects the actual compute involved.

---

## How to Control Your Spending

The new billing model introduces budget controls at three levels:

1. **Individual users**: Set a monthly overflow cap in billing settings. Setting it to **$0** stops usage entirely once credits are exhausted — no surprise charges.
2. **Organization / cost center**: Admins can set per-user budgets across teams.
3. **Enterprise level**: Centralized control across all seats.

**Practical tips:**
- **Unsure about your usage?** Set overflow cap to $0 for the first month and monitor actual consumption before enabling overages.
- **Heavy agent user?** Estimate: monthly agent sessions × credits per session = expected spend. Budget accordingly.
- **Save credits**: Swapping from Claude Sonnet to **Gemini 3 Flash** or **GPT-5 mini** for routine tasks cuts costs by 85%+ with minimal quality impact for simple queries.

---

## Migration Timeline

| User Type | Migration Date |
|-----------|---------------|
| Monthly Pro / Pro+ | Already on AI Credits. Current totals are 1,500 and 7,000. Max is 20,000 |
| Annual Pro / Pro+ | Annual prices are not on the October 16 plans page. Whether annual subscribers still use request-count is unverified |
| Business / Enterprise | Current seat credits are 1,900 and 3,900. June–August promo credits are not on that page |

---

## Recommendations by User Profile

| Profile | What to do |
|---------|-----------|
| Light user (a few chats/day, cheap models) | Minimal impact — credits will be ample |
| Moderate user (daily chat + occasional agents) | Pro $10 should suffice; set overflow cap to $0–$5 |
| Heavy agentic user (Sonnet/Opus + large context) | Consider Pro+ or Max. Cline plus a direct API bills tokens. Third-party models in Cursor start at Premium $30 and are billed extra |
| JetBrains / deep GitHub integration user | Copilot remains the best fit; monitor monthly usage |

If the new billing pushes your costs up significantly, see our [Claude Code budget alternatives guide](/en/compare/claude-code-budget-alternatives) or [how to cut Cursor costs](/en/guides/cursor-cost-saving) for alternative setups.

---

*Quotas: github.com/features/copilot and docs.github.com/en/copilot/get-started/plans, checked October 16, 2026. 1 credit = $0.01, and overage is the same rate. The per-million token table is still the May 28, 2026 [models and pricing](https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing) record. Annual prices and the June–August promo were not on the October 16 plans page.*
