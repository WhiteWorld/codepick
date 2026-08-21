---
title: "AI Coding Subscription Comparison 2026: Claude, Codex, and Domestic Coding Plans"
description: "2026 AI coding subscriptions have entered the 5x/20x era: Claude Pro/Max and Codex Plus/Pro are the two flagship international options, while domestic coding plans (GLM/Ark/Bailian) compete on low price and direct China access. Using official data verified 2026-08-19, this three-way comparison covers price, quota mechanics, models, ecosystem, and China accessibility - with a decision checklist you can act on directly."
date: "2026-08-21"
tags: ["claude", "codex", "coding-plan", "subscription", "comparison", "pricing"]
pillar: compare
content_status: keep
locale_strategy: mirrored
draft: false
---

> International figures verified against official pages on 2026-08-19 (Anthropic Pricing / OpenAI Codex docs); domestic plan data from this site's `data/plans` and existing roundups. The three camps are structurally very different - read the bottom line first, then the tables.

## Bottom Line

- **Heavy terminal use + long code generation**: **Claude** (Pro $20 up; Max 5x/20x) - the Opus family is the highest-rated coding model on this site (9.6/10).
- **GitHub-native workflow + multi-agent orchestration**: **Codex** (Plus $20 up; Pro 5x/20x) - @Codex PR/issue delegation and automated code review.
- **Budget-sensitive / China-based**: **domestic coding plans** (GLM / Ark / Bailian) - ¥50-200/month, RMB payment, direct domestic access, and coding models are now first-tier.
- **Elastic usage / cross-model needs**: pay-as-you-go API or [OpenRouter](/en/guides/openrouter-guide/) - don't pay a flat subscription for occasional use.
- **Want both**: entry tier on one + pay-as-you-go on the other; don't double up on the $200 tiers.

---

## The Three Camps at a Glance

### A. Claude (Anthropic)

| Tier | Price | Notes |
|------|------|------|
| Pro | $20/mo ($200/yr ≈ $16.7/mo) | Base usage, ~45 requests/5h |
| Max 5x | $100/mo | 5x Pro usage, higher output limits, early access |
| Max 20x | $200/mo | 20x usage, extreme workloads |

Claude Code is included in every paid tier; the Opus family excels at long code generation and 200k context. China accessibility 2/10.

### B. Codex (OpenAI / ChatGPT)

| Tier | Price | Notes |
|------|------|------|
| Plus | $20/mo | Codex App + CLI + IDE, GPT-5.6 base usage |
| Pro 5x | $100/mo | 5x local-message capacity, full lineup + Codex-Spark |
| Pro 20x | $200/mo | 20x capacity, unlimited Voice |

GPT-5.6 in three flavors (Sol/Terra/Luna); within a tier Luna's allowance is 20-25x Sol's; GitHub-native (PR/issue delegation, auto code review). China accessibility 1/10.

### C. Domestic Coding Plans (GLM / Ark / Bailian / MiniMax / Kimi)

- Price: typically ¥50-200/month, RMB payment, direct domestic access - no payment/network friction.
- Forms: beyond classic Coding Plan (fixed monthly quota), new Agent Plan / Token Plan variants exist - see the [domestic coding plan roundup](/en/compare/coding-plan-comparison-2026/) and [three domestic subscription types](/en/compare/coding-plan-vs-agent-plan-vs-token-plan/).
- Capability: GLM-5.3 and peers are now first-tier - see the [GLM-5.3 Coding Plan review](/en/guides/glm-5.3-coding-plan-review/).

## Quota Mechanics Comparison

| Dimension | Claude | Codex | Domestic Coding Plans |
|------|--------|-------|------------------|
| Billing window | rolling 5h + weekly caps | rolling 5h + weekly caps | varies (monthly / daily refresh) |
| Quota pool | shared across all surfaces | local + cloud shared | per platform |
| Overage | usage credits (API rates) | credits (API rates) | usage add-ons / downgrade |
| Model freedom | Opus/Sonnet/Haiku family | GPT-5.6 tiers + preview | domestic models, some BYOK |

Claude and Codex are near-mirrors in mechanics (which is why their prices land roughly equal); domestic plans win on "cheap + direct access" but with a narrower model lineup.

## Decision Checklist

| Your situation | Recommendation |
|---------|------|
| Heavy Claude Code in the terminal, long code | **Claude Max 5x** |
| GitHub-primary, PR/issue automation | **Codex Pro 5x** |
| Multi-agent parallel + mobile control | **Codex Pro 20x** (unlimited Voice) |
| Large context + long one-shot generation | **Claude Max 5x** |
| Budget-sensitive / China | **domestic coding plan** (GLM best value) |
| Elastic usage / cross-model | **OpenRouter / API pay-as-you-go** |
| Want both | entry tier + pay-as-you-go on the other |

## Further Reading

- [Claude Max plan value analysis](/en/guides/claude-max-plan-value-analysis/)
- [Codex plan value analysis](/en/guides/codex-plan-value-analysis/)
- [Claude Code vs Codex (tools)](/en/compare/claude-code-vs-codex/)
- [Domestic coding plan roundup](/en/compare/coding-plan-comparison-2026/)
- [Coding Plan vs Agent Plan vs Token Plan](/en/compare/coding-plan-vs-agent-plan-vs-token-plan/)
- [OpenRouter guide](/en/guides/openrouter-guide/)
