---
title: "Using GitHub Copilot from China: Access, AI Credits Billing, and Alternatives"
description: "An assessment of Copilot accessibility from China, the new AI Credits billing system explained, plus domestic alternatives for developers who need a smoother experience."
date: "2026-05-17"
article_type: "explainer"
tags: ["copilot", "china", "billing", "GitHub", "credits", "extension"]
pillar: plans
content_status: keep
locale_strategy: mirrored
---

GitHub Copilot is the most familiar AI coding assistant for Chinese developers, with its $10/month Pro plan being the most affordable among overseas IDEs. But the 2026 **new signup pause, AI Credits billing overhaul**, and network issues in China have raised questions. This article breaks it all down.

## Accessibility from China

### Network

| Layer | Status | Notes |
|-------|--------|-------|
| GitHub website | ✅ Partially accessible | Works directly in some regions, intermittent otherwise |
| Copilot API | ⚠️ Unstable | AI completions and Chat hit separate API endpoints with poor reliability |
| Copilot Chat | ⚠️ Higher latency | Typically 200–500ms extra delay through VPN |

**Bottom line**: Copilot is **usable but degraded** from mainland China. The GitHub website itself is more accessible than the Copilot API endpoints.

### Payment

- Free tier: **no payment method needed** — just a GitHub account
- Pro and above: requires Visa/Mastercard; some domestic Chinese bank cards work for GitHub billing
- Students, teachers, and open-source maintainers: free Pro via GitHub Education
- ⚠️ **New signups for Pro/Pro+/Business paused since April 20, 2026**

## AI Credits Billing (Effective June 1, 2026)

Copilot is transitioning from request-based quotas to AI Credits (token-based billing):

| Plan | Monthly | AI Credits | Completions | Overage |
|------|---------|------------|-------------|---------|
| Free | $0 | Limited | 2,000/mo | — |
| Pro | $10 | ~$10 worth | Unlimited | Per-token |
| Pro+ | $39 | ~$39 worth | Unlimited | Per-token |

**Key changes**:
- Code completions and Next Edit suggestions **do not consume credits** (free)
- Premium models (Opus 4.7, etc.) consume more credits
- Auto mode selects the best model at a 10% discount
- Opus models are **Pro+ exclusive**

See our [Copilot AI Credits billing explainer](/en/guides/copilot-ai-credits-billing) for details.

## Free Tier in Practice

What you actually get with the permanent free plan:

- ✅ 50 Agent/Chat requests/month — sufficient for light daily coding
- ✅ 2,000 completions/month — Copilot's strongest feature
- ✅ Base models (Haiku 4.5, GPT-5 mini)
- ❌ No Opus, Sonnet 4.6, or other premium models
- ❌ Hard stop when quota is exhausted (no pay-as-you-go fallback)

**Good fit for**: students, light coders, developers who just want basic AI completions in JetBrains/VS Code.

## Domestic Alternatives (No VPN Required)

| Alternative | Cost | Network | Highlight |
|-------------|------|---------|-----------|
| [Trae CN](/en/tool/trae-cn) | Free | **No VPN** | Closest domestic Copilot-equivalent IDE |
| [Cline + Volcengine Ark](/en/plan/cline-ark) | ¥40/mo (¥9.9 first month) | **No VPN** | VS Code extension + Chinese models |
| [Cline + Bailian](/en/plan/cline-bailian) | ¥200/mo | **No VPN** | Qwen Coder model series |
| [Kiro IDE](/en/tool/kiro) | ~$2/mo | VPN | Original Claude models at 1/10 cost |

**Takeaway**: If your primary use case is Tab completion with occasional Chat, **Copilot Free is workable from China**. If you need Agent mode, multi-file editing, or MCP support, consider Cline + Volcengine Ark or Trae CN.

## Related Articles

- [Copilot AI Credits Billing Explained](/en/guides/copilot-ai-credits-billing)
- [Trae CN Setup Guide](/en/guides/trae-cn-setup)
- [Cline + Volcengine Ark Setup](/en/guides/cline-ark-setup)

> Data source: GitHub Copilot official docs + user reports (2026-05). Signup status and billing rules subject to change; verify against GitHub's latest announcements.
