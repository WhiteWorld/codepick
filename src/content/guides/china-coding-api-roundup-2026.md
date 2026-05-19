---
title: "国内 Coding API 横评 2026：方舟 / 百炼 / MiniMax / 智谱 / DeepSeek 谁最值得买？"
description: "国产 AI 编程 API 套餐 2026 年最全横评：火山方舟 ¥9.9 起、阿里百炼 ¥200、MiniMax ¥29、智谱 GLM ¥49 起、DeepSeek 按量。一张大表 + 6 个场景 + 决策树，30 秒锁定最适合你的方案。"
date: "2026-05-19"
updated_at: "2026-05-19"
article_type: "review"
tags: ["coding-plan", "对比", "横评", "ark", "bailian", "minimax", "glm", "智谱", "deepseek", "国内", "api"]
draft: false
faq:
  - q: "国内 Coding API 套餐最便宜的是哪家？"
    a: |
      **火山方舟 Coding Plan Lite ¥9.9/月**（活动价，原价 ¥40）是目前国内 Coding API 月度订阅起价最低的。
      MiniMax Token Plan ¥29 全模态门槛也很低。智谱 GLM Coding Plan 起步 ¥49（Lite）。百炼 Coding Plan 已停售 Lite，仅 Pro ¥200 起。
  - q: "我想用 Claude Code，国内哪家中转最好？"
    a: |
      看模型偏好：要 Doubao + 多模型 Auto 选 **火山方舟**；要 GLM-5.1 旗舰选 **智谱 Coding Plan**；要千问 Coder 选 **百炼**。
      三家都支持 Anthropic 协议端点，Claude Code 配两个环境变量即可，无需中间代理。
  - q: "DeepSeek 为什么没有 Coding Plan？"
    a: |
      DeepSeek 走纯按量付费路线，没有月度订阅套餐，Web Chat 完全免费。
      V4-Pro 当前还有 **75% 折扣（限期至 2026-05-31）**，重度用户 ROI 极高，但用量波动大才划算——如果用量稳定，套餐制反而更经济。
  - q: "包年订阅真能省 30%？哪些家有？"
    a: |
      **智谱**给得最狠：包季 9 折 / 包年 7 折（Pro 包年仅 ¥104/月）。
      百炼、方舟当前不公开稳定的包年折扣（以官网为准）。但要谨慎：国内 API 单价波动大，年付前算清是否真便宜过当月活动价。
  - q: "重度多模态/全模态 Agent 选哪家？"
    a: |
      **MiniMax Token Plan ¥29 起**自带文本/图像/视频/音频/音乐全模态，性价比最高。
      **方舟 Agent Plan ¥40 起**含 Doubao-Seedance/Seedream + Harness 工具链，强在工具链整合。¥200+ 档赠 7×24 智能伙伴。
  - q: "团队多坐席场景怎么选？"
    a: |
      百炼 Token Plan **团队版 ¥198/月起**是少有的明确支持多坐席的产品。
      方舟支持子账号但不是按坐席计费的套餐。智谱、MiniMax、DeepSeek 当前都需要团队各自订阅或自己拆分预算。
---

国内 AI 编程 API 套餐 2026 年到了大爆发——5 家主流厂商分别推出了不同形态的方案：从方舟的 ¥9.9 抢购入口到智谱 7 折包年，从 MiniMax 全模态到 DeepSeek 纯按量。**到底该买哪家？** 本文是一份给做选择的开发者用的横评。

## TL;DR：4 句话决定

- **月预算 < ¥30，纯试水**：方舟 Coding Plan Lite **¥9.9**
- **想稳定用 GLM-5.1 / 包年最省**：智谱 Coding Plan **Pro ¥149**（包年 ¥104/月）
- **重度全模态（含音频/视频）**：MiniMax Token Plan **¥29 起**
- **用量波动大 / 想直接用 V4-Pro 旗舰**：DeepSeek API（按 token，现 V4-Pro **75% 折**）

如果你是团队场景或 Claude Code 重度用户，往下看完整对比。

---

## 一张大表看完 5 家

| 维度 | 火山方舟 | 阿里百炼 | MiniMax | 智谱 GLM | DeepSeek |
|---|---|---|---|---|---|
| **起步价** | ¥9.9/月（Lite） | ¥200/月（Pro） | ¥29/月 | ¥49/月（Lite） | 按量，无月费 |
| **价格模型** | 订阅 + 滑动窗口 | 订阅 + 月度配额 | 订阅 + Token 池 | 订阅 + 滑动窗口 | 按 token 付费 |
| **额度机制** | 5h 滑动 ~1,200 次 | 月度 ~90,000 次 | Token 池 | 5h 滑动 ~80 prompts | 实付实算 |
| **模型数** | 5 款（含 Doubao） | 8 款（含千问全家桶） | 多模态全家桶 | 3 款（GLM-5/4.7/4.6） | DeepSeek 全系（V4/R1） |
| **Auto 模式** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Anthropic 协议** | ✅ | ✅ | ✅ | ✅ | ❌（仅 OpenAI 协议） |
| **支持 Claude Code** | ✅ | ✅ | ✅ | ✅ | ❌（需第三方包装） |
| **包年折扣** | 不固定（看活动） | 不固定 | 不固定 | **7 折**（最优惠） | N/A |
| **团队/多坐席** | 支持子账号 | **团队版 ¥198/月起** | 个人为主 | 个人为主 | 个人为主 |
| **网络** | 国内直连 | 国内直连 | 国内直连 | 国内直连 | 国内直连 |
| **支付** | 支付宝/微信 | 支付宝/微信 | 支付宝/微信 | 支付宝/微信 | 支付宝/微信 |
| **首购优惠** | Lite ¥9.9 抢购 | 无 | 无 | **已取消** | V4-Pro 75% 折至 5/31 |

---

## 按场景挑：你的画像决定答案

### 🪙 场景 A：月预算 < ¥30，只是想体验
**结论：方舟 Lite ¥9.9**

每天 10:30 限量开放抢购，新用户进得去就锁价一个月。日常 chat + 简单 agent 任务，每 5 小时 1,200 次足够。如果错过抢购，备选 MiniMax ¥29 全模态。

### 🦀 场景 B：想用 Claude Code 但走国内模型
**结论：方舟（多模型）或智谱（专攻 GLM）**

三家都支持 Anthropic 协议端点，Claude Code 配置只需两个环境变量：

```bash
# 方舟
export ANTHROPIC_BASE_URL="https://ark.cn-beijing.volces.com/api/coding/anthropic"
# 智谱
export ANTHROPIC_BASE_URL="https://open.bigmodel.cn/api/anthropic"
# 百炼
export ANTHROPIC_BASE_URL="https://coding.dashscope.aliyuncs.com/apps/anthropic"
```

选哪家：要 Auto 自动选模型 → 方舟；要 GLM-5.1 旗舰 → 智谱；要千问 Coder 全家桶 → 百炼。

### 📊 场景 C：用量波动大、不想被套餐绑死
**结论：DeepSeek API**

唯一非套餐选项，纯按 token 付费。V4-Pro 当前 75% 折扣（限期 2026-05-31），SWE-bench 80.6%，是最便宜的旗舰编程模型 token 价。配合 Cline / Aider / Cursor 用 OpenAI 协议接入即可。**注意**：DeepSeek 不支持 Anthropic 协议，Claude Code 用户需要第三方包装层（如 LiteLLM）。

### 🎨 场景 D：重度多模态/全模态 Agent
**结论：MiniMax ¥29 起 或 方舟 Agent Plan**

MiniMax Token Plan 自带文本/图像/视频/音频/音乐五模态，¥29 门槛低。方舟 Agent Plan ¥40 起含 Doubao-Seedance 2.0（视频）+ Seedream 5.0 lite（图像）+ Harness 工具链（联网搜索、记忆），¥200+ 档赠 7×24 智能伙伴。

⚠️ Agent Plan 长上下文（>128k）有 **7.5× 倍率**，长流程任务消耗很快。

### 👥 场景 E：团队多坐席
**结论：百炼 Token Plan 团队版 ¥198/月起**

少有明确按坐席计费的国内产品。方舟支持子账号但不按坐席计费。其他几家基本是个人订阅模型。

### 💰 场景 F：包年付款想最大化折扣
**结论：智谱 GLM Coding Plan**

智谱给得最狠：**包季 9 折 / 包年 7 折**。Pro 月付 ¥149，包年降到 ¥104/月。前提是你已经认定要用 GLM 系列模型——锁死一家，省下来的钱才值。

⚠️ 智谱 2026-02 已整体涨价 30%+ 并取消首购优惠，包月新购成本不再像之前那么低。

---

## 5 家深度看

### 1. 火山方舟（Coding Plan / Agent Plan）

**定位**：国内最便宜的入门门槛 + 最完整的客户端支持。

| 套餐 | 价格 | 额度 |
|---|---|---|
| Coding Plan Lite | ¥9.9/月 | 5h 约 1,200 次 |
| Coding Plan Pro | ¥49.9/月 | 5h 约 6,000 次 |
| Agent Plan Small | ¥40/月 | 20,000 AFP（含多模态） |
| Agent Plan Medium | ¥200/月 | 100,000 AFP + 7×24 智能伙伴 |

**核心优势**：
- **Auto 模式**——按任务复杂度自动选模型，省额度
- 支持 11+ 客户端（含 Claude Code 原生 Anthropic 协议）
- 每日 10:30 限量抢购，价格透明

**注意**：Coding Plan 用 5h 滑动窗口，瞬时高强度会卡。Agent Plan token 单价比 Coding Plan 高 2~2.5×，纯文本编程不推荐。

详见 [火山方舟 Coding Plan 完整指南](/zh/guides/ark-coding-plan-guide/)、[Agent Plan 全解读](/zh/guides/ark-agent-plan/)。

### 2. 阿里百炼（Coding Plan / Token Plan）

**定位**：模型最多（8 款含千问全家桶）+ 明确支持团队多坐席。

| 套餐 | 价格 | 额度 |
|---|---|---|
| Coding Plan Pro | ¥200/月 | 月度约 90,000 次 |
| Token Plan 团队版 | ¥198/月起 | 多坐席 |

**核心优势**：
- 唯一的「千问 Coder + 千问 Plus + GLM + Kimi + MiniMax」混合包
- 团队版按坐席计费，企业最友好
- 月度配额机制，月初顺序消耗灵活度高

**注意**：Lite 已于 2026-03 停售（4 月停止续费），入门门槛抬到 ¥200。没有 Auto 模式，需手动指定模型 ID。

详见 [百炼 Coding Plan 完整攻略](/zh/guides/bailian-coding-plan/)。

### 3. MiniMax Token Plan

**定位**：全模态（含音频/音乐）订阅起价最低。

- 起步价 **¥29/月**
- 模态覆盖文本 / 代码 / 图像 / 视频 / 音频 / 音乐
- 适合多媒体团队、做语音/音乐应用的开发者

**注意**：纯编程不是它的核心强项，对比方舟/百炼/智谱编程能力一般。

详见 [MiniMax Token Plan 全解读](/zh/guides/minimax-token-plan/)。

### 4. 智谱 GLM Coding Plan

**定位**：要专注 GLM-5.1 旗舰 + 想最大化包年折扣的稳定用户。

| 套餐 | 月付 | 包季 | 包年 |
|---|---|---|---|
| Lite | ¥49 | ¥44/月 | ¥34/月 |
| Pro | ¥149 | ¥134/月 | **¥104/月** |
| Max | ¥469 | ¥422/月 | ¥328/月 |

**核心优势**：
- GLM-5.1 是国产编程基准里的前列模型
- 包年 7 折是同类最高折扣
- 支持 Anthropic 协议，Claude Code 直接接入

**注意**：2026-02 已涨价 30%+ 且取消首购优惠。模型只有 GLM 系，无多家轮换。

### 5. DeepSeek API（按量付费，**outlier**）

**定位**：唯一非套餐选项，唯一直接卖 V4-Pro / R1 token 的官方渠道。

- **V4-Flash**：$0.14/M 输入，82.6% HumanEval
- **V4-Pro**：80.6% SWE-bench，Codeforces #1 (3,206) —— 当前 **75% 折扣，限期 2026-05-31**
- Web Chat 完全免费

**核心优势**：
- 真实用量计费，无套餐绑死
- V4-Pro 折后是国产旗舰里 token 价最低的
- 模型直接面向开发者，无中间转包

**注意**：
- 不支持 Anthropic 协议，Claude Code 用户需 LiteLLM 等第三方层
- 用量稳定的用户可能套餐制更省
- Web 端免费层够个人轻度

---

## 选购决策树（30 秒）

```
你每月预算多少？
├─ < ¥20 → 方舟 Lite ¥9.9（试水）
├─ ¥30~¥100
│   ├─ 要全模态 → MiniMax ¥29
│   └─ 要 GLM-5.1 → 智谱 Lite ¥49
├─ ¥100~¥300
│   ├─ 要团队多坐席 → 百炼团队版 ¥198
│   ├─ 包年最大化折扣 → 智谱 Pro 包年 ¥104/月
│   ├─ 单人重度编程 → 方舟 Coding Pro ¥49.9 或 Agent Plan Small ¥40
│   └─ 多模型轮换 → 百炼 Pro ¥200
├─ > ¥300（重度 Agent）
│   ├─ 多模态 + Harness 工具链 → 方舟 Agent Plan Medium ¥200
│   ├─ 团队场景 → 百炼团队版升级
│   └─ 灵活用量 + 旗舰 → DeepSeek V4-Pro（按量）
└─ 用量极不稳定 → DeepSeek 按量付费
```

---

## 我的最终建议

如果让我给一个**默认推荐**：**先用方舟 Lite ¥9.9 跑一个月**，统计真实消耗后再决定要不要升级或迁移。¥10 块钱的代价，能解决 80% 用户的「我到底需要哪档套餐」选择困难。

如果一个月后发现：
- 总在卡 5h 窗口 → 升 Coding Pro 或 Agent Plan
- 想要 GLM 旗舰且包年付得起 → 迁智谱 Pro 包年
- 团队要扩 → 切百炼团队版
- 用量起伏太大 → 切 DeepSeek 按量

---

## 相关阅读

- [Coding Plan 专题页](/zh/coding-plan/) — 5 家方案一站式入口 + 推荐组合
- [百炼 vs 火山方舟 Coding Plan 深度对比](/zh/compare/bailian-coding-plan-vs-ark-coding-plan/)
- [Cline + 火山方舟配置指南](/zh/guides/cline-ark-setup/)
- [Cursor 国内使用完整指南](/zh/guides/cursor-china-usage/)
- [GitHub Copilot 6 月计费变化](/zh/guides/copilot-ai-credits-billing/)

> 数据核查截止 2026-05-19。所有价格、额度、活动以各家官网实时信息为准——国产 API 单价波动较快，下单前请二次确认。
