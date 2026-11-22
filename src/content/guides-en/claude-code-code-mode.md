---
title: "How to turn on Claude Code's Code Mode, and what auto mode actually checks"
description: "Checked on 2026-11-22. Based on the official Code Mode, permissions, and sandbox pages opened that day: how to enable it, when a session can be resumed, and how auto mode reviews a whole script instead of each tool call. This article did not install or start Claude Code, and did not open a Code Mode session."
date: "2026-11-22"
article_type: howto
tags: [claude-code, code-mode, permissions]
pillar: workflow
content_status: keep
locale_strategy: mirrored
draft: false
faq:
  - q: "Can a repository I clone turn Code Mode on for me?"
    a: |
      No. The official Code Mode page opened on 2026-11-22 says you can set CLAUDE_CODE_EXPERIMENTAL_CODE_MODE to 1 in your shell or in the user settings file ~/.claude/settings.json, but Claude Code ignores this variable in a project's settings files. A repository you clone therefore cannot turn Code Mode on for you. This article did not verify that ignore rule in a real project.
  - q: "Can I use Code Mode through Bedrock or a gateway?"
    a: |
      According to the requirements list opened that day, Code Mode needs a Claude subscription or a Console account. You can't use it through a gateway, Amazon Bedrock, Claude Platform on AWS, Google Cloud's Agent Platform, Microsoft Foundry, or Claude Models on Google Cloud (Anthropic managed). This article did not try those entry points.
  - q: "If I turn on auto mode, does that mean each command is no longer checked?"
    a: |
      No. Auto mode's classifier reviews each piece of code before it runs, not each tool call, and it does not see values computed at run time, such as a path taken from search output. The official page still says your deny and ask rules, and PreToolUse hooks, check each tool call in the code under the tool's usual name, such as Bash or an MCP tool's name. For calls you must control, keep rules or hooks; do not rely on the classifier alone. This article did not run auto mode.
  - q: "Why was the session refused when I tried to resume it?"
    a: |
      The official warning is: to resume a Code Mode session with claude --continue or claude --resume, keep CLAUDE_CODE_EXPERIMENTAL_CODE_MODE set to 1. With Code Mode off, Claude Code refuses to resume the session. Sessions you started without Code Mode resume without Code Mode, even after you later set the variable. This article did not actually resume a session.
---

> Checked on 2026-11-22 (Beijing time). This article is based on Anthropic's official [Code Mode page](https://code.claude.com/docs/en/code-mode) and the [Chinese Code Mode page](https://code.claude.com/docs/zh-CN/code-mode) opened that day, plus [permissions](https://code.claude.com/docs/en/permissions), [permission modes](https://code.claude.com/docs/en/permission-modes), [hooks](https://code.claude.com/docs/en/hooks), [sandboxing](https://code.claude.com/docs/en/sandboxing), [managed settings](https://code.claude.com/docs/en/managed-settings), [environment variables](https://code.claude.com/docs/en/env-vars), and the [changelog](https://code.claude.com/docs/en/changelog). Version notes were checked against the GitHub releases for [v2.1.323](https://github.com/anthropics/claude-code/releases/tag/v2.1.323) and the latest release seen that day, [v2.1.330](https://github.com/anthropics/claude-code/releases/tag/v2.1.330). This article did not install or start Claude Code, did not open a Code Mode session, did not run auto mode, hooks, or the sandbox, and did not call a paid API. Commands, variable names, and limits are taken only from the official docs. This article does not invent flags those pages do not show.

Code Mode changes how Claude uses its tools. Without it, Claude requests one tool at a time, reads the result, and then decides what to do next. With it on, Claude writes a piece of JavaScript, and Claude Code runs that code in your current session. One script can make several tool calls in sequence or in parallel, then return only the output Claude needs to read.

In the conversation you see the tool calls, such as an edit's diff, not the JavaScript. The official page says to press `Ctrl+O` to open the transcript viewer and expand a collapsed Code row if you want to read the code.

The same page says Code Mode is experimental, off by default, and may change or be removed in any release. To send feedback, the docs tell you to run `/feedback`.

This is not a performance review, and it does not argue that you should switch tools. For product comparisons, see [Claude Code vs Cursor](/en/compare/claude-code-vs-cursor/) and [Claude Code vs Codex](/en/compare/claude-code-vs-codex/). For broader notes on permissions and isolation, see [AI coding agent security](/en/guides/ai-coding-agent-security-2026/). The tool overview is at [Claude Code](/en/tool/claude-code/). This article does not change those older pages.

## Check whether you can turn it on

The [Code Mode page](https://code.claude.com/docs/en/code-mode) opened on 2026-11-22 lists the requirements in some detail. An older version starts without Code Mode, with or without the reason `it isn't open to your account yet`. The same page's troubleshooting table lists `it isn't open to your account yet` and `it isn't open to your account in this version` as their own reasons: if your version is older than v2.1.323, update; if you are already on v2.1.323 or later and still see either message, the official advice is to check your network connection and start again, and if the reason stays, try again another day. Seeing those messages is not, by itself, proof that the install is too old. This article did not see those prompts.

According to that page, you need all of the following:

- Claude Code v2.1.323 or later. To use it with agent teams also on, you need v2.1.326 or later. The latest release seen that day was v2.1.330, and the changelog still mentions Code Mode fixes, but that is not proof every fix is present in your install.
- A Claude subscription or a Console account. You can't use Code Mode through a gateway, Amazon Bedrock, Claude Platform on AWS, Google Cloud's Agent Platform, Microsoft Foundry, or Claude Models on Google Cloud (Anthropic managed).
- Your organization does not use the HIPAA configuration or zero data retention.
- The model is Claude Opus 5.5, Sonnet 5.5, Haiku 5.5, or Fable 5.2.
- The surface is an interactive `claude` session in a terminal. The docs say Code Mode does not work with the VS Code panel, the Desktop app, or cloud sessions. The install must be the native build. On Windows, Git for Windows must be installed.
- Some settings also prevent startup, according to the Code Mode page. It still names an API key helper, OpenTelemetry export, and `DISABLE_TELEMETRY`; the [Code Mode doesn't start](https://code.claude.com/docs/en/code-mode#code-mode-doesnt-start) table also lists `it doesn't yet work with an installed mod` for a mod that checks tool calls. This article does not retell that table line by line, and did not walk through it on a live machine.

The [changelog](https://code.claude.com/docs/en/changelog) opened the same day does not treat that list as an unconditional ban on v2.1.329 or later. v2.1.329 says you can turn on Code Mode while OpenTelemetry events and metrics are enabled (each tool call the code makes sends its events), but tracing still keeps it off; it also starts when telemetry, nonessential traffic, or feature flags are turned off, and an administrator can keep it off in managed settings. v2.1.327 says Code Mode no longer refuses to start when an installed mod hooks tool calls; an administrator can still keep it off in managed settings. The two pages disagree. This article did not test which page actually applies, and it does not decide the conflict.

Agent teams have one more display-mode limit: in the default in-process display mode, teammates run in Code Mode; in split panes, they start without it. This article did not observe either display.

## How to turn it on, and how to turn it off

First run `claude --version`. If it is older than v2.1.323, the official instruction is `claude update`. If you are on the `stable` channel and the update does not reach that version, the docs say to wait for `stable` to catch up, or switch to the `latest` channel. This article did not run an update, and it does not recommend changing channels just to chase an experimental feature.

To turn Code Mode on, set the environment variable `CLAUDE_CODE_EXPERIMENTAL_CODE_MODE` to `1`. Set it in your current shell to try a single session. Set it in your user settings if you want it on for every new session.

On macOS, Linux, and WSL, the official launch command is:

```bash
CLAUDE_CODE_EXPERIMENTAL_CODE_MODE=1 claude
```

In Windows PowerShell it is:

```powershell
$env:CLAUDE_CODE_EXPERIMENTAL_CODE_MODE = "1"
claude
```

To store it in user settings, the official example puts this block in `~/.claude/settings.json` and then starts `claude`:

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_CODE_MODE": "1"
  }
}
```

The same page also says Claude Code ignores this variable in a project's settings files, so a repository you clone cannot turn Code Mode on for you.

Before your first session, the official page says Claude Code asks you to confirm. After you choose **Yes, turn on Code Mode**, it restarts and shows this line near the top of the session:

```text
Code Mode (experimental) is on · this session can be resumed only with Code Mode on
```

If you see a different line, or none, use the official troubleshooting page. A successful launch is not by itself proof that Code Mode is on.

To resume that session later with `claude --continue` or `claude --resume`, keep the variable set to `1`. With Code Mode off, the official page says Claude Code refuses to resume it. Sessions you started without Code Mode resume without Code Mode, even after you later set the variable.

To turn it off, remove `CLAUDE_CODE_EXPERIMENTAL_CODE_MODE` from your shell and from `~/.claude/settings.json`, then start a new session. You can also leave the variable in place and change its value to `0` in either location. The official rule is: with a `0` in one place, Code Mode stays off even if you set `1` in the other.

To block it for an organization, put the same variable with the value `0` in [managed settings](https://code.claude.com/docs/en/managed-settings):

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_CODE_MODE": "0"
  }
}
```

The docs add two more points: people already in a Code Mode session stay in it until they exit or restart Claude Code; after that, they cannot resume those sessions while the `0` is in place. Managed settings cannot turn Code Mode on for your users.

## Auto mode reviews the script, not each tool call

This is the change to understand before you turn it on.

According to the [Code Mode page](https://code.claude.com/docs/en/code-mode), in auto mode and in `bypassPermissions` mode, code can run from start to finish without a permission prompt. Some calls still prompt you, such as the [actions no mode auto-approves](https://code.claude.com/docs/en/permission-modes#actions-no-mode-auto-approves).

Each tool call in the code still goes through your `deny` and `ask` [permission rules](https://code.claude.com/docs/en/permissions) and `PreToolUse` [hooks](https://code.claude.com/docs/en/hooks) under the tool's usual name, such as `Bash` or an MCP tool's name.

On top of that, auto mode's classifier reviews each piece of code before it runs, not each tool call. It does not see values computed at run time, such as a path taken from search output. For calls you must control, keep rules or hooks; do not rely on the classifier alone.

The official page also says that if you use a hook to allow or block shell commands, you should inspect each part of the command. In Code Mode, a `git push` run inside a folder named `app` may reach your hook as `cd 'app' && git push`. Bash rules match command text, so with or without Code Mode, Claude can write a denied command in a form the rule does not match. For limits that do not depend on command text, the docs point to the [sandbox](https://code.claude.com/docs/en/sandboxing). These are rules from the documentation, not requests we saw in a live hook.

If you want to read and approve each piece of code before it starts, the official method is an `ask` rule for `REPL`, the tool that runs the code, saved in `~/.claude/settings.json`:

```json
{
  "permissions": {
    "ask": ["REPL"]
  }
}
```

The prompt does not include the code by default. The official instruction is to press `Ctrl+O`, expand the Code row, then return and answer. The same page says that if you approve in auto mode, the code starts even when the classifier would have blocked it, and its project edits and read-only commands then run without a prompt. If Claude reports that the code cannot start a subagent, the documented fix is to remove the rule. This article did not verify the prompt UI for that rule.

Once code is already running, if a tool call shows a permission prompt that is not labeled as coming from a subagent, the official page says: **No** or `Esc` without a comment stops the code, and changes from calls that already finished stay in place; a refusal with a comment refuses that call, and the remaining calls can continue. Again, that is the documented behavior, not a prompt we answered.

Auto mode can also show a countdown prompt. The docs say that after you approve code yourself following repeated classifier blocks, you can be asked about tool calls in that code and in earlier code that is still running. With no IDE connected, the prompt may include a countdown; if it expires, that call is refused, and later calls that would have shown a countdown are refused without a prompt. To see those prompts again, you send Claude a message. Before v2.1.327, you could also be asked about remaining calls in running code after new code had already been allowed by the classifier. This article did not see that countdown on a screen.

## The sandbox does not cover the JavaScript

The [Code Mode page](https://code.claude.com/docs/en/code-mode) says your [sandbox](https://code.claude.com/docs/en/sandboxing) settings apply to the shell commands that the code runs. The JavaScript itself, and its file, web, and MCP tool calls, run outside the sandbox. To isolate those too, the docs tell you to run Claude Code in a container or virtual machine. This article did not test that isolation.

The same page says that if you want a command to stay in the sandbox when the code asks to run it unsandboxed, you should turn on strict sandbox mode. In auto mode, the classifier reviews the code that makes the request, and the command has no separate review.

The [sandbox page](https://code.claude.com/docs/en/sandboxing) itself also says the sandbox covers shell commands only, and that file tools, MCP servers, and hooks run outside it. That matches the boundary on the Code Mode page. Do not read “sandbox is on” as “this JavaScript is inside the sandbox.” The same page says the sandbox runs on macOS, Linux, and WSL2; on native Windows, Claude Code runs commands unsandboxed. To use the sandbox on a Windows machine, the official instruction is to run Claude Code inside a WSL2 distribution.

## Limits you have to accept

Before you turn Code Mode on, the official page asks you to accept these limits:

- You can resume a Code Mode session only in the terminal, with Code Mode still on.
- Auto mode's classifier reviews the code, not each tool call.
- Unless the code can run in the background, you wait for it to finish, and it stops after ten minutes.
- If a `PreToolUse` hook does not finish, for example after a timeout, you may see a tool call refused. The default after a hook failure has changed across versions; use the official troubleshooting page.
- You can't use Remote Control, Claude in Chrome, or computer use.
- You can't move the session to the Desktop app or turn it into a background session, and `/fork` can't start a background copy.

On waiting versus background work: the docs say background code requires you to start in auto mode or `bypassPermissions`, and it can run for up to two hours. If Claude still waits, check your current mode, how you started the session, and whether you passed tool names to `--tools`. From v2.1.328, time you spend at a permission prompt in Manual and `acceptEdits` modes no longer counts toward the ten minutes; earlier versions counted it. This article did not measure those limits.

To stop code while Claude is still responding or waiting, press `Esc`. After the code has moved to the background and Claude has finished its reply, the official instruction is to run `/tasks` in the session, select the running task, and press `x`. After you stop it, check `/tasks` again for subagents, shell commands, or MCP calls that the code started and that are still running.

## What this article did not verify

We only opened the official pages and release notes listed above. We did not install Claude Code, did not set `CLAUDE_CODE_EXPERIMENTAL_CODE_MODE`, did not run `claude`, `claude update`, `claude --continue`, or `claude --resume`, and did not run a real task in auto mode, `bypassPermissions`, the sandbox, hooks, or agent teams. The commands and limits in this article are a document check, not a live test. If the official pages have changed by the time you read this, use the pages as they stand that day.
