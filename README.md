# CodePick

**[codepick.dev](https://codepick.dev)** — AI 编程工具选型指南，中英双语。

15 款工具 · 18 个方案 · 四维评分 · 指南 & 对比文章

## 技术栈

Astro 5 SSG · TailwindCSS · YAML 数据 · Vercel 部署

## 开发

```bash
npm install
npm run dev      # 开发服务器
npm run build    # 构建（改动后必须验证）
npm run preview  # 预览构建结果
```

## 数据维护

```bash
npm run update-all-tools   # 自动更新工具版本和定价
npm run monitor            # 检查数据变化，创建 Issue
```

数据文件在 `data/tools/`、`data/apis/`、`data/plans/`，每个工具一个 YAML 文件。字段规范见 [CLAUDE.md](./CLAUDE.md)。

## 贡献

- **新增工具**：在 `data/tools/` 创建 YAML，运行 `npm run build` 验证，提 PR
- **数据纠错**：直接修改对应 YAML 并附上数据来源
- **新增文章**：在 `src/content/guides/` 或 `src/content/compare/` 添加 Markdown（需同时创建英文版）

## License

MIT
