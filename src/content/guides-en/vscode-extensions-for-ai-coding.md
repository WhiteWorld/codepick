---
title: "Essential VS Code Extensions for AI-Assisted Development"
description: "The best VS Code plugins to use alongside Cursor, Cline, and Claude Code — covering Git history, code quality, API testing, and readability. Build a complete AI-augmented workflow."
date: "2026-04-01"
tags: ["vscode", "cursor", "cline", "workflow", "extensions", "git", "productivity"]
draft: false
---

AI coding tools handle the writing. These plugins handle everything around it — Git history, inline errors, API testing, code readability. Together they form a complete workflow instead of a single-point tool.

> All plugins listed here work in VS Code itself and in VS Code Fork IDEs like Cursor, Windsurf, and Trae.

---

## Git: Give Your AI Historical Context

### GitLens

**Install**: `ext install eamodio.gitlens`

The most complete Git enhancement plugin in the VS Code ecosystem. Key features:

- **Inline Blame**: hover any line to see who last changed it, when, and why (commit message)
- **File History**: right-click → "Open File History" to see the full revision timeline for any file
- **Commit Comparison**: visual diff between any two commits

**AI workflow tip**: When reporting a bug to Cursor or Cline, include the GitLens blame snippet:

```
This line (commit a3f2c1, 2026-01-15, @alice) started failing after the auth refactor.
The symptom is: [describe the bug]
```

Giving the AI a timeline anchors it to the right version of the code and dramatically improves root-cause accuracy.

### Git Graph

**Install**: `ext install mhutchie.git-graph`

Renders your git log as an interactive branch tree. Indispensable on projects with many feature branches and frequent merges. Click any commit node to see its full diff inline.

---

## Code Quality: Make AI Output Reliable

### Error Lens

**Install**: `ext install usernamehw.errorlens`

VS Code's default diagnostics require hovering to read. Error Lens renders every ESLint, TypeScript, and compiler error directly on the offending line — no mouse required.

**AI workflow tip**: When AI-generated code has type errors, take a screenshot (with Error Lens visible) and paste it directly into the chat. Cursor and Cline both accept image input — a screenshot is more precise than typing out the error message.

### ESLint + Prettier

**Install**: `ext install dbaeumer.vscode-eslint` + `ext install esbenp.prettier-vscode`

Standard on virtually every JS/TS project. The key is wiring them to auto-fix on save in `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

**AI workflow tip**: Tell your AI tool about the auto-format setup in `CLAUDE.md` (Claude Code) or `.cursorrules` (Cursor):

```
The project uses ESLint + Prettier. Code is auto-formatted on save.
Do not manually reformat generated code — just write correct logic.
```

This eliminates the back-and-forth of asking AI to fix indentation and quote styles.

---

## API Testing: Stay Inside VS Code

### REST Client

**Install**: `ext install humao.rest-client`

Write HTTP requests in plain `.http` files, click "Send Request", see the response in a side panel. No browser tab switching, no Postman account required.

Example `api-test.http`:

```http
### Get all users
GET https://api.example.com/users
Authorization: Bearer {{token}}

### Create a user
POST https://api.example.com/users
Content-Type: application/json

{
  "name": "Alice",
  "email": "alice@example.com"
}
```

**AI workflow tip**: This is the smoothest API testing integration with AI tools. Ask your AI to generate the test file directly:

```
Here's my FastAPI router (paste code).
Generate a REST Client .http file covering happy path and error cases for each endpoint.
```

The AI produces a ready-to-run `.http` file you execute without leaving VS Code — faster than writing Postman collections by hand.

### Thunder Client

**Install**: `ext install rangav.vscode-thunder-client`

If you prefer a GUI, Thunder Client is a lightweight Postman embedded in VS Code — collections, environment variables, test assertions, all without leaving the editor.

---

## Readability: Navigate AI-Generated Code Faster

### Todo Tree

**Install**: `ext install gruntfuggly.todo-tree`

Scans the whole project for `TODO`, `FIXME`, and `HACK` comments and lists them in the sidebar as clickable links.

**AI workflow tip**: AI tools often leave `// TODO` stubs in generated code. Periodically paste the Todo Tree list into the chat:

```
Here are the outstanding TODOs in this project (from Todo Tree).
Prioritize them and suggest implementation approaches for the top three:
- TODO: add rate limiting (middleware/auth.ts:45)
- FIXME: pagination is slow on large datasets (services/user.ts:112)
```

### indent-rainbow

**Install**: `ext install oderwat.indent-rainbow`

Colors each indentation level differently. Especially useful in Python, YAML, and deeply nested JSON — reduces the chance of misreading indentation depth, which is a common source of subtle bugs in AI-generated code.

### Better Comments

**Install**: `ext install aaron-bond.better-comments`

Applies semantic colors to comment prefixes: `!` (red warning), `?` (blue question), `TODO` (orange), `*` (green highlight). Useful for quickly scanning which AI-generated comments need attention.

---

## Terminal / Scripts

### ShellCheck (for shell scripts)

**Install**: `ext install timonwong.shellcheck` (requires `shellcheck` installed on the system)

Static analysis for `.sh` scripts — catches syntax errors, POSIX portability issues, and common shell pitfalls. AI-generated shell scripts can have subtle quoting or compatibility issues; ShellCheck catches them before they fail in CI.

---

## Recommended Combinations by Tool

**Cursor / Windsurf (VS Code Fork IDE)**

Core set: GitLens + Error Lens + REST Client + Todo Tree

**Cline / Roo Code (VS Code plugin)**

Core set: GitLens + Error Lens + REST Client + ESLint + Prettier

> REST Client pairs especially well with Cline: ask Cline to update the `.http` test file whenever it changes an API endpoint, then run the requests yourself to verify the output.

**Claude Code / Aider (terminal CLI)**

Core set: GitLens + Error Lens + ShellCheck + Todo Tree

> CLI tools generate code that you review in VS Code. Error Lens and GitLens make that review cycle significantly faster.

---

## Summary

| Extension | Use case | AI workflow value |
|-----------|----------|-------------------|
| GitLens | Git history | Feed commit timeline to AI for better regression diagnosis |
| Error Lens | Inline diagnostics | Screenshot errors directly into chat — no transcription needed |
| REST Client | API testing | Ask AI to generate runnable `.http` test files |
| ESLint + Prettier | Code style | Declare auto-format in `.cursorrules` / `CLAUDE.md` and skip style fixups |
| Todo Tree | Task tracking | Paste outstanding TODOs to AI in bulk for prioritization |
| ShellCheck | Shell scripts | Catch portability issues in AI-generated bash before CI fails |

None of these require a subscription — install and go. Each one fills a gap that AI coding tools don't cover, turning a single-point AI assistant into a complete development workflow.
