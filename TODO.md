# CodePick 流量增长 TODO

> 基于 2026-05 访问数据诊断制定。原始诊断与方案见对话记录。
> 整体定位：**媒体优先（内容驱动）**｜目标市场：**国内海外并重**｜内容产能：**3-5 篇/周**｜分发：**公众号 + 掘金 + 半自动 Twitter**

**优先级**：P0 = 立刻做（高 ROI / 阻塞后续工作）｜P1 = 本月内｜P2 = 季度内｜P3 = 半年内

---

## 阶段一：技术基建 + 首页改版（第 1-2 周）

### SEO 基建

- [x] **P0** 注册 Bing Webmaster Tools，加 `msvalidate.01` 验证 meta
- [x] **P0** 生成 IndexNow API key，放 `public/{key}.txt`
- [x] **P0** 写 `scripts/submit-indexnow.mjs`，从 sitemap 提取 URL 批量提交
- [x] **P0** 加 GitHub Action `indexnow.yml`，push main 自动构建并提交
- [x] **P0** 首次种子推送（261 个 URL 全部提交成功）
- [ ] **P0** 工具详情页加 `SoftwareApplication` JSON-LD（价格 / 评分 / OS）
- [ ] **P0** Guides + Compare 文章加 `Article` JSON-LD（日期 / 作者 / 描述）
- [ ] **P0** 所有内页加 `BreadcrumbList` JSON-LD（搜索结果显示路径）
- [ ] **P1** 方案详情页加 `Product` + `Offer` JSON-LD（月费 / 币种）
- [ ] **P1** FAQ 页加 `FAQPage` JSON-LD
- [ ] **P1** 检查所有页面是否有独特 H1 + meta description（双语都要）
- [ ] **P1** 给标题加搜索友好的修饰词（"2026 年""国内能用""免费"等长尾匹配）
- [ ] **P2** 在 Bing Webmaster 后台手动提交一次 sitemap

### 首页改版（媒体化）

- [ ] **P0** 第一屏：最新指南/对比 6 篇大卡片（替换工具卡片）
- [ ] **P0** 第二屏：热门工具速查（精简版，3-6 个）
- [ ] **P0** 第三屏：放大 QuickPicker 选型问卷入口
- [ ] **P1** 底部：邮件订阅 + RSS 订阅 CTA
- [ ] **P1** 文章卡片显示发布日期、阅读时长

### 内链系统

- [ ] **P1** guides 文末自动展示"相关工具""相关方案""相关对比"模块
- [ ] **P1** 工具/方案详情页加"相关指南"模块（基于 tag/id 自动匹配）
- [ ] **P1** compare 文章左右栏加"延伸阅读"
- [ ] **P2** 每篇 guide 至少 3 个站内链接（写作模板里加 checklist）

### 移动端优化

- [ ] **P1** 用 PageSpeed Insights 跑 mobile LCP/CLS，记录基线
- [ ] **P1** 对比矩阵 mobile 卡片式布局（当前 5% 移动占比 → 目标 15%）
- [ ] **P1** 长 YAML 表格折叠展开
- [ ] **P2** 工具卡片 mobile 触控目标 ≥ 44px

---

## 阶段二：内容矩阵冲刺（第 3-8 周）

### 国内使用指南系列（已验证：claude-code-china-usage 51 访客）

- [ ] **P0** Cursor 国内使用完整指南（中 + 英）
- [ ] **P0** GitHub Copilot 国内访问与计费（中 + 英）
- [ ] **P1** Codex CLI 国内方案（中 + 英）
- [ ] **P1** Gemini CLI 国内代理配置（中 + 英）
- [ ] **P2** Trae 国内版深度评测（中 + 英）

### Token Plan / 计费方案系列（已验证：minimax-token-plan 69 访客 TOP1）

- [ ] **P0** 百炼 Coding Plan 完整攻略（中 + 英）
- [ ] **P0** 火山方舟 Coding Plan 省钱指南（中 + 英）
- [ ] **P1** OpenRouter 充值与使用指南（中 + 英）
- [ ] **P1** Claude Max 套餐性价比分析（中 + 英）
- [ ] **P1** AI 编程 token 消耗实测对比（中 + 英）

### 对比系列（已验证：cli-ai-coding-tools-2026 62 访客）

- [ ] **P0** Cursor vs Windsurf 2026（中 + 英）
- [ ] **P1** Claude Code vs Codex CLI（中 + 英）
- [ ] **P1** IDE 类 vs CLI 类工具选型（中 + 英）
- [ ] **P1** 应用构建型工具横评 Bolt/v0/Lovable/Youware（中 + 英）
- [ ] **P2** Aider vs OpenCode vs Cline（中 + 英）

### 实战教程系列（已验证：ollama-aider-local 是唯一进 TOP 的英文页）

- [ ] **P1** 本地大模型 + Aider 完整工作流（中 + 英）
- [ ] **P1** VS Code + Cline + 国内 API 实战（中 + 英）
- [ ] **P1** Claude Code Agent 进阶用法（中 + 英）
- [ ] **P2** MCP 服务器集成实战（中 + 英）
- [ ] **P2** 多模型路由策略（成本/质量平衡）（中 + 英）

### 内容工具链

- [ ] **P1** 扩展 `gen-juejin-post.mjs`，支持公众号 Markdown 排版输出
- [ ] **P1** 新增 `scripts/gen-tweet.mjs`：根据 frontmatter 自动生成 Twitter thread 草稿
- [ ] **P2** 写作模板（draft template），含 frontmatter + 内链 checklist + CTA

---

## 阶段三：分发飞轮（第 9-12 周）

### 国内渠道

- [ ] **P0** 微信公众号注册 / 启用（如未注册）
- [ ] **P0** 公众号周更 2 篇（周一 + 周五）
- [ ] **P1** 公众号文末加引导关注 + 加群
- [ ] **P0** 掘金账号注册 / 持续发文
- [ ] **P1** 申请掘金签约创作者
- [ ] **P2** 加入掘金 AI 编程圈子

### 海外渠道（半自动）

- [ ] **P1** Twitter/X 账号注册 / 启用
- [ ] **P1** 写 `gen-tweet.mjs` 后，每篇文章发布时同步推 thread
- [ ] **P2** 探索 Reddit r/ChatGPTCoding, r/LocalLLaMA 自然分享时机
- [ ] **P3** 优质英文长文投稿 Hacker News / Dev.to

### AI 搜索引擎优化

- [ ] **P1** 每篇文章顶部加结构化 Q&A 段落（"什么是 X""为什么选 Y""如何配置 Z"）
- [ ] **P2** 评估 Perplexity / 元宝 / ChatGPT Search 引用率，做 A/B
- [ ] **P3** 建立 `llms.txt`（让 LLM 爬虫高效获取站点摘要）

### 数据复盘

- [ ] **P1** 每月数据复盘：TOP 10 页面变化 / 引荐来源 / 新页面表现
- [ ] **P2** 建立月度报告模板（流量、收录数、引用数、CTR）
- [ ] **P2** 失效内容 audit：超 6 个月未更新且无流量的页面归档或重写

---

## 进展记录

| 日期 | 完成 | 备注 |
|------|------|------|
| 2026-05-16 | Bing Webmaster + IndexNow 全套接入 | 261 URL 首次种子推送成功，HTTP 200 |
