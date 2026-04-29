---
title: "Where Is DeepSeek V4 API Available? Official, Model IDs, and Platform Support"
description: "As of 2026-04-29, this guide checks where DeepSeek-V4 is actually available across the official API, Alibaba Cloud Bailian, Together, Fireworks, Novita, OpenRouter, and more — plus the correct model IDs and integration path."
date: "2026-04-29"
article_type: "howto"
tags: ["deepseek", "deepseek-v4", "api", "openrouter", "bailian", "together", "fireworks"]
draft: false
---

If you're searching for "DeepSeek V4 API", the first thing to know is this: **DeepSeek does provide a V4 API officially, but the actual official model IDs are not `deepseek-v4`. They are `deepseek-v4-pro` and `deepseek-v4-flash`.**

That naming mismatch is where most confusion starts. Websites, news posts, and third-party model pages often say "DeepSeek V4", but what really matters in production is the **exact model ID**, whether the platform is **OpenAI-compatible**, and whether the model is **actually available today**.

This guide summarizes the public official information available on 2026-04-29 and answers two questions:

1. **Which platforms actually offer DeepSeek V4 API access?**
2. **What is the fastest way to make your first request?**

---

## Quick Answer

- **The official DeepSeek platform is available** and remains the safest default choice
- **DeepSeek recommends OpenAI-compatible access** with `base_url` set to `https://api.deepseek.com`
- The official V4 models to use are:
  - `deepseek-v4-pro`
  - `deepseek-v4-flash`
- Legacy aliases `deepseek-chat` and `deepseek-reasoner` still appear in the docs, but DeepSeek marks them for deprecation on **2026-07-24**
- As of 2026-04-29, the platforms where V4 can be clearly verified from public official pages include:
  - DeepSeek official
  - Alibaba Cloud Bailian
  - Together AI
  - Fireworks AI
  - Novita AI
- **OpenRouter has a `deepseek/deepseek-v4` page, but that page explicitly says the model is not available**
- **Volcengine Ark, Tencent Cloud, and Replicate** do not have enough public official evidence here to safely describe as "DeepSeek V4 supported"

---

## DeepSeek V4 API Platform Summary

| Platform | Available on 2026-04-29 | Verified model name / ID | OpenAI-compatible | Notes |
|----------|--------------------------|--------------------------|-------------------|-------|
| DeepSeek official | ✅ Yes | `deepseek-v4-pro`, `deepseek-v4-flash` | ✅ | Best documentation, canonical naming |
| Alibaba Cloud Bailian | ✅ Yes | `deepseek-v4-pro`, `deepseek-v4-flash` | Platform-specific integration path | Good fit for mainland China deployments |
| Together AI | ✅ Yes | `deepseek-ai/DeepSeek-V4-Pro`, `deepseek-ai/DeepSeek-V4-Flash` | ✅ | Easy if you already use OpenAI SDKs |
| Fireworks AI | ✅ Yes | `deepseek-v4-pro` | ✅ | Official docs support OpenAI client usage |
| Novita AI | ✅ Yes | `Deepseek V4 Pro`, `Deepseek V4 Flash` | ✅ | Public model pages show pricing and context |
| OpenRouter | ⚠️ Page exists, unavailable that day | `deepseek/deepseek-v4` | ✅ | Public page explicitly says not available |
| SiliconFlow | ⚠️ DeepSeek models exist, but no public V4 entry confirmed here | `DeepSeek-V3.1`, `DeepSeek-V3.2`, etc. | ✅ | Do not overstate as confirmed V4 support |
| Volcengine Ark | ❓ Not confirmed from public official pages here | — | — | Avoid claiming support without stronger evidence |
| Tencent Cloud | ❓ Not confirmed from public official pages here | — | — | Public docs found here focus on Hunyuan |
| Replicate | ❓ No official DeepSeek V4 entry confirmed here | — | Mostly its own prediction API style | Avoid claiming official V4 support |

> Methodology: only platforms that can be verified from public official docs or official model pages are marked as confirmed.

---

## How to Use the Official DeepSeek V4 API

If you just want the fastest path to a working request, start with the official API.

### Step 1: Create an API key

Create a DeepSeek API key, then export it locally:

```bash
export DEEPSEEK_API_KEY="your DeepSeek API key"
```

### Step 2: Use the OpenAI-compatible endpoint

Official base URL:

```bash
https://api.deepseek.com
```

Most common endpoint:

```bash
https://api.deepseek.com/chat/completions
```

### Step 3: Send your first request

```bash
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-v4-pro",
    "messages": [
      {"role": "user", "content": "Explain DeepSeek V4 API in one sentence."}
    ],
    "stream": false
  }'
```

If you care more about speed and cost, switch the model to `deepseek-v4-flash`.

---

## Using the OpenAI SDK with DeepSeek

If your stack already uses the `openai` SDK, migration is simple: change the `base_url`, `api_key`, and model name.

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["DEEPSEEK_API_KEY"],
    base_url="https://api.deepseek.com",
)

resp = client.chat.completions.create(
    model="deepseek-v4-pro",
    messages=[
        {"role": "user", "content": "What is a cache hit in LLM APIs?"}
    ],
)

print(resp.choices[0].message.content)
```

That is also why third-party providers emphasize OpenAI compatibility: you often do not need to change your application logic.

---

## How to Choose a Platform

### 1. DeepSeek official

**Best for** developers who want the clearest naming, the latest official rollout, and the least ambiguity.

Why it is the safest default:
- Canonical model names
- Best official docs
- Clear OpenAI-compatible entry point
- Explicit migration guidance for legacy aliases

Recommended choices:
- `deepseek-v4-pro` for higher-quality, heavier tasks
- `deepseek-v4-flash` for speed and lower cost

### 2. Alibaba Cloud Bailian

**Best for** teams in China, or organizations already standardized on Alibaba Cloud.

Publicly verifiable details:
- Official model pages list `deepseek-v4-pro` and `deepseek-v4-flash`
- Mainland China and global deployment scopes differ
- Mainland listing shows **China North 2 (Beijing)**
- Global listing shows **US (Virginia)**

For domestic production and procurement workflows, this is often easier than overseas providers.

### 3. Together / Fireworks / Novita

**Best for** teams already building on model aggregators and unified OpenAI-compatible gateways.

Shared advantages:
- Public official pages clearly list V4 models
- OpenAI-compatible integration is straightforward
- Good fit if you already route multiple providers through one abstraction layer

The main differences are in:
- Model ID naming
- Pricing
- Cache billing
- Context window and output limits
- Whether both Pro and Flash are available at the same time

### 4. OpenRouter

**Do not assume support just because a model page exists.**

As of 2026-04-29, OpenRouter shows a `deepseek/deepseek-v4` page, but the page explicitly says:

> The model "deepseek/deepseek-v4" is not available

So the safe rule is: **a model page is not the same thing as an actually callable model.**

---

## The Naming Trap: DeepSeek V4 vs `deepseek-v4-pro` vs `deepseek-chat`

This is the single most important clarification.

### 1. `DeepSeek-V4` is the product or series name

That is the label you usually see on websites, launch posts, and model catalogs.

### 2. The actual official API model IDs are:

- `deepseek-v4-pro`
- `deepseek-v4-flash`

### 3. Legacy aliases still exist, but should not be your default for new projects

The official docs still mention:

- `deepseek-chat`
- `deepseek-reasoner`

They are compatibility aliases and already marked for deprecation. New integrations should use the V4 model IDs directly.

---

## What to Check Before You Ship

Before you use DeepSeek V4 in production, do not stop at “this platform has it.” Check these four things:

1. **Input and output pricing**
2. **Cache hit vs cache miss billing**
3. **Context window size**
4. **Max output token limit**

DeepSeek's official pricing page is the best place to understand the baseline. Third-party platforms may change model IDs, pricing logic, or caching behavior.

The safest workflow is:

- understand the model from DeepSeek's own docs first
- verify the final platform-specific model page before launch

---

## Four Common Pitfalls on Third-Party Platforms

### 1. Model names may differ completely

For example:
- official: `deepseek-v4-pro`
- Together: `deepseek-ai/DeepSeek-V4-Pro`
- OpenRouter: `deepseek/deepseek-v4`

Never copy a model name from one provider to another blindly.

### 2. OpenAI-compatible does not mean perfectly identical

Providers may differ in:
- supported parameters
- reasoning or thinking modes
- function calling
- JSON mode
- streaming behavior

So “it runs” does not always mean “it behaves exactly the same.”

### 3. Domestic cloud platforms may add account, region, or compliance requirements

Alibaba Cloud Bailian already shows region and deployment-scope differences. In enterprise environments, you should also confirm:

- whether real-name verification is required
- whether an enterprise account is needed
- whether you must pick a supported region
- whether additional service activation is required

### 4. Pricing changes quickly

Model pricing moves fast. Any price in an article should be treated as a snapshot for that day, not a guarantee.

---

## If You Want the Safest Default Choice

My recommendation is simple:

- **Solo developer / fastest path**: use the official DeepSeek API first
- **China-based company or team**: check Alibaba Cloud Bailian first
- **Already on global model gateways**: compare Together, Fireworks, and Novita
- **Seeing an OpenRouter model page**: confirm actual availability before integrating

---

## Summary

As of 2026-04-29, **DeepSeek V4 API is available on more than just the official platform**. But when you actually integrate it, the important questions are not just “does this site mention DeepSeek V4?” They are:

1. What is the **real callable model ID** on this platform?
2. Is the model **actually available today**?
3. Does the platform fit your existing **OpenAI SDK or gateway workflow**?

If you want the least risky route, start with the official DeepSeek API and use **`deepseek-v4-pro`** or **`deepseek-v4-flash`** directly. Move to Bailian, Together, Fireworks, or other platforms only when you specifically need multi-provider routing, cloud procurement alignment, or different cost controls.

References:
- [DeepSeek API Docs](https://api-docs.deepseek.com/)
- [DeepSeek Pricing](https://api-docs.deepseek.com/quick_start/pricing)
- [Alibaba Cloud Bailian Models](https://help.aliyun.com/zh/model-studio/getting-started/models)
- [OpenRouter DeepSeek V4 page](https://openrouter.ai/deepseek/deepseek-v4)
- [Together Models](https://www.together.ai/models)
- [Fireworks Models](https://fireworks.ai/models)
- [Novita Models](https://novita.ai/models)
