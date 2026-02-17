---
title: "Gemini CLI vs Claude Code vs Codex CLI：三大免费终端 Agent 对比 2026"
description: "三款顶级终端 AI 编程工具横向对比：免费额度、模型能力、安装方式、适用场景。帮你选出最适合自己的命令行 AI 助手。"
date: "2026-02-17"
tags: ["gemini-cli", "claude-code", "codex-cli", "终端", "cli", "免费", "对比"]
---

2025-2026 年，三大科技巨头先后推出了自己的终端 AI 编程 Agent：Google 的 Gemini CLI、Anthropic 的 Claude Code、OpenAI 的 Codex CLI。三者都在终端运行，但定价模型、免费额度和能力侧重差异显著。

## 一眼看懂

| 维度 | Gemini CLI | Claude Code | Codex CLI |
|------|-----------|-------------|-----------|
| 免费额度 | **1000 次/天**（个人账号） | 无独立免费层 | 需 ChatGPT Plus |
| 最低月费 | $0 | $0（用 API Key 按量） | $20（ChatGPT Plus） |
| 核心模型 | Gemini 2.5 Pro | Claude Opus 4.6 | o3 / o4-mini |
| 上下文窗口 | **100 万 token** | 20 万 token | 标准 |
| 开源 | ✅ | ✅ | ✅ |
| 国内可用 | ❌ | ❌ | ❌ |
| MCP 支持 | ✅ | ✅ | ✅ |

---

## 免费额度详解

### Gemini CLI：最慷慨的免费层

用个人 Google 账号登录即可获得：
- **60 请求/分钟**
- **1000 请求/天**
- 免费使用 Gemini 2.5 Pro（市值数百美元的顶级模型）

对绝大多数开发者来说，这已经足够日常使用，无需信用卡。

### Claude Code：按量计费，无固定免费额度

Claude Code 不绑定订阅，直接使用 Anthropic API Key：
- 个人使用无固定免费额度（新账号有少量免费 credit）
- 但有 **Max 订阅**（$100-200/月），提供高用量保障
- 灵活性最高——用多少付多少，不浪费

### Codex CLI：需要 ChatGPT Plus

- 必须有 ChatGPT Plus（$20/月）或使用 OpenAI API Key 按量计费
- Plus 订阅包含的 Codex 额度有上限（5小时约 30-150 次任务）
- API Key 方式灵活但 o3 模型价格较高

> 💡 **零成本入门推荐**：Gemini CLI。个人 Google 账号，1000 次/天，秒杀其他两个。

---

## 模型能力对比

### Gemini CLI — Gemini 2.5 Pro
- 100 万 token 超长上下文，能一次性处理整个大型代码库
- 内置 Google Search Grounding，可实时搜索最新文档/API
- 多模态支持（图片理解）

### Claude Code — Claude Opus 4.6
- 代码生成质量公认顶级，尤其擅长复杂推理和架构设计
- CLAUDE.md 项目规范机制，能深度理解项目上下文
- Git 工作流集成最完善（commit、PR、分支管理）

### Codex CLI — o3 / o4-mini
- OpenAI 推理模型，在算法题和数学推导上有优势
- 全屏 TUI 界面，交互体验最接近 IDE
- 支持 MCP，可扩展外部工具

---

## 安装方式

```bash
# Gemini CLI
npm install -g @google/gemini-cli
gemini  # 用 Google 账号登录即可

# Claude Code
npm install -g @anthropic-ai/claude-code
claude  # 需要 ANTHROPIC_API_KEY

# Codex CLI
npm install -g @openai/codex
# 或
brew install --cask codex
codex  # 需要 OPENAI_API_KEY 或 ChatGPT 登录
```

---

## 适用场景对比

| 场景 | 推荐 |
|------|------|
| 零成本体验顶级模型 | **Gemini CLI** |
| 处理超大代码库（>10万行） | **Gemini CLI**（100万 token）|
| 复杂架构设计 / 代码重构 | **Claude Code** |
| Git 工作流自动化 | **Claude Code** |
| 算法/数学密集型任务 | **Codex CLI**（o3 推理）|
| 已订阅 ChatGPT Plus | **Codex CLI**（无额外成本）|

---

## 国内使用

三者均需访问境外 API，国内网络无法直连：
- Gemini CLI → Google API（被屏蔽）
- Claude Code → Anthropic API（被屏蔽）
- Codex CLI → OpenAI API（被屏蔽）

国内开发者建议参考 [Cline + 火山方舟 Coding Plan](https://www.volcengine.com/L/s3lNTNYxaEc/)（[配置指南](/guides/cline-ark-setup)）。

---

## 总结推荐

- **想免费用**：选 Gemini CLI，1000 次/天完全够用
- **最强代码质量**：选 Claude Code，架构和重构无出其右
- **已是 ChatGPT Plus 用户**：选 Codex CLI，附赠使用成本为零
- **超大代码库**：Gemini CLI 的 100 万 token 上下文无可替代
