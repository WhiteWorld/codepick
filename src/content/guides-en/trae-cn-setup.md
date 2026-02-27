---
title: "Trae CN Complete Getting Started Guide: Free AI IDE for China, Zero-Cost AI Coding"
description: "ByteDance's Trae CN is completely free, requires no VPN, and includes top Chinese AI models like Doubao, DeepSeek, and Kimi K2. This guide takes you from installation to SOLO mode hands-on."
date: "2026-02-17"
tags: ["trae-cn", "china", "free", "getting-started", "bytedance"]
draft: false
---

Trae CN is ByteDance's China-edition AI IDE, built on VS Code. It is completely free, requires no VPN, and comes with built-in access to top Chinese coding models including Doubao Seed Code, DeepSeek V3/R1, Kimi K2, GLM-4.5, and Qwen3-Coder.

For developers in China, this is currently the **best zero-cost starting point for AI-assisted coding**.

---

## Prerequisites

- Windows 10/11 or macOS 10.15+
- A phone number (for registering a ByteDance account)
- About 15 minutes of setup time

---

## Step 1: Download and Install

Visit [trae.cn](https://trae.cn) to download the installer for your platform:

- **macOS**: Download the `.dmg` file and drag it into the Applications folder
- **Windows**: Download the `.exe` installer and follow the prompts to complete installation

> **Tip**: Trae CN and the international version Trae (trae.ai) are separate products. Make sure you download the version from `trae.cn`.

---

## Step 2: Log In to Your Account

1. On first launch, select your theme and language (recommended: **dark theme + Simplified Chinese**)
2. Click "Log In" in the top-right corner and register a ByteDance account using your phone number
3. After logging in, all features are available for free — **no credit card required**

---

## Step 3: Get to Know the Interface

The Trae CN interface closely resembles VS Code, with two new AI feature entry points:

```
Left Sidebar
├── File Explorer (same as VS Code)
├── Source Control (Git)
└── Trae AI Panel (new)

Right / Bottom
├── AI Chat Window     ← Interactive coding via conversation
└── SOLO Workspace     ← Agent-driven autonomous development
```

**Keyboard shortcuts:**
- `Cmd/Ctrl + I`: Open the AI Chat sidebar
- `Cmd/Ctrl + L`: Open SOLO mode

---

## Step 4: Choose a Model

Click the model selector at the top of the Chat window to switch between models:

| Model | Best For |
|-------|----------|
| **Doubao Seed Code** | Everyday code completion and generation; ByteDance's in-house model, fast |
| **DeepSeek-V3** | Strong general-purpose capabilities, complex logic and reasoning |
| **DeepSeek-R1** | Math and algorithm challenges, with visible reasoning process |
| **Kimi K2** | Agent tasks, long-context understanding |
| **GLM-4.5** | Chinese language understanding, document generation |
| **Qwen3-Coder** | Code-specialized, multi-language support |

> **Tip**: Not sure which to pick? Use **Doubao Seed Code** for everyday tasks, switch to **DeepSeek-V3** for complex work, and choose **DeepSeek-R1** for algorithm problems.

---

## Step 5: Chat Mode — Basic Usage

Chat mode is ideal for an **interactive, ask-and-edit** workflow:

### Open an Existing Project

```bash
# Open a project folder with Trae CN
File → Open Folder → Select your project directory
```

### Basic Conversation Examples

Type your request in the Chat input box:

```
Write a Python FastAPI endpoint that accepts a POST request with name and age parameters and returns a JSON greeting
```

Trae will generate the code and provide buttons to "Insert into File" or "Create New File" — apply changes with a single click.

### Referencing File Context

Type `@` in the Chat to reference:
- `@filename`: Have the AI read a specific file
- `@folder`: Read an entire directory
- `@code block`: Reference the currently selected code

```
@src/api/user.py What's wrong with this endpoint? Help me improve the error handling
```

---

## Step 6: SOLO Mode (Agent-Driven Autonomous Development)

SOLO is Trae CN's core differentiating feature, with two sub-modes:

### SOLO Coder: Iterating on Existing Projects

Ideal for adding features and refactoring code in an existing project:

1. Open your project folder
2. Press `Cmd/Ctrl + L` to enter SOLO mode
3. Describe your requirements and check the **Plan** option to have the AI produce an execution plan first
4. After confirming the plan, SOLO automatically executes: reads files, writes code, and runs tests

```
Add JWT login authentication to my existing Express project, including registration and login endpoints plus middleware
```

### SOLO Builder: Building New Projects from Scratch

Ideal for **rapidly scaffolding applications from nothing**:

1. Create a new empty folder and open it with Trae
2. Enter SOLO Builder mode
3. Describe your application:

```
Create a React + TypeScript to-do app:
- Support adding, deleting, and marking tasks as complete
- Store data in localStorage
- Use Tailwind CSS with a dark theme
```

SOLO Builder will automatically:
1. Generate a requirements document (requirements.md)
2. Determine the tech stack and install dependencies
3. Progressively generate all code files
4. Launch a local preview

> **Tip**: Builder mode supports integration with **Supabase** (database), **Vercel** (deployment), and **Stripe** (payments) — build a full-stack application without leaving the IDE.

---

## FAQ

### Q: Is Trae CN really completely free?

Yes. Currently all features and model calls are completely free, including access to top-tier models like DeepSeek and Kimi K2. ByteDance has not yet announced any monetization plans, so take advantage of the free period while it lasts.

### Q: Will ByteDance store my code?

Trae CN sends conversation context to the cloud for processing. If your project involves trade secrets, consider:
- Disabling the "Data Collection" option in Settings
- Or switching to the [Trae international version](/tool/trae) with a self-hosted OpenAI API

### Q: How does it compare to Cursor?

| Dimension | Trae CN | Cursor |
|-----------|---------|--------|
| Price | Completely free | $20/month |
| China access | Direct connection | VPN required |
| Model quality | Top Chinese models | Top global models |
| Completion speed | Fast | Very fast |
| Ecosystem maturity | Growing | Mature |

**Bottom line**: Trae CN is the top choice for developers in China. If you need the ultimate coding experience and have VPN access, Cursor is an alternative.

### Q: Can I use VS Code extensions in Trae CN?

Yes. Trae CN is built on VS Code and is compatible with `.vsix` format extensions. Most VS Code extensions can be installed and used directly.

### Q: What's the difference between Trae CN and the international version?

| | Trae CN | Trae (International) |
|-|---------|----------------------|
| Website | trae.cn | trae.ai |
| Pricing | Completely free | Pro $10/month |
| Built-in models | Doubao/DeepSeek/Kimi | Claude/GPT/Gemini |
| Network | Direct access in China | VPN required |

---

## Advanced Tips

### Custom AI Behavior Rules

Create `.trae/rules.md` in your project root (similar to `.cursorrules`) to let the AI understand your project conventions:

```markdown
# Project Guidelines
- Use TypeScript with strict mode enabled
- Use JSDoc format for function comments
- Use the Result<T, E> pattern for error handling
- Follow Conventional Commits for commit messages
```

### Connect Custom Models

Trae CN supports custom model providers. You can connect to additional models on [Volcengine Ark](https://www.volcengine.com/L/s3lNTNYxaEc/):

1. Go to Settings → Model Providers → Add
2. Enter the Volcengine Ark Base URL and API Key
3. You can now use other proprietary models available on Ark

---

Congratulations! You now have a solid grasp of Trae CN's core features. If you have any questions, feel free to provide feedback on [GitHub Issues](https://github.com/WhiteWorld/codepick/issues).
