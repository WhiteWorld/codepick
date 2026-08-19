---
title: "DeepSeek Harness 入门：一切皆插件的开源 Agent 框架"
description: "DeepSeek Harness（dsh）是 DeepSeek AI 官方的开源 agent harness，64k+ stars，MIT 许可，架构核心是「一切皆插件」。本文讲清它是什么、插件化架构与 LangChain/CrewAI 等传统框架的区别、怎么上手、以及 developer preview 阶段你能用它做什么。"
date: "2026-08-14"
article_type: explainer
tags: [deepseek, harness, agent-framework, dsh, plugin, cordis]
pillar: workflow
content_status: keep
locale_strategy: mirrored
draft: false
---

## 先说结论

DeepSeek Harness（CLI 命令 `dsh`）不是又一个 AI 编程工具。它是 DeepSeek AI 官方开源的 **agent harness**——一个让你构建、编排和运行 AI Agent 的框架。

和 Claude Code、Codex 这类"拿来就用的 coding agent"不同，DeepSeek Harness 更像一个**Agent 工厂**：它提供插件化的架构底座，你把模型、工具、工作流作为插件接入，组装出你自己的 Agent。

> ⚠️ **重要提醒**：DeepSeek Harness 目前处于 **developer preview** 阶段，迭代速度极快，会有破坏性变更。本文事实截至 2026-08-14，请以官方文档为准。

---

## 一、DeepSeek Harness 是什么

[DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)（`dsh`）是 DeepSeek AI 开发的开源 agent 框架，MIT 许可，TypeScript 编写，GitHub 64k+ stars。

它的核心设计理念就一句话：**Everything is a Plugin（一切皆插件）**。

这个理念不是口号，而是由底层引擎 [Cordis](https://github.com/cordiverse/cordis) 驱动的架构约束。Cordis 的设计思想来自论文《A Programming Paradigm for Spatiotemporal Composability》（时空可组合性编程范式）——简单说，就是让软件组件在时间和空间两个维度上都能自由组合。

在 DeepSeek Harness 里：

- **模型是插件**：你可以接 DeepSeek 自己的模型，也可以接 OpenAI、Anthropic 或其他 provider
- **工具是插件**：文件读写、Shell 执行、网络请求、MCP server——都是插件
- **工作流是插件**：agent 的生命周期、任务编排、上下文管理——也是插件

这意味着你不需要"在 LangChain 里写 chain、在 AutoGen 里配 agent"——在 DeepSeek Harness 里，一切都是同一种抽象：插件。

---

## 二、核心架构：一切皆插件

### 与传统 agent 框架的区别

| 维度 | 传统框架（LangChain/AutoGen） | DeepSeek Harness |
|---|---|---|
| **架构模型** | 管线式：chain → agent → tool 逐层抽象 | 插件式：一切是插件，统一抽象 |
| **组合方式** | 预定义链（SequentialChain、RouterChain） | 时空可组合：插件在时间和空间维度自由组合 |
| **扩展性** | 继承或实现特定接口 | 注册插件即可，无需改框架代码 |
| **底层引擎** | 自研或基于 LangChain 表达式语言 | Cordis（独立开源项目，有正式论文） |
| **编码 agent 能力** | 依赖工具调用（function calling） | 原生支持 agent harness，工具执行管线内置 |

**关键区别**：传统框架是"给你一套积木，按说明书搭"；DeepSeek Harness 是"给你一套乐高，插件就是积木本身，怎么搭你自己定"。

### Cordis 引擎

Cordis 是 DeepSeek Harness 的运行时核心。它的"时空可组合性"解决了一个实际问题：agent 的行为不是线性的——它可能在执行任务 A 的过程中被中断、去处理事件 B、然后回来继续 A。传统框架用回调或状态机处理这种场景，Cordis 用插件组合天然支持。

对使用者来说，你不需要理解 Cordis 的论文才能用 DeepSeek Harness。但知道底层有这个引擎，能帮你理解为什么它和 LangChain 的"感觉"不一样。

---

## 三、和 Claude Code / Codex 等工具的关系

这不是一个"选 DeepSeek Harness 还是选 Claude Code"的问题——它们是不同层级的东西。

| 维度 | Claude Code / Codex | DeepSeek Harness |
|---|---|---|
| **定位** | Coding Agent（帮你写代码） | Agent Harness（帮你构建 Agent） |
| **使用方式** | 开箱即用，CLI 或 IDE 插件 | 框架，需要组装插件和配置 |
| **模型绑定** | 绑定 Claude / GPT 模型 | 模型无关，插件化接入任意 provider |
| **适用场景** | 个人开发者日常编码 | 构建自定义 Agent 工作流、Agent 产品 |
| **成熟度** | 生产可用 | Developer preview |

**你可以两者都用**：在 DeepSeek Harness 里接 DeepSeek 模型构建一个代码审查 Agent，同时日常编码继续用 Claude Code。它们不冲突。

---

## 四、快速上手

### 5 分钟跑起来

```bash
# 前置条件：Node.js 已安装
npx @deepseek-ai/dsh web
```

Web UI 默认在 `http://127.0.0.1:3080` 启动。打开浏览器就能看到界面。

### 从源码跑

```bash
git clone https://github.com/deepseek-ai/deepseek-harness.git
cd deepseek-harness
pnpm install
pnpm run build
pnpm dsh web
```

### 配置 Provider

在 Web UI 中配置你的模型 provider（DeepSeek API、OpenAI API 等），然后就可以创建 Agent 并开始使用了。详细配置见官方 [Web UI 指南](https://github.com/deepseek-ai/deepseek-harness/tree/master/docs/user/guide)。

### Python SDK

除了 Web UI 和 CLI，DeepSeek Harness 还提供 Python SDK，方便在 Python 项目中集成。

---

## 五、插件生态与社区

### 插件

DeepSeek Harness 的插件通过 GitHub 的 [`dsh-plugin` topic](https://github.com/topics/dsh-plugin) 来发现。你可以：

- 浏览社区已有的插件
- 在社区目录 [dsplugin.app（dsh plugin registry）](https://dsplugin.app/) 按来源与 Manifest 状态筛选可安装插件（社区维护，非官方）
- 把自己的插件打上 `dsh-plugin` topic 让它被搜索到
- 参考官方文档 [插件开发指南](https://github.com/deepseek-ai/deepseek-harness/tree/master/docs) 写自己的插件

### 社区

- **Discord**：[DeepSeek Harness Discord](https://discord.gg/Ycq5dCaS4)
- **国内**：企微群 + 公众号（见官方 README）
- **GitHub Discussions**：反馈和 bug 报告

---

## 六、适合谁 / 不适合谁

**适合**：

- 想构建自定义 Agent 工作流的开发者（不只是"让 AI 写代码"，而是"让 AI 按你的流程干活"）
- 对插件化架构感兴趣、想深入理解 Agent 框架设计的工程师
- 已经在用 DeepSeek 模型、想基于它构建 Agent 产品的团队
- 愿意接受 developer preview 的不稳定性来换取早期体验

**不适合**：

- 只想找一个开箱即用的 AI 编程工具——直接用 Claude Code、Codex 或 Cursor
- 对破坏性变更零容忍的生产环境——等 stable release
- 不想学新框架、只想用现成方案——DeepSeek Harness 的学习曲线比直接用 coding agent 高

---

## 总结

DeepSeek Harness 的价值不在"又一个 agent 工具"，而在"**一种不同的 agent 构建方式**"。

当你不再满足于"让 AI 帮我写这段代码"，而是想"让 AI 按我设计的流程、用我指定的工具、在我定义的边界内持续工作"——这时候你就需要一个 agent harness。DeepSeek Harness 的插件化架构，是目前开源世界里对这个需求最激进的回答之一。

它还在 developer preview，但方向已经很清楚：**不是给你一个 agent，而是给你一个造 agent 的工厂。**

> 延伸阅读：站内 [Harness 品类综述](/zh/guides/meta-harness-2026) 对比了 Omnigent、Conductor、Zed ACP 等同类 harness 产品，可配合阅读。
