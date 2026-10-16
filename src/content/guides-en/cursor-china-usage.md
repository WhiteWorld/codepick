---
title: "Complete Guide to Using Cursor from China: Network, Payment, and Alternatives"
description: "Developers in China still need a proxy, a foreign card, and a plan for latency. This guide matches Cursor's 2026-10-16 pricing page: Free, Plus, and Premium, plus VPN-free alternatives."
date: "2026-05-17"
updated_at: "2026-10-16"
article_type: "howto"
tags: ["cursor", "china", "payment", "VS Code", "ide", "alternatives"]
faq:
  - q: "Can I use Cursor from China without a VPN?"
    a: |
      No. Cursor's AI endpoints are on Cursor's own infrastructure. Free needs a proxy too.
      For a VPN-free workflow, use Trae CN (ByteDance, direct mainland access) or Cline + Volcengine Ark (Lite ¥9.9 for the first month, then ¥40).
  - q: "Can I pay Cursor with Alipay or WeChat Pay?"
    a: |
      No. Cursor accepts Visa/Mastercard dual-currency credit cards. PayPal, Alipay, and WeChat Pay are not accepted.
      Without a foreign-currency card, look at Kiro or a domestic Coding Plan (Ark, Bailian, or MiniMax).
  - q: "Is the old Pro plan at $20/month still enough?"
    a: |
      That plan is gone. On 2026-10-16 the individual tiers are Free $0, Plus $8, Premium $30, Super $100, and Ultra $200.
      Plus is Grok models only. The usage pool is shared with Grok and refreshes weekly. The page does not publish the pool's dollar size, so "is $20 enough" has no answer on this page.
      Claude, GPT, and Gemini start at Premium and are billed at API list price. They are not included in the $30. Heavy use can cost more than the subscription.
  - q: "Cursor vs Trae CN — which fits developers in China?"
    a: |
      If a proxy is stable, and you accept Plus as Grok-only or Premium at $30 plus API charges for other models, Cursor's coding score is still 9.5.
      If you do not want a proxy, Trae CN is the free mainland alternative. It is hosted by ByteDance and includes Doubao, DeepSeek, and Kimi.
pillar: tools
content_status: keep
locale_strategy: mirrored
---

Cursor's coding score is 9.5/10. Developers in China still have three hurdles: **network, payment, and latency**. The pricing page also changed on 2026-10-16. This guide follows that page.

## The Three Hurdles

| Hurdle | Detail | Affects |
|--------|--------|---------|
| Network | A proxy is required to reach Cursor API endpoints | Everyone, including Free |
| Payment | Foreign credit cards only. No WeChat Pay or Alipay | Anyone buying a paid tier |
| Latency | The proxy adds delay to Tab completion | Heavy completion users |

## Individual tiers (2026-10-16)

Source: [cursor.com/en/pricing](https://cursor.com/en/pricing). Hobby, Pro at $20, and Pro+ at $60 are not on this page. The page also does not publish a dollar size for the usage pool.

| Plan | Price | What the page says |
|------|-------|--------------------|
| Free | $0 | Limited AI usage. Limited Agent requests and limited Chat requests |
| Plus | $8/mo | Usage pool shared with Grok, refreshed weekly. Grok models only |
| Premium | $30/mo | 4x Plus. Includes cloud agents, Origin code hosting, and Bugbot. Third-party models are billed at API list price |
| Super | $100/mo | 15x Plus. Third-party models are billed at API list price |
| Ultra | $200/mo | 50x Plus. Third-party models are billed at API list price |

Sign up for Free at [cursor.com/signup](https://cursor.com/signup). The app runs on macOS, Windows, and Linux. The pricing page does not say Free requires a card.

Plus is not a cheaper Pro. It does not include Claude, GPT, or Gemini. Those models start at Premium and are billed separately. The monthly fee is not a usage cap.

The installer version was not re-checked. `current_version` in the tool data is still the previously recorded 3.5.

## Payment

Paid tiers still take Visa or Mastercard. PayPal, Alipay, and WeChat Pay are not accepted. Some dual-currency cards issued in China work. That depends on the bank. You can turn off auto-renew after subscribing.

### Teams and Enterprise

Teams starts at **$30/user/month** (the page shows $30+). Usage is 4–50x Plus, by seat tier. The plan includes centralized billing, usage analytics, team privacy, and SAML/OIDC SSO.

Enterprise has no published price. The page lists pooled usage, invoice/PO billing, SCIM, and audit logs.

## Network

- Use a stable US node. Switching IPs often can trip risk checks
- Keep one node for a session
- If proxy latency is high, completion gets worse. A domestic alternative is the practical option

## Alternatives that do not need a proxy

| Alternative | Cost | Network | Notes |
|-------------|------|---------|-------|
| [Trae CN](/en/tool/trae-cn) | Free | **No VPN** | ByteDance, direct access in mainland China |
| [Cline + Volcengine Ark](/en/plan/cline-ark) | ¥40/mo (¥9.9 first month) | **No VPN** | VS Code extension plus a domestic API |
| [Cline + Bailian](/en/plan/cline-bailian) | ¥200/mo | **No VPN** | Qwen Coder models |
| [Kiro](/en/tool/kiro) | Free is 50 credits. Pro is $20/mo with 1,000 credits | VPN | Overage is $0.04/credit. Pro Max is $100 for 5,000 credits |

For a mainland IDE, start with Trae CN. To stay in VS Code and swap models, use Cline + Volcengine Ark. Kiro is not "about $2/month". Pro is $20/month.

## Related articles

- [Cursor vs Windsurf 2026](/en/compare/cursor-vs-windsurf)
- [Cursor cost notes](/en/guides/cursor-cost-saving)
- [Trae CN setup](/en/guides/trae-cn-setup)

> Prices checked 2026-10-16 against the [Cursor pricing page](https://cursor.com/en/pricing). The dollar size of the usage pool, and any IDE version after 3.5, are not published there. This page does not fill those in. Whether a given card or proxy works is something you have to test.
