---
title: "AI 编程订阅套餐对比 2026：Claude / Codex / 国产 Coding Plan 怎么选"
description: "2026 年 AI 编程订阅进入「5x/20x」时代：Claude Pro/Max、Codex Plus/Pro 双雄对峙，国产 GLM/方舟/百炼 Coding Plan 以低价直连杀入。本文用官方 2026-08-19 数据做三阵营对比：价格、额度机制、模型、生态、国内可用性，给一份能直接照做的选型清单。"
date: "2026-08-21"
tags: ["claude", "codex", "coding-plan", "订阅", "对比", "pricing"]
pillar: compare
content_status: keep
locale_strategy: mirrored
draft: false
---

> 国际两家按官方页面 2026-08-19 核对（Anthropic Pricing / OpenAI Codex docs）；国产方案数据来自站内 `data/plans` 与既有横评。三类方案结构差异很大，先看结论再对表。

## 先说结论

- **终端重度 + 长代码生成**：**Claude**（Pro $20 起步，Max 5x/20x），Opus 系是站内评分最高的编程模型（9.6/10）。
- **GitHub 原生工作流 + 多 Agent 编排**：**Codex**（Plus $20 起步，Pro 5x/20x），@Codex 委派 PR/issue、自动 Code Review。
- **预算敏感 / 人在国内**：**国产 Coding Plan**（GLM / 方舟 / 百炼），月费 ¥50-200、人民币直付、国内直连，编码能力已进第一梯队。
- **弹性用量 / 想跨模型**：按量 API 或 [OpenRouter](/zh/guides/openrouter-guide/)，别为偶尔使用付固定月费。
- **两个都要**：Claude / Codex 入门档 + 另一家按量，别双开 $200 档。

---

## 三阵营速览

### A. Claude（Anthropic）

| 档位 | 价格 | 说明 |
|------|------|------|
| Pro | $20/月（年付 $200/年 ≈ $16.7/月） | 基础用量，约 45 次请求/5h |
| Max 5x | $100/月 | 5 倍 Pro 用量，更高输出上限、新功能优先 |
| Max 20x | $200/月 | 20 倍用量，极限使用 |

Claude Code 包含在所有付费档；Opus 系模型长代码生成、200k 上下文是强项。国内可用性 2/10。

### B. Codex（OpenAI / ChatGPT）

| 档位 | 价格 | 说明 |
|------|------|------|
| Plus | $20/月 | Codex App + CLI + IDE，GPT-5.6 基础用量 |
| Pro 5x | $100/月 | 5 倍本地消息量，全系模型 + Codex-Spark |
| Pro 20x | $200/月 | 20 倍用量，Voice 无限时长 |

GPT-5.6 三档（Sol/Terra/Luna），同档下 Luna 额度是 Sol 的 20-25 倍；GitHub 原生集成（PR/issue 委派、自动 Code Review）。国内可用性 1/10。

### C. 国产 Coding Plan（GLM / 方舟 / 百炼 / MiniMax / Kimi）

- 价格：月费普遍 ¥50-200，人民币直付、国内直连，无支付/网络门槛。
- 形态：Coding Plan（固定月费额度）之外，还有 Agent Plan / Token Plan 等新形态，见[国产 Coding Plan 全量横评](/zh/compare/coding-plan-comparison-2026/)和[三类国产订阅形态对比](/zh/compare/coding-plan-vs-agent-plan-vs-token-plan/)。
- 能力：GLM-5.3 等已进第一梯队，实测见[GLM-5.3 Coding Plan 评测](/zh/guides/glm-5.3-coding-plan-review/)。

## 额度机制对比

| 维度 | Claude | Codex | 国产 Coding Plan |
|------|--------|-------|------------------|
| 计费窗口 | 5 小时滚动窗口 + 周上限 | 5 小时滚动窗口 + 周上限 | 各平台不同（月额度 / 每日刷新） |
| 额度池 | 全端共享（Web/桌面/移动/CLI） | 本地 + 云端共享 | 按平台 |
| 超额出路 | usage credits（按 API 费率） | credits（按 API 费率） | 按量加购 / 降级 |
| 模型自由度 | 固定 Opus/Sonnet/Haiku 系 | GPT-5.6 三档 + 预览 | 国产模型为主，部分支持 BYOK |

Claude 和 Codex 的机制几乎镜像（这也是为什么两边价格几乎打平）；国产方案胜在「便宜 + 直连」，但模型自由度窄一些。

## 怎么选（决策清单）

| 你的情况 | 推荐 |
|---------|------|
| 终端重度 Claude Code、写长代码 | **Claude Max 5x** |
| 主力 GitHub、PR/issue 自动化 | **Codex Pro 5x** |
| 多 Agent 并行 + 移动端遥控 | **Codex Pro 20x**（Voice 无限） |
| 大上下文 + 一次性长生成 | **Claude Max 5x** |
| 预算敏感 / 国内 | **国产 Coding Plan**（GLM 性价比最高） |
| 弹性用量 / 跨模型 | **OpenRouter / API 按量** |
| 两个都要 | 入门档 + 另一家按量 |

## 延伸阅读

- [Claude Max 套餐性价比分析](/zh/guides/claude-max-plan-value-analysis/)
- [Codex 套餐性价比分析](/zh/guides/codex-plan-value-analysis/)
- [Claude Code vs Codex 工具对比](/zh/compare/claude-code-vs-codex/)
- [国产 Coding Plan 全量横评](/zh/compare/coding-plan-comparison-2026/)
- [Coding Plan vs Agent Plan vs Token Plan](/zh/compare/coding-plan-vs-agent-plan-vs-token-plan/)
- [OpenRouter 指南](/zh/guides/openrouter-guide/)
