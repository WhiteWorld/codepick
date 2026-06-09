---
title: "GitHub Copilot Switches to AI Credits Billing in June: Will You Pay More?"
description: "GitHub Copilot is replacing Premium Request Units with AI Credits token-based billing on June 1, 2026. Here's a breakdown of what each plan includes, what models cost, and whether your bill goes up or down."
date: "2026-05-11"
updated_at: "2026-05-19"
article_type: "explainer"
tags: ["github-copilot", "copilot", "cursor", "cline", "billing", "ai-credits", "token", "pricing"]
pillar: plans
content_status: keep
locale_strategy: mirrored
draft: false
faq:
  - q: "Will Copilot's June billing change make me pay more?"
    a: |
      Depends on which models you use. If you mostly use GPT-5 mini or Grok Code Fast for daily Chat, the new $10 allowance is plenty.
      Heavy Claude Sonnet Agent users may burn through Pro's $10 with ~110 Agent runs and need to upgrade to Pro+ — or migrate to Cursor / Cline with their own API.
  - q: "Do code completions still consume Credits?"
    a: |
      No. Inline completion and Next Edit Suggestions remain **free in every plan**, including Free — they never count toward AI Credits.
      Only Chat, Agent, CLI, Spaces and other model-invoking features deduct Credits.
  - q: "How do I avoid overage charges?"
    a: |
      Set your overage cap to **$0** in billing settings — usage stops once the monthly allowance is gone, with no extra charges.
      Heavy Agent users who want headroom can set a reasonable overage budget (e.g. $20). Org admins can configure per-seat caps in the cost center.
  - q: "When do annual subscribers migrate?"
    a: |
      Annual Pro / Pro+ subscribers stay on the legacy plan (request-count based) until their term ends, then switch to the new model. Monthly subscribers switch automatically on June 1.
      Copilot Business / Enterprise switches on June 1 with bonus Credits during the June–August promo window.
---

GitHub Copilot is switching from **Premium Request Units (PRUs)** to **AI Credits token-based billing** on **June 1, 2026**. Plan prices stay the same, but the billing logic changes completely — and whether you end up paying more depends heavily on which models you use and how agentically you work. Let's break it down.

---

## The Change in One Table

| Old Model (until May 31) | New Model (from June 1) |
|---|---|
| Pro: 300 premium requests/month, overage $0.04/req | Pro: **$10 in monthly AI Credits**, overage billed per token |
| Pro+: 1,500 premium requests/month | Pro+: **$39 in monthly AI Credits** |
| Each "request" = one unit, regardless of token count | Charged by **actual tokens × model rate** |

**Code completions and Next Edit Suggestions remain free across all plans — they never consume AI Credits.**

---

## Monthly AI Credits by Plan

| Plan | Monthly Price | Included AI Credits | USD Value |
|------|--------------|---------------------|-----------|
| Copilot Free | $0 | Limited | — |
| Copilot Pro | $10 | 1,000 Credits | $10 |
| Copilot Pro+ | $39 | 3,900 Credits | $39 |
| Copilot Business | $19/user | 1,900 Credits + 3,000 promo (Jun–Aug) | $19 |
| Copilot Enterprise | $39/user | 3,900 Credits + 7,000 promo (Jun–Aug) | $39 |

> **Conversion**: 1 AI Credit = $0.01 USD. Once your monthly allotment runs out, you can set an overflow budget or simply stop until the next billing cycle.

---

## What Consumes Credits vs. What's Free

**Always free (no credits consumed):**
- Inline code completions
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

> Prices per 1 million tokens, converted to AI Credits (100 Credits = $1)

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
| Claude Opus 4.x (Pro+ only) | 500 | 50 | 2,500 |

---

## What Does a Typical Session Actually Cost?

### Scenario A: Regular Chat

- Input: ~2,000 tokens (question + code context)
- Output: ~500 tokens (response)

| Model | Cost per chat (credits) | Sessions on Pro's 1,000-credit budget |
|-------|------------------------|---------------------------------------|
| GPT-5 mini | 0.15 | ~6,600 |
| Claude Haiku 4.5 | 0.45 | ~2,200 |
| Claude Sonnet 4.x | 1.35 | ~740 |
| Claude Opus 4.x | 2.25 | ~444 (Pro+ only) |

### Scenario B: Agentic Coding Session

Agents read multiple files, so context balloons significantly:
- Input: ~15,000 tokens
- Output: ~3,000 tokens

| Model | Cost per agent task (credits) | Tasks on monthly budget |
|-------|------------------------------|------------------------|
| GPT-5 mini | 0.98 | ~1,020 (Pro) |
| Claude Haiku 4.5 | 3.0 | ~333 (Pro) |
| Claude Sonnet 4.x | 9.0 | ~111 (Pro) |
| Claude Opus 4.x | 15.0 | ~260 (Pro+, $39 budget) |

---

## More Expensive or Cheaper Than Before?

It depends entirely on your model choice and session size:

**Likely cheaper (light users):**
- Primarily using GPT-5 mini or Grok Code Fast for daily chat
- Under the old model, 300 premium requests was a hard cap — the new model gives equivalent usage with credits left over

**Likely more expensive (heavy agentic users):**
- Running frequent Claude Sonnet or GPT-5.4 Agent sessions on large codebases
- Under the old model, 300 requests was a fixed ceiling. Under the new model, 111 Sonnet agent sessions already exhaust Pro's entire $10 credit budget
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
| Monthly Pro / Pro+ | Auto-migrates June 1, 2026 |
| Annual Pro / Pro+ | Stays on current plan until annual renewal |
| Business / Enterprise | Switches June 1 (with promotional credits Jun–Aug) |

---

## Recommendations by User Profile

| Profile | What to do |
|---------|-----------|
| Light user (a few chats/day, cheap models) | Minimal impact — credits will be ample |
| Moderate user (daily chat + occasional agents) | Pro $10 should suffice; set overflow cap to $0–$5 |
| Heavy agentic user (Sonnet/Opus + large context) | Consider Pro+, or evaluate [Cursor](/en/tool/cursor) / [Cline](/en/tool/cline) + direct API |
| JetBrains / deep GitHub integration user | Copilot remains the best fit; monitor monthly usage |

If the new billing pushes your costs up significantly, see our [Claude Code budget alternatives guide](/en/compare/claude-code-budget-alternatives) or [how to cut Cursor costs](/en/guides/cursor-cost-saving) for alternative setups.

---

*Sources: [GitHub Copilot Official Blog](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/) · [GitHub Docs: Models and Pricing](https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing) · Verified: 2026-05-11*
