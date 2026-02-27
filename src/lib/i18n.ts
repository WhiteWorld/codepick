// Bilingual support (zh/en) for CodePick
export type Locale = 'zh' | 'en';

const translations: Record<string, Record<Locale, string>> = {
  // ── Navigation ──────────────────────────────────────────────────────────
  'nav.plans':     { zh: '方案矩阵', en: 'Plans' },
  'nav.tools':     { zh: '工具库', en: 'Tools' },
  'nav.overview':  { zh: '全景图', en: 'Overview' },
  'nav.compare':   { zh: '对比', en: 'Compare' },
  'nav.guides':    { zh: '指南', en: 'Guides' },
  'nav.faq':       { zh: 'FAQ', en: 'FAQ' },
  'nav.changelog': { zh: '更新日志', en: 'Changelog' },

  // ── Breadcrumbs ─────────────────────────────────────────────────────────
  'bread.home':         { zh: '首页', en: 'Home' },
  'bread.toolLibrary':  { zh: '工具库', en: 'Tools' },
  'bread.freeTools':    { zh: '免费工具', en: 'Free Tools' },
  'bread.chinaTools':   { zh: '国内可用', en: 'China Accessible' },
  'bread.vscode':       { zh: 'VS Code 生态', en: 'VS Code Ecosystem' },
  'bread.terminal':     { zh: '终端工具', en: 'Terminal Tools' },
  'bread.overview':     { zh: '全景图', en: 'Overview' },
  'bread.compare':      { zh: '对比文章', en: 'Comparisons' },
  'bread.guides':       { zh: '使用指南', en: 'Guides' },

  // ── Score labels ────────────────────────────────────────────────────────
  'score.coding':         { zh: '编程', en: 'Coding' },
  'score.codingAbility':  { zh: '编程能力', en: 'Coding Ability' },
  'score.costEfficiency': { zh: '性价比', en: 'Value' },
  'score.flexibility':    { zh: '灵活性', en: 'Flexibility' },
  'score.china':          { zh: '国内', en: 'China' },
  'score.chinaFriendly':  { zh: '国内体验', en: 'China Access' },
  'score.overall':        { zh: '综合', en: 'Overall' },

  // ── Type labels (shared across PlanCard, ToolCard, FilterBar, etc.) ───
  'type.ide':         { zh: 'IDE', en: 'IDE' },
  'type.plugin':      { zh: '插件', en: 'Plugin' },
  'type.client':      { zh: 'VS Code 插件', en: 'VS Code Plugin' },
  'type.cli':         { zh: '终端 CLI', en: 'Terminal CLI' },
  'type.terminal':    { zh: '终端 CLI', en: 'Terminal CLI' },
  'type.web':         { zh: 'Web', en: 'Web' },
  'type.app':         { zh: 'App', en: 'App' },
  'type.cloud_agent': { zh: '云端 Agent', en: 'Cloud Agent' },
  'type.tool':        { zh: '工具', en: 'Tool' },

  // ── Plan type / tag labels ──────────────────────────────────────────────
  'tag.all':      { zh: '全部方案', en: 'All Plans' },
  'tag.ide':      { zh: 'IDE 集成', en: 'IDE' },
  'tag.plugin':   { zh: '插件', en: 'Plugin' },
  'tag.diy':      { zh: 'DIY 组合', en: 'DIY Combo' },
  'tag.cli':      { zh: '终端 CLI', en: 'Terminal CLI' },
  'tag.budget':   { zh: '高性价比', en: 'Budget' },
  'tag.china':    { zh: '国内友好', en: 'China Friendly' },
  'tag.agent':    { zh: 'AI Agent', en: 'AI Agent' },
  'tag.vscode':   { zh: 'VS Code', en: 'VS Code' },
  'tag.privacy':  { zh: '隐私优先', en: 'Privacy First' },
  'tag.power':    { zh: '旗舰', en: 'Flagship' },

  // ── Feature labels ──────────────────────────────────────────────────────
  'feature.code_completion':  { zh: '代码补全', en: 'Code Completion' },
  'feature.chat':             { zh: '对话', en: 'Chat' },
  'feature.agent_mode':       { zh: 'Agent 模式', en: 'Agent Mode' },
  'feature.multi_file_edit':  { zh: '多文件编辑', en: 'Multi-file Edit' },
  'feature.mcp_support':      { zh: 'MCP 支持', en: 'MCP Support' },
  'feature.context_window':   { zh: '上下文窗口', en: 'Context Window' },
  'feature.supported_models': { zh: '支持模型', en: 'Supported Models' },
  'feature.git_integration':  { zh: 'Git 集成', en: 'Git Integration' },
  'feature.auto_commit':      { zh: '自动提交', en: 'Auto Commit' },
  'feature.sub_agent':        { zh: 'Sub-agent', en: 'Sub-agent' },
  'feature.multi_agent':      { zh: '多 Agent', en: 'Multi-Agent' },
  'feature.extended_thinking': { zh: '深度思考', en: 'Extended Thinking' },
  'feature.multi_role':       { zh: '多角色', en: 'Multi-Role' },
  'feature.custom_modes':     { zh: '自定义模式', en: 'Custom Modes' },
  'feature.tui_interface':    { zh: 'TUI 界面', en: 'TUI Interface' },
  'feature.model_providers':  { zh: '模型提供商', en: 'Model Providers' },

  // ── Section headings ────────────────────────────────────────────────────
  'section.scores':       { zh: '📊 评分', en: '📊 Scores' },
  'section.planScores':   { zh: '📊 方案评分', en: '📊 Plan Scores' },
  'section.pricing':      { zh: '💲 定价', en: '💲 Pricing' },
  'section.features':     { zh: '✨ 核心功能', en: '✨ Key Features' },
  'section.pros':         { zh: '✅ 优势', en: '✅ Pros' },
  'section.cons':         { zh: '⚠️ 劣势', en: '⚠️ Cons' },
  'section.bestFor':      { zh: '🎯 最适合', en: '🎯 Best For' },
  'section.changelog':    { zh: '📝 更新记录', en: '📝 Changelog' },
  'section.relatedTools': { zh: '🔗 相关工具', en: '🔗 Related Tools' },
  'section.quickStart':   { zh: '🚀 快速开始', en: '🚀 Quick Start' },
  'section.composition':  { zh: '🧩 方案组成', en: '🧩 Composition' },
  'section.planMatrix':   { zh: '📋 方案选型矩阵', en: '📋 Plan Matrix' },
  'section.compareTable': { zh: '📊 全方案对比表', en: '📊 Full Comparison Table' },
  'section.scenarios':    { zh: '📌 场景速查', en: '📌 Quick Links' },
  'section.decisionTree': { zh: '🧭 30 秒选型决策树', en: '🧭 30-Second Decision Tree' },
  'section.filterByScene':{ zh: '🗂️ 按场景筛选', en: '🗂️ Filter by Scenario' },

  // ── Table headers ───────────────────────────────────────────────────────
  'table.plan':     { zh: '方案', en: 'Plan' },
  'table.type':     { zh: '类型', en: 'Type' },
  'table.monthly':  { zh: '月费', en: 'Monthly' },
  'table.tool':     { zh: '工具', en: 'Tool' },
  'table.pricing':  { zh: '定价', en: 'Pricing' },
  'table.planName': { zh: '方案', en: 'Plan' },
  'table.price':    { zh: '价格', en: 'Price' },
  'table.limits':   { zh: '限制', en: 'Limits' },

  // ── Price formatting ────────────────────────────────────────────────────
  'price.perMonth':    { zh: '/月', en: '/mo' },
  'price.free':        { zh: '免费', en: 'Free' },
  'price.payAsYouGo':  { zh: '按量计费', en: 'Pay-as-you-go' },

  // ── Composition labels ──────────────────────────────────────────────────
  'comp.client':      { zh: '客户端', en: 'Client' },
  'comp.api':         { zh: '模型 API', en: 'Model API' },
  'comp.environment': { zh: '运行环境', en: 'Environment' },
  'comp.difficulty':  { zh: '配置难度:', en: 'Setup:' },
  'comp.viewDetail':  { zh: '查看详情 →', en: 'View Details →' },

  // ── Metadata labels ─────────────────────────────────────────────────────
  'meta.verified':    { zh: '验证:', en: 'Verified:' },
  'meta.lastVerified':{ zh: '最后验证:', en: 'Last Verified:' },
  'meta.nextReview':  { zh: '下次评审:', en: 'Next Review:' },
  'meta.confidence':  { zh: '数据信心:', en: 'Confidence:' },
  'meta.shortConf':   { zh: '信心:', en: 'Conf:' },
  'meta.bestFor':     { zh: '适合：', en: 'For: ' },

  // ── Links & CTAs ────────────────────────────────────────────────────────
  'link.official':       { zh: '官网 ↗', en: 'Website ↗' },
  'link.reportError':    { zh: '报告错误 →', en: 'Report Error →' },
  'link.submitFeedback': { zh: '提交反馈 →', en: 'Submit Feedback →' },
  'link.submitIssue':    { zh: '提交 Issue →', en: 'Submit Issue →' },
  'link.submitQuestion': { zh: '提交问题 →', en: 'Submit Question →' },
  'link.backCompare':    { zh: '← 返回对比文章列表', en: '← Back to Comparisons' },
  'link.backGuides':     { zh: '← 返回指南列表', en: '← Back to Guides' },

  // ── Warnings ────────────────────────────────────────────────────────────
  'warn.dataOutdated': { zh: '⚠ 数据可能过时，请以官网为准', en: '⚠ Data may be outdated, check official site' },

  // ── Type keywords for tool detail SEO ───────────────────────────────────
  'typeKw.ide':         { zh: 'AI IDE', en: 'AI IDE' },
  'typeKw.cli':         { zh: '终端 AI 编程工具', en: 'Terminal AI Coding Tool' },
  'typeKw.plugin':      { zh: 'VS Code AI 插件', en: 'VS Code AI Plugin' },
  'typeKw.client':      { zh: 'AI 编程客户端', en: 'AI Coding Client' },
  'typeKw.web':         { zh: 'AI 编程 Web 工具', en: 'AI Web Coding Tool' },
  'typeKw.app':         { zh: 'AI 编程 App', en: 'AI Coding App' },
  'typeKw.cloud_agent': { zh: 'AI 云端编程 Agent', en: 'AI Cloud Coding Agent' },
  'typeKw.default':     { zh: 'AI 编程工具', en: 'AI Coding Tool' },

  // ── Changelog page ──────────────────────────────────────────────────────
  'cl.title':       { zh: '📅 更新日志', en: '📅 Changelog' },
  'cl.subtitle':    { zh: '站点更新与工具动态，数据变更均记录于此。', en: 'Site updates and tool changes are recorded here.' },
  'cl.toolUpdates': { zh: '🔄 工具动态', en: '🔄 Tool Updates' },
  'cl.dataError':   { zh: '发现数据有误？', en: 'Found incorrect data?' },
  'cl.launch':      { zh: '发布', en: 'Launch' },
  'cl.feature':     { zh: '新功能', en: 'Feature' },
  'cl.content':     { zh: '内容', en: 'Content' },
  'cl.seo':         { zh: 'SEO', en: 'SEO' },
  'cl.pricing':     { zh: '定价', en: 'Pricing' },
  'cl.model':       { zh: '模型', en: 'Model' },
  'cl.update':      { zh: '更新', en: 'Update' },
  'cl.fix':         { zh: '修复', en: 'Fix' },
  'cl.announcement':{ zh: '公告', en: 'Announcement' },

  // ── Overview page ───────────────────────────────────────────────────────
  'ov.title':       { zh: '🗺️ 2026 AI 编程工具全景图', en: '🗺️ 2026 AI Coding Tools Overview' },
  'ov.subtitle':    { zh: '款主流 AI 编程工具横向评分对比。点击评分列表头可按该维度排序。', en: 'mainstream AI coding tools compared side by side. Click column headers to sort.' },
  'ov.dimensions':  { zh: '评分维度：编程能力 / 性价比 / 灵活性 / 国内体验，满分 10 分。数据持续更新。', en: 'Dimensions: Coding Ability / Value / Flexibility / China Access. Max 10. Data updated regularly.' },
  'ov.excellent':   { zh: '● ≥ 8.5 优秀', en: '● ≥ 8.5 Excellent' },
  'ov.good':        { zh: '● ≥ 7 良好', en: '● ≥ 7 Good' },
  'ov.fair':        { zh: '● ≥ 5 一般', en: '● ≥ 5 Fair' },
  'ov.poor':        { zh: '● < 5 较差', en: '● < 5 Poor' },

  // ── Overview: decision tree cards ───────────────────────────────────────
  'dt.chinaFree.sub':   { zh: '国内用户 · 零成本入门', en: 'China Users · Zero Cost' },
  'dt.chinaFree.title': { zh: '👉 Trae CN', en: '👉 Trae CN' },
  'dt.chinaFree.desc':  { zh: '字节出品，免费，国内直连，豆包/DeepSeek/Kimi 全套', en: 'By ByteDance, free, direct China access, Doubao/DeepSeek/Kimi models' },
  'dt.chinaPlugin.sub':  { zh: '国内用户 · VS Code 插件', en: 'China Users · VS Code Plugin' },
  'dt.chinaPlugin.title':{ zh: '👉 Cline + 火山方舟', en: '👉 Cline + Volcengine Ark' },
  'dt.chinaPlugin.desc': { zh: '¥9.9/月，Agent 能力强，支持自定义模型', en: '¥9.9/mo, strong Agent capabilities, custom models' },
  'dt.power.sub':   { zh: '海外用户 · 最强编程体验', en: 'Global Users · Best Coding Experience' },
  'dt.power.title': { zh: '👉 Cursor Pro', en: '👉 Cursor Pro' },
  'dt.power.desc':  { zh: '$20/月，Claude Opus + GPT-5，市占率第一', en: '$20/mo, Claude Opus + GPT-5, #1 market share' },
  'dt.cheap.sub':   { zh: '海外用户 · 省钱替代', en: 'Global Users · Budget Alternative' },
  'dt.cheap.title': { zh: '👉 Windsurf Pro', en: '👉 Windsurf Pro' },
  'dt.cheap.desc':  { zh: '$15/月，Cascade 体验独特，支持 JetBrains', en: '$15/mo, unique Cascade flow, JetBrains support' },
  'dt.termFree.sub':  { zh: '终端党 · 免费首选', en: 'Terminal Users · Free Choice' },
  'dt.termFree.title':{ zh: '👉 Gemini CLI', en: '👉 Gemini CLI' },
  'dt.termFree.desc': { zh: '完全免费，1000 次/天，Gemini 2.5 Pro 百万 token', en: 'Completely free, 1000 req/day, Gemini 2.5 Pro 1M tokens' },
  'dt.quality.sub':  { zh: '代码质量优先 · 不在乎成本', en: 'Quality First · Cost No Object' },
  'dt.quality.title':{ zh: '👉 Claude Code Max', en: '👉 Claude Code Max' },
  'dt.quality.desc': { zh: '$100-200/月，Claude Opus 无限额度，质量天花板', en: '$100-200/mo, unlimited Claude Opus, quality ceiling' },

  // ── Category links ──────────────────────────────────────────────────────
  'cat.all':      { zh: '全部', en: 'All' },
  'cat.allTools': { zh: '📋 全部工具', en: '📋 All Tools' },
  'cat.free':     { zh: '💰 免费工具', en: '💰 Free Tools' },
  'cat.china':    { zh: '🇨🇳 国内可用', en: '🇨🇳 China Accessible' },
  'cat.vscode':   { zh: '🔵 VS Code 生态', en: '🔵 VS Code Ecosystem' },
  'cat.terminal': { zh: '⌨️ 终端工具', en: '⌨️ Terminal Tools' },

  // ── Home page ───────────────────────────────────────────────────────────
  'home.heroTitle1':     { zh: '找到最适合你的', en: 'Find Your Perfect' },
  'home.heroHighlight':  { zh: 'AI 编程方案', en: 'AI Coding Solution' },
  'home.heroSub1':       { zh: '不只对比工具，更对比', en: 'Compare not just tools, but' },
  'home.heroSubBold':    { zh: '完整方案', en: 'complete solutions' },
  'home.heroSub2':       { zh: '——客户端 + 模型 API + 实际成本。', en: ' — client + model API + real cost.' },
  'home.heroCoverage':   { zh: '覆盖 Cursor、Copilot、Cline + 方舟等', en: 'Covering Cursor, Copilot, Cline + Ark, and' },
  'home.heroCombos':     { zh: '种主流组合。', en: ' popular combinations.' },
  'home.ctaQuick':       { zh: '⚡ 30 秒选型', en: '⚡ Quick Pick' },
  'home.ctaBrowse':      { zh: '浏览全部方案 ↓', en: 'Browse All Plans ↓' },
  'home.planCount':      { zh: '个方案', en: ' plans' },
  'home.totalPrefix':    { zh: '共 ', en: '' },
  'home.notFoundTitle':  { zh: '找不到合适的方案？', en: "Can't find the right plan?" },
  'home.notFoundDesc':   { zh: '数据持续更新中。发现信息过时或想要新增工具？欢迎提交 Issue。', en: "Data is continuously updated. Found outdated info or want to add a tool? Submit an issue." },

  // ── FAQ page ────────────────────────────────────────────────────────────
  'faq.title':        { zh: '❓ 常见问题', en: '❓ FAQ' },
  'faq.subtitle':     { zh: '关于 AI 编程工具的高频问题解答，持续更新。', en: 'Frequently asked questions about AI coding tools. Updated regularly.' },
  'faq.moreQuestions': { zh: '还有其他问题？', en: 'Have more questions?' },
  'faq.seoTitle':     { zh: 'AI 编程工具常见问题 FAQ | CodePick', en: 'AI Coding Tools FAQ | CodePick' },
  'faq.seoDesc':      { zh: 'AI 编程工具常见问题解答：最便宜的工具、国内可用性、Cursor vs Copilot、如何免费使用 AI 编程等。', en: 'AI coding tools FAQ: cheapest tools, China access, Cursor vs Copilot, free AI coding, and more.' },

  // ── Compare page ───────────────────────────────────────────────────────
  'compare.title':   { zh: '📝 对比文章', en: '📝 Comparisons' },
  'compare.subtitle':{ zh: '深度对比主流 AI 编程工具方案，帮你做出最佳选择。', en: 'In-depth comparisons of popular AI coding tools to help you choose.' },
  'compare.pubDate': { zh: '发布于', en: 'Published' },

  // ── Guides page ─────────────────────────────────────────────────────────
  'guides.title':    { zh: '📖 使用指南', en: '📖 Guides' },
  'guides.subtitle': { zh: '手把手教你配置各种 AI 编程方案。', en: 'Step-by-step setup guides for AI coding tools.' },
  'guides.pubDate':  { zh: '发布于', en: 'Published' },

  // ── Tools index page ───────────────────────────────────────────────────
  'tools.title':    { zh: '🛠️ AI 编程工具库', en: '🛠️ AI Coding Tools' },
  'tools.subtitle': { zh: '款工具，数据定期更新验证。点击查看详情。', en: ' tools with regularly updated data. Click for details.' },

  // ── Free tools page ────────────────────────────────────────────────────
  'free.title':     { zh: '💰 免费 AI 编程工具', en: '💰 Free AI Coding Tools' },
  'free.subtitle1': { zh: '以下工具均有免费版本可用——包括插件本身免费（需自备 API Key）以及提供免费套餐的付费工具。', en: 'All tools below have a free tier — including free plugins (bring your own API key) and paid tools with free plans.' },
  'free.subtitle2': { zh: '款，按性价比排序。', en: ' tools, sorted by value.' },
  'free.twoForms':  { zh: '两种免费形式', en: 'Two Types of Free' },
  'free.form1':     { zh: 'Cline、Roo Code、Aider、OpenCode 插件/CLI 本身完全免费，但需自备 AI 模型 API（可用 ¥9.9/月的火山方舟）；', en: 'Cline, Roo Code, Aider, OpenCode plugins/CLIs are completely free, but require your own AI model API (e.g. Volcengine Ark at ¥9.9/mo);' },
  'free.form2':     { zh: 'Cursor、Copilot、Trae 有有限额度的免费套餐。', en: 'Cursor, Copilot, Trae offer limited free plans.' },
  'free.relFaq':    { zh: '如何不花钱用 AI 编程？', en: 'How to code with AI for free?' },
  'free.relFaqDesc':{ zh: 'FAQ：免费方案详细说明 →', en: 'FAQ: Free plans explained →' },
  'free.relOllama': { zh: 'Ollama + Aider 本地部署', en: 'Ollama + Aider Local Setup' },
  'free.relOllamaDesc': { zh: '指南：零成本本地 AI 编程 →', en: 'Guide: Zero-cost local AI coding →' },

  // ── China tools page ───────────────────────────────────────────────────
  'china.title':    { zh: '🇨🇳 国内可用 AI 编程工具', en: '🇨🇳 China-Accessible AI Coding Tools' },
  'china.subtitle1':{ zh: '国内体验评分 ≥ 7 的工具，支持国内直连或有可用的国内 API 中转方案。', en: 'Tools with China Access score ≥ 7, supporting direct access or China API relay.' },
  'china.subtitle2':{ zh: '款，按国内体验评分排序。', en: ' tools, sorted by China Access score.' },
  'china.methods':  { zh: '国内可用方式', en: 'China Access Methods' },
  'china.methodTrae':  { zh: 'Trae 字节出品，国内直连无需代理；', en: 'Trae by ByteDance, direct China access without proxy;' },
  'china.methodOther1':{ zh: 'Cline / OpenCode / Aider 支持接入', en: 'Cline / OpenCode / Aider support' },
  'china.methodLink':  { zh: '火山方舟 Coding Plan', en: 'Volcengine Ark Coding Plan' },
  'china.methodOther2':{ zh: '（¥9.9/月），国内直连使用主流编程模型。', en: ' (¥9.9/mo), direct China access to mainstream coding models.' },
  'china.relGuide':    { zh: 'Cline + 火山方舟配置指南', en: 'Cline + Volcengine Ark Setup Guide' },
  'china.relGuideDesc':{ zh: '指南：10 分钟搞定国内 AI 编程 →', en: 'Guide: Set up China AI coding in 10 min →' },
  'china.relPlan':     { zh: 'Cline + 方舟方案详解', en: 'Cline + Ark Plan Details' },
  'china.relPlanDesc': { zh: '方案：国内性价比之王 ¥9.9/月 →', en: 'Plan: Best value in China ¥9.9/mo →' },

  // ── VS Code tools page ─────────────────────────────────────────────────
  'vscode.title':    { zh: '🔵 VS Code 生态 AI 编程工具', en: '🔵 VS Code AI Coding Tools' },
  'vscode.subtitle1':{ zh: '基于 VS Code 的 AI 编程工具，包括 VS Code Fork IDE（Cursor、Trae）和 VS Code 插件（Cline、Roo Code、Copilot）。', en: 'VS Code-based AI coding tools, including VS Code fork IDEs (Cursor, Trae) and VS Code plugins (Cline, Roo Code, Copilot).' },
  'vscode.subtitle2':{ zh: '款，按编程能力排序。', en: ' tools, sorted by coding ability.' },
  'vscode.forkTitle': { zh: '🖥️ VS Code Fork IDE', en: '🖥️ VS Code Fork IDEs' },
  'vscode.forkDesc':  { zh: '深度定制 VS Code，内置 AI 能力，开箱即用体验最佳。代表：Cursor、Trae。', en: 'Deeply customized VS Code with built-in AI. Best out-of-box experience. Examples: Cursor, Trae.' },
  'vscode.pluginTitle':{ zh: '🧩 VS Code 插件', en: '🧩 VS Code Plugins' },
  'vscode.pluginDesc': { zh: '安装在 VS Code / Cursor 中，灵活自定义模型和 API。代表：Cline、Roo Code、Copilot。', en: 'Install in VS Code/Cursor, flexible model and API customization. Examples: Cline, Roo Code, Copilot.' },
  'vscode.relCursorCopilot':    { zh: 'Cursor vs GitHub Copilot', en: 'Cursor vs GitHub Copilot' },
  'vscode.relCursorCopilotDesc':{ zh: '对比：两大 VS Code 付费方案终极对比 →', en: 'Compare: Ultimate comparison of the two VS Code paid plans →' },
  'vscode.relClineRoo':         { zh: 'Cline vs Roo Code', en: 'Cline vs Roo Code' },
  'vscode.relClineRooDesc':     { zh: '对比：VS Code 开源 Agent 谁更强 →', en: 'Compare: Which open-source VS Code Agent is better →' },

  // ── Terminal tools page ─────────────────────────────────────────────────
  'term.title':    { zh: '⌨️ 终端 AI 编程工具', en: '⌨️ Terminal AI Coding Tools' },
  'term.subtitle1':{ zh: '在终端中运行的 AI 编程 CLI 工具，不依赖特定 IDE，适合 Vim/Neovim 用户、服务器开发和偏好终端工作流的开发者。', en: 'Terminal-based AI coding CLI tools. IDE-independent, ideal for Vim/Neovim users, server development, and terminal workflows.' },
  'term.subtitle2':{ zh: '款，按编程能力排序。', en: ' tools, sorted by coding ability.' },
  'term.advTitle':  { zh: '终端工具的优势', en: 'Terminal Tool Advantages' },
  'term.advDesc':   { zh: '不绑定特定 IDE，可在任意环境（SSH 远程、服务器、Vim）中使用；多数支持自定义模型 API，灵活性最高；Aider 的 Git 集成是所有工具中最完善的。', en: "Not tied to any IDE, works in any environment (SSH, servers, Vim); most support custom model APIs for maximum flexibility; Aider's Git integration is the best of all tools." },
  'term.relCompare':     { zh: '终端 AI 三杰对比', en: 'Terminal AI Tool Comparison' },
  'term.relCompareDesc': { zh: '对比：Claude Code vs OpenCode vs Aider →', en: 'Compare: Claude Code vs OpenCode vs Aider →' },
  'term.relOllama':      { zh: 'Ollama + Aider 本地部署', en: 'Ollama + Aider Local Setup' },
  'term.relOllamaDesc':  { zh: '指南：终端 + 本地模型零成本方案 →', en: 'Guide: Terminal + local model zero-cost setup →' },

  // ── QuickPicker ─────────────────────────────────────────────────────────
  'qp.title':     { zh: '⚡ 30 秒快速选型', en: '⚡ 30-Second Quick Pick' },
  'qp.subtitle':  { zh: '回答 3 个问题，找到最适合你的方案', en: 'Answer 3 questions to find your ideal plan' },
  'qp.step1':     { zh: '1/3 · 你的主力开发环境是？', en: '1/3 · Your primary dev environment?' },
  'qp.envVscode':   { zh: 'VS Code', en: 'VS Code' },
  'qp.envJetbrains':{ zh: 'JetBrains', en: 'JetBrains' },
  'qp.envTerminal': { zh: '终端 / Vim', en: 'Terminal / Vim' },
  'qp.envAny':      { zh: '都可以', en: 'Any' },
  'qp.step2':       { zh: '2/3 · 你的月预算是？', en: '2/3 · Your monthly budget?' },
  'qp.budgetFree':  { zh: '¥0 免费', en: '$0 Free' },
  'qp.budgetLow':   { zh: '¥10-50', en: '$10-50' },
  'qp.budgetMid':   { zh: '¥50-150', en: '$50-150' },
  'qp.budgetHigh':  { zh: '不限预算', en: 'No limit' },
  'qp.step3':       { zh: '3/3 · 你最看重什么？', en: '3/3 · What matters most?' },
  'qp.priPower':    { zh: '编程能力最强', en: 'Best Coding' },
  'qp.priCheap':    { zh: '性价比最高', en: 'Best Value' },
  'qp.priChina':    { zh: '国内体验好', en: 'China Access' },
  'qp.priFlex':     { zh: '灵活可定制', en: 'Flexible' },
  'qp.priPrivacy':  { zh: '数据隐私', en: 'Privacy' },
  'qp.priEasy':     { zh: '开箱即用', en: 'Easy Setup' },
  'qp.resultLabel': { zh: '🎯 推荐方案', en: '🎯 Recommended Plan' },
  'qp.calculating': { zh: '计算中...', en: 'Calculating...' },
  'qp.reset':       { zh: '重新选择', en: 'Start Over' },

  // ── Scenario cards ──────────────────────────────────────────────────────
  'sc.cursorCopilot.title':  { zh: 'Cursor vs Copilot', en: 'Cursor vs Copilot' },
  'sc.cursorCopilot.desc':   { zh: '两大付费方案终极对比', en: 'Ultimate comparison of two paid plans' },
  'sc.clineRoo.title':       { zh: 'Cline vs Roo Code', en: 'Cline vs Roo Code' },
  'sc.clineRoo.desc':        { zh: '开源 VS Code Agent 谁更强', en: 'Which open-source VS Code Agent is better' },
  'sc.terminalAi.title':     { zh: '终端 AI 三杰对比', en: 'Terminal AI Trio' },
  'sc.terminalAi.desc':      { zh: 'Claude Code / OpenCode / Aider', en: 'Claude Code / OpenCode / Aider' },
  'sc.cursorWindsurf.title': { zh: 'Cursor vs Windsurf', en: 'Cursor vs Windsurf' },
  'sc.cursorWindsurf.desc':  { zh: 'VS Code Fork IDE 价格与能力对比', en: 'VS Code Fork IDE price & capability comparison' },
  'sc.kiroCursor.title':     { zh: 'Kiro vs Cursor', en: 'Kiro vs Cursor' },
  'sc.kiroCursor.desc':      { zh: 'AWS Spec 驱动 vs 老牌 AI IDE', en: 'AWS Spec-driven vs established AI IDE' },
  'sc.freeTerminal.title':   { zh: '免费终端 AI 三杰', en: 'Free Terminal AI Trio' },
  'sc.freeTerminal.desc':    { zh: 'Gemini CLI vs Claude Code vs Codex CLI', en: 'Gemini CLI vs Claude Code vs Codex CLI' },
  'sc.clineArk.title':       { zh: 'Cline + 火山方舟配置', en: 'Cline + Volcengine Ark Setup' },
  'sc.clineArk.desc':        { zh: '¥9.9/月国内 Agent 方案', en: '¥9.9/mo China Agent Plan' },
  'sc.localDeploy.title':    { zh: '代码不出本机', en: 'Code Stays Local' },
  'sc.localDeploy.desc':     { zh: 'Ollama + Aider 本地部署', en: 'Ollama + Aider Local Deployment' },
  'sc.freeCoding.title':     { zh: '如何免费用 AI 编程？', en: 'Free AI Coding?' },
  'sc.freeCoding.desc':      { zh: '零成本工具合集', en: 'Zero-cost tool collection' },
  'sc.chinaTools.title':     { zh: '国内可用工具', en: 'China Accessible Tools' },
  'sc.chinaTools.desc':      { zh: '无需代理的 AI 编程方案', en: 'AI coding without a proxy' },
  'sc.faqLink.title':        { zh: '常见问题 FAQ', en: 'FAQ' },
  'sc.faqLink.desc':         { zh: '选型、价格、隐私全解答', en: 'Selection, pricing, privacy answered' },

  // ── Footer ──────────────────────────────────────────────────────────────
  'footer.desc':       { zh: '帮助中国开发者选择最适合的 AI 编程工具方案。', en: 'Helping developers choose the best AI coding solution.' },
  'footer.descLine2':  { zh: '数据定期更新，所有信息均经人工验证。', en: 'Data updated regularly, all info manually verified.' },
  'footer.quickNav':   { zh: '快速导航', en: 'Quick Navigation' },
  'footer.about':      { zh: '关于', en: 'About' },
  'footer.personal':   { zh: '个人项目 · 非商业推荐', en: 'Personal project · Non-commercial' },
  'footer.lastUpdate': { zh: '数据最后更新: 2026-02', en: 'Last updated: 2026-02' },
  'footer.reportLink': { zh: '报告数据错误 →', en: 'Report Data Error →' },
  'footer.copyright':  { zh: '© 2026 CodePick. 工具评测数据仅供参考，请以官方信息为准。', en: '© 2026 CodePick. Tool data is for reference only. Please verify with official sources.' },

  // ── Misc / menu ─────────────────────────────────────────────────────────
  'menu.ariaLabel': { zh: '菜单', en: 'Menu' },
  'notAvailable':   { zh: '此内容尚无英文版', en: 'This content is not yet available in English' },
  'viewInChinese':  { zh: '查看中文版 →', en: 'View Chinese version →' },

  // ── Site-level SEO defaults ─────────────────────────────────────────────
  'seo.defaultTitle':  { zh: 'CodePick - AI 编程工具选型指南', en: 'CodePick - AI Coding Tool Guide' },
  'seo.defaultDesc':   { zh: '帮助中国开发者选择最适合的 AI 编程工具方案，对比 Cursor、Copilot、Cline + 方舟等主流方案的能力、价格和体验。', en: 'Compare AI coding tools: Cursor, Copilot, Cline + Ark, and more. Find the best plan by ability, price, and experience.' },
  'seo.siteDesc':      { zh: 'AI 编程工具选型指南 - 帮助中国开发者选择最适合的 AI 编程工具方案', en: 'AI Coding Tool Guide - Compare and choose the best AI coding tools' },

  // ── Overview page type labels ───────────────────────────────────────────
  'ovType.ide':         { zh: 'IDE', en: 'IDE' },
  'ovType.cli':         { zh: 'CLI', en: 'CLI' },
  'ovType.plugin':      { zh: '插件', en: 'Plugin' },
  'ovType.client':      { zh: '客户端', en: 'Client' },
  'ovType.web':         { zh: 'Web', en: 'Web' },
  'ovType.app':         { zh: 'App', en: 'App' },
  'ovType.cloud_agent': { zh: '云端 Agent', en: 'Cloud Agent' },

  // ── Month names for changelog ───────────────────────────────────────────
  'month.1':  { zh: '1月', en: 'Jan' },
  'month.2':  { zh: '2月', en: 'Feb' },
  'month.3':  { zh: '3月', en: 'Mar' },
  'month.4':  { zh: '4月', en: 'Apr' },
  'month.5':  { zh: '5月', en: 'May' },
  'month.6':  { zh: '6月', en: 'Jun' },
  'month.7':  { zh: '7月', en: 'Jul' },
  'month.8':  { zh: '8月', en: 'Aug' },
  'month.9':  { zh: '9月', en: 'Sep' },
  'month.10': { zh: '10月', en: 'Oct' },
  'month.11': { zh: '11月', en: 'Nov' },
  'month.12': { zh: '12月', en: 'Dec' },
};

type TranslationKey = keyof typeof translations;

/** Get translated string */
export function t(key: string, lang: Locale): string {
  const entry = translations[key as TranslationKey];
  return entry?.[lang] ?? entry?.['zh'] ?? key;
}

/** Get locale-prefixed path */
export function localePath(pathStr: string, lang: Locale): string {
  const clean = pathStr.startsWith('/') ? pathStr : `/${pathStr}`;
  return `/${lang}${clean}`;
}

/** Get current locale from URL */
export function getLocaleFromUrl(url: URL): Locale {
  const [, segment] = url.pathname.split('/');
  if (segment === 'en') return 'en';
  return 'zh';
}

/** Get the alternate language URL (for language switcher / hreflang) */
export function getAlternateLangUrl(url: URL, currentLang: Locale): string {
  const path = url.pathname;
  if (currentLang === 'zh') {
    // /zh/tools → /en/tools
    return path.replace(/^\/zh(\/|$)/, '/en$1');
  }
  // /en/tools → /zh/tools
  return path.replace(/^\/en(\/|$)/, '/zh$1');
}

/** Format month label for changelog */
export function monthLabel(key: string, lang: Locale): string {
  const [y, m] = key.split('-');
  const monthName = t(`month.${parseInt(m)}`, lang);
  if (lang === 'en') return `${monthName} ${y}`;
  return `${y} 年 ${monthName}`;
}

/** Get content collection name for a given base and locale */
export function getCollectionName(base: string, lang: Locale): string {
  return lang === 'en' ? `${base}-en` : base;
}
