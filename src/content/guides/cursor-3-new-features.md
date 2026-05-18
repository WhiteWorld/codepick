---
title: "Cursor 3.0 全面解析：从「文件编辑器」到「Agent 指挥中心」"
description: "2026 年 4 月 2 日，Cursor 发布了自 2023 年以来最大一次界面重构，代号 Glass。本文拆解 Agents Window、并行 Agent、Design Mode、多仓库支持等核心变化，以及 5 月 13 日的云端 Agent 环境更新。"
date: "2026-05-18"
article_type: "explainer"
tags: ["cursor", "cursor-3", "agent", "并行agent", "IDE", "更新"]
draft: false
---

2025 年 3 月，Cursor 的数据显示：使用 Tab 补全的用户数是使用 Agent 模式的 2.5 倍。不到一年，这个比例完全倒转——如今，选择自主 Agent 任务的用户是用 Tab 补全的两倍。

工作方式变了。工具也得跟上。

2026 年 4 月 2 日，Cursor 发布了自 2023 年产品上线以来最大规模的界面重构：**Cursor 3**（内部代号 Glass）。这不是功能迭代，而是一次范式转换——从「文件为中心」到「Agent 为中心」。

---

## 什么变了：Agents Window

Cursor 3 最核心的变化，是在 IDE 左侧增加了一个专属的 **Agents Window（Agent 面板）**。

原本，你在一个对话框里跟 AI 说话，AI 帮你改文件。现在，这个面板会把你所有正在运行的 Agent 全部列出来——不管是本地运行的、云端运行的、SSH 远端运行的，还是你从手机、Slack、GitHub 或 Linear 上触发的任务，全部汇聚在一个侧边栏里统一管理。

你不再是一个「提问者」，而是一个「调度者」。

---

## 核心新功能

### 1. /multitask：并行执行多个 Agent

这是 Cursor 3 最受开发者关注的变化之一。

```
/multitask 添加用户认证模块，并同步写单元测试
```

Cursor 会把这个任务拆解成多个独立子任务，并**同时**启动多个异步子 Agent 并行执行——而不是排队等待。对于大型重构、跨模块修改、同步文档等任务，实测速度提升显著。

### 2. Agent Tabs：多对话并排

新增的 Agent Tabs 允许你把多个聊天窗口并排或平铺展示，类似浏览器的多标签页。你可以同时盯着三个 Agent 的进展，随时介入或切换上下文——不用反复开关对话框。

### 3. Design Mode（Cmd+Shift+D）

Cursor 3 内置了一个浏览器预览面板。激活 Design Mode 后，你可以直接在预览界面上**圈出 UI 元素**，标注修改意图（"把这个按钮的颜色改成红色"），Agent 会读取你的标注并直接操作对应代码。

对于前端开发者来说，这大幅减少了"描述 → AI 理解 → 定位元素 → 修改"的来回。

### 4. 30+ 插件市场

Cursor 3 上线了一个插件市场，首批涵盖来自 Atlassian、Datadog、GitLab、Hugging Face 等公司的 30 余个官方插件。Agent 可以直接调用这些集成，例如"把这个 bug 关联到 Jira ticket"或"在 Datadog 上查一下这个函数的 P99 延迟"。

### 5. 多 LLM 对比模式

通过一个快捷键，你可以把同一个 prompt 同时发送给多个模型，并排对比输出结果。适合在 Claude Sonnet 和 GPT-5.5 等模型之间快速评估哪个更适合当前任务。

### 6. 多仓库 + Worktree 支持

Cursor 3 的 Agent 会话现在支持**跨仓库操作**。你可以配置一个包含前端、后端、shared library 三个仓库的工作区，Agent 一次任务就能跨三个 repo 修改代码，不需要手动切换上下文。

Worktree 支持也做了重构：旧的下拉菜单 UI 已废弃，取而代之的是 `/worktree` 和 `/best-of-n` 命令，后者可以同时在多个 worktree 中运行任务并挑选最优结果。

---

## 5 月 13 日更新：云端 Agent 环境

Cursor 3 发布约六周后，5 月 13 日推出了配套的**云端 Agent 环境（Cloud Agent Environments）**更新，面向团队和企业场景。

主要内容：

| 功能 | 说明 |
|------|------|
| 多仓库环境 | 一个云端环境可挂载多个仓库，会话间可复用 |
| Dockerfile 配置 | 用 Dockerfile 定义 Agent 的运行环境，支持构建密钥和加速缓存 |
| 审计日志 | 记录 Agent 所有操作，满足企业合规要求 |
| 安全控制 | 环境级别的权限隔离和安全策略 |
| PR Review 体验 | 全新 PR 审查界面，Agent 可自动分析并评论 PR |

云端环境的核心价值是：你的本地机器不需要一直开着，Agent 跑在云端，任务完成后生成 PR，你随时回来审查即可。

---

## 对你的工作流意味着什么

### 如果你主要用 Tab 补全

Cursor 3 对你的影响最小。Tab 体验本身没有变化，/multitask 和 Agents Window 对你来说只是暂时用不上的新功能。

### 如果你已经在用 Agent 模式

这次更新值得花半小时重新熟悉界面：
- 试一下 `/multitask`，把你平时"一步步交代的长任务"改成"说一句，等结果"
- 在 Agents Window 里感受一下多 Agent 并行的体感
- 如果你做前端，打开 Design Mode 试试直接在浏览器标注需求

### 如果你在团队里用 Cursor

云端 Agent 环境是为你准备的。多仓库支持 + 审计日志 + Dockerfile 配置，基本解决了团队推广 AI 编程时"环境不统一、操作不可审计"两个最大的顾虑。

---

## 与 Claude Code、Codex 的对比位置

Cursor 3 的发布，明显是在回应 Claude Code（CLI agentic 工具）和 OpenAI Codex（云端 Agent）的竞争压力。

三者目前的差异化定位：

| 维度 | Cursor 3 | Claude Code | OpenAI Codex |
|------|----------|-------------|--------------|
| 交互方式 | GUI（IDE 内） | 终端 CLI | 云端异步 |
| 并行 Agent | ✅ | ✅（子 Agent） | ✅ |
| 本地运行 | ✅ | ✅ | ❌ |
| 多仓库 | ✅ | 需手动配置 | ✅ |
| Design Mode | ✅（内置浏览器） | ❌ | ❌ |
| 国内友好度 | ★★☆☆☆ | ★★☆☆☆ | ★☆☆☆☆ |

Cursor 3 的核心优势仍然是 **GUI 体验和本地实时交互**。对于习惯在 IDE 里"看着代码写代码"的开发者，它依然是最顺手的选择。

---

## 总结

Cursor 3 不是小版本更新，是 Cursor 产品方向的一次明确表态：**AI IDE 的下一个形态，是 Agent 调度中心，而不是智能编辑器**。

从具体功能看，/multitask 并行执行、Agents Window 统一管理、Design Mode 可视化标注、云端 Agent 环境这几个变化，对重度 Agent 用户来说改善是实质性的。

如果你还停留在"打开 Composer 窗口，逐句告诉 AI 要改什么"的模式，Cursor 3 是一个值得重新适应的契机。
