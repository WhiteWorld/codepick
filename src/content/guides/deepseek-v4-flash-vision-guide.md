---
title: "DeepSeek V4 Flash Vision 上手：DeepSeek 首个视觉模型实测要点"
description: "deepseek-v4-flash-vision-exp 是 DeepSeek V4 家族首个支持图像输入的实验模型，发布当天冲上 Hacker News 458 分。本文讲清它能做什么、三种传图方式、兼容性（OpenAI/Anthropic 格式）、token 计费与注意事项，帮你快速判断要不要接入。"
date: "2026-08-22"
article_type: howto
tags: [deepseek, deepseek-v4, vision, 视觉模型, api]
pillar: plans
content_status: keep
locale_strategy: mirrored
draft: false
---

## 先说结论

- **`deepseek-v4-flash-vision-exp` 是 DeepSeek V4 家族第一个支持图像输入的模型**（实验版），发布当天在 Hacker News 拿到 458 分——社区对"DeepSeek 出视觉模型"期待已久。
- 它能：描述图片、读截图里的文字（OCR 场景）、分析图表、结合图片做多轮问答。
- 接入极简：**OpenAI/Anthropic 兼容格式**，Claude Code、GitHub Copilot、OpenCode 等工具可以直接当后端模型用，不用写代码。
- 注意：**实验版**，API 行为可能调整；图片按 token 计费，与文字 token 一起结算。

---

## 是什么

DeepSeek V4 家族现有三个公开模型：

| 模型 ID | 说明 |
|---------|------|
| `deepseek-v4-flash` | 轻量高速版（已更新到 V4-Flash-0731） |
| `deepseek-v4-pro` | 旗舰版（已更新到 V4-Pro-0813） |
| **`deepseek-v4-flash-vision-exp`** | **实验版视觉模型，支持图片 + 文字输入** |

`vision-exp` 基于 flash 的轻量架构加了图像理解能力，是 DeepSeek 第一次把"看图"能力开放给 API 用户。它和文本模型共用一套 API，只是 `model` 参数换成 `deepseek-v4-flash-vision-exp`，并在 messages 里把 `content` 从纯字符串改成块数组（标准 OpenAI 多模态格式）。

## 能做什么

官方文档列出的典型用途：

- **描述图片**："这张图里有什么？"
- **读截图文字**：从 UI 截图、文档扫描件、白板照片里提取文字（OCR 类）。
- **分析图表**：给一张折线图/柱状图，让它读趋势、给结论。
- **多轮图文问答**：图片 + 追问，结合上下文继续聊。

支持格式：**JPEG、PNG、GIF、WebP**。注意格式是根据文件实际内容识别的，不是文件名或 MIME 声明——传错后缀也不怕。

## 三种传图方式

都用标准 OpenAI Chat Completions 格式（`content` 为块数组），任选其一：

1. **Base64 内联**：把图片编码成 `data:image/jpeg;base64,...` 直接塞进请求。最简单，适合本地文件；注意编码后数据计入请求体 48 MiB 上限。
2. **外链 URL**：传一个公开可访问的 http(s) 链接，模型端下载图片。限制：URL ≤ 8192 字符、图片 ≤ 32 MiB、60 秒内必须下载完成。
3. **Files API file_id**：先上传到 DeepSeek Files API，再用 file_id 引用。适合同一张图多次引用、避免重复上传。

同款能力也支持 **Responses API** 和 **Anthropic 兼容接口**（base_url 换成 `https://api.deepseek.com/anthropic`，图片走 Anthropic 的 image content block 格式）。

## 怎么接入现有工具

DeepSeek 官方文档明确：Claude Code、GitHub Copilot、OpenCode 等主流 agent 工具都支持把 DeepSeek 当后端模型——不用写代码，改配置即可：

- **Claude Code**：按 DeepSeek 官方 agent 集成指南配置 base_url / api_key / model。
- **OpenCode / Copilot**：同样走 OpenAI 兼容配置。
- **DeepSeek Harness**：官方 agent harness 已进入 developer preview，可直接调 `vision-exp`。

如果你还没配过 DeepSeek API，入门见我们的 [DeepSeek V4 API 平台指南](/zh/guides/deepseek-v4-api-platforms/)。

## 计费与注意事项

- **图片按 token 计费**：图片会根据尺寸被转成 tokens，与文字 tokens 一起结算；推理前会自动缩放（低于约 384×384 的会放大处理）。
- **具体单价**以 DeepSeek 官方[价格页](https://api-docs.deepseek.com/quick_start/pricing)为准，本文不引用未经核实的数字。
- **实验版警告**：`-exp` 后缀意味着能力、限流、价格都可能调整；生产环境接入前先在官方文档确认最新状态。
- **国产直连**：DeepSeek API 国内可直接访问，是国内用户接入多模态能力的低门槛选项（对比 GPT/Claude 需要代理）。

## 数据来源与复核

- 模型 ID、能力、格式、三种传图方式、兼容接口、token 计费：DeepSeek 官方文档 [Vision 指南](https://api-docs.deepseek.com/guides/vision/) 与 [快速开始](https://api-docs.deepseek.com/)，2026-08-22 核对。
- HN 热度：Hacker News 热门榜 458 分（2026-08-21）。
- 实验模型能力可能变化，建议接入前复核官方文档；发现过期内容欢迎在 GitHub 仓库提 issue。
