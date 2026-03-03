# UI Beautification Design — Linear Style Full-Site Polish

**Date:** 2026-03-03
**Scope:** Full-site (global.css, BaseLayout, ToolCard, HomePage, ToolsIndexPage, ToolDetailPage)
**Style Direction:** Linear-inspired — minimal, high-density info, precise spacing, subtle animations

---

## Goals

1. Consistent design token system (spacing, typography, color, radius, shadow)
2. Replace emoji icons with Heroicons inline SVG
3. Improve card interactivity and information hierarchy
4. Fix color system inconsistencies (pros/cons hard-coded green/red → CSS variables)
5. Add subtle micro-animations (hover lift, score bar entrance)
6. Improve reading experience: clearer type scale, better contrast, tighter grid

---

## 1. Design Tokens (global.css)

### Spacing Scale
4 / 8 / 12 / 16 / 24 / 32 / 48 / 64px

### Typography Scale
- xs: 12px
- sm: 13px
- base: 14px
- md: 16px
- lg: 18px
- xl: 24px
- 2xl: 32px
- 3xl: 40px

### Border Radius
- sm: 4px
- md: 8px
- lg: 12px
- xl: 16px

### Shadow
- sm: `0 1px 3px rgba(0,0,0,0.12)` — card default
- md: `0 4px 16px rgba(0,0,0,0.24)` — card hover

### New Color Tokens
```css
--color-success: #4ade80;   /* pros, positive indicators */
--color-danger: #f87171;    /* cons, negative indicators */
--color-warning: #fbbf24;   /* badges, warnings */
```
All accent colors moved to CSS variables — no more hard-coded Tailwind `green-400` / `red-400`.

---

## 2. Navigation (BaseLayout.astro)

- Replace all emoji navigation icons with Heroicons 16×16 inline SVG (stroke style)
- Replace sun/moon theme toggle emoji with SVG icons
- Logo: increase font-weight to 700, remove decorative elements
- Active link: 2px bottom border indicator in `--brand-400`
- Mobile menu: add `transition-all duration-200` expand animation (height-based)
- Nav height stays at h-16; backdrop-blur-xl retained

### Icon Mapping
| Current emoji | Heroicons SVG |
|---|---|
| ⚡ Tools | bolt |
| ☁️ Compare | squares-2x2 |
| 📖 Guides | book-open |
| ❓ FAQ | question-mark-circle |
| ☀️ Light | sun |
| 🌙 Dark | moon |

---

## 3. Homepage Hero (HomePage.astro)

- Background: add subtle dot-grid texture (SVG data URI, 3% opacity, theme-aware)
- Hero h1: bump to text-4xl md:text-6xl, tighten letter-spacing
- Subtitle: use `--text-secondary` color (降调), max-width 600px for readability
- CTA buttons: primary button slightly larger (px-6 py-3), ghost button spacing consistent
- Section divider: add thin 1px separator + section label before tool card grid

---

## 4. Tool Card (ToolCard.astro)

### Hover State
```
before: border-color change only
after:  translateY(-2px) + box-shadow md
```

### Score Display
```
before: text-sm score number
after:  text-lg font-semibold score number, prominent color
```

### Tags/Badges
- All badges use `--color-warning` / `--color-success` / `--color-danger` CSS variables
- Consistent padding: px-2 py-0.5, rounded-md, text-xs font-medium

---

## 5. Tools Index Page (ToolsIndexPage.astro)

- FilterBar: add `sticky top-16 z-40` + `backdrop-blur-sm` when scrolled
- Card grid: gap-4 → gap-5
- Empty state: centered illustration + descriptive text
- Card count indicator: show "N tools" subtitle under section heading

---

## 6. Tool Detail Page (ToolDetailPage.astro)

### Page Header
- Add 3px left accent border (indigo) to tool name block

### Pros/Cons
```
before: text-green-400 / text-red-400 (hard-coded)
after:  text-[var(--color-success)] / text-[var(--color-danger)]
```

### Score Bars
- Add CSS `transition: width 0.6s ease-out` entrance animation
- Trigger via Intersection Observer (animate when scrolled into view)

### Meta Information
- Last verified date + confidence level → unified `.meta-tag` component style
- Consistent with tag system

---

## Files to Modify

| File | Changes |
|---|---|
| `src/styles/global.css` | Design tokens, new color vars, shadow scale, meta-tag style |
| `src/layouts/BaseLayout.astro` | SVG icons, active link indicator, mobile menu animation |
| `src/components/ToolCard.astro` | Hover lift, score display, tag color vars |
| `src/page-views/HomePage.astro` | Hero improvements, background texture |
| `src/page-views/ToolsIndexPage.astro` | Sticky filter bar, gap, empty state |
| `src/page-views/ToolDetailPage.astro` | Accent border, color vars, score bar animation |

---

## Non-Goals

- No layout restructuring (grid columns, page sections stay the same)
- No new dependencies beyond Heroicons SVG (inline, no npm package needed)
- No changes to data layer, routing, or i18n logic
- No changes to content articles (compare/guides pages)
