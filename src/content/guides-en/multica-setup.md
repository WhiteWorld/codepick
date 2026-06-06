---
title: "Multica Private Deployment Guide: Docker Compose, Daemon, Login, and Production Hardening (2026)"
description: "A practical guide to self-hosting multica-ai/multica on your own server or private network: Docker Compose quick install, manual setup, login codes, Caddy/Nginx reverse proxy, daemon pairing, Kubernetes, upgrades, and security boundaries."
date: "2026-05-19"
updated_at: "2026-06-06"
article_type: "howto"
tags: ["multica", "agent-platform", "agent-collaboration", "self-hosted", "private-deployment", "docker", "kubernetes", "open-source", "setup"]
draft: false
faq:
  - q: "How much server capacity does a private Multica deployment need?"
    a: |
      The server mainly runs the frontend, backend, PostgreSQL 17 + pgvector, and WebSocket coordination. A small team can usually start with 2 vCPU / 4 GB RAM. The heavier CPU, model quota, and disk usage live on each developer machine or owned runtime that runs the daemon.
  - q: "Can I run the agent daemon inside the same Docker stack?"
    a: |
      The official architecture keeps the daemon on each execution machine, not inside the Multica server container. The daemon needs direct access to local repositories, Git credentials, and the logged-in state of Claude Code, Codex, Copilot, Cursor Agent, OpenCode, and similar CLIs.
  - q: "Can I log in without an email provider?"
    a: |
      Yes. If neither Resend nor SMTP is configured, verification codes are printed in backend logs. That is fine for local testing or a private trial. Production deployments should use Resend or an internal SMTP relay, and should not expose a fixed `MULTICA_DEV_VERIFICATION_CODE` publicly.
  - q: "Is Multica MIT licensed? Can I sell a hosted service with it?"
    a: |
      No, it is not plain MIT. The official LICENSE says Multica uses a modified Apache 2.0 license. Internal use within one organization is generally allowed, but providing a hosted service to third parties or embedding Multica into a commercial distributed product requires checking the additional license conditions first.
---

[Multica](/en/tool/multica) is an open-source management layer for human + coding-agent teams. You assign Issues to agents like teammates; they claim work, execute, report blockers, comment, and update status. Compared with opening Claude Code, Codex, Cursor Agent, or another CLI directly, Multica adds **task identity, queues, team coordination, real-time progress, runtime visibility, and reusable Skills**. The actual coding agent still runs on your own machine or owned runtime.

This guide focuses on private deployment rather than product marketing. By the end you should know:

- How to start a self-hosted Multica instance using the current official path.
- Which production variables matter for login, signup, CORS, and WebSockets.
- Where the daemon should run and how it connects to your private server.
- When Docker Compose is enough, and when Kubernetes is worth considering.
- What to check for licensing, email, backup, upgrades, and operational safety.

## TL;DR

For a local trial or a small 2-10 person team, start with the official two-command flow:

```bash
# 1. Install the CLI and provision a local self-hosted server
curl -fsSL https://raw.githubusercontent.com/multica-ai/multica/main/scripts/install.sh | bash -s -- --with-server

# 2. Configure the CLI, authenticate in the browser, and start the daemon
multica setup self-host
```

Default endpoints:

```text
Frontend: http://localhost:3000
Backend:  http://localhost:8080
```

For a team LAN or public-domain deployment, the smallest production shape is:

```text
Browser / CLI login
        |
        v
HTTPS: https://multica.example.com
        |
        v
Caddy / Nginx reverse proxy
        |
        +--> frontend: localhost:3000
        +--> backend + WebSocket: localhost:8080
        |
        v
PostgreSQL 17 + pgvector

Developer laptops / build boxes
        |
        v
multica daemon + Claude Code / Codex / Copilot / Cursor Agent / OpenCode ...
```

The important mental model: **the Multica server is not the machine that centrally runs every agent**. It is the coordination and project-management surface. The daemon is the execution runtime.

## Decide Whether Private Multica Fits

Good fit:

- Your team already plans work in Issues or a Kanban board and wants agents to become assignees.
- You want several machines and several agent CLIs behind one control plane.
- You want task state, comments, traces, runtime health, and reusable Skills in your own database.
- You do not want the orchestration layer hosted by a third party.

Poor fit:

- You are a solo user who occasionally runs Claude Code or Codex. Direct CLI use is lighter.
- Nobody on the team wants to own Docker, domains, HTTPS, email, backups, and upgrades.
- You plan to turn Multica source into a public commercial SaaS. The official license adds hosted / embedded service restrictions.

## The Three-Part Architecture

The official self-hosting docs split Multica into:

| Layer | Role | Private deployment concern |
|---|---|---|
| Frontend | Next.js web app | Domain, HTTPS, `FRONTEND_ORIGIN`, static assets |
| Backend | Go REST API + WebSocket | `JWT_SECRET`, CORS, WebSocket, email, signup control, uploads |
| Database | PostgreSQL 17 + pgvector | Persistence, backup, migrations, connection limits |

Each user or execution machine also installs the `multica` CLI and runs the daemon. The daemon scans agent CLIs on PATH and registers available runtimes with the server.

The current README lists these auto-detected commands:

```text
claude, codex, copilot, openclaw, opencode, hermes,
gemini, pi, cursor-agent, kimi, kiro-cli, agy
```

Multica does not replace those tools. It gives them task queues, identities, an Issue board, and progress streaming.

## Option 1: Official Quick Install

Best for local trials and small private pilots:

```bash
curl -fsSL https://raw.githubusercontent.com/multica-ai/multica/main/scripts/install.sh | bash -s -- --with-server
multica setup self-host
```

This flow:

1. Installs the `multica` CLI.
2. Fetches self-host assets.
3. Pulls official frontend / backend / PostgreSQL images from GHCR.
4. Starts the stack with localhost defaults.
5. Uses `multica setup self-host` to open browser login, store a token, discover workspaces, and start the daemon.

If a machine only needs the CLI and not the server:

```bash
brew install multica-ai/tap/multica
```

## Option 2: Manual Docker Compose

If you want explicit control over the repo, version, `.env`, and compose files:

```bash
git clone https://github.com/multica-ai/multica.git
cd multica
make selfhost
```

`make selfhost` creates `.env` from `.env.example`, generates a random `JWT_SECRET`, and starts services with `docker-compose.selfhost.yml`. By default it pulls the latest stable GHCR images.

If the selected GHCR tag has not been published yet, or you want to build from the current checkout:

```bash
make selfhost-build
```

Fully manual path:

```bash
git clone https://github.com/multica-ai/multica.git
cd multica
cp .env.example .env

# At minimum, replace JWT_SECRET
openssl rand -hex 32

docker compose -f docker-compose.selfhost.yml pull
docker compose -f docker-compose.selfhost.yml up -d
```

Health checks:

```bash
curl http://localhost:8080/health
curl http://localhost:8080/readyz
```

Use `/health` for basic liveness. Use `/readyz` or `/healthz` when your monitor should fail if the database or migrations are not ready.

## Login, Email, and Signup Control

Multica login uses email verification codes. A private deployment has three choices:

| Method | Best for | Notes |
|---|---|---|
| Resend | Public or cloud deployment | Set `RESEND_API_KEY` and `RESEND_FROM_EMAIL` |
| SMTP | Enterprise LAN / internal mail relay | Set `SMTP_HOST`, `SMTP_PORT`, and TLS variables |
| Backend log code | Local trial / one-off testing | Not a long-term production flow |

The advanced docs say that without Resend or SMTP, generated codes are printed in the server log. The Docker self-host stack defaults to `APP_ENV=production` and has no fixed code by default.

For local-only testing:

```bash
APP_ENV=development
MULTICA_DEV_VERIFICATION_CODE=888888
```

Do not use that on a public or shared production instance.

Recommended workspace-lock sequence:

1. Start with `DISABLE_WORKSPACE_CREATION=false`.
2. Let the admin sign in and create the shared workspace.
3. Set `DISABLE_WORKSPACE_CREATION=true` and restart the backend.
4. If you also want to block new accounts, set `ALLOW_SIGNUP=false`.

Be careful: `ALLOW_SIGNUP=false` blocks all new account creation, including invited users who have not registered yet. Many teams should keep `ALLOW_SIGNUP=true`, add `ALLOWED_EMAIL_DOMAINS` or `ALLOWED_EMAILS`, and disable workspace creation separately.

## Production Reverse Proxy: Caddy Single Domain

The official advanced guide recommends Caddy. In a single-domain layout, route `/ws` to the backend and everything else to the frontend:

```text
multica.example.com {
    @multica_ws path /ws /ws/*
    handle @multica_ws {
        reverse_proxy localhost:8080 {
            flush_interval -1
        }
    }

    reverse_proxy localhost:3000
}
```

Backend `.env`:

```bash
FRONTEND_ORIGIN=https://multica.example.com
CORS_ALLOWED_ORIGINS=https://multica.example.com
```

This is a common self-hosting pitfall: normal HTTP pages can work while real-time task progress, comments, and notifications silently fail. The usual cause is that the browser's WebSocket `Origin` is not in the backend allowlist, so the upgrade is rejected.

## Nginx Split-Domain Setup

If you prefer `app.example.com` and `api.example.com`:

```nginx
server {
    listen 443 ssl;
    server_name app.example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

server {
    listen 443 ssl;
    server_name api.example.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /ws {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_read_timeout 86400;
    }
}
```

Backend config:

```bash
FRONTEND_ORIGIN=https://app.example.com
CORS_ALLOWED_ORIGINS=https://app.example.com
```

If you build the web image from source, also bake public API and WebSocket URLs into the frontend:

```bash
REMOTE_API_URL=https://api.example.com
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_WS_URL=wss://api.example.com/ws
```

## Pair the Daemon with Your Self-Hosted Server

Every developer or runtime machine that should execute agent work needs:

```bash
brew install multica-ai/tap/multica
multica setup self-host \
  --server-url https://api.example.com \
  --app-url https://app.example.com
```

For localhost defaults:

```bash
multica setup self-host
```

Check the daemon:

```bash
multica daemon status
multica daemon logs -f
```

The daemon runs in the background by default and logs to `~/.multica/daemon.log`. For debugging:

```bash
multica daemon start --foreground
```

Useful runtime variables:

| Variable | Purpose |
|---|---|
| `MULTICA_DAEMON_MAX_CONCURRENT_TASKS` | Limit tasks per daemon |
| `MULTICA_WORKSPACES_ROOT` | Set the root directory for task workspaces |
| `MULTICA_CODEX_PATH` / `MULTICA_CLAUDE_PATH` | Override agent CLI paths |
| `MULTICA_CODEX_MODEL` / `MULTICA_CLAUDE_MODEL` | Override model choice |
| `MULTICA_DAEMON_POLL_INTERVAL` | Tune polling frequency |
| `MULTICA_DAEMON_HEARTBEAT_INTERVAL` | Tune heartbeat frequency |

The daemon creates isolated task workdirs and has garbage collection for done/cancelled issues and regenerable build artifacts. In production, put `MULTICA_WORKSPACES_ROOT` on a monitored disk with enough capacity.

## When Kubernetes Is Worth It

If you already operate k3s / Kubernetes with an Ingress controller and a default `ReadWriteOnce` StorageClass, use the official Helm chart:

```bash
kubectl create namespace multica

kubectl -n multica create secret generic multica-secrets \
  --from-literal=JWT_SECRET="$(openssl rand -hex 32)" \
  --from-literal=POSTGRES_PASSWORD="$(openssl rand -hex 16)" \
  --from-literal=RESEND_API_KEY="" \
  --from-literal=GOOGLE_CLIENT_SECRET="" \
  --from-literal=CLOUDFRONT_PRIVATE_KEY="" \
  --from-literal=MULTICA_DEV_VERIFICATION_CODE=""

helm install multica oci://ghcr.io/multica-ai/charts/multica \
  --version <chart-version> \
  -n multica
```

Key notes:

- The chart creates PostgreSQL, backend, frontend, two Ingress resources, and a ConfigMap.
- `multica-secrets` is not managed by the chart; create it once yourself.
- The prebuilt web image assumes `REMOTE_API_URL=http://backend:8080`, so the official docs recommend one Multica release per namespace unless you customize the web image.
- The daemon still runs on developer machines or owned runtime machines, not inside this chart.

If you do not already have Kubernetes, do not adopt it just for Multica. Docker Compose + reverse proxy + backups are easier to own for small teams.

## Uploads, Attachments, and Private Object Storage

Local Docker volumes are enough for trials. If production users will upload attachments, logs, or artifacts, plan S3-compatible storage early:

```bash
S3_BUCKET=my-bucket
S3_REGION=us-west-2
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_ENDPOINT_URL=https://s3-compatible.example.com
ATTACHMENT_DOWNLOAD_MODE=proxy
```

For private buckets behind Docker or a VPC-only endpoint, `ATTACHMENT_DOWNLOAD_MODE=proxy` is often easier to control than public presigned URLs. If you use CloudFront, configure `CLOUDFRONT_DOMAIN`, `CLOUDFRONT_KEY_PAIR_ID`, and `CLOUDFRONT_PRIVATE_KEY`.

## Monitoring, Backups, and Upgrades

Before production, do at least four things:

1. **Back up PostgreSQL**: Issues, workspaces, agents, tasks, and usage rollups live there.
2. **Preserve `.env` / secrets**: especially `JWT_SECRET`, DB password, email credentials, and object-storage credentials.
3. **Monitor readiness**: use `/readyz` or `/healthz`, not only the frontend port.
4. **Restrict metrics**: `METRICS_ADDR` is off by default. If enabled, bind it privately or protect it.

Docker Compose upgrade:

```bash
docker compose -f docker-compose.selfhost.yml pull
docker compose -f docker-compose.selfhost.yml up -d
```

Pin a version in `.env` if needed:

```bash
MULTICA_IMAGE_TAG=v0.3.17
```

Migrations run automatically on backend startup. The official docs call out a `v0.3.4` to `v0.3.5+` usage-rollup migration guard; current versions run the required backfill during migration. If you maintain an older binary and see `refusing to drop legacy daily rollups`, follow the advanced guide and run `backfill_task_usage_hourly`.

## Troubleshooting

| Symptom | Check first |
|---|---|
| Page loads, but live progress does not update | `/ws` reverse proxy; `CORS_ALLOWED_ORIGINS` includes the browser origin |
| No verification email arrives | Resend / SMTP settings; backend logs for `[DEV] Verification code` |
| `make selfhost` cannot pull images | GHCR reachability; use `make selfhost-build` |
| Daemon shows no runtime | Agent CLI is on PATH; `multica daemon logs -f` |
| Assigned agent does not execute | Daemon is logged into the same workspace; local Claude/Codex/Copilot is authenticated |
| LAN IP works poorly | Set `FRONTEND_ORIGIN` / `CORS_ALLOWED_ORIGINS` to the LAN origin; proxy WebSocket or rebuild the web image |
| Usage dashboard looks wrong after upgrade | Inspect `sys_cron_executions` and the official usage-rollup guide |

## Production Checklist

- [ ] `JWT_SECRET` is random and not the default.
- [ ] PostgreSQL volume or external database is backed up.
- [ ] Resend or SMTP is configured instead of relying on log codes.
- [ ] Public instances do not enable fixed `MULTICA_DEV_VERIFICATION_CODE`.
- [ ] `FRONTEND_ORIGIN` / `CORS_ALLOWED_ORIGINS` match the real domain.
- [ ] `/ws` is routed through the proxy and buffering is not breaking real-time updates.
- [ ] After the first workspace is created, `DISABLE_WORKSPACE_CREATION=true` is set if needed.
- [ ] `ALLOW_SIGNUP` / `ALLOWED_EMAIL_DOMAINS` / `ALLOWED_EMAILS` match your user policy.
- [ ] Daemon machines have enough disk and a monitored `MULTICA_WORKSPACES_ROOT`.
- [ ] License use is internal/private; hosted services or commercial embedding are reviewed first.

## When to Pick Multica

Pick Multica when you want a project-management layer for **multiple humans, multiple agents, and multiple runtimes**: Issues, assignees, runtime health, task queues, real-time output, and reusable Skills are all designed around delivery work.

If you only need a terminal surface for a few Claude Code or Codex sessions, Multica may be heavier than necessary. But if your team already lives in a board and wants agents to join that same workflow, the operational cost starts to make sense.

## Sources

- [multica-ai/multica GitHub README](https://github.com/multica-ai/multica)
- [Multica Self-Hosting Guide](https://github.com/multica-ai/multica/blob/main/SELF_HOSTING.md)
- [Multica Advanced Self-Hosting Configuration](https://github.com/multica-ai/multica/blob/main/SELF_HOSTING_ADVANCED.md)
- [Multica CLI and Agent Daemon Guide](https://github.com/multica-ai/multica/blob/main/CLI_AND_DAEMON.md)
- [Multica LICENSE](https://github.com/multica-ai/multica/blob/main/LICENSE)
- [How Multica works](https://multica.ai/docs/how-multica-works)

Verified through: 2026-06-06.
