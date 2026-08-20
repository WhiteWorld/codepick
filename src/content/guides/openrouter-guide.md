---
title: "OpenRouter 充值与使用指南（2026）：一个 API 用遍 500+ 模型"
description: "OpenRouter 是聚合 500+ 模型、80+ 提供商的统一 API 接口，支持信用卡、支付宝和 USDC 加密币充值，按量计费无订阅。本文讲清怎么注册充值、怎么配到 Cline/Aider/OpenCode 等工具里、手续费与退款规则，以及和 API 中转站、官方订阅怎么选。"
date: "2026-08-20"
article_type: howto
tags: [openrouter, api, credits, 充值, 指南]
pillar: plans
content_status: keep
locale_strategy: mirrored
draft: false
---

## 先说结论

- **OpenRouter 适合谁**：不想订阅多家模型、想用一个 API key 随时切换 Claude/GPT/Gemini/DeepSeek 等模型、且用量弹性大的开发者或团队。
- **不适合谁**：需要国内直连、人民币直付、或极致低价——OpenRouter 充值用国际卡/支付宝（支付宝支持有限）且走海外网络，国内体验不如国产 Coding Plan。
- **成本特点**：无订阅费、按 token 计费，OpenRouter 对模型本身不加价（只收小额充值手续费），用量小的时候远比订阅便宜。
- **风险点**：退款窗口只有 24 小时；2026-08-19 官方宣布加入 Stripe，长期策略值得观察。

---

## OpenRouter 是什么

OpenRouter 是一个**模型聚合 API**：通过一个统一接口访问 500+ 模型（80+ 提供商），覆盖文本、图像、视频、音频，接口完全兼容 OpenAI SDK。它的三个核心卖点：

1. **一个 key 用所有模型**：Claude、GPT、Gemini、DeepSeek、Kimi……不用为每家单独注册和计费。
2. **自动容灾**：某个提供商挂了，流量自动回退到其他提供商。
3. **按量计费**：无月费、无订阅，充多少用多少。

它被大量工具内置支持——站内的 Cline、Aider、Roo Code、OpenCode 都把 `openrouter` 列为兼容 API，拿到 key 填进去就能用。

## 注册与充值

官方数据（2026-08-20 核对 openrouter.ai）：

- **注册**：支持 Google / GitHub / MetaMask 登录，注册后可创建个人或组织（Org）。
- **充值（Credits）**：先充一笔 credits，再按实际用量扣费；credits 可用于任意模型和提供商。
- **支付方式**：主流信用卡、**支付宝（AliPay）**、加密货币（USDC）；官方表示 PayPal 即将支持。
- **手续费**：OpenRouter 对模型定价**不加价**，只在充值 credits 时收取小额手续费（未披露具体费率，以充值时页面为准）。
- **退款**：未使用的 credits 可在**交易后 24 小时内**申请退款，超过 24 小时未使用部分不退。

> 提示：免费模型（如部分开源模型）的每日调用限流与你的已购 credits 挂钩，买过 credits 的账户限流更高。

## 使用流程

1. **注册 + 充值**：openrouter.ai → Sign up → 在 Credits 页面充值（建议先充小额试水，如 $10）。
2. **拿 API key**：Dashboard → Keys → Create key，形如 `sk-or-v1-...`。
3. **配置到工具**：
   - **Cline**：设置 → API Provider 选 OpenRouter，填入 key，选模型（如 `anthropic/claude-opus-5`、`deepseek/deepseek-chat`）。
   - **Aider / OpenCode / Roo Code**：设置环境变量 `OPENROUTER_API_KEY=sk-or-v1-...`，模型名用 OpenRouter 的 `org/model` 格式。
   - 也可以直接用 OpenAI SDK 把 base URL 指到 OpenRouter，作为 drop-in 替换。
4. **看用量**：Dashboard 里能按模型/日期看 token 消耗，设置 Org 预算可以控成本。

## 和 API 中转站、官方订阅怎么选

- **vs API 中转站**：中转站主打"国内低成本接入 Claude Code"，价格更低但稳定性和安全性参差；OpenRouter 是海外官方聚合，模型全、可靠，但国内网络与支付门槛更高。纠结的看我们的 [AI 编程 API 中转站选型指南](/zh/compare/api-relay-guide/)。
- **vs 官方订阅**（Claude Max / Codex Pro）：订阅是"固定月费买额度上限"，适合每天高强度使用；OpenRouter 按量付费，适合弹性用量，峰值省、谷值不浪费。对比口径见 [Claude Max 套餐分析](/zh/guides/claude-max-plan-value-analysis/) 和 [Codex 套餐分析](/zh/guides/codex-plan-value-analysis/)。
- **折中**：日常主力用国产 Coding Plan（国内直连便宜），跨模型/攻坚用 OpenRouter 按量。

## 注意事项

- **国内网络**：openrouter.ai 与 API 端点需要稳定代理；没有的话请先确认网络方案再充值。
- **成本可控性**：按量计费意味着成本随用量波动，建议设 Org 预算、用便宜模型处理简单任务。
- **BYOK**：支持用自己的提供商 key（如 Anthropic），OpenRouter 只做路由；BYOK 有按列表价计算的免费额度。
- **Stripe 收购**：2026-08-19 官方宣布加入 Stripe，未来定价/支付政策可能有变化，重大使用前留意官方公告。

## 数据来源与复核

- 模型数量、支付方式、手续费与退款政策、BYOK：OpenRouter 官方文档与 FAQ（openrouter.ai/docs/faq），2026-08-20 核对。
- 工具集成情况：站内 `data/tools/`（cline / aider / opencode / roo-code 的 compatible_apis）。
- 建议每季度复核一次支付与手续费政策；发现过期内容欢迎在 GitHub 仓库提 issue。
