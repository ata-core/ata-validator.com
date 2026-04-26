# Elysia‑Style Visual Refresh — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the design in `docs/superpowers/specs/2026-04-26-elysia-style-redesign-design.md` — light + ocean palette, hybrid mono/sans typography, Elysia structural patterns below the hero — to ata-validator.com without changing routes, IA, or build pipeline.

**Architecture:** CSS-first refresh. The existing `src/styles/global.css` (1003 lines) is amended in place: `:root` tokens get a new ocean palette, new utility primitives are appended, and section-specific rules are overridden block-by-block. Component JSX changes are minimal — class swaps, a new SVG logo `<img>`, a few wrapping `<div>`s and `<span>`s for gradient-text spans, and one full replacement (`Foundation.tsx`).

**Tech Stack:** React 19, Vite 8, TypeScript, react-router-dom 7. No new dependencies. Inter + IBM Plex Mono + JetBrains Mono already loaded in `index.html`.

**Verification approach:** Each task ends with a manual visual check in the browser at `http://localhost:5173/` against the screenshot it produces. The dev server should be left running across tasks (`npm run dev` in another terminal); Vite HMR makes changes visible without restart.

**Commit cadence:** One commit per task. Use the format `feat(<area>): <change>` consistent with the project's existing history.

---

## Task 0: Start the dev server

**Files:** None.

- [ ] **Step 1: Verify Node + dependencies present**

```bash
cd /Users/mert/Desktop/enjoy/ata-validator.com
node --version  # expect v20+
ls node_modules/.bin/vite
```

Expected: `vite` exists in `node_modules/.bin/`. If not, run `npm install`.

- [ ] **Step 2: Start dev server in a separate terminal**

```bash
npm run dev
```

Expected: Vite prints `Local: http://localhost:5173/`. Leave this terminal open for the duration of the implementation.

- [ ] **Step 3: Confirm baseline page renders**

Open `http://localhost:5173/` in a browser. You should see the current site (white/mono, dark code blocks, dark hero chart).

No commit for this task.

---

## Task 1: New design tokens + primitive utilities in `global.css`

**Files:**
- Modify: `src/styles/global.css:1-18` (replace `:root` block)
- Modify: `src/styles/global.css` (append primitives near end of file, before responsive media queries on line 913)

- [ ] **Step 1: Replace the `:root` block**

Open `src/styles/global.css`. Replace lines 1–18 (the entire `:root { ... }` block) with:

```css
:root {
  /* Surfaces */
  --bg:           #ffffff;
  --bg-subtle:    #f8fafc;        /* card surface, code well */
  --bg-tint:      #f0fdfa;        /* badge background */
  --border:       #e2e8f0;
  --border-light: #f1f5f9;

  /* Text */
  --text:         #0a1929;        /* primary text & headings */
  --text-body:    #475569;        /* body paragraphs */
  --text-dim:     #64748b;        /* nav links, secondary */
  --text-mute:    #94a3b8;        /* captions, footnotes */

  /* Brand (locked to logo) */
  --brand-1:      #00C9A7;        /* gradient start (teal) */
  --brand-2:      #00B7D6;        /* gradient mid (cyan) */
  --brand-3:      #3D5AFE;        /* gradient end (blue) */
  --brand-soft:   #0d9488;        /* solid accent for links/highlight values */
  --brand-tint:   #99f6e4;        /* badge border */
  --brand-glow:   rgba(0, 183, 214, 0.4);
  --gradient: linear-gradient(90deg, #00C9A7 0%, #00B7D6 50%, #3D5AFE 100%);

  /* Legacy compat (some older rules still reference these) */
  --bg-card:      #ffffff;
  --bg-code:      #f8fafc;
  --accent:       #0a1929;
  --accent-soft:  #475569;
  --green:        #0d9488;
  --red:          #ff5f57;
  --yellow:       #febc2e;
  --dot-green:    #28c840;

  /* Typography */
  --font-display: 'IBM Plex Mono', ui-monospace, monospace;
  --font-body:    'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-code:    'JetBrains Mono', 'IBM Plex Mono', ui-monospace, monospace;

  /* Legacy aliases (existing rules use these names) */
  --font:         var(--font-body);
  --mono:         var(--font-display);
}
```

Note the legacy aliases at the bottom — they're there so existing rules in the file (which reference `var(--mono)`, `var(--font)`, `var(--accent)`, `var(--green)`) keep working until we override them per-section in later tasks.

- [ ] **Step 2: Update the `body` rule to use the new body font**

Find the `body { ... }` block (around line 24). Change `font-family: var(--font);` to `font-family: var(--font-body);`. Keep everything else.

- [ ] **Step 3: Append primitive utility classes**

Open `src/styles/global.css`. Find the `/* Responsive */` comment (around line 913). Insert the following block **immediately before** that comment:

```css
/* ─── Primitives ─────────────────────────────────────────────── */

.gradient-text {
  background: var(--gradient);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  font-weight: 700;
}

.gradient-bar {
  background: var(--gradient);
}

.btn-gradient {
  display: inline-flex;
  align-items: center;
  background: var(--gradient);
  color: #fff;
  padding: 11px 20px;
  border-radius: 9px;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 0.9rem;
  border: none;
  text-decoration: none;
  cursor: pointer;
  transition: box-shadow 0.18s, transform 0.18s;
}
.btn-gradient:hover {
  box-shadow: 0 4px 16px rgba(61, 90, 254, 0.18);
  transform: translateY(-1px);
  color: #fff;
  text-decoration: none;
}

.badge-ocean {
  display: inline-block;
  padding: 5px 12px;
  background: var(--bg-tint);
  color: var(--brand-soft);
  border: 1px solid var(--brand-tint);
  border-radius: 999px;
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 500;
}

.feature-icon {
  width: 28px;
  height: 28px;
  border-radius: 7px;
  background: linear-gradient(135deg, #00C9A7, #3D5AFE);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 0.85rem;
  font-weight: 700;
}

.grid-bg {
  background-image:
    linear-gradient(to right, rgba(148, 163, 184, 0.12) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(148, 163, 184, 0.12) 1px, transparent 1px);
  background-size: 32px 32px;
}

.section-kicker {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--text-dim);
  margin-bottom: 6px;
}

.section-title-xl {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  line-height: 1;
  letter-spacing: -0.035em;
  margin: 0;
}
```

- [ ] **Step 4: Visual check**

In the browser, scroll the homepage. Most things should look the same except:

- Dark text turned slightly warmer/navier (`#0a1929` vs `#111`).
- Borders softer (`#e2e8f0` vs `#e5e7eb`).
- Body text lightened (`#475569` vs `#6b7280`).

Nothing should be broken. The dark hero chart and dark code windows still look the same — they're handled in later tasks.

- [ ] **Step 5: Commit**

```bash
git add src/styles/global.css
git commit -m "feat(theme): introduce ocean tokens and primitive utility classes"
```

---

## Task 2: Nav — swap wordmark for SVG logo, add tagline

**Files:**
- Modify: `src/components/Nav.tsx` (full rewrite)
- Modify: `src/styles/global.css:46-95` (nav rules) and the `@media (max-width: 768px)` block

- [ ] **Step 1: Rewrite `src/components/Nav.tsx`**

Replace the entire file with:

```tsx
import { Link } from 'react-router-dom'

export function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link to="/" className="nav-logo" aria-label="ata-validator home">
          <img src="/ata-logo.svg" alt="ata" className="nav-logo-img" />
        </Link>
        <span className="nav-tagline">Ultra-fast JSON Schema validator</span>
        <div className="nav-spacer" />
        <div className="nav-links">
          <a href="/#features">Features</a>
          <a href="/#benchmarks">Benchmarks</a>
          <a href="/#quickstart">Quick Start</a>
          <Link to="/docs">Docs</Link>
          <a
            href="https://github.com/ata-core/ata-validator"
            target="_blank"
            className="nav-github"
            aria-label="GitHub"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Replace nav rules in `global.css`**

In `src/styles/global.css`, find the `/* Nav */` block (lines 45–95). Replace lines 46–95 with:

```css
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-light);
}

.nav-inner {
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 24px;
  height: 56px;
  display: flex;
  align-items: center;
  gap: 18px;
}

.nav-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  flex-shrink: 0;
}

.nav-logo-img {
  height: 26px;
  width: auto;
  display: block;
}

.nav-tagline {
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: var(--text-dim);
  white-space: nowrap;
}

.nav-spacer { flex: 1; }

.nav-links {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-links a {
  color: var(--text-dim);
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.15s;
}

.nav-links a:hover { color: var(--text); }

.nav-github { display: flex; color: var(--text-dim); }
.nav-github:hover { color: var(--text); }
```

- [ ] **Step 3: Add a mobile rule for `.nav-tagline`**

In `src/styles/global.css`, find the `@media (max-width: 768px) { ... }` block. Inside it, find the existing `.nav-links` rule (around line 942) and add the following rule immediately before it:

```css
  .nav-tagline { display: none; }
```

- [ ] **Step 4: Visual check**

Reload the browser. Top-left should now show the ocean-gradient `ata` wordmark from `/ata-logo.svg` at ~26px height, with "Ultra-fast JSON Schema validator" in soft gray to the right of it. On a narrow viewport (< 768px) the tagline disappears. Links on the right side stay where they were.

- [ ] **Step 5: Commit**

```bash
git add src/components/Nav.tsx src/styles/global.css
git commit -m "feat(nav): replace wordmark with ocean SVG logo and add tagline"
```

---

## Task 3: Hero — gradient accent word, gradient CTA, ocean badge, gradient stat values, light chart

**Files:**
- Modify: `src/components/Hero.tsx` (small JSX edits)
- Modify: `src/styles/global.css` — hero block (lines 97–212), hero chart block (lines 214–329)

- [ ] **Step 1: Edit `Hero.tsx` JSX**

Open `src/components/Hero.tsx`. Make these targeted edits:

Find:
```tsx
        <div className="hero-badge">Powered by simdjson & RE2</div>
```
Replace with:
```tsx
        <div className="hero-badge badge-ocean">Powered by simdjson &amp; RE2</div>
```

Find:
```tsx
        <h1>
          Ultra-fast JSON Schema <span className="accent">Validator</span>
        </h1>
```
Replace with:
```tsx
        <h1>
          Ultra-fast JSON Schema <span className="gradient-text">Validator</span>
        </h1>
```

Find:
```tsx
          <a href="#quickstart" className="btn btn-primary">
            Get Started
          </a>
```
Replace with:
```tsx
          <a href="#quickstart" className="btn-gradient">
            Get Started →
          </a>
```

Find each `<span className="stat-value">` block (there are four). Wrap each value's text in `<span className="gradient-text">…</span>`. Final block looks like:

```tsx
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-value"><span className="gradient-text">70x</span></span>
            <span className="stat-label">$dynamicRef Override</span>
          </div>
          <div className="stat">
            <span className="stat-value"><span className="gradient-text">3.1x</span></span>
            <span className="stat-label">Normal Validation</span>
          </div>
          <div className="stat">
            <span className="stat-value"><span className="gradient-text">2,729x</span></span>
            <span className="stat-label">Faster Compilation</span>
          </div>
          <div className="stat">
            <span className="stat-value"><span className="gradient-text">98.5%</span></span>
            <span className="stat-label">Spec Compliance</span>
          </div>
        </div>
```

Leave the `Star on GitHub` and `Docs` (mobile) buttons as-is — they keep `btn btn-secondary`.

- [ ] **Step 2: Replace hero rules in `global.css`**

In `src/styles/global.css`, replace lines 97–212 (everything from `/* Hero */` through the end of `.stat-label`) with:

```css
/* Hero */
.hero {
  position: relative;
  padding: 140px 24px 100px;
  max-width: 1080px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.hero-glow {
  position: absolute;
  top: 80px;
  right: -120px;
  width: 420px;
  height: 420px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 201, 167, 0.18), transparent 60%);
  filter: blur(60px);
  pointer-events: none;
  display: block;
}

.hero-badge {
  margin-bottom: 24px;
}

.hero h1 {
  font-family: var(--font-display);
  font-size: clamp(2.25rem, 5vw, 3.5rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.03em;
  margin-bottom: 20px;
  color: var(--text);
}

.hero h1 .accent { color: var(--text); }

.hero-desc {
  font-family: var(--font-body);
  font-size: 1.05rem;
  color: var(--text-body);
  max-width: 480px;
  margin-bottom: 36px;
  line-height: 1.6;
}

.hero-desc strong { color: var(--text); font-weight: 600; }

.hero-buttons {
  display: flex;
  gap: 12px;
  margin-bottom: 56px;
  align-items: center;
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 11px 20px;
  border-radius: 9px;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.15s;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background: var(--gradient);
  color: #fff;
}

.btn-primary:hover {
  box-shadow: 0 4px 16px rgba(61, 90, 254, 0.18);
  transform: translateY(-1px);
  color: #fff;
  text-decoration: none;
}

.btn-secondary {
  background: #fff;
  color: var(--text);
  border: 1px solid var(--border);
}

.btn-secondary:hover {
  border-color: var(--text-dim);
  text-decoration: none;
}

.btn-mobile-only { display: none; }
@media (max-width: 768px) {
  .btn-mobile-only { display: inline-flex; }
}

/* Stats */
.hero-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 20px;
  text-align: center;
}

.stat { display: flex; flex-direction: column; align-items: center; }

.stat-value {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1;
}

.stat-label {
  font-family: var(--font-body);
  font-size: 0.78rem;
  color: var(--text-mute);
  font-weight: 500;
  margin-top: 4px;
}
```

- [ ] **Step 3: Replace hero chart rules in `global.css`**

In `src/styles/global.css`, replace lines 214–329 (the entire `/* Hero Chart (Bun-style) */` block through the end of `.hero-chart-link:hover`) with:

```css
/* Hero Chart — light ocean variant */
.hero-chart {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
}

.hero-chart-tabs {
  display: flex;
  border-bottom: 1px solid var(--border-light);
  padding: 0 12px;
  gap: 4px;
}

.hero-chart-tab {
  background: transparent;
  border: none;
  color: var(--text-dim);
  font-family: var(--font-body);
  font-size: 0.78rem;
  font-weight: 500;
  padding: 10px 10px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: color 0.15s, border-color 0.15s;
}

.hero-chart-tab:hover { color: var(--text); }

.hero-chart-tab.active {
  color: var(--text);
  border-bottom-color: var(--text);
}

.hero-chart-body {
  padding: 22px 22px 18px;
  height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

.hero-chart-title {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 18px;
  letter-spacing: -0.015em;
}

.hero-chart-bars {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.hero-chart-row {
  display: grid;
  grid-template-columns: 80px 1fr auto;
  align-items: center;
  gap: 12px;
}

.hero-chart-label {
  text-align: right;
  font-family: var(--font-code);
  font-size: 0.78rem;
  color: var(--text-mute);
}

.hero-chart-label strong {
  color: var(--text-body);
  font-weight: 600;
}

.hero-chart-bar-wrap {
  height: 28px;
  background: var(--bg-subtle);
  border-radius: 6px;
  overflow: hidden;
}

.hero-chart-bar {
  height: 100%;
  border-radius: 6px;
  background: #cbd5e1;
  transition: width 0.4s ease;
}

.hero-chart-bar.highlight {
  background: var(--gradient);
  box-shadow: 0 0 16px var(--brand-glow);
}

.hero-chart-value {
  font-family: var(--font-code);
  font-size: 0.78rem;
  color: var(--text-mute);
  font-weight: 500;
  white-space: nowrap;
  min-width: 80px;
  text-align: right;
}

.hero-chart-row:has(.hero-chart-bar.highlight) .hero-chart-label strong,
.hero-chart-row:has(.hero-chart-bar.highlight) .hero-chart-value {
  color: var(--brand-soft);
  font-weight: 700;
}

.hero-chart-link {
  display: block;
  text-align: center;
  padding: 12px;
  border-top: 1px solid var(--border-light);
  color: var(--brand-soft);
  font-family: var(--font-body);
  font-size: 0.78rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.15s;
}

.hero-chart-link:hover { color: var(--text); }
```

- [ ] **Step 4: Visual check**

Reload `/`. The hero should now show:

- The badge in soft teal (`#f0fdfa` background, `#0d9488` text, teal border).
- The h1 in mono, with "Validator" painted in the ocean gradient.
- "Get Started →" as a gradient pill button. "Star on GitHub" as a white-with-border secondary button.
- The four stat values painted in the gradient, mono, weight 700.
- The benchmark chart on the right is now light: white card, dim text, the winning row's bar is the gradient with a soft glow, dim rows are gray, the highlighted row's value text is `--brand-soft` weight 700.
- A soft teal radial glow blob behind the chart, top-right.

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.tsx src/styles/global.css
git commit -m "feat(hero): apply ocean gradient accents, light chart, ocean badge"
```

---

## Task 4: Replace `Foundation.tsx` with the 4-column feature row

**Files:**
- Modify: `src/components/Foundation.tsx` (full rewrite)
- Modify: `src/styles/global.css` (lines 371–411 — replace `/* Foundation */` block)

- [ ] **Step 1: Rewrite `src/components/Foundation.tsx`**

Replace the entire file with:

```tsx
const features = [
  {
    icon: '⚡',
    title: 'Native speed',
    desc: 'simdjson + RE2 + JS codegen.\nUp to 70x faster than ajv.',
  },
  {
    icon: '◇',
    title: 'Tiny bundle',
    desc: '0.5KB compile mode.\nBrowser-ready, zero deps.',
  },
  {
    icon: '◉',
    title: 'ReDoS-safe',
    desc: 'RE2 engine, no backtrack.\n2,000x safer on attack patterns.',
  },
  {
    icon: '✓',
    title: 'Spec-compliant',
    desc: '98.5% Draft 2020-12.\nFull $dynamicRef + $anchor.',
  },
]

export function Foundation() {
  return (
    <section className="foundation">
      <div className="foundation-grid">
        {features.map((f) => (
          <div key={f.title} className="foundation-cell">
            <div className="feature-icon" aria-hidden>{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Replace foundation rules in `global.css`**

In `src/styles/global.css`, replace lines 371–411 (the entire `/* Foundation */` block through the end of `.tab.active`) with:

```css
/* Foundation — 4-column feature row */
.foundation {
  max-width: 1080px;
  margin: 0 auto;
  padding: 32px 24px;
  border-top: 1px solid var(--border-light);
}

.foundation-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.foundation-cell h3 {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.02em;
  margin: 10px 0 4px;
}

.foundation-cell p {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--text-dim);
  line-height: 1.6;
  white-space: pre-line;
  margin: 0;
}

@media (max-width: 900px) {
  .foundation-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
}
@media (max-width: 560px) {
  .foundation-grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 3: Visual check**

Reload `/`. Below the hero you should now see a 4-column row: each cell has a small gradient rounded-square icon, a mono h3, and a 2-line sans description in dim text. On a narrow viewport (< 900px), it collapses to 2 columns; below 560px, 1 column.

- [ ] **Step 4: Commit**

```bash
git add src/components/Foundation.tsx src/styles/global.css
git commit -m "feat(foundation): replace decorative tabs with 4-col feature row"
```

---

## Task 5: `CodeWindow.tsx` — light variant + neutral dots + ocean syntax tokens

**Files:**
- Modify: `src/components/CodeWindow.tsx:11-25` (the `T` color palette)
- Modify: `src/styles/global.css:331-369` (the `/* Code Window */` block)

- [ ] **Step 1: Update the syntax palette in `CodeWindow.tsx`**

In `src/components/CodeWindow.tsx`, replace lines 11–25 (the `T` constant and its closing `as const`) with:

```tsx
// Light ocean palette — works on #f8fafc surface
const T = {
  keyword:  '#3D5AFE',  // brand blue
  string:   '#0d9488',  // brand soft teal
  number:   '#7088FF',  // softer blue
  comment:  '#94a3b8',  // mute gray
  func:     '#0a1929',  // text
  variable: '#0d9488',  // brand soft
  property: '#3D5AFE',  // brand blue
  operator: '#475569',  // body
  type:     '#3D5AFE',  // brand blue
  punct:    '#475569',  // body
  plain:    '#0a1929',  // text
  accent:   '#0d9488',  // brand soft
} as const
```

- [ ] **Step 2: Replace the `/* Code Window */` block in `global.css`**

In `src/styles/global.css`, replace lines 331–369 (the entire `/* Code Window */` block through the end of `.code-body code`) with:

```css
/* Code Window — light ocean variant */
.code-window {
  background: var(--bg-subtle);
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
}

.code-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--border-light);
  background: #fff;
}

.dot { width: 9px; height: 9px; border-radius: 50%; background: #cbd5e1; }
.dot.red,
.dot.yellow,
.dot.green { background: #cbd5e1; }

.code-title {
  margin-left: 8px;
  font-family: var(--font-body);
  font-size: 0.78rem;
  color: var(--text-dim);
}

.code-body {
  padding: 16px 18px;
  font-family: var(--font-code);
  font-size: 0.82rem;
  line-height: 1.65;
  overflow-x: auto;
  color: var(--text);
}

.code-body code { background: none; padding: 0; font-size: inherit; color: inherit; }
```

The `.dot.red/.yellow/.green` overrides intentionally collapse the macOS traffic-light look to three uniform muted dots, per the spec.

- [ ] **Step 3: Visual check**

Reload `/` and scroll to the **Features** section (or directly to the Quick Start cards lower down). Code windows should now be light: `--bg-subtle` background, white header strip, three uniform `#cbd5e1` dots, mono dim title text. Code colors should read with brand blue keywords, soft-teal strings, mute-gray comments, dark plain text — all on a light surface.

- [ ] **Step 4: Commit**

```bash
git add src/components/CodeWindow.tsx src/styles/global.css
git commit -m "feat(code-window): switch to light ocean variant with neutral dots"
```

---

## Task 6: `Features.tsx` — kicker + gradient h2 + ocean accents

**Files:**
- Modify: `src/components/Features.tsx:111-114` (add header above mapped rows)
- Modify: `src/styles/global.css:413-481` (the `/* Features */` block)

- [ ] **Step 1: Add the gradient section header**

In `src/components/Features.tsx`, find the `Features` function. Replace the `return ( ... )` block with:

```tsx
  return (
    <section id="features" className="features">
      <div className="features-header">
        <div className="section-kicker">It's all about</div>
        <h2 className="section-title-xl gradient-text">Speed without compromise</h2>
      </div>
      {features.map((f) => (
        <div key={f.label} className={`feature-row${f.reverse ? ' reverse' : ''}`}>
          <div className="feature-text">
            <div className="feature-label">{f.label}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
            <ul className="feature-list">
              {f.bullets.map((b, i) => (
                <li key={i}><strong>{b.text}</strong>{b.rest}</li>
              ))}
            </ul>
          </div>
          <div className="feature-code">
            <CodeWindow title={f.codeTitle} lang={f.lang}>{f.code}</CodeWindow>
          </div>
        </div>
      ))}
    </section>
  )
```

- [ ] **Step 2: Replace the `/* Features */` block in `global.css`**

In `src/styles/global.css`, replace lines 413–481 (from `/* Features */` through the end of `.feature-list li strong`) with:

```css
/* Features */
.features {
  max-width: 1080px;
  margin: 0 auto;
  padding: 40px 24px;
}

.features-header {
  padding: 40px 0 24px;
}

.feature-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  padding: 64px 0;
  border-top: 1px solid var(--border-light);
}

.feature-row.reverse { direction: rtl; }
.feature-row.reverse > * { direction: ltr; }

.feature-label {
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: var(--brand-soft);
  margin-bottom: 12px;
  text-transform: uppercase;
}

.feature-text h3 {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
  color: var(--text);
}

.feature-text p {
  font-family: var(--font-body);
  color: var(--text-body);
  margin-bottom: 20px;
  line-height: 1.65;
  font-size: 0.95rem;
}

.feature-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: var(--font-body);
}

.feature-list li {
  color: var(--text-body);
  padding-left: 16px;
  position: relative;
  font-size: 0.9rem;
}

.feature-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 9px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--gradient);
}

.feature-list li strong { color: var(--text); font-weight: 700; }
```

- [ ] **Step 3: Visual check**

Reload `/`. Above the four feature rows you should now see "It's all about" in small dim sans, then "Speed without compromise" in gigantic mono with the ocean gradient. The labels (`PARSING`, `REGEX ENGINE`, etc.) read in `--brand-soft` teal. Bullet dots in the feature lists are now small gradient circles.

- [ ] **Step 4: Commit**

```bash
git add src/components/Features.tsx src/styles/global.css
git commit -m "feat(features): add gradient section title and ocean accents"
```

---

## Task 7: `Benchmarks.tsx` — grid background + big stat block + light chart

**Files:**
- Modify: `src/components/Benchmarks.tsx:108-114` (wrap section + add big stat block)
- Modify: `src/styles/global.css:483-640` (the `/* Benchmarks */` and `/* Bun-style chart */` blocks)

- [ ] **Step 1: Update `Benchmarks.tsx` JSX**

Open `src/components/Benchmarks.tsx`. Replace the `return ( ... )` block with:

```tsx
  return (
    <section id="benchmarks" className="benchmarks grid-bg">
      <div className="bench-header">
        <div className="section-kicker">Benchmarks</div>
        <h2 className="section-title-xl gradient-text">Numbers that matter</h2>
        <p className="section-desc">
          Apple Silicon. Process-isolated with{' '}
          <a href="https://github.com/evanwashere/mitata" target="_blank">mitata</a>.
        </p>
      </div>

      <div className="bench-layout">
        <div className="bench-stats">
          <div className="bench-stat">
            <div className="bench-stat-value gradient-text">70x</div>
            <div className="bench-stat-label">faster on $dynamicRef</div>
          </div>
          <div className="bench-stat">
            <div className="bench-stat-value gradient-text">2,729x</div>
            <div className="bench-stat-label">faster compilation</div>
          </div>
        </div>

        <div className="bench-chart">
          <div className="bench-tabs">
            {tabs.map((t, i) => (
              <button
                key={t.name}
                className={`bench-tab ${i === active ? 'active' : ''}`}
                onClick={() => setActive(i)}
              >
                {t.name}
              </button>
            ))}
          </div>

          <div className="bench-chart-body">
            <h3 className="bench-chart-title">{tab.title}</h3>
            <p className="bench-chart-subtitle">{tab.subtitle}</p>

            <div className="bench-chart-bars">
              {tab.entries.map((entry) => (
                <div key={entry.label} className="bench-chart-row">
                  <div className="bench-chart-label">
                    <strong>{entry.label}</strong>
                  </div>
                  <div className="bench-chart-bar-wrap">
                    <div
                      className={`bench-chart-bar ${entry.highlight ? 'highlight' : ''}`}
                      style={{ width: `${barWidth(entry.time)}%` }}
                    />
                  </div>
                  <div className="bench-chart-value">{entry.value}</div>
                </div>
              ))}
            </div>
          </div>

          <a href={tab.link} target="_blank" className="bench-chart-link">
            View benchmark →
          </a>
        </div>
      </div>
    </section>
  )
```

- [ ] **Step 2: Replace benchmark rules in `global.css`**

In `src/styles/global.css`, replace lines 483–640 (the entire `/* Benchmarks */` and `/* Bun-style chart */` blocks, ending after `.bench-chart-link:hover`) with:

```css
/* Benchmarks */
.benchmarks {
  padding: 80px 24px;
  border-top: 1px solid var(--border-light);
}

.bench-header {
  max-width: 1080px;
  margin: 0 auto 36px;
  text-align: left;
}

.bench-layout {
  max-width: 1080px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 40px;
  align-items: start;
}

.bench-stats {
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding-top: 8px;
}

.bench-stat {
  display: flex;
  flex-direction: column;
}

.bench-stat-value {
  font-family: var(--font-display);
  font-size: clamp(3.5rem, 7vw, 6rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 0.95;
}

.bench-stat-label {
  font-family: var(--font-body);
  color: var(--text-body);
  font-size: 0.95rem;
  margin-top: 6px;
}

.section-desc {
  font-family: var(--font-body);
  color: var(--text-body);
  max-width: 520px;
  margin: 0 0 0;
  font-size: 0.95rem;
}

.section-desc a {
  color: var(--brand-soft);
  text-decoration: underline;
}

/* Light chart */
.bench-chart {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
}

.bench-tabs {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--border-light);
  padding: 0 16px;
}

.bench-tab {
  background: transparent;
  border: none;
  color: var(--text-dim);
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 500;
  padding: 14px 18px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: color 0.15s, border-color 0.15s;
}

.bench-tab:hover { color: var(--text); }

.bench-tab.active {
  color: var(--text);
  border-bottom-color: var(--text);
}

.bench-chart-body {
  padding: 28px 28px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.bench-chart-title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 4px;
  letter-spacing: -0.02em;
}

.bench-chart-subtitle {
  font-family: var(--font-body);
  font-size: 0.78rem;
  color: var(--text-mute);
  margin-bottom: 24px;
}

.bench-chart-bars {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.bench-chart-row {
  display: grid;
  grid-template-columns: 90px 1fr auto;
  align-items: center;
  gap: 16px;
}

.bench-chart-label {
  text-align: right;
  font-family: var(--font-code);
  font-size: 0.85rem;
  color: var(--text-mute);
}

.bench-chart-label strong {
  color: var(--text-body);
  font-weight: 600;
}

.bench-chart-bar-wrap {
  height: 32px;
  background: var(--bg-subtle);
  border-radius: 6px;
  overflow: hidden;
}

.bench-chart-bar {
  height: 100%;
  border-radius: 6px;
  background: #cbd5e1;
  transition: width 0.4s ease;
}

.bench-chart-bar.highlight {
  background: var(--gradient);
  box-shadow: 0 0 16px var(--brand-glow);
}

.bench-chart-row:has(.bench-chart-bar.highlight) .bench-chart-label strong,
.bench-chart-row:has(.bench-chart-bar.highlight) .bench-chart-value {
  color: var(--brand-soft);
  font-weight: 700;
}

.bench-chart-value {
  font-family: var(--font-code);
  font-size: 0.85rem;
  color: var(--text-mute);
  font-weight: 500;
  white-space: nowrap;
  min-width: 90px;
  text-align: right;
}

.bench-chart-link {
  display: block;
  text-align: center;
  padding: 14px;
  border-top: 1px solid var(--border-light);
  color: var(--brand-soft);
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.15s;
}

.bench-chart-link:hover { color: var(--text); }

@media (max-width: 900px) {
  .bench-layout { grid-template-columns: 1fr; gap: 24px; }
  .bench-stats { flex-direction: row; gap: 32px; }
}
```

- [ ] **Step 3: Visual check**

Reload `/`. The Benchmarks section should now have:

- A subtle grid pattern across its full background.
- Above the chart: the `Benchmarks` kicker, then giant gradient mono `Numbers that matter`, then the existing mitata caption.
- Two-column layout below: left has `70x faster on $dynamicRef` and `2,729x faster compilation` as oversized gradient mono numerals; right has the chart card (now light), with the winning row's bar in gradient + glow, dim rows in gray, and the highlighted row's label and value in `--brand-soft` weight 700.

- [ ] **Step 4: Commit**

```bash
git add src/components/Benchmarks.tsx src/styles/global.css
git commit -m "feat(benchmarks): grid bg + big stat block + light ocean chart"
```

---

## Task 8: `Compliance.tsx` — gradient ring, gradient h2, ocean keyword pills

**Files:**
- Modify: `src/components/Compliance.tsx:13-58` (full rewrite of JSX)
- Modify: `src/styles/global.css:642-734` (the `/* Compliance */` block)

- [ ] **Step 1: Rewrite `src/components/Compliance.tsx`**

Replace the contents of the `Compliance` function (the `return ( ... )` block) with:

```tsx
  return (
    <section className="compliance">
      <div className="compliance-inner">
        <div className="compliance-text">
          <div className="section-kicker">Standards</div>
          <h2 className="section-title-xl gradient-text">Drop-in compatible</h2>
          <p>
            Tested against the official{' '}
            <a href="https://github.com/json-schema-org/JSON-Schema-Test-Suite" target="_blank">
              JSON Schema Test Suite
            </a>{' '}
            and{' '}
            <a href="https://github.com/ExodusMovement/schemasafe" target="_blank">
              @exodus/schemasafe
            </a>{' '}
            test suite for Draft 2020-12.
          </p>
          <div className="compliance-score">
            <div className="score-ring">
              <svg viewBox="0 0 120 120">
                <defs>
                  <linearGradient id="oceanRing" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00C9A7" />
                    <stop offset="50%" stopColor="#00B7D6" />
                    <stop offset="100%" stopColor="#3D5AFE" />
                  </linearGradient>
                </defs>
                <circle cx="60" cy="60" r="54" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                <circle
                  cx="60" cy="60" r="54" fill="none" stroke="url(#oceanRing)" strokeWidth="8"
                  strokeDasharray="339.3" strokeDashoffset="5.1" strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />
              </svg>
              <span className="score-text gradient-text">98.5%</span>
            </div>
            <div className="score-details">
              <div><strong>1,172</strong> tests passed</div>
              <div><strong>$dynamicRef</strong> 42/42 (100%)</div>
              <div><strong>Draft 7 + 2020-12</strong></div>
            </div>
          </div>
        </div>
        <div className="compliance-list">
          <h4>Fully supported keywords</h4>
          <div className="keyword-grid">
            {keywords.map((kw) => (
              <span key={kw} className="kw pass">
                <span className="kw-dot" aria-hidden />
                {kw}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
```

The `keywords` array at the top of the file stays unchanged.

- [ ] **Step 2: Replace compliance rules in `global.css`**

In `src/styles/global.css`, replace lines 642–734 (the entire `/* Compliance */` block through the end of `.kw.pass`) with:

```css
/* Compliance */
.compliance {
  padding: 80px 24px;
  border-top: 1px solid var(--border-light);
}

.compliance-inner {
  max-width: 1080px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: start;
}

.compliance-text > .section-kicker { margin-bottom: 6px; }

.compliance-text h2 {
  margin-bottom: 16px;
}

.compliance-text p {
  font-family: var(--font-body);
  color: var(--text-body);
  margin-bottom: 32px;
  font-size: 0.95rem;
  line-height: 1.65;
}

.compliance-text p a {
  color: var(--brand-soft);
  text-decoration: underline;
}

.compliance-score {
  display: flex;
  align-items: center;
  gap: 24px;
}

.score-ring {
  position: relative;
  width: 120px;
  height: 120px;
  flex-shrink: 0;
}

.score-ring svg { width: 100%; height: 100%; }

.score-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.score-details {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-family: var(--font-body);
  color: var(--text-body);
  font-size: 0.92rem;
}

.score-details strong { color: var(--text); font-weight: 700; }

.compliance-list h4 {
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 700;
  margin-bottom: 14px;
  color: var(--text-body);
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.keyword-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.kw {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 6px;
  font-family: var(--font-code);
  font-size: 0.75rem;
  font-weight: 500;
}

.kw.pass {
  background: #fff;
  border: 1px solid var(--border-light);
  color: var(--text);
}

.kw-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--gradient);
  flex-shrink: 0;
}
```

- [ ] **Step 3: Visual check**

Reload `/`. The Compliance section should show:

- Left column: `Standards` kicker, gigantic gradient mono `Drop-in compatible`, then the existing description, then the score ring (now an ocean-gradient ring with `98.5%` painted in the gradient at center).
- Right column: keyword grid; each pill is white with a tiny gradient dot before the keyword text.

- [ ] **Step 4: Commit**

```bash
git add src/components/Compliance.tsx src/styles/global.css
git commit -m "feat(compliance): gradient ring + section title + dotted keyword pills"
```

---

## Task 9: `QuickStart.tsx` — kicker + gradient h2

**Files:**
- Modify: `src/components/QuickStart.tsx:5-6` (replace h2 with kicker + gradient h2)
- Modify: `src/styles/global.css:736-770` (the `/* Quick Start */` block)

- [ ] **Step 1: Update QuickStart JSX**

In `src/components/QuickStart.tsx`, find:

```tsx
    <section id="quickstart" className="quickstart">
      <h2>Quick Start</h2>
      <div className="qs-grid">
```

Replace with:

```tsx
    <section id="quickstart" className="quickstart">
      <div className="qs-header">
        <div className="section-kicker">Get started in seconds</div>
        <h2 className="section-title-xl gradient-text">Quick Start</h2>
      </div>
      <div className="qs-grid">
```

- [ ] **Step 2: Replace the `/* Quick Start */` block in `global.css`**

In `src/styles/global.css`, replace lines 736–770 (from `/* Quick Start */` through the end of `.qs-card .code-body`) with:

```css
/* Quick Start */
.quickstart {
  padding: 80px 24px;
  max-width: 1080px;
  margin: 0 auto;
  border-top: 1px solid var(--border-light);
}

.qs-header { margin-bottom: 40px; }

.qs-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.qs-card {
  min-width: 0;
  padding: 24px;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 12px;
  transition: transform 0.18s, box-shadow 0.18s;
}

.qs-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.06);
}

.qs-card h4 {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--text);
}

.qs-card .code-window {
  margin-bottom: 16px;
  max-width: 100%;
}
.qs-card .code-body { font-size: 0.78rem; padding: 14px; }
```

- [ ] **Step 3: Visual check**

Reload `/`. Above the three Quick Start cards: small dim "Get started in seconds" kicker, then gigantic gradient mono "Quick Start". Cards now have a white surface, soft border, lift on hover.

- [ ] **Step 4: Commit**

```bash
git add src/components/QuickStart.tsx src/styles/global.css
git commit -m "feat(quickstart): add gradient title and lift cards"
```

---

## Task 10: `Architecture.tsx` — kicker + gradient h2 + gradient step icon

**Files:**
- Modify: `src/components/Architecture.tsx:10-12` (header)
- Modify: `src/styles/global.css:772-836` (the `/* Architecture */` block)

- [ ] **Step 1: Update Architecture JSX**

In `src/components/Architecture.tsx`, find:

```tsx
    <section className="architecture">
      <h2>How it works</h2>
      <div className="arch-flow">
```

Replace with:

```tsx
    <section className="architecture">
      <div className="arch-header">
        <div className="section-kicker">Pipeline</div>
        <h2 className="section-title-xl gradient-text">How it works</h2>
      </div>
      <div className="arch-flow">
```

- [ ] **Step 2: Replace the `/* Architecture */` block in `global.css`**

In `src/styles/global.css`, replace lines 772–836 (from `/* Architecture */` through the end of `.arch-arrow`) with:

```css
/* Architecture */
.architecture {
  padding: 80px 24px;
  max-width: 1080px;
  margin: 0 auto;
  border-top: 1px solid var(--border-light);
}

.arch-header {
  text-align: center;
  margin-bottom: 48px;
}

.arch-header .section-kicker { margin-bottom: 6px; }

.arch-flow {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 12px;
}

.arch-step {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px 20px;
  max-width: 200px;
  text-align: center;
  transition: transform 0.18s, box-shadow 0.18s;
}

.arch-step:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.06);
}

.arch-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: linear-gradient(135deg, #00C9A7, #3D5AFE);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.95rem;
  color: #fff;
  margin: 0 auto 14px;
}

.arch-step h4 {
  font-family: var(--font-display);
  font-weight: 700;
  margin-bottom: 6px;
  font-size: 1rem;
  color: var(--text);
}

.arch-step p {
  font-family: var(--font-body);
  font-size: 0.82rem;
  color: var(--text-body);
  line-height: 1.55;
}

.arch-arrow {
  font-family: var(--font-display);
  color: var(--text-mute);
  font-size: 1.3rem;
  margin-top: 44px;
  opacity: 0.6;
}
```

- [ ] **Step 3: Visual check**

Reload `/`. Architecture section: centered "Pipeline" kicker, gigantic gradient mono "How it works", four step cards each with a gradient rounded-square step number in white, mono h4, sans body text, lifting on hover.

- [ ] **Step 4: Commit**

```bash
git add src/components/Architecture.tsx src/styles/global.css
git commit -m "feat(architecture): gradient title and gradient step icons"
```

---

## Task 11: Inline opensource block in `App.tsx` — gradient title + gradient CTA

**Files:**
- Modify: `src/App.tsx:22-28` (the `<section className="opensource">` block)
- Modify: `src/styles/global.css:838-857` (the `/* Open Source */` block)

- [ ] **Step 1: Update the opensource section in `App.tsx`**

In `src/App.tsx`, replace:

```tsx
      <section className="opensource">
        <h2>Free & open source</h2>
        <p>ata-validator is MIT licensed and open to contributions.</p>
        <a href="https://github.com/mertcanaltin/ata-validator" target="_blank" className="btn btn-primary">
          Star on GitHub
        </a>
      </section>
```

with:

```tsx
      <section className="opensource">
        <div className="section-kicker">Free &amp; open source</div>
        <h2 className="section-title-xl gradient-text">MIT-licensed, hackable</h2>
        <p>ata-validator is MIT licensed and open to contributions.</p>
        <a href="https://github.com/mertcanaltin/ata-validator" target="_blank" className="btn-gradient">
          ★ Star on GitHub
        </a>
      </section>
```

- [ ] **Step 2: Replace the `/* Open Source */` block in `global.css`**

In `src/styles/global.css`, replace lines 838–857 (from `/* Open Source */` through the end of `.opensource p`) with:

```css
/* Open Source */
.opensource {
  padding: 80px 24px;
  text-align: center;
  border-top: 1px solid var(--border-light);
  max-width: 720px;
  margin: 0 auto;
}

.opensource .section-kicker { margin-bottom: 6px; }

.opensource h2 {
  margin-bottom: 16px;
}

.opensource p {
  font-family: var(--font-body);
  color: var(--text-body);
  margin-bottom: 28px;
  font-size: 1rem;
}
```

- [ ] **Step 3: Visual check**

Reload `/`. The opensource block sits centered: small kicker, gigantic gradient mono `MIT-licensed, hackable`, the line of body text, then the gradient pill `★ Star on GitHub`.

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx src/styles/global.css
git commit -m "feat(opensource): gradient title and gradient CTA"
```

---

## Task 12: `Footer.tsx` — subtle bg, ocean accents

**Files:**
- Modify: `src/components/Footer.tsx:30-34` (CTA button class swap)
- Modify: `src/styles/global.css:859-911` (the `/* Footer */` block)

- [ ] **Step 1: Swap the CTA button class in `Footer.tsx`**

In `src/components/Footer.tsx`, find:

```tsx
        <a href="https://github.com/ata-core/ata-validator" target="_blank" className="btn btn-primary">
          Star on GitHub
        </a>
```

Replace with:

```tsx
        <a href="https://github.com/ata-core/ata-validator" target="_blank" className="btn-gradient">
          ★ Star on GitHub
        </a>
```

- [ ] **Step 2: Replace the `/* Footer */` block in `global.css`**

In `src/styles/global.css`, replace lines 859–911 (from `/* Footer */` through the end of `.footer-bottom`) with:

```css
/* Footer */
.footer {
  border-top: 1px solid var(--border-light);
  background: var(--bg-subtle);
  padding: 48px 24px 28px;
}

.footer-inner {
  max-width: 1080px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
}

.footer-col h5 {
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 14px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.footer-col a {
  display: block;
  color: var(--text-dim);
  font-family: var(--font-body);
  font-size: 0.85rem;
  padding: 3px 0;
  text-decoration: none;
  transition: color 0.15s;
}

.footer-col a:hover { color: var(--text); }

.footer-cta {
  max-width: 1080px;
  margin: 40px auto 0;
  text-align: center;
}

.footer-cta p {
  font-family: var(--font-body);
  color: var(--text-body);
  font-size: 0.95rem;
  margin-bottom: 16px;
}

.footer-bottom {
  max-width: 1080px;
  margin: 32px auto 0;
  padding-top: 16px;
  border-top: 1px solid var(--border);
  text-align: center;
  font-family: var(--font-body);
  color: var(--text-mute);
  font-size: 0.8rem;
}
```

- [ ] **Step 3: Visual check**

Reload `/`. Footer now sits on the subtle surface (`#f8fafc`), column titles are mono small-caps with extra letter-spacing, links are sans dim, the `★ Star on GitHub` CTA is the gradient pill.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.tsx src/styles/global.css
git commit -m "feat(footer): subtle ocean surface and gradient CTA"
```

---

## Task 13: Docs page — palette and font flow + sidebar accent + light DocsCode

**Files:**
- Modify: `src/components/DocsCode.tsx:11-24` (the `T` palette)
- Modify: `src/Docs.css` — sidebar active item rule, code rules

- [ ] **Step 1: Update the DocsCode syntax palette to light ocean**

In `src/components/DocsCode.tsx`, replace lines 11–24 (the `T` constant and its closing `as const`) with:

```tsx
// Light ocean palette — works on #f8fafc surface
const T = {
  keyword:  '#3D5AFE',  // brand blue
  string:   '#0d9488',  // brand soft
  number:   '#7088FF',  // softer blue
  comment:  '#94a3b8',  // mute
  func:     '#0a1929',  // text
  variable: '#0d9488',  // brand soft
  property: '#3D5AFE',  // brand blue
  type:     '#3D5AFE',  // brand blue
  punct:    '#475569',  // body
  operator: '#475569',  // body
  plain:    '#0a1929',  // text
  accent:   '#0d9488',  // brand soft
} as const
```

- [ ] **Step 2: Inspect `src/Docs.css` to find the rules to update**

Read `src/Docs.css` (221 lines). Identify these blocks (line numbers may differ slightly):

- Sidebar TOC active item rule (look for `.docs-toc a.active` or similar).
- Inline `<code>` rule.
- `.docs-code` block rule (`pre.docs-code`).

- [ ] **Step 3: Edit `src/Docs.css`**

Make these targeted edits:

1. **Sidebar active item.** Find the rule for the active sidebar TOC item (search for `.active` inside a TOC selector). Replace its `color`/`border` with:

    ```css
    color: var(--brand-soft);
    border-left: 2px solid;
    border-image: var(--gradient) 1;
    ```

   If the rule is `.docs-toc a.active`, the full result should look like:

    ```css
    .docs-toc a.active {
      color: var(--brand-soft);
      font-weight: 600;
      border-left: 2px solid;
      border-image: var(--gradient) 1;
      padding-left: 10px;
    }
    ```

   (Adjust the existing padding to make room for the 2px left border — bump it up by 2px from whatever the current padding-left is.)

2. **Inline `<code>` color.** Find the rule for inline code inside docs prose (likely `.docs code` or `.docs-content code`). Update to:

    ```css
    background: var(--bg-tint);
    color: var(--brand-soft);
    border: 1px solid var(--brand-tint);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: var(--font-code);
    font-size: 0.85em;
    ```

3. **`.docs-code` block.** Find `pre.docs-code` (or `.docs-code`). Update to:

    ```css
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 16px 18px;
    font-family: var(--font-code);
    font-size: 0.85rem;
    line-height: 1.7;
    color: var(--text);
    overflow-x: auto;
    ```

   Make sure any `color` set on a child `code` element does not override the per-token spans rendered by `DocsCode.tsx`.

   If you can't find these exact selectors, search for the existing dark backgrounds (e.g. `#1a1a1a`, `#161616`, `#0d1117`) inside `Docs.css` and convert them to the light surfaces above. Every dark surface inside Docs should become `var(--bg-subtle)` or white, and every dark text token should resolve to `var(--text)` or its dimmer variants.

- [ ] **Step 4: Visual check**

Navigate to `/docs`. The Docs sidebar's active link should show in `--brand-soft` teal with a tiny gradient left border. Inline code in the prose reads in teal on a soft tinted pill. Code blocks are now light, with brand-blue keywords / teal strings / mute comments.

- [ ] **Step 5: Commit**

```bash
git add src/components/DocsCode.tsx src/Docs.css
git commit -m "feat(docs): light ocean code blocks and gradient sidebar accent"
```

---

## Task 14: Final QA pass

**Files:** None (verification only).

- [ ] **Step 1: Run lint and TypeScript build**

```bash
npm run lint
npm run build
```

Expected: lint passes (warnings OK if pre-existing; no new ones). `tsc -b && vite build` exits 0 and produces `dist/`.

- [ ] **Step 2: Walk the full home page and check the design checklist**

In the browser, reload `/` and visually verify:

- [ ] Nav: ocean-gradient SVG `ata` logo, tagline visible ≥ 768px, links dim → text on hover.
- [ ] Hero: ocean badge, mono h1 with gradient "Validator", gradient `Get Started →` button, white secondary, four gradient stat values, light chart card, soft teal radial glow behind chart.
- [ ] Foundation: 4-column row, each cell has a gradient icon and a mono heading.
- [ ] Features: small "It's all about" kicker, giant gradient mono "Speed without compromise", section labels in `--brand-soft` teal, mono h3, light code windows with neutral dots, gradient bullet dots.
- [ ] Benchmarks: full-width grid background, kicker, giant gradient mono "Numbers that matter", left column with `70x` and `2,729x` gradient stats, right column with light chart card, winning bar gradient + glow, highlighted label/value in brand-soft.
- [ ] Compliance: kicker, gradient mono "Drop-in compatible", ocean-gradient ring with gradient `98.5%` text, keyword pills with tiny gradient dots.
- [ ] QuickStart: kicker, gradient mono "Quick Start", lifting cards.
- [ ] Architecture: centered kicker, gradient mono "How it works", gradient step icons, lifting cards.
- [ ] Opensource: centered, gradient mono "MIT-licensed, hackable", gradient pill CTA.
- [ ] Footer: subtle bg surface, mono uppercase column titles with letter-spacing, sans dim links, gradient CTA pill.

- [ ] **Step 3: Walk `/docs`**

- [ ] Sidebar: active item painted in brand-soft with a gradient left border.
- [ ] Inline code: teal text on tinted pill.
- [ ] Code blocks: light surface, brand-blue keywords, teal strings, mute comments.

- [ ] **Step 4: Mobile / narrow viewport check**

Resize the window to ~360px wide. Verify:

- Nav tagline disappears, links remain.
- Hero stacks; chart sits below text.
- Foundation collapses to 1 column.
- Benchmarks stats lay out in a row above the chart.
- Compliance grid stacks; ring + details lay out vertically.
- Architecture flow goes vertical with rotated arrows.
- Footer collapses to 2 columns then 1.

- [ ] **Step 5: Search for legacy color references**

```bash
grep -nE "#10b981|#28c840|#febc2e|#ff5f57|--green:|--accent-soft" src/styles/global.css src/Docs.css
```

The `--*` legacy aliases should be the only matches inside `:root` — no usages elsewhere. If anything else lights up, decide whether it's harmless legacy or needs swapping to the new tokens.

- [ ] **Step 6: Commit any cleanup**

If anything required follow-up edits in this task (e.g. removing legacy color references that were missed), commit them:

```bash
git add -p
git commit -m "chore(theme): clean up stale color references"
```

If nothing needs cleanup, this task ends without a commit.

---

## Self-Review Notes

This plan was reviewed against `docs/superpowers/specs/2026-04-26-elysia-style-redesign-design.md`. Coverage:

- Spec § Color tokens → Task 1.
- Spec § Typography tokens → Task 1 (tokens) + per-component tasks (apply per font role).
- Spec § Component primitives → Task 1 (utilities) + per-component overrides.
- Spec § Section 1–11 (Nav, Hero, Foundation, Features, Benchmarks, Compliance, QuickStart, Architecture, opensource, Footer, CodeWindow) → Tasks 2–12.
- Spec § Section 12 (Docs) → Task 13.
- Spec § Risks (gradient overuse, font mix audit, legacy color leakage) → Task 14 checklist.

Type / class consistency: every utility class introduced in Task 1 (`.gradient-text`, `.gradient-bar`, `.btn-gradient`, `.badge-ocean`, `.feature-icon`, `.grid-bg`, `.section-kicker`, `.section-title-xl`) is used in later tasks under those exact names.
