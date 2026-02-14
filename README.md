# CodePick - AI 编程工具选型指南

> 帮助中国开发者选择最适合的 AI 编程工具方案。不只对比工具，更对比**完整方案**。

## 🌟 特色

- **方案导向**：不单比工具，比「客户端 + 模型 API + 实际成本」的完整方案
- **中国视角**：重点覆盖国内可用方案（方舟 Coding Plan、Ollama 本地等）
- **四维评分**：编程能力 / 性价比 / 灵活性 / 国内体验
- **30 秒选型**：3 个问题快速匹配最佳方案
- **数据透明**：所有评分可追溯，标注验证日期和信心等级

## 📦 技术栈

| 技术 | 用途 |
|------|------|
| [Astro](https://astro.build) | 静态站点生成 (SSG) |
| [TailwindCSS](https://tailwindcss.com) | 样式 |
| YAML | 数据存储（Git 即数据库） |
| Python | 数据监控脚本 |
| GitHub Actions | 自动化监控 |
| Vercel | 免费部署 |

## 🚀 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 📁 项目结构

```
codepick/
├── src/
│   ├── layouts/        # 页面布局
│   ├── pages/          # 路由页面
│   ├── components/     # 可复用组件
│   ├── lib/            # 工具函数
│   └── styles/         # 全局样式
├── data/
│   ├── tools/          # 工具数据 (YAML)
│   ├── apis/           # API 源数据
│   └── plans/          # 方案数据
├── scripts/            # 监控和维护脚本
├── .github/workflows/  # GitHub Actions
├── content/            # 文章内容 (Markdown)
└── public/             # 静态资源
```

## 📊 数据结构

每个方案 (Plan) 由三部分组成：

```
方案 = 客户端(Tool) + 模型源(API) + 运行环境
```

数据以 YAML 文件存储在 `data/` 目录，通过 Astro 在构建时加载生成静态页面。

### 添加新工具

1. 在 `data/tools/` 创建 `your-tool.yaml`
2. 参考现有文件填写所有字段
3. 运行 `npm run build` 验证
4. 提交 PR

### 添加新方案

1. 确保对应的 tool 和 api YAML 已存在
2. 在 `data/plans/` 创建 `your-plan.yaml`
3. 填写评分、标签、quick_start 等信息

## 🔄 数据维护

- **自动监控**：GitHub Actions 每周一检查工具版本和定价页面变化
- **人工评审**：每个 YAML 文件有 `next_review_due` 字段，过期后页面自动标注
- **社区反馈**：用户可通过 Issue 报告数据错误

```bash
# 手动运行监控
npm run monitor
```

## 🤝 贡献

欢迎提交 PR 或 Issue！

- 🐛 **数据错误**：直接修改对应 YAML 文件并提 PR
- 🆕 **新增工具**：按模板创建 YAML 并附上数据来源
- 📝 **对比文章**：在 `content/comparisons/` 添加 Markdown

## 📄 License

MIT
