---
title: "GitHub Copilot 6月起改为 AI Credits 计费：会变贵吗？一文看懂"
description: "GitHub Copilot 将于 2026 年 6 月 1 日把高级请求额度（PRU）替换为 AI Credits 按 token 计费。本文拆解各套餐含多少额度、各模型实际花费、以及你的账单会怎么变。"
date: "2026-05-11"
updated_at: "2026-05-19"
article_type: "explainer"
tags: ["github-copilot", "计费", "ai-credits", "token", "定价"]
draft: false
faq:
  - q: "Copilot 6 月新计费会让我变贵吗？"
    a: |
      看用什么模型。如果主要用 GPT-5 mini / Grok Code Fast 做日常 Chat，新制下 $10 配额绰绰有余；
      如果重度用 Claude Sonnet 跑 Agent 任务，Pro 的 $10 大约只能跑 110 次 Agent 任务，可能不够，需升 Pro+ 或迁去 Cursor / Cline。
  - q: "Tab 自动补全还消耗 Credits 吗？"
    a: |
      不消耗。代码补全（inline completion）和 Next Edit Suggestions 在所有套餐（含 Free）**永远免费**，不计入 AI Credits。
      只有 Chat / Agent / CLI / Spaces 等主动调用模型的功能才扣 Credits。
  - q: "怎么避免超额扣费？"
    a: |
      在账单设置里把「超额上限」设为 **$0**——月度配额用完后即停止服务，不会额外扣费。
      重度 Agent 用户希望灵活的，再设一个合理的预算上限（比如 $20）。组织管理员可以在成本中心给每个席位单独配额。
  - q: "年付用户什么时候迁移到新制？"
    a: |
      年付 Pro / Pro+ 用户在**年付到期前保持原计划**（按次数算），到期后才转新制；月付用户 6/1 自动切换。
      Copilot Business / Enterprise 在 6/1 起切，6–8 月还有额外 Credits 促销。
---

GitHub Copilot 将于 **2026 年 6 月 1 日**把现行的"高级请求额度（Premium Request Units）"替换为全新的 **AI Credits 按 token 计费制**。套餐价格不变，但计费逻辑彻底改变——对于不同用量习惯的开发者，实际支出可能差距很大。本文帮你算清楚。

---

## 一句话说清楚变化

| 旧制（截至 5 月 31 日） | 新制（6 月 1 日起） |
|---|---|
| Pro：300 次高级请求/月，超出 $0.04/次 | Pro：包含 **$10 AI Credits**，超出按 token 扣费 |
| Pro+：1500 次高级请求/月 | Pro+：包含 **$39 AI Credits** |
| "一次请求"计一个单位，与 token 数无关 | 按 **实际消耗 token 数 × 模型单价** 计费 |

**代码补全（Tab 自动完成）和 Next Edit 建议在所有套餐中永远不消耗 AI Credits。**

---

## 各套餐月度 AI Credits 配额

| 套餐 | 月费 | 含 AI Credits | 等价 USD |
|------|------|---------------|----------|
| Copilot Free | $0 | 有限额 | — |
| Copilot Pro | $10 | 1,000 Credits | $10 |
| Copilot Pro+ | $39 | 3,900 Credits | $39 |
| Copilot Business | $19/用户 | 1,900 Credits + 6–8 月促销额外 3,000 Credits | $19 |
| Copilot Enterprise | $39/用户 | 3,900 Credits + 6–8 月促销额外 7,000 Credits | $39 |

> **换算关系**：1 AI Credit = $0.01 USD。用完月度配额后可设置超额预算继续使用，也可不设、等下个月重置。

---

## 什么消耗 Credits，什么不消耗

**不消耗（永久免费）：**
- 代码补全（inline completion）
- Next Edit Suggestions

**消耗 AI Credits：**
- Copilot Chat（对话）
- Copilot Agent / Autopilot（自主 Agent 会话）
- Copilot CLI
- Copilot Cloud Agent
- Copilot Spaces
- GitHub Spark
- 第三方 Copilot Extensions
- Code Review（同时消耗 GitHub Actions 分钟数）

---

## 各模型 Token 定价表

> 以下价格单位：**每百万 token**，已转换为 AI Credits（$0.01/Credit）

| 模型 | 输入 (credits/M) | 缓存输入 (credits/M) | 输出 (credits/M) |
|------|-------------------|----------------------|------------------|
| GPT-5 mini | 25 | 2.5 | 200 |
| Raptor mini | 25 | 2.5 | 200 |
| Grok Code Fast 1 (xAI) | 20 | 2 | 150 |
| Gemini 3 Flash | 50 | 5 | 300 |
| GPT-4.1 | 200 | 50 | 800 |
| GPT-5.2 | 175 | 17.5 | 1,400 |
| Gemini 2.5 Pro | 125 | 12.5 | 1,000 |
| Claude Haiku 4.5 | 100 | 10 | 500 |
| GPT-5.4 | 250 | 25 | 1,500 |
| Claude Sonnet 4.x | 300 | 30 | 1,500 |
| GPT-5.5 | 500 | 50 | 3,000 |
| Claude Opus 4.x（Pro+ 专属） | 500 | 50 | 2,500 |

---

## 实际花费估算

下面用典型使用场景来测算每月消耗。

### 假设：一次"普通对话"

- 输入：~2,000 tokens（问题 + 代码上下文）
- 输出：~500 tokens（回答）

| 模型 | 一次对话费用（AI Credits） | Pro 月配额可对话次数 |
|------|---------------------------|----------------------|
| GPT-5 mini | 0.15 | ~6,600 次 |
| Claude Haiku 4.5 | 0.45 | ~2,200 次 |
| Claude Sonnet 4.x | 1.35 | ~740 次 |
| Claude Opus 4.x | 2.25 | ~444 次（Pro+ 专属） |

### 假设：一次"Agent 任务"

Agent 会自动读取多个文件，上下文远大于普通对话：
- 输入：~15,000 tokens
- 输出：~3,000 tokens

| 模型 | 一次 Agent 任务（AI Credits） | Pro 月配额可完成任务数 |
|------|-------------------------------|------------------------|
| GPT-5 mini | 0.98 | ~1,020 次 |
| Claude Haiku 4.5 | 3.0 | ~333 次 |
| Claude Sonnet 4.x | 9.0 | ~111 次 |
| Claude Opus 4.x | 15.0 | ~260 次（Pro+ $39 配额） |

---

## 和旧计费比，变贵了还是便宜了？

这取决于你用的**模型**和**使用方式**：

**变便宜的场景（轻量用户）：**
- 主要用 GPT-5 mini 或 Grok Code Fast 做日常 Chat
- 旧制下 300 次高级请求 ≈ 新制下同等任务只消耗 ~45 Credits（大量剩余）

**变贵的场景（重度 Agent 用户）：**
- 频繁用 Claude Sonnet 或 GPT-5.4 跑大型 Agent 任务
- 旧制下 300 次请求是固定额度；新制下 111 次 Sonnet Agent 任务就用完 Pro 的 $10 Credits
- 实质是：**token 越多、模型越贵，消耗越快**

**社区反应**：部分开发者批评"付相同的钱，能用的少了"，尤其是习惯长对话上下文或大型 codebase Agent 的用户。GitHub 的官方立场是：这是 Copilot 从"对话助手"演变为"自主 Agent 平台"后必然的计费方式转变。

---

## 如何控制超额支出

新计费的一个重要功能是**预算上限控制**，可在三个层级设置：

1. **用户层**：个人用户可在账单设置中设置月度超额上限（设为 $0 则用完配额即停止，不会额外扣费）
2. **组织/团队层**：管理员可在成本中心设置每用户预算
3. **企业层**：企业管理员可集中控制所有席位的预算

**建议操作**：
- 不确定自己用量的用户：先把超额上限设为 **$0**，观察一个月用量再决定是否开启超额
- 重度 Agent 用户：预估每月 Agent 任务数 × 单次费用，设置合理的超额预算
- 节省 Credits 的小技巧：同样的任务，用 **Gemini 3 Flash** 或 **GPT-5 mini** 替代 Sonnet，费用可降低 85% 以上

---

## 月付用户 vs 年付用户迁移时间

- **月付 Pro / Pro+ 用户**：6 月 1 日自动迁移到新计费制
- **年付 Pro / Pro+ 用户**：保持原计划直到年付到期，到期后再切换
- **Copilot Business / Enterprise 用户**：6 月 1 日起切换，享受 6–8 月促销额外 Credits

---

## 结论与建议

| 用户类型 | 建议 |
|----------|------|
| 轻量用户（每天几次 Chat，用便宜模型） | 影响不大，配额绰绰有余 |
| 中度用户（每天多次 Chat + 少量 Agent） | Pro $10 通常够用，建议把超额上限设为 $0–$5 |
| 重度 Agent 用户（Claude Sonnet + 大上下文） | 可能需要 Pro+，或改用 Cursor / Cline + 独立 API 方案 |
| JetBrains / GitHub 重度依赖用户 | Copilot 仍是最优选，注意监控用量 |

如果你发现 Copilot 新计费下成本上升明显，可以参考 [Claude Code + API 自建方案](/zh/compare/claude-code-budget-alternatives) 或 [Cursor 省钱指南](/zh/guides/cursor-cost-saving) 找替代路径。

---

*数据来源：[GitHub Copilot 官方博客](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/) · [GitHub Docs 模型与定价](https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing) · 核查日期：2026-05-11*
