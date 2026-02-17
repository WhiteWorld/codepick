---
title: "Trae CN 完全上手指南：国内免费 AI IDE，零成本开始 AI 编程"
description: "字节跳动出品的 Trae CN 完全免费，无需代理，内置豆包、DeepSeek、Kimi K2 等顶级国产模型。本指南从安装到 SOLO 模式实战，手把手带你入门。"
date: "2026-02-17"
tags: ["trae-cn", "国内", "免费", "入门", "字节跳动"]
---

Trae CN 是字节跳动推出的国内版 AI IDE，基于 VS Code，完全免费，无需代理，内置豆包 Seed Code、DeepSeek V3/R1、Kimi K2、GLM-4.5、Qwen3-Coder 等国产顶级编程模型。

对于国内开发者来说，这是目前**零成本入门 AI 编程**的最佳起点。

---

## 前置要求

- Windows 10/11 或 macOS 10.15+
- 手机号（用于注册字节跳动账号）
- 约 15 分钟配置时间

---

## 第一步：下载安装

访问 [trae.cn](https://trae.cn) 下载对应平台的安装包：

- **macOS**：下载 `.dmg` 文件，拖入应用程序文件夹
- **Windows**：下载 `.exe` 安装包，按提示完成安装

> 💡 Trae CN 与国际版 Trae（trae.ai）是独立产品，请确认下载的是 `trae.cn` 版本。

---

## 第二步：登录账号

1. 首次启动后选择主题和语言（推荐**深色主题 + 简体中文**）
2. 点击右上角「登录」，用手机号注册字节跳动账号
3. 登录后即可免费使用全部功能，**无需绑定信用卡**

---

## 第三步：认识主界面

Trae CN 界面与 VS Code 高度一致，主要新增了两个 AI 功能入口：

```
左侧栏
├── 文件资源管理器（同 VS Code）
├── 源代码管理（Git）
└── Trae AI 面板（新增）

右侧/底部
├── AI Chat 窗口     ← 对话式编程
└── SOLO 工作区     ← Agent 自主开发
```

**快捷键：**
- `Cmd/Ctrl + I`：打开 AI Chat 侧边栏
- `Cmd/Ctrl + L`：打开 SOLO 模式

---

## 第四步：选择模型

点击 Chat 窗口顶部的模型选择器，可以切换：

| 模型 | 适合场景 |
|------|----------|
| **豆包 Seed Code** | 日常编程补全、代码生成，字节自研，速度快 |
| **DeepSeek-V3** | 综合能力强，复杂逻辑推理 |
| **DeepSeek-R1** | 数学/算法难题，有推理过程 |
| **Kimi K2** | Agent 任务，长文本理解 |
| **GLM-4.5** | 中文理解，文档生成 |
| **Qwen3-Coder** | 代码专项，多语言支持 |

> 💡 不确定选哪个？日常用 **豆包 Seed Code**，复杂任务换 **DeepSeek-V3**，算法题选 **DeepSeek-R1**。

---

## 第五步：Chat 模式基础用法

Chat 模式适合**边问边改**的交互式工作流：

### 打开已有项目

```bash
# 用 Trae CN 打开项目文件夹
File → Open Folder → 选择你的项目目录
```

### 基础对话示例

在 Chat 输入框中描述需求：

```
帮我写一个 Python FastAPI 接口，接收 POST 请求，参数是 name 和 age，返回 JSON 格式的问候语
```

Trae 会生成代码并提供"插入到文件"或"新建文件"的按钮，一键应用修改。

### 引用文件上下文

在 Chat 中输入 `@` 可以引用：
- `@文件名`：让 AI 读取指定文件
- `@文件夹`：读取整个目录
- `@代码块`：引用当前选中的代码

```
@src/api/user.py 这个接口有什么问题？帮我优化错误处理
```

---

## 第六步：SOLO 模式（Agent 自主开发）

SOLO 是 Trae CN 的核心差异化功能，分两个子模式：

### SOLO Coder：现有项目迭代

适合在已有项目上添加功能、重构代码：

1. 打开项目文件夹
2. 按 `Cmd/Ctrl + L` 进入 SOLO
3. 描述需求，勾选 **Plan** 选项让 AI 先给出执行计划
4. 确认计划后，SOLO 自动执行：读文件 → 写代码 → 运行测试

```
帮我在现有的 Express 项目中添加 JWT 登录认证，包括注册、登录接口和中间件
```

### SOLO Builder：从零构建新项目

适合**从无到有**快速搭建应用：

1. 新建空文件夹，用 Trae 打开
2. 进入 SOLO Builder 模式
3. 描述你的应用：

```
帮我创建一个 React + TypeScript 的待办事项应用：
- 支持添加、删除、标记完成
- 数据存储在 localStorage
- 界面用 Tailwind CSS，暗色主题
```

SOLO Builder 会自动：
1. 生成需求文档（requirements.md）
2. 确定技术栈，安装依赖
3. 逐步生成所有代码文件
4. 启动本地预览

> 💡 Builder 模式支持接入 **Supabase**（数据库）、**Vercel**（部署）、**Stripe**（支付），无需离开 IDE 即可完成全栈应用搭建。

---

## 常见问题

### Q：Trae CN 真的完全免费吗？

是的，目前所有功能和模型调用完全免费，包括 DeepSeek、Kimi K2 等顶级模型。字节跳动的商业化计划尚未公布，建议趁免费期多用。

### Q：代码会被字节跳动保存吗？

Trae CN 会将对话上下文发送至云端处理。如果你的项目涉及商业机密，建议：
- 在设置中关闭「数据收集」选项
- 或改用 [Trae 国际版](/tool/trae) 配合 OpenAI API 自托管

### Q：和 Cursor 相比怎么样？

| 维度 | Trae CN | Cursor |
|------|---------|--------|
| 价格 | 完全免费 | $20/月 |
| 国内可用 | ✅ 直连 | 需代理 |
| 模型质量 | 国产顶级 | 全球顶级 |
| 补全速度 | 快 | 极快 |
| 生态成熟度 | 成长中 | 成熟 |

**结论**：国内用户首选 Trae CN，追求极致编程体验且有代理可选 Cursor。

### Q：VS Code 的插件可以在 Trae CN 里用吗？

可以，Trae CN 基于 VS Code，兼容 `.vsix` 格式的插件，大部分 VS Code 插件可以直接安装使用。

### Q：Trae CN 和国际版 Trae 有什么区别？

| | Trae CN | Trae（国际版） |
|-|---------|--------------|
| 网址 | trae.cn | trae.ai |
| 定价 | 完全免费 | Pro $10/月 |
| 内置模型 | 豆包/DeepSeek/Kimi | Claude/GPT/Gemini |
| 网络 | 国内直连 | 需代理 |

---

## 进阶技巧

### 自定义 AI 行为规则

在项目根目录创建 `.trae/rules.md`（类似 `.cursorrules`），让 AI 了解项目规范：

```markdown
# 项目规范
- 使用 TypeScript，开启严格模式
- 函数注释使用 JSDoc 格式
- 错误处理使用 Result<T, E> 模式
- 提交信息遵循 Conventional Commits
```

### 接入自定义模型

Trae CN 支持自定义模型服务商，可以接入[火山方舟](https://www.volcengine.com/L/s3lNTNYxaEc/)的其他模型：

1. 设置 → 模型服务商 → 添加
2. 填入火山方舟的 Base URL 和 API Key
3. 即可使用方舟上的其他专有模型

---

恭喜！你现在已经掌握了 Trae CN 的核心用法。有问题欢迎在 [GitHub Issues](https://github.com/WhiteWorld/codepick/issues) 反馈。
