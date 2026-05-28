---
title: "Self-Hosted AI Coding Relay with sub2api: Claude Code, Codex, and Gemini Gateway Guide"
description: "A practical guide to self-hosting an AI coding relay with Wei-Shaw/sub2api: when to use it, Docker Compose deployment, Nginx headers, Simple Mode, Claude Code / Codex / Gemini access, backups, and security risks."
date: "2026-05-28"
updated_at: "2026-05-28"
article_type: howto
tags: ["sub2api", "api-relay", "claude-code", "codex", "gemini-cli", "self-hosted", "docker"]
draft: false
---

## Short Answer

If you only use Claude Code, Codex, or Gemini CLI occasionally as an individual developer, **do not start by self-hosting a relay**. A reputable commercial relay, tested with a small top-up, is usually less work.

Self-hosting starts to make sense when you need:

- One internal gateway for a team using Claude, Codex, Gemini, or similar subscriptions.
- Per-user API keys instead of sharing upstream credentials.
- Token-level usage tracking by person, project, or tool.
- Concurrency and rate limits so one user cannot burn the entire quota.
- A data path you control instead of sending code and prompts through a third-party relay.
- A unified gateway for Claude Code, Codex, Gemini CLI, Antigravity, and OpenAI-compatible tools.

[Wei-Shaw/sub2api](https://github.com/Wei-Shaw/sub2api) is built for this category. It is not just a simple OpenAI-compatible forwarding proxy. It is an AI API gateway focused on subscription quota distribution: upstreams can be OAuth or API-key based, users get platform-generated API keys, and the platform handles authentication, billing, load balancing, and request forwarding.

In one sentence: **sub2api is useful for internal team gateways, but it is not something beginners should expose as a public commercial service without understanding the risks.**

---

## What Is sub2api?

The official README describes sub2api as an **AI API Gateway Platform for Subscription Quota Distribution**.

Its core capabilities include:

| Capability | What it solves |
|---|---|
| Multi-account management | Manage multiple upstream account types, including OAuth and API keys |
| API key distribution | Issue internal keys to users without exposing upstream secrets |
| Token-level billing | Track usage and cost at token granularity |
| Smart scheduling | Select upstream accounts intelligently, with sticky sessions |
| Concurrency control | Limit per-user and per-account concurrency |
| Rate limiting | Configure request and token limits |
| Built-in payment system | Supports EasyPay, Alipay, WeChat Pay, and Stripe for self-service top-up scenarios |
| Admin dashboard | Monitor users, accounts, requests, and usage through a web UI |

The stack is conventional: Go + Gin + Ent on the backend, Vue 3 + Vite + TailwindCSS on the frontend, PostgreSQL 15+ for storage, Redis 7+ for cache and queueing, and Docker-ready deployment.

---

## Who Should Use It?

### Good Fit

**1. Small internal teams sharing quota.**  
If 3-10 people share Claude / Codex / Gemini subscriptions or API quota, sub2api lets each person use an internal key instead of sharing upstream credentials.

**2. Teams that need cost allocation.**  
Token-level usage and balance features help answer "who used what" and "which project is expensive."

**3. Privacy-sensitive teams.**  
Third-party relays can theoretically see your request body. Self-hosting keeps the gateway, logs, and database under your control.

**4. Multi-account routing.**  
If a single upstream account has rate or concurrency limits, account pools, sticky sessions, and per-user limits are more stable than manually rotating keys.

### Poor Fit

**1. No server operations experience.**  
You should be comfortable with Linux, Docker, domains, HTTPS, backups, logs, and firewall basics.

**2. You only want cheaper access.**  
Self-hosting is not free. Server cost, maintenance time, account risk, incidents, and backups all count.

**3. You want to sell public relay access without compliance work.**  
The README explicitly warns that using the project may violate upstream terms such as Anthropic's Terms of Service, and that account suspension or service interruption risks are borne by the user. Before public commercialization, you need to understand upstream terms, legal entity requirements, invoices, privacy policy, and data processing responsibilities.

---

## Recommended Architecture

A minimal production-style setup looks like this:

```text
Claude Code / Codex / Gemini CLI
        |
        v
HTTPS domain, for example https://relay.example.com
        |
        v
Nginx / Caddy reverse proxy
        |
        v
sub2api
        |
        +--> PostgreSQL: users, keys, accounts, billing
        +--> Redis: cache, queues, state
        |
        v
Upstream Claude / Codex / Gemini / Antigravity / OpenAI-compatible services
```

For individuals and internal teams, start with **Docker Compose + HTTPS + restricted admin access**. Do not start with public registration, payments, reseller plans, and complex pricing.

---

## Deployment Options

The official README lists three deployment paths:

| Method | Best for | Notes |
|---|---|---|
| Script installation | Users who want systemd-managed binaries | Requires PostgreSQL and Redis installed beforehand |
| Docker Compose | Most self-hosters | Recommended path; includes PostgreSQL and Redis containers |
| Build from source | Custom development | Requires Go, Node.js, pnpm, PostgreSQL, and Redis |

For most users, Docker Compose is the cleanest path. It is easier to migrate, back up, and run on a small VPS.

---

## Quick Docker Compose Deployment

The official automated deployment flow is roughly:

```bash
mkdir -p sub2api-deploy
cd sub2api-deploy

curl -sSL https://raw.githubusercontent.com/Wei-Shaw/sub2api/main/deploy/docker-deploy.sh | bash

docker compose up -d
docker compose logs -f sub2api
```

The script downloads `docker-compose.local.yml` and `.env.example`, creates `.env`, and generates secrets such as `JWT_SECRET`, `TOTP_ENCRYPTION_KEY`, and `POSTGRES_PASSWORD`.

For manual deployment:

```bash
git clone https://github.com/Wei-Shaw/sub2api.git
cd sub2api/deploy

cp .env.example .env
```

Edit `.env`:

```bash
POSTGRES_PASSWORD=your_secure_password_here
JWT_SECRET=your_jwt_secret_here
TOTP_ENCRYPTION_KEY=your_totp_key_here
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
SERVER_PORT=8080
```

Generate secrets with:

```bash
openssl rand -hex 32
```

Start the stack:

```bash
mkdir -p data postgres_data redis_data
docker compose -f docker-compose.local.yml up -d
docker compose -f docker-compose.local.yml ps
docker compose -f docker-compose.local.yml logs -f sub2api
```

Open:

```text
http://YOUR_SERVER_IP:8080
```

Do not expose port 8080 directly in production. Put it behind an HTTPS reverse proxy.

---

## Nginx Reverse Proxy Note

If you use Nginx and want Codex CLI or sticky-session routing to work reliably, add this to the `http` block:

```nginx
underscores_in_headers on;
```

Nginx drops headers containing underscores by default, such as `session_id`. The sub2api README warns that this can break sticky session routing in multi-account setups.

A minimal reverse proxy example:

```nginx
http {
  underscores_in_headers on;

  server {
    listen 443 ssl http2;
    server_name relay.example.com;

    ssl_certificate /etc/letsencrypt/live/relay.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/relay.example.com/privkey.pem;

    client_max_body_size 50m;

    location / {
      proxy_pass http://127.0.0.1:8080;
      proxy_http_version 1.1;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
      proxy_buffering off;
    }
  }
}
```

Caddy can also work, but verify that it preserves required headers and streaming behavior for your clients.

---

## Simple Mode for Internal Use

sub2api includes Simple Mode for individual developers or internal teams that want quick access without the full SaaS billing flow.

Enable it with:

```bash
RUN_MODE=simple
SIMPLE_MODE_CONFIRM=true
```

My recommendation: **start in Simple Mode for internal use, then decide whether you actually need public registration, balances, payments, and plans.**

Most teams are not trying to sell a relay. They are trying to give teammates stable access, see usage, and avoid quota fights. Simple Mode fits that starting point.

---

## Connecting Claude Code, Codex, and Gemini CLI

Different upstreams and clients use different environment variables. Treat the examples below as patterns and confirm the exact path in your sub2api dashboard and client docs.

### Claude Code

For an Anthropic-compatible endpoint, the common pattern is:

```bash
export ANTHROPIC_BASE_URL="https://relay.example.com"
export ANTHROPIC_API_KEY="sk-your-sub2api-key"

claude
```

For the Antigravity-specific endpoint, the README shows:

```bash
export ANTHROPIC_BASE_URL="http://localhost:8080/antigravity"
export ANTHROPIC_AUTH_TOKEN="sk-xxx"
```

Replace `localhost:8080` with your HTTPS domain in production.

### OpenAI-Compatible Clients and Codex Tools

Many clients read OpenAI-compatible variables:

```bash
export OPENAI_BASE_URL="https://relay.example.com/v1"
export OPENAI_API_KEY="sk-your-sub2api-key"
```

Some tools use `OPENAI_API_BASE`; others use `OPENAI_BASE_URL`. Check your exact client.

### Gemini CLI

Gemini clients may use native Google paths or a compatibility layer. The README notes that Antigravity accounts expose `/v1beta/` for Gemini models. If you use that path, keep Claude and Gemini endpoints, account groups, and conversation contexts clearly separated.

The README also warns that Anthropic Claude and Antigravity Claude should not be mixed within the same conversation context. Use groups to isolate them.

---

## Security Checklist

The easiest mistake is to get the service running and expose it publicly too soon. At minimum:

1. **Use HTTPS.**  
   Do not send API keys, prompts, or code over HTTP in production.

2. **Protect the admin dashboard.**  
   Restrict by IP, add Basic Auth, keep it private, or at least use strong passwords and 2FA.

3. **Never commit secrets.**  
   Keep `.env`, database dumps, logs, and compressed backups out of Git.

4. **Redact logs.**  
   Avoid storing full prompts, code snippets, API keys, and sensitive upstream headers.

5. **Back up, but encrypt backups.**  
   PostgreSQL contains users, keys, accounts, and billing data.

6. **Disable public registration unless you truly need it.**  
   For internal use, do not expose open sign-up or payments.

7. **Set rate limits and concurrency limits.**  
   Give every user and upstream account reasonable RPM, TPM, and concurrency caps.

8. **Allow only trusted upstream domains.**  
   The README mentions security controls such as `security.url_allowlist`, CORS, response headers, billing circuit breakers, trusted proxies, and Turnstile. In production, do not casually disable URL validation or allow arbitrary HTTP upstreams.

---

## Backups and Upgrades

If you use `docker-compose.local.yml`, the official README recommends local directories for easier migration.

Upgrade:

```bash
docker compose -f docker-compose.local.yml pull
docker compose -f docker-compose.local.yml up -d
```

Stop and archive the deployment directory:

```bash
docker compose -f docker-compose.local.yml down
cd ..
tar czf sub2api-complete.tar.gz sub2api-deploy/
```

Restore:

```bash
tar xzf sub2api-complete.tar.gz
cd sub2api-deploy/
docker compose -f docker-compose.local.yml up -d
```

For production, add regular PostgreSQL backups instead of relying only on full-directory archives.

---

## sub2api vs OneAPI / New API / CRS

| Option | Best for |
|---|---|
| sub2api | Subscription quota distribution, user keys, account pools, billing, and coding-tool relays for Claude Code / Codex / Gemini |
| OneAPI / New API | General model aggregation, OpenAI-compatible APIs, multi-model routing |
| claude-relay-service / CRS | A more focused Claude Code relay setup |
| Commercial relays | Users who want ready-to-use access without operations work |

If your goal is "one internal gateway + cost tracking + account-pool scheduling," sub2api is a strong fit.  
If your goal is "many models for app development," OneAPI or New API may feel more straightforward.  
If you only need Claude Code, a lighter CRS-style project may be enough.

---

## Minimal Rollout Plan

Do not try to build a full relay business on day one. Start with:

1. Prepare a clean VPS, expose 80 / 443, and keep the backend port private.
2. Deploy sub2api with Docker Compose.
3. Configure HTTPS reverse proxy and verify streaming.
4. Create the admin account and disable public registration.
5. Add one upstream account or API key.
6. Generate one internal API key for yourself.
7. Run a low-risk Claude Code or Codex test task.
8. Configure user-level rate and concurrency limits.
9. Watch logs and usage for 1-2 days.
10. Invite teammates only after the gateway is stable.

This slower path avoids most early mistakes: exposed admin panels, leaked keys, broken streaming, and upstream accounts burned by accidental concurrency.

---

## Risk Notes

Be explicit about the boundaries:

- **Upstream Terms of Service**: the README warns that using this project may violate upstream terms such as Anthropic's. Whether quota sharing, subscription-to-API conversion, or resale is allowed depends on the upstream provider.
- **Account risk**: shared usage, unusual concurrency, cross-region traffic, and context mixing may trigger upstream risk controls.
- **Data security**: self-hosting reduces third-party relay risk, but the gateway admin can still access request data.
- **Operations risk**: Redis, PostgreSQL, Docker, Nginx, HTTPS, and backups can all become failure points.
- **Commercialization risk**: if you sell access publicly, you own data, payments, invoices, support, refunds, compliance, and upstream stability.

CodePick's recommendation: **start with internal use, validate on low traffic, and only then consider broader access.**

---

## Official Links

- [Wei-Shaw/sub2api GitHub repository](https://github.com/Wei-Shaw/sub2api)
- [sub2api README](https://github.com/Wei-Shaw/sub2api/blob/main/README.md)
- Further reading: [AI Coding API Relay Guide](/en/compare/api-relay-guide/)
