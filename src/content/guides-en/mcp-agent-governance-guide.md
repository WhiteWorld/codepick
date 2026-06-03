---
title: "MCP and Agent Governance Guide 2026: Choosing Local Servers, Remote OAuth, and Cloud Sandboxes"
description: "MCP is no longer just about connecting tools. The real question is how to control permissions, approvals, auditability, and execution environments. This guide shows when individuals, small teams, and enterprises should use local stdio servers, shared `.mcp.json`, remote OAuth MCP, or cloud sandboxes."
date: "2026-06-03"
article_type: "explainer"
tags: ["mcp", "agent", "governance", "security", "sandbox", "workflow"]
draft: false
---

Over the last few months, MCP support in AI coding tools has moved past "can this tool connect to X?" and into a more serious phase: **how do you operate these connections safely at scale?**

The signals are clear:

- The **latest MCP authorization spec** is explicit about remote access: OAuth 2.1, Protected Resource Metadata, PKCE, token audience validation, and discovery flows are all part of the expected design.
- **OpenAI** treats approvals as a first-class primitive in its MCP / Connectors docs: before data is sent to a remote MCP server, the Responses API can emit an `mcp_approval_request` for human review.
- **GitHub** made secret scanning in the GitHub MCP Server generally available in May 2026, then pushed Copilot **cloud and local sandboxes** into public preview on **June 2, 2026**. Governance is becoming a product surface, not just a security afterthought.

So the real question is no longer "Does this coding tool support MCP?"

It is:

> **Where should the agent run, whose identity should it use, what should it be allowed to do by default, and which actions must stay human-gated?**

This guide gives you a practical decision framework.

---

## Separate the problem into three control layers

Teams often talk about "MCP security" as if it were one thing. It is at least three different things:

| Layer | What you are controlling | Common mechanisms |
|---|---|---|
| **Tool exposure** | Which tools the agent can even see | allowlists, registries, tool-specific config |
| **Identity and authorization** | Who the agent is acting as in external systems | API keys, OAuth 2.1, scopes, approvals |
| **Execution isolation** | Where the agent can read, write, run commands, and access the network | local processes, restricted sandboxes, cloud sandboxes |

If you collapse these into one bucket, two mistakes show up quickly:

1. **You confuse "connected" with "governed."**  
   A remote MCP server working does not mean scopes, approvals, and token handling are sane.

2. **You confuse "sandboxed" with "safe."**  
   A sandbox can isolate execution, but it does not automatically solve GitHub write permissions, database scopes, or OAuth sprawl.

---

## Four common deployment patterns

### 1. Local stdio MCP: the default starting point for most individuals

The MCP spec is explicit here: **STDIO transports should not use the HTTP authorization spec and instead retrieve credentials from the environment**. That means the main governance questions for local servers are not OAuth questions. They are:

- Which directories can this process touch?
- Which secrets exist in its environment?
- Does it really need write access?

**Strengths:**
- Lowest latency
- Minimal setup
- No extra remote server layer between your code and the tool
- Great for filesystem tools, SQLite, local scripts, and private internal utilities

**Tradeoffs:**
- Harder to audit centrally
- Easier for every developer machine to drift into a different setup
- Secret hygiene depends heavily on individual workstation habits

**Best for:**
- Individual developers
- Early-stage projects
- Sensitive codebases where keeping code local matters more than centralized management

**Practical recommendation:**
If all you want is better local tooling inside Claude Code, Cursor, or Cline, **start with local stdio MCP before you reach for remote MCP**.

---

### 2. Shared project `.mcp.json`: the lowest-friction team standardization layer

The first real step for many teams is not enterprise governance. It is simply turning MCP config into a versioned project asset.

Claude Code is a useful reference point here. Its MCP docs expose **local / project / user** installation scopes. A `project`-scoped server is written into `.mcp.json` at the repo root for team sharing, while project-provided servers still require explicit approval before use.

This pattern solves **consistency**, not full central control:

- Everyone sees the same server names and baseline configuration
- Read-only design, docs, and repository tools can be standardized
- Secrets can still stay local via environment-variable expansion

**Strengths:**
- Easy to adopt
- Team-shareable
- Much more reliable than tribal-knowledge configuration

**Tradeoffs:**
- Still not an org-wide registry or policy system
- Auditability depends heavily on the client surface
- Risk increases if high-privilege servers are normalized into shared project config too early

**Best for:**
- Small teams
- Shared engineering workflows around GitHub, documentation, design files, or schema inspection
- Teams not yet ready for a platform-level governance layer

**Practical recommendation:**
Do not skip this stage. **Make MCP configuration file-based and versioned before you try to make it centrally governed.**

---

### 3. Remote OAuth MCP: ideal for SaaS integrations, and where governance becomes real

Once the MCP server is remote over HTTP or SSE, the complexity jumps.

The latest MCP authorization spec expects, among other things:

- **OAuth 2.1**
- **Protected Resource Metadata**
- authorization-server discovery
- **PKCE**
- a `resource` parameter that identifies the target MCP server
- server-side validation that the token was actually issued for that server as its intended audience

Why this matters: a remote MCP server is not just another REST API. It is a **tool surface that an agent can call repeatedly and semi-autonomously**.

If scopes are too broad, approvals are skipped too casually, or tokens are too generic, the blast radius can be larger than a typical point integration.

OpenAI's design is a good example of the new baseline. In the Responses API, remote MCP tools can trigger an `mcp_approval_request` before data is shared. You *can* later disable approvals for trusted tools, but the secure default is human review first.

**Strengths:**
- Great fit for GitHub, Notion, Stripe, Linear, hosted databases, and other SaaS systems
- Easier to share across a team
- Better foundation for unified identity and auditable access patterns

**Tradeoffs:**
- Authorization design becomes materially harder
- Misconfiguration has a much wider blast radius
- You need to separate read-only from write-capable tools far more carefully

**Best for:**
- Teams with real cross-SaaS workflows
- Agents that need issue trackers, PR context, monitoring, docs, or hosted business systems
- Organizations starting to care about approvals and traceability

**Practical recommendation:**
As soon as you move into remote MCP, your default mindset should switch from **"connect it first"** to **"minimize permission first, then expand intentionally."**

---

### 4. Local and cloud sandboxes: execution isolation, not total governance

GitHub's June 2026 sandbox rollout is an important industry marker. Agents are no longer just about calling tools. We now have to care about **where commands execute**.

GitHub's framing is straightforward:

- **Local sandbox**: the agent still runs on your machine, but filesystem, network, and system access can be restricted
- **Cloud sandbox**: the agent runs inside a GitHub-hosted ephemeral Linux environment

Two practical reminders matter here:

1. **Local sandboxing is not full governance**  
   It narrows the execution boundary on your machine, but you still need sane MCP credentials, GitHub permissions, and database scopes.

2. **Cloud sandboxing introduces a separate cost and lifecycle layer**  
   GitHub currently bills cloud sandboxes by compute, memory, and snapshot storage. That is distinct from Copilot seat pricing and distinct from bundled AI credits.

**Strengths:**
- Better fit for shell-heavy work: tests, builds, logs, automation
- Easier isolation and reproducibility for teams
- Cloud execution is useful for parallel tasks and cross-device continuity

**Tradeoffs:**
- Local sandboxing still inherits parts of the local environment
- Cloud sandboxes add budget, secrets injection, and lifecycle management concerns
- Sandboxing does not replace OAuth, approvals, or allowlists

**Best for:**
- Teams that want agents to actually run commands
- Developers who want to limit machine contamination
- Organizations that need more legible execution boundaries

**Practical recommendation:**
Treat sandboxing as an **execution-layer control**, not as a magical master switch for safety.

---

## A simple comparison table

| Pattern | Setup speed | Team sharing | Auditability | Fit for sensitive code | Typical failure mode |
|---|---|---|---|---|---|
| **Local stdio MCP** | Fastest | Low | Low | High | messy local secrets and directory boundaries |
| **Shared `.mcp.json`** | Fast | Medium | Medium-low | Medium-high | high-privilege servers become normalized for everyone |
| **Remote OAuth MCP** | Medium | High | High | depends on implementation | oversized scopes, missing approvals, token misuse |
| **Local sandbox + MCP** | Medium | Medium | Medium | High | assuming sandboxing replaces permission design |
| **Cloud sandbox + remote MCP** | Slowest | High | Highest | Medium | cost sprawl, secret injection, platform coupling |

---

## What individuals, small teams, and enterprises should actually do

### Individual developers

The usual order of operations is:

1. **Local stdio MCP**
2. Add a little **project-scoped `.mcp.json`** only when useful
3. Use **remote MCP** only when SaaS context is truly needed

Your goal is not perfect governance. It is to avoid turning a productivity setup into an OAuth platform project.

If you are already thinking in terms of local-vs-cloud agent tradeoffs, our [Claude Code vs Codex comparison](/en/compare/claude-code-vs-codex/) is a good companion read.

### Small teams

For most small teams, the sane path looks like this:

- Put common servers into project-scoped `.mcp.json`
- Share **read-only** tools by default
- Keep write-capable tools behind approvals
- Use environment variables instead of committing secrets into the repo

If your team already relies on Rules, Skills, or Hooks, pair MCP config with behavior constraints. Our [AI tool skills and extension systems guide](/en/guides/ai-tool-skills-extensions/) helps frame that layer.

### Enterprises

Enterprises are not really asking "Can the agent talk to GitHub?"

They are asking:

- Which servers are even allowed to be discovered?
- Which tools are allowed to run?
- Which writes require approval?
- Which execution paths must stay inside a controlled environment?
- If something goes wrong, can we trace it?

GitHub is already productizing this direction. Organizations and enterprises can define an **MCP registry URL** and access policy, shaping which MCP servers developers can discover and use. Combined with GitHub MCP secret scanning becoming GA, the workflow "scan before PR" is becoming operationally real rather than just aspirational.

---

## Seven practical governance rules

### 1. Default local, justify remote

If a workflow can be handled with local stdio, do not jump to remote MCP by default.

### 2. Share read-only by default, gate writes by default

Reading issues, docs, and schemas can often be standardized. Sending messages, updating tickets, writing to databases, or deploying should usually stay human-approved.

### 3. Scope permissions by task, not by system

Do not grant broad repository write access just because "this is the GitHub server."  
Ask what the agent actually needs: read PRs, comment, merge, edit files, or all of the above?

### 4. Sandbox solves execution isolation only

It does not solve least-privilege OAuth design or tool allowlisting for you.

### 5. Shared config should share structure, not secrets

Your `.mcp.json` should encode server shape, not plaintext credentials.

### 6. Treat high-risk tools as their own class

Database writes, production deploys, external messaging, and finance/admin systems should not inherit the same policy as "read docs" or "search issues."

### 7. Prioritize traceability early

You do not need full enterprise SIEM on day one, but you should at least know:

- which MCP servers are connected
- which are read-only versus write-capable
- which actions require human approval by default

---

## Bottom line

In 2025, the main MCP question was whether the ecosystem would materialize at all. By **June 2026**, the question is different: **now that the ecosystem is real, how do you keep it from turning into uncontrolled agent access?**

If you remember one framework, make it this:

- **Individuals**: local stdio first, shared config second
- **Small teams**: project-scoped `.mcp.json` plus read-only sharing and write approvals
- **Enterprises**: remote OAuth MCP plus registry / allowlist policy, secret scanning, and sandboxed execution

MCP is no longer just a capability layer for connecting tools. It is becoming a **workflow layer where permissions, approvals, auditability, and execution boundaries have to be designed together**.

---

## Related reading

- [MCP Protocol Introduction: Connecting AI Coding Tools to the World](/en/guides/mcp-intro/)
- [AI Coding Tool Skills & Extension Systems: Claude Code, Cursor, Cline Complete Guide](/en/guides/ai-tool-skills-extensions/)
- [Claude Code vs Codex 2026: Full Comparison of Two AI Coding Agents](/en/compare/claude-code-vs-codex/)
- [CLI AI Coding Tools 2026: Complete Guide to 7 Terminal Agents](/en/compare/cli-ai-coding-tools-2026/)

---

*Primary sources checked through 2026-06-03: [MCP Authorization specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization) · [OpenAI MCP and Connectors docs](https://developers.openai.com/api/docs/guides/tools-connectors-mcp) · [Claude Code MCP docs](https://code.claude.com/docs/en/mcp) · [GitHub MCP server usage in your company](https://docs.github.com/en/copilot/concepts/mcp-management) · [Configure MCP server access](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-mcp-server-access) · [GitHub MCP secret scanning GA](https://github.blog/changelog/2026-05-05-secret-scanning-with-github-mcp-server-is-now-generally-available/) · [About cloud and local sandboxes for GitHub Copilot](https://docs.github.com/en/copilot/concepts/about-cloud-and-local-sandboxes)*
