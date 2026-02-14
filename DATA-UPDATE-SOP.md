# CodePick 数据更新 SOP

## 数据源清单

每个工具/API/方案的 YAML 文件必须包含 `last_updated` 字段，格式 `YYYY-MM`。

### 官方定价页（每月必查）

| 工具 | 定价页 URL | 更新频率 |
|------|-----------|---------|
| Cursor | https://cursor.com/pricing | 高（季度调价） |
| GitHub Copilot | https://github.com/features/copilot/plans | 中 |
| Claude Code | https://claude.ai/pricing/max | 中 |
| 方舟 Coding Plan | https://www.volcengine.com/L/s3lNTNYxaEc/ | 高（促销频繁） |
| Trae | https://www.trae.ai/pricing | 中 |
| Cline | https://cline.bot | 低（免费开源） |
| OpenCode | https://opencode.ai | 低（免费开源） |
| Aider | https://aider.chat | 低（免费开源） |

### 信息聚合源（趋势和新工具发现）

| 来源 | URL | 用途 |
|------|-----|------|
| Reddit r/cursor | https://reddit.com/r/cursor | 定价变化、用户反馈 |
| V2EX AI 节点 | https://v2ex.com/go/ai | 国内用户动态 |
| Hacker News | https://news.ycombinator.com | 新工具发布 |
| 即刻 #AI编程 | https://okjk.co | 中文社区热度 |

## 更新流程

### 1. 每月例行检查（每月1号）
```
1. 运行 node scripts/check-freshness.mjs
2. 打开上面的官方定价页，逐个核对
3. 更新有变化的 YAML 文件
4. 更新 last_updated 字段为当前月份
5. git commit -m "data: monthly update YYYY-MM"
6. git push（自动部署）
```

### 2. 紧急更新（定价变化、重大功能更新）
```
1. 修改对应 YAML 文件
2. git commit -m "data: update [工具名] pricing/features"
3. git push
```

### 3. 新增工具
```
1. 在 src/data/tools/ 下创建 [tool-id].yaml
2. 参考已有 YAML 的字段结构
3. 如果需要，同步创建 apis/ 和 plans/ 的 YAML
4. 运行 npm run build 确认无报错
5. git commit -m "feat: add [工具名]"
6. git push
```

## YAML 字段规范

### 工具 (tools/*.yaml)
```yaml
id: tool-id            # 必填，URL slug
name: "工具名"          # 必填
type: ide|plugin|cli   # 必填
pricing:               # 必填
  free_tier: true|false
  plans:
    - name: "Pro"
      price: "$20/月"
last_updated: "2025-07"  # 必填！格式 YYYY-MM
```

### 方案 (plans/*.yaml)
```yaml
id: plan-id
name: "方案名"
monthly_cost: "¥29"      # 或 { min: "8.9", max: "89", typical: "29" }
currency: CNY|USD
scores:
  coding_ability: 8.2    # 1-10
  cost_effectiveness: 9.6
  flexibility: 9.5
  china_experience: 9.0
last_updated: "2025-07"  # 必填！
```

## 自动化检查

- **GitHub Actions**: 每周一自动运行 `check-freshness.mjs`
- 超过 30 天未更新的文件 → 自动创建 GitHub Issue 提醒
- 超过 14 天 → 标记为即将过时

## 数据准确性原则

1. **价格以官方页面为准**，不引用第三方数据
2. **评分基于实际使用体验**，标注评分日期
3. **存疑时标注**：在 YAML 中加 `note: "待确认"` 字段
4. **首页显示最后更新时间**，建立用户信任
