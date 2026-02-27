import type { Locale } from './i18n';

interface FaqItem {
  question: string;
  answer: string;
}

const faqsZh: FaqItem[] = [
  {
    question: '最便宜的 AI 编程工具是什么？',
    answer: '最便宜的方案取决于使用频率。完全免费的选择包括：GitHub Copilot 免费版（有限额度）、Cline/Roo Code 插件（本身免费，按 API 用量付费）。如果需要付费方案，火山方舟 Coding Plan Lite 版 ¥9.9/月（首购优惠）是目前国内最具性价比的选择，含大量请求额度。极致省钱可以用 Ollama 本地运行免费模型 + Aider，完全零成本。',
  },
  {
    question: 'GitHub Copilot 国内可以用吗？',
    answer: 'GitHub Copilot 在国内需要稳定的代理才能正常使用。即使有代理，偶尔也会遇到连接不稳定的问题。如果你没有代理或代理不稳定，推荐考虑国内可用的替代方案，例如 Cline + 火山方舟 Coding Plan（¥9.9/月，无需代理，国内直连）。',
  },
  {
    question: 'Cursor 和 GitHub Copilot 哪个好？',
    answer: 'Cursor 的 Agent 模式更强，适合需要 AI 自主完成多文件编辑、大型项目重构的用户，但价格更贵（$20/月起）且只支持 VS Code 系编辑器。GitHub Copilot 价格更低（$10/月）、IDE 兼容性更广（支持 JetBrains、Neovim 等）。简单来说：追求最强 AI 编程体验选 Cursor，用 JetBrains 或预算有限选 Copilot。',
  },
  {
    question: '如何不花钱用 AI 编程？',
    answer: '有几种方法：1）GitHub Copilot 免费版：每月有限的补全和对话额度；2）Ollama + Aider：本地运行开源模型，完全免费但需要一定硬件配置（建议 16GB+ 内存）；3）各平台试用：很多工具提供 14-30 天免费试用；4）DeepSeek API：价格极低（约 $0.07/百万 token），配合 Aider 月均 $1-2 即可正常使用。',
  },
  {
    question: 'Cline 是什么？怎么用？',
    answer: 'Cline 是一款开源的 VS Code AI Agent 插件，可以自主读写文件、执行终端命令、调用外部工具。安装方式：在 VS Code 扩展市场搜索 "Cline" 安装即可。它本身免费，费用来自你选择的 AI API。国内推荐搭配火山方舟 Coding Plan（¥9.9/月）使用，无需代理。',
  },
  {
    question: '什么是 AI 编程 Agent？和普通 AI 编程助手有什么区别？',
    answer: '普通 AI 编程助手（如早期 Copilot）只做代码补全和问答，你需要手动复制代码、修改文件。AI Agent 则可以自主执行操作：读取你的代码文件、修改多个文件、运行终端命令、甚至查阅文档。代表性工具：Cursor Agent 模式、Cline、Claude Code。Agent 模式让 AI 能独立完成"帮我把登录模块重构为 JWT 认证"这类多步骤任务。',
  },
  {
    question: '国内开发者用 Claude Code 需要翻墙吗？',
    answer: '直接使用 Claude Code 官方 API 需要代理（Anthropic 不支持国内直连）。但你可以通过火山方舟 Coding Plan 中转：火山方舟提供兼容 Anthropic API 协议的接口，Claude Code 可以直接配置指向火山方舟的 API 端点，无需代理即可在国内使用。具体配置见我们的使用指南。',
  },
  {
    question: 'Cursor 值得 $20/月吗？',
    answer: 'Cursor Pro $20/月 含 $20 额度池（可使用 Claude Opus 4.6、GPT-5 等顶级模型）和无限 Auto 模式。对于专业开发者来说，如果每天使用，性价比较高。对比直接购买 Claude API：同等用量可能要花 $30-50。但如果你只是偶尔用用，可以先从 Cursor 免费版或 Copilot $10/月版本开始。',
  },
  {
    question: '什么是 MCP（Model Context Protocol）？',
    answer: 'MCP 是 Anthropic 提出的开放标准，让 AI 工具可以连接外部数据源和工具（如数据库、Figma、浏览器、文件系统等）。支持 MCP 的工具（Cursor、Cline、Claude Code 等）可以通过 MCP Server 扩展 AI 的能力边界。例如，安装 MCP 数据库 Server 后，AI 可以直接查询你的数据库来帮助写 SQL 和 API。',
  },
  {
    question: 'Roo Code 和 Cline 哪个更好？',
    answer: 'Roo Code 是 Cline 的 Fork，功能更丰富（支持多角色模式、Orchestrator 多 Agent 并行等），但稳定性略逊于 Cline。建议初学者从 Cline 开始，熟悉 AI Agent 工作流后再考虑 Roo Code 的高级功能。两者 API 配置完全相同，切换成本很低。',
  },
  {
    question: '本地模型（Ollama）能替代 Claude/GPT 吗？',
    answer: '目前本地模型在编程能力上与 Claude Sonnet 4.5、GPT-4o 等顶级云端模型仍有差距，但已经能处理大多数日常编程任务。推荐的本地编程模型：Qwen2.5-Coder（32B 版本接近 GPT-4o 水平，需 32GB+ 内存）、DeepSeek-Coder-V2。如果硬件条件有限（8-16GB 内存），建议混合方案：简单任务用本地模型，复杂任务用便宜的云端 API（如 DeepSeek）。',
  },
  {
    question: 'AI 编程工具会不会把我的代码泄露？',
    answer: '这取决于你使用的工具：云端工具（Cursor、Copilot、Claude Code）会把代码发送到云端服务器处理，需要信任服务商的隐私政策。大多数工具声明不用用户代码训练模型（但需自行验证）。本地方案（Ollama）代码完全不出本机，适合涉密项目。对于商业项目，建议检查工具的企业版隐私条款，或使用本地模型方案。',
  },
  {
    question: 'Windsurf 比 Cursor 便宜吗？值得换吗？',
    answer: 'Windsurf Pro $15/月，比 Cursor Pro $20/月 便宜 $5。两者都是 VS Code Fork IDE，功能相近。主要差异：Windsurf 有 JetBrains 插件（Cursor 没有）；Cursor 支持更多顶级模型（如 Claude Opus 4.6）；Windsurf 的 Cascade 有"主动感知上下文"的独特体验。如果你用 JetBrains 或预算有限，Windsurf 值得考虑；如果你是 Cursor 重度用户且满意现有体验，$5 差价未必值得迁移成本。',
  },
  {
    question: 'Gemini CLI 真的免费吗？有什么限制？',
    answer: 'Gemini CLI 使用个人 Google 账号登录后确实免费，限制是 60 请求/分钟、1000 请求/天，使用 Gemini 2.5 Pro 模型（100 万 token 上下文）。对大多数开发者来说，1000 次/天已经完全够用。如果超出限制，可以使用 Google AI Studio API Key 按量付费，或切换到 Vertex AI 企业方案。唯一缺点是国内用户需要代理。',
  },
  {
    question: 'Codex App（macOS）和 Codex CLI 有什么区别？',
    answer: 'Codex CLI 是终端工具，在命令行中交互式地完成编程任务，实时看到 AI 的操作过程。Codex App 是 2026 年 2 月推出的 macOS 原生应用（仅支持 Apple Silicon），核心优势是"多 Agent 并行"——可以同时启动多个 Codex 任务在后台跑，每个任务在独立沙箱中执行，完成后审查 Diff 并合并。简单说：CLI 适合交互式编码，App 适合"扔给 AI 后台处理，我去做别的"的异步工作流。两者都需要 ChatGPT Plus 订阅。',
  },
];

const faqsEn: FaqItem[] = [
  {
    question: 'What is the cheapest AI coding tool?',
    answer: 'It depends on usage. Completely free options include: GitHub Copilot Free (limited quota), Cline/Roo Code plugins (free plugins, pay per API usage). For paid plans, Volcengine Ark Coding Plan Lite at ¥9.9/mo is the best value in China. For zero cost, use Ollama + Aider with local open-source models.',
  },
  {
    question: 'Can GitHub Copilot be used in China?',
    answer: 'GitHub Copilot requires a stable proxy in China. Even with a proxy, connection instability may occur. If you lack a reliable proxy, consider alternatives like Cline + Volcengine Ark Coding Plan (¥9.9/mo, no proxy needed, direct China access).',
  },
  {
    question: 'Cursor or GitHub Copilot — which is better?',
    answer: "Cursor's Agent mode is stronger for autonomous multi-file editing and large refactors, but it's pricier ($20/mo+) and VS Code-only. GitHub Copilot is cheaper ($10/mo), supports more IDEs (JetBrains, Neovim, etc). In short: Cursor for best AI coding experience, Copilot for JetBrains users or budget-conscious developers.",
  },
  {
    question: 'How to code with AI for free?',
    answer: 'Several options: 1) GitHub Copilot Free: limited monthly completions and chat; 2) Ollama + Aider: run open-source models locally, completely free but needs decent hardware (16GB+ RAM recommended); 3) Free trials from various platforms (14-30 days); 4) DeepSeek API: extremely low cost (~$0.07/M tokens), ~$1-2/mo with Aider.',
  },
  {
    question: 'What is Cline and how to use it?',
    answer: 'Cline is an open-source VS Code AI Agent plugin that can autonomously read/write files, run terminal commands, and call external tools. Install it from the VS Code marketplace by searching "Cline". It\'s free; costs come from your chosen AI API. In China, pair it with Volcengine Ark Coding Plan (¥9.9/mo) for proxy-free access.',
  },
  {
    question: 'What is an AI coding Agent? How is it different from a regular AI assistant?',
    answer: 'Regular AI coding assistants (like early Copilot) only do code completion and Q&A — you manually copy code and edit files. AI Agents can autonomously: read your code, modify multiple files, run terminal commands, and even browse documentation. Examples: Cursor Agent mode, Cline, Claude Code. Agents can independently complete multi-step tasks like "refactor the login module to JWT authentication".',
  },
  {
    question: 'Does Claude Code need a VPN in China?',
    answer: "Using Claude Code's official API directly requires a proxy (Anthropic doesn't support direct China access). However, you can relay through Volcengine Ark Coding Plan: it provides Anthropic API-compatible endpoints that Claude Code can connect to directly without a proxy. See our setup guide for details.",
  },
  {
    question: 'Is Cursor worth $20/month?',
    answer: "Cursor Pro at $20/mo includes a $20 credit pool (for Claude Opus 4.6, GPT-5, etc.) and unlimited Auto mode. For professional developers using it daily, it's good value. Compare: equivalent Claude API usage might cost $30-50. But if you only use it occasionally, start with Cursor Free or Copilot at $10/mo.",
  },
  {
    question: 'What is MCP (Model Context Protocol)?',
    answer: 'MCP is an open standard by Anthropic that lets AI tools connect to external data sources and tools (databases, Figma, browsers, file systems, etc.). MCP-compatible tools (Cursor, Cline, Claude Code) can extend AI capabilities through MCP Servers. For example, with a database MCP Server, AI can directly query your database to help write SQL and APIs.',
  },
  {
    question: 'Roo Code vs Cline — which is better?',
    answer: "Roo Code is a Cline fork with more features (multi-role modes, Orchestrator multi-Agent parallel execution), but slightly less stable. Beginners should start with Cline, then consider Roo Code's advanced features after getting comfortable with AI Agent workflows. Both share identical API configuration, so switching is easy.",
  },
  {
    question: 'Can local models (Ollama) replace Claude/GPT?',
    answer: 'Local models still lag behind top cloud models (Claude Sonnet 4.5, GPT-4o) in coding ability, but can handle most daily coding tasks. Recommended local coding models: Qwen2.5-Coder (32B version approaches GPT-4o level, needs 32GB+ RAM), DeepSeek-Coder-V2. For limited hardware (8-16GB RAM), use a hybrid approach: local models for simple tasks, cheap cloud APIs (e.g. DeepSeek) for complex ones.',
  },
  {
    question: 'Will AI coding tools leak my code?',
    answer: "It depends: cloud tools (Cursor, Copilot, Claude Code) send code to cloud servers for processing — you must trust providers' privacy policies. Most claim they don't train on user code (verify yourself). Local solutions (Ollama) keep code entirely on your machine, suitable for sensitive projects. For commercial projects, check enterprise privacy terms or use local model solutions.",
  },
  {
    question: 'Is Windsurf cheaper than Cursor? Worth switching?',
    answer: "Windsurf Pro is $15/mo vs Cursor Pro's $20/mo — $5 cheaper. Both are VS Code Fork IDEs with similar features. Key differences: Windsurf has a JetBrains plugin (Cursor doesn't); Cursor supports more top models (e.g. Claude Opus 4.6); Windsurf's Cascade has unique proactive context awareness. Consider Windsurf if you use JetBrains or want to save; stay with Cursor if you're a heavy user satisfied with the experience.",
  },
  {
    question: 'Is Gemini CLI really free? What are the limits?',
    answer: "Gemini CLI is indeed free with a personal Google account. Limits: 60 requests/minute, 1000 requests/day, using Gemini 2.5 Pro model (1M token context). 1000 requests/day is plenty for most developers. If exceeded, use a Google AI Studio API Key for pay-as-you-go, or switch to Vertex AI enterprise. The only downside: requires a proxy in China.",
  },
  {
    question: 'Codex App (macOS) vs Codex CLI — what\'s the difference?',
    answer: 'Codex CLI is a terminal tool for interactive coding tasks, watching AI operations in real-time. Codex App (launched Feb 2026) is a native macOS app (Apple Silicon only) with "multi-Agent parallelism" — run multiple Codex tasks in background sandboxes simultaneously, then review and merge diffs. In short: CLI for interactive coding, App for "assign to AI and do something else" async workflows. Both require a ChatGPT Plus subscription.',
  },
];

export function getFaqs(lang: Locale): FaqItem[] {
  return lang === 'en' ? faqsEn : faqsZh;
}
