---
title: "Grok Bot Architecture Explained: The Shared Computer, Task Loop, and Security Boundaries"
description: "Follow one concrete task through Grok Bot: a persistent cloud computer per user, bots that share it, and how plugins, computer use, routines, and Auto Review divide the work. Includes diagrams and evidence limits."
date: "2026-09-28"
article_type: explainer
tags: [grok-bot, cursor, spacexai, agent, agent-runtime, computer-use, sandbox]
pillar: stack
content_status: keep
locale_strategy: mirrored
draft: false
faq:
  - q: "Are bots on the same account isolated from each other?"
    a: "No. Each Cursor user has one persistent cloud computer, and every Bot on that account shares its files, browser sessions, and command-line credentials. Each Bot has its own screen, which is a work surface, not a security boundary. A separate computer and credential set requires a separate Cursor user."
  - q: "Does an HTTP 200 from a webhook mean the task is finished?"
    a: "No. The help center says 200 means Grok Bot accepted the call and started a run. It does not mean the instruction is finished. Check that Bot's conversation for the result; on the phone, Run history is another place to look. Any other response means a run did not start."
  - q: "Is Grok Bot the coding agent inside the IDE?"
    a: "No. The public walkthrough puts Grok Bot on the outer loop: it gathers context on its own cloud computer and delegates implementation to a separate Cursor Cloud Agent. The IDE agent is a different coding loop. Teams can also turn Cloud Agent delegation off. Grok Build has no published product boundary that belongs on this diagram."
---

## A Mental Model

**Grok Bot is a set of assistants on a persistent cloud computer. The phone or desktop app is where you send messages, watch, and approve. The work runs on a computer Cursor hosts. Closing the laptop does not stop that work.**

Keep three distinctions in view:

1. **The computer belongs to the user, not to one Bot.** Bots on the same account share files, browser logins, and command-line credentials.
2. **Tools have an order.** Use a plugin or remote MCP when one exists. Use computer use for everything else.
3. **Proposed, approved, and done are different states.** Auto Review and your approval govern the action about to run. They do not undo a side effect that already happened.

Grok Bot is not the Grok chat inside X, and it is not the coding loop inside the IDE. How it compares with Muse as a product choice is a different article: [Grok Bot vs Muse AI (2026)](/en/compare/grok-bot-vs-muse-ai-2026/). For Muse's own runtime, see [Muse Architecture Explained](/en/guides/muse-architecture/).

> Scope: this article was prepared on September 28, 2026. It uses public Cursor and xAI documentation, the official guide [Grok Bot 101](https://x.ai/bot/guides/grok-bot-101), and product statements that are cleared to be written publicly. It does not treat community bug reports as architecture, and it does not describe unpublished internals as fact.

## Architecture: One Computer, Many Bots

[![Grok Bot architecture: one Firecracker cloud computer per user, shared by that user's bots; plugins, computer use, Auto Review, and Cloud Agent delegation are separate responsibilities](/images/guides/grok-bot-architecture-overview-en.svg)](/images/guides/grok-bot-architecture-overview-en.svg)

Open the diagram to enlarge it. Boxes are grouped by responsibility. Arrows are working relationships, not an RPC trace and not a map of machines.

The [Teams documentation](https://cursor.com/docs/grok-bot/teams) describes the desktop and mobile apps as thin clients. Chat, review, and approvals happen on the member's device. Work runs on the hosted computer. Each user gets one computer, implemented as a **Firecracker microVM** with its own kernel, memory, and virtual devices. Isolation between users is hardware-level. One user cannot reach another user's computer.

Inside one user, the boundary changes. The same page says bots isolate personalities and workspaces, not compute. [Computer and apps](https://docs.x.ai/grok-bot/computer-and-apps) adds the operational detail: each Bot has its own screen, so several bots can use the desktop in parallel, while **one Bot runs only one computer-use task at a time**. Those screens are work surfaces.

Read the diagram by responsibility. Do not turn every box into a separate machine:

| Component | What to look for |
|---|---|
| Your device | Tasks, the desktop view, allow or deny, and takeover for sensitive steps |
| Shared cloud computer | Files, browser sessions, CLI credentials; work continues with the laptop closed |
| One Bot's screen | That Bot's desktop actions; one computer-use task at a time |
| Plugins / remote MCP | Account-wide structured tools; the Bot does not receive the OAuth token |
| Auto Review | A separate review model that allows, asks, or denies |
| Cloud Agents | Separate coding computers; Grok Bot can delegate, and a team can turn that off |

The model does not occupy a fixed rack in this picture. The [security documentation](https://cursor.com/docs/grok-bot/security) says Cursor manages model selection, there is no customer-facing model picker, and the serving mix can change, with no fixed vendor set guaranteed. Usage analytics show which model served a request, including failovers. That is a public constraint, not a routing table.

## Follow One Task

Suppose someone tells a Bot: "Turn this week's five follow-ups into drafts in this chat and wait for my approval. Do not send email, and do not change the CRM." The walkthrough is a teaching example, not a production trace.

[![One Grok Bot task: a goal and a stop line reach the shared computer, plugins are preferred over computer use on that Bot's screen, risky actions pass through Auto Review, and sensitive input returns to the user](/images/guides/grok-bot-architecture-loop-en.svg)](/images/guides/grok-bot-architecture-loop-en.svg)

Open the diagram to enlarge it. The order is a way to track responsibilities. It does not claim that every task crosses six separate services.

### 1. Put the Goal and the Stop Line in the Same Message

The runtime needs the outcome and the place it must stop. The sentence above names the artifact (five drafts), where it should land (this chat), and the forbidden actions (no email, no CRM writes).

The docs put that boundary in the request, rather than treating approval as a way to undo earlier work. An approval controls **the proposed action**. It does not roll back a CRM change that already happened.

### 2. Use a Plugin When One Exists

If the CRM is connected, the Bot should use the plugin instead of clicking the same fields in a browser. Plugins are installed for the account, so every Bot that user runs can use them. OAuth tokens stay on Cursor's connector backend. The Bot invokes tools without receiving the token, and the token is not stored on the computer.

Computer use is for services without a plugin, or for a visual step the plugin does not expose. That work uses **this Bot's screen**. Another Bot can still use its own screen at the same time.

The public docs do not name the computer-use browser engine, automation library, or screenshot pipeline. The diagram keeps the responsibility and does not invent that stack.

### 3. Hand Sensitive Input Back to the Person

For a password, passkey, two-factor code, CAPTCHA, payment, or identity check, the Bot hands over the computer. The person completes only the blocked step, then tells the Bot to continue.

When a supported connection shows a secure secret request, the value is masked, kept out of the transcript, and not shown to the model. Passwords and one-time codes do not belong in ordinary chat. A signed-in browser session persists, and the other Bots on that account can use it too.

### 4. Send Risky Actions Through Auto Review

Auto Review is the layer behind approval prompts: an **independent review model** that evaluates an action before it runs. Coverage includes shell commands, plugin calls, computer use, automation writes (changes to routines and event triggers), and delegation such as Cloud Agent and subagent launches. It can let that action proceed, require approval, or deny it.

It does not review every side effect. Memory writes and most settings changes are the examples the security page gives. Local execution is a separate control, covered below.

### 5. Check the Result in the Conversation

```text
Goal and stop line
        ↓
This Bot, on the shared computer
        ├─ Plugin exists → structured call
        └─ No plugin → this Bot's screen (one computer-use task)
                ↓
        Sensitive input? → user takeover
                ↓
        Risky action? → Auto Review → allow / ask / deny
                ↓
        Result in the chat (done, waiting, or failed)
```

Closing the app or the laptop does not stop the cloud turn, and it does not stop a routine that is already running. A direct "stop" can interrupt the current turn. It does not undo an action that already completed.

Once a path is reliable, save it as a skill. A skill records how to do the work and can be used by bots on the account; a private skill may still need to be enabled for the current Bot. Teach a task records one browser demonstration, up to about ten minutes, into a draft skill. The control is rolling out gradually. The draft still needs failure handling and approval boundaries, and a test on safe input, before a schedule or event trigger.

## Names That Do Not Sit on the Same Layer

### Skills, Routines, Hiding, and Deleting

- A **skill** describes how: steps, decisions, output, and where to stop.
- A **routine** assigns a workflow to one Bot and says when it runs: a schedule, or an event the docs support.
- Routines keep running in the cloud while the laptop is closed.
- **Hiding** a Bot removes it from the list. It does not delete the work, and it does not pause that Bot's routines.
- **Deleting** a Bot removes its profile, conversation, and routines. Files and sign-ins on the shared computer remain until someone cleans them up.

Make the one-time task reliable, save the skill, and only then automate it. A test run does real work: it can change files, open sites, and call connected tools.

### A Webhook Accepts a Run. It Does Not Finish One

A routine can also start from a webhook call. The [Routines help page](https://cursor.com/help/grok-bot/routines) says: after the routine is saved, POST to the URL it shows, with the current `Authorization: Bearer` key. A JSON body is allowed. The Bot receives that body together with the routine instruction.

**A response of 200 means Grok Bot accepted the call and started a run. It does not mean the instruction is finished.** Check the Bot's conversation for the result. Any other response means a run did not start. Confirm the routine is not paused and that the request uses the current key.

The help page does not publish a full contract for retries, deduplication, or whether the caller should automatically retry a non-200 response. This article uses only the distinction that page states. A webhook is also not a general public API for invoking an arbitrary Bot. That API is not documented.

### Plugins, Remote MCP, and Local Stdio

The public docs lead with Marketplace plugins. Remote MCP is added by server URL, and Enterprise teams also have an MCP allowlist. Grok Bot inherits the team's connector policy; a blocked plugin shows as disabled by an admin. Blocking a plugin does not block that service's website. Closing the website path takes Network Controls, which is Enterprise only.

**Do not read this as "local stdio MCP is unsupported."** What can be said publicly about the implementation is narrower: a command on the cloud computer can start a stdio server there. That is a different claim from "the stdio MCP config on the user's laptop syncs to the cloud computer automatically." The sync behavior is not in the public material.

### The Outer Loop, the Inner Loop, and Grok Build

[Grok Bot 101](https://x.ai/bot/guides/grok-bot-101) describes the coding split in plain language. The outer-loop Grok Bot gathers context from Slack, docs, and repositories and writes the task. The inner loop is a Cursor Cloud Agent, building on a **separate computer**. The guide says Grok Bot is not writing that code itself; it sends the prompt a person would have written to the coding harness inside Cursor. That is an official guide, not an interface specification. Its author is a DevRel at SpaceXAI.

The [Teams page](https://cursor.com/docs/grok-bot/teams) is the control that matches this story. Delegated work runs under the team's existing Cloud Agent controls. The switch is on by default, and an admin can turn it off. When it is off, Grok Bot cannot hand coding tasks to Cloud Agents.

Keep the three surfaces apart:

- **Grok Bot:** the assistant on the persistent cloud computer, for chat, approvals, plugins, and desktop control.
- **Cursor Cloud Agent:** a separate coding sandbox. Grok Bot can delegate to it, and a team can forbid that.
- **Cursor IDE Agent:** the coding loop inside the IDE. It is not Grok Bot.

**Grok Build** has no separate product boundary in the public docs that can be placed on the diagram above. This article does not draw it as a component, and it does not guess at an internal relationship with Grok Bot.

## Security Boundaries: A Bot Is Not One

[![Grok Bot security boundaries: Firecracker isolation between users, a shared computer for one user's bots, and Auto Review plus local execution as action controls rather than isolation](/images/guides/grok-bot-architecture-security-en.svg)](/images/guides/grok-bot-architecture-security-en.svg)

Open the diagram to enlarge it. It separates isolation from action control. Those two are often described as if they were the same thing.

[Approvals, security, and privacy](https://docs.x.ai/grok-bot/approvals-security-and-privacy) says it directly: do not use separate Bots as a security boundary. The computer is assigned to the Cursor user. Do not put a credential or file on it if another Bot on the account should not use it. Sign the browser out of a service that is no longer needed, and remove sensitive temporary files when the work is done. A public share link copies configuration. The recipient does not receive the computer, logins, or conversation history. The shared configuration should still not contain secrets, customer data, or internal URLs.

| Claim | Boundary used in this article |
|---|---|
| Separate Bots | Not a security boundary |
| Separate screens | Not a security boundary; each is a desktop |
| Separate Cursor users | Each has a Firecracker microVM, with hardware-level isolation |
| Hiding a Bot | Does not pause routines, and does not create isolation |
| Deleting a Bot | Removes its conversation and routines; shared files and browser sessions remain |
| Auto Review allows an action | That proposal may proceed; side effects such as memory writes are outside the review |
| Local execution | Governs the computer in front of you; separate from the cloud computer and from cloud Auto Review |
| Blocking a plugin | Does not block that service's website |

Local execution asks every time by default. A team admin can set a stricter ceiling for every member. Turning it off only stops the Bot from running commands on the member's machine. The cloud computer still works.

Personal Auto-review rules are described differently on the two official pages. The security page says they are stored on the current desktop and synced to its Grok Bot computer, so another desktop needs its own. The approvals page says they are saved to the account and applied on every desktop the member signs in to. How conflicts resolve is clear: Ask first wins. Where the rule record actually lives is not settled here. On Enterprise, admins can force Auto Review on and publish team rules. Self-serve Teams do not get those switches.

## What Remains Unconfirmed

| Observation or claim | Supported interpretation |
|---|---|
| The preview shows clicks and typing | Desktop control exists; the browser engine and automation stack do not follow |
| Several bots appear on different screens | Work surfaces are separate; this is not per-Bot strong isolation |
| A webhook URL exists | It can start a saved routine; it is not a public API for an arbitrary Bot |
| The help center defines HTTP 200 | Accepted and started, not finished; retry and deduplication are unpublished |
| Usage analytics name a model | That model served the request; this does not reconstruct a fixed routing table |
| A command on the cloud computer can start stdio | This is not "stdio is unsupported"; laptop-config sync is undocumented |
| A team model allowlist | Enterprise only; the docs say it is honored by default and also say enforcement is not guaranteed |
| Grok Build | No published product boundary that this diagram can place |

Also undocumented: where a subagent runs and how much state it shares with the parent Bot, the concrete ingress and push topology, and customer-managed point-in-time restore of one computer. Cloud computers run in the United States today. That is not the same commitment as Cursor's US-only data residency program.

## What Developers Can Take Away

Four questions are enough to examine another agent system:

1. **Is the isolation unit explicit?** Names, sessions, and screens can be separate while credentials and the filesystem stay shared.
2. **Can you tell proposal, approval, and completion apart?** One sentence from the model should not serve as the request, the approval, and the proof of completion.
3. **Can two paths reach the same system?** After a plugin is blocked, the browser may still open that service. Network policy is another layer.
4. **Are accept, run, and user-visible result separate?** A webhook 200, a routine run record, and the message in the chat should be checkable on their own.

Read back over the overview with those questions. Grok Bot is a persistent computer that belongs to a user, with several assistants on it. Coding can be delegated, and the delegate runs on another computer. What separates two people is Firecracker, not the name of a Bot.

## Sources and Scope

- [Grok Bot overview](https://cursor.com/docs/grok-bot): the persistent cloud computer, the sharing rule, and one computer-use task per Bot at a time.
- [Use the computer and apps](https://docs.x.ai/grok-bot/computer-and-apps): screens, takeover, plugins before clicking, and the local computer as a separate machine.
- [Grok Bot for Teams and Enterprise](https://cursor.com/docs/grok-bot/teams): Firecracker, the Cloud Agent switch, and connector policy.
- [Grok Bot security](https://cursor.com/docs/grok-bot/security): what Auto Review covers and skips, local execution, model selection, and data location.
- [Approvals, security, and privacy](https://docs.x.ai/grok-bot/approvals-security-and-privacy): a Bot is not a security boundary; secrets do not go in chat.
- [Grok Bot 101](https://x.ai/bot/guides/grok-bot-101): the outer-loop / inner-loop coding story. Written by a SpaceXAI DevRel; not an interface spec.
- [Routines help](https://cursor.com/help/grok-bot/routines): HTTP 200 means accepted and started, not finished.
- [Security FAQ](https://cursor.com/docs/grok-bot/security-faq): plugin policy versus the website path, and a short restatement of Auto Review coverage.

Continue reading: [Muse Architecture Explained](/en/guides/muse-architecture/) and [Grok Bot vs Muse AI (2026)](/en/compare/grok-bot-vs-muse-ai-2026/).
