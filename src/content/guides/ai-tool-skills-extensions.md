---
title: "AI 编程工具的 Skills 与扩展系统：Claude Code、Cursor、Cline 完全指南"
description: "深入解析 AI 编程工具的扩展能力：Claude Code 的 Agent Skills / Hooks / Plugins、Cursor 的 .mdc Rules、跨工具的 AGENTS.md 标准，以及如何用这些机制打造专属 AI 工作流。"
date: "2026-06-08"
article_type: "explainer"
tags: ["skills", "claude-code", "cursor", "cline", "hooks", "agents-md", "plugins", "自定义", "工作流"]
pillar: workflow
content_status: keep
locale_strategy: mirrored
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

### 2. Agent Skills（智能体技能）

> **概念已升级**：早期的"斜杠命令"和如今的 **Agent Skills** 已经合并。一个 skill 是**一个文件夹**，里面有一个 `SKILL.md`，开头是 YAML frontmatter（必填 `name`、`description`）。`.claude/commands/deploy.md` 和 `.claude/skills/deploy/SKILL.md` 等价，都会生成 `/deploy`，老的 commands 文件仍然能用。

和"你手动敲命令"最大的不同是：**Claude 会根据 `description` 自动判断该不该用某个 skill**——你不一定要敲 `/`，描述写得好，它会在合适的时机自己调用。

**一个 skill 的最小结构**：

```
.claude/skills/deploy-staging/
  SKILL.md          # 必需：frontmatter + 指令正文
  scripts/          # 可选：可执行脚本（Claude 按需运行）
  references/       # 可选：补充文档（按需加载）
```

```markdown
---
name: deploy-staging
description: 将当前分支部署到 staging 环境。当用户要发布、部署或验证 staging 时使用。
---

1. 运行 `npm run build` 确认构建通过
2. 运行 `npm run test` 确认测试全绿
3. 执行 `git push origin HEAD:staging`
4. 等待 GitHub Actions 部署完成
5. 打开 https://staging.myapp.com 验证
```

**渐进式加载（Progressive Disclosure）**：启动时 Claude 只把每个 skill 的 `name` + `description` 读进系统提示（很省 token）；只有真正用到时才加载完整 `SKILL.md`，引用的 `references/`、`scripts/` 更是用到才读。所以你装一堆 skill 也不会一开始就撑爆上下文。

**发现来源**：用户级 `~/.claude/skills/`、项目级 `.claude/skills/`、插件提供的，以及内置的——Claude Code 会把它们汇总成可用 skill 列表。

> 想看一批"装上就能用"的有趣 skill（grill-me 让 AI 拷问你、caveman 省 75% token…），见 [《让 AI 反过来拷问你：8 个有意思的 Agent Skill》](/zh/guides/interesting-agent-skills)。

### 3. Plugins 与 Marketplace（分发与安装）

skill 不只能自己写，还能**打包分发**。给 skill 文件夹加一个 `.claude-plugin/plugin.json`，它就变成一个**插件**，可以同时打包 skills、subagents、hooks、MCP servers。

插件通过 **Marketplace** 分发——官方市场默认可用，你也能建团队私有市场：

```bash
# 添加一个市场源，然后从中安装插件
/plugin marketplace add <owner/repo>
/plugin install <plugin-name>
```

安装后插件会缓存到 `~/.claude/plugins/cache/`，所有项目通用。这让"把一套工作流分享给全团队"变得和装依赖一样简单。

### 4. Subagents（子智能体）

在 `.claude/agents/` 下可以定义**子智能体**：拥有独立系统提示和工具权限的专职 agent（比如"代码审查员""测试编写员"）。主对话可以把特定任务派发给它们，互不污染上下文。子智能体也能随插件一起分发。

### 5. Hooks — 事件驱动自动化

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

## Cursor：Rules 系统（.mdc）

Cursor 用规则文件定制 AI 行为。**注意格式已经换代**：

> ⚠️ **`.cursorrules` 已废弃**。根目录单个 `.cursorrules` 文件仍能读，但 Cursor 已推荐迁移到 `.cursor/rules/` 目录下的 `.mdc` 文件。最关键的坑：**`.cursorrules` 在 Agent 模式下完全不加载**，而 `.mdc` 在 Chat / Composer / Agent 全模式生效。两者共存时 `.mdc` 还会**静默覆盖** `.cursorrules`。

### .cursor/rules/*.mdc（现行 Project Rules）

每条规则是一个独立的 `.mdc` 文件（Markdown + YAML frontmatter），可按需精准加载：

```
# .cursor/rules/react-components.mdc
---
description: React 组件开发规范
globs: ["src/components/**/*.tsx"]
alwaysApply: false
---

当编写 React 组件时：
1. 导出类型定义（Props interface）
2. 添加 JSDoc 注释说明组件用途
3. 使用函数式组件 + 显式 Props 类型
```

三个 frontmatter 字段决定何时生效，对应四种激活模式：

- **Always**（`alwaysApply: true`）：每次对话都加载
- **Auto Attached**（配 `globs`）：命中文件类型时自动加载
- **Agent Requested**（靠 `description`）：模型按需自取
- **Manual**（`@rule-name`）：手动触发

> 实践建议：5–8 条规则是甜区——1 条常驻基础规则 + 3–4 条按文件类型 auto-attach + 1–2 条手动规则。所有"常驻"规则合计控制在 ~2000 token 以内，避免"上下文税"。

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

### .windsurfrules / .windsurf/rules/

放在项目根目录，类似 Cursor。新版 Windsurf 也支持把规则拆到 `.windsurf/rules/` 目录下分文件管理（`.windsurfrules` 单文件为旧写法）：

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

## AGENTS.md：跨工具的开放标准

前面每个工具都有自己的配置文件（CLAUDE.md、`.cursor/rules/`、`.windsurfrules`……），各写一遍很容易内容打架。**AGENTS.md** 就是为解决这个碎片化而生的开放标准。

- **是什么**：放在仓库根目录的一个普通 Markdown 文件，相当于"写给 AI agent 的 README"——技术栈、构建/测试命令、编码规范、目录结构都写在这。无需任何特殊语法。
- **谁在用**：2025 年 8 月formalized，现由 Linux 基金会下的 Agentic AI Foundation 托管，**40,000+ 开源项目**在用。原生支持的工具包括 **Codex、Cursor、Windsurf、Gemini CLI、GitHub Copilot、Aider、Zed、Jules、Factory、RooCode** 等。
- **monorepo 友好**：可以在子目录放嵌套的 `AGENTS.md`，agent 自动读取**离改动文件最近**的那个。

```markdown
# AGENTS.md

## 技术栈
- Next.js 14 App Router + TypeScript（严格模式）

## 常用命令
- `npm run dev` — 本地开发
- `npm run test` — 提交前必须全绿

## 约定
- 组件用 `.tsx`，禁止 `any`
- API 调用统一走 `/lib/api.ts`
```

> **Claude Code 例外**：目前仍以 `CLAUDE.md` 为主（AGENTS.md 支持在推进中）。推荐做法：**共享规范写进 AGENTS.md 作为单一事实源**，工具特定配置放各自的文件，必要时用 `CLAUDE.md` 引用/软链 AGENTS.md，避免一份规范抄三遍。本站的 `AGENTS.md` 就是这么用的。

---

## 各工具扩展能力对比

| 维度 | Claude Code | Cursor | Cline | Windsurf |
|------|------------|--------|-------|----------|
| **持久化上下文** | ✅ CLAUDE.md | ✅ .cursor/rules | ✅ 自定义指令 | ✅ .windsurf/rules |
| **Agent Skills / 命令** | ✅ 完整 Skills + 插件市场 | ⚠️ Rules 为主 | ⚠️ Workflows | ⚠️ Workflows |
| **事件 Hooks** | ✅ 完整 Hooks | ⚠️ 部分支持 | ❌ | ❌ |
| **Subagents** | ✅ | ❌ | ❌ | ❌ |
| **MCP 支持** | ✅ | ✅ | ✅ 最佳 | ✅ |
| **跨项目记忆** | ⚠️ 靠 skills/插件 | ⚠️ 全局规则 | ❌ | ✅ Memories |
| **AGENTS.md** | ⚠️ 推进中 | ✅ | ⚠️ | ✅ |
| **团队分享** | ✅ 提交 .claude/ + 市场 | ✅ 提交 .cursor/rules | ⚠️ | ✅ 提交规则文件 |

---

## 实践建议

### 入门级（立竿见影）

1. **在每个项目创建 CLAUDE.md 或 .cursorrules**：写清楚技术栈、禁止事项，立刻减少 AI 的"低级错误"
2. **善用 `/commit` 等内置 Skills**：养成习惯，提交质量明显提升

### 进阶级（深度定制）

3. **为常见工作流创建自定义 Skills**：部署、发布、测试流程都可以封装
4. **配置 PreToolUse Hooks**：防止 AI 意外修改关键配置文件

### 团队级（协作规范）

5. **把配置纳入版本控制**：根目录放一份 **AGENTS.md** 作为跨工具单一事实源，再加各工具特定文件（CLAUDE.md / `.cursor/rules/`），团队成员开箱即用
6. **结合 MCP + 插件市场实现深度自动化**：GitHub MCP + CI/CD 可以让 AI 真正参与开发流程，把团队工作流打包成插件一键分发

---

## 总结

| 你的需求 | 推荐工具 & 机制 |
|---------|----------------|
| 深度自动化工作流 | Claude Code Hooks |
| 现成的有趣 skill | [8 个有意思的 Agent Skill](/zh/guides/interesting-agent-skills) |
| 简单项目规范约束 | 任意工具 + AGENTS.md |
| VS Code 深度集成 | Cline + MCP |
| 跨对话记忆 | Windsurf Memories |
| 团队统一规范 | AGENTS.md（+ 工具特定文件）提交到 Git |

选择合适的扩展机制，是把 AI 工具从"偶尔用用"升级到"深度融入工作流"的关键一步。

---

*数据更新于 2026-06-08。各工具功能更新频繁，建议查阅官方文档获取最新信息。*
