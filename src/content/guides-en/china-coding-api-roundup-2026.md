---
title: "China Coding API Roundup 2026: Ark vs Bailian vs MiniMax vs Zhipu vs DeepSeek"
description: "The most comprehensive 2026 comparison of Chinese AI coding API subscriptions: Volcengine Ark from ¥9.9, Alibaba Bailian ¥200, MiniMax ¥29, Zhipu GLM ¥49+, and DeepSeek pay-as-you-go. One big table, six scenarios, and a decision tree to find your fit in 30 seconds."
date: "2026-05-19"
updated_at: "2026-05-19"
article_type: "review"
tags: ["coding-plan", "comparison", "roundup", "ark", "bailian", "minimax", "glm", "zhipu", "deepseek", "china", "api"]
draft: false
faq:
  - q: "Which Chinese Coding API has the cheapest entry point?"
    a: |
      **Volcengine Ark Coding Plan Lite ¥9.9/mo** (promo price, original ¥40) is currently the lowest monthly subscription entry point for Chinese coding APIs.
      MiniMax Token Plan ¥29 (full-modal) is also low. Zhipu GLM starts at ¥49 (Lite). Bailian discontinued Lite and now starts at ¥200 (Pro).
  - q: "I want to use Claude Code — which Chinese gateway is best?"
    a: |
      Depends on model preference: for Doubao + multi-model Auto, pick **Volcengine Ark**; for GLM-5.1 flagship, pick **Zhipu Coding Plan**; for Qwen Coder, pick **Bailian**.
      All three support Anthropic-protocol endpoints — Claude Code just needs two env vars, no proxy required.
  - q: "Why doesn't DeepSeek have a Coding Plan?"
    a: |
      DeepSeek runs pure pay-per-token pricing with no monthly subscription; Web Chat is fully free.
      V4-Pro currently has a **75% discount (until 2026-05-31)** — extremely high ROI for heavy users, but only economical if usage varies. Steady users still benefit more from subscription plans.
  - q: "Can annual subscriptions really save 30%? Who offers them?"
    a: |
      **Zhipu** is the most aggressive: 10% off quarterly / 30% off annually (Pro at ¥104/mo paid annually).
      Bailian and Ark don't publish stable annual discounts (check official site). Be cautious — Chinese API prices move quickly; verify annual price beats current monthly promo before committing.
  - q: "Which is best for heavy multimodal / all-modal Agent workflows?"
    a: |
      **MiniMax Token Plan from ¥29** includes text/image/video/audio/music in one bundle — best price-per-modality.
      **Ark Agent Plan from ¥40** bundles Doubao-Seedance/Seedream + Harness toolchain (web search, memory); Medium tier and above (¥200+) includes the 24/7 AI Companion.
  - q: "What about teams with multiple seats?"
    a: |
      Bailian Token Plan **Team Edition from ¥198/mo** is one of the few products with explicit multi-seat support.
      Ark supports sub-accounts but doesn't bill per-seat. Zhipu, MiniMax, and DeepSeek require teams to subscribe individually or self-allocate budgets.
---

China's AI coding API subscription market exploded in 2026 — five major providers now offer fundamentally different product shapes: from Ark's ¥9.9 daily flash sales to Zhipu's 30%-off annual deals, from MiniMax's full-modal bundle to DeepSeek's pure pay-as-you-go. **Which one to buy?** This is a roundup for developers actually making the decision.

## TL;DR — Decide in 4 lines

- **Budget < ¥30, just trying it out**: Ark Coding Plan Lite **¥9.9**
- **Want stable GLM-5.1 / maximize annual discount**: Zhipu Coding Plan **Pro ¥149** (¥104/mo annual)
- **Heavy multimodal (audio/video included)**: MiniMax Token Plan **from ¥29**
- **Variable usage / want direct V4-Pro flagship**: DeepSeek API (pay-per-token, V4-Pro currently **75% off**)

For team scenarios or heavy Claude Code users, read on.

---

## One Big Table

| Dimension | Volcengine Ark | Alibaba Bailian | MiniMax | Zhipu GLM | DeepSeek |
|---|---|---|---|---|---|
| **Entry price** | ¥9.9/mo (Lite) | ¥200/mo (Pro) | ¥29/mo | ¥49/mo (Lite) | Pay-as-you-go |
| **Pricing model** | Subscription + sliding window | Subscription + monthly quota | Subscription + token pool | Subscription + sliding window | Per-token |
| **Quota mechanism** | 5h sliding ~1,200 calls | Monthly ~90,000 calls | Token pool | 5h sliding ~80 prompts | True usage |
| **Models** | 5 (Doubao+others) | 8 (full Qwen lineup) | Full multimodal | 3 (GLM-5/4.7/4.6) | DeepSeek series (V4/R1) |
| **Auto mode** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Anthropic protocol** | ✅ | ✅ | ✅ | ✅ | ❌ (OpenAI only) |
| **Claude Code native** | ✅ | ✅ | ✅ | ✅ | ❌ (needs wrapper) |
| **Annual discount** | Promo-dependent | Promo-dependent | Promo-dependent | **30% off** (best) | N/A |
| **Team / multi-seat** | Sub-accounts | **Team edition ¥198+** | Individual focus | Individual focus | Individual focus |
| **Network** | Mainland direct | Mainland direct | Mainland direct | Mainland direct | Mainland direct |
| **Payment** | Alipay / WeChat | Alipay / WeChat | Alipay / WeChat | Alipay / WeChat | Alipay / WeChat |
| **First-buy promo** | Lite ¥9.9 daily flash sale | None | None | **Discontinued** | V4-Pro 75% off until 5/31 |

---

## Pick by Scenario

### 🪙 Scenario A: Budget < ¥30, just want to experience it
**Verdict: Ark Lite ¥9.9**

Daily flash sale at 10:30 — new users get in and lock the price for a month. Fits daily chat + light agent tasks (1,200 calls per 5h). If the flash sale runs out, fall back to MiniMax ¥29 full-modal.

### 🦀 Scenario B: Claude Code with domestic models
**Verdict: Ark (multi-model) or Zhipu (GLM-focused)**

All three support Anthropic-protocol endpoints. Configure Claude Code with two env vars:

```bash
# Ark
export ANTHROPIC_BASE_URL="https://ark.cn-beijing.volces.com/api/coding/anthropic"
# Zhipu
export ANTHROPIC_BASE_URL="https://open.bigmodel.cn/api/anthropic"
# Bailian
export ANTHROPIC_BASE_URL="https://coding.dashscope.aliyuncs.com/apps/anthropic"
```

Picker: want Auto model routing → Ark; want GLM-5.1 flagship → Zhipu; want full Qwen Coder lineup → Bailian.

### 📊 Scenario C: Variable usage, don't want subscription lock-in
**Verdict: DeepSeek API**

The only non-subscription option — pure token-based pricing. V4-Pro currently 75% off (until 2026-05-31), 80.6% SWE-bench score — the cheapest flagship token rate available. Works with Cline / Aider / Cursor via OpenAI protocol. **Note**: no Anthropic protocol — Claude Code users need a wrapper like LiteLLM.

### 🎨 Scenario D: Heavy multimodal / all-modal Agent
**Verdict: MiniMax from ¥29 or Ark Agent Plan**

MiniMax Token Plan bundles text/image/video/audio/music — five modalities at a ¥29 entry. Ark Agent Plan from ¥40 includes Doubao-Seedance 2.0 (video) + Seedream 5.0 lite (image) + Harness toolchain (web search, memory); ¥200+ tier adds the 24/7 AI Companion.

⚠️ Agent Plan applies a **7.5× multiplier** for long context (>128k) — long-running tasks burn quota fast.

### 👥 Scenario E: Team with multiple seats
**Verdict: Bailian Token Plan Team Edition from ¥198/mo**

One of the few Chinese products with explicit per-seat billing. Ark supports sub-accounts but doesn't bill per seat. Others are individual-focused.

### 💰 Scenario F: Annual subscription for max discount
**Verdict: Zhipu GLM Coding Plan**

Zhipu has the most aggressive discount: **10% off quarterly / 30% off annually**. Pro monthly ¥149, annual drops to ¥104/mo. Catch: only worthwhile if you're already committed to GLM models — the savings only matter if you lock into a single family.

⚠️ Zhipu repriced 2026-02 with 30%+ increase and removed first-buy discounts. Entry cost is no longer as low as before.

---

## Deep Dive: All Five

### 1. Volcengine Ark (Coding Plan / Agent Plan)

**Position**: Lowest entry price in China + broadest client support.

| Tier | Price | Quota |
|---|---|---|
| Coding Plan Lite | ¥9.9/mo | 5h ~1,200 calls |
| Coding Plan Pro | ¥49.9/mo | 5h ~6,000 calls |
| Agent Plan Small | ¥40/mo | 20,000 AFP (multimodal) |
| Agent Plan Medium | ¥200/mo | 100,000 AFP + 24/7 AI Companion |

**Strengths**: Auto mode (routes by task complexity), 11+ client support including native Anthropic protocol for Claude Code, transparent daily 10:30 flash sale.

**Watch out**: 5h sliding window can throttle bursty workloads. Agent Plan tokens cost 2–2.5× more than Coding Plan — not recommended for pure text coding.

See [Ark Coding Plan complete guide](/en/guides/ark-coding-plan-guide/) and [Agent Plan explainer](/en/guides/ark-agent-plan/).

### 2. Alibaba Bailian (Coding Plan / Token Plan)

**Position**: Most models (8 including full Qwen lineup) + explicit team multi-seat.

| Tier | Price | Quota |
|---|---|---|
| Coding Plan Pro | ¥200/mo | Monthly ~90,000 calls |
| Token Plan Team | from ¥198/mo | Multi-seat |

**Strengths**: Only Chinese plan bundling Qwen Coder + Qwen Plus + GLM + Kimi + MiniMax. Team edition with per-seat billing — best for enterprise. Monthly quota mechanism — front-loadable.

**Watch out**: Lite discontinued (sold out March 2026, renewals stopped April). Entry now ¥200. No Auto mode — must specify model IDs manually.

See [Bailian Coding Plan complete guide](/en/guides/bailian-coding-plan/).

### 3. MiniMax Token Plan

**Position**: Lowest entry for full-modal subscription (audio/music included).

- Entry **¥29/mo**
- Covers text / code / image / video / audio / music
- Best fit for multimedia teams, voice/music app builders

**Watch out**: Pure coding isn't its core strength — coding ability lags Ark / Bailian / Zhipu somewhat.

See [MiniMax Token Plan explainer](/en/guides/minimax-token-plan/).

### 4. Zhipu GLM Coding Plan

**Position**: GLM-5.1 flagship + best annual discount for committed users.

| Tier | Monthly | Quarterly | Annual |
|---|---|---|---|
| Lite | ¥49 | ¥44/mo | ¥34/mo |
| Pro | ¥149 | ¥134/mo | **¥104/mo** |
| Max | ¥469 | ¥422/mo | ¥328/mo |

**Strengths**: GLM-5.1 ranks at the top of Chinese coding benchmarks. 30% annual discount is the most aggressive among peers. Anthropic protocol supported — Claude Code works out-of-box.

**Watch out**: Repriced 2026-02 with 30%+ increase, no first-buy discount. Only GLM-family models — no multi-vendor rotation.

### 5. DeepSeek API (pay-as-you-go, **outlier**)

**Position**: Only non-subscription option, only official direct channel for V4-Pro / R1.

- **V4-Flash**: $0.14/M input, 82.6% HumanEval
- **V4-Pro**: 80.6% SWE-bench, Codeforces #1 (3,206) — currently **75% off, ends 2026-05-31**
- Web Chat fully free

**Strengths**: True usage-based pricing, no subscription lock. V4-Pro discounted is the cheapest flagship token rate in China. Direct developer access — no middlemen.

**Watch out**:
- No Anthropic protocol — Claude Code users need LiteLLM or similar wrapper
- Steady users likely save more with subscription plans
- Web tier suffices for individual light usage

---

## Decision Tree (30 seconds)

```
What's your monthly budget?
├─ < ¥20 → Ark Lite ¥9.9 (trial)
├─ ¥30~¥100
│   ├─ Want full-modal → MiniMax ¥29
│   └─ Want GLM-5.1 → Zhipu Lite ¥49
├─ ¥100~¥300
│   ├─ Need team multi-seat → Bailian Team ¥198
│   ├─ Maximize annual discount → Zhipu Pro annual ¥104/mo
│   ├─ Solo heavy coding → Ark Coding Pro ¥49.9 or Agent Plan Small ¥40
│   └─ Multi-model rotation → Bailian Pro ¥200
├─ > ¥300 (heavy Agent)
│   ├─ Multimodal + Harness → Ark Agent Plan Medium ¥200
│   ├─ Team scale-up → Bailian Team upgrade
│   └─ Flexible usage + flagship → DeepSeek V4-Pro (pay-as-you-go)
└─ Very unstable usage → DeepSeek pay-as-you-go
```

---

## My Final Recommendation

If you want a single **default recommendation**: **start with Ark Lite ¥9.9 for one month**, measure your real consumption, then decide whether to upgrade or migrate. ¥10 buys you data — and solves the "which tier do I actually need" decision paralysis for 80% of users.

After one month, if you find yourself:
- Constantly hitting the 5h window → upgrade to Coding Pro or Agent Plan
- Wanting GLM flagship + can afford annual → migrate to Zhipu Pro annual
- Scaling team → switch to Bailian Team
- Usage too variable → switch to DeepSeek pay-as-you-go

---

## Related

- [Coding Plan landing page](/en/coding-plan/) — all 5 plans + recommended bundles
- [Bailian vs Volcengine Ark Coding Plan](/en/compare/bailian-coding-plan-vs-ark-coding-plan/)
- [Cline + Ark setup guide](/en/guides/cline-ark-setup/)
- [Cursor in China complete guide](/en/guides/cursor-china-usage/)
- [GitHub Copilot June billing change](/en/guides/copilot-ai-credits-billing/)

> Verified through 2026-05-19. All prices, quotas, and promotions per official channels — Chinese API pricing moves quickly, double-check before subscribing.
