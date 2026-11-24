---
title: "升级到 OpenCode 2.4 后，GitHub Copilot 为什么不再读取 GITHUB_TOKEN？"
description: "核查日 2026-11-24。按当天打开的 OpenCode 2.4.0 / 2.4.1 更新说明、Providers、SDK 和相关文档，整理升级后 Copilot 不再读取 GITHUB_TOKEN，以及其他可能打断现有设置的变化。没有安装或登录 OpenCode，也没有实测 Copilot、Automations 或内置浏览器。"
date: "2026-11-24"
article_type: howto
tags: [opencode, upgrade, github-copilot]
pillar: workflow
content_status: keep
locale_strategy: mirrored
draft: false
faq:
  - q: "升级后 Copilot 不能用了，把 GITHUB_TOKEN 再设一次就行吗？"
    a: |
      不行。2026-11-24 打开的 2.4.0 更新说明写明：GitHub Copilot 不再读取 GITHUB_TOKEN，应设置 COPILOT_GITHUB_TOKEN，或改用 OAuth 登录。Providers 页只写了设备 OAuth 流程，没有提到这个环境变量。两种办法本文都没有实测，不能把更新说明写成「COPILOT_GITHUB_TOKEN 在每种环境都能用」的保证，也不能把 Providers 页写成禁止使用该变量。
  - q: "我的插件会不会自己更新？"
    a: |
      要看你怎么写插件来源。写成 name@latest、版本范围（例如 name@^1.2.0）、Git 分支或 Git 的 semver: 范围时，OpenCode 会在启动时以及之后每 24 小时检查，装上较新的匹配版本并重新加载。只写名称、其他标签（例如 @next）或 Git 标签，不会自己更新；Plugins 页写 plugin check 仍会报告它们的更新，plugin update 仍可手动安装。精确版本和提交哈希在 Plugins 页被标为 pinned，该页还写本地插件和精确的包修订在 plugin check / plugin update 时会被跳过；2.4.0 更新说明则把它们和只写名称等一并写成仍可用 plugin update 手动更新。两边表述不完全相同，本文没有跑过插件更新，也不做裁决。
  - q: "不想用 Automations，怎么关掉？"
    a: |
      2.4.0 更新说明写：在配置里设置 "automations": false 即可关掉；日常管理用 /automation。当天打开 https://opencode.ai/docs/automations/ 等文档地址返回 404，没有找到独立说明页。本文没有创建或关闭过 Automations。
  - q: "Desktop 的内置浏览器和 Browse 是一回事吗？"
    a: |
      官方页面是分开写的，没有把它们说成同一个产品。2.4.0 更新说明里的内置浏览器属于 Desktop，使用一份持久的桌面浏览器配置档案（官方原文是 persistent desktop profile）；Browse 页写的是一个 MCP 服务加上 Chromium 扩展，用来操作你正在用的浏览器。导入登录状态后，代理可以读取并操作这份持久配置档案里已登录的页面。这是文档里的行为说明，不是实测结论。Desktop 上「清除浏览数据」现在会先询问。
---

> 核查日：2026-11-24（北京时间）。依据当天打开的官方 [2.4.0 更新说明](https://opencode.ai/changelog/v2.4.0)、[更新说明目录](https://opencode.ai/changelog)、[2.4.1 更新说明](https://opencode.ai/changelog/v2.4.1)、[Providers](https://opencode.ai/docs/providers/)、[SDK](https://opencode.ai/sdk)、[Config](https://opencode.ai/docs/config/)、[Desktop](https://opencode.ai/desktop)、[Browse](https://opencode.ai/product/browse)、[Permissions](https://opencode.ai/docs/permissions/)、[MCP servers](https://opencode.ai/docs/mcp-servers/) 和 [Plugins](https://opencode.ai/docs/plugins/)。本文没有安装或启动 OpenCode，没有登录任何账号，没有实测 GitHub Copilot、Automations、内置浏览器、插件自动更新或 `opencode service set password`，也没有调用付费接口，也没有做运行时安全测试。命令、变量名和限制只引用当天打开的官方页面，不编造未出现的配置项。

升级到 OpenCode 2.4 后，若你一直靠环境变量里的 `GITHUB_TOKEN` 使用 GitHub Copilot，它可能突然不再工作。这不是偶然：2.4.0 更新说明写明，GitHub Copilot 不再读取 `GITHUB_TOKEN`。

这篇是升级核对清单，不是功能介绍，也不把更新说明逐条抄一遍。先处理 Copilot 令牌，再看其他可能打断现有设置、或改变安全边界的变化。工具本身的模型和订阅信息见 [OpenCode 工具页](/zh/tool/opencode/)。权限规则怎么排序、已保存的批准怎样覆盖，见已有的 [OpenCode 2 权限规则排查](/zh/guides/opencode-2-permission-rules/)，本文不重复那篇。

2.4.0 标注发布于 2026-11-23。同一天还有 2.4.1。核对当天在[更新说明目录](https://opencode.ai/changelog)里看到的较新版本是 2.4.1。除了文中单独标明的 2.4.1 修复（例如 macOS 12 无法保存会话），下面关于 2.4.0 的说明并不要求你必须先装上 2.4.1。

## 先处理 GitHub Copilot 的令牌

[2.4.0 更新说明](https://opencode.ai/changelog/v2.4.0)写：「GitHub Copilot no longer reads `GITHUB_TOKEN`. Set `COPILOT_GITHUB_TOKEN` or sign in with OAuth.」同一页的修复说明补充：`GITHUB_TOKEN` 常常被 Git 工具或 GitHub Actions 设置，但并不带 Copilot 权限；现在改为读取 `COPILOT_GITHUB_TOKEN`。

同一天打开的 [Providers](https://opencode.ai/docs/providers/) 页，Copilot 小节写的是设备 OAuth，而不是手动填写 API 密钥。流程是：运行 `/connect`，选择 GitHub Copilot，再选 Login with GitHub Copilot，然后打开 `/models`。企业版需要按提示填写部署地址或域名。故障排除表里，「Copilot has no models」对应的建议是：确认当前 OAuth 账号拥有 Copilot Chat 权限；模型同步失败会记成 `failed to sync GitHub Copilot models`。

这两页存在文档冲突，需要并存，不能由本文裁决：

- 更新说明把 `COPILOT_GITHUB_TOKEN` 和 OAuth 登录并列写出。
- Providers 页详细写了设备 OAuth，**没有提到** `COPILOT_GITHUB_TOKEN`。

不要把更新说明理解成「`COPILOT_GITHUB_TOKEN` 在每种环境都一定可用」的保证，也不要把 Providers 页理解成禁止使用该变量。Providers 页并没有否定这个变量，只是没写。两种办法本文都没有实测。

若升级后 Copilot 没有模型，先按 Providers 页核对：当前登录的是不是有 Copilot Chat 权限的账号，并查看是否出现上述同步失败日志。不要先假定只是令牌名字没改对，也不要先假定必须重装。

## 插件如果写了会跟随的版本，会自己更新

这也是 2.4.0 的升级说明。[Plugins](https://opencode.ai/docs/plugins/) 页写得更细。哪些来源会自己更新，两边一致；精确版本和提交哈希能不能用 `plugin check` / `plugin update` 处理，两边表述并不完全相同，本文不做裁决。

写成 `name@latest`、版本范围（更新说明举的例子是 `name@^1.2.0`；Plugins 页还写了 `name@~1.2.0`、`name@1.x`、`name@>=1.2.0 <2`）、Git 分支，或 Git 的 `semver:` 范围时，OpenCode 会在启动时以及之后每 24 小时检查；若有较新的匹配版本，会安装并重新加载。范围不会超出自己的范围。新版本加载失败时，继续使用并保留原来的版本。

2.4.0 更新说明把只写名称、钉死精确版本、其他标签（例如 `@next`）、Git 标签或提交哈希一并写成**不会**自己更新，并写 `opencode plugin update` 仍可手动更新这类来源。

Plugins 页分得更细：只写名称（`name`）、仓库写法（例如 `github:acme/plugin`）、其他标签（例如 `name@next`）或 Git 标签，不会自己更新，但 `plugin check` 仍会报告它们的更新，`plugin update` 仍可安装更新。精确版本和提交哈希则被标为 pinned（钉死）；同一页还写：本地插件和精确的包修订在 `plugin check` / `plugin update` 时会被跳过（skipped）。

升级前看一下插件列表。若写的是 `@latest`、范围或分支，升级后它可能在你不知情时换到较新版本。这是文档里的行为，不是建议你必须改成钉死版本，也不是对某个插件安全性的判断。本文没有执行 `plugin check` 或 `plugin update`。

## 生图工具改名后，「总是允许」要再批一次

`experimental_image_generate` 已改名为 `generate_image`。2.4.0 更新说明写：带旧名称的权限规则会自动对应到新名称；但已保存的「always allow」（总是允许）批准不会自动对应，所以会再询问一次。

这只说明「会再问一次」，不是说规则全部失效。规则顺序、子代理和已保存批准怎样互相覆盖，仍以 [权限规则排查](/zh/guides/opencode-2-permission-rules/) 和 [Permissions](https://opencode.ai/docs/permissions/) 为准。本文没有在运行中的 OpenCode 里核对这次重问。

## 新的 Automations：先决定要不要开

2.4.0 更新说明把 Automations 写成一项新能力：可以让代理按定时器、cron，或在 MCP 服务推送事件时，运行一段提示词、一段脚本，或一条 shell 命令。用 `/automation` 管理。同一页的详细条目还写：shell 动作在**创建时询问一次批准**，并记录每次运行的退出码和输出。

这会改变安全边界：批准一次之后，这条命令可以按计划反复执行。若你不需要这项能力，更新说明给出的关闭方式是在配置里关闭：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "automations": false
}
```

这是更新说明里的字段，不是从 [Config](https://opencode.ai/docs/config/) 页抄来的示例。核对当天，Config 页没有 Automations 专节；`https://opencode.ai/docs/automations/`、`https://opencode.ai/docs/automation/` 和 `https://opencode.ai/docs/schedules/` 均返回 404，没有找到独立文档页。本文没有创建、批准或关闭过 Automations，也没有验证这个字段在每一种配置来源里的合并结果。

另外，[SDK](https://opencode.ai/sdk) 页在 **v2.3.1**（2026-11-18）的说明里写道：实验性的 schedules 现在改成了 automations，由 `automations` 开关控制（旧的 `schedules` 开关仍可用）；仍在进行或已暂停的普通提示词日程会保留；带条件或运行次数限制的，以及已经结束的，会被丢弃。这条**不在** 2.4.0 更新说明页上。若你是从 2.3.1 之前的版本直接升到 2.4，这条迁移说明可能在 2.3.1 时就已经适用。本文没有核对这个安装里还留着哪些旧日程。

## 内置浏览器会沿用导入的登录状态

2.4.0 更新说明的首条是 Desktop 的内置浏览器：可以从 Chrome、Edge、Firefox 或 Safari 导入登录状态和浏览历史；也可以从 Chromium 浏览器，或 Chrome / Edge 商店添加扩展。这些都放在**一份持久的桌面浏览器配置档案**里（官方原文是 persistent desktop profile）：聊天里的链接会以已登录状态打开，标签页在重启后仍在，代理可以读取并操作这些页面，而不用你再切换应用。

这是文档写明的行为，不是恐吓。导入登录状态，就表示代理能够读取并操作这份持久配置档案里已经登录的页面。官方页面没有另外给出一套缓解措施，本文也不编造。同一份 2.4.0 说明还写：Desktop 上「Clear browsing data」（清除浏览数据）现在会先询问，而不是第一次点击就清掉全部数据。

不要把内置浏览器和 [Browse](https://opencode.ai/product/browse) 混成一个产品。[Desktop](https://opencode.ai/desktop) 页既提到内置浏览器，又另列了 Browse：「Let your agent use your real browser, with your logins and tabs.」Browse 页把自己写成一个 MCP 服务加上 Chromium 扩展，用来操作你正在用的浏览器（列举了 Chrome、Edge、Brave、Arc 等）。两页没有把它们说成同一件事。本文没有打开过 Desktop 内置浏览器，也没有安装或使用 Browse。

## MCP 协议探测：两页说法不一致

2.4.0 更新说明写：MCP 服务会先尝试最新协议；没有设置 `protocol` 的服务会先探测，再回退到旧的握手。若某个服务表现异常，把该服务的 `protocol` 设为 `"legacy"`。

同一天打开的 [MCP servers](https://opencode.ai/docs/mcp-servers/) 页，说法不一样。字段表把 `protocol` 的可选值写成 `legacy`（默认）、`auto` 或 `2026-07-28`。正文写：默认使用经典的 `initialize` 握手；要与 2026-07-28 修订版通信时再设置 `protocol`。对照表里，`legacy` 是默认，发送 `initialize`；`auto` 才会先探测，再在不支持时回退到 `legacy`。另有一条例外：设置了 `pool` 时，未设置的 `protocol` 视为 `auto`。

两页需要并存：

- 不能把 2.4.0 更新说明理解成「所有未设置 `protocol` 的服务现在都一定会先探测」。
- 也不能把 MCP 文档的默认值理解成 2.4.0 的升级说明无效。
- 更新说明里给出的应对是：若某个服务升级后表现异常，为它设置 `protocol: "legacy"`。MCP 文档确认这个字段和这个取值存在，但没有替更新说明裁决默认行为。

本文没有连接或探测任何 MCP 服务。

## 若用过 `opencode service set password`，可检查日志并考虑更换密码

2.4.0 的一则修复是：`opencode service set password` 先前会把密码写进 CLI 日志。若你在更早的版本用过这条命令，升级是理由之一。检查相关日志、并考虑更换那条密码，是本文的建议，不是官方更新说明里给出的操作步骤。

本文没有查看任何人的日志，也不能据此说「每一个旧安装都泄露过密码」。只是文档记录了这个写入日志的问题，并且已经修复。

## 其他升级时可能碰到的变化

这些不一定人人都会遇到，但升级时可能觉得「怎么和以前不一样」。只根据文档转述，本文没有逐项操作验证。

- 终端界面的新外观默认开启，新主题名是 `opencode`。若要沿用以前的配色，在 Theme 里选 `opencode-classic`。这不影响功能，可按喜好选择。
- Desktop 快捷键：`Cmd+Shift+S`（Windows 和 Linux 上是 `Ctrl+Shift+S`）现在会归档当前会话。若你以前用这组快捷键做别的事，行为已经变了。
- 若你在 Code Mode 里调用会话工具：`tools.opencode.session_rename` 和 `session_move` 现为 `tools.opencode.session.rename` 和 `.move`。更新说明写：直接的工具名和权限动作没有改。
- 若你编写 TUI 插件：2.4.0 写 `@opencode/plugin` 需要 `@opentui/core` 和 `@opentui/solid` 0.9.4 或更新。2.4.1 又写：现在从 0.8.0 起也支持，以便上限低于 OpenTUI 0.9 的插件能再次安装。两页都要看，本文不替某个插件选择该用哪个版本。
- 若你用 SDK 嵌入 OpenCode：2.4.0 写插件再次在后台加载，服务端不再等待它们；刚启动时，模型或插件列表可能是空的或不完整。长期运行的客户端应按对应的 `*.updated` 事件刷新；一次性脚本需要在自己这边等待。
- 若你用 Desktop 语音：应用会读取每个语音模型的引擎信息，旧版服务端不提供这项信息，对着升级前的服务端时，语音会显示为不可用。需要配套的新服务端。

另外，若你使用 macOS 12，并且在 2.4.0 之后发现助手消息存不下来：2.4.1 的首条说明是，OpenCode 可以在 macOS 12 自带的较旧 SQLite 上再次保存助手消息。这是 2.4.1 才单独标明的修复，不把全部 2.4.0 说明改写成必须先升到 2.4.1。

### 官方依据（均于 2026-11-24，北京时间核对）

- [2.4.0 更新说明](https://opencode.ai/changelog/v2.4.0)：Copilot 令牌、插件自动更新、生图工具改名、Automations、内置浏览器、MCP 协议升级说明，以及密码写入日志的修复。
- [更新说明目录](https://opencode.ai/changelog) 与 [2.4.1 更新说明](https://opencode.ai/changelog/v2.4.1)：同一天的后续版本；macOS 12 会话保存，以及 TUI 插件对 OpenTUI 0.8.0 的说明。
- [Providers](https://opencode.ai/docs/providers/)：GitHub Copilot 的设备 OAuth 流程和「没有模型」的排查；当天页面未提及 `COPILOT_GITHUB_TOKEN`。
- [SDK](https://opencode.ai/sdk)：schedules 迁到 automations 的说明出现在 v2.3.1 小节，不在 2.4.0 更新说明页。
- [Config](https://opencode.ai/docs/config/)：配置文件位置；当天页面没有 Automations 专节。
- [Desktop](https://opencode.ai/desktop) 与 [Browse](https://opencode.ai/product/browse)：内置浏览器与 Browse 分开表述。
- [Permissions](https://opencode.ai/docs/permissions/)：权限规则与已保存批准；规则顺序问题见站内排查文。
- [MCP servers](https://opencode.ai/docs/mcp-servers/)：`protocol` 字段的取值和默认说明，与 2.4.0 更新说明存在冲突。
- [Plugins](https://opencode.ai/docs/plugins/)：哪些插件来源会自己更新，哪些不会。
