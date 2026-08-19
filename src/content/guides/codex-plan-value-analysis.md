---
title: "Codex 套餐性价比分析（2026）：Plus、Pro 5x、Pro 20x 怎么选"
description: "OpenAI Codex 现在是订阅制：Plus $20/月、Pro 5x $100/月、Pro 20x $200/月。本文按官方 2026-08-19 价格与用量规则算账：GPT-5.6 Sol/Terra/Luna 各档 5 小时窗口消息数、credits 体系、撞墙后的出路，帮你判断订阅还是 API 按量，以及和 Claude Max、国产 Coding Plan 的横向对比。"
date: "2026-08-19"
article_type: review
tags: [codex, chatgpt, openai, pricing, subscription]
pillar: plans
content_status: keep
locale_strategy: mirrored
draft: false
---

## 先说结论

- **重度 Codex 用户**（每天在 CLI / IDE 里跑 Agent 会话 2 小时以上）：Pro 5x（$100/月）是甜点区，本地消息量是 Plus 的 5 倍，且能用 GPT-5.6 全系。
- **全天候多任务、经常撞周上限**：Pro 20x（$200/月）才有意义；一般用量 Pro 5x + 偶尔买 credits 更划算。
- **只偶尔用**：Plus（$20/月）的 Luna/Terra 档位足够，别急着上 Pro。
- **用量极不稳定或团队采购**：先算 API 按量账；团队直接看 Business。
- 和昨天写的 [Claude Max 分析](/zh/guides/claude-max-plan-value-analysis/) 结论一致：这类订阅买的是「天花板 + 省心」，对国内用户还有支付与网络成本，预算敏感者优先看国产 Coding Plan。

---

## 套餐结构（官方 2026-08-19 核对）

Codex 现在挂在 ChatGPT 订阅体系下，共 5 种付费方式：

| 档位 | 月费 | 定位 |
|------|------|------|
| Plus | $20/月 | 入门，Codex CLI / IDE / App 可用 |
| Pro 5x | $100/月 | 重度用户，5 倍于 Plus 的本地消息量 |
| Pro 20x | $200/月 | 最高个人档，20 倍消息量 + 无限制 Voice |
| Business | 按座席 | 团队管理、自动化 Code Review、Slack/Linear 集成 |
| API Key | 按量 | 灵活，token 计费，成本随用量波动 |

Pro 档额外包含：更高输出、高峰期优先、GPT-5.3-Codex-Spark 研究预览（仅 Pro）、更多 Voice 时长（Pro 20x 无限）。

## 用量机制：按模型分档的 5 小时窗口

Codex 的用量不是"固定条数"，而是按模型和复杂度浮动，5 小时滚动窗口 + 可能的周上限，本地会话与云端共享。官方给出的各档位**本地消息数 / 5 小时窗口**：

| 模型 | Plus | Pro 5x | Pro 20x |
|------|------|--------|---------|
| GPT-5.6 Sol（最强推理） | 10-100 | 50-500 | 200-2,000 |
| GPT-5.6 Terra（日常主力） | 25-200 | 125-1,000 | 500-4,000 |
| GPT-5.6 Luna（高吞吐） | 250-2,000 | 1,250-10,000 | 5,000-40,000 |
| GPT-5.5 | 15-80 | 75-400 | 300-1,600 |
| GPT-5.4 | 20-100 | 100-500 | 400-2,000 |
| GPT-5.4 mini | 60-350 | 300-1,750 | 1,200-7,000 |

几点关键解读：

1. **选对模型比选对套餐更能省额度**：同一档位下 Luna 的额度是 Sol 的 20-25 倍。日常简单任务用 Luna/Terra，把 Sol 留给真正难的问题，5h 窗口能撑很久。
2. **Business 座席 = Plus 级用量**，但带团队管理；Enterprise/Edu 灵活定价则按 credits 走，无固定限流。
3. **撞墙后可买 credits 续跑**，或临时切小模型；所有用户还可以用 API Key 跑额外本地会话（按标准 API 费率）。

## credits 计价：GPT-5.6 平均每条 5-40 credits

撞墙后的 credits 按 token 计费，官方费率（credits / 每 1M tokens，输入/缓存/输出）：

| 模型 | 输入 | 缓存输入 | 输出 |
|------|------|---------|------|
| GPT-5.6 Sol | 125 | 12.5 | 750 |
| GPT-5.6 Terra | 50 | 5 | 300 |
| GPT-5.6 Luna | 5 | 0.5 | 30 |
| GPT-5.5 | 125 | 12.5 | 750 |
| GPT-5.4 | 62.5 | 6.25 | 375 |
| GPT-5.4 mini | 18.75 | 1.875 | 113 |

官方说明 GPT-5.6 平均每条消息消耗 5-40 credits。粗算：一次长上下文 Agent 任务（几十万输入 token）在 Terra 上约消耗 15-25 credits，Sol 上约 40-90 credits。如果你每周都要买 credits，说明套餐档位低了——升级 Pro 通常比持续买 credits 便宜。

## 算账：Plus / Pro 5x / Pro 20x / API

- **Plus $20**：适合每月 <50 次中等会话、且以 Luna/Terra 为主的人。按 Terra 25-200 条 / 5h 算，一天认真用 1-2 小时基本够。
- **Pro 5x $100**：Terra 125-1,000 条 / 5h，Sol 50-500 条——重度开发者的甜点区。对比 API 按量（Sol 750 输出 credits / 1M tokens，折合订阅外购买价），每天 4-6 次 Sol 级会话就值回票价。
- **Pro 20x $200**：接近"无感额度"，适合整天挂 Agent、多任务并行、Voice 无限时长。如果你的 5x 周上限经常触顶，20x 的增量成本（$100）大概率低于限流等待和 credits 采购。
- **API Key**：用量波动大、或想完全按 token 付费时更灵活；缺点是成本不可控、没有订阅附带的 Voice/Web/云功能。

## 和 Claude Max / 国产方案对比

- **Claude Max 5x/20x（$100/$200）**：结构几乎一模一样（5 小时窗口 + 周上限 + 全端共享 + credits 续跑）。差异在模型生态：Claude 的 Opus 系在长代码生成上仍是站内评分最高（9.6/10），Codex 的 GPT-5.6 系在 Agent 编排和 GitHub 原生集成（@Codex 委派 PR/issue、自动 Code Review）上更强。纠结选型的看 [Claude Code vs Codex 对比](/zh/compare/claude-code-vs-codex/)。
- **国产 Coding Plan（GLM / 方舟 / 百炼）**：月费 ¥50-200，人民币直付、国内直连。Codex 的 chatgpt.com 访问与支付在国内有现实摩擦（站内 `codex-cli` 数据 china_friendly 仅 1/10）。预算敏感、人在国内：优先国产方案，详见 [GLM-5.3 Coding Plan 评测](/zh/guides/glm-5.3-coding-plan-review/) 和 [GLM vs DeepSeek vs Kimi 对比](/zh/compare/glm-vs-deepseek-vs-kimi-2026/)。

## 适合谁买

**Plus**：轻度使用、Luna/Terra 够用、预算敏感。
**Pro 5x**：主力开发工具是 Codex、每天 2h+、需要 Sol 档推理、或常被 Plus 限流。
**Pro 20x**：全天 Agent 工作流、Voice 重度用户、5x 周上限频繁触顶。
**Business**：团队共享、需要自动化 Code Review 和 Slack/Linear 集成、合规审计。
**API Key**：用量波动大、团队按量管控、或已跑在自有 Agent 框架里。

## 数据来源与复核

- 套餐结构、各档位用量表、credits 费率、Voice 时长、功能矩阵：OpenAI Codex 官方文档 [Pricing / Usage limits](https://developers.openai.com/codex/pricing)，2026-08-19 核对。
- 用量表为官方给出的**范围值**（随任务复杂度浮动），非固定承诺；Anthropic/OpenAI 均保留调整额度的权利，购买前请以官方页面为准。
- 建议每季度复核一次；发现过期数字欢迎在 GitHub 仓库提 issue。
