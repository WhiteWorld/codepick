---
title: "Cue vs Muse vs Grok Bot (2026): Life Agents, a Personal Steward, or Work Teammates?"
description: "Fact-checked 2026-09-29: Manus Cue, Meta Muse, and Grok Bot on buyers, collaboration, identity, runtime, approvals, price, and regions. Cue is the personal life app announced with Manus 2.0 on September 28, not heycue.io."
date: "2026-09-29"
tags: ["cue", "manus", "muse-ai", "grok-bot", "ai-agent", "comparison"]
pillar: compare
content_status: keep
locale_strategy: mirrored
draft: false
---

> **Fact-checked September 29, 2026.** Cue was announced with Manus 2.0 on September 28, 2026. Muse and Grok Bot are still in their launch window. This comparison only treats published capabilities as facts. Where a price, quota, or security architecture is missing, it stays unknown.

Cue, Meta Muse, and Grok Bot all keep working after you close the app. They are aimed at different buyers:

- **Cue** and **Muse** are for personal life: bookings, travel, shopping, and household admin.
- **Grok Bot** is for standing roles inside a company: engineering, sales, operations, and governed teams.

Cue and Muse split on identity. Cue gives each agent its own phone number, email, wallet, and computer. Muse is one personal steward on a Muse Secure VM, with an independent Sentinel governing egress and connectors. Grok Bot splits on roles, Routines, and enterprise governance. Bots under one user share a single cloud computer, so a separate Bot is not a security boundary.

The short version: **for life admin where the agent should have its own contact identity, start with Cue; for one long-term personal steward with a published approval boundary, start with Muse; for standing company work by role, start with Grok Bot.** A closer two-way piece on the last two is [Grok Bot vs Muse AI (2026)](/en/compare/grok-bot-vs-muse-ai-2026/).

## Quick comparison

| Dimension | Cue (Manus) | Meta Muse | Grok Bot |
|---|---|---|---|
| Product model | Several personal life agents, each with its own identity | One personal steward that keeps learning about you | A roster of persistent work teammates |
| Vendor | Manus, on the same infrastructure as Manus | Meta | SpaceXAI / xAI, with Cursor identity and billing |
| Announced | September 28, 2026, with Manus 2.0 | Rollout began September 8, 2026 | Beta August 11, 2026; enterprise capabilities September 3 |
| Primary buyer | Personal life admin | Individuals and households | Developers, business teams, enterprises |
| Agent structure | Multiple agents in one group chat, with handoffs | One main Muse, plus side chats and subagents | Role-specific Bots that can collaborate in group chat |
| Outward identity | Each agent has its own email, phone, wallet, and computer | Acts through accounts the user connects; the model does not see real passwords or payment details | Uses logins and files on the user's cloud computer; those credentials are available to every Bot that user creates |
| Runtime | Official post: each agent has its own computer. Isolation and hosting region are unpublished | One Muse Secure VM per user | One Firecracker cloud computer per user; that user's Bots share it |
| Surfaces | Web, desktop, and mobile; iOS after App Store review | iOS, Android, and muse.ai; conversation also works in WhatsApp. AI glasses planned | macOS / Windows / Linux and iOS / Android |
| Current price | Early access, free with an invite code. Later monthly price and quota unpublished | Most everyday use is free. Subscription prices and quotas are not in the launch post | No standalone plan. Included with paid Cursor, Teams, or an eligible SuperGrok / X Premium+ link |
| Regional reality | The official blog has no country list. A domestic China product is still in preparation, per Manus that day | The September 8 post says a US launch. A September 18 report says Canada is open | Cloud computers currently run in the US. No self-hosting |

---

## Separate the names first

These products are easy to mix up by name.

- **Cue in this article** is the standalone Manus app announced on September 28, 2026 with Manus 2.0, for personal life agents. The primary source is the section “Cue: A new app from Manus” in [Introducing Manus 2.0](https://manus.im/blog/introducing-manus-2-0). The desktop voice agent at heycue.io, the cueai.app planner, Cuedesk support bots, the Muse Wearables Cue band, and the MeetCue dating app on the App Store are different products. The invite code MEETCUE has nothing to do with MeetCue.
- **Manus itself** remains the research, office, and creation product: Studio, documents, code, video, games, and a purchasable Cloud Computer. Cue is a separate app that Manus says is built on the same infrastructure. The Manus 2.0 video editor and multiplayer game servers belong to Manus, not to Cue's feature list.
- **Grok Bot** is the persistent agent that operates browsers, files, terminals, and connected apps. The Grok chat inside X and the terminal coding tool Grok Build are different entry points.
- **Muse in this article** is Meta's personal agent announced on September 8. Muse Spark is the model. Muse Code is the coding tool.

The decision is who you hand the work to: life admin to agents with their own identities, life admin to one personal steward, or standing company work to a roster of role-based teammates.

## Product model

### Cue: each agent acts under its own identity

Cue is a standalone app for phone and desktop. Manus says it is built on the same infrastructure as Manus. The published instruction is: give it a cue, and it gets to work.

Three parts of the model are public.

First, every agent gets its own email, phone number, wallet, and computer. It can send messages, pay within a budget you set, and finish the task on its own machine. It can also take your calls and leave a summary in Cue.

Second, several agents can share a group chat and hand work to each other. The official example is a New York launch: one agent researches venues, another makes a shortlist, a third drafts the deck. You set the direction and make the final call.

Third, it can use everyday services around you. The official example is a restaurant QR code: the agent can order for you or hold your place in line.

The Manus product continues to cover research, office work, and development. Cue sits on the personal-life side. Bookings, travel, shopping, and household chores match that positioning. The official blog does not list repositories, CI, or enterprise audit as Cue scenarios.

Source: [Introducing Manus 2.0](https://manus.im/blog/introducing-manus-2-0). Chinese coverage: [AIHub](https://www.aihub.cn/news/manus-cue/) and [IT Home](https://www.ithome.com/1/008/064.htm). Capabilities that appear in that coverage but not in the Cue section of the English blog are marked below.

### Muse: one person, one long-term steward

Muse keeps the relationship in one main agent. There is a persistent primary conversation, with side chats for projects that need separate context. It maintains goals, memory, and an activity log, and it keeps moving work when the calendar or outside conditions change. You can name it, change how it looks, and turn proactive messages down or off.

Meta's examples are personal: read school email and add dates to a family calendar; build a shopping list and cart, then wait for purchase approval; book restaurants, plan travel, and fill forms; track bills, try to negotiate a lower price, or help sell a car; adjust a training plan as sleep and schedule change. Muse can also write code, use a terminal, and launch subagents. The product center is still one agent learning one person.

Sources: [Introducing Muse](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/) and [How We Designed Muse](https://introducing.muse.ai/).

### Grok Bot: define the role, then keep assigning work

Grok Bot's main surface is a Bot roster. A sales assistant, procurement analyst, bug investigator, and research lead can each be a Bot. Each one has a name, role, conversation, and durable context. The design post gives practical limits of about 50 Bots per account and six Bots per group chat.

The core objects are Bots, Chats, Prompts / Skills / Routines, Tools, and Artifacts. A one-off instruction can become a Skill, or a Routine started by a schedule, webhook, Git event, or Slack message. Work continues after you leave, and the Bot comes back when it needs a decision.

That fits standing responsibilities: review account health and draft follow-ups each morning; turn webinar Q&A into notes for sales; watch vendor renewals; follow PRs, failing checks, and security findings until a person reviews them; let specialized Bots hand work across a group chat.

Sources: [Introducing Grok Bot](https://x.ai/news/introducing-grok-bot), [Designing Grok Bot](https://x.ai/news/designing-grok-bot), and [Grok Bot for Enterprise](https://x.ai/news/grok-bot-for-enterprise).

## Automation and collaboration

All three keep working after the app closes. They organize that work differently.

**Cue** publishes group-chat handoffs, plus ordering or holding a place after a restaurant QR scan. The official blog does not describe schedules, webhooks, or Git events for Cue. Manus 2.0 Automations — a new email, an ads change, a calendar event, Slack, Notion — are in the Manus section of the same post. They are not evidence that Cue already has those triggers. Chinese coverage also mentions saving repeated steps as routines and connecting services such as Gmail and Trip.com. Those details are absent from the Cue section of the English blog, so this article treats them as unverified by the primary announcement.

**Muse** keeps continuity on one person. One agent can remember a household, preferences, and goals without a role picker. It can come back because a goal or a situation changed, not only because a predefined workflow fired. Email, calendar, browsing, forms, and purchases are one path. The interface is messaging, including WhatsApp.

**Grok Bot** keeps continuity on roles. Research, engineering, and sales can each have a Bot, so memory does not pile into one chat. Routines can start from a schedule, webhook, issue, PR, CI failure, or Slack message. Bots can hand work off in a group chat. Teams and Enterprise expose team rules and template-sharing policy. Enterprise adds network controls, SCIM, audit logs, and Action Recording.

“Don’t miss my child’s registration deadline” is closer to Cue and Muse. “Who owns the weekly vendor audit, and who hands the result to the engineering Bot?” is closer to Grok Bot. Between Cue and Muse, the next question is whether you want several outward identities or one steward.

## Identity and runtime

All three give the agent a computer in the cloud. The public record disagrees on who owns that computer and who the outside world sees.

**Cue** puts identity in the product: each agent's own email, phone, wallet, and computer. It can message, pay inside a budget you set, take calls, and leave a summary. The post does not say whether those computers are isolated virtual machines, and it does not say whether they are the same product as the Cloud Computer you can buy in Manus 2.0. In the announcement, Cloud Computer is an environment purchased for a game server or a long-running automation. Cue's “computer” is listed as part of each agent's identity. Until Manus publishes how the two relate, they are two different passages in the same post.

**Muse** gives each person one Muse Secure VM. The agent, the browser, and the data for connected services live on that machine. Security services and credential storage sit apart from the main agent's runtime. Outbound actions go through Sentinel. One user maps to one main steward. The public materials do not assign that steward its own phone number.

**Grok Bot** gives each user one Firecracker microVM, isolated from other users. Every Bot that user creates shares the files, browser sessions, and command-line credentials on that computer. The docs say separate Bots are not a permission boundary. A separate computer and credential set means a separate Cursor user.

## Security, approvals, and privacy

An agent that can read private data, consume untrusted pages, and send messages or payments has the usual prompt-injection and exfiltration risks. None of the three vendors says those risks are gone. The useful comparison is how far the public write-up draws the boundary.

### Cue: a budget and a final call are public; a security architecture is not

The official blog names two places a person stays in the loop: payments stay inside a budget you set, and in a group chat you set the direction and make the final call. It does not publish an architecture at the level of Muse's Sentinel write-up or Grok Bot's security docs. Whether agents are isolated from each other, where credentials live, whether conversations are used for training by default, which country holds the data, and how prompt injection is blocked are all unknown.

“Each agent has its own computer” does not establish that the agents cannot see each other, and it does not establish that Manus staff cannot reach those inboxes and wallets. Chinese coverage describes user-set access and actions that require personal approval. That is secondary reporting, not an architecture section in the English blog. Those points stay unknown until Manus publishes a security document.

### Muse: the approval and credential boundary is more specific

Each person gets a Secure VM. The main model does not see real passwords or payment details. Connector actions and network egress are decided by an independent Sentinel. When a confirmation is required, the approval dialog is in the client, not a question Muse asks itself in chat.

The public controls also include runtime container isolation, least-privilege connectors, credential surrogation, prompt-injection classifiers, tainted-data tracking, pausing the agent during browser takeover, and single-use cards bound to a merchant and an amount. Link, built by Stripe, is the published purchase-protection path. Shop Pay and 1Password were still listed as coming soon at launch.

The limits belong in the same paragraph:

- Meta says Muse will still make mistakes, and that prompt injection remains an open problem.
- Internal access is restricted by policy. Meta can still access data when needed to support, secure, or operate the service.
- Conversations and agent trajectories, after key personal information is removed, may be used for training by default. Users can opt out in settings.
- The launch post separately says Muse conversations and data in the VM are not shared with Meta's ad systems.
- Muse Confidential VM, where even Meta cannot access the VM, is planned for later this year. It is not the current default.

Sources: [How We Built Safety Into Muse](https://security.muse.ai/) and the [launch post](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/).

### Grok Bot: stronger enterprise governance, and a Bot is not a security boundary

Firecracker microVMs isolate one user from another. Bots belonging to the same user share the computer, so files and logins are not split per Bot.

Four other constraints show up in a security review:

1. Grok Bot requires cloud data storage and does not support Cursor Legacy Privacy Mode.
2. Privacy and training opt-out follow the Cursor account settings.
3. Destination allowlists require Enterprise Network Controls. Self-serve Teams cannot set them. With no policy, the network defaults to allow-all.
4. Cloud computers currently run in the United States. On-premises, bring-your-own-image, and self-hosted deployments are not supported.

Enterprise offers a path for identity, network policy, approvals, logs, and SIEM export. A team that buys Enterprise and configures it gets a more complete governance path than a typical consumer agent. Sources: [approvals, security, and privacy](https://docs.x.ai/grok-bot/approvals-security-and-privacy), the [security FAQ](https://docs.x.ai/grok-bot/security-faq), and [teams and enterprises](https://docs.x.ai/grok-bot/teams-and-enterprises).

## Pricing and availability

### Cue

Early access is free with an invite code. The official starter code is MEETCUE, limited and first-come, first-served. People who get in also receive extra codes to share. The English blog does not publish a headcount. IT Home reported a cap of the first 1,000 people the same day. That number is not in the English announcement, so this article does not treat it as a confirmed limit.

Price, quota, and tiers after early access: **unknown**. Manus has not published them.

The announcement says web, desktop, and mobile are available, with iOS coming after App Store review. It says “mobile” and does not separately confirm an Android store listing.

### Muse

The launch post says most everyday use is free, with subscriptions for people who want to do more. **As of September 29, 2026, that post does not publish a monthly price, a quota, or tier differences.** Dollar prices and weekly token counts in community write-ups are not used here.

The September 8 rollout was the United States, on iOS, Android, and muse.ai, with conversation also available in WhatsApp. AI glasses are still “coming soon.” On September 18, [iPhone in Canada](https://www.iphoneincanada.ca/2026/09/18/metas-muse-ai-agent-is-now-available-in-canada/) reported a public Meta post saying Canada was open. Meta's help center had not published a full country list on the fact-check date. Opening muse.ai does not mean an account is in the current rollout.

### Grok Bot

There is no standalone Grok Bot subscription. Access comes through one of these:

- Cursor Pro, Pro+, or Ultra;
- Cursor Teams, where every member on a self-serve plan has access without an extra Premium seat;
- Cursor Enterprise, which an account executive enables;
- a linked individual SuperGrok, SuperGrok Plus, SuperGrok Heavy, or X Premium+ account;
- a one-time trial credit. The trial is drawn down by usage, and a 7-day window also applies. Used credit is not restored.

On the fact-check date, the [Cursor pricing page](https://cursor.com/pricing) listed individual Pro from **$20/month**, Teams from **$40/user/month**, and Enterprise as custom. Included usage resets weekly. After it runs out, on-demand usage can continue through Cursor when enabled. A Cursor plan and a SuperGrok / X Premium+ link do not stack. The plans page describes each tier as “weekly,” “generous,” or “highest” usage and does not publish a fixed step or token cap, so those caps stay unpublished here.

Source: [Grok Bot plans and billing](https://cursor.com/help/grok-bot/plans).

## Mainland China

None of the three is a product you can treat as ready for everyday use in mainland China.

- **Cue.** The English blog has no country list, and it does not say whether mainland networks, payments, or phone numbers work. On September 28, 2026, IT Home reported that Manus is assembling a team for a domestic product and that work with Chinese model vendors is underway. The same report says Manus 2.0 was announced for users outside China, with a domestic version still in preparation. Until that product ships, Cue is not a stable mainland option.
- **Muse.** The launch post says the United States. Canada comes from a later report citing a Meta post, not from the launch post itself. Mainland China is outside the published footprint.
- **Grok Bot.** Cloud computers run in the United States, with no self-hosted option. Account, subscription, network, and third-party login conditions all affect access.

All three can touch email, calendars, files, or payments. Cross-border enterprise data needs the contract and the real network path. For a first try, use disposable organizing and drafting tasks. Leave the primary inbox, production systems, and payment methods until the permission boundary is clear.

## Which one to choose

### Choose Cue if you:

- need bookings, travel, shopping, line-holding, and household admin, rather than standing company workflows;
- care that an agent has its own email, phone, wallet, and computer, and can message, take calls, and pay inside a budget;
- are willing to split work across a group chat of agents and keep the final call;
- accept invite-only early access, and accept that the security architecture, quotas, and mainland availability are still unpublished.

### Choose Muse if you:

- want one steward that learns you over time, rather than a set of agents that each contact the outside world;
- mainly need email, calendars, travel, shopping, family logistics, and long-term goals;
- care about hidden credentials, Sentinel approvals, and a readable activity trail;
- want to start on the free everyday tier, and you are in the United States or have confirmed access in a later region such as Canada.

### Choose Grok Bot if you:

- want separate agents for sales, operations, and engineering;
- need standing work driven by a schedule, webhook, Git, or Slack;
- already subscribe to Cursor, an eligible SuperGrok plan, or X Premium+;
- need teams, SSO, network limits, and audit logs;
- accept execution on Cursor-hosted cloud computers in the United States, and remember that Bots on one account share that computer.

### Choose none of them if you:

- require local or self-hosted deployment;
- cannot put sensitive data in a third-party cloud;
- need mainland China availability that is already settled;
- cannot tolerate launch-stage changes and agent mistakes.

## Verdict

Cue and Muse are both personal life agents. Cue's published difference is a phone, email, wallet, and computer for each agent. Muse's published difference is one steward, with a more specific Secure VM and Sentinel design. Grok Bot is a different kind of product: persistent work teammates with roles, richer Routines, and enterprise governance, sharing one cloud computer per user.

**For life admin that needs an outward identity, look at Cue's invite preview. For personal admin where the approval and credential boundary has to be readable, choose Muse. For company workflows and role split, choose Grok Bot.** Cue's monthly price, quotas, whether agents are isolated from each other, and where the data sits are still unpublished. Those gaps stay unknown.

The closer two-way comparison of Grok Bot and Muse is [Grok Bot vs Muse AI (2026)](/en/compare/grok-bot-vs-muse-ai-2026/).

---

*Last fact-check: September 29, 2026. Cue's primary source is the official Manus 2.0 blog. The mainland-China statement comes from IT Home's report of Manus's comments that day. Muse comes from Meta's launch, security, and design pages; the Canada expansion comes from a report citing a public Meta post. Grok Bot comes from xAI / Cursor docs and the pricing page checked that day. Unpublished prices and quotas stay unknown.*
