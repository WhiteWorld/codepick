---
title: "Make the AI Grill You: 8 Genuinely Interesting Agent Skills"
description: "A tour of the fun, useful Agent Skills in the Claude Code / Codex ecosystem — grill-me makes the AI interrogate your design, caveman cuts 75% of tokens, handoff writes a one-shot handoff doc, zoom-out helps you grok unfamiliar code, and more. Includes 30-second install."
date: "2026-06-08"
article_type: "explainer"
tags: ["skills", "claude-code", "agent-skills", "grill-me", "workflow", "productivity"]
pillar: workflow
content_status: keep
locale_strategy: mirrored
draft: false
---

Most people still picture AI coding tools as "write my code for me." But once **Agent Skills** arrived, the game changed: you can now hand the AI a whole personality and workflow — make it interrogate *your* plan, talk in telegraphic shorthand to save tokens, write a handoff doc in one shot, turn the current conversation straight into a PRD…

This article isn't about the mechanics (for that, see the [Skills & Extension Systems guide](/en/guides/ai-tool-skills-extensions) at the end). It's a curated tour of skills that are **genuinely fun and immediately useful**. The examples come mainly from [Matt Pocock's open-source skill library](https://github.com/mattpocock/skills), which installs onto Claude Code, Codex, and other agents.

## First: why skills are interesting

Unlike a slash command you type by hand, a modern Agent Skill is a folder with a `SKILL.md` file. It opens with a `description`, and **the AI decides on its own when to use it** based on context. That means:

- You don't memorize commands — just say "grill me" and the right skill fires
- A single skill can completely change how the AI **talks and works**, not just how it completes code
- Once installed it works across projects, and you can share it with your team

The eight below were picked for that "wait, you can make the AI do *that*?" feeling.

---

## 1. 🔥 grill-me — make the AI interrogate you

**The most counterintuitive one.** Normally you question the AI. This skill flips it: the AI **grills your plan**, one question at a time.

Say "grill me" and it breaks your design into a decision tree, asking **one question at a time** to force you to think every branch through. For each question it **offers its own recommended answer first**, and anything it can answer by reading your codebase, it researches itself instead of bugging you.

> Great for: pressure-testing a plan or PRD *before* you commit to it, surfacing the holes you hadn't thought through. Far more reliable than reasoning in your own head.

There's also a variant, **grill-with-docs**, which grills you against your project's glossary and existing docs — updating `CONTEXT.md` and architecture decision records (ADRs) as you go.

## 2. 🪨 caveman — "caveman mode," 75% fewer tokens

In a word: make the AI **talk like a telegram**. Drop the pleasantries, articles, and preamble — keep only the substance, cutting token usage by roughly **75%**.

Triggering is loose — "caveman mode," "be brief," or `/caveman` all work; "normal mode" restores it. Nicely, it automatically reverts to full clarity for **security warnings, destructive-action confirmations, and multi-step instructions**, so brevity never drops anything critical.

> Great for: long sessions and tight iteration loops — real savings on usage-based tools.

## 3. 🤝 handoff — a handoff doc in one command

Context nearly full, or switching sessions / handing off to someone else? Type `handoff` and it distills the conversation into a **handoff document** — what was done, where it stands, what to focus on next — so a fresh agent can pick up seamlessly.

The details are thoughtful: the doc is saved to the OS temp directory (no clutter in your workspace), **existing artifacts are referenced by path rather than re-pasted**, and sensitive info is **redacted** automatically.

> Great for: multi-day tasks, team handoffs, and "saving your progress" before the context window fills up.

## 4. 🔭 zoom-out — go up a level and grok unfamiliar code

The pain of inheriting an unfamiliar project is missing the forest for the trees. `zoom-out` deliberately **goes up a layer of abstraction**, using the project's own domain vocabulary to map the relevant modules and their callers — what this chunk of code actually does in the bigger system.

> Great for: onboarding to a new project, reading someone else's module, building global context before you change anything.

## 5. 🐛 diagnose — a structured method for "heisenbug" hell

For bugs that come and go for no obvious reason, flailing is the worst thing you can do. `diagnose` breaks debugging into a **six-phase loop**: build a reliable pass/fail signal → reproduce reliably → hypothesize → instrument → fix with a regression test → clean up and post-mortem.

Its core idea: **a fast, deterministic pass/fail feedback loop is the foundation of effective debugging.**

> Great for: performance regressions, intermittent failures, the hard bugs you've been staring at for hours.

## 6. 🧪 prototype — throwaway code, but keep the conclusion

Want to validate a data model or state machine, or can't decide between a few UI options? `prototype` spins up a **throwaway** prototype: either a runnable terminal app to test logic and state, or several **toggleable UI variations** on one route for side-by-side comparison.

The best part — before the code gets deleted, it **durably captures the conclusion** (which option won, and why), so you never waste the experiment.

> Great for: tech-stack decisions, interaction comparisons, the "let me just try it" exploration phase.

## 7. 📋 to-prd / to-issues — turn the chat straight into specs

You talked the requirements through — now how do you write them up? `to-prd` synthesizes the **current conversation** into a PRD: instead of re-interviewing you, it explores the codebase, defines test seams, fills a template, and ships it to your issue tracker with a "ready-for-agent" label.

The companion **to-issues** (and **triage**) splits a conversation into individual issues and runs them through a state machine — needs-triage → needs-info → ready-for-agent / ready-for-human.

> Great for: turning a brainstorm into executable tasks, or prepping ready-to-claim work for an AFK agent.

## 8. 🪆 write-a-skill — use a skill to write a skill

A bit recursive, but very practical. When you want to crystallize some repeated chore into your own skill, `write-a-skill` walks you **through the whole process**: gather requirements → draft the `SKILL.md` → polish it against best practices like progressive disclosure and trigger-friendly descriptions → review it with you.

> Great for: writing your first skill when you don't know where to start, or encoding your team's best practices into a shareable capability.

---

## Install them in 30 seconds

These skills ship through the `skills.sh` installer and are **not limited to Claude Code** (Codex and others work too):

```bash
# 1. Run the installer; pick which skills and which agents you want
npx skills@latest add mattpocock/skills

# 2. Be sure to select the setup skill, then run it once inside your agent:
/setup-matt-pocock-skills
```

The setup step asks which issue tracker you use (GitHub / Linear / local files), which labels you apply when triaging, and where to save docs. Once configured, `/grill-me`, `/caveman`, `/diagnose` and the rest are ready to go.

> Want to write your own? Use **write-a-skill** above, or read the official [Agent Skills docs](https://code.claude.com/docs/en/skills). `SKILL.md` follows a cross-tool open standard — write it once, and multiple tools recognize it.

---

## Recap

| Skill | One-liner | When to reach for it |
|-------|-----------|----------------------|
| **grill-me** | The AI interrogates your plan | Pressure-test before you commit |
| **caveman** | Telegraphic, ~75% fewer tokens | Long sessions, saving money |
| **handoff** | One-command handoff doc | Switching sessions / people |
| **zoom-out** | Go up a level, see the whole | Onboarding to unfamiliar code |
| **diagnose** | Six-phase structured debug | Heisenbugs, perf regressions |
| **prototype** | Throwaway code, kept conclusion | Tech choices, UI comparisons |
| **to-prd** | Chat → PRD / issues | Turning a brainstorm into tasks |
| **write-a-skill** | A skill that writes skills | Crystallizing your own workflow |

The genuinely interesting thing about Agent Skills is the realization that the AI isn't just a faster typist — you can **design its role, process, and constraints**. To understand the full machinery (CLAUDE.md / Skills / Hooks / Plugins / AGENTS.md), read on in [AI Coding Tool Skills & Extension Systems](/en/guides/ai-tool-skills-extensions).

---

*Skill source: [mattpocock/skills](https://github.com/mattpocock/skills) (MIT). Skills change frequently — check the repo for the latest before installing. Compiled 2026-06-08.*
