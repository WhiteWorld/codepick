---
title: "MiniMax Token Plan 全解读：从 Coding Plan 到全模态统一订阅"
description: "MiniMax 将 Coding Plan 升级为 Token Plan，支持 M2.7 模型、多模态资源体系、人民币定价。本文详解 6 档套餐价格、额度机制与选型建议。"
date: "2026-03-19"
updated_at: "2026-05-28"
article_type: "explainer"
tags: ["minimax", "token-plan", "coding-plan", "M2.7", "订阅", "api"]
draft: false
faq:
  - q: "MiniMax Token Plan 和按量计费哪个更划算？"
    a: |
      如果你每天稳定用 AI 编程 1-2 小时以上，Token Plan 通常更容易控成本；如果只是偶尔调用几次模型，按量计费更灵活。
      真正要注意的是 Agent 长上下文任务，单次调用 token 变大后，按量成本会比想象中高。
  - q: "Starter、Plus、Max 怎么选？"
    a: |
      轻度尝鲜选 Starter；日常开发建议从 Plus 起步；每天长时间编程或多 Agent 并行再看 Max。
      对响应速度敏感时再考虑极速版，不要一开始就买最高档。
  - q: "MiniMax Token Plan 适合替代 Copilot 或 Cursor 吗？"
    a: |
      它更适合作为 Cline、OpenCode、Claude Code 兼容链路里的国产模型订阅，不是 Copilot Tab 补全的直接替代。
      如果你看重 IDE 原生体验，Cursor / Copilot 仍有优势；如果看重人民币订阅、国内链路和成本控制，MiniMax 更值得试。
---

MiniMax 近期将原有的 **Coding Plan 升级为 Token Plan**，这不仅仅是改个名字——底层模型升级到 M2.7、额度大幅增加，文本模型从 prompt 口径改为 request 口径，并把文本、语音、视频、图像、音乐都纳入同一套 Token Plan / Credits 资源体系。对于使用 Cline、Claude Code、Cursor 等工具的国内开发者来说，这是一个值得重新评估的方案。

---

## 升级了什么？

| 维度 | 旧版 Coding Plan | 新版 Token Plan |
|------|------------------|-----------------|
| 定价货币 | 美元 | **人民币** |
| 基础模型 | M2 / M2.1 | **M2.7**（自主参与训练迭代的首个模型） |
| 计费单位 | prompt（1 次用户提问） | **request**（1 次约等于 1 次 M2.7 调用） |
| Starter 额度 | 100 prompts / 5h | **600 requests / 5h**（6 倍） |
| Plus 额度 | 300 prompts / 5h | **1,500 requests / 5h**（5 倍） |
| Max 额度 | 1,000 prompts / 5h | **4,500 requests / 5h**（4.5 倍） |
| 模态支持 | 仅文本 | **全模态资源体系**（文本 + 语音 + 视频 + 图像 + 音乐） |
| 套餐档位 | 3 档 | **6 档**（新增 3 个极速版） |

最显著的变化：**额度暴涨 4.5-6 倍**，且从美元切换到人民币定价，对国内开发者更友好。

---

## 完整套餐定价

### 标准版

| 套餐 | 月付 | 年付（月均） | 每 5 小时请求数 | 模型 |
|------|------|-------------|----------------|------|
| Starter | ¥29 | ¥290（¥24） | 600 | M2.7 |
| Plus | ¥49 | ¥490（¥41） | 1,500 | M2.7 |
| Max | ¥119 | ¥1,190（¥99） | 4,500 | M2.7 |

### 极速版

极速版专享 **M2.7-highspeed** 模型，推理速度更快，适合对响应速度敏感的场景。

| 套餐 | 月付 | 年付（月均） | 每 5 小时请求数 | 模型 |
|------|------|-------------|----------------|------|
| Plus 极速版 | ¥98 | ¥980（¥82） | 1,500 | M2.7-highspeed |
| Max 极速版 | ¥199 | ¥1,990（¥166） | 4,500 | M2.7-highspeed |
| Ultra 极速版 | ¥899 | ¥8,990（¥749） | 30,000 | M2.7-highspeed |

> 价格和折扣以订阅页实时展示为准；官方文档当前月付价为 Starter ¥29、Plus ¥49、Max ¥119，极速版 ¥98 / ¥199 / ¥899。

---

## 额度机制详解

### 滚动 5 小时窗口

Token Plan 对语言模型沿用了 Coding Plan 的核心机制：**M2.7 / M2.7-highspeed 按 5 小时滚动窗口恢复请求数**。这意味着文本编程可以连续使用，只要每个 5 小时窗口内不超限。

- 达到上限后：暂停服务，等待窗口重置
- 可用 Token Plan Credits 自动补充；也可以升级/换套餐、切到按量 API Key，或等待窗口重置

### 多模态消耗标准

Token Plan 不是把所有模态都简单折算成“请求”。官方文档把额度按模型类型分开：

| 模态 | 模型示例 | 官方额度口径 |
|------|---------|---------------|
| 文本 | M2.7 / M2.7-highspeed | request，5 小时滚动窗口 |
| 图像 | image-01 | 张/日 |
| 语音 | Speech 2.8 | 字符/日 |
| 音乐 | Music-2.6 | 首/日（限免口径，以官方为准） |
| 视频 | Hailuo-2.3 / Hailuo-2.3-Fast | 个/日 |

对于纯编程场景，重点看 M2.7 的 5 小时 request 数；对于多模态场景，要看对应套餐是否包含每日图像、语音、视频额度。

---

## M2.7 模型实力

Token Plan 的底层模型升级到了 **MiniMax M2.7**，这是首个深度参与自身训练迭代的模型。关键性能指标：

- **SWE-Pro**（软件工程）：56.22%，接近 Claude Opus 水平
- **VIBE-Pro**（完整项目交付）：55.6%
- **Terminal Bench 2**（系统理解）：57.0%
- **Toolathon**（工具调用）：46.3%
- **MLE Bench Lite**（机器学习工程）：66.6% 得牌率

在实际编程场景中，M2.7 支持复杂 Agent 流程编排、多智能体协作、工具搜索与调用，已在生产环境中将故障恢复时间控制在 3 分钟内。

---

## 适合谁？

### 推荐选择 Token Plan 的场景

- **国内开发者**：人民币定价 + 支付宝/微信支付，无需外币信用卡
- **高频编程用户**：5 小时滚动窗口无每周限额，适合连续高强度使用
- **多模态需求**：一个 Token Plan Key 覆盖文本、语音、视频、图像、音乐，但不同模态按不同额度口径限制
- **预算敏感**：Starter ¥29/月起步，年付低至 ¥24/月

### 各套餐适用人群

| 套餐 | 适合 |
|------|------|
| Starter（¥29） | 轻度使用、尝鲜评估 |
| Plus（¥49） | 日常开发主力，性价比最优 |
| Max（¥119） | 重度编程，每天多小时持续使用 |
| Plus 极速版（¥98） | 对响应速度有要求的日常开发 |
| Max 极速版（¥199） | 专业开发者，速度 + 额度都要 |
| Ultra 极速版（¥899） | 团队/企业级使用，海量额度 |

---

## 与按量计费的对比

MiniMax 同时提供按量计费（Pay-as-you-go）方案：

| 模型 | 输入（元/百万 token） | 输出（元/百万 token） |
|------|----------------------|----------------------|
| M2.7 | 2.1 | 8.4 |
| M2.7-highspeed | 4.2 | 16.8 |

以 Plus 套餐为例：¥49/月，每 5 小时 1,500 次请求。假设每天使用 2 个窗口（10 小时），月均 90,000 次请求。如果每次请求平均消耗 2,000 token（输入+输出），按量计费约需 ¥180+/月。**Token Plan 相当于打了 3 折以下**。

> 这个估算只适用于文本 M2.7。图像、语音、视频、音乐按日额度或 Credits 规则计算，不能直接用“请求数 × token”套进去。

> 结论：只要你每天稳定使用超过 1-2 小时，Token Plan 都比按量计费划算。

---

## 如何订阅

1. 访问 [Token Plan 订阅页](https://platform.minimaxi.com/subscribe/token-plan)
2. 选择套餐，完成支付宝/微信支付
3. 在「账户管理 → Token Plan」页面获取专属 API Key
4. 在 Cline / Claude Code / Cursor 等工具中配置 API 端点和 Key

> ⚠️ **注意**：Token Plan 的 API Key 与按量计费的 API Key **不通用**，需单独获取。

---

## 相关阅读

- [AI 编程工具月成本对比 2026](/zh/compare/ai-coding-cost-comparison-2026/)
- [5 大国内 Coding Plan 全量横评](/zh/compare/coding-plan-comparison-2026/)
- [MiniMax vs 智谱 GLM Coding Plan 深度对比](/zh/compare/minimax-coding-plan-vs-glm-coding-plan/)
- [火山方舟 Coding Plan 完整指南](/zh/guides/ark-coding-plan-guide/)

---

## 总结

MiniMax Token Plan 是原 Coding Plan 的全面升级：价格更低（人民币定价）、文本额度更多（4.5-6 倍提升）、模型更强（M2.7）、覆盖更广（多模态资源体系）。对于正在寻找国产 AI 编程方案的开发者来说，¥49/月的 Plus 套餐是当前性价比很高的入门选择。

> 数据来源：MiniMax Token Plan / 按量计费官方文档（核查至 2026-05-28）。套餐价格、每日多模态额度和 Credits 规则以订阅页实时展示为准。
