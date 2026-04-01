---
title: "AI 编程工作流必备：VS Code 高频插件精选"
description: "配合 Cursor、Cline、Claude Code 使用的高频 VS Code 插件，覆盖 Git 历史、代码质量、API 调试、可读性增强，帮你构建完整的 AI 辅助开发工作流。"
date: "2026-04-01"
tags: ["vscode", "cursor", "cline", "工作流", "插件", "git", "效率"]
draft: false
---

AI 编程工具解决了「写代码」的问题，但一个完整的开发工作流还需要更多配套。本文整理了与 Cursor、Cline、Claude Code 等 AI 工具搭配效果最好的 VS Code 插件，按使用场景分类，附上与 AI 工具联动的具体技巧。

> 本文适用于 VS Code 本体，同样适用于基于 VS Code Fork 的 Cursor、Windsurf、Trae 等 AI IDE。

---

## 一、Git 类：让 AI 理解代码历史

### GitLens

**安装**：`ext install eamodio.gitlens`

GitLens 是 VS Code 生态里最成熟的 Git 增强插件。核心功能：

- **行内 Blame**：光标停在任意一行，右侧显示该行最后一次提交的作者、时间、commit message
- **文件历史**：右键 → "Open File History" 查看当前文件的完整修改记录
- **提交对比**：任意两个 commit 之间的 diff 可视化

**与 AI 工具的联动技巧**：

在对话框里描述问题时，可以把 GitLens 的 blame 信息一起粘贴给 AI：

```
这段代码（commit a3f2c1，2026-01-15，作者 @xiaoming）在重构后出现了 bug，
具体表现是……请帮我分析原因。
```

AI 有了时间线上下文后，定位问题的准确率会显著提升。

### Git Graph

**安装**：`ext install mhutchie.git-graph`

把 git log 渲染成可视化的分支树。在 feature branch 多、merge 频繁的项目里，比命令行 git log --graph 直观很多。点击任意 commit 节点可以查看完整 diff。

---

## 二、代码质量类：让 AI 的输出更可靠

### Error Lens

**安装**：`ext install usernamehw.errorlens`

默认的 VS Code 错误提示需要鼠标悬停才能看到完整信息。Error Lens 把 ESLint、TypeScript 等所有诊断信息直接渲染到对应代码行的右侧，无需离开键盘就能看到所有错误。

**与 AI 工具的联动技巧**：

当 AI 生成的代码有 TypeScript 报错时，直接截图（包含 Error Lens 的行内提示）粘贴给 AI，比文字描述更精确。Cline 和 Cursor 都支持图片输入。

### ESLint + Prettier

**安装**：`ext install dbaeumer.vscode-eslint` + `ext install esbenp.prettier-vscode`

这两个插件几乎是前端/Node.js 项目的标配。关键配置：在 `.vscode/settings.json` 开启保存时自动修复：

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

**与 AI 工具的联动技巧**：

在项目的 `CLAUDE.md`（Claude Code）或 `.cursorrules`（Cursor）中注明：

```
代码风格遵循项目根目录的 .eslintrc 和 .prettierrc，生成代码无需手动格式化，
保存时会自动格式化。
```

这样 AI 生成的代码落地后会立即被 Prettier 格式化，不用再让 AI 重新整理风格。

---

## 三、API 调试类：替代 Postman 的轻量方案

### REST Client

**安装**：`ext install humao.rest-client`

REST Client 让你在 `.http` 或 `.rest` 文件里直接写 HTTP 请求，点击 "Send Request" 发送，响应结果显示在右侧面板。无需打开浏览器或切换到 Postman，全程不离开 VS Code。

示例文件 `api-test.http`：

```http
### 获取用户列表
GET https://api.example.com/users
Authorization: Bearer {{token}}
Content-Type: application/json

### 创建用户
POST https://api.example.com/users
Content-Type: application/json

{
  "name": "张三",
  "email": "zhangsan@example.com"
}
```

**与 AI 工具的联动技巧**：

这是和 AI 配合最顺滑的 API 调试方式。你可以直接让 AI 生成 `.http` 测试文件：

```
我的 FastAPI 项目有以下接口定义（粘贴代码），
请帮我生成对应的 REST Client 测试文件，覆盖正常和异常场景。
```

AI 生成的 `.http` 文件可以直接在 VS Code 里执行，比来回切换 Postman 省很多时间。

### Thunder Client

**安装**：`ext install rangav.vscode-thunder-client`

如果你更习惯 GUI 操作，Thunder Client 是 VS Code 内嵌的轻量 Postman，支持请求集合、环境变量、测试断言。相比 REST Client 更直观，相比 Postman 更轻量。

---

## 四、可读性增强类：提升代码导航效率

### Todo Tree

**安装**：`ext install gruntfuggly.todo-tree`

扫描整个项目的 `TODO`、`FIXME`、`HACK` 注释，在侧边栏生成可点击的任务列表。

**与 AI 工具的联动技巧**：

定期把 Todo Tree 列出的未完成项粘贴给 AI：

```
当前项目有以下未完成项（来自 Todo Tree），请按优先级排序并建议实现方案：
- TODO: 添加用户权限校验（auth.ts:45）
- FIXME: 分页查询在数据量大时性能差（user.service.ts:112）
```

### indent-rainbow

**安装**：`ext install oderwat.indent-rainbow`

用彩色高亮不同缩进层级。在 Python、YAML、深度嵌套的 JSON 里导航时非常有用，减少看错缩进层次导致的 bug。

### Better Comments

**安装**：`ext install aaron-bond.better-comments`

给注释添加语义颜色：`!` 红色警告、`?` 蓝色疑问、`TODO` 橙色待办、`*` 绿色重要。让代码里的注释在视觉上有优先级区分，AI 生成注释时也可以使用这些约定。

---

## 五、终端增强类

### ShellCheck（针对 Shell 脚本）

**安装**：`ext install timonwong.shellcheck`（需要系统安装 shellcheck）

对 `.sh` 脚本进行静态检查，报告语法错误和常见的 Shell 编程陷阱。在 DevOps 场景下，AI 生成的 Shell 脚本有时会有微妙的可移植性问题，ShellCheck 能及时发现。

---

## 六、插件组合推荐

根据你的主力工具场景，推荐以下组合：

**Cursor / Windsurf 用户（VS Code Fork IDE）**

核心：GitLens + Error Lens + REST Client + Todo Tree

**Cline / Roo Code 用户（VS Code 插件）**

核心：GitLens + Error Lens + REST Client + ESLint + Prettier

> REST Client 和 Cline 配合尤其顺滑：让 Cline 直接修改 `.http` 测试文件，然后你在 VS Code 里一键执行验证结果。

**Claude Code / Aider 用户（终端 CLI）**

核心：GitLens + Error Lens + ShellCheck + Todo Tree

> CLI 工具生成代码后你需要在 VS Code 里审查，Error Lens 和 GitLens 让这个审查过程更高效。

---

## 总结

| 插件 | 场景 | 与 AI 的联动价值 |
|------|------|----------------|
| GitLens | Git 历史 | 提供时间线上下文，帮 AI 定位 regression |
| Error Lens | 代码质量 | 截图直接给 AI 修复，无需文字转述 |
| REST Client | API 调试 | 让 AI 直接生成可执行的 `.http` 测试文件 |
| ESLint + Prettier | 代码风格 | 配合 CLAUDE.md / .cursorrules 免除 AI 手动格式化 |
| Todo Tree | 任务管理 | 批量给 AI 分配待办任务 |
| ShellCheck | Shell 脚本 | 及时发现 AI 生成脚本的可移植性问题 |

这些插件都不需要额外订阅，安装即用，和 AI 编程工具形成完整的工作流闭环。
