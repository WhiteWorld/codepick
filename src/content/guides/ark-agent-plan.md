---
title: "火山方舟 Agent Plan 全解读：业界首个 Agent 套餐包"
description: "2026-05-11 火山方舟发布 Agent Plan，被官方定义为业界首个 Agent 套餐包。本文详解四档订阅价格、AFP 积分制、多模态模型与 Harness 工具、与 Coding Plan 的差异，以及如何选择。"
date: "2026-05-13"
article_type: "explainer"
tags: ["火山方舟", "ark", "agent-plan", "智能体", "订阅", "AFP", "多模态"]
draft: false
---

2026 年 5 月 11 日，火山引擎正式发布 **Agent Plan**，被官方定义为「业界首个 Agent 套餐包」。它在原有 [Ark Coding Plan](/zh/coding-plan/) 的基础上，把更多模态模型与 Harness 工具组合进同一份订阅，并引入了全新的 **AFP（Agent Fuel Points）** 积分制度。对国内 Claude Code / OpenCode / Trae / OpenClaw / Hermes Agent 用户而言，这是一个值得重新评估的国内中转方案。

---

## TL;DR

- **发布时间**：2026-05-11
- **定位**：在 Coding Plan 之上拓展为「多模型 + 多模态 + Harness 工具」的 Agent 订阅
- **四档价格**：Small ¥40 / Medium ¥200 / Large ¥500 / Max ¥1000，月付
- **计费单位**：AFP（Agent Fuel Points）积分，每天 00:00 释放库存，售完即止
- **关键代价**：相比旧版 Coding Plan，token 单价上调 **2~2.5×**；>128k 长上下文倍率高达 **7.5×**
- **附加权益**：订阅 Medium 及以上赠送 7×24 在线智能伙伴，开箱即用

---

## 套餐与价格

| 套餐 | 月度价格 | AFP/月 | 智能伙伴 | 适用人群 |
|------|--------|--------|---------|--------|
| Small | ¥40 | 20,000 | — | 个人轻度尝鲜、纯文本编程 |
| Medium | ¥200 | 100,000 | ✅ 7×24 | 日常 Agent 开发主力 |
| Large | ¥500 | 250,000 | ✅ 7×24 | 重度多模态 + 长流程 |
| Max | ¥1000 | 500,000 | ✅ 7×24 | 团队/企业级 |

> Small 套餐根据官方拆解为 **2,000 AFP / 5h，7,000 AFP / 周，10,000 AFP 视觉日额度**；其余档位按比例分配。具体限额请以官方文档为准。

> 💡 **额度释放规则**：每天 00:00 释放库存，售完即止——意味着热门档位有「抢购」属性，预算确定的话建议尽早下单锁定。

---

## 包含哪些模型？

Agent Plan 一次性把字节自研 + 三方主流模型打包进同一订阅：

**字节系列**

- **Doubao-Seed** — 编程主力
- **Doubao-Seedance** — 视频生成
- **Doubao-Seedream** — 图像生成
- **Doubao-embedding-vision** — 多模态向量

**第三方主流**

- **GLM-5.1**（智谱）
- **Kimi-K2.6**（Moonshot）

**Auto 模式**：与 Coding Plan 一致，可按任务自动匹配性价比最高的模型，免去手动切换。

---

## 与 Coding Plan 的差异

|  | Ark Coding Plan | Ark Agent Plan |
|---|---|---|
| 主打能力 | 文本/代码 编程模型 | **编程 + 多模态 + Harness 工具** |
| 模态 | 文本 | **文本 / 代码 / 图像 / 视频 / 向量** |
| Harness | 模型层 | **整合联网搜索、记忆、Auto、多模态** |
| 计费 | 按次数（每 5h N 次请求） | **AFP 积分制** |
| Token 单价 | 基线 | **2~2.5× 涨幅** |
| 长上下文 | 无显式倍率 | **>128k 上下文 7.5× 倍率** |
| 起步价 | ¥9.9（Lite）/ ¥49.9（Pro） | ¥40（Small）|
| 智能伙伴 | — | **Medium+ 赠送 7×24 在线** |

一句话总结：Coding Plan 仍是**纯编程性价比最优解**；Agent Plan 是**需要多模态 + Agent 工具链**时的新选择。

---

## Harness 工具：Agent Plan 的真正卖点

Agent Plan 首次将 Model 与 Harness（即 Agent 工具链）能力深度整合，开箱即用：

1. **联网搜索** — 与豆包同源的实时检索能力，无需自建搜索接口
2. **记忆能力** — 内置 embedding 模型驱动的长期记忆
3. **Auto 模式** — 任务智能调度，自动选最合适的模型
4. **多模态** — 同一 API 内统一调度文本 / 代码 / 图像 / 视频生成与理解

适配客户端：**Claude Code、OpenCode、Trae、OpenClaw、Hermes Agent**。订阅后将 API Key 配置到客户端即可使用。

---

## 谁该买？谁不该买？

### 适合

- 需要在 Agent 流程中频繁穿插**视频 / 图像生成**的开发者
- 想直接调用 Doubao-Seedance / Seedream 等多模态模型的多媒体团队
- 预算到 Medium 档（¥200/月）及以上，想白嫖 7×24 智能伙伴的用户
- 国内 Claude Code / OpenCode / Trae 用户的中转方案选型

### 不适合

- **纯文本编程**：仍建议 Ark Coding Plan（¥9.9 起，单价更低）
- **重度长上下文（>128k）用户**：7.5× 倍率会让 AFP 消耗非常快
- 只想用 **Claude / GPT 原版模型**的用户（这是国产模型套餐）
- 个位数月度需求的轻度尝鲜用户（按量付费 OpenRouter 可能更划算）

---

## 与同类「Agent / 全模态订阅」横向对比

| 产品 | 起步价 | 主打 | 模态 | 备注 |
|---|---|---|---|---|
| **Ark Agent Plan** | ¥40 | Doubao + GLM + Kimi + Harness | 文本/代码/图像/视频/向量 | 业界首个 Agent 套餐包，AFP 积分制 |
| **MiniMax Token Plan** | ¥29 | M2.7 + Hailuo + Speech + Music | 全模态（含音频/音乐） | 2026-03-23 由 Coding Plan 升级 |
| **百炼 Token Plan 团队版** | ¥198 | Qwen + DeepSeek + Kimi + GLM + Wan | 文本 + 图像 | 多坐席、企业级 |

三家产品形态各有侧重：MiniMax 强在**音频/音乐多模态**，百炼强在**多模型选择 + 团队多坐席**，方舟 Agent Plan 强在**Doubao 系全栈 + Harness 工具链**。

---

## 上手三步

1. 访问 [方舟 Agent Plan 活动页](https://ai.volcengine.com/activity/agentplan)，根据 AFP 估算选择档位
2. 用支付宝/微信支付完成订阅（注意每天 00:00 库存释放节奏）
3. 在 [火山引擎控制台](https://console.volcengine.com/) 创建 API Key，按 Claude Code / OpenCode / Trae 等客户端的方舟 API 教程配置 endpoint

> 配置 Claude Code 等客户端连接方舟的具体步骤，可以参考 [Cline + 方舟配置指南](/zh/guides/cline-ark-setup/)，Agent Plan 的接入方式与 Coding Plan 基本一致，只是替换 API Key 即可。

---

## 写在最后

Agent Plan 是火山方舟把 **Model + Harness** 一起卖的尝试，本质是从「卖模型 token」转向「卖 Agent 燃料」。**对纯编程用户它不是最优解**——单价上去了；**但对真正要做多模态 Agent 的开发者来说，它把过去需要自己拼装的能力（搜索、记忆、视频图像生成）打成了一个订阅包**，省下大量胶水代码与运维成本。

建议先用 Small（¥40）跑一个月真实场景，统计 AFP 消耗与触发的倍率，再决定要不要升到 Medium 拿智能伙伴权益。

---

## 相关阅读

- [Ark Coding Plan vs Bailian Coding Plan 横评](/zh/compare/bailian-coding-plan-vs-ark-coding-plan/)
- [Cline + 火山方舟配置指南](/zh/guides/cline-ark-setup/)
- [MiniMax Token Plan 全解读](/zh/guides/minimax-token-plan/)
- [国内 AI 编程速率限制对比](/zh/guides/ai-coding-rate-limits/)
