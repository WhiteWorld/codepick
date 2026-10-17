---
title: "How to control Cursor spend after the pricing change"
description: "Cursor no longer has Pro at $20 or a $20 credit pool. This note follows the 2026-10-16 pricing page: Plus, Premium, and separate API charges for third-party models."
date: "2026-04-05"
updated_at: "2026-10-16"
article_type: "review"
tags: ["cursor", "cost-saving", "token", "efficiency", "auto-mode", "cursorrules"]
pillar: plans
content_status: keep
locale_strategy: mirrored
draft: false
---

On the [Cursor pricing page](https://cursor.com/en/pricing) checked 2026-10-16, there is no Pro plan at $20, no "$20 monthly credit pool," and no unlimited Auto mode. Individual tiers are Free $0, Plus $8, Premium $30, Super $100, and Ultra $200. The usage pool is shared with Grok and refreshes weekly. The page does not publish its dollar size.

Plus is Grok models only. On Premium and above, Claude, GPT, Gemini, and other third-party models are billed at API list price. They are not included in the monthly fee. "Make the $20 pool last until the end of the month" and "upgrade to Pro+ at $60 for a $70 pool" are not advice you can follow anymore. Pick the tier that matches the models you use, then cut calls that are billed at API rates.

---

## How billing works now

| Plan | Price | What matters for the bill |
|------|-------|---------------------------|
| Free | $0 | Limited AI usage |
| Plus | $8/mo | Weekly pool, Grok only. Dollar size not published |
| Premium | $30/mo | 4x Plus. Third-party models billed at API list price |
| Super | $100/mo | 15x Plus. Third-party models extra |
| Ultra | $200/mo | 50x Plus. Third-party models extra |

The current page does not say any of the following:

- Monthly pools of $20, $70, or $400
- Unlimited Auto, or a 10% Auto discount
- Tab completion excluded from the pool, or unlimited Tab
- Overage at $0.04–$0.50 per request

Without those figures, a plan such as "spend $12–15 in weeks 1–3" is not something this page can support.

---

## 1. Pick the tier from the models, not from the old Pro plan

- Grok only: Plus at $8/mo. That is the cheapest paid individual tier
- Claude, GPT, Gemini, or the cloud agents listed on the pricing page: Premium at $30/mo at minimum. The API bill for third-party models is on top of that
- Super and Ultra are 15x and 50x Plus usage. The dollar size of Plus is not published, so the multiplier is not "3.5x the usage for 3x the money"

If the work is not on Grok, the $8 plan does not include it.

---

## 2. Use Chat when Agent is not required

Agent reads files, calls tools, and grows the context. When a third-party model is billed at API list price, a longer context costs more per call.

| Task | Lower-cost choice |
|------|-------------------|
| Explain code, look up an API | Chat |
| Add a feature, edit many files, fix a bug and run tests | Agent |

The pricing page does not publish a ratio between Chat and Agent. The mechanism is the one that still holds: one fewer multi-file Agent run is one fewer billed input and output.

---

## 3. Shorten rules that ride on every request

Cursor attaches rules files to Agent and Chat requests. A longer file costs more input when the model is API-priced.

Put project notes in a separate doc and `@`-mention them when needed. Give task instructions in the current chat. Do not put thousands of words into a file that is sent every time.

The pricing page does not publish a savings percent. What it does not need to: that text is sent on every request.

---

## 4. Split large tasks

Handing many files to Agent in one turn makes the context larger. A larger context costs more when the model is priced per token. The pricing page does not publish a measured ratio, so this note does not claim "2–3x."

Ask for a short plan first, then work module by module. Start a new chat after a stage so earlier context is not carried forward.

---

## 5. Do not treat Tab as a free pool

The old Pro write-up said Tab did not draw from the credit pool. The 2026-10-16 pricing page does not say whether Tab draws from the weekly pool, and it does not say Tab is unlimited.

Small edits can still start from completion. That only means one fewer Chat turn. It is not "10–15% of a $20 pool."

---

## 6. When included usage runs out, do not upgrade along the old ladder

There is no Pro+ plan and no $70 pool. After the included pool, third-party models continue at API list price. Super and Ultra raise the Plus multiplier. Their dollar value is not published.

Other tools, if the work fits them:

- **Cline + Volcengine Ark**, billed on that plan's own price. [Setup](/en/guides/cline-ark-setup)
- **Windsurf Free** is a light quota. The 2026-10-16 pricing page does not state 25 credits, or any credit count. Pro is $20/mo, not $15
- **GitHub Copilot Pro** is $10/mo with 1,500 AI credits total. Completions do not spend credits

---

## What still holds

| Practice | Now |
|----------|-----|
| Plus when you only need Grok | Holds. $8/mo, Grok models only |
| Chat instead of an unnecessary Agent run | Holds. Third-party models are priced per token |
| Shorter rules and smaller tasks | Holds. Fewer tokens per request. No official savings rate |
| Tab as unlimited free usage | Does not hold. The page does not say that |
| Auto at 10% off, stretching a $20 pool | Does not hold. That plan and that discount are not on the page |
| Pro+ at $60 for a larger dollar pool | Does not hold. That tier is gone |
| Windsurf's 25 credits at month end | Does not hold. The credit count is not published |

## Related

- [Cursor vs Windsurf](/en/compare/cursor-vs-windsurf)
- [Cline + Volcengine Ark setup](/en/guides/cline-ark-setup)
- [Claude Code token saving](/en/guides/claude-code-token-saving)
- [Should existing Cursor users switch to The X Subscription?](/en/guides/cursor-x-subscription-switch-decision/)

> Prices checked 2026-10-16. Cursor does not publish the dollar size of the usage pool. Windsurf does not publish a credit count, the old $15 grandfather rate, or a student discount on the current pricing page.
