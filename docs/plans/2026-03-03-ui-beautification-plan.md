# UI Beautification Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Polish the full CodePick site to a Linear-inspired aesthetic — consistent design tokens, Heroicons SVG replacing emojis, card hover lift, fixed color variables, and subtle micro-animations.

**Architecture:** All styling lives in `src/styles/global.css` (CSS variables + Tailwind component classes). Page-level UI is in `src/page-views/` and `src/components/`. No new npm packages — Heroicons are inlined as SVG strings. Changes are purely presentational; no data, routing, or i18n logic is touched.

**Tech Stack:** Astro 5, TailwindCSS v3, CSS custom properties, inline SVG

**Verification command after every task:** `npm run build` (must complete with 0 errors)

---

### Task 1: Design Tokens — shadow scale, color variables, card hover

**Files:**
- Modify: `src/styles/global.css`

**What to change:**

Add to `:root` block (after the existing `--brand-600` line):
```css
  --color-success: #4ade80;
  --color-danger: #f87171;
  --color-warning: #fbbf24;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.24), 0 2px 6px rgba(0,0,0,0.12);
```

Add to `[data-theme="light"]` block (after the existing `--brand-600` line):
```css
  --color-success: #16a34a;
  --color-danger: #dc2626;
  --color-warning: #d97706;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06);
```

Replace the `.card` and `.card:hover` block:
```css
/* ===== Cards ===== */
.card {
  @apply bg-[var(--surface-card)] border border-[var(--surface-border)] rounded-xl;
  box-shadow: var(--shadow-sm);
  transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
}
.card:hover {
  border-color: rgba(99, 102, 241, 0.35);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
```

Add a `.meta-tag` utility class after the `.badge` block:
```css
.meta-tag {
  @apply inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs text-[var(--text-muted)] bg-[var(--surface-hover)];
}
```

**Step 1: Make the edits** as described above.

**Step 2: Verify build**
```bash
cd /Users/bytedance/code/codepick && npm run build
```
Expected: Build completes with 0 errors.

---

### Task 2: Navigation — replace emoji with Heroicons SVG, active link, mobile animation

**Files:**
- Modify: `src/layouts/BaseLayout.astro`

**What to change:**

**2a.** Replace the logo `<span class="text-2xl">⚡</span>` with an inline SVG bolt icon:
```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-[var(--brand-400)]" aria-hidden="true"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
```

**2b.** Add an `active` check to nav links. Change the `navLinks` loop in the HTML (around line 139) to detect the active path:
```astro
{navLinks.map(link => {
  const isActive = Astro.url.pathname === link.href || Astro.url.pathname.startsWith(link.href + '/') && link.href !== localePath('/', lang);
  return (
    <a
      href={link.href}
      class={`text-sm transition-colors no-underline pb-0.5 ${isActive
        ? 'text-[var(--text-primary)] border-b-2 border-[var(--brand-400)]'
        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] border-b-2 border-transparent'
      }`}
    >
      {link.label}
    </a>
  );
})}
```

**2c.** Replace theme toggle emoji icons. Find the two `<span>` elements with `☀️` and `🌙` and replace:
```html
<!-- Replace: <span class="theme-icon-light hidden">☀️</span> -->
<svg class="theme-icon-light hidden w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
<!-- Replace: <span class="theme-icon-dark">🌙</span> -->
<svg class="theme-icon-dark w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
```

**2d.** Add mobile menu animation. Change the mobile menu `<div id="mobile-menu"` to use max-height transition instead of `hidden` toggle. Replace the entire div opening tag and its classes:
```html
<div id="mobile-menu" class="overflow-hidden transition-all duration-200 md:hidden border-t border-[var(--surface-border)] bg-[var(--surface-bg)]" style="max-height: 0;">
```

Update the mobile menu toggle script (inside the `<script>` block, replace the toggle handler):
```js
// Mobile menu toggle
const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('mobile-menu') as HTMLElement | null;
let menuOpen = false;
toggle?.addEventListener('click', () => {
  menuOpen = !menuOpen;
  if (menu) {
    menu.style.maxHeight = menuOpen ? menu.scrollHeight + 'px' : '0';
  }
});
```

**2e.** Replace the footer `⚡ CodePick` emoji (line ~191):
```html
<h3 class="text-[var(--text-primary)] font-semibold mb-3 flex items-center gap-2">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-[var(--brand-400)]" aria-hidden="true"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
  CodePick
</h3>
```

**Step 1: Make all edits** in BaseLayout.astro as described.

**Step 2: Verify build**
```bash
cd /Users/bytedance/code/codepick && npm run build
```
Expected: 0 errors.

---

### Task 3: ToolCard — hover lift, score number prominence, meta-tag style

**Files:**
- Modify: `src/components/ToolCard.astro`

**What to change:**

The card already has `.card` class which now has hover lift from Task 1. We need to improve score display and meta styling.

Replace the entire file content:
```astro
---
import ScoreBar from './ScoreBar.astro';
import { t, localePath, type Locale } from '../lib/i18n';

interface Props {
  tool: any;
  lang?: Locale;
}
const { tool, lang = 'zh' } = Astro.props;

const meta = tool.meta || {};
const scores = tool.scores || {};
---

<a href={localePath(`/tool/${tool.id}`, lang)} class="card p-5 no-underline group block">
  <div class="flex items-start gap-3 mb-3">
    <div class="w-10 h-10 rounded-lg bg-[var(--surface-hover)] flex items-center justify-center text-base font-bold text-[var(--brand-400)] shrink-0">
      {tool.name.charAt(0)}
    </div>
    <div class="min-w-0 flex-1">
      <h3 class="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--brand-400)] m-0 truncate transition-colors">{tool.name}</h3>
      <span class="tag text-xs mt-0.5 inline-block">{t(`type.${tool.type}`, lang) || tool.type || t('type.tool', lang)}</span>
    </div>
  </div>
  {tool.tagline && (
    <p class="text-xs text-[var(--text-muted)] mb-3 m-0 line-clamp-2 leading-relaxed">{tool.tagline}</p>
  )}
  <div class="flex flex-col gap-2">
    <ScoreBar label={t('score.coding', lang)} score={scores.coding_ability ?? 5} color="auto" />
    <ScoreBar label={t('score.costEfficiency', lang)} score={scores.cost_efficiency ?? 5} color="auto" />
    <ScoreBar label={t('score.flexibility', lang)} score={scores.flexibility ?? 5} color="auto" />
    <ScoreBar label={t('score.china', lang)} score={scores.china_friendly ?? 5} color="auto" />
  </div>
  {(meta.last_verified || meta.confidence) && (
    <div class="mt-3 flex flex-wrap gap-1.5">
      {meta.last_verified && <span class="meta-tag">{t('meta.verified', lang)} {meta.last_verified}</span>}
      {meta.confidence && <span class="meta-tag">{t('meta.shortConf', lang)} {meta.confidence}</span>}
    </div>
  )}
</a>
```

**Step 1: Replace the file** with content above.

**Step 2: Verify build**
```bash
cd /Users/bytedance/code/codepick && npm run build
```
Expected: 0 errors.

---

### Task 4: ToolsIndexPage — use ToolCard component (DRY), sticky category bar

**Files:**
- Modify: `src/page-views/ToolsIndexPage.astro`

**What to change:**

The page currently duplicates ToolCard markup inline. Replace the entire file:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import ToolCard from '../components/ToolCard.astro';
import { getAllToolsLocalized } from '../lib/data';
import { t, localePath, type Locale } from '../lib/i18n';

interface Props { lang: Locale }
const { lang } = Astro.props;

const tools = getAllToolsLocalized(lang);

const categories = [
  { href: localePath('/tools/free', lang),     label: t('cat.free', lang) },
  { href: localePath('/tools/china', lang),    label: t('cat.china', lang) },
  { href: localePath('/tools/vscode', lang),   label: t('cat.vscode', lang) },
  { href: localePath('/tools/terminal', lang), label: t('cat.terminal', lang) },
];

const seoTitle = lang === 'zh'
  ? `AI 编程工具库 | CodePick`
  : `AI Coding Tools | CodePick`;
const seoDesc = lang === 'zh'
  ? `浏览全部 ${tools.length} 款 AI 编程工具，查看详细评测、评分和定价。覆盖 Cursor、Copilot、Cline、Claude Code 等主流工具。`
  : `Browse all ${tools.length} AI coding tools with detailed reviews, scores, and pricing. Covering Cursor, Copilot, Cline, Claude Code, and more.`;
---

<BaseLayout title={seoTitle} description={seoDesc} lang={lang}>
  <section class="container py-12">
    <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-1">{t('tools.title', lang)}</h1>
    <p class="text-[var(--text-secondary)] mb-8 text-sm">
      {tools.length} {t('tools.subtitle', lang)}
    </p>

    <div class="sticky top-16 z-40 -mx-4 px-4 py-3 mb-6 bg-[var(--surface-bg)]/90 backdrop-blur-sm border-b border-[var(--surface-border)]">
      <div class="flex flex-wrap gap-2">
        {categories.map(c => (
          <a href={c.href} class="btn btn-ghost text-xs no-underline">{c.label}</a>
        ))}
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {tools.map(tool => <ToolCard tool={tool} lang={lang} />)}
    </div>
  </section>
</BaseLayout>
```

**Step 1: Replace the file** with content above.

**Step 2: Verify build**
```bash
cd /Users/bytedance/code/codepick && npm run build
```
Expected: 0 errors.

---

### Task 5: HomePage — Hero improvements, background texture

**Files:**
- Modify: `src/page-views/HomePage.astro`

**What to change:**

**5a.** Add a background dot-grid texture to the hero section. Change the opening `<section>` tag for the hero from:
```astro
<section class="container pt-16 pb-12 text-center">
```
to:
```astro
<section class="relative container pt-16 pb-12 text-center">
  <div class="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true" style="background-image: radial-gradient(var(--surface-border) 1px, transparent 1px); background-size: 24px 24px; opacity: 0.5;"></div>
```
Add closing `</div>` before the `</section>` closing tag of the hero section (line 35).

**5b.** Upgrade hero title font size. Change:
```astro
<h1 class="text-3xl md:text-5xl font-bold text-[var(--text-primary)] mb-4 leading-tight">
```
to:
```astro
<h1 class="text-4xl md:text-6xl font-bold text-[var(--text-primary)] mb-5 leading-tight tracking-tight">
```

**5c.** Improve subtitle readability. Change:
```astro
<p class="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">
```
to:
```astro
<p class="text-base text-[var(--text-secondary)] max-w-xl mx-auto mb-8 leading-relaxed">
```

**5d.** Improve CTA button spacing. Change:
```astro
<div class="flex justify-center gap-3">
```
to:
```astro
<div class="flex justify-center gap-4 flex-wrap">
```
And update the primary CTA to be slightly larger:
```astro
<a href="#quick-picker" class="btn btn-primary px-6 py-2.5">{t('home.ctaQuick', lang)}</a>
```

**5e.** Add a section divider before the plans grid. In the `#plans` section, change:
```astro
<div class="flex items-center justify-between mb-6">
  <h2 class="text-xl font-bold text-[var(--text-primary)] m-0">{t('section.planMatrix', lang)}</h2>
  <span class="text-xs text-[var(--text-muted)]">{t('home.totalPrefix', lang)}{plans.length} {t('home.planCount', lang)}</span>
</div>
```
to:
```astro
<div class="flex items-center justify-between mb-6">
  <div>
    <h2 class="text-xl font-bold text-[var(--text-primary)] m-0">{t('section.planMatrix', lang)}</h2>
    <p class="text-xs text-[var(--text-muted)] mt-1 mb-0">{t('home.totalPrefix', lang)}{plans.length} {t('home.planCount', lang)}</p>
  </div>
</div>
```

**5f.** Increase plan card grid gap. Change `gap-4` to `gap-5` in the plans grid:
```astro
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
```

**Step 1: Make all edits** in HomePage.astro.

**Step 2: Verify build**
```bash
cd /Users/bytedance/code/codepick && npm run build
```
Expected: 0 errors.

---

### Task 6: ToolDetailPage — accent border, CSS variable colors, score bar animation

**Files:**
- Modify: `src/page-views/ToolDetailPage.astro`
- Modify: `src/styles/global.css`

**What to change:**

**6a. global.css** — Add score bar animation class after the `.score-bar-fill` block:
```css
/* Score bar entrance animation (triggered via JS) */
.score-bar-fill {
  @apply h-full rounded-full;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  width: 0%;
}
.score-bar-fill.animated {
  /* width set inline by component */
}
```

Wait — the fill width is set inline via `style`. So instead of changing the CSS class, we need the animation approach to work differently. Keep `.score-bar-fill` as-is in global.css (it already has `transition-all duration-500`). We'll add an Intersection Observer in ToolDetailPage to trigger the animation.

**6a. ToolDetailPage.astro** — Add accent border to the header section. Change the header `<div>` opening:
```astro
<div class="flex items-start gap-4 mb-8 pl-4 border-l-[3px] border-[var(--brand-500)]">
```

**6b.** Fix pros/cons hard-coded colors. Find and replace:
```astro
<h3 class="text-base font-semibold text-green-400 mb-3 mt-0">{t('section.pros', lang)}</h3>
```
→
```astro
<h3 class="text-base font-semibold mb-3 mt-0" style="color: var(--color-success)">{t('section.pros', lang)}</h3>
```

```astro
<h3 class="text-base font-semibold text-red-400 mb-3 mt-0">{t('section.cons', lang)}</h3>
```
→
```astro
<h3 class="text-base font-semibold mb-3 mt-0" style="color: var(--color-danger)">{t('section.cons', lang)}</h3>
```

Also update the pros/cons list item styling to use CSS variables:
```astro
<!-- pros list items: change text-green-400 bullet to CSS var -->
{pros.map((p: string) => <li class="flex gap-2"><span style="color: var(--color-success)">+</span>{p}</li>)}
<!-- cons list items -->
{cons.map((c: string) => <li class="flex gap-2"><span style="color: var(--color-danger)">−</span>{c}</li>)}
```

**6c.** Update meta section to use `.meta-tag` class. Replace the bottom meta `<div>`:
```astro
{(meta.last_verified || meta.confidence) && (
  <div class="flex flex-wrap gap-2 mt-8 pt-6 border-t border-[var(--surface-border)]">
    {meta.last_verified && <span class="meta-tag">{t('meta.lastVerified', lang)} {meta.last_verified}</span>}
    {meta.next_review_due && <span class="meta-tag">{t('meta.nextReview', lang)} {meta.next_review_due}</span>}
    {meta.confidence && <span class="meta-tag">{t('meta.confidence', lang)} {meta.confidence}</span>}
    <a href="https://github.com/WhiteWorld/codepick/issues/new" target="_blank" rel="noopener" class="meta-tag text-[var(--brand-400)] no-underline hover:text-[var(--text-primary)]">
      {t('link.reportError', lang)}
    </a>
  </div>
)}
```

**6d.** Add score bar entrance animation. Add a `<script>` tag before the closing `</BaseLayout>` tag:
```astro
<script>
  // Animate score bars when they scroll into view
  const fills = document.querySelectorAll('.score-bar-fill');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const targetWidth = el.dataset.width || el.style.width;
          el.style.width = '0%';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              el.style.width = targetWidth;
            });
          });
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.1 });
    fills.forEach(el => {
      const htmlEl = el as HTMLElement;
      htmlEl.dataset.width = htmlEl.style.width;
      observer.observe(htmlEl);
    });
  }
</script>
```

**Step 1: Make all edits** in ToolDetailPage.astro and global.css.

**Step 2: Verify build**
```bash
cd /Users/bytedance/code/codepick && npm run build
```
Expected: 0 errors.

---

### Task 7: Final verification

**Step 1: Full build**
```bash
cd /Users/bytedance/code/codepick && npm run build
```
Expected: 0 errors, all pages generated.

**Step 2: Preview**
```bash
cd /Users/bytedance/code/codepick && npm run preview
```
Manually check:
- [ ] Homepage: larger hero, dot grid texture visible, buttons have breathing room
- [ ] Nav: SVG icons render, active link underline appears on current page
- [ ] Theme toggle: sun/moon SVG icons switch correctly
- [ ] Mobile (resize browser): menu slides open smoothly
- [ ] Tools list: cards lift on hover with shadow
- [ ] Tools list: sticky category bar stays at top when scrolling
- [ ] Tool detail: indigo left accent border on tool name header
- [ ] Tool detail: pros in green, cons in red (from CSS vars)
- [ ] Tool detail: score bars animate in on scroll
- [ ] Tool detail: meta tags use unified pill style
- [ ] Light mode: all colors look correct (no hard-coded dark-only values)
