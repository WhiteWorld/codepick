---
title: "Codex Plan Value Analysis (2026): Plus, Pro 5x, or Pro 20x?"
description: "OpenAI Codex is now subscription-based: Plus $20/month, Pro 5x $100/month, Pro 20x $200/month. This review runs the numbers with official pricing verified 2026-08-19: per-model 5-hour window message ranges for GPT-5.6 Sol/Terra/Luna, the credits system, and what to do when you hit limits - so you can choose between subscriptions, pay-as-you-go API, and competing plans like Claude Max or domestic coding plans."
date: "2026-08-19"
article_type: review
tags: [codex, chatgpt, openai, pricing, subscription]
pillar: plans
content_status: keep
locale_strategy: mirrored
draft: false
---

## Bottom Line

- **Heavy Codex users** (2+ hours of agent sessions in the CLI/IDE daily): Pro 5x ($100/mo) is the sweet spot - 5x Plus local-message capacity and the full GPT-5.6 family.
- **All-day multi-agent workloads that regularly hit weekly caps**: Pro 20x ($200/mo) is the only tier that makes sense; otherwise Pro 5x plus occasional credits is cheaper.
- **Occasional use**: Plus ($20/mo) with Luna/Terra is plenty - don't jump to Pro early.
- **Very spiky usage or team procurement**: run the API math first; teams should look at Business directly.
- Same conclusion as yesterday's [Claude Max analysis](/en/guides/claude-max-plan-value-analysis/): these subscriptions buy "ceiling plus convenience"; for users outside the US there are also payment and network frictions, so budget-sensitive buyers should weigh domestic coding plans.

---

## Plan Structure (verified against official docs 2026-08-19)

Codex now lives inside the ChatGPT subscription system, with five paid options:

| Tier | Monthly | Position |
|------|------|------|
| Plus | $20 | Entry - Codex CLI / IDE / App included |
| Pro 5x | $100 | Heavy users - 5x Plus local-message capacity |
| Pro 20x | $200 | Top individual tier - 20x capacity + unlimited Voice |
| Business | per seat | Team management, automated Code Review, Slack/Linear integration |
| API Key | usage-based | Flexible, token-billed, cost scales with usage |

Pro tiers add: higher output, priority access at peak times, the GPT-5.3-Codex-Spark research preview (Pro only), and more Voice time (unlimited on Pro 20x).

## How Usage Works: Per-Model 5-Hour Windows

Codex usage is not a fixed message count - it floats with model and task complexity, with a rolling 5-hour window plus possible weekly caps, shared between local sessions and cloud. Official **local messages / 5-hour window** by tier:

| Model | Plus | Pro 5x | Pro 20x |
|------|------|--------|---------|
| GPT-5.6 Sol (hardest reasoning) | 10-100 | 50-500 | 200-2,000 |
| GPT-5.6 Terra (everyday workhorse) | 25-200 | 125-1,000 | 500-4,000 |
| GPT-5.6 Luna (high volume) | 250-2,000 | 1,250-10,000 | 5,000-40,000 |
| GPT-5.5 | 15-80 | 75-400 | 300-1,600 |
| GPT-5.4 | 20-100 | 100-500 | 400-2,000 |
| GPT-5.4 mini | 60-350 | 300-1,750 | 1,200-7,000 |

Key takeaways:

1. **Model choice matters more than tier choice**: within the same tier, Luna's allowance is 20-25x Sol's. Use Luna/Terra for routine work and save Sol for genuinely hard problems - the 5-hour window will last much longer.
2. **Business seats = Plus-level usage**, but with team management; Enterprise/Edu with flexible pricing scale by credits with no fixed rate limits.
3. **When you hit a limit**, you can buy credits to keep working, switch to a smaller model, or (all users) run extra local chats with an API key at standard API rates.

## Credits Pricing: GPT-5.6 Averages 5-40 Credits per Message

Credits are token-billed. Official rate card (credits / 1M tokens, input/cached/output):

| Model | Input | Cached input | Output |
|------|------|---------|------|
| GPT-5.6 Sol | 125 | 12.5 | 750 |
| GPT-5.6 Terra | 50 | 5 | 300 |
| GPT-5.6 Luna | 5 | 0.5 | 30 |
| GPT-5.5 | 125 | 12.5 | 750 |
| GPT-5.4 | 62.5 | 6.25 | 375 |
| GPT-5.4 mini | 18.75 | 1.875 | 113 |

OpenAI states GPT-5.6 averages 5-40 credits per message. Rough math: a long-context agent task (hundreds of thousands of input tokens) costs roughly 15-25 credits on Terra, 40-90 on Sol. If you buy credits every week, your tier is too low - upgrading to Pro is usually cheaper than sustained credit purchases.

## Running the Numbers: Plus / Pro 5x / Pro 20x / API

- **Plus $20**: for under ~50 medium sessions a month, mostly Luna/Terra. At Terra's 25-200 messages / 5h, 1-2 focused hours a day is generally fine.
- **Pro 5x $100**: Terra 125-1,000 / 5h, Sol 50-500 - the sweet spot for professional developers. Versus API (Sol output at 750 credits / 1M tokens), 4-6 Sol-class sessions a day already justifies the flat fee.
- **Pro 20x $200**: near-unlimited-feeling quota for all-day agents, parallel tasks, and unlimited Voice. If your 5x weekly cap keeps hitting, the $100 increment is likely cheaper than rate-limit waiting plus credit purchases.
- **API Key**: more flexible when usage is spiky or you want pure token billing; downsides are unpredictable cost and no bundled Voice/Web/cloud features.

## Compared with Claude Max and Domestic Plans

- **Claude Max 5x/20x ($100/$200)**: nearly identical structure (5-hour window + weekly caps + shared pool + credits). The difference is the model ecosystem: Claude's Opus family still tops this site's coding score (9.6/10) for long code generation, while Codex's GPT-5.6 family is stronger at agent orchestration and native GitHub integration (@Codex PR/issue delegation, automated code review). If you're torn, see the [Claude Code vs Codex comparison](/en/compare/claude-code-vs-codex/).
- **Domestic coding plans (GLM / Volcengine Ark / Bailian)**: typically ¥50-200/month, payable in RMB with direct domestic access. Codex requires chatgpt.com access and international payment, which has real friction in mainland China (the site's codex-cli data rates china_friendly 1/10). Budget-sensitive users in China should start with domestic plans - see our [GLM-5.3 Coding Plan review](/en/guides/glm-5.3-coding-plan-review/) and [GLM vs DeepSeek vs Kimi comparison](/en/compare/glm-vs-deepseek-vs-kimi-2026/).

## Who Should Buy

**Plus**: light usage, Luna/Terra is enough, budget-sensitive.
**Pro 5x**: Codex is your primary dev tool, 2h+ daily, need Sol-class reasoning, or you keep hitting Plus limits.
**Pro 20x**: all-day agent workflows, heavy Voice user, 5x weekly cap frequently hit.
**Business**: teams needing automated code review, Slack/Linear integration, and compliance controls.
**API Key**: spiky usage, per-token cost control, or you already run your own agent framework.

## Sources and Review Dates

- Plan structure, per-tier usage tables, credits rate card, Voice allowances, feature matrix: OpenAI Codex official docs, [Pricing / Usage limits](https://developers.openai.com/codex/pricing), verified 2026-08-19.
- Usage tables are official **ranges** (they float with task complexity), not fixed promises; both OpenAI and Anthropic reserve the right to adjust quotas and pricing - always defer to the official pages before purchasing.
- Re-verify pricing quarterly; if you spot stale numbers, please open an issue on the GitHub repo.
