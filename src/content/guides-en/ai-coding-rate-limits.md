---
title: "AI Coding Tool Rate Limits Explained: How to Avoid Getting Blocked Mid-Sprint"
description: "Why does Claude Code, Cursor, or Copilot hit rate limits right when you're busiest? Learn how each tool's limits work and 5 practical strategies to keep working without interruption."
date: "2026-04-05"
updated_at: "2026-10-16"
article_type: "explainer"
tags: ["rate-limit", "claude-code", "cursor", "cline", "efficiency"]
pillar: workflow
content_status: keep
locale_strategy: mirrored
draft: false
---

You're sprinting toward a deadline, the AI Agent is mid-task, and suddenly: "rate limit exceeded." Here's how each major AI coding tool's limits work — and how to stop them from derailing your flow.

---

## Rate Limits by Tool

### Claude Code

| Plan | Rate Limit |
|------|-----------|
| Pro ($20/mo) | ~45 requests / 5-hour rolling window |
| Max 5x ($100/mo) | ~225 requests / 5-hour window |
| Max 20x ($200/mo) | Higher limit + full Opus 4.6 access |
| API (pay-as-you-go) | Anthropic API tiers (Tier 1–5) |

**Important**: The "5-hour window" is a **rolling window**, not reset at the top of the hour. Starting from your first request, you have a 5-hour period during which the total can't exceed the limit.

### Cursor

The 2026-10-16 pricing page has no Pro plan at $20 and no $70 pool. Individual tiers are Free, Plus $8, Premium $30, Super $100, and Ultra $200. The pool is shared with Grok and refreshes weekly. Its dollar size is not published.

- Plus is Grok only
- Third-party models on Premium and above are billed at API list price
- The page does not say overage is $0.04–$0.50 per request, and it does not say Auto keeps going without an error
- Do not describe Cursor as "no rate limit, just a higher bill." After included usage, third-party models continue at API list price. Whether the client hard-stops was not retested

### Cline (with Anthropic API)

Cline itself has no rate limits. Limits come from your chosen API provider. With Anthropic API directly:
- New accounts (Tier 1): 60 RPM, 100K TPM — fairly low
- Limits auto-upgrade after adding funds to your account
- With Volcengine Ark or local Ollama: essentially no rate limits

### Windsurf

- Paid allowances refresh daily and weekly. The page does not publish a credit count, and it does not say $10 per 250 credits
- Pro is $20/mo. It is not "500 credits"
- Free is a light quota. It no longer says 25 credits
- After the included quota, the page says extra usage is bought at API pricing. It does not say there is no request-rate limit

### GitHub Copilot

- Pro is 1,500 AI credits/mo. Pro+ is 7,000. Max is 20,000. Overage is $0.01 per credit
- The old 300 or 1,500 premium-request quotas are not on the current plans page
- On paid plans, completions and Next Edit do not spend credits. Free is still 2,000 completions/mo
- This is a monthly credit allowance, not a 5-hour window. Whether usage stops when credits run out depends on the overage budget. The plans page does not say whether annual subscribers stay on the old request quota. That stays unverified

---

## Why Rate Limits Always Hit at the Worst Moment

Common patterns:

1. **Continuous large task**: Agent handling a major refactor auto-generates 30+ tool calls, consuming the 5-hour window before you realize it
2. **Forgotten /compact**: Claude Code conversation history grows, each request carries more context, effectively accelerating window consumption
3. **End of the allowance period**: Cursor's included usage refreshes weekly. It is not a $20 pool that lasts a calendar month. Copilot credits are monthly. Either can run out at the end of its period
4. **Multi-project use**: Using the same account across multiple projects — requests from all projects count against the same limit

---

## 5 Strategies to Handle Rate Limits

### Strategy 1: Keep a Backup Tool Ready

The most effective approach: when your primary tool hits a limit, switch to a backup immediately without breaking your flow.

**Recommended pairings:**
- Primary: Claude Code Pro → Backup: Cline + Anthropic API (same model, pay-as-you-go)
- Primary: Claude Code Pro → Backup: Cline + Volcengine Ark (official promo pricing, China-friendly)
- Primary: Cursor Plus or Premium → Backup: Windsurf Free (light quota, credit count not published) or Cline + Ark
- Primary: Copilot Pro → Backup: Cursor Free, or Cline. Cursor Plus is Grok-only, so it is not a same-model backup for Copilot

Cline configurations are saved — switching takes seconds.

### Strategy 2: Pace Your Requests

Claude Code Pro's 45 requests/5-hour window works out to **one request every ~6.7 minutes** on average.

Adapt your workflow to this rhythm:
- While Agent is executing, do code review or documentation work
- Don't send rapid-fire follow-up messages — describe the problem clearly in one well-crafted request
- For complex tasks, use Plan mode to confirm the approach first, then execute — this reduces back-and-forth

### Strategy 3: Try Pay-as-You-Go Before Upgrading

Many Claude Code users immediately consider upgrading to Max 5x ($100/mo) when they hit limits. But:

- If you only hit limits on 2–3 days per month, paying $0.15–0.50 per extra request beats paying $80 more every month
- Check if Claude Code's settings let you enable "continue on API billing after limit" — this auto-switches to pay-as-you-go seamlessly when the window is full

### Strategy 4: Use /compact to Slow Context Growth in Claude Code

Longer conversation history = more tokens per request = faster window consumption.

```bash
# Run in the Claude Code conversation:
/compact
```

Run `/compact` after completing each stage of a task. It compresses history into a summary, letting you handle more tasks within the same 5-hour window.

### Strategy 5: Batch Non-Urgent Tasks to Off-Peak Hours

Some AI coding tasks don't require real-time interaction:
- Bulk code reviews
- Writing documentation / comments
- Generating test cases
- Code formatting and minor refactors

Schedule these for evenings or early mornings. This preserves your rate window capacity for urgent daytime work and lets you handle batch tasks more comfortably.

---

## What to Do When You Hit a Limit Right Now

1. **Switch to a backup tool immediately** — Cline + Ark or API, don't just wait
2. **Note when it happened** — patterns usually emerge (same time of day, same type of task)
3. **Assess whether you need to upgrade**: consistently hitting limits during work hours → current plan is too small
4. **Claude Code users**: Check settings for "continue on API billing" mode to avoid hard stops

---

## Rate Limit Summary

| Tool | Limit Type | When Limit Hits | Recovery Cost |
|------|-----------|-----------------|---------------|
| Claude Code Pro | 45 req/5-hour | Wait for window reset or switch | Upgrade +$80/mo |
| Claude Code Max 5x | 225 req/5-hour | Wait or use API mode | Add API credits |
| Cursor Plus / Premium | Weekly pool, dollar size not published | Third-party models continue at API list price | The monthly fee is not a cap |
| Cline + Anthropic API | API Tier | Wait or add funds | $10–50 top-up |
| Cline + Volcengine Ark | Essentially unlimited | — | — |
| Windsurf Pro | Daily/weekly quota, credit count not published | Page says extra usage is bought at API pricing | Do not estimate with $10/250 |
| Copilot Pro | 1,500 credits/mo | $0.01 per extra credit | One Agent task is not one credit |

---

## Related

- [How to Save Money on Cursor](/en/guides/cursor-cost-saving)
- [Claude Code Token Saving Guide](/en/guides/claude-code-token-saving)
- [Claude Code Is Too Expensive: Budget Alternatives](/en/guides/claude-code-budget-alternatives)
- [Cline + Volcengine Ark Setup Guide](/en/guides/cline-ark-setup)
- [Should existing Cursor users switch to The X Subscription?](/en/guides/cursor-x-subscription-switch-decision/)
