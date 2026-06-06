# CodePick

**[codepick.dev](https://codepick.dev)** — 面向开发者的 AI 编程工具与工作流选型站，中英双语。

CodePick 追踪 AI IDE、CLI、Agent 协作平台、应用构建器、模型 API 与开发工作流，帮助开发者在工具、方案、对比文章、工作流指南和开发实践之间快速做选择。

当前内容规模：

- 39 款工具
- 16 个方案
- 8 个 API / 模型源
- 双语工具页、方案页、对比文章、使用指南与开发实践
- 内容支柱：`tools`、`plans`、`compare`、`workflow`、`stack`、`market`

## 技术栈

Astro 5 SSG · TailwindCSS · YAML 数据 · Astro Content Collections · Vercel 部署

## 开发

```bash
npm install
npm run dev             # 开发服务器
npm run build           # 构建（改动后必须验证）
npm run preview         # 预览构建结果
npm run check:seo       # 检查关键 SEO 路由
npm run content:check -- --strict  # 内容治理检查
```

## 数据维护

```bash
npm run update-all-tools          # 自动更新工具版本和定价
npm run update-github-tools       # 更新开源工具数据
npm run update-closed-source-tools # 更新闭源工具数据
npm run monitor                   # 检查数据变化，创建 Issue
```

数据文件位于：

- `data/tools/`：工具数据，每个工具一个 YAML
- `data/apis/`：API / 模型源数据
- `data/plans/`：工具 + API 组合方案

每条数据应维护 `last_full_review`、`next_review_due`、`data_sources` 和 `confidence` 等字段。字段规范见 [AGENTS.md](./AGENTS.md)。

## 内容治理

文章内容位于：

- `src/content/compare/` 与 `src/content/compare-en/`
- `src/content/guides/` 与 `src/content/guides-en/`
- `src/content/practices/` 与 `src/content/practices-en/`

每篇文章 frontmatter 需要维护：

```yaml
pillar: tools|plans|compare|workflow|stack|market
content_status: keep|rewrite|merge|archive
locale_strategy: mirrored|zh_only|en_only|planned_en|planned_zh
```

新增文章优先保持中英文镜像；确实只适合单语时，使用 `zh_only` 或 `en_only` 标记。

运行内容检查：

```bash
npm run content:check -- --strict
```

该检查会覆盖内容治理字段、双语镜像、数据新鲜度、方案引用和明显过时的标题数量承诺。

## 贡献

- **新增工具**：在 `data/tools/` 创建 YAML，补齐数据源和复核日期，运行 `npm run build`
- **新增方案**：在 `data/plans/` 创建 YAML，确保引用的工具和 API 存在
- **数据纠错**：直接修改对应 YAML，并附上官方来源
- **新增文章**：在对应 content collection 添加 Markdown，补齐治理字段与双语版本
- **提交前验证**：至少运行 `npm run content:check -- --strict` 和 `npm run build`

## License

MIT
