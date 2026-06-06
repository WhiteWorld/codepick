---
title: "Coding Plan vs Agent Plan vs Token Plan：2026 国产 AI 订阅三国杀"
description: "方舟 Agent Plan、MiniMax Token Plan、百炼 Token Plan 团队版三种新一代订阅形态全面对比：价格、计费单位、模型生态、模态覆盖、Harness 工具与选型建议。"
date: "2026-05-13"
tags: ["coding-plan", "agent-plan", "token-plan", "火山方舟", "minimax", "百炼", "对比", "agent", "多模态"]
pillar: compare
content_status: keep
locale_strategy: mirrored
draft: false
---

2026 年上半年，国内 AI 编程订阅市场出现了一次明显的「形态分化」：原本同质化严重的 Coding Plan，被三家厂商分别拓展成了不同方向的产品——

- **火山方舟 Agent Plan**（2026-05-11）：编程 + 多模态 + Harness 工具，AFP 积分制
- **MiniMax Token Plan**（2026-03-23 升级自 Coding Plan）：全模态（文本/图像/视频/语音/音乐）
- **百炼 Token Plan 团队版**：多坐席 + 多模型 + 文本/图像

这三个产品都「不只是 Coding Plan」，但侧重点完全不同。本文做一次三方横评，帮你判断该选哪一个。

---

## 一句话总结

| 产品 | 一句话定位 | 起步价 |
|---|---|---|
| **Ark Agent Plan** | Doubao 全栈 + Harness 工具的 Agent 套餐 | ¥40/月 |
| **MiniMax Token Plan** | 全球首个全模态订阅，含音视频和音乐 | ¥29/月 |
| **百炼 Token Plan 团队版** | 团队/企业多坐席，模型生态最广 | ¥198/月 |

需要 Doubao + 视频图像 + Agent 工具链 → **Ark Agent Plan**；
需要音视频/音乐多模态 → **MiniMax Token Plan**；
团队多人协作 + 数据合规 → **百炼 Token Plan 团队版**。

---

## 价格与档位对比

| 厂商 | 入门档 | 中档 | 高档 | 顶配 |
|------|------|------|------|------|
| **Ark Agent Plan** | Small ¥40 | Medium ¥200 | Large ¥500 | Max ¥1000 |
| **MiniMax Token Plan** | Starter ¥29 | Plus ¥49 | Max ¥119 | Ultra（极速版）¥899 |
| **百炼 Token Plan 团队版** | 标准坐席 ¥198 | 高级坐席 ¥698 | 尊享坐席 ¥1398 | ¥5,000 共享包 |

**结论**：
- **预算最低**：MiniMax ¥29（但额度也最少）
- **入门门槛最低**：Ark ¥40，比 MiniMax 略贵但模型/工具更全
- **最贵但模型最齐**：百炼团队版，起步即 ¥198，定位是企业/团队

---

## 计费单位对比

这是三家最容易混淆，也最关键的差异：

| 产品 | 单位 | 周期机制 | 用完后 |
|---|---|---|---|
| Ark Agent Plan | **AFP（Agent Fuel Points）** | 每日 00:00 释放库存 + 5h 滚动窗口 | 等下个窗口或升级 |
| MiniMax Token Plan | **request**（M2.7 请求数） | 5h 滚动窗口 + 每日多模态独立额度 | 等下个窗口 |
| 百炼 Token Plan 团队版 | **Credits**（按模型加权扣减） | 自然月总额度 + 共享包弹性溢出 | 升级或买共享包 |

**差异解读**：

- **Ark 的 AFP**：把 token 量、模型档位、长上下文倍率全部折算成燃料，长 prompt 烧得非常快（>128k 上下文 **7.5× 倍率**）
- **MiniMax 的 request**：1 次 ≈ 1 次 M2.7 调用，简单直观，但多模态额度是按日分别计的
- **百炼的 Credits**：与 token 数成正比，多模型间统一计量，企业最容易做预算

---

## 模型生态对比

### Ark Agent Plan（6 款）

| 类型 | 模型 |
|---|---|
| 编程主力 | Doubao-Seed |
| 视频生成 | Doubao-Seedance |
| 图像生成 | Doubao-Seedream |
| 多模态向量 | Doubao-embedding-vision |
| 三方 | GLM-5.1、Kimi-K2.6 |

### MiniMax Token Plan（6 款）

| 类型 | 模型 |
|---|---|
| 编程主力 | MiniMax-M2.7 / M2.7 极速版 |
| 视频生成 | Hailuo Video |
| 语音 | Speech 2.8 |
| 图像 | Image-01 |
| 音乐 | Music-2.6（每日 100 首） |

### 百炼 Token Plan 团队版（14 款）

| 类型 | 模型 |
|---|---|
| 编程/通用 | qwen3.6-plus、qwen3.6-flash |
| 推理 | deepseek-v4-pro、deepseek-v4-flash、deepseek-v3.2 |
| 多家三方 | kimi-k2.6、kimi-k2.5、glm-5.1、glm-5、MiniMax-M2.5 |
| 图像 | qwen-image-2.0、qwen-image-2.0-pro、wan2.7-image、wan2.7-image-pro |

**结论**：百炼模型最多最杂、Ark 围绕 Doubao 自家生态、MiniMax 把音乐和视频做到了别家没有。

---

## 模态覆盖

|  | Ark Agent Plan | MiniMax Token Plan | 百炼 Token Plan 团队版 |
|---|:-:|:-:|:-:|
| 文本 / 代码 | ✅ | ✅ | ✅ |
| 图像生成 | ✅ | ✅ | ✅ |
| 图像理解 | ✅（embedding-vision） | — | ✅（qwen-image） |
| 视频生成 | ✅（Seedance） | ✅（Hailuo） | — |
| 语音 | — | ✅（Speech 2.8） | — |
| 音乐 | — | ✅（Music-2.6） | — |
| 向量 / Embedding | ✅ | — | ✅ |

**唯一覆盖音乐 + 语音的是 MiniMax**；**唯一不做视频的是百炼**；Ark 覆盖图像/视频/向量，但暂时不做音频。

---

## Harness / Agent 工具

| 工具能力 | Ark Agent Plan | MiniMax | 百炼团队版 |
|---|:-:|:-:|:-:|
| 联网搜索 | ✅（与豆包同源） | — | — |
| 内置记忆 | ✅（embedding） | — | — |
| Auto 路由 | ✅ | — | — |
| 多坐席管理 | — | — | ✅ |
| 共享用量包 | — | — | ✅ |
| 数据不入训承诺 | — | — | ✅ |
| 7×24 智能伙伴 | ✅（Medium+） | — | — |

**Ark Agent Plan 真正的差异化卖点是 Harness 工具链**——把搜索、记忆、Auto 这些过去要自己拼装的能力直接打进订阅。
**百炼团队版的差异化是面向组织的能力**——多坐席、共享包、合规承诺。
**MiniMax 没有 Agent 编排层面的特色，强项在模态广度。**

---

## 客户端兼容性

| 客户端 | Ark Agent Plan | MiniMax | 百炼团队版 |
|---|:-:|:-:|:-:|
| Claude Code | ✅ | ✅ | ✅ |
| OpenCode | ✅ | ✅ | ✅ |
| Trae | ✅ | ✅ | ✅（透过 Qwen Code 等） |
| OpenClaw | ✅ | — | ✅ |
| Hermes Agent | ✅ | — | ✅ |
| Cline | — | ✅ | ✅ |
| Codex CLI | — | ✅ | ✅ |
| Cursor | — | ✅ | ✅ |

**Ark Agent Plan** 更偏向 Agent 框架（OpenClaw、Hermes），**MiniMax / 百炼** 对开源 IDE 插件（Cline、Cursor）覆盖更广。

---

## 选型决策树

```
你主要的场景是什么？
├─ 纯文本 / 代码编程
│   ├─ 个人，预算敏感 → Ark Coding Plan（Lite ¥40/月，首月 ¥9.9；不是本文三家）
│   └─ 团队，要合规 → 百炼 Token Plan 团队版 ¥198 起
│
├─ 编程 + 图像/视频生成（多模态 Agent）
│   ├─ 想用 Doubao + Agent 工具链 → Ark Agent Plan
│   └─ 想用 Hailuo 视频 / MiniMax 音乐 → MiniMax Token Plan
│
├─ 编程 + 语音 / 音乐
│   └─ MiniMax Token Plan（唯一选项）
│
└─ 团队多人 + 多模型混用
    └─ 百炼 Token Plan 团队版
```

---

## 价格性价比测算

按入门档 ¥/¥1000 单位额度估算（仅供横向参考，实际单价取决于模型与上下文）：

| 产品 | 入门档价 | 名义额度 | 折算 ¥/单位 |
|---|---|---|---|
| Ark Agent Plan Small | ¥40 | 20,000 AFP | ~¥2 / 1,000 AFP |
| MiniMax Token Plan Starter | ¥29 | 600 req/5h（约 18,000/月） | ~¥1.6 / 1,000 req |
| 百炼 Token Plan 标准坐席 | ¥198 | 25,000 Credits | ~¥8 / 1,000 Credits |

**注意**：AFP / request / Credit **不可直接换算**——Ark 的 AFP 会被长上下文 7.5× 倍率拉爆，百炼 Credits 按 token 加权扣减，MiniMax request 与模型无关恒定。**真实成本必须按你自己的 prompt 模式压测一周再判断**。

---

## 三家"短板"提醒

- **Ark Agent Plan**：相比旧 Coding Plan，token 单价上调 **2~2.5×**；长上下文 **7.5×** 倍率对喜欢一次性塞整个仓库的用户非常不友好
- **MiniMax Token Plan**：模型清一色是 MiniMax 自家，没法切到 Qwen / DeepSeek / GLM；视频 / 音乐有每日上限
- **百炼 Token Plan 团队版**：起步 ¥198 偏高，个人开发者不划算；目前没有视频/语音模型，多媒体场景不适用

---

## 写在最后

国产 AI 订阅市场正在从"卖 token"分化为"卖 Agent 燃料 / 卖模态 / 卖席位"三种方向：

- **方舟**押注 **Agent 工具链 + Doubao 全栈**
- **MiniMax**押注 **全模态覆盖**
- **百炼**押注 **企业多坐席 + 多模型聚合**

短期内三者不会完全互相替代，**重度用户大概率会同时订阅两家**（典型组合：Ark Coding Plan 做日常文本编程 + MiniMax Token Plan 做多媒体）。建议先用入门档跑两周真实工作流，再决定主战场。

---

## 相关阅读

- [火山方舟 Agent Plan 全解读](/zh/guides/ark-agent-plan/)
- [MiniMax Token Plan 全解读](/zh/guides/minimax-token-plan/)
- [百炼 Coding Plan vs 方舟 Coding Plan](/zh/compare/bailian-coding-plan-vs-ark-coding-plan/)
- [国内 AI 编程速率限制对比](/zh/guides/ai-coding-rate-limits/)
