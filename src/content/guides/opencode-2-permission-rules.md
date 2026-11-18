---
title: "OpenCode 2 的权限规则为什么没生效？"
description: "按配置来源、规则顺序、子代理和 policies 四步排查。给出可校验的 V2 示例，也讲清外部目录默认行为和插件不受进程沙箱保护的边界。"
date: "2026-11-18"
article_type: howto
tags: [opencode, permissions, security, workflow]
pillar: workflow
content_status: keep
locale_strategy: mirrored
draft: true
---

> 审阅稿。核查日：2026-11-18（北京时间）。依据当天 V2 官方文档和公开 JSON Schema；做了离线结构检查，没有启动 OpenCode、调用模型或实测拦截效果。

你在项目里写了「推送前询问」，它却没问；主代理不许改文件，子代理却仍能改。先别加十条重复规则。**先确定读了哪些配置、最后匹配的是哪条、实际动作由哪个代理执行。**

这篇是权限排查指南，不是系统沙箱教程。工具本身的模型和订阅信息见 [OpenCode 工具页](/zh/tool/opencode/)。

## 先分清三套规则

[Config](https://opencode.ai/docs/config/)、[Permissions](https://opencode.ai/docs/permissions/) 和 [Policies](https://opencode.ai/docs/policies/) 不能合并成一句「项目配置优先」。

| 要查什么 | 官方规则 | 常见误判 |
| --- | --- | --- |
| 普通配置值 | 用户全局与项目文件合并，系统配置更高，macOS 受管配置最高 | 以为改最近的项目文件一定能覆盖系统值 |
| `permissions` | 有序匹配，最后匹配生效；共享规则后再追加代理自己的规则 | 以为更具体的模式自动赢，或子代理继承主代理的禁令 |
| `policies` | 同文件最后匹配；跨来源按管理权限排序，较广的来源反而更强 | 以为仓库里的 `allow` 能解开全局或组织的限制 |

### 1. 找齐来源，不只看当前目录

对普通配置，OpenCode 从当前目录往文件系统根目录找：先把直接的 `opencode.json(c)` 按由远到近合并，再把 `.opencode/opencode.json(c)` 按由远到近合并。因此，找到的 `.opencode` 文件会覆盖直接文件里的普通同名设置，不只是「离我最近的那个文件赢」。用户全局文件是 `~/.config/opencode/opencode.json(c)`；Linux 系统目录是 `/etc/opencode`。

这不等于项目能覆盖系统或受管设置，也不要把这张普通配置加载图直接套到策略上。

`policies` 的来源优先级从高到低是：**macOS MDM → 系统 → 已连接的 Console 工作区 → 用户全局 → 直接项目配置 → `.opencode` 配置**。后两类各自又是外层目录高于内层。Console 策略变更约在下一次抓取时生效，通常约一分钟；断开连接会清掉该连接的策略，暂时不可达则保留上次策略。

排查时列出实际启动目录、系统 / 全局 / 祖先目录配置、当前 Console 工作区。不要公开带有密钥的整份配置。

### 2. 看最后匹配，不看「谁更具体」

原生 V2 的字段是 `permissions`，动作名是 `shell`、`subagent`。V1 的 `permission`、`bash`、`task` 不要和 V2 示例随意混拼。[迁移指南](https://opencode.ai/docs/migrate-v1/)说支持的 V1 配置仍会规范化加载，不是所有旧字段都要立刻删除；原生 V2 值和旧形式设同一值时，有效的原生值优先。

一条权限规则需要三个字符串：`action`、`resource`、`effect`。`effect` 可取 `allow`、`deny`、`ask`。

- 同时匹配两条，最后一条赢。把宽泛规则放前面，例外放后面；没有「具体程度」加权。
- 通配符 `*` 可以匹配斜杠，`?` 匹配一个字符，不要当成 Git 的路径通配语义。
- shell 模式末尾的 ` *` 也匹配不带参数的命令。例如 `git push *` 也匹配 `git push`。
- 一次操作检查多个资源时：有一个 `deny` 就拒绝；否则有一个 `ask` 就询问；全部允许才放行。
- 「没有规则匹配时询问」不等于「默认全部询问」。每个代理的基础规则先允许 `*`；`.env`、`.env.*` 读取再设为询问，`.env.example` 允许。

## 一份可逐条解释的起点，不是完整安全策略

放进项目的 `opencode.json`，或合并到已有 `opencode.jsonc`；先备份，不要直接覆盖其他配置：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "permissions": [
    { "action": "shell", "resource": "*", "effect": "ask" },
    { "action": "shell", "resource": "git status --short", "effect": "allow" },
    { "action": "shell", "resource": "git --no-pager diff --no-ext-diff --no-textconv", "effect": "allow" },
    { "action": "shell", "resource": "git push *", "effect": "deny" },
    { "action": "external_directory", "resource": "*", "effect": "ask" }
  ],
  "agents": {
    "reviewer": {
      "description": "Review without edit or shell tools",
      "mode": "subagent",
      "permissions": [
        { "action": "edit", "resource": "*", "effect": "deny" },
        { "action": "shell", "resource": "*", "effect": "deny" }
      ]
    }
  }
}
```

这份配置想表达的是：shell 通常先问；两个固定的 Git 检查命令不问；匹配到的 `git push` 拒绝；项目外路径先问；`reviewer` 子代理追加拒绝 `edit` 和 `shell`。

这里刻意没有用 `git diff *` 自动放行任意参数。Git 的 `--output` 能写文件，外部 diff / textconv 也可能运行程序；固定命令使用 `--no-ext-diff --no-textconv`，缩小放行范围，**仍不保证宿主 Git 配置或整个进程只读**。其他参数版本会落回询问，不要为了省事全部点「总是允许」。Git 参数的依据见 [git diff 文档](https://git-scm.com/docs/git-diff)。

这也不是「从此无法推送」：绝对路径调用 Git、包装脚本、其他工具或网络通路不一定匹配 `git push *`。它们可能落回询问；不要批准不理解的命令。需要强制断网或文件隔离时，要另做操作系统 / 容器层面的限制。

### 3. 外部目录和子代理，单独查

官方把 active Location 与其非根项目 worktree 之外的路径先交给 `external_directory`，再查 `read` / `edit`。**外部目录默认允许**，不是默认弹窗；上面的 `ask` 是显式补上的。

`read`、`edit`、`external_directory` 的 `~` 和 `$HOME` 前缀会展开；shell 的资源是原始命令文本，不会这样展开。shell 只会尽力推断命令涉及的目录，不是文件系统边界。

代理自己的规则追加在共享规则后。自定义子代理使用它自己的权限，不是主代理权限的子集。因此：

- 主代理拒绝编辑，不代表 `reviewer` 自动继承这一条。
- 例子给 `reviewer` 单独加了 `edit` 与 `shell` 拒绝，避免只改了主代理。
- 这仍不是「所有方式都不能写文件」的证明。MCP 工具、插件及其他动作也要单独审查，不能靠一条 `edit` 规则代表全部副作用。

## 真要强制限制，用 policies；但不要写 ask

下面是另一份配置片段。需要组织约束时，把相应策略部署在合适的高权限来源，而不是指望仓库文件能约束所有人：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "policies": [
    { "action": "tool.use", "resource": "shell:git push *", "effect": "deny" }
  ]
}
```

它匹配的是 `tool.use` 的 `动作:资源`，在普通权限与已保存批准之后再检查。匹配到拒绝时，不弹询问，而是类似 `Blocked by configuration policy` 的错误；Console 策略会标出工作区名称。

`policies` 的 `effect` **只有 `allow` / `deny`，没有 `ask`**。一个 `allow` 只会解除此前较宽的策略拒绝，仍要回到代理权限判断，不会直接授权。没有匹配的策略默认允许继续走原有检查。

已保存的「Allow always」是项目级持久允许规则，不会覆盖已配置的 `deny`。如果似乎绕过禁令，先查是否根本没匹配到、禁令被后续规则覆盖，或当前执行的是另一个代理 / 动作。

### 4. JSON 能解析，不代表策略真的加载了

Policies 文档明确写：**校验失败的语句会被丢弃，服务端日志会警告，其余列表继续生效。** 所以改完拒绝规则要看日志，不能只检查括号配平。

核查当天，Permissions 页 Scanner 小节还出现了 `policies` 内嵌 `permissions` 的示例；它与公开 schema 及 Policies 页的三字段语句结构不一致。本文不采用那个嵌套形状，也没有验证运行时是否有兼容处理。遇到类似冲突，先对照所用版本、[公开 schema](https://opencode.ai/config.json)和日志，别把网页示例当成执行结果。

升级前还要查版本：

- 早于 **2.2.3** 的客户端会忽略 `integration.connect`、新语义的 `integration.use`、`mcp.use`、`skill.use`、`plugin.use`。
- 早于 **2.2.6** 的客户端会忽略 `websearch.use`。
- 旧的 `integration.use` 加 `mcp:` / `skill:` / `plugin:` 前缀会转换到对应新动作；现在裸 `integration.use: *` 限制的是集成来源，不能当成「禁用全部 MCP、技能、插件」。

如果目的是禁用这三类，当前文档的原生形状是：

```json
{
  "policies": [
    { "action": "mcp.use", "resource": "*", "effect": "deny" },
    { "action": "skill.use", "resource": "*", "effect": "deny" },
    { "action": "plugin.use", "resource": "*", "effect": "deny" }
  ]
}
```

这是独立的严格示例，会禁用所有对应能力，不建议无差别加进每个项目。先确认自己确实不需要它们。

## 最后一道边界：这些配置不隔离插件进程

官方明确说，policies **不对插件代码做沙箱隔离**。例如禁用某 provider，是在正常 provider / model 路径上阻止使用，不是让插件从此没有联网能力。shell 也仍以宿主用户的文件、进程、网络权限运行。

只加载信任的插件与 MCP 服务；陌生仓库先看配置和启动命令，不要靠一段 JSON 接受运行不信任代码。本文没有验证某个插件或 MCP 服务的行为。

## 无需真实推送的验收清单

先在隔离目录里准备假仓库和假文件；不要拿真实 `.env`、SSH 文件或生产目录试拦截。

| 检查项 | 按文档应检查的结果，不是本文实测 |
| --- | --- |
| 主代理两个固定 Git 命令 | 应匹配精确允许；加新参数不一定匹配 |
| 规范形式 `git push`、`git push origin main` | 应匹配示例拒绝；不要为验收实际发起推送 |
| 外部假目录 | 应先走 `external_directory`；还要看后续规则是否覆盖 |
| `reviewer` 的 edit / shell 动作 | 应匹配它自己的拒绝，不只看主代理 |
| 保存过批准后再加 deny | 配置拒绝不应被旧批准解开 |
| 非法策略字段或 `ask` | 检查 schema 报错和服务端警告，别以为已执行 |

本文只做了公开 schema 校验、JSON 示例一致性检查，以及隔离假仓库中的 Git 参数检查。没有启动 OpenCode，也没有测试真实权限执行、扫描器解析、Console 同步或插件隔离。运行时验收若需要模型、付费请求或真实账号，先取得相应授权，不能把离线检查写成「实测安全」。

### 官方依据（均于 2026-11-18，北京时间核对）

- [Config](https://opencode.ai/docs/config/)：配置位置、普通值的合并顺序、系统与受管配置。
- [Permissions](https://opencode.ai/docs/permissions/)：匹配、默认值、目录、子代理、保存批准与宿主权限。
- [Policies](https://opencode.ai/docs/policies/)：管理来源顺序、非法语句警告、版本门槛与插件边界。
- [公开 JSON Schema](https://opencode.ai/config.json)：本文示例字段和结构的离线校验依据，不证明运行时效果。
- [Migrate from V1](https://opencode.ai/docs/migrate-v1/)：旧配置兼容和原生 V2 值优先。
- [git diff](https://git-scm.com/docs/git-diff)：`--output`、`--no-ext-diff`、`--no-textconv` 的含义。
