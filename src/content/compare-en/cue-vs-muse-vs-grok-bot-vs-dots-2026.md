---
title: "Cue vs Muse vs Grok Bot vs Dots (2026): Four Persistent Agents"
description: "Fact-checked 2026-09-30: Manus Cue, Meta Muse, Grok Bot, and OpenAI Dots on buyers, collaboration, identity, runtime, approvals, price, and regions. Dots is the always-on ChatGPT agent announced at DevDay on September 29. Cue is Manus's personal life app, not heycue.io."
date: "2026-09-30"
tags: ["cue", "manus", "muse-ai", "grok-bot", "dots", "openai", "ai-agent", "comparison"]
pillar: compare
content_status: keep
locale_strategy: mirrored
draft: false
---

> **Fact-checked September 30, 2026.** Cue was announced with Manus 2.0 on September 28, 2026. OpenAI Dots was announced at DevDay on September 29, 2026. Muse and Grok Bot are still in their launch window. This comparison only treats published capabilities as facts. Where a price, quota, or security architecture is missing, it stays unknown.

Cue, Meta Muse, Grok Bot, and OpenAI Dots all keep working after you close the app. The buyer and the handoff are different:

- **Cue** and **Muse** are for personal life: bookings, travel, shopping, and household admin.
- **Dots** is closer to Muse's one long-lived steward, but it lives in ChatGPT and Codex. OpenAI's examples mix work materials and personal logistics.
- **Grok Bot** is for standing roles inside a company: engineering, sales, operations, and governed teams.

Identity differs too. Cue gives each agent its own phone number, email, wallet, and computer. Muse is one steward on a Muse Secure VM, with an independent Sentinel governing egress and connectors. Dots starts as **one primary dot** with its own cloud computer and browser, and it keeps work moving through connected apps and Codex. The public materials do not give that dot a phone, email, or wallet. Grok Bot splits on roles, Routines, and enterprise governance. Bots under one user share a single cloud computer, so a separate Bot is not a security boundary.

The short version: **for life admin where the agent should have its own contact identity, start with Cue; for a personal steward with a more specific approval boundary, start with Muse; if you already live in ChatGPT / Codex and want one always-on steward, start with Dots; for standing company work by role, start with Grok Bot.** A closer two-way piece on Grok Bot and Muse is [Grok Bot vs Muse AI (2026)](/en/compare/grok-bot-vs-muse-ai-2026/).

## Quick comparison

| Dimension | Cue (Manus) | Meta Muse | OpenAI Dots | Grok Bot |
|---|---|---|---|---|
| Product model | Several personal life agents, each with its own identity | One personal steward that keeps learning about you | One always-on steward inside ChatGPT | A roster of persistent work teammates |
| Vendor | Manus, on the same infrastructure as Manus | Meta | OpenAI; the model is GPT-6 Astra | SpaceXAI / xAI, with Cursor identity and billing |
| Announced | September 28, 2026, with Manus 2.0 | Rollout began September 8, 2026 | September 29, 2026, at DevDay | Beta August 11, 2026; enterprise capabilities September 3 |
| Primary buyer | Personal life admin | Individuals and households | People and teams already in ChatGPT / Codex | Developers, business teams, enterprises |
| Agent structure | Multiple agents in one group chat, with handoffs | One main Muse, plus side chats and subagents | One primary dot today. Teams of dots are a later vision | Role-specific Bots that can collaborate in group chat |
| Outward identity | Each agent has its own email, phone, wallet, and computer | Acts through accounts the user connects; the model does not see real passwords or payment details | A ChatGPT handle such as @name-dot. No published phone, email, or wallet of its own | Uses logins and files on the user's cloud computer; those credentials are available to every Bot that user creates |
| Runtime | Official post: each agent has its own computer. Isolation and hosting region are unpublished | One Muse Secure VM per user | One cloud computer and browser per dot. One local computer can be connected optionally | One Firecracker cloud computer per user; that user's Bots share it |
| Surfaces | Web, desktop, and mobile; iOS after App Store review | iOS, Android, and muse.ai; conversation also works in WhatsApp. AI glasses planned | Create on desktop first. Later: mobile app, Slack, and Teams. Texting is not live yet | macOS / Windows / Linux and iOS / Android |
| Current price | Early access, free with an invite code. Later monthly price and quota unpublished | Most everyday use is free. Subscription prices and quotas are not in the launch post | Included with Pro 100 / 200 / 500 and Business Premium. A separate Dots monthly price is unpublished | No standalone plan. Included with paid Cursor, Teams, or an eligible SuperGrok / X Premium+ link |
| Regional reality | The official blog has no country list. A domestic China product is still in preparation, per Manus that day | The September 8 post says a US launch. A September 18 report says Canada is open | Pro is 18+ and outside the EEA, the UK, and Switzerland. Business Premium and Enterprise are described as rolling out worldwide | Cloud computers currently run in the US. No self-hosting |

---

## Separate the names first

These products are easy to mix up by name.

- **Cue in this article** is the standalone Manus app announced on September 28, 2026 with Manus 2.0, for personal life agents. The primary source is the section “Cue: A new app from Manus” in [Introducing Manus 2.0](https://manus.im/blog/introducing-manus-2-0). The desktop voice agent at heycue.io, the cueai.app planner, Cuedesk support bots, the Muse Wearables Cue band, and the MeetCue dating app on the App Store are different products. The invite code MEETCUE has nothing to do with MeetCue.
- **Manus itself** remains the research, office, and creation product: Studio, documents, code, video, games, and a purchasable Cloud Computer. Cue is a separate app that Manus says is built on the same infrastructure. The Manus 2.0 video editor and multiplayer game servers belong to Manus, not to Cue's feature list.
- **Dots in this article** is the always-on ChatGPT agent OpenAI announced at DevDay on September 29, 2026. The product page is [chatgpt.com/features/dots](https://chatgpt.com/features/dots/). [TechCrunch](https://techcrunch.com/2026/09/29/the-internet-is-convinced-elon-musks-xai-trolled-openais-dots-launch/) notes that dot.com redirects to a Grok download page. That domain is not this product.
- **Grok Bot** is the persistent agent that operates browsers, files, terminals, and connected apps. The Grok chat inside X and the terminal coding tool Grok Build are different entry points.
- **Muse in this article** is Meta's personal agent announced on September 8. Muse Spark is the model. Muse Code is the coding tool.

The decision is who you hand the work to: life admin to agents with their own identities, life admin to one personal steward, ongoing work to the one dot inside ChatGPT, or standing company work to a roster of role-based teammates.

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

Sources: [Introducing Muse](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/) and [How We Designed Muse](https://introducing.muse.ai/). The role-roster contrast with Grok Bot is in the two-way article linked at the end. This piece does not repeat that write-up.

### Dots: one always-on steward inside ChatGPT

Dots runs on GPT-6 Astra. The docs say it lives in the cloud, with its own computer and browser, and can keep working when your computer is off. It uses relevant context from past conversations and your preferences to research, analyze data, prepare documents, and build software.

Today you start with one primary dot. You can name it and change how it looks. The name becomes a handle: a dot named Alfred can be @tibo-alfred. The docs say you reach the same dot in ChatGPT, Slack, Teams, or a call. Changing the channel does not start a new dot or reset its memory. [TechCrunch](https://techcrunch.com/2026/09/29/openai-launches-dots-its-bubbly-agentic-avatar/) quotes OpenAI: start with the primary dot today; over time, teams of dots working together. That team is not a feature you can buy now.

A dot starts from ChatGPT memory, then uses Codex and connected tools. Between conversations it tracks progress and works out the next step. You can also ask for a scheduled check in a named time zone, for a stated duration. Background agents can work on several things in parallel. On Codex, it can create Work or Codex tasks, continue existing local Codex tasks, and use a Codex cloud environment you have already created. Those tasks count toward Work or Codex usage. Conversations with the dot do not count toward ChatGPT usage limits.

The published examples cross work and life: a launch email still promises a feature that moved out of scope, and the dot prepares edits for review; a finance review overlaps a child's recital, and the dot finds another time, then moves the meeting after you agree; a deck is updated from customer feedback; a repeated customer request becomes a tested change waiting for engineering review; dinner options arrive with delivery times and full totals, and the order is placed only after you approve.

You create the dot in the ChatGPT desktop app or a desktop browser. The mobile app follows when its update is available. Mobile web is not supported. After setup you can message or call it in ChatGPT, and you can also reach it in Slack and Teams. Texting is listed as coming next, and it was not live on the fact-check date.

Sources: [Dots product page](https://chatgpt.com/features/dots/), [Meet dots](https://learn.chatgpt.com/docs/dots), and [TechCrunch's launch piece](https://techcrunch.com/2026/09/29/openai-launches-dots-its-bubbly-agentic-avatar/).

### Grok Bot: define the role, then keep assigning work

Grok Bot's main surface is a Bot roster. A sales assistant, procurement analyst, bug investigator, and research lead can each be a Bot. Each one has a name, role, conversation, and durable context. The design post gives practical limits of about 50 Bots per account and six Bots per group chat.

The core objects are Bots, Chats, Prompts / Skills / Routines, Tools, and Artifacts. A one-off instruction can become a Skill, or a Routine started by a schedule, webhook, Git event, or Slack message. Work continues after you leave, and the Bot comes back when it needs a decision.

That fits standing responsibilities: review account health and draft follow-ups each morning; turn webinar Q&A into notes for sales; watch vendor renewals; follow PRs, failing checks, and security findings until a person reviews them; let specialized Bots hand work across a group chat.

Sources: [Introducing Grok Bot](https://x.ai/news/introducing-grok-bot), [Designing Grok Bot](https://x.ai/news/designing-grok-bot), and [Grok Bot for Enterprise](https://x.ai/news/grok-bot-for-enterprise).

## Automation and collaboration

All four keep working after the app closes. They organize that work differently.

**Cue** publishes group-chat handoffs, plus ordering or holding a place after a restaurant QR scan. The official blog does not describe schedules, webhooks, or Git events for Cue. Manus 2.0 Automations — a new email, an ads change, a calendar event, Slack, Notion — are in the Manus section of the same post. They are not evidence that Cue already has those triggers. Chinese coverage also mentions saving repeated steps as routines and connecting services such as Gmail and Trip.com. Those details are absent from the Cue section of the English blog, so this article treats them as unverified by the primary announcement.

**Muse** keeps continuity on one person. One agent can remember a household, preferences, and goals without a role picker. It can come back because a goal or a situation changed, not only because a predefined workflow fired. Email, calendar, browsing, forms, and purchases are one path. The interface is messaging, including WhatsApp.

**Dots** also keeps continuity on one person, on the ChatGPT side. It continues between conversations and can run background agents in parallel. Proactive research uses read-only tools on apps you have connected: those tools cannot send messages, change app content, or control a browser or computer. Follow-up actions still need permission. You can say whether updates belong in ChatGPT or Slack. A scheduled check happens only if you name a time zone and an end date, and the dot confirms the schedule. The docs do not list webhooks, Git events, or a Bot roster as Dots triggers.

**Grok Bot** keeps continuity on roles. Research, engineering, and sales can each have a Bot, so memory does not pile into one chat. Routines can start from a schedule, webhook, issue, PR, CI failure, or Slack message. Bots can hand work off in a group chat. Teams and Enterprise expose team rules and template-sharing policy. Enterprise adds network controls, SCIM, audit logs, and Action Recording.

“Don’t miss my child’s registration deadline” is closer to Cue, Muse, and the calendar and dinner examples in the Dots docs. “Who owns the weekly vendor audit, and who hands the result to the engineering Bot?” is closer to Grok Bot. Between Cue and the other three, the next question is whether you want several outward identities or one steward.

## Identity and runtime

All four give the agent a computer in the cloud. The public record disagrees on who owns that computer and who the outside world sees.

**Cue** puts identity in the product: each agent's own email, phone, wallet, and computer. It can message, pay inside a budget you set, take calls, and leave a summary. The post does not say whether those computers are isolated virtual machines, and it does not say whether they are the same product as the Cloud Computer you can buy in Manus 2.0. In the announcement, Cloud Computer is an environment purchased for a game server or a long-running automation. Cue's “computer” is listed as part of each agent's identity. Until Manus publishes how the two relate, they are two different passages in the same post.

**Muse** gives each person one Muse Secure VM. The agent, the browser, and the data for connected services live on that machine. Security services and credential storage sit apart from the main agent's runtime. Outbound actions go through Sentinel. One user maps to one main steward. The public materials do not assign that steward its own phone number.

**Dots** gives each dot its own cloud computer and browser. Cloud-browser sessions are separate from the browser on your computer. At sign-in, credentials go to the browser outside the conversation. You can also Take over, sign in yourself, and hand control back. Using a saved login for a new sign-in requires your confirmation. You may connect one personal computer: only one at a time, and the ChatGPT app must be open on a machine that is online. That permission is separate from connecting a computer to Codex or enabling Work Sync. Adding Slack or Teams only adds a place to talk. It does not connect an inbox or the local computer. The handle is a contact name. The docs do not publish a phone number, mailbox, or wallet for the dot.

**Grok Bot** gives each user one Firecracker microVM, isolated from other users. Every Bot that user creates shares the files, browser sessions, and command-line credentials on that computer. The docs say separate Bots are not a permission boundary. A separate computer and credential set means a separate Cursor user.

## Security, approvals, and privacy

An agent that can read private data, consume untrusted pages, and send messages or payments has the usual prompt-injection and exfiltration risks. None of the four vendors says those risks are gone. The useful comparison is how far the public write-up draws the boundary.

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

### Dots: Custom Rules and an automatic review; password changes stay with you

The product page says actions that could affect your accounts or share information go through Auto-review, checked against your instructions, Custom Rules, and safety requirements. Some need your approval. Steps such as changing a password stay with you. The [controls doc](https://learn.chatgpt.com/docs/dots/controls) describes an automatic review against instructions, permissions, custom rules, and built-in safety requirements. That review decides whether the action proceeds, needs your approval, or includes a step you must do yourself. The two pages describe the same class of check. They do not describe an independent security service at the level of Muse's Sentinel.

Custom Rules live under Settings → Personalization → Permissions. They are optional ongoing boundaries. Four treatments:

- take the action without asking;
- take it when you explicitly say so, and otherwise ask first;
- ask before taking the action;
- hand the action to you.

Rules govern when an action may happen. Tone and update style stay in conversation instructions. A rule does not grant access to an app or computer, does not override built-in safety requirements, and does not remove confirmations such as approval to use a saved login. A workspace can disable Custom Rules. OpenAI says the rules are instructions the dot tries to follow, and that it can still make mistakes.

On data: ChatGPT data controls also apply to eligible conversations with your dot and the work it carries out. OpenAI says it does not train models directly on proactive research or the dot's private notes. If that material becomes part of an eligible conversation or task, your ChatGPT data settings apply. Whether cloud computers are hardware-isolated between users, and which country holds the data, are not in the controls doc. Those points stay unknown. Stopping a task does not undo completed actions. Deleting the dot does not recall messages already sent or changes already made in connected apps.

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

The launch post says most everyday use is free, with subscriptions for people who want to do more. **As of September 30, 2026, the September 8 launch post still does not publish a monthly price, a quota, or tier differences.** Dollar prices and weekly token counts in community write-ups are not used here.

The September 8 rollout was the United States, on iOS, Android, and muse.ai, with conversation also available in WhatsApp. AI glasses are still “coming soon.” On September 18, [iPhone in Canada](https://www.iphoneincanada.ca/2026/09/18/metas-muse-ai-agent-is-now-available-in-canada/) reported a public Meta post saying Canada was open. Meta's help center had not published a full country list on the fact-check date. Opening muse.ai does not mean an account is in the current rollout.

### Dots

The [availability section](https://learn.chatgpt.com/docs/dots) lists Dots as part of existing plans. It does not publish a separate Dots price:

- Pro 100, Pro 200, and Pro 500: users over 18 outside the European Economic Area, the United Kingdom, and Switzerland;
- Business Premium: rolling out worldwide;
- Enterprise: rolling out worldwide, off by default, and a workspace admin must enable it.

An eligible plan does not guarantee the control is visible yet. The doc says the rollout is gradual. Conversations with the dot do not count toward ChatGPT usage limits. Tasks the dot starts or manages in Work or Codex count toward those products' limits. The doc also says the plan includes an allowance for deeper work, with extended limits for the first month after launch. The numbers are unpublished, so they stay **unknown**. The price of a second dot, or of a team of dots, is also unpublished. The names Pro 100 / 200 / 500 are not converted into dollar prices here; this fact-check did not re-read each of those plan prices.

### Grok Bot

There is no standalone Grok Bot subscription. Access comes through one of these:

- Cursor Pro, Pro+, or Ultra;
- Cursor Teams, where every member on a self-serve plan has access without an extra Premium seat;
- Cursor Enterprise, which an account executive enables;
- a linked individual SuperGrok, SuperGrok Plus, SuperGrok Heavy, or X Premium+ account;
- a one-time trial credit. The trial is drawn down by usage, and a 7-day window also applies. Used credit is not restored.

The [Cursor pricing page](https://cursor.com/pricing) checked on September 29, 2026 listed individual Pro from **$20/month**, Teams from **$40/user/month**, and Enterprise as custom. This fact-check did not reload that page. Included usage resets weekly. After it runs out, on-demand usage can continue through Cursor when enabled. A Cursor plan and a SuperGrok / X Premium+ link do not stack. The plans page describes each tier as “weekly,” “generous,” or “highest” usage and does not publish a fixed step or token cap, so those caps stay unpublished here.

Source: [Grok Bot plans and billing](https://cursor.com/help/grok-bot/plans).

## Mainland China

None of the four is a product you can treat as ready for everyday use in mainland China.

- **Cue.** The English blog has no country list, and it does not say whether mainland networks, payments, or phone numbers work. On September 28, 2026, IT Home reported that Manus is assembling a team for a domestic product and that work with Chinese model vendors is underway. The same report says Manus 2.0 was announced for users outside China, with a domestic version still in preparation. Until that product ships, Cue is not a stable mainland option.
- **Muse.** The launch post says the United States. Canada comes from a later report citing a Meta post, not from the launch post itself. Mainland China is outside the published footprint.
- **Dots.** The written Pro footprint is users over 18 outside the EEA, the UK, and Switzerland. Business Premium and Enterprise are “rolling out worldwide,” and the availability page does not name mainland China. Whether a ChatGPT account and network work there is a separate condition. The docs do not describe self-hosting.
- **Grok Bot.** Cloud computers run in the United States, with no self-hosted option. Account, subscription, network, and third-party login conditions all affect access.

All four can touch email, calendars, files, or payments. Cross-border enterprise data needs the contract and the real network path. For a first try, use disposable organizing and drafting tasks. Leave the primary inbox, production systems, and payment methods until the permission boundary is clear.

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

### Choose Dots if you:

- already use ChatGPT and want the same steward to continue through Codex and connected apps;
- want one primary dot, rather than a team of agents that each have a phone number;
- accept Custom Rules and automatic review as the gate on sending, account changes, and sharing;
- are in a Pro region that is open, or your Business Premium / Enterprise workspace has Dots turned on.

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

Cue and Muse are both personal life agents. Cue's published difference is a phone, email, wallet, and computer for each agent. Muse's published difference is one steward, with a more specific Secure VM and Sentinel design. Dots sits on Muse's side of the split: one long-lived steward, but a primary dot inside ChatGPT / Codex, with its own computer and browser, and approvals through Custom Rules and automatic review. Grok Bot remains a different kind of product: persistent work teammates with roles, richer Routines, and enterprise governance, sharing one cloud computer per user.

**For life admin that needs an outward identity, look at Cue's invite preview. For personal admin where the approval and credential boundary has to be readable, choose Muse. If you already work in ChatGPT, check whether Dots is on for your plan and region. For company workflows and role split, choose Grok Bot.** Cue's monthly price and isolation model, Dots' standalone price and deeper-work allowance, and Muse's subscription price are still unpublished. Those gaps stay unknown.

The closer two-way comparison of Grok Bot and Muse is [Grok Bot vs Muse AI (2026)](/en/compare/grok-bot-vs-muse-ai-2026/).

---

*Last fact-check: September 30, 2026. Cue's primary source is the official Manus 2.0 blog. The mainland-China statement comes from IT Home's report of Manus's comments that day. Muse comes from Meta's launch, security, and design pages; the Canada expansion comes from a report citing a public Meta post. Dots comes from the ChatGPT product page, the Learn docs, and TechCrunch's DevDay coverage. Grok Bot comes from xAI / Cursor docs; the public Cursor starting prices are from the pricing page checked on September 29, 2026. Unpublished prices and quotas stay unknown.*
