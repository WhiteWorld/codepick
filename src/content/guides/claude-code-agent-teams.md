---
title: "Claude Code Agent Teams 实战指南：多 Agent 并行开发"
description: "Claude Code Agent Teams 完整教程：如何启用多 Agent 协作、Team Lead 与 Teammate 的分工模式、共享任务列表与消息通信机制、典型使用场景，以及控制成本的省钱方法。"
date: "2026-05-04"
article_type: "howto"
tags: ["claude-code", "agent-teams", "多智能体", "并行开发", "自动化", "效率"]
draft: false
---

2026 年 2 月 5 日，Anthropic 随 Claude Opus 4.6 一同发布了一项实验性功能：**Agent Teams**。它让多个 Claude Code 实例能够组队协作——一个 Team Lead 负责统筹，多个 Teammate 并行执行任务，成员之间可以直接通信，而不必都经过主 Agent 转发。

这和之前的子代理（Subagent）有本质区别：Subagent 只能向主 Agent 汇报结果，而 Agent Teams 的成员可以相互发消息、共享发现、协商方案。

---

## 前置条件

开启 Agent Teams 之前，请确认：

| 项目 | 要求 |
|------|------|
| Claude Code 版本 | v2.1.32 或更高 |
| Claude 订阅 | Pro（$20/月）或 Max（$100–$200/月） |
| 使用的模型 | Claude Opus 4.6（Agent Teams 依赖其推理能力） |
| 可选工具 | tmux（为每个 Agent 提供独立终端面板，便于观察） |

> **费用提示**：Agent Teams 会同时运行多个 Claude Opus 实例，token 消耗是单实例的数倍。建议先在小任务上测试，估算成本后再用于大型项目。

---

## 启用方法

Agent Teams 默认关闭，通过环境变量或 `settings.json` 启用：

**方法一：环境变量（临时启用）**

```bash
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
claude  # 重新启动 Claude Code
```

**方法二：写入 settings.json（持久启用）**

```json
// ~/.claude/settings.json
{
  "experimentalFeatures": {
    "agentTeams": true
  }
}
```

启用后，在 Claude Code 中输入 `/team` 即可查看团队相关命令。

---

## 架构原理

Agent Teams 由四个核心组件构成：

```
Team Lead（团队领导者）
  ├── 创建团队任务列表
  ├── 分配任务给 Teammate
  └── 综合结果，向你汇报

Teammate A ←──消息──→ Teammate B
  ├── 在独立上下文中工作
  ├── 读写共享任务列表
  └── 可直接向其他成员发消息
```

### 共享任务列表

所有 Agent 都能读写同一个任务列表（Task List）。这是协作的核心基础——没有它，并行 Agent 会做重复工作或产生冲突。任务列表跟踪每项任务的：
- 状态（待处理 / 进行中 / 已完成）
- 负责人（哪个 Teammate）
- 依赖关系（B 依赖 A 的输出）

### 点对点消息通信

Teammate 之间通过"邮箱"系统直接通信。典型场景：前端 Teammate 可以直接告诉后端 Teammate「API 的响应格式需要改成这样」，而不必通过 Team Lead 转达。这让协作更实时、更高效。

---

## 典型使用场景

### 场景一：并行代码审查

```
Team Lead: 对这个 PR 进行全面代码审查
├── Teammate A: 专注安全漏洞（SQL 注入、XSS、权限校验）
├── Teammate B: 专注性能问题（N+1 查询、内存泄漏、缓存策略）
└── Teammate C: 专注测试覆盖率（边界条件、异常路径）
```

三个方向并行审查，Team Lead 最终汇总。一次 PR 审查从 1 小时压缩到 15 分钟。

**2026 年 3 月**，Anthropic 内部将 Agent Teams 用于生产环境的 Claude Code Review，代码审查覆盖率从 16% 提升到 54%。

### 场景二：前后端并行开发

```
Team Lead: 实现用户评论功能
├── Teammate A（后端）: 实现 POST /comments API 和数据库迁移
└── Teammate B（前端）: 实现评论组件，A 完成时获取 API 规范
```

Teammate B 先实现 UI 骨架，等 A 通知 API 规范后再对接，不用等 A 全部完成。

### 场景三：多模块并行调研

```
Team Lead: 评估从 REST 迁移到 GraphQL 的可行性
├── Teammate A: 调研影响的 API 端点和客户端
├── Teammate B: 调研现有 N+1 查询问题
└── Teammate C: 调研团队的 GraphQL 学习曲线
```

三个维度并行调研，最终由 Team Lead 综合，生成一份完整的可行性报告。

---

## Subagent vs Agent Teams：如何选择

| 特性 | Subagent | Agent Teams |
|------|----------|-------------|
| **通信方式** | 只能向主 Agent 汇报 | 成员间可直接通信 |
| **上下文** | 共享主 Agent 上下文 | 每个成员有独立上下文 |
| **适用任务** | 快速、聚焦的单一任务 | 需要协调的复杂多模块任务 |
| **启动成本** | 低 | 中（需要多个 Opus 实例） |
| **最佳场景** | 执行明确的子任务 | 成员需要相互通知发现 |

**选 Subagent**：任务明确、独立、快速，成员不需要互相沟通。
**选 Agent Teams**：任务复杂、多模块并行，成员之间有协调需求（如一方输出是另一方输入）。

---

## 成本控制

Agent Teams 的最大隐患是成本失控。以下是常用的控制方法：

### Team Lead 用 Opus，Teammate 用 Sonnet

在发起团队任务时指定模型：

```
/team start --lead opus --members sonnet
对这个代码库进行全面审查并生成重构计划
```

Team Lead 负责战略思考，用 Opus；Teammate 执行具体任务，用 Sonnet（约为 Opus 成本的 1/5）。

### 限制 Teammate 数量

通常 2–3 个 Teammate 就够了。超过 4 个后，协调成本和 token 消耗会快速上升，而收益递减。

### 设置 token 预算

```bash
export CLAUDE_CODE_MAX_TOKENS_PER_SESSION=100000
```

每个 Teammate 超出后会主动停止，防止失控。

### 先跑 `/plan`，再跑团队

在启动团队之前，先用 `/plan` 让 Claude 规划任务分解，你确认无误后再正式启动 Agent Teams。这样能避免团队走错方向浪费 token。

---

## 实用技巧

**1. 用 tmux 分屏观察**

安装 tmux 后，每个 Teammate 会在独立的终端面板中运行，你可以同时看到所有 Agent 的工作状态：

```bash
brew install tmux  # macOS
# Claude Code 会在启动团队时自动创建 tmux 分屏
```

**2. 给每个 Teammate 明确边界**

在任务描述中明确各 Teammate 的职责边界，避免重叠：

```
Teammate A 只负责 src/api/ 目录下的文件
Teammate B 只负责 src/components/ 目录下的文件
```

**3. 用共享文件协调而非纯消息**

对于大量输出（如调研报告），让 Teammate 写入一个共享的中间文件（如 `/tmp/research-output.md`），Team Lead 最后读取，比用消息传递更可靠。

**4. 从小任务开始**

第一次用 Agent Teams 时，选一个已经理解的中等任务（如给某个模块添加测试），观察团队协作的方式，再逐步扩展到更复杂的场景。

---

## 已知限制

- Agent Teams 目前是**实验性功能**，API 可能在未来版本中调整
- 在 Windows 原生环境中（非 WSL）tmux 分屏功能可能不稳定
- 每个 Teammate 有独立的上下文，不共享彼此读过的文件内容（需要通过消息或共享文件传递）
- 当 Teammate 数量超过 5 个时，任务列表的并发写入可能出现竞态条件

---

## 小结

Claude Code Agent Teams 是目前 AI 编程工具中最接近"AI 开发团队"的功能。它最适合的场景是：任务可以明确分模块、模块之间有协调需求、你愿意接受相应的成本。

对于大多数日常任务，单 Claude Code 实例 + 合理使用 Subagent 就已经足够。Agent Teams 是当任务规模真正需要并行化时的有力工具，而不是默认选项。
