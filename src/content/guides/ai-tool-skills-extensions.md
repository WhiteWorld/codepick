---
title: "AI 编程工具的 Skills 与扩展系统：Claude Code、Cursor、Cline 完全指南"
description: "深入解析 AI 编程工具的扩展能力：Claude Code 的 Skills/Hooks 系统、Cursor Rules、Cline 自定义指令，以及如何用这些机制打造专属 AI 工作流。"
date: "2026-03-28"
tags: ["skills", "claude-code", "cursor", "cline", "hooks", "自定义", "工作流"]
---

AI 编程工具不只是"更聪明的代码补全"。现代工具提供了丰富的扩展机制，让你能深度定制 AI 的行为——从自动执行任务到强制遵守团队规范。本文带你系统了解各主流工具的 Skills/扩展系统。

## 为什么需要扩展机制

默认的 AI 助手像一个什么都懂的实习生：能力强，但对你的项目、团队规范、工作流一无所知。扩展机制解决这个问题：

- **持久化上下文**：不用每次对话都重新解释项目背景
- **自动化重复任务**："/commit" 一键按规范提交，不用手写 commit message
- **约束 AI 行为**：强制使用特定框架、禁止 AI 修改某些文件
- **团队协作**：把最佳实践编码为可分享的配置文件

---

## Claude Code：Skills + Hooks 系统

Claude Code 是扩展能力最完整的 CLI 工具之一，提供三层定制机制。

### 1. CLAUDE.md — 持久化上下文

在项目根目录创建 `CLAUDE.md`，Claude Code 每次启动都会自动读取它：

```markdown
# MyProject 项目说明

## 技术栈
- Next.js 14 App Router
- TypeScript（严格模式）
- Prisma + PostgreSQL

## 编码规范
- 组件必须用 `.tsx` 扩展名
- 禁止使用 `any` 类型
- 所有 API 调用走 `/lib/api.ts` 的统一客户端

## 常用命令
- `npm run dev` — 本地开发
- `npm run test` — 运行测试（必须在提交前执行）
```

**适合放入 CLAUDE.md 的内容**：
- 项目技术栈说明
- 编码规范和禁止事项
- 常用命令速查
- 重要目录结构说明

### 2. Skills（斜杠命令）

Skills 是预定义的任务模板，通过 `/skill-name` 触发。Claude Code 内置了大量 Skills，也支持自定义：

**内置 Skills 示例**：

| 命令 | 功能 |
|------|------|
| `/commit` | 分析改动，生成规范的 commit message |
| `/review-pr` | 审查 PR，给出详细的代码评审 |
| `/fix` | 分析并修复当前错误 |
| `/test` | 为选中代码生成测试 |
| `/explain` | 解释当前代码或文件 |

**自定义 Skills**：

在 `~/.claude/skills/` 目录下创建 `.md` 文件：

```markdown
# deploy-staging.md

将当前分支部署到 staging 环境：

1. 运行 `npm run build` 确认构建通过
2. 运行 `npm run test` 确认测试全绿
3. 执行 `git push origin HEAD:staging`
4. 等待 GitHub Actions 部署完成
5. 打开 https://staging.myapp.com 验证
```

之后在对话中输入 `/deploy-staging` 即可触发这个工作流。

### 3. Hooks — 事件驱动自动化

Hooks 是最强大的机制：在特定事件发生时自动执行脚本。

在 `~/.claude/settings.json` 中配置：

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "echo '命令执行完毕' >> ~/.claude/activity.log"
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "scripts/check-forbidden-files.sh"
          }
        ]
      }
    ]
  }
}
```

**常见 Hooks 场景**：

| 事件 | 场景 |
|------|------|
| `PreToolUse` | 文件修改前自动备份；阻止修改生产配置 |
| `PostToolUse` | 每次 Bash 执行后记录日志 |
| `Stop` | 对话结束后自动运行 lint 检查 |
| `Notification` | Claude 需要输入时发送桌面通知 |

---

## Cursor：Rules 系统

Cursor 采用基于规则文件的方式定制 AI 行为。

### .cursorrules（项目级规则）

在项目根目录创建 `.cursorrules`：

```
你是一个专注于 React + TypeScript 的全栈开发助手。

## 编码规范
- 使用函数式组件，不用 Class 组件
- 优先使用 Tailwind CSS，不要写内联样式
- 所有异步操作必须有 error handling
- 状态管理用 Zustand，不用 Redux

## 代码风格
- 变量命名使用 camelCase
- 常量使用 UPPER_SNAKE_CASE
- 组件文件命名使用 PascalCase.tsx

## 禁止事项
- 不要使用 `console.log`（改用 logger 模块）
- 不要提交包含 TODO 的代码
- 不要在 API 路由中暴露敏感信息
```

### Cursor Rules（全局规则，v0.43+）

新版 Cursor 支持更细粒度的规则管理：

- **Always**：每次对话都应用
- **Auto**：根据文件类型自动应用
- **Agent**：仅在 Agent 模式下应用
- **Manual**：手动触发（`@rule-name`）

```
# react-components.cursorrule
description: React 组件开发规范
globs: ["src/components/**/*.tsx"]
alwaysApply: false

当编写 React 组件时：
1. 导出类型定义（Props interface）
2. 添加 JSDoc 注释说明组件用途
3. 使用 React.FC<Props> 类型注解
```

---

## Cline：自定义指令 + MCP

Cline 的扩展机制分两层：

### 1. 自定义指令

在 VS Code 的 Cline 设置中，可以配置：

- **系统提示补充**（System Prompt Appended）：在系统提示末尾追加内容
- **任务前置说明**：每次任务开始前自动发送的说明

```
# 系统提示补充示例
你正在协助开发一个电商项目。

技术约束：
- 后端 API 基于 FastAPI，不要生成 Django 代码
- 数据库迁移必须通过 Alembic 管理
- 所有用户输入必须经过 Pydantic 验证

安全约束：
- 不要在代码中硬编码任何密钥或密码
- API 端点必须验证用户权限
```

### 2. MCP 集成（见 MCP 入门指南）

Cline 对 MCP 的支持是所有工具中最完整的，可以在 VS Code 侧边栏直接管理 MCP Servers，无需手动编辑配置文件。

---

## Windsurf：Memories + Rules

Windsurf 结合了规则系统和 AI 记忆功能：

### .windsurfrules

类似 Cursor 的 `.cursorrules`，放在项目根目录：

```
项目：SaaS 后台管理系统
框架：Vue 3 + Vite + Element Plus

代码规范：
- 使用 Composition API + `<script setup>` 语法
- 状态管理用 Pinia
- 图标使用 Element Plus 图标库，不引入其他图标包

文件组织：
- 页面组件放 src/views/
- 可复用组件放 src/components/
- API 调用统一在 src/api/ 下管理
```

### Cascade Memories

Windsurf 的 Cascade AI 可以跨对话记住重要信息。当 AI 发现有价值的信息时，会询问是否保存为记忆：

> "我注意到你更喜欢用 async/await 而不是 .then() 链，要保存这个偏好吗？"

---

## 各工具扩展能力对比

| 维度 | Claude Code | Cursor | Cline | Windsurf |
|------|------------|--------|-------|----------|
| **持久化上下文** | ✅ CLAUDE.md | ✅ .cursorrules | ✅ 自定义指令 | ✅ .windsurfrules |
| **斜杠命令** | ✅ 完整 Skills | ⚠️ 有限 | ❌ | ❌ |
| **事件 Hooks** | ✅ 完整 Hooks | ❌ | ❌ | ❌ |
| **MCP 支持** | ✅ | ✅ | ✅ 最佳 | ✅ |
| **跨项目记忆** | ❌ | ⚠️ 全局规则 | ❌ | ✅ Memories |
| **团队分享** | ✅ 提交 CLAUDE.md | ✅ 提交 .cursorrules | ⚠️ | ✅ 提交规则文件 |

---

## 实践建议

### 入门级（立竿见影）

1. **在每个项目创建 CLAUDE.md 或 .cursorrules**：写清楚技术栈、禁止事项，立刻减少 AI 的"低级错误"
2. **善用 `/commit` 等内置 Skills**：养成习惯，提交质量明显提升

### 进阶级（深度定制）

3. **为常见工作流创建自定义 Skills**：部署、发布、测试流程都可以封装
4. **配置 PreToolUse Hooks**：防止 AI 意外修改关键配置文件

### 团队级（协作规范）

5. **把 CLAUDE.md/.cursorrules 纳入版本控制**：团队成员开箱即用，共享最佳实践
6. **结合 MCP 实现深度自动化**：GitHub MCP + CI/CD 可以让 AI 真正参与开发流程

---

## 总结

| 你的需求 | 推荐工具 & 机制 |
|---------|----------------|
| 深度自动化工作流 | Claude Code Hooks |
| 简单项目规范约束 | 任意工具 + rules 文件 |
| VS Code 深度集成 | Cline + MCP |
| 跨对话记忆 | Windsurf Memories |
| 团队统一规范 | .cursorrules / CLAUDE.md 提交到 Git |

选择合适的扩展机制，是把 AI 工具从"偶尔用用"升级到"深度融入工作流"的关键一步。

---

*数据更新于 2026-03-28。各工具功能更新频繁，建议查阅官方文档获取最新信息。*
