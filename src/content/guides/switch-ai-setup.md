---
title: "switch-ai：一条命令切换 AI API 配置，告别手动改环境变量"
description: "介绍 switch-ai 命令行小工具，支持在 Anthropic、OpenAI 等多个 AI 服务间一键切换 API 配置，开发者多账号管理利器。"
date: "2026-03-02"
article_type: "howto"
tags: ["switch-ai", "CLI", "API", "环境变量", "工具"]
---

如果你同时使用多个 AI API 服务（Anthropic、OpenAI、火山方舟、各种中转站……），每次切换都要手动改环境变量，是不是很烦？

[**switch-ai**](https://github.com/WhiteWorld/switch-ai) 就是为了解决这个痛点而生的命令行小工具——用 YAML 管理多组 API 配置，一条命令即可在不同服务间无缝切换。

## 它解决什么问题？

作为 AI 编程工具的重度用户，你可能同时拥有：

- 官方 Anthropic API Key
- 火山方舟 Coding Plan（走 Anthropic 兼容接口）
- 某个中转站的 Key
- 公司提供的内部 API

每次切换都要 `export ANTHROPIC_BASE_URL=xxx`、`export ANTHROPIC_AUTH_TOKEN=xxx`……改完还容易忘记自己当前用的是哪个。switch-ai 让你把所有配置写进一个 YAML 文件，然后一条命令搞定切换。

## 依赖

switch-ai 只需要两个常见的命令行工具：

- **yq** — YAML 解析器（支持 Go 版和 pip 版，自动检测）
- **fzf** — 模糊搜索选择器（用于交互式选择配置）

```bash
# macOS
brew install yq fzf

# Ubuntu/Debian
sudo apt install fzf
pip install yq
```

## 安装

```bash
# 1. 创建目录
mkdir -p ~/.local/lib ~/.config/ai-keys

# 2. 克隆仓库
git clone https://github.com/WhiteWorld/switch-ai.git /tmp/switch-ai

# 3. 复制文件
cp /tmp/switch-ai/switch-ai.sh ~/.local/lib/
cp /tmp/switch-ai/profiles.yaml ~/.config/ai-keys/

# 4. 设置配置文件权限（含 API Key，务必限制）
chmod 600 ~/.config/ai-keys/profiles.yaml

# 5. 在 ~/.zshrc 或 ~/.bashrc 中添加
source ~/.local/lib/switch-ai.sh
alias ai='switch_ai'
```

重新打开终端或 `source ~/.zshrc` 即可。

## 配置 API Profiles

编辑 `~/.config/ai-keys/profiles.yaml`，按以下格式添加你的 API 配置：

```yaml
# 官方 Anthropic
anthropic:
  ANTHROPIC_BASE_URL: https://api.anthropic.com
  ANTHROPIC_AUTH_TOKEN: sk-ant-xxxxx

# 火山方舟 Coding Plan
ark:
  ANTHROPIC_BASE_URL: https://ark.cn-beijing.volces.com/api/coding
  ANTHROPIC_AUTH_TOKEN: your-ark-token
  ANTHROPIC_MODEL: ark-code-latest

# 某中转站
relay:
  ANTHROPIC_BASE_URL: https://relay.example.com/api
  ANTHROPIC_AUTH_TOKEN: your-relay-token
```

每个顶层 key 就是一个 profile 名称，下面列出该 profile 需要设置的环境变量。你可以自由定义任意环境变量名——不局限于 Anthropic，OpenAI 的 `OPENAI_API_KEY` 等也完全支持。

## 使用方法

switch-ai 提供 4 个命令，简单直观：

### `ai` — 交互式选择

直接输入 `ai`，会弹出 fzf 模糊搜索菜单，从已配置的 profiles 中选一个激活：

```
$ ai
> anthropic
  ark
  relay
```

选中后立即生效，当前 shell 的环境变量会被设置为对应 profile 的值。

### `ai <profile>` — 直接切换

如果你知道要切哪个，直接指定名称：

```bash
ai ark        # 切换到火山方舟
ai anthropic  # 切回官方 Anthropic
```

### `ai show` — 查看当前配置

显示当前生效的 AI 相关环境变量（Key 会自动脱敏，只显示前 8 位）：

```
$ ai show
ANTHROPIC_BASE_URL = https://ark.cn-beijing.volces.com/api/coding
ANTHROPIC_AUTH_TOKEN = abcd1234...********
ANTHROPIC_MODEL = ark-code-latest
```

### `ai clear` — 清除所有配置

一键清除所有 AI 相关的环境变量：

```bash
ai clear
```

## 实际使用场景

### 场景一：Claude Code 用户切换 API 源

如果你在用 Claude Code（CLI），只需 `ai ark` 切到方舟，然后正常启动 `claude` 即可。想切回官方？`ai anthropic`，就这么简单。

### 场景二：开发测试不同模型

做 AI 应用开发时，需要对比不同模型的效果：

```bash
ai ark          # 先测方舟的 Doubao 模型
python test.py

ai anthropic    # 再测 Claude 官方
python test.py
```

### 场景三：公司/个人账号切换

上班用公司提供的 API，下班切回自己的：

```bash
ai work     # 上班
ai personal # 下班
```

## 技术亮点

- **纯 Shell 实现**——零编译依赖，Bash/Zsh 通用
- **yq 双版本兼容**——自动检测 Go 版和 pip 版 yq，不挑环境
- **Key 脱敏显示**——`ai show` 只展示前 8 位，防止泄露
- **动态变量检测**——从 YAML 中自动读取变量名，无需硬编码
- **权限安全**——配置文件建议 600 权限，API Key 不外泄

## 总结

switch-ai 是一个极简但实用的小工具，特别适合同时使用多个 AI API 服务的开发者。与其每次手动 export 一堆变量，不如花 2 分钟配好 switch-ai，之后一条 `ai` 命令搞定一切。

项目地址：[github.com/WhiteWorld/switch-ai](https://github.com/WhiteWorld/switch-ai)
