// Bilingual support (zh/en) for CodePick
export type Locale = 'zh' | 'en';

const translations: Record<string, Record<Locale, string>> = {
  // ── Navigation ──────────────────────────────────────────────────────────
  'nav.home':      { zh: '首页', en: 'Home' },
  'nav.plans':     { zh: '方案推荐', en: 'Plans' },
  'nav.tools':     { zh: '工具库', en: 'Tools' },
  'nav.overview':  { zh: '全景图', en: 'Overview' },
  'nav.compare':   { zh: '对比文章', en: 'Comparisons' },
  'nav.guides':    { zh: '使用指南', en: 'Guides' },
  'nav.practices': { zh: '开发实践', en: 'Practices' },
  'nav.deals':     { zh: '优惠福利', en: 'Deals' },

  // ── Breadcrumbs ─────────────────────────────────────────────────────────
  'bread.home':         { zh: '首页', en: 'Home' },
  'bread.toolLibrary':  { zh: '工具库', en: 'Tools' },
  'bread.freeTools':    { zh: '免费工具', en: 'Free Tools' },
  'bread.chinaTools':   { zh: '国内可用', en: 'China Accessible' },
  'bread.vscode':       { zh: 'VS Code 生态', en: 'VS Code Ecosystem' },
  'bread.terminal':     { zh: '终端工具', en: 'Terminal Tools' },
  'bread.builderTools': { zh: '构建工具', en: 'Builder Tools' },
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
  'section.relatedTools':   { zh: '🔗 相关工具', en: '🔗 Related Tools' },
  'section.relatedPlans':   { zh: '📦 包含此工具的方案', en: '📦 Plans Using This Tool' },
  'section.relatedArticles':{ zh: '📖 相关文章', en: '📖 Related Articles' },
  'section.altPlans':       { zh: '🔄 其他方案', en: '🔄 Alternative Plans' },
  'section.relatedGuides':  { zh: '📚 相关指南', en: '📚 Related Guides' },
  'section.toc':            { zh: '📑 目录', en: '📑 Table of Contents' },
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

  // ── Article CTA ─────────────────────────────────────────────────────────
  'article.ctaTitle':   { zh: '看完对比，准备好选型了？', en: 'Ready to pick your tool?' },
  'article.ctaDesc':    { zh: '查看全景图，30 秒找到最适合你的 AI 编程方案。', en: 'Check the full overview and find your perfect AI coding setup in 30 seconds.' },
  'article.ctaBtn':     { zh: '查看全景图 →', en: 'View Full Overview →' },
  'article.ctaGuideTitle': { zh: '学完指南，准备开始实操了？', en: 'Done reading? Ready to get started?' },
  'article.ctaGuideDesc':  { zh: '查看全景图对比所有工具，找到最适合你的方案。', en: 'Compare all tools in the full overview and find your best setup.' },
  'section.relatedCompare':   { zh: '📖 相关对比文章', en: '📖 Related Comparisons' },
  'section.mentionedTools':   { zh: '🔧 文中提到的工具', en: '🔧 Tools in This Article' },

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
  'dt.chinaPlugin.desc': { zh: '国内直连，Agent 能力强，支持自定义模型', en: 'China-direct, strong Agent capabilities, custom models' },
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
  'cat.builder':  { zh: '🔨 构建工具', en: '🔨 Builder Tools' },

  // ── Home page ───────────────────────────────────────────────────────────
  'home.heroTitle1':     { zh: '找到最适合你的', en: 'Find Your Perfect' },
  'home.heroHighlight':  { zh: 'AI 编程工具', en: 'AI Coding Tool' },
  'home.heroDesc':       { zh: '横向对比 Cursor、Copilot、Claude Code、Cline 等主流工具的能力、价格与体验，帮你快速做出选择。', en: 'Compare Cursor, Copilot, Claude Code, Cline and more — by capability, pricing, and experience. Make the right choice, fast.' },
  'home.heroToolCount':  { zh: '款工具', en: ' tools' },
  'home.heroPlanCount':  { zh: '套方案', en: ' plans' },
  'home.ctaOverview':    { zh: '🗺️ 全景图对比', en: '🗺️ Full Overview' },
  'home.ctaBrowse':      { zh: '浏览全部方案 ↓', en: 'Browse All Plans ↓' },
  'home.latestArticles': { zh: '📝 最新文章', en: '📝 Latest Articles' },
  'home.latestGuides':   { zh: '📖 最新指南', en: '📖 Latest Guides' },
  'home.moreArticles':   { zh: '查看全部对比文章 →', en: 'View all comparisons →' },
  'home.moreGuides':     { zh: '查看全部指南 →', en: 'View all guides →' },
  'home.planCount':      { zh: '个方案', en: ' plans' },
  'home.totalPrefix':    { zh: '共 ', en: '' },
  'home.notFoundTitle':  { zh: '找不到想要的工具？', en: "Can't find what you need?" },
  'home.notFoundDesc':   { zh: '数据持续更新中。发现信息过时或想要新增工具？欢迎提交 Issue。', en: "Data is continuously updated. Found outdated info or want to add a tool? Submit an issue." },

  // ── Scenario cards ──────────────────────────────────────────────────────
  'sc.cursorHub.title':      { zh: 'Cursor 完全指南', en: 'Cursor Guide' },
  'sc.cursorHub.desc':       { zh: '评分、定价、替代方案与深度文章', en: 'Scores, pricing, alternatives & deep reads' },
  'sc.chinaHub.title':       { zh: '国内开发者选型', en: 'China Developer Guide' },
  'sc.chinaHub.desc':        { zh: '无需翻墙的 AI 编程方案', en: 'No-VPN AI coding plans for China' },
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
  'sc.clineArk.desc':        { zh: '国内直连 Agent 方案', en: 'China-direct Agent plan' },
  'sc.localDeploy.title':    { zh: '代码不出本机', en: 'Code Stays Local' },
  'sc.localDeploy.desc':     { zh: 'Ollama + Aider 本地部署', en: 'Ollama + Aider Local Deployment' },
  'sc.freeCoding.title':     { zh: '如何免费用 AI 编程？', en: 'Free AI Coding?' },
  'sc.freeCoding.desc':      { zh: '零成本工具合集', en: 'Zero-cost tool collection' },

  // ── Footer ──────────────────────────────────────────────────────────────
  'footer.desc':       { zh: '帮助中国开发者选择最适合的 AI 编程工具方案。', en: 'Helping developers choose the best AI coding solution.' },
  'footer.descLine2':  { zh: '数据定期更新，所有信息均经人工验证。', en: 'Data updated regularly, all info manually verified.' },
  'footer.quickNav':   { zh: '快速导航', en: 'Quick Navigation' },
  'footer.about':      { zh: '关于', en: 'About' },
  'footer.personal':   { zh: '个人项目 · 非商业推荐', en: 'Personal project · Non-commercial' },
  'footer.lastUpdate': { zh: '数据最后更新:', en: 'Last updated:' },
  'footer.reportLink': { zh: '报告数据错误 →', en: 'Report Data Error →' },
  'footer.rss':        { zh: 'RSS 订阅', en: 'RSS Feed' },

  // ── Share bar ───────────────────────────────────────────────────────────
  'share.title':     { zh: '分享：', en: 'Share:' },
  'share.copyLink':  { zh: '复制链接', en: 'Copy link' },
  'share.copied':    { zh: '已复制 ✓', en: 'Copied ✓' },
  'share.weibo':     { zh: '微博', en: 'Weibo' },
  'share.juejin':    { zh: '掘金', en: 'Juejin' },
  'footer.copyright':  { zh: '© 2026 CodePick. 工具评测数据仅供参考，请以官方信息为准。', en: '© 2026 CodePick. Tool data is for reference only. Please verify with official sources.' },

  // ── Misc / menu ─────────────────────────────────────────────────────────
  'menu.ariaLabel': { zh: '菜单', en: 'Menu' },

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

  // ── Quick Start section (tool detail page) ──────────────────────────────
  'quickStart.steps':       { zh: '安装步骤', en: 'Install Steps' },
  'quickStart.register':    { zh: '注册 / 获取账号', en: 'Register / Get Account' },
  'quickStart.chinaNote':   { zh: '🇨🇳 国内使用提示', en: '🇨🇳 China Access Note' },

  // ── Free trial CTA ───────────────────────────────────────────────────────
  'cta.freeTrial':      { zh: '免费开始', en: 'Start for Free' },
  'cta.tryNow':         { zh: '立即试用', en: 'Try Now' },
  'cta.freeAvailable':  { zh: '提供免费版，无需信用卡', en: 'Free plan available — no credit card required' },
  'cta.paidOnly':       { zh: '提供付费订阅，支持免费试用期', en: 'Paid subscription with free trial period' },

  // ── Deals page ───────────────────────────────────────────────────────────
  'deals.seoTitle':         { zh: 'AI 编程工具推广优惠汇总 | CodePick', en: 'AI Coding Tools Deals & Free Trials | CodePick' },
  'deals.seoDesc':          { zh: '汇总所有 AI 编程工具和 Coding Plan 的推广链接、免费试用和限时优惠，一站式找到最适合的方案。', en: 'All AI coding tool deals, free trials, and promotional links in one place — tools and coding plans.' },
  'deals.title':            { zh: '🎁 推广优惠 & 免费试用', en: '🎁 Deals & Free Trials' },
  'deals.subtitle':         { zh: '汇总所有工具和 Coding Plan 的免费试用入口与推广链接，随时更新。', en: 'All free trial links and promotional offers for AI coding tools and plans, kept up to date.' },
  'deals.toolsTitle':       { zh: '🛠 AI 编程工具', en: '🛠 AI Coding Tools' },
  'deals.plansTitle':       { zh: '📦 Coding Plan 方案', en: '📦 Coding Plans' },
  'deals.free':             { zh: '免费', en: 'Free' },
  'deals.freeTag':          { zh: '🎁 有免费版', en: '🎁 Free plan' },
  'deals.affiliateTag':     { zh: '⭐ 推广链接', en: '⭐ Partner link' },
  'deals.note':             { zh: '带 ⭐ 标记的链接为推广链接，点击后我们可能获得佣金，不影响你的实际费用。', en: 'Links marked ⭐ are affiliate links. We may earn a commission at no extra cost to you.' },

  // ── Coding Plan Page ────────────────────────────────────────────────────
  'codingPlan.heroTitle':      { zh: '找到最适合你的 AI 编程方案', en: 'Find Your Perfect AI Coding Plan' },
  'codingPlan.heroSubtitle':   { zh: 'Coding Plan = 客户端工具 + API 订阅 + 开发环境。一次配置，全面提效。', en: 'Coding Plan = Client Tool + API Subscription + Dev Environment. One setup, full productivity.' },
  'codingPlan.whyTitle':       { zh: '为什么 Coding Plan 很重要', en: 'Why Coding Plans Matter' },
  'codingPlan.howTitle':       { zh: '如何组合一套方案', en: 'How to Build a Plan' },
  'codingPlan.apiPlansTitle':  { zh: '🔥 Coding Plan API 订阅推荐', en: '🔥 Recommended Coding Plan APIs' },
  'codingPlan.apiPlansDesc':   { zh: '国内专属 AI 编程订阅服务，支持多款顶级编程模型，价格与活动以官网为准', en: 'China-native AI coding subscription services with multiple top coding models. Pricing and promos vary, check official sites.' },
  'codingPlan.allPlansTitle':  { zh: '📋 全部编程方案', en: '📋 All Coding Plans' },
  'codingPlan.step1':          { zh: '选择客户端', en: 'Pick a Client' },
  'codingPlan.step1Desc':      { zh: '选择你喜欢的 IDE 插件或终端工具（Cline、Cursor、Claude Code…）', en: 'Choose your preferred IDE plugin or CLI tool (Cline, Cursor, Claude Code…)' },
  'codingPlan.step2':          { zh: '接入 API', en: 'Connect an API' },
  'codingPlan.step2Desc':      { zh: '订阅 Coding Plan 套餐，获取 API Key，填入客户端设置', en: 'Subscribe to a Coding Plan, get your API key, paste into client settings' },
  'codingPlan.step3':          { zh: '开始编程', en: 'Start Coding' },
  'codingPlan.step3Desc':      { zh: '享受 AI 辅助编程，随时切换模型，按需升级套餐', en: 'Enjoy AI-assisted coding, switch models freely, upgrade plans as needed' },
  'codingPlan.why1Title':      { zh: '大幅降低成本', en: 'Slash Costs' },
  'codingPlan.why1Desc':       { zh: '国内 Coding Plan 通常比直接订阅海外 IDE 更省，且更适合国内支付和网络环境', en: 'China-native Coding Plans are often cheaper than subscribing to overseas IDEs directly, and fit local payment and network conditions better' },
  'codingPlan.why2Title':      { zh: '自由切换模型', en: 'Switch Models Freely' },
  'codingPlan.why2Desc':       { zh: '一套订阅支持 Doubao、DeepSeek、Qwen、Kimi 等多款顶级编程模型随时切换', en: 'One subscription unlocks Doubao, DeepSeek, Qwen, Kimi and more — switch anytime' },
  'codingPlan.why3Title':      { zh: '国内直连无忧', en: 'China-Native Access' },
  'codingPlan.why3Desc':       { zh: '方舟、百炼均为国内服务，无需代理，稳定低延迟，随时可用', en: 'Ark and Bailian are China-native — no VPN needed, stable low-latency access' },
  'codingPlan.supportedClients': { zh: '支持的客户端', en: 'Supported Clients' },
  'codingPlan.models':         { zh: '可用模型', en: 'Available Models' },
  'codingPlan.subscribe':      { zh: '立即订阅', en: 'Subscribe Now' },
  'codingPlan.metaTitle':      { zh: 'Coding Plan 选型指南 | CodePick', en: 'AI Coding Plans Guide | CodePick' },
  'codingPlan.metaDesc':       { zh: '全面对比 AI 编程方案，了解 Coding Plan 的重要性，找到最适合你的客户端 + API 组合', en: 'Compare AI coding plans comprehensively. Understand what Coding Plans are and find the best client + API combination for you.' },

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

/** Get content collection name for a given base and locale */
export function getCollectionName(base: string, lang: Locale): string {
  return lang === 'en' ? `${base}-en` : base;
}
