---
title: "LobeHub Setup Guide: Assemble Your AI Team via the Agent Marketplace (2026)"
description: "LobeHub is the largest open-source agent collaboration platform (73K+ stars), centered on its Agent Marketplace + Agent Groups. This 15-minute guide covers: Docker Compose self-host → configure LLM API keys → pick from 273K+ Skills / 51K+ MCP servers → use Agent Groups to auto-form teams for complex tasks."
date: "2026-05-19"
updated_at: "2026-05-19"
article_type: "howto"
tags: ["lobehub", "agent-platform", "agent-collaboration", "self-hosted", "docker", "mcp", "setup"]
pillar: workflow
content_status: keep
locale_strategy: mirrored
draft: false
faq:
  - q: "How is LobeHub different from Open WebUI / Chatbot UI?"
    a: |
      Open WebUI / Chatbot UI are "chat interface + model switcher" — essentially single-agent conversations.
      LobeHub is the "operating system for agent teams" — its core is **Agent Marketplace + Agent Groups + Skills Marketplace** (273K+ Skills, 51K+ MCP Servers), where multiple skilled agents auto-form teams to complete tasks. Ecosystem scale is the key difference.
  - q: "Is Cloud the same as self-hosted feature-wise?"
    a: |
      Core agent orchestration is identical, but Cloud has higher latency from China (self-host recommended).
      Cloud Pro $20/mo includes compute credits and priority model access; self-host uses your own LLM API keys (true token billing) — heavy users save more long-term.
  - q: "Do I need S3 storage?"
    a: |
      Only for file upload + knowledge base features (S3-compatible: AWS S3 / Cloudflare R2 / self-hosted MinIO).
      Pure agent chat and tool calling don't need it — skip at first, add when you actually need knowledge bases.
  - q: "Does self-hosting work from China?"
    a: |
      Yes — Docker Compose runs fine on Chinese servers. Recommended LLM APIs: domestic ones (DeepSeek / Kimi / GLM / Volcengine Ark Coding Plan) for a fully domestic pipeline.
      Note: configure an Alibaba / Tencent Cloud GHCR mirror to speed up image pulls.
---

[LobeHub](/en/tool/lobehub) is the largest open-source agent collaboration platform (73K+ GitHub stars), positioning itself as a "Chief Agent Operator" — a general-purpose AI workspace beyond just coding. Its core is the **Agent Marketplace + Agent Groups auto-formation + 273K+ Skills / 51K+ MCP Servers** ecosystem. This guide walks you through Docker self-hosting in 15 minutes.

## Who This Is For

- Already using Claude / GPT, wanting to scale to "agent teams working in parallel"
- Need AI workflows beyond pure coding (writing, research, design, data analysis)
- Prefer self-hosting with your own LLM API keys for long-term cost savings
- Team scenarios: shared agent configs and Skills

## TL;DR

```bash
# Recommended: interactive setup script
git clone https://github.com/lobehub/lobehub.git
cd lobehub/docker-compose
bash setup.sh    # supports English and Simplified Chinese

# Web UI: http://localhost:3210
# Built-in auth + self-hosted database
```

---

## Deployment Options

| Method | Best for | Difficulty |
|---|---|---|
| **Cloud Free** | 5-minute trial | Trivial |
| **Cloud Pro $20/mo** | Heavy users, hands-off | Trivial |
| **Vercel deploy** | Personal, light, have a Vercel account | Easy |
| **Docker Compose self-host** (this guide) | Teams, privacy-sensitive, long-term | Medium |
| **Full database self-host** | Enterprise, SSO and advanced features | Higher |

---

## Prerequisites (Docker Compose self-host)

- Docker + Docker Compose
- API key from at least one LLM provider (OpenAI / Anthropic / Gemini / DeepSeek / Ark — any)
- 4GB+ RAM server
- (Optional) S3-compatible storage (AWS S3 / Cloudflare R2 / MinIO), only needed for file upload / knowledge bases

---

## Step 1: Clone and Run the Setup Script

```bash
git clone https://github.com/lobehub/lobehub.git
cd lobehub/docker-compose
bash setup.sh
```

`setup.sh` is an **interactive wizard** that asks:

- Cloudflare or direct access?
- Database: built-in Docker Postgres or external?
- Email verification via Resend, or skip for now?
- Enable file upload (requires S3)?

Follow the prompts; the script generates `.env` and `docker-compose.yml` automatically.

> 💡 **Friendly for Docker beginners**: the script supports interactive Q&A in English / Chinese, much easier than hand-editing `.env`.

---

## Step 2: Start the Services

```bash
docker compose up -d

# Watch logs to confirm all services started
docker compose logs -f
```

Visit [http://localhost:3210](http://localhost:3210).

---

## Step 3: Configure LLM API Keys

In the web UI:

1. **Settings** → **AI Providers**
2. Pick a provider (OpenAI / Anthropic / Gemini / custom OpenAI-compatible endpoint)
3. Fill API Key + Base URL (for domestic gateways like Ark, use `https://ark.cn-beijing.volces.com/api/coding`)
4. Test connection → Save

> ⚠️ **Never commit API keys to git** — `.env` is gitignored, but double-check if you copy keys to other config files.

---

## Step 4: Pick Agents from the Marketplace

LobeHub's edge is its **ecosystem**. Visit **Discover → Agents**:

- 273K+ Skills (as of 2026-05)
- 51K+ MCP Servers
- Agents cover coding, writing, data analysis, design, more

Pick a solid one (e.g., "Frontend Developer"), click **Add to My Workspace**. It'll appear in your agent selector next time you start a new chat.

---

## Step 5: Use Agent Groups for Auto Team Formation

For complex tasks (e.g., "build a login page") that a single agent can't handle, use **Agent Group**:

1. **My Workspace** → **New Group**
2. Describe the goal ("build a login page with form validation")
3. LobeHub's CAO (Chief Agent Operator) automatically selects a fitting combination from your Workspace (Frontend Agent + Test Agent + Code Review Agent)
4. Agents collaborate within the Group; CAO aggregates the final output

This is LobeHub's core differentiator from single-agent tools.

---

## Persistent Memory and Continuous Learning

Each agent has its own memory store that learns your preferences. For example:

- First time you ask the Frontend Agent to write a component, it asks "What CSS approach?" — you say Tailwind
- Next time it defaults to Tailwind without asking
- Synced across sessions and devices (self-host uses your Postgres)

---

## Common Pitfalls

1. **First `setup.sh` run is slow** → images pulled from GHCR; in China, configure an Alibaba mirror or use a proxy for `docker login ghcr.io`
2. **API key configured but agent doesn't reply** → check docker logs; common cause is wrong Base URL (OpenAI-compatible endpoints must end with `/v1` or omit it)
3. **Multi-agent Group blows up API costs** → assign cheaper models (e.g., mini) to peripheral agents, flagship only for final review
4. **Cloud Pro $20 vs self-host** → Pro's compute credits with optimized routing have higher ROI for heavy users; light users save more with self-host + BYO API

---

## Comparison with Other Platforms

| Dimension | LobeHub | Slock | Multica | Orkas |
|---|---|---|---|---|
| GitHub stars | **73K+** | (closed) | Medium | Early |
| Ecosystem | **273K+ Skills / 51K+ MCP** | 4 runtimes | 11 runtimes | 4 runtimes |
| Positioning | General AI workspace | Coding collab | Coding collab | Single-machine commander |
| Learning curve | Higher (feature-rich) | Medium | Medium | Low |

See the [2026 Agent Collaboration Platform Guide](/en/guides/agent-collaboration-platforms-2026/) for full comparison.

---

## Related

- [LobeHub product page](/en/tool/lobehub)
- [2026 Agent Collaboration Platform Roundup](/en/guides/agent-collaboration-platforms-2026/)
- [Multica setup guide](/en/guides/multica-setup/) (open-source coding collaboration)
- [MCP intro](/en/guides/mcp-intro/) (understanding LobeHub's 51K+ MCP servers)

> Verified through 2026-05-19. Ecosystem numbers from [LobeHub Marketplace](https://lobehub.com/skills) and [lobehub.com/mcp](https://lobehub.com/mcp).
