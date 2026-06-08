---
title: "AI Coding Tool Skills & Extension Systems: Claude Code, Cursor, Cline Complete Guide"
description: "A deep dive into AI coding tool extension capabilities: Claude Code's Agent Skills / Hooks / Plugins, Cursor's .mdc Rules, the cross-tool AGENTS.md standard, and how to build your own AI-powered workflow."
date: "2026-06-08"
article_type: "explainer"
tags: ["skills", "claude-code", "cursor", "cline", "hooks", "agents-md", "plugins", "customization", "workflow"]
pillar: workflow
content_status: keep
locale_strategy: mirrored
draft: false
---

AI coding tools aren't just "smarter autocomplete." Modern tools offer rich extension mechanisms that let you deeply customize AI behavior — from automating repetitive tasks to enforcing team coding standards. This guide walks you through the skills and extension systems of the major AI coding tools.

## Why Extension Mechanisms Matter

A default AI assistant is like a highly capable intern who knows nothing about your specific project, team standards, or workflow. Extension mechanisms solve this:

- **Persistent context**: No need to re-explain project background every conversation
- **Automate repetitive tasks**: `/commit` to create a well-formatted commit message without writing it yourself
- **Constrain AI behavior**: Enforce specific frameworks, prevent AI from modifying certain files
- **Team collaboration**: Encode best practices into shareable config files

---

## Claude Code: Skills + Hooks System

Claude Code is one of the most extensible CLI tools available, offering three layers of customization.

### 1. CLAUDE.md — Persistent Context

Create a `CLAUDE.md` file in your project root. Claude Code reads it automatically on every launch:

```markdown
# MyProject Overview

## Tech Stack
- Next.js 14 App Router
- TypeScript (strict mode)
- Prisma + PostgreSQL

## Coding Standards
- Components must use `.tsx` extension
- No `any` types allowed
- All API calls go through the unified client in `/lib/api.ts`

## Common Commands
- `npm run dev` — local development
- `npm run test` — run tests (required before every commit)
```

**Good candidates for CLAUDE.md**:
- Project tech stack overview
- Coding standards and prohibited patterns
- Quick reference for common commands
- Key directory structure notes

### 2. Agent Skills

> **The concept has been upgraded.** The old "slash commands" and today's **Agent Skills** have merged. A skill is **a folder** containing a `SKILL.md` that opens with YAML frontmatter (required: `name`, `description`). `.claude/commands/deploy.md` and `.claude/skills/deploy/SKILL.md` are equivalent — both create `/deploy` — and existing `commands/` files keep working.

The biggest difference from "you type the command" is this: **Claude decides on its own whether to use a skill, based on its `description`.** You don't necessarily type `/` — with a good description, it invokes the skill at the right moment.

**Minimal structure of a skill:**

```
.claude/skills/deploy-staging/
  SKILL.md          # required: frontmatter + instructions
  scripts/          # optional: executable scripts (run on demand)
  references/       # optional: supporting docs (loaded on demand)
```

```markdown
---
name: deploy-staging
description: Deploy the current branch to staging. Use when the user wants to release, deploy, or verify staging.
---

1. Run `npm run build` to verify the build passes
2. Run `npm run test` to verify all tests pass
3. Execute `git push origin HEAD:staging`
4. Wait for GitHub Actions deployment to complete
5. Open https://staging.myapp.com to verify
```

**Progressive disclosure:** at startup Claude loads only each skill's `name` + `description` into the system prompt (very token-cheap); the full `SKILL.md` loads only when the skill is actually used, and referenced `references/` / `scripts/` load only when needed. So installing many skills won't blow up your context up front.

**Discovery sources:** user-level `~/.claude/skills/`, project-level `.claude/skills/`, plugin-provided, and built-in — Claude Code merges them into the available-skills list.

> Want a batch of fun, ready-to-use skills (grill-me makes the AI interrogate you, caveman cuts 75% of tokens…)? See [Make the AI Grill You: 8 Genuinely Interesting Agent Skills](/en/guides/interesting-agent-skills).

### 3. Plugins & Marketplaces (distribution & install)

Skills aren't only something you write — they can be **packaged and distributed**. Add a `.claude-plugin/plugin.json` to a skill folder and it becomes a **plugin**, which can bundle skills, subagents, hooks, and MCP servers together.

Plugins are distributed through **Marketplaces** — the official one is available by default, and you can create a private team marketplace:

```bash
# Add a marketplace source, then install a plugin from it
/plugin marketplace add <owner/repo>
/plugin install <plugin-name>
```

Once installed, a plugin is cached to `~/.claude/plugins/cache/` and works across all your projects. That makes "share a whole workflow with the team" as easy as installing a dependency.

### 4. Subagents

Under `.claude/agents/` you can define **subagents**: dedicated agents with their own system prompt and tool permissions (e.g. a "code reviewer" or "test writer"). The main conversation can delegate specific tasks to them without polluting its own context. Subagents can also ship inside plugins.

### 5. Hooks — Event-Driven Automation

Hooks are the most powerful mechanism: automatically execute scripts when specific events occur.

Configure in `~/.claude/settings.json`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'command executed' >> ~/.claude/activity.log"
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

**Common Hook scenarios**:

| Event | Use Case |
|-------|----------|
| `PreToolUse` | Auto-backup files before modification; block changes to production config |
| `PostToolUse` | Log every Bash execution |
| `Stop` | Automatically run lint checks when a conversation ends |
| `Notification` | Send a desktop notification when Claude needs input |

---

## Cursor: Rules System (.mdc)

Cursor uses rule files to customize AI behavior. **Note the format has changed generations:**

> ⚠️ **`.cursorrules` is deprecated.** The single root-level `.cursorrules` file still works, but Cursor now recommends migrating to `.mdc` files under `.cursor/rules/`. The critical catch: **`.cursorrules` is not loaded at all in Agent mode**, whereas `.mdc` works in Chat / Composer / Agent. When both coexist, `.mdc` also **silently overrides** `.cursorrules`.

### .cursor/rules/*.mdc (current Project Rules)

Each rule is a separate `.mdc` file (Markdown + YAML frontmatter), loaded precisely on demand:

```
# .cursor/rules/react-components.mdc
---
description: React component development standards
globs: ["src/components/**/*.tsx"]
alwaysApply: false
---

When writing React components:
1. Export type definitions (Props interface)
2. Add JSDoc comments explaining the component's purpose
3. Use functional components with explicit Props types
```

Three frontmatter fields drive when a rule fires, mapping to four activation modes:

- **Always** (`alwaysApply: true`): loaded in every conversation
- **Auto Attached** (with `globs`): loaded automatically when matching files are touched
- **Agent Requested** (via `description`): the model pulls it in when relevant
- **Manual** (`@rule-name`): triggered by hand

> Rule of thumb: 5–8 rules is the sweet spot — 1 always-on base rule + 3–4 auto-attached by file type + 1–2 manual rules. Keep all "always apply" rules combined under ~2,000 tokens to avoid the "token tax."

---

## Cline: Custom Instructions + MCP

Cline's extension system has two layers:

### 1. Custom Instructions

In VS Code's Cline settings, you can configure:

- **System Prompt Appended**: Content added to the end of the system prompt
- **Task Preamble**: Instructions automatically sent at the start of each task

```
# Example system prompt addition
You are helping develop an e-commerce platform.

Technical constraints:
- Backend API is FastAPI-based, don't generate Django code
- Database migrations must be managed through Alembic
- All user input must be validated with Pydantic

Security constraints:
- Never hardcode any secrets or passwords in code
- API endpoints must verify user permissions
```

### 2. MCP Integration (see MCP Introduction Guide)

Cline has the most complete MCP support of any tool — you can manage MCP Servers directly from the VS Code sidebar without manually editing config files.

---

## Windsurf: Memories + Rules

Windsurf combines a rules system with AI memory capabilities:

### .windsurfrules / .windsurf/rules/

Placed in your project root, similar to Cursor. Newer Windsurf also supports splitting rules into separate files under a `.windsurf/rules/` directory (the single `.windsurfrules` file is the legacy form):

```
Project: SaaS Admin Dashboard
Framework: Vue 3 + Vite + Element Plus

Coding standards:
- Use Composition API with `<script setup>` syntax
- State management: Pinia
- Icons: Element Plus icon library only, no other icon packages

File organization:
- Page components go in src/views/
- Reusable components go in src/components/
- All API calls managed in src/api/
```

### Cascade Memories

Windsurf's Cascade AI can remember important information across conversations. When the AI discovers valuable information, it asks whether to save it as a memory:

> "I noticed you prefer async/await over .then() chains — would you like me to save this preference?"

---

## AGENTS.md: The Cross-Tool Open Standard

Every tool above has its own config file (CLAUDE.md, `.cursor/rules/`, `.windsurfrules`…), and writing the same thing into each one is a recipe for conflicting instructions. **AGENTS.md** exists to fix exactly that fragmentation.

- **What it is**: a plain Markdown file in your repo root — a "README for AI agents." Tech stack, build/test commands, coding standards, directory layout all go here. No special syntax required.
- **Who uses it**: formalized in August 2025, now stewarded by the Agentic AI Foundation under the Linux Foundation, with **40,000+ open-source projects** on board. Tools with native support include **Codex, Cursor, Windsurf, Gemini CLI, GitHub Copilot, Aider, Zed, Jules, Factory, RooCode** and more.
- **Monorepo-friendly**: drop nested `AGENTS.md` files in subdirectories, and agents automatically read **the closest one** to the file being edited.

```markdown
# AGENTS.md

## Tech Stack
- Next.js 14 App Router + TypeScript (strict mode)

## Common Commands
- `npm run dev` — local development
- `npm run test` — must be green before every commit

## Conventions
- Components use `.tsx`; no `any`
- All API calls go through `/lib/api.ts`
```

> **Claude Code is the exception**: it still leads with `CLAUDE.md` (AGENTS.md support is in progress). Recommended approach: **put shared standards in AGENTS.md as the single source of truth**, keep tool-specific config in each tool's own file, and have `CLAUDE.md` reference/symlink AGENTS.md where needed — so you never copy the same rules three times. This very site's `AGENTS.md` works exactly that way.

---

## Extension Capability Comparison

| Dimension | Claude Code | Cursor | Cline | Windsurf |
|-----------|-------------|--------|-------|----------|
| **Persistent context** | ✅ CLAUDE.md | ✅ .cursor/rules | ✅ Custom instructions | ✅ .windsurf/rules |
| **Agent Skills / commands** | ✅ Full Skills + plugin marketplace | ⚠️ Rules-centric | ⚠️ Workflows | ⚠️ Workflows |
| **Event hooks** | ✅ Full Hooks | ⚠️ Partial | ❌ | ❌ |
| **Subagents** | ✅ | ❌ | ❌ | ❌ |
| **MCP support** | ✅ | ✅ | ✅ Best | ✅ |
| **Cross-session memory** | ⚠️ Via skills/plugins | ⚠️ Global rules | ❌ | ✅ Memories |
| **AGENTS.md** | ⚠️ In progress | ✅ | ⚠️ | ✅ |
| **Team sharing** | ✅ Commit .claude/ + marketplace | ✅ Commit .cursor/rules | ⚠️ | ✅ Commit rule files |

---

## Practical Recommendations

### Beginner Level (Immediate Impact)

1. **Create CLAUDE.md or .cursorrules in every project**: Document the tech stack and prohibited patterns — immediately reduces AI "rookie mistakes"
2. **Use built-in Skills like `/commit`**: Build the habit, commit quality improves noticeably

### Intermediate Level (Deep Customization)

3. **Create custom Skills for common workflows**: Deployment, releases, and testing flows can all be encapsulated
4. **Configure PreToolUse Hooks**: Prevent AI from accidentally modifying critical config files

### Team Level (Collaborative Standards)

5. **Commit your config to version control**: keep one root **AGENTS.md** as the cross-tool single source of truth, plus tool-specific files (CLAUDE.md / `.cursor/rules/`), so teammates get it out of the box
6. **Combine MCP + the plugin marketplace for deep automation**: GitHub MCP + CI/CD lets AI genuinely participate in the pipeline, and you can package a team workflow into a plugin for one-command sharing

---

## Summary

| Your Need | Recommended Tool & Mechanism |
|-----------|------------------------------|
| Deep workflow automation | Claude Code Hooks |
| Ready-made fun skills | [8 Interesting Agent Skills](/en/guides/interesting-agent-skills) |
| Simple project standards | Any tool + AGENTS.md |
| Deep VS Code integration | Cline + MCP |
| Cross-session memory | Windsurf Memories |
| Unified team standards | AGENTS.md (+ tool-specific files) in Git |

Choosing the right extension mechanisms is the key step to upgrading AI tools from "occasional use" to "deeply integrated into your workflow."

---

*Data current as of 2026-06-08. Tool features update frequently; consult official documentation for the latest information.*
