---
title: "Using GitHub Copilot from China: Access, AI Credits Billing, and Alternatives"
description: "An assessment of Copilot accessibility from China, the new AI Credits billing system explained, plus domestic alternatives for developers who need a smoother experience."
date: "2026-05-17"
updated_at: "2026-10-16"
article_type: "explainer"
tags: ["copilot", "trae-cn", "kiro", "cursor", "claude-code", "china", "billing", "GitHub", "credits", "extension"]
pillar: plans
content_status: keep
locale_strategy: mirrored
---

GitHub Copilot Pro is $10/month and publishes 1,500 AI Credits. It is not the cheapest paid overseas tier: Cursor Plus is $8, and it is Grok-only. The plans page checked on October 16, 2026 offers self-serve signup and no longer states the April 20, 2026 signup pause. Network access from China is a separate question. Credit numbers below are from that plans page. The network notes are the earlier record and were not retested.

## Accessibility from China

### Network

| Layer | Status | Notes |
|-------|--------|-------|
| GitHub website | ✅ Partially accessible | Works directly in some regions, intermittent otherwise |
| Copilot API | ⚠️ Unstable | AI completions and Chat hit separate API endpoints with poor reliability |
| Copilot Chat | ⚠️ Higher latency | Typically 200–500ms extra delay through VPN |

**Bottom line**: Copilot is **usable but degraded** from mainland China. The GitHub website itself is more accessible than the Copilot API endpoints.

### Payment

- Free tier: **no payment method needed** — a GitHub account (2,000 completions/month, 50 chats/month, limited agent)
- Pro and above: requires Visa/Mastercard; some domestic Chinese bank cards work for GitHub billing
- Verified students use Copilot Student. The plans table does not publish that plan's credit amount. Verified teachers and maintainers of popular open-source projects may be eligible for free Pro. Those three groups are not all automatic free Pro
- The October 16, 2026 plans page offers self-serve signup. It does not restate the April 20, 2026 signup pause

## AI Credits (plans page, October 16, 2026)

On June 1, 2026, Copilot replaced request-count quotas with AI Credits. The amounts below are on the plans page checked that day. 1 credit = $0.01. The page says flex allotments may change.

| Plan | Monthly | AI Credits | Completions | Overage |
|------|---------|------------|-------------|---------|
| Free | $0 | 50 chats/mo | 2,000/mo | — |
| Pro | $10 | 1,500 (1,000 base + 500 flex) | Do not spend credits | $0.01/credit |
| Pro+ | $39 | 7,000 (3,900 base + 3,100 flex) | Do not spend credits | $0.01/credit |
| Max | $100 | 20,000 (10,000 base + 10,000 flex) | Do not spend credits | $0.01/credit |
| Business | $19/seat | 1,900, pooled | Do not spend credits | $0.01/credit |
| Enterprise | $39/seat | 3,900, pooled | Do not spend credits | $0.01/credit |

**What this check can say**:
- Code completions and Next Edit Suggestions do not spend credits. Free completions are still capped at 2,000/month
- Chat, agents, CLI, Spaces, and Spark spend credits
- Annual prices are not on the current plans page. Whether annual subscribers still sit on request-count was not re-checked
- Per-plan model checkmarks did not survive the fetch, so this article does not say a model belongs to only one tier. The old "Auto is 10% off" and "Opus is Pro+ only" lines are not restated

See our [Copilot AI Credits billing explainer](/en/guides/copilot-ai-credits-billing) for the older per-million token table. That rate table was not re-opened on October 16.

## Free Tier in Practice

What you actually get with the permanent free plan:

- ✅ 50 chats/month, with a limited agent allowance — enough to try, not enough for continuous agent work
- ✅ 2,000 completions/month
- The October 16 fetch did not keep a per-plan model list, so this section does not name which models Free includes
- ❌ The free chat allowance stops when it is used up. Overage at $0.01/credit is a paid-plan rule

**Good fit for**: students, light coders, developers who just want basic AI completions in JetBrains/VS Code.

## Domestic Alternatives (No VPN Required)

| Alternative | Cost | Network | Highlight |
|-------------|------|---------|-----------|
| [Trae CN](/en/tool/trae-cn) | Free | **No VPN** | Closest domestic Copilot-equivalent IDE |
| [Cline + Volcengine Ark](/en/plan/cline-ark) | ¥40/mo (¥9.9 first month) | **No VPN** | VS Code extension + Chinese models |
| [Cline + Bailian](/en/plan/cline-bailian) | ¥200/mo | **No VPN** | Qwen Coder model series |
| [Kiro IDE](/en/tool/kiro) | Free is 50 credits. Pro is $20 / 1,000 credits. Pro Max is $100 / 5,000. It is not about $2/mo | VPN | GA. Overage is $0.04/credit |

**Takeaway**: If your primary use case is Tab completion with occasional Chat, **Copilot Free is workable from China**. If you need Agent mode, multi-file editing, or MCP support, consider Cline + Volcengine Ark or Trae CN.

## Related Articles

- [Copilot AI Credits Billing Explained](/en/guides/copilot-ai-credits-billing)
- [Trae CN Setup Guide](/en/guides/trae-cn-setup)
- [Cline + Volcengine Ark Setup](/en/guides/cline-ark-setup)

> Plans and credits checked on October 16, 2026 against github.com/features/copilot and docs.github.com/en/copilot/get-started/plans. Network notes are the earlier record and were not retested. Annual prices, whether annual subscribers still use request-count, and per-plan model checkmarks were not on the fetched plans page.
