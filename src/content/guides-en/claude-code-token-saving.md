---
title: "Claude Code Token Saving: The Complete Guide"
description: "A dedicated token-saving guide for Claude Code users: when to use /compact vs /clear, how to write an effective CLAUDE.md, precise file referencing, task decomposition, and the 5 most common token-wasting mistakes to avoid."
date: "2026-03-29"
article_type: "explainer"
tags: ["claude-code", "token", "cost", "efficiency", "CLAUDE.md", "compact"]
draft: false
---

Claude Code is a pay-as-you-go AI coding tool — every time it reads a file, writes code, or runs a search, you're consuming tokens and spending money. The good news: experienced users and beginners often have a **3–5× difference** in token consumption for the same task.

This guide is dedicated to Claude Code specifically. Here's everything you need to know.

---

## First: What Does Claude Code Actually Send?

When you type a message in Claude Code, the model receives far more than just your words:

```
Actual request = CLAUDE.md contents
               + full conversation history (from the very start)
               + files you explicitly @ referenced
               + files Claude Code reads automatically
               + tool call results (search output, command results, etc.)
               + your current message
```

**Conversation history** and **file contents** are the two biggest variables — and where you have the most control.

---

## Core Tool #1: `/compact` and `/clear`

These two conversation management commands are unique to Claude Code. Use them well and you'll save a significant amount of tokens.

### `/compact` — Compress Conversation History

When you run `/compact`, Claude Code **summarizes the entire conversation history into a compact digest**, replacing the full record. Future requests carry the summary instead of dozens of complete exchanges.

**When to use it**:
- A task is mostly done but you need to continue in the same conversation
- The conversation has hit 30–40+ turns and responses feel slower
- You're moving to a sub-task but want to keep some context

**What to expect**: A typical `/compact` can reduce conversation history from 20,000+ tokens down to 2,000–3,000 tokens.

```bash
# Type directly in the Claude Code input:
/compact
```

### `/clear` — Start Fresh

`/clear` **wipes the conversation history entirely**. Your next request starts with only your CLAUDE.md as background context.

**When to use it**:
- The current task is completely done and you're starting something unrelated
- The conversation has gone off the rails (AI producing strange output)
- You just want a clean slate

**Choosing between `/compact` and `/clear`**:

| Situation | Recommendation |
|-----------|---------------|
| Feature not done yet, but conversation is too long | `/compact` |
| Bug fixed, moving on to something else | `/clear` |
| AI seems confused, output doesn't make sense | `/clear` |
| Want to keep the "we're working on project X" backdrop | `/compact` |

---

## Core Tool #2: Writing an Effective `CLAUDE.md`

`CLAUDE.md` is a project context file that Claude Code reads automatically at the start of every conversation. Write it well and you'll never need to re-explain your project setup again.

### What to include

```markdown
# Project Overview
Astro 5 + TypeScript static site deployed on Vercel.
Package manager: pnpm. Node version: 20+.

# Key Directory Structure
- data/tools/*.yaml    Tool data files
- src/lib/data.ts      Data loading and type definitions
- src/page-views/      Page template components

# Coding Standards
- TypeScript: no `any`, prefer `interface` over `type`
- Styles: TailwindCSS only, no inline `style` attributes
- Naming: files in kebab-case, functions in camelCase

# Common Commands
- npm run dev          Start dev server
- npm run build        Build (verify after every change)
```

### What NOT to include

The contents of `CLAUDE.md` are **sent with every single conversation**. Writing too much here becomes its own token burden.

- ❌ Don't paste large code examples (reference specific files when needed)
- ❌ Don't include frequently-changing content (like "currently working on feature X")
- ❌ Don't exceed ~500 lines — beyond that, the file itself becomes expensive
- ✅ Do include stable context that you need in every conversation

---

## Precise File References — Don't "Explore Everything First"

When you ask Claude Code to read a file, it costs tokens: a 300-line TypeScript file consumes roughly 1,500–2,000 tokens.

### Wrong habit → Right habit

**❌ Ask AI to scan the whole project first**:
> "Take a look at what's in the src/ directory, then help me…"

This causes Claude Code to read dozens of files, consuming huge amounts of tokens — most of which have nothing to do with your actual task.

**✅ Tell it exactly which file to look at**:
> "Check `src/lib/data.ts` lines 45–80 — the type definition there looks wrong"

**✅ If you're not sure where something is, ask it to search first**:
> "Search for `getAllTools` in the src/ directory, then help me modify the definition"

This way Claude Code runs a targeted search, then reads only that one function — not the entire directory.

### Reading large files in sections

If you need to work with a large file, ask Claude Code to focus on the relevant section:

> "Read the scoring display section of `src/page-views/ToolDetailPage.astro` — it's around lines 100–180"

---

## Task Decomposition: One Task, One Conversation

This is the most overlooked habit, and often the one with the biggest impact.

**The wrong way**:

```
Conversation 1 (running for 2+ hours):
  - Fixed 3 bugs
  - Added 1 new feature
  - Refactored 2 components
  - Now adjusting styles...
```

By this point, the conversation history alone is 10,000+ tokens, and every new request has to carry all of it.

**The right way**: one independent task per conversation.

```
Conversation 1: Fix login bug              (done → /clear)
Conversation 2: Add search feature         (done → /clear)
Conversation 3: Refactor ToolCard          (done → /clear)
Conversation 4: Adjust homepage styles
```

Each conversation stays "clean" — only the context actually needed for that task.

---

## Using `--limit` to Set a Token Budget

Claude Code supports a `--limit` flag that caps token usage for a session. When you hit the limit, it stops and prompts you:

```bash
claude --limit 10000
```

This is particularly useful when you're still learning. It forces you to think about "does this task really need this many tokens?" and prevents accidentally kicking off a runaway agent task that burns through 50,000 tokens.

---

## The 5 Most Common Token-Wasting Mistakes

### Mistake 1: Asking the AI to confirm repeatedly

> "Are you sure this is right?" "Can you double-check?" "Just confirm you understood my intent"

Each confirmation is a round-trip that costs tokens but produces no code. **Fix**: Write clear instructions upfront. Trust the output. Only follow up when you have a genuine concern.

### Mistake 2: Pasting the entire stack trace

When something errors, the instinct is to paste everything. A full Node.js stack trace can be 200+ lines. **Fix**: Paste only the key error and the nearest 10–15 lines of the call stack:

```
# ❌ 200 lines of stack trace

# ✅ Just the important part:
Error: Cannot read properties of undefined (reading 'slug')
  at ToolDetailPage.astro:47
  at renderPage (astro/src/runtime/server/render/page.ts:89)
```

### Mistake 3: Iterate instead of specifying upfront

> "Write me a component" → (output) → "Actually make it X" → (output) → "Add Y to it" → ...

Each output cycle consumes tokens. **Fix**: Describe your requirements completely the first time — including styling, interactions, and edge cases. One complete pass beats three back-and-forth cycles.

### Mistake 4: Mixing unrelated tasks in the same conversation

Fixed a bug in the morning, now want to ask something completely unrelated in the same conversation. **Fix**: Run `/clear` and start fresh, or open a new Claude Code session entirely.

### Mistake 5: Ignoring Agent mode's hidden costs

Claude Code's Agent mode (letting it autonomously complete multi-step tasks) is powerful, but every tool call stuffs its result back into the context. An agent task like "refactor this whole module" might execute 30+ file reads and commands internally, consuming 5–10× more tokens than a regular conversation.

**Fix**: Use Agent mode for tasks with clear, tight boundaries ("change all `var` to `const` in this file"), not for vague, open-ended ones ("optimize this project").

---

## External Tools: RTK and ccusage

### RTK — Compress Claude Code's Command Output

When Claude Code runs Bash commands (especially in Agent mode), the raw output goes directly into the context window. A `npm test` run can produce thousands of tokens, but the AI only needs the failing test names and error messages.

[RTK (Rust Token Killer)](https://github.com/rtk-ai/rtk) is a CLI proxy that compresses command output before it enters the context:

```bash
# Install (macOS/Linux)
curl -fsSL https://install.rtk-ai.app | sh

# Enable in Claude Code
claude --rtk
```

**How RTK compresses**:
- Aggregates repeated log lines (`Error: timeout` appearing 100 times → shown once with a count)
- Filters build banners, progress bars, and template noise
- Preserves structural output, drops implementation details

Benchmarks: `cargo test` (262 tests): 4,823 tokens → 11 tokens; large `git diff`: 21,500 → 1,259 tokens. **Average savings: 60–90%** — most effective in Agent mode with heavy command execution.

---

### ccusage — See Where You're Spending

Claude Code saves every session to local JSONL log files. ccusage reads those logs and shows you exactly what you've spent:

```bash
# Daily/monthly overview
npx ccusage

# Day-by-day breakdown
npx ccusage daily

# Most expensive sessions
npx ccusage session --top 10
```

If you're new to Claude Code, run ccusage for a week to see which task types burn the most tokens — then adjust your workflow accordingly.

> GitHub: [github.com/ryoppippi/ccusage](https://github.com/ryoppippi/ccusage)

---

## Reference: Token Consumption by Task Type

| Task Type | Typical Token Range | Notes |
|-----------|--------------------|----|
| Simple question | 500–1,000 | Normal |
| Small bug fix (1 file) | 1,000–3,000 | Normal |
| Adding a feature (2–3 files) | 3,000–8,000 | Watch task scope |
| Refactoring a module (5+ files) | 10,000–30,000 | Split into multiple conversations |
| Agent completing a complex task | 20,000–100,000+ | Use `--limit`, stay specific |

---

## Summary: Token-Saving Priorities for Claude Code

In order of impact — the habits most worth building:

1. **Run `/clear` when a task is done** (conversation history is the biggest hidden cost)
2. **Write a solid `CLAUDE.md`** so you never repeat project context in conversation
3. **Reference files precisely** — don't let Claude Code explore the whole project
4. **One task per conversation** — never mix unrelated work
5. **Use `/compact` for long conversations** rather than letting them grow forever
6. **Set `--limit` in Agent mode** to prevent runaway consumption

Lock in these 6 habits and most Claude Code users will see a 40–60% reduction in token costs.
