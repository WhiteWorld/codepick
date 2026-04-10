---
title: "switch-ai: One Command to Switch AI API Configs — No More Manual Env Vars"
description: "Introducing switch-ai, a CLI tool for instantly switching between multiple AI API configurations (Anthropic, OpenAI, and more) using YAML profiles."
date: "2026-03-02"
article_type: "howto"
tags: ["switch-ai", "CLI", "API", "environment-variables", "tools"]
draft: false
---

If you juggle multiple AI API services — Anthropic, OpenAI, Volcengine Ark, various relay providers — you know the pain of manually exporting environment variables every time you switch.

[**switch-ai**](https://github.com/WhiteWorld/switch-ai) is a lightweight CLI tool built to solve exactly that. It manages multiple API configurations in a single YAML file and lets you switch between them with one command.

## The Problem It Solves

As a power user of AI coding tools, you might have:

- An official Anthropic API key
- A Volcengine Ark Coding Plan (using Anthropic-compatible endpoints)
- A relay provider key
- An internal API from your company

Every switch means running `export ANTHROPIC_BASE_URL=xxx`, `export ANTHROPIC_AUTH_TOKEN=xxx`… and it's easy to lose track of which config is currently active. switch-ai lets you define all your configs in one YAML file and switch with a single command.

## Dependencies

switch-ai requires just two common CLI tools:

- **yq** — YAML parser (supports both the Go version and the pip version, auto-detected)
- **fzf** — Fuzzy finder for interactive selection

```bash
# macOS
brew install yq fzf

# Ubuntu/Debian
sudo apt install fzf
pip install yq
```

## Installation

```bash
# 1. Create directories
mkdir -p ~/.local/lib ~/.config/ai-keys

# 2. Clone the repo
git clone https://github.com/WhiteWorld/switch-ai.git /tmp/switch-ai

# 3. Copy files
cp /tmp/switch-ai/switch-ai.sh ~/.local/lib/
cp /tmp/switch-ai/profiles.yaml ~/.config/ai-keys/

# 4. Restrict config file permissions (contains API keys)
chmod 600 ~/.config/ai-keys/profiles.yaml

# 5. Add to ~/.zshrc or ~/.bashrc
source ~/.local/lib/switch-ai.sh
alias ai='switch_ai'
```

Restart your terminal or run `source ~/.zshrc` to activate.

## Configuring API Profiles

Edit `~/.config/ai-keys/profiles.yaml` and add your API configurations:

```yaml
# Official Anthropic
anthropic:
  ANTHROPIC_BASE_URL: https://api.anthropic.com
  ANTHROPIC_AUTH_TOKEN: sk-ant-xxxxx

# Volcengine Ark Coding Plan
ark:
  ANTHROPIC_BASE_URL: https://ark.cn-beijing.volces.com/api/coding
  ANTHROPIC_AUTH_TOKEN: your-ark-token
  ANTHROPIC_MODEL: ark-code-latest

# A relay provider
relay:
  ANTHROPIC_BASE_URL: https://relay.example.com/api
  ANTHROPIC_AUTH_TOKEN: your-relay-token
```

Each top-level key is a profile name, and the keys beneath it are the environment variables to set. You can define any variable names — it's not limited to Anthropic; OpenAI's `OPENAI_API_KEY` works just as well.

## Usage

switch-ai provides 4 commands, simple and intuitive:

### `ai` — Interactive Selection

Just type `ai` and a fzf fuzzy search menu appears, letting you pick from your configured profiles:

```
$ ai
> anthropic
  ark
  relay
```

Select one and it takes effect immediately — your current shell's environment variables are set to the chosen profile's values.

### `ai <profile>` — Direct Switch

If you already know which profile you want:

```bash
ai ark        # Switch to Volcengine Ark
ai anthropic  # Switch back to official Anthropic
```

### `ai show` — View Current Config

Displays the currently active AI-related environment variables (keys are automatically masked, showing only the first 8 characters):

```
$ ai show
ANTHROPIC_BASE_URL = https://ark.cn-beijing.volces.com/api/coding
ANTHROPIC_AUTH_TOKEN = abcd1234...********
ANTHROPIC_MODEL = ark-code-latest
```

### `ai clear` — Clear All Config

Remove all AI-related environment variables in one shot:

```bash
ai clear
```

## Real-World Use Cases

### Use Case 1: Claude Code Users Switching API Sources

If you're using Claude Code (CLI), just run `ai ark` to switch to Ark, then launch `claude` as usual. Want to switch back to official Anthropic? `ai anthropic` — that's it.

### Use Case 2: Testing Different Models During Development

When building AI applications and comparing models:

```bash
ai ark          # Test with Ark's Doubao model first
python test.py

ai anthropic    # Then test with official Claude
python test.py
```

### Use Case 3: Work/Personal Account Switching

Use the company-provided API at work, switch to your personal one after hours:

```bash
ai work     # Start of day
ai personal # End of day
```

## Technical Highlights

- **Pure Shell implementation** — Zero compilation dependencies, works in both Bash and Zsh
- **Dual yq compatibility** — Automatically detects Go and pip versions of yq
- **Key masking** — `ai show` displays only the first 8 characters of sensitive values
- **Dynamic variable detection** — Reads variable names from YAML automatically, no hardcoding needed
- **Permission security** — Config file recommended at 600 permissions to protect API keys

## Summary

switch-ai is a minimal but practical tool, especially useful for developers who work with multiple AI API services simultaneously. Instead of manually exporting a bunch of variables each time, spend 2 minutes setting up switch-ai and handle everything with a single `ai` command going forward.

Project repository: [github.com/WhiteWorld/switch-ai](https://github.com/WhiteWorld/switch-ai)
