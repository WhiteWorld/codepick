---
title: "How to Evaluate AI Coding Agents on Your Own Repo: Task Design, Success Rate, Cost, and Time Metrics"
description: "SWE-bench scores don't represent your codebase. This guide provides a reproducible evaluation framework: how to design task sets, define success rates, measure cost and time, and identify regression risks — so you can choose the right AI coding agent with real project data."
date: "2026-08-13"
article_type: how-to
tags: [ai-coding, evaluation, benchmark, swe-bench, agent, claude-code, codex, copilot, cost]
pillar: workflow
content_status: keep
locale_strategy: mirrored
draft: false
---

## Bottom Line

SWE-bench scores tell you how well an agent fixes bugs in open-source Python repos. They don't tell you:

- How that agent performs on your TypeScript monorepo
- Whether it will accidentally break your carefully designed architecture
- How much a task actually costs and how long it takes
- Whether running 10 tasks in a row yields an 80% or 30% success rate

If your team is seriously considering adopting AI coding agents, **you should run an evaluation on your own repo**. You don't need complex infrastructure — a weekend, a few typical tasks, and a spreadsheet is enough.

> Research timestamp: 2026-08-13. This methodology is based on publicly documented agent evaluation practices (SWE-bench, aider polyglot benchmark, official tool docs) and is not tied to specific tool versions.

---

## 1. Why Public Benchmark Scores Aren't Enough

### SWE-bench's Limitations

SWE-bench is one of the most authoritative AI coding benchmarks, but it has a clear scope:

| Covers | Doesn't Cover |
|---|---|
| Python open-source repos | Your private repo, TypeScript / Go / Rust projects |
| Single-file, localized bug fixes | Cross-file architecture refactors, new feature work |
| Fixed test cases | Your team's specific code conventions and lint rules |
| One-shot pass/fail | Code maintainability, whether new bugs were introduced |

### Problems with Other Benchmarks

- **Aider polyglot benchmark**: Broader language coverage, but tasks are simpler (mostly single-file edits) and tied to aider's specific evaluation framework.
- **Self-reported scores from tool vendors**: Different tools may use different prompt strategies and model versions. Cross-comparison requires caution.
- **No benchmark tests your code conventions**: Your lint rules, directory structure conventions, naming conventions — only your own repo can validate these.

---

## 2. Designing Your Own Task Set

### Where to Find Tasks

Pull from your recent git history, don't invent them. Here are 4 practical task types:

| Type | Example | Difficulty | Why It's Worth Testing |
|---|---|---|---|
| **Bug Fix** | "Fix the login page rendering blank on Safari" | Medium | Closest to daily needs |
| **Test Coverage** | "Add unit tests for the 3 public methods in `UserService`" | Low-Medium | Clear boundaries, easy to evaluate |
| **Dependency Upgrade** | "Upgrade `react` from 18 to 19, pass full test suite" | Medium-High | Tests handling of breaking changes |
| **Refactor** | "Replace moment.js with date-fns in `utils/date.ts`" | High | Tests understanding of project structure |

**Where to look**:

1. Scan the last 3 months of git log for bugs you've already fixed. Use the original bug description as the task description and see if the agent can fix it independently.
2. Find modules with test coverage below 60% and have the agent add tests.
3. Find upgradable dependencies in `package.json` and have the agent handle the upgrade.

### Task Design Principles

- **Every task must have clear acceptance criteria**: Not "just make it better" but "all existing tests pass + new tests cover target lines + zero lint errors."
- **Task descriptions should read like real issues**: Not too detailed ("change `const` to `let` on line 42"), not too vague ("optimize it"). Match the style your team actually uses for issues.
- **Prepare 5-10 tasks**: Too few lacks statistical meaning, too many makes evaluation too expensive. 5-10 tasks of varying difficulty is a reasonable starting point.
- **Include at least one "trap" task**: Deliberately write an unreasonable requirement in the description and see if the agent refuses or questions it — this is an important indicator of agent maturity.

---

## 3. Defining Evaluation Metrics

### The Core Four

| Metric | Definition | How to Measure |
|---|---|---|
| **Success Rate** | Percentage of tasks that pass acceptance criteria | Passed / Total |
| **Cost** | API fees consumed per task | Extract from API dashboard or tool logs |
| **Time** | Wall-clock time from task submission to final result | Includes waiting and retries |
| **Regression Risk** | Whether the agent's changes introduced new bugs | Run full test suite + new tests; check for unexpected failures |

### Why You Need All Four

- **Success rate only**: You might pick an expensive but accurate agent and blow your monthly budget.
- **Cost only**: You might pick a cheap agent that frequently goes in the wrong direction, saving API money but wasting human review time.
- **Time only**: A fast agent might have recklessly skipped the step of understanding your project.
- **No regression check**: The agent might have fixed A but broken B and C, and you won't notice immediately.

### Bonus Metrics (Advanced)

Once your evaluation pipeline is running smoothly, add:

- **First-attempt pass rate**: Percentage of tasks that pass on the first submission vs. those requiring human feedback and correction
- **Average review time**: How long it takes to review the agent's PR, compared to reviewing a human PR
- **Code quality score**: Subjective rating (1-5) from a senior team member, focusing on readability and architectural consistency

---

## 4. Evaluation Workflow

### Step 1: Prepare the Environment

```bash
# Create isolated working directories for each agent
git worktree add ../eval-codex-cli codex-eval
git worktree add ../eval-claude-code claude-eval

# Install dependencies in each worktree
cd ../eval-codex-cli && npm ci
cd ../eval-claude-code && npm ci
```

### Step 2: Standardize Task Descriptions

Write all tasks in a standard format so every agent gets exactly the same input:

```markdown
## Task #1: Fix Safari Blank Screen

**Problem**: Users report the login page renders blank on Safari 17.4,
with console error `TypeError: undefined is not an object`.

**Acceptance Criteria**:
1. Login page renders correctly on Safari 17.4
2. All existing tests pass
3. No new lint errors
4. No new browser compatibility issues introduced

**Relevant Files**: `src/pages/login.tsx`, `src/components/AuthForm.tsx`
```

### Step 3: Run Agents One at a Time

**Key rule**: Each agent only gets the task description, never the "correct answer." The correct evaluation approach is:

1. Give the agent the task description
2. Agent modifies the code
3. You run the acceptance criteria
4. Record the results
5. **Do not give the agent hints mid-task** — unless you would give the same hints in a real scenario

### Step 4: Record Results

Use a table, for example:

| Task | Agent | Pass? | Time | API Cost | Regression? | Notes |
|---|---|---|---|---|---|---|
| #1 Safari blank | Codex CLI | ✅ | 3m42s | $0.18 | None | Passed on first attempt |
| #1 Safari blank | Claude Code | ✅ | 5m10s | $0.32 | None | Wrong direction first, passed after retry |
| #2 Add tests | Codex CLI | ✅ | 2m15s | $0.09 | None | Covered 4 methods instead of the 3 requested |
| #2 Add tests | Claude Code | ❌ | 4m30s | $0.45 | 1 test failure | Generated tests used deprecated APIs |
| #3 Dep upgrade | Codex CLI | ❌ | 8m00s | $0.56 | Build failed | Didn't handle breaking changes |
| #3 Dep upgrade | Claude Code | ✅ | 6m20s | $0.41 | None | Found migration guide automatically |

---

## 5. Interpreting Results: What Scores Are "Good"

### Don't Chase Absolute Scores

There is no universal "passing grade." Your threshold depends on your context:

- **Safety-first teams** (finance, healthcare): Success rate > 90%, regression rate = 0%, higher cost is acceptable
- **Speed-first teams** (startups, internal tools): Success rate > 70%, regression rate < 10%, cost within budget
- **Individual developers exploring**: First check whether the agent understands your project structure, then look at other metrics

### Look for Patterns, Not Single Data Points

3 out of 5 tasks passed is not "60% success rate." You should look at:

- Which task types is it strong on? Weak on?
- What are the failure causes? Misunderstanding? Capability gap? Wrong direction from the start?
- Can it pass after correction? How many rounds of feedback does it need?

### Fairness in Cross-Agent Comparison

- Use the same model (or same-tier model) for comparison
- Use the same prompt / system instructions
- If the agent tool supports custom configuration (e.g., AGENTS.md), keep configurations consistent
- Record each agent's version number, as it may update next week

---

## 6. Making Evaluation a Continuous Process

A one-time evaluation has limited value — agents iterate quickly, and your repo changes too.

### Establish an Evaluation Baseline

- Solidify 5-10 core tasks as an evaluation set, stored in an `eval/` directory in your repo
- Re-run whenever there's a major agent version update
- Re-run whenever you switch agent tools

### Lightweight Continuous Evaluation

You don't need the full suite every time. You can:

- Pick 2-3 representative tasks as a "quick smoke test"
- Run once a week and observe trends
- If the trend degrades, run the full evaluation set

---

## Summary

Evaluating AI coding agents on your own repo is not about chasing a pretty score — it's about **understanding each agent's real performance on your code, your conventions, and your task types**.

A weekend's investment gives you months of not agonizing over "should we switch tools?" — because you have data, not feelings.

Remember the workflow:

1. **Dig 5-10 real tasks from your git history**
2. **Define clear acceptance criteria**
3. **Run multiple agents with the same input**
4. **Record success rate, cost, time, and regressions**
5. **Look for patterns, not single data points**

> Further reading: Once you've chosen an agent, check out our [AI Coding Agent Security Guide](/en/guides/ai-coding-agent-security-2026) to configure proper permissions and approval workflows before bringing the agent into your daily workflow.
