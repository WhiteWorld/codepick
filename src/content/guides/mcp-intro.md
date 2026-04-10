---
title: "MCP 协议入门：让 AI 编程工具连接世界"
description: "深入了解 MCP（Model Context Protocol）协议：它是什么、为什么重要、哪些 AI 编程工具支持它，以及如何为 Cursor、Claude Code、Cline 等工具配置 MCP 服务器。"
date: "2026-03-28"
article_type: "explainer"
tags: ["mcp", "claude-code", "cursor", "cline", "windsurf", "协议", "扩展"]
---

如果你最近在使用 AI 编程工具，很可能看到过"MCP"这个词——但它到底是什么？简单说：**MCP（Model Context Protocol）是让 AI 工具连接外部世界的标准协议**。有了它，你的 AI 助手不再只是"聊天机器人"，而是能直接读数据库、调 API、操作文件系统的真正 Agent。

## MCP 是什么

**Model Context Protocol**（模型上下文协议）是 Anthropic 于 2024 年底开源的通信协议。它定义了 AI 模型与外部工具（数据库、API、文件系统等）之间的标准接口。

类比：如果 AI 模型是大脑，MCP 就是连接大脑和身体各部位的神经系统。

### 核心概念

| 概念 | 说明 |
|------|------|
| **MCP Server** | 提供特定能力的服务端（如 GitHub MCP、数据库 MCP） |
| **MCP Client** | 调用 MCP Server 的 AI 工具（如 Claude Code、Cline） |
| **工具（Tool）** | Server 暴露的可调用函数（如 `search_code`、`query_db`） |
| **资源（Resource）** | Server 提供的上下文数据（如文件内容、数据库 schema） |
| **提示（Prompt）** | Server 预设的提示模板 |

---

## 为什么 MCP 重要

在 MCP 之前，每个 AI 工具都要自己实现与外部服务的集成：Cursor 有自己的 GitHub 集成、Cline 有自己的文件系统操作方式。这带来了几个问题：

1. **重复造轮子**：每个工具都要单独对接同样的服务
2. **体验不一致**：同一个功能在不同工具里的用法完全不同
3. **生态割裂**：开发者无法跨工具复用插件

MCP 通过标准化解决了这些问题。一个 MCP Server 写好后，所有支持 MCP 的工具都能用。

### 典型使用场景

- **GitHub MCP**：让 AI 直接读取 Issues、PR、提交记录，而不只是靠你粘贴
- **数据库 MCP**：让 AI 直接查询 PostgreSQL / SQLite，自动生成迁移脚本
- **Figma MCP**：让 AI 读取设计稿，自动生成对应的 React 组件
- **浏览器 MCP**：让 AI 控制浏览器进行端到端测试
- **文件系统 MCP**：让 AI 安全地读写特定目录下的文件

---

## 哪些工具支持 MCP

| 工具 | MCP 支持 | 配置方式 |
|------|----------|---------|
| **Claude Code** | ✅ 完整支持 | `claude mcp add` 命令或 `~/.claude/settings.json` |
| **Cursor** | ✅ 完整支持 | Settings → MCP 配置面板 |
| **Cline** | ✅ 完整支持 | VS Code 侧边栏 → MCP Servers |
| **Windsurf** | ✅ 完整支持 | Settings → Model Context Protocol |
| **Roo Code** | ✅ 完整支持 | 同 Cline（基于相同架构） |
| **Kiro** | ✅ 支持 | `.kiro/settings/mcp.json` |
| **Copilot** | ⚠️ 部分支持 | 通过 VS Code MCP 扩展 |
| **Gemini CLI** | ⚠️ 实验性 | 命令行参数配置 |
| **Aider** | ❌ 暂不支持 | — |

> Claude Code 和 Cline 对 MCP 的支持最成熟，是目前体验最好的两个选择。

---

## 快速上手：为 Claude Code 配置 MCP

以最常用的 **GitHub MCP** 为例：

### 第一步：安装 MCP Server

```bash
# 安装官方 GitHub MCP Server
npm install -g @modelcontextprotocol/server-github
```

### 第二步：添加到 Claude Code

```bash
claude mcp add github \
  -e GITHUB_PERSONAL_ACCESS_TOKEN=your_token_here \
  -- npx -y @modelcontextprotocol/server-github
```

或者手动编辑配置文件 `~/.claude/settings.json`：

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your_token_here"
      }
    }
  }
}
```

### 第三步：验证

重启 Claude Code，然后：

```
> 列出这个仓库最近 5 个 PR
```

Claude Code 会自动调用 GitHub MCP 工具获取数据，无需你手动粘贴。

---

## 快速上手：为 Cursor 配置 MCP

1. 打开 **Settings（⌘+,）** → 搜索 "MCP"
2. 点击 **"Add MCP Server"**
3. 填入 Server 名称和命令：

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/yourname/projects"
      ]
    }
  }
}
```

---

## 推荐 MCP Servers 清单

### 开发必备

| Server | 功能 | 安装 |
|--------|------|------|
| `@modelcontextprotocol/server-github` | GitHub Issues/PR/代码搜索 | npm |
| `@modelcontextprotocol/server-filesystem` | 安全的文件系统访问 | npm |
| `@modelcontextprotocol/server-postgres` | PostgreSQL 查询 | npm |
| `@modelcontextprotocol/server-sqlite` | SQLite 操作 | npm |

### 效率提升

| Server | 功能 | 安装 |
|--------|------|------|
| `@modelcontextprotocol/server-brave-search` | Brave 网络搜索 | npm |
| `@modelcontextprotocol/server-memory` | 持久化记忆存储 | npm |
| `mcp-server-fetch` | 网页内容抓取 | npm |

### 设计 & 测试

| Server | 功能 | 安装 |
|--------|------|------|
| `figma-mcp` | 读取 Figma 设计稿 | npm |
| `@playwright/mcp` | 浏览器自动化测试 | npm |

---

## 国内使用注意事项

很多 MCP Server 通过 `npx` 安装，需要访问 npm 仓库。国内用户建议：

```bash
# 配置 npm 镜像（临时）
npm install -g @modelcontextprotocol/server-github \
  --registry https://registry.npmmirror.com

# 或者永久设置
npm config set registry https://registry.npmmirror.com
```

另外，部分 MCP Server（如 GitHub）需要访问境外 API，请确保网络环境可以正常请求。

---

## MCP vs 传统插件系统

| 维度 | MCP | 传统插件 |
|------|-----|---------|
| **跨工具复用** | ✅ 写一次，所有工具用 | ❌ 每个工具单独开发 |
| **标准化** | ✅ 统一的通信协议 | ❌ 各自实现 |
| **安全性** | ✅ 权限隔离 | ⚠️ 依赖实现 |
| **生态成熟度** | ⚠️ 2024 年底才出现 | ✅ 成熟稳定 |
| **开发难度** | 中等（需要了解协议） | 低（文档完善） |

---

## 总结

MCP 是 AI 编程工具生态的一次重要标准化尝试。对于普通开发者，最值得尝试的组合是：

- **Claude Code + GitHub MCP**：直接在终端理解代码库历史和 Issue 上下文
- **Cursor/Cline + 数据库 MCP**：让 AI 直接读取 schema，自动写迁移脚本
- **任意工具 + 文件系统 MCP**：精确控制 AI 能访问哪些目录

随着生态完善，MCP Servers 的数量已超过 1000 个。挑几个和你工作流最相关的，效率提升会非常明显。

---

*数据更新于 2026-03-28。MCP 生态发展迅速，建议查阅 [官方文档](https://modelcontextprotocol.io) 获取最新 Server 列表。*
