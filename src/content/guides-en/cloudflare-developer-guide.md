---
title: "Cloudflare for Developers: More Than a CDN — Your Full-Stack Platform"
description: "A beginner's guide to Cloudflare's developer ecosystem: Workers serverless functions, Pages static hosting, D1 database, R2 storage, and KV cache — build and ship apps at minimal cost."
date: "2026-03-21"
tags: ["cloudflare", "deployment", "beginner", "full-stack", "serverless"]
---

You've written the code for your app. Now what? You need somewhere to run the backend, store data, host files, and set up a domain — and all of that can feel harder than writing the code itself.

That's where Cloudflare comes in. Most people think of it as "that CDN company," but it has evolved into a **full-fledged developer platform** offering compute, storage, and databases — with generous free tiers.

This guide walks you through Cloudflare's core developer products, what they can do for you, and how to get started.

---

## What Can Cloudflare Do for Developers?

| Your Need | Cloudflare Product | Free Tier |
|-----------|-------------------|-----------|
| Run backend logic (APIs, Webhooks) | Workers | 100K requests/day |
| Deploy frontend websites | Pages | Unlimited sites & bandwidth |
| Store structured data | D1 (SQLite database) | 5 GB storage |
| Store files & images | R2 (Object storage) | 10 GB storage, no egress fees |
| Cache key-value data | KV (Key-value store) | 100K reads/day |
| Run scheduled tasks | Cron Triggers | Included with Workers |
| Real-time communication | Durable Objects | Pay-per-use |

> 💡 **Key selling point**: R2 has **zero egress fees**. This is the biggest difference from AWS S3. For image-heavy or file-sharing apps, this can save you a lot of money.

---

## Core Products Explained

### Workers: Your Serverless Backend

Workers is Cloudflare's flagship product. You write a JavaScript/TypeScript function, and Cloudflare deploys it to 300+ edge locations worldwide. Users get responses from the nearest node.

**Great for:**
- REST API / GraphQL backends
- Webhook handlers (payment callbacks, GitHub events, etc.)
- Request proxying and auth middleware
- Dynamic HTML rendering

**A minimal Worker:**

```typescript
export default {
  async fetch(request: Request): Promise<Response> {
    return new Response("Hello from Cloudflare Workers!", {
      headers: { "content-type": "text/plain" },
    });
  },
};
```

After deploying, you get a `https://my-worker.your-name.workers.dev` URL, accessible worldwide.

**How is this different from a traditional server?**
- No need to buy a server, install Nginx, or configure SSL
- No containers or Kubernetes to manage
- Cold start < 5ms (much faster than AWS Lambda)
- Pay-per-request — no requests, no cost

### Pages: One of the Best Options for Frontend Deployment

Cloudflare Pages can deploy any static site or frontend framework project (React, Vue, Astro, Next.js, etc.).

**Key advantages:**
- Connect GitHub/GitLab for automatic deployments on push
- Preview URLs generated for every PR
- Unlimited bandwidth, free SSL
- Built-in Functions (Workers embedded in Pages)

**Deployment flow:**
1. Log into Cloudflare Dashboard → Pages → Create a project
2. Connect your GitHub repository
3. Set build command (e.g., `npm run build`) and output directory (e.g., `dist`)
4. Click deploy, wait 1-2 minutes

Every push to main automatically updates your site.

### D1: Edge SQLite Database

D1 is a SQLite database running on Cloudflare's edge network. No database server to manage — just write SQL.

```typescript
export default {
  async fetch(request, env) {
    const { results } = await env.DB.prepare(
      "SELECT name, email FROM users WHERE id = ?"
    ).bind(1).all();

    return Response.json(results);
  },
};
```

**Highlights:**
- Standard SQLite syntax — low learning curve
- Free 5 GB storage — enough for small projects
- Ultra-fast reads (served from the nearest edge)
- Database branching and point-in-time recovery

### R2: Object Storage Without Egress Fees

R2 is S3-compatible object storage for files, images, videos, and backups. Its killer feature is **zero egress fees** — users downloading your files costs you nothing extra.

```typescript
// Upload a file to R2
await env.MY_BUCKET.put("avatar/user-123.png", imageData);

// Read a file
const object = await env.MY_BUCKET.get("avatar/user-123.png");
```

**R2 vs AWS S3:**
| | R2 | S3 |
|---|---|---|
| Storage | $0.015/GB/mo | $0.023/GB/mo |
| Egress | **$0** | $0.09/GB |
| Free tier | 10 GB | 5 GB (12 months) |

If your app involves heavy file downloads (image sites, file sharing), R2 is significantly cheaper.

### KV: Globally Distributed Key-Value Store

KV is ideal for config, cache, sessions — read-heavy, write-light data:

```typescript
// Write
await env.MY_KV.put("config:theme", "dark");

// Read (global edge, typically < 10ms)
const theme = await env.MY_KV.get("config:theme");
```

---

## Quick Start: Deploy Your First Project in 5 Minutes

### Prerequisites

- Node.js 18+
- A Cloudflare account (free to sign up)

### Step 1: Install Wrangler CLI

```bash
npm install -g wrangler
```

Wrangler is Cloudflare's official CLI for creating, developing, and deploying projects.

### Step 2: Log in

```bash
wrangler login
```

This opens your browser for authorization.

### Step 3: Create a project

```bash
npm create cloudflare@latest my-app
```

The interactive menu lets you choose a template. For beginners, pick **Hello World (TypeScript)**.

### Step 4: Local development

```bash
cd my-app
wrangler dev
```

Open `http://localhost:8787` to see your Worker running locally. Code changes refresh instantly.

### Step 5: Deploy

```bash
wrangler deploy
```

A few seconds later, your app is live on 300+ edge nodes. The terminal outputs your production URL.

---

## A Real-World Example: API + Database + File Storage

Say you're building a simple "image sharing" app. Here's how the architecture looks:

```
Frontend (React) → Deployed on Cloudflare Pages
    ↓
API (Workers) → Handles uploads and queries
    ↓
Images → R2 Storage
Metadata → D1 Database
```

Workers code example:

```typescript
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/upload" && request.method === "POST") {
      const formData = await request.formData();
      const file = formData.get("image");
      const id = crypto.randomUUID();

      // Store image in R2
      await env.IMAGES.put(id, file.stream());

      // Store metadata in D1
      await env.DB.prepare(
        "INSERT INTO images (id, name, created_at) VALUES (?, ?, ?)"
      ).bind(id, file.name, new Date().toISOString()).run();

      return Response.json({ id, url: `/images/${id}` });
    }

    if (url.pathname.startsWith("/images/")) {
      const id = url.pathname.split("/")[2];
      const object = await env.IMAGES.get(id);
      if (!object) return new Response("Not found", { status: 404 });
      return new Response(object.body);
    }

    return new Response("Image Share API", { status: 200 });
  },
};
```

That's a complete backend — no servers, no Nginx, no Docker. Push and it's live.

---

## When to Use Cloudflare

**Great for:**
- Personal projects, side projects, MVP validation
- Static sites + lightweight API full-stack apps
- Apps that need global speed (blogs, docs, SaaS landing pages)
- File-heavy apps (leveraging R2's zero egress fees)
- Webhook handlers, cron jobs, API gateways

**Not ideal for:**
- Long-running tasks (Workers have CPU time limits — 10ms free, 30s paid)
- Apps needing complex relational databases (D1 is SQLite, not PostgreSQL)
- Apps requiring persistent WebSocket connections (needs Durable Objects, more complex)
- Projects that need Python/Java backends (Workers primarily supports JS/TS)

---

## Pricing Overview

| Product | Free Tier | Paid ($5/mo+) |
|---------|-----------|---------------|
| Workers | 100K req/day | 10M req/month |
| Pages | Unlimited sites | Unlimited |
| D1 | 5 GB storage | Pay-per-use |
| R2 | 10 GB storage | $0.015/GB/mo |
| KV | 100K reads/day | Pay-per-use |

For individual developers and small projects, the free tier is usually more than enough. The Workers paid plan starts at $5/month, unlocking higher limits and longer CPU execution time.

---

## Pairing with AI Coding Tools

Cloudflare and AI coding tools are natural companions:

- **Write code with [Cursor](/en/tool/cursor) or [Windsurf](/en/tool/windsurf)** → Deploy frontend with Pages in one click
- **Generate Workers with [Claude Code](/en/tool/claude-code)** → Ship with a single `wrangler deploy`
- **Build full-stack with [Cline](/en/tool/cline)** → Workers + D1 + R2 for a complete backend

AI writes the code, Cloudflare runs the code — from idea to production can be remarkably fast.

---

## FAQ

### Q: How are Cloudflare Workers different from Vercel Serverless Functions?

Workers use V8 isolates (not containers), giving them ultra-fast cold starts (< 5ms). Vercel Functions are built on AWS Lambda — more full-featured but slower to cold start. Workers have a more generous free tier (100K/day vs Vercel's limited quota), but the runtime isn't full Node.js, so some Node.js APIs are unavailable.

### Q: I already use Vercel for my frontend. Do I need Cloudflare too?

They work well together. For example, deploy your frontend on Vercel but use Cloudflare R2 for file storage (saving on egress fees), and use Cloudflare for DNS and CDN acceleration.

### Q: What languages do Workers support?

Primarily JavaScript and TypeScript. You can also run Rust, C, and C++ through WebAssembly. Python and Java are not directly supported.

### Q: Is D1 production-ready?

D1 is GA (Generally Available) and suitable for small-to-medium projects. However, it's SQLite under the hood and doesn't support complex transactions or high-concurrency writes. For PostgreSQL-level capabilities, consider Supabase or Neon.

### Q: What happens when I exceed the free tier?

You won't be charged automatically. Requests will return errors, and you'll need to upgrade to a paid plan to restore service. You can set up usage alerts in the Dashboard.
