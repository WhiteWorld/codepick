---
title: "Multica Setup Guide: Open-Source Self-Hosted Multi-Agent Project Management (2026)"
description: "Multica brings AI agents into an Issue panel — assign tasks, track progress, build a team. This 15-minute guide covers: Docker one-line self-host → start the local daemon to auto-detect 11 agent CLIs → create an Issue and assign to an agent → distill reusable Skills."
date: "2026-05-19"
updated_at: "2026-05-19"
article_type: "howto"
tags: ["multica", "agent-platform", "agent-collaboration", "self-hosted", "docker", "open-source", "setup"]
draft: false
faq:
  - q: "What resources does Multica self-hosting need?"
    a: |
      A 2-core / 4GB server is enough (postgres + backend + frontend + WebSocket, all in Docker Compose).
      Agents **don't execute on the Multica server** — they run on your dev machine / teammates' boxes. The server only handles coordination and the DB, so resource pressure is minimal.
  - q: "Why isn't the daemon containerized?"
    a: |
      Because the daemon executes agent CLIs (claude / codex / openclaw etc.) and needs direct access to local code repos and CLI tools.
      Containerizing it would break the "code never leaves your box" privacy boundary and complicate CLI state management. Daemon on host + server in Docker is the cleanest split.
  - q: "Is Multica's Skills the same as Claude Code's Skills?"
    a: |
      No. Claude Code Skills are single-agent capability bundles; Multica Skills are **cross-agent reusable workflows** (deploy, write migrations, code review, etc.).
      Write once, every agent in the team can invoke it — this is what differentiates Multica from Slock.
  - q: "Does it work from China?"
    a: |
      Yes. Multica is MIT open-source — domestic servers can deploy directly via Docker Compose, no VPN needed.
      Agent execution is local too; models can use Chinese APIs (Ark / Bailian / DeepSeek). The whole pipeline can stay in China.
---

[Multica](/en/tool/multica) is the open-source "managed agents platform" — pull Claude Code / OpenCode / Codex into an Issue panel and assign work like to a teammate. Its standout features are the **Skills system** (cross-agent reusable workflows) and **11 runtime integrations** (broadest coverage). This guide walks you through self-hosting in 15 minutes.

## Who This Is For

- Teams already using GitHub Issues / Jira / Linear who want agents in the same workflow
- Builds that need to accumulate reusable agent capabilities (deploy / test / review as Skills)
- Privacy-conscious teams who want full self-hosting
- Mixed-stack users running multiple agent CLIs (Claude Code + Codex + OpenClaw etc.)

## TL;DR

```bash
# One command: install CLI + bring up self-hosted server (recommended)
curl -fsSL https://raw.githubusercontent.com/multica-ai/multica/main/scripts/install.sh \
  | bash -s -- --with-server

# Web UI: http://localhost:3000
# Daemon auto-detects: claude / codex / copilot / openclaw / opencode /
#                      hermes / gemini / pi / cursor-agent / kimi / kiro-cli
```

---

## Prerequisites

- Docker + Docker Compose (for the server)
- Node.js 18+ (for the local daemon)
- At least one configured agent CLI ([Claude Code](/en/tool/claude-code) / [OpenCode](/en/tool/opencode) etc.)
- An email for login (recommended: configure a Resend API Key; alternatively use the dev verification code)

---

## Step 1: One-Line Self-Host (Recommended)

```bash
curl -fsSL https://raw.githubusercontent.com/multica-ai/multica/main/scripts/install.sh \
  | bash -s -- --with-server
```

This will:

1. Install the `multica` CLI
2. Fetch the latest self-host assets
3. Pull official Multica images from GHCR
4. Configure localhost listening + auto-generate `JWT_SECRET`

After completion, visit [http://localhost:3000](http://localhost:3000).

> 💡 **Manual route**: If you want custom networking / domain, `git clone` the repo and run `make selfhost` — it generates `.env` from `.env.example` and brings up Docker Compose.

---

## Step 2: Pick a Login Method

**Production (recommended)**: set `RESEND_API_KEY` in `.env`; login uses email verification codes.

**Local dev**: set `MULTICA_DEV_VERIFICATION_CODE=123456` to use a fixed code for any email.

> ⚠️ **Never set the DEV verification code on a publicly accessible server** — anyone who knows an email address can log in.

---

## Step 3: Start the Local Daemon

In a new terminal on your local machine (not the server):

```bash
# Install the daemon
npm install -g @multica/daemon

# Start and pair with your self-hosted server
multica daemon start --server http://localhost:3000
```

The daemon scans `PATH` and registers all detected agent CLIs:

| Detected command | Maps to |
|---|---|
| `claude` | Claude Code |
| `codex` | Codex CLI |
| `copilot` | Copilot |
| `openclaw` | OpenClaw |
| `opencode` | OpenCode |
| `hermes` | Hermes-Agent |
| `gemini` | Gemini CLI |
| `pi` | Pi |
| `cursor-agent` | Cursor Agent |
| `kimi` | Kimi Code |
| `kiro-cli` | Kiro CLI |

Any present is usable.

---

## Step 4: Assign Your First Issue

Back in the web UI ([http://localhost:3000](http://localhost:3000)):

1. **New Project** → link your code repo (GitHub OAuth or local path)
2. **New Issue** → write a description: "Add a disabled state style to Button.tsx"
3. **Assignee** → pick a registered agent (e.g., Claude Code)
4. After submit, the agent starts working; WebSocket streams progress to the Issue page

When done, the Issue closes automatically with the diff attached as a comment.

---

## The Skills System: Multica's Real Differentiator

Skills are **cross-agent shared workflow definitions**. Example: a team-agreed "deploy to staging" workflow:

```yaml
# .multica/skills/deploy-staging.yaml
name: deploy-to-staging
description: Deploy current branch to staging
steps:
  - run: npm test
  - run: npm run build
  - run: ./scripts/deploy.sh staging
  - verify: curl -f https://staging.example.com/health
```

Commit this YAML to `.multica/skills/` in your repo, and **every agent in the team gains this capability**. In an Issue, write "run the deploy-staging skill on this branch" and the agent will follow the defined steps.

As your team accumulates more Skills, agents become "teammates who know how to use tools" rather than just code-writing models.

---

## Common Pitfalls

1. **`make selfhost` fails** → check Docker daemon is running and ports 3000/5432 are free
2. **Daemon can't reach server** → check firewall; use `http://localhost:3000` locally, `https://` remotely
3. **Agents register but Issues don't dispatch** → check daemon logs; common cause is missing CLI API keys (Claude Code not logged in / Codex missing OPENAI_API_KEY)
4. **GHCR image pull is slow in China** → configure an Alibaba / Tencent Cloud GHCR mirror in `.env`

---

## Comparison with Other Platforms

| Dimension | Multica | Slock | LobeHub | Orkas |
|---|---|---|---|---|
| Open source | ✅ MIT | ❌ | ✅ | ✅ MIT |
| Self-host | Docker | Not possible | Docker | Desktop |
| Runtime support | **11 types** | 4 | Built-in engine | 4 |
| Core paradigm | Issue panel | Chat channels | Agent marketplace | Commander |
| Skill sharing | ✅ | ❌ | Partial | ❌ |

See the [2026 Agent Collaboration Platform Guide](/en/guides/agent-collaboration-platforms-2026/) for the full comparison.

---

## Related

- [Multica product page](/en/tool/multica)
- [2026 Agent Collaboration Platform Roundup](/en/guides/agent-collaboration-platforms-2026/)
- [Slock setup guide](/en/guides/slock-setup/)
- [Cline + Volcengine Ark setup](/en/guides/cline-ark-setup/) (how to configure Chinese model APIs for agents)

> Verified through 2026-05-19. Official docs: [multica.ai/docs/self-host-quickstart](https://multica.ai/docs/self-host-quickstart).
