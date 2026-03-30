---
title: "Supabase for Developers: The Open-Source Firebase Alternative for Your Backend"
description: "A beginner's guide to Supabase: PostgreSQL database, authentication, file storage, real-time subscriptions, and Edge Functions — build a complete backend without managing servers."
date: "2026-03-21"
tags: ["supabase", "backend", "beginner", "database", "BaaS"]
---

You want to build an app. The frontend is done with React or Next.js, but what about the backend? User login, data storage, file uploads, real-time notifications — each is a separate system that takes significant time to build from scratch.

Supabase solves these problems. It's an **open-source Backend-as-a-Service (BaaS) platform** providing databases, authentication, storage, and real-time subscriptions out of the box. Just call the API, and your backend is ready.

Many compare it to Firebase, but Supabase has a key difference: it's built on **PostgreSQL** — a real relational database, not Firebase's NoSQL. This means you can write SQL, do JOIN queries, use foreign key constraints, and model data naturally.

---

## What Can Supabase Do for Developers?

| Your Need | Supabase Feature | Free Tier |
|-----------|-----------------|-----------|
| Store data | PostgreSQL database | 500 MB storage |
| User login/signup | Auth (authentication) | 50K monthly active users |
| Store files/images | Storage (object storage) | 1 GB |
| Real-time data sync | Realtime (WebSocket) | 200 concurrent connections |
| Run backend logic | Edge Functions (Deno) | 500K invocations/mo |
| Auto-generated API | PostgREST | Included with database |
| Vector search | pgvector extension | Included with database |

> 💡 **Key selling point**: Supabase is **fully open-source**. If you don't want to use their hosted service, you can self-host — your data stays entirely in your hands.

---

## Core Features

### PostgreSQL Database: A Real Relational Database

Supabase gives you a full PostgreSQL instance — not a trimmed-down version — with all PostgreSQL features:

```sql
-- Create a table
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  author_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Only authors can edit their own posts
CREATE POLICY "Users can edit own posts" ON posts
  FOR UPDATE USING (auth.uid() = author_id);
```

**Highlights:**
- Full SQL support — JOINs, subqueries, window functions all work
- Built-in Row Level Security (RLS) for database-level access control
- 40+ PostgreSQL extensions (pgvector, PostGIS, pg_cron, etc.)
- Visual Table Editor — manage data without writing code

**Query from the frontend:**

```typescript
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Query
const { data: posts } = await supabase
  .from("posts")
  .select("*, author:auth.users(email)")
  .order("created_at", { ascending: false })
  .limit(10);

// Insert
await supabase.from("posts").insert({
  title: "My first post",
  content: "Hello Supabase!",
});
```

This sounds insecure — querying a database from the frontend? But Supabase protects data through **Row Level Security (RLS)** — only operations matching your policies can execute.

### Auth: Authentication Out of the Box

Supabase Auth supports multiple login methods with just a few lines of code:

```typescript
// Email + password signup
await supabase.auth.signUp({
  email: "user@example.com",
  password: "securepassword",
});

// Email + password login
await supabase.auth.signInWithPassword({
  email: "user@example.com",
  password: "securepassword",
});

// GitHub OAuth login
await supabase.auth.signInWithOAuth({
  provider: "github",
});

// Get current user
const { data: { user } } = await supabase.auth.getUser();
```

**Supported login methods:**
- Email + password
- Magic Link
- OAuth (GitHub, Google, Apple, WeChat, 20+ providers)
- Phone + OTP (requires SMS service configuration)

### Storage: File Storage

Supabase Storage handles files, images, and videos with access control:

```typescript
// Upload a file
await supabase.storage
  .from("avatars")
  .upload("user-123/avatar.png", file);

// Get public URL
const { data } = supabase.storage
  .from("avatars")
  .getPublicUrl("user-123/avatar.png");

// Generate signed private URL (1 hour expiry)
const { data } = await supabase.storage
  .from("documents")
  .createSignedUrl("secret.pdf", 3600);
```

Buckets can be public or private. Private files require signed URLs for access.

### Realtime: Live Data Sync

Supabase provides WebSocket-based real-time subscriptions — database changes are pushed to the frontend instantly:

```typescript
// Listen to all changes on the posts table
const channel = supabase
  .channel("posts-changes")
  .on(
    "postgres_changes",
    { event: "*", schema: "public", table: "posts" },
    (payload) => {
      console.log("Data changed:", payload);
    }
  )
  .subscribe();
```

Perfect for chat apps, collaborative editing, real-time dashboards, and more.

### Edge Functions: Custom Backend Logic

When your needs go beyond database queries (third-party API calls, sending emails, processing payments), use Edge Functions:

```typescript
// supabase/functions/send-welcome-email/index.ts
import { serve } from "https://deno.land/std/http/server.ts";

serve(async (req) => {
  const { email, name } = await req.json();

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "hello@myapp.com",
      to: email,
      subject: `Welcome, ${name}!`,
      html: `<p>Thanks for signing up.</p>`,
    }),
  });

  return new Response(JSON.stringify({ success: true }));
});
```

Edge Functions run on Deno and are deployed to global edge nodes.

---

## Quick Start: Build a Todo App Backend in 10 Minutes

### Step 1: Create a Supabase Project

1. Visit [supabase.com](https://supabase.com) and sign up
2. Click New Project, choose a region (pick one close to your users)
3. Set a database password, wait 1-2 minutes for setup

### Step 2: Create Tables

In the Supabase Dashboard Table Editor, create a `todos` table:

```sql
CREATE TABLE todos (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  is_done BOOLEAN DEFAULT FALSE,
  user_id UUID REFERENCES auth.users(id) DEFAULT auth.uid(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Users can only see their own todos
CREATE POLICY "Users see own todos" ON todos
  FOR SELECT USING (auth.uid() = user_id);

-- Users can only create their own todos
CREATE POLICY "Users create own todos" ON todos
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can only update their own todos
CREATE POLICY "Users update own todos" ON todos
  FOR UPDATE USING (auth.uid() = user_id);
```

### Step 3: Use in Your Frontend

```bash
npm install @supabase/supabase-js
```

```typescript
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xxx.supabase.co",
  "your-anon-key"
);

// Get todos
const { data: todos } = await supabase
  .from("todos")
  .select("*")
  .order("created_at", { ascending: false });

// Add a todo
await supabase.from("todos").insert({ title: "Learn Supabase" });

// Mark as done
await supabase
  .from("todos")
  .update({ is_done: true })
  .eq("id", todoId);
```

From project creation to frontend CRUD — the entire process takes under 10 minutes with zero backend code.

---

## When to Use Supabase

**Great for:**
- Indie developers building full-stack apps (one person handles everything)
- Apps that need user authentication (Auth works out of the box)
- Apps with real-time features (chat, collaboration, notifications)
- Rapid MVP validation (build a complete backend in hours)
- Projects needing a relational database without server management

**Not ideal for:**
- Very large-scale applications (free tier has connection and storage limits)
- Projects with complex backend logic (Edge Functions are limited compared to custom backends)
- Scenarios requiring peak database performance (hosted services have network latency)
- Teams with mature backend architectures (migration costs are high)

---

## Pricing Overview

| | Free | Pro ($25/mo) |
|---|---|---|
| Database storage | 500 MB | 8 GB |
| File storage | 1 GB | 100 GB |
| Bandwidth | 5 GB | 250 GB |
| Edge Functions | 500K/mo | 2M/mo |
| Monthly active users | 50,000 | 100,000 |
| Realtime connections | 200 | 500 |
| Projects | 2 | Unlimited |

> 💡 **Tip**: The free tier's 500 MB database and 50K MAU is plenty for MVPs and small projects. Pro at $25/mo unlocks more capacity and daily automatic backups.

---

## Pairing with AI Coding Tools

Supabase works especially well with AI coding tools because its API is highly standardized, leading to high-quality AI-generated code:

- **Build full-stack apps with [Cursor](/en/tool/cursor)** → Supabase provides the backend, Cursor auto-completes SDK calls
- **Design databases with [Claude Code](/en/tool/claude-code)** → Let AI write your SQL schema and RLS policies
- **Scaffold projects with [Cline](/en/tool/cline)** → From database design to frontend CRUD in one flow

AI writes the code, Supabase handles the backend — a productivity multiplier for indie developers.

---

## FAQ

### Q: How do I choose between Supabase and Firebase?

The biggest difference is the database: Supabase uses PostgreSQL (relational), Firebase uses Firestore (NoSQL). If your data has complex relationships (users → posts → comments), Supabase fits better. For simple document-style data with extreme real-time needs, Firebase works too. Supabase is also open-source, while Firebase is Google's proprietary service.

### Q: Is Supabase free?

The free tier includes 2 projects with 500 MB database, 1 GB file storage, and 50K monthly active users. More than enough for learning and MVPs. Upgrade to Pro ($25/mo) when you need more resources.

### Q: Can I self-host Supabase?

Yes. Supabase is fully open-source, and you can deploy it on your own server with Docker. They provide [docker-compose templates](https://github.com/supabase/supabase/tree/master/docker). Self-hosting means you handle database backups, updates, and other ops yourself.

### Q: Is Row Level Security (RLS) hard to learn?

The concept is simple: set rules on each table controlling who can read, write, update, or delete. The syntax is standard SQL WHERE conditions. Beginners should start with Supabase's visual RLS editor, then move to writing SQL policies once comfortable.

### Q: Can I use Supabase with Vercel?

Absolutely. Next.js on Vercel + Supabase for the backend is one of the most popular full-stack combos for indie developers. Vercel even offers official Supabase integration templates.
