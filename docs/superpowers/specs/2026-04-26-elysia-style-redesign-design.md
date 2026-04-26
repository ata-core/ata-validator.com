# ata-validator.com — Elysia‑inspired Visual Refresh

**Date:** 2026-04-26
**Status:** Design (pending implementation plan)
**Scope:** Visual refresh. Existing routes and component boundaries are preserved. No new bundles, no framework changes, no IA reorganization. One content change: the `Foundation` section is repurposed into a 4‑column feature row (Elysia pattern); its current decorative tabs are removed. Section titles across the page gain new "kicker + oversized gradient mono headline" treatments — these are additive copy strings, not rewrites of existing body content.

## Goal

Bring the visual language of ata-validator.com closer to the polish and personality of elysiajs.com, while keeping ata's existing information architecture and developer-focused content density intact.

The redesign should:

1. Establish a recognizable brand system anchored on the new ocean‑gradient logo (`public/ata-logo.svg`).
2. Replace the current monochrome palette with a light‑themed, ocean‑gradient accent system.
3. Improve long‑form readability by separating display type (mono) from body type (sans).
4. Adopt three Elysia structural patterns below the hero: 4‑column feature row, oversized gradient stat + horizontal bar chart, oversized gradient mono section headings.

Out of scope: dark mode, mascot/illustration, scroll‑driven animations, interactive demo widget, IA changes, copy rewrites, Docs page redesign (Docs receives the typography + palette update only — see Section 7).

## Design Decisions

| Area | Decision |
|---|---|
| Theme | Light only. Background `#ffffff`. No dark variant in this iteration. |
| Brand gradient | `linear-gradient(90deg, #00C9A7 0%, #00B7D6 50%, #3D5AFE 100%)` — locked to logo. |
| Typography | Hybrid: IBM Plex Mono for logo + headings + code; Inter for body, nav, badges, captions. |
| Hero layout | Split (text left, benchmark chart right) — preserves existing info density. |
| Below‑hero patterns | Adopted from Elysia: 4‑col feature row, oversized stat + bar chart with grid background, oversized gradient mono section headings. |
| Motion | No new motion in this iteration beyond existing hover transitions. Subtle `box-shadow` lift on cards, `0 0 16px` glow on the winning bench bar — that's it. |

## Visual System

### Color tokens (replaces `:root` block in `src/styles/global.css`)

```
--bg:           #ffffff
--bg-subtle:    #f8fafc        /* card surface, code well */
--bg-tint:      #f0fdfa        /* badge backgrounds */
--border:       #e2e8f0
--border-light: #f1f5f9

--text:         #0a1929        /* primary text & headings */
--text-body:    #475569        /* body paragraphs */
--text-dim:     #64748b        /* nav links, secondary */
--text-mute:    #94a3b8        /* captions, footnotes */

--brand-1:      #00C9A7        /* gradient start (teal) */
--brand-2:      #00B7D6        /* gradient mid (cyan) */
--brand-3:      #3D5AFE        /* gradient end (blue) */
--brand-soft:   #0d9488        /* solid accent for links/highlight values */
--brand-tint:   #99f6e4        /* badge border */
--brand-glow:   rgba(0,183,214,0.4)

--gradient: linear-gradient(90deg, #00C9A7 0%, #00B7D6 50%, #3D5AFE 100%);
```

Gradient is applied as **brand vehicle**, not chrome. Use only on:

- Logo wordmark (already painted in SVG)
- The single accented word in h1 ("Validator")
- Oversized section titles (h2 across hero‑below sections)
- The oversized stat numbers ("70x", "2,729x", "98.5%", "0.5KB")
- The winning bar in benchmark charts (the `.highlight` row only)
- Primary CTA buttons
- Feature‑row icons (as a gradient‑filled rounded square background)

Gradient must not appear on body text, nav links, secondary buttons, table rows, or large surface fills. The contrast with white surfaces is what gives it impact; overusing it dilutes the signal.

### Typography tokens

```
--font-display: 'IBM Plex Mono', ui-monospace, monospace;   /* logo, h1–h4, stats */
--font-body:    'Inter', -apple-system, sans-serif;          /* paragraphs, nav, UI */
--font-code:    'JetBrains Mono', 'IBM Plex Mono', monospace; /* code blocks */
```

Type scale (display, mono):

```
h1 hero:        clamp(36px, 5vw, 64px)  weight 700  letter-spacing -0.03em  line-height 1.05
h2 stat-big:    clamp(56px, 8vw, 96px)  weight 700  letter-spacing -0.04em  line-height 0.95
h2 section:     clamp(40px, 6vw, 72px)  weight 700  letter-spacing -0.035em line-height 1
h3 feature:     20px                    weight 700  letter-spacing -0.02em
h4 card:        14px                    weight 700  letter-spacing -0.02em
code inline/block: 13–14px              weight 500
```

Body scale (Inter):

```
lead (hero desc, section lead): 16–18px line-height 1.6  color --text-body
body:                          14–15px line-height 1.6  color --text-body
caption / footnote:            12–13px line-height 1.5  color --text-mute
nav / badge:                   13px    weight 500       color --text-dim
```

### Component primitives

- **Gradient text**: `background: var(--gradient); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;` Apply via `.gradient-text` utility.
- **Gradient bar**: `background: var(--gradient);` on the highlight bench row only. Dim rows use `#cbd5e1`.
- **Gradient button (primary)**: `var(--gradient)` background, white text, no border, `border-radius: 9px`, `padding: 11px 20px`, `font-family: var(--font-body)`, weight 600. Hover: `box-shadow: 0 4px 16px rgba(61,90,254,0.18)`.
- **Secondary button**: white background, `1px solid var(--border)`, `--text` color, same dimensions as primary.
- **Badge**: `background: var(--bg-tint)`, `color: var(--brand-soft)`, `border: 1px solid var(--brand-tint)`, `padding: 5px 12px`, `border-radius: 999px`, `font-size: 12px`, weight 500, `font-family: var(--font-body)`.
- **Card**: white background, `1px solid var(--border)`, `border-radius: 12px`. Hover lifts `translateY(-2px)` with `box-shadow: 0 12px 32px rgba(0,0,0,0.08)`.
- **Feature icon**: 28×28 rounded square (`border-radius: 7px`), `background: linear-gradient(135deg, #00C9A7, #3D5AFE)`, white emoji or SVG centered.
- **Grid background** (used on `.benchmarks` and the new big‑stat section): two crossed linear gradients, `rgba(148,163,184,0.12)` 1px lines on a 32px grid.

## Section‑by‑Section Treatment

Each section keeps its current data, structure, and component file. Only the visual layer changes.

### 1. `Nav.tsx`

Current: minimal logo wordmark + 4 text links + GitHub icon.

Changes:

- Logo becomes the new SVG wordmark from `public/ata-logo.svg`, rendered via `<img>` at ~26px height. Keep `Link to="/"` wrapper.
- Add a tagline span next to the logo (visible ≥ 768px): "Ultra-fast JSON Schema validator" in `--font-body` 13px `--text-dim`. Hidden on mobile.
- Nav background: keep fixed + `backdrop-filter: blur(12px)`, `background: rgba(255,255,255,0.85)`, bottom border `var(--border-light)`.
- Links and the GitHub icon use `--text-dim`, hover `--text`. No other change to link list.

### 2. `Hero.tsx`

Current: split, text left (badge + h1 + desc + 2 CTAs + 4 stats), chart right (sekmeli benchmark + view link).

Changes:

- Layout: keep split (`grid-template-columns: 1fr 1fr`, gap 48px). Stack on `< 900px`.
- Badge: new ocean tint per badge primitive above.
- h1: `--font-display`, scale per token. The single accented word "Validator" wears `.gradient-text`.
- Description: `--font-body`, 16–18px, `--text-body`, max-width 480px.
- Buttons: primary becomes gradient button per primitive; secondary white with border per primitive. `Docs` mobile-only button keeps current behavior, restyled to secondary.
- Hero stats row (currently below buttons): keep the four `.stat` blocks but values use `.gradient-text` and `--font-display`. Labels stay Inter `--text-mute`.
- Chart card: white surface with `1px solid var(--border)` and `border-radius: 12px`. Tabs: active = solid `--text` background + white text; inactive = `var(--bg-subtle)` background + `--text-dim`. Highlighted row's bar uses gradient + `box-shadow: 0 0 16px var(--brand-glow)`. Other bars use `#cbd5e1`. Values column for highlight rows uses `--brand-soft` weight 700.
- Chart background glow: replace current `.hero-glow` with a single soft radial blob anchored top-right of the chart, `background: radial-gradient(circle, rgba(0,201,167,0.15), transparent 60%)`, `filter: blur(60px)`. Keeps the canvas calm.

### 3. `Foundation.tsx` → becomes the 4‑column **Feature row** (Elysia pattern)

Current: section title + 5 inline tabs (decorative).

Changes:

- Repurpose this section into the 4‑col feature row. Drop the inline tabs (they're decorative and add little; their topics are already represented by the cards below).
- Remove the existing `<h2>` heading text. The grid sits flush under the hero with a top border `var(--border-light)`.
- Four columns at ≥ 900px, two at 600–900px, one below. Column gap 24px, row padding 32px vertical.
- Each column: gradient feature icon (28×28, primitive above) + h3 (mono, 20px, `--text`) + 2‑line `--font-body` description in `--text-dim`, line-height 1.6.
- Initial content (placeholder, may be tuned by user before implementation):
  - ⚡ Native speed — "simdjson + RE2 + JS codegen. Up to 70x faster than ajv."
  - 📦 Tiny bundle — "0.5KB compile mode. Browser-ready, zero deps."
  - 🔒 ReDoS-safe — "RE2 engine, no backtrack. 2,000x safer on attack patterns."
  - ✓ Spec-compliant — "98.5% Draft 2020-12. Full $dynamicRef + $anchor."

The 5 pill labels from the dropped tabs (`simdjson`, `RE2`, `Codegen`, `On Demand`, `Draft 7 + 2020-12`) are not lost — they correspond to topics already covered in the deeper `Features` rows below.

### 4. `Features.tsx`

Current: 4 alternating rows (text left, code right; reverses every other row), each with label + h3 + description + 3 bullets + code window.

Changes:

- Keep the existing 4 rows and alternation. No structural change.
- Section receives a new oversized gradient mono **section title** above the rows: a small kicker (`It's all about` in `--font-body` `--text-dim`) followed by an h2 in `.gradient-text` mono at the section heading scale. Suggested copy: "Speed without compromise" — final wording confirmed during implementation.
- Per‑row label (`PARSING`, `REGEX ENGINE`, etc.): keep, but switch color to `--brand-soft` and add `letter-spacing: 0.12em`.
- Per‑row h3: mono, `--text`, scale h3 feature.
- Description and bullet text: Inter `--text-body`. `<strong>` inside bullets: `--text` weight 700.
- `CodeWindow`: see Section 6.

### 5. `Benchmarks.tsx`

Current: section title + subtitle + tabbed bar chart card.

Changes:

- Wrap the section in the **grid background** primitive (32px grid, `rgba(148,163,184,0.12)` lines). Padding 60px vertical, full‑bleed background.
- Replace the section's current `<h2>` with the **Big stat + bar chart** Elysia pattern:
  - Left column (max-width 280px): two stacked oversized gradient mono stats — `70x` (faster on $dynamicRef) and `2,729x` (faster compilation). Labels Inter `--text-body`.
  - Right column: the existing tabbed chart, but bars use the gradient primitive for the highlight row and `#cbd5e1` for others. Values for highlight rows: `--brand-soft` weight 700. Subtitle stays.
- Tab pills above the chart: same active/inactive styling as in the hero chart for consistency.
- The `View benchmark →` link uses `--brand-soft`, weight 500.
- Below the section, a smaller h2 in gradient mono can introduce the deeper benchmark grid if needed; not required for v1.

### 6. `CodeWindow.tsx` (used by Features and QuickStart)

Current: dark code window with traffic-light dots.

Changes:

- Light variant by default to match the rest of the page: `background: var(--bg-subtle)`, `border: 1px solid var(--border)`, `border-radius: 10px`.
- Header bar: `background: #ffffff`, bottom border `var(--border-light)`, padding 10px 14px. Title text Inter 12px `--text-dim`. Replace the colored traffic-light dots with three uniform `#cbd5e1` dots — the playful macOS reference is at odds with the cleaner direction.
- Code body: `--font-code`, 13px, `--text` for default text. Padding 14px.
- Syntax tokens (best-effort, since current render is plain):
  - keyword: `#3D5AFE`
  - string: `#0d9488`
  - number: `#7088FF`
  - comment: `#94a3b8` italic
  - punctuation: `--text`
- The Docs `DocsCode.tsx` syntax highlighter follows the same palette in light variant.

### 7. `QuickStart.tsx`

Current: section title + 3‑card grid (Node.js, Build-time, C/C++).

Changes:

- Section receives an oversized gradient mono section title: kicker `Get started in seconds` in body sans, h2 `.gradient-text` mono at section heading scale.
- Cards: white surface per primitive, padding 24px, gap 20px between cards. h4 mono `--text` 16px. Card hover lift per primitive.
- Code windows inside cards use the new light `CodeWindow`.

### 8. `Compliance.tsx`

Current: heading + paragraph + circular score ring (98.5%) + keyword grid.

Changes:

- h2 → oversized gradient mono section title.
- Score ring SVG: replace the dark navy track (`#1a2332`) with `var(--border)` (`#e2e8f0`); replace the green progress stroke (`#00d4aa`) with `url(#oceanGrad)` referencing an inline `<defs>` linear gradient using the brand 3‑stop ramp. The big `98.5%` text uses `.gradient-text` mono.
- Score detail rows: Inter `--text-body`, with `<strong>` values getting `--text` weight 700.
- Keyword pills (`.kw.pass`): white background, `1px solid var(--border-light)`, `--text` color, `font-family: var(--font-code)`, 12px. Add a tiny gradient dot (4×4 circle) before the keyword text using `background: var(--gradient)`.

### 9. `Architecture.tsx`

Current: heading + 4 numbered steps with arrows.

Changes:

- h2 → oversized gradient mono section title.
- Step number (`arch-icon`): becomes the gradient feature‑icon primitive at 36×36 with `--font-display` mono digit centered, white.
- Step h4: mono `--text`. Step paragraph: Inter `--text-body`.
- Arrows (`→`): `--text-mute`, `--font-display`, 24px. Vertical on `< 900px`.

### 10. "Free & open source" inline section in `App.tsx`

Current: simple h2 + paragraph + Star button.

Changes:

- Wrap as an oversized gradient mono section title strip. Optional: render the **Star on GitHub** button using the gradient primary primitive. Keep paragraph small.
- Consider centering the block (`text-align: center`, max-width 720px, margin auto). Final placement same.

### 11. `Footer.tsx`

Current: 4 link columns + CTA strip + copyright.

Changes:

- Background: `var(--bg-subtle)`, top border `var(--border)`.
- Column titles (h5): mono `--text` 13px, `letter-spacing: 0.12em`, uppercase.
- Links: Inter 13px `--text-dim`, hover `--text`.
- CTA strip: Inter copy; the **Star on GitHub** button uses the gradient primary primitive.
- Bottom row: Inter 12px `--text-mute`.

### 12. `Docs.tsx` + `Docs.css`

Out of scope for full restyle. Apply only:

- Same `:root` color tokens and font tokens (so palette/typography flow through automatically).
- Sidebar TOC active item: `--brand-soft` color, 2px left border with `var(--gradient)`.
- Inline code and code blocks use the new light `CodeWindow` palette.
- Headings keep their current scale; no oversized gradient titles inside Docs (would clash with long-form reading).

## Information Architecture

No changes. Section order on `/` stays: Nav → Hero → Foundation (now feature row) → Features → Benchmarks → Compliance → QuickStart → Architecture → "Free & open source" → Footer.

## Implementation Notes

- This is a **CSS-first** redesign. Most of the work is in `src/styles/global.css` (`:root`, type tokens, primitives) plus targeted JSX edits to swap hero stat values into `.gradient-text` spans, switch button classes, replace the `Foundation` body, drop `CodeWindow` traffic lights, and add the inline `<defs>` gradient to the compliance ring.
- Inter and JetBrains Mono should be loaded via `<link>` in `index.html` alongside the existing IBM Plex Mono. Use `&display=swap` and `font-display: swap` in `@font-face` if local copies are added later.
- The new logo replaces the current text wordmark in `Nav.tsx`. The `<svg>` is already self-contained; rendering via `<img src="/ata-logo.svg">` is the simplest path and keeps the gradient intact.
- No new dependencies. No build pipeline changes.
- All existing `id`/anchor hashes (`#features`, `#benchmarks`, `#quickstart`) must remain wired so the nav anchor links still work.

## Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Gradient overuse turns the page into a brand demo. | Restrict gradient to the 7 vehicles listed in "Visual System". Do not add more without justification. |
| Inter + Plex Mono mix can feel inconsistent if applied unevenly. | Audit pass during implementation: every component file should use exactly the right font token; nothing inherits accidentally. |
| The new logo's gradient renders darker on tinted surfaces (badges, code wells). | The logo lives only in the nav (white surface) and can repeat in the footer (subtle surface) — the gradient still reads. Avoid placing the logo on `--bg-tint`. |
| Existing dark `CodeWindow` is part of the current visual identity; flipping it to light could feel less "developer". | Keep the dotted header (just neutral colors) and the mono font; the surface stays calm but recognizably code. If it reads weak in implementation, revisit before merge. |

## Out of Scope (parking lot for later iterations)

- Dark mode + theme toggle.
- Mascot or character illustration.
- Scroll-driven animations / sticky reveal patterns.
- Interactive "live validate" demo widget.
- Validator comparison tabs (TypeBox / Zod / Valibot side-by-side runnable code).
- Trusted-by / runtime-compatibility logo grid.
- Twitter testimonial carousel.
- Sponsorship section.
- IA reorganization, copy rewriting, or new sections beyond the 4-col feature row repurposing.

## Validation

This design is considered correctly applied when:

- Every section across `/` and `/docs` uses the new color tokens (no `#111`, no `#10b981`, no `#fafafa` legacy values lurking).
- Every heading uses `--font-display`; every body paragraph uses `--font-body`.
- The brand gradient appears only on the seven vehicles named in "Visual System".
- The new logo replaces every existing wordmark instance.
- Hero, Benchmarks, and the new feature row read as one coherent system, not three different pages stitched together.
- A Lighthouse run after implementation does not regress: page weight (font payload aside) within +5%, contrast AA preserved on body text against `--bg`.
