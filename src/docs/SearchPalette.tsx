import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DOC_PAGES, docHref } from './registry'

type Entry = {
  title: string
  page: string
  href: string
  haystack: string
}

// Built once: one entry per page, plus one per heading that the shell has
// registered while the reader browsed. Headings come from the live document,
// so the index never drifts from what is actually on the page.
function buildEntries(headings: Map<string, { text: string; id: string; page: string }[]>): Entry[] {
  const out: Entry[] = []
  for (const p of DOC_PAGES) {
    out.push({
      title: p.title,
      page: p.title,
      href: docHref(p.slug),
      haystack: [p.title, p.summary, ...(p.keywords ?? [])].join(' ').toLowerCase(),
    })
    for (const h of headings.get(p.slug) ?? []) {
      out.push({
        title: h.text,
        page: p.title,
        href: `${docHref(p.slug)}#${h.id}`,
        haystack: `${h.text} ${p.title}`.toLowerCase(),
      })
    }
  }
  return out
}

export function SearchPalette({
  onClose,
  getHeadings,
}: {
  onClose: () => void
  getHeadings: () => Map<string, { text: string; id: string; page: string }[]>
}) {
  const [query, setQuery] = useState('')
  const [cursor, setCursor] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  // Built once per opening: the palette is mounted only while it is open, so
  // the index always reflects the headings seen up to this point.
  const entries = useMemo(() => buildEntries(getHeadings()), [getHeadings])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return entries.filter((e) => e.title === e.page).slice(0, 8)
    const terms = q.split(/\s+/)
    return entries
      .map((e) => {
        let score = 0
        for (const t of terms) {
          const at = e.haystack.indexOf(t)
          if (at === -1) return null
          score += at === 0 ? 3 : 1
          if (e.title.toLowerCase().includes(t)) score += 2
        }
        return { e, score }
      })
      .filter((x): x is { e: Entry; score: number } => x !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map((x) => x.e)
  }, [query, entries])

  useEffect(() => {
    const id = requestAnimationFrame(() => inputRef.current?.focus())
    return () => cancelAnimationFrame(id)
  }, [])

  const go = (href: string) => {
    onClose()
    navigate(href)
  }

  return (
    <div
      className="dx-palette-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="dx-palette" role="dialog" aria-modal="true" aria-label="Search documentation">
        <input
          ref={inputRef}
          className="dx-palette-input"
          placeholder="Search the documentation"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setCursor(0)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') onClose()
            if (e.key === 'ArrowDown') {
              e.preventDefault()
              setCursor((c) => Math.min(c + 1, results.length - 1))
            }
            if (e.key === 'ArrowUp') {
              e.preventDefault()
              setCursor((c) => Math.max(c - 1, 0))
            }
            if (e.key === 'Enter' && results[cursor]) {
              e.preventDefault()
              go(results[cursor].href)
            }
          }}
        />
        <div className="dx-palette-results">
          {results.length === 0 ? (
            <p className="dx-palette-empty">Nothing matches that.</p>
          ) : (
            results.map((r, i) => (
              <button
                key={r.href + r.title}
                className={i === cursor ? 'dx-palette-item active' : 'dx-palette-item'}
                onMouseEnter={() => setCursor(i)}
                onClick={() => go(r.href)}
              >
                <div className="dx-palette-title">{r.title}</div>
                <div className="dx-palette-path">
                  {r.title === r.page ? r.href : `${r.page} · ${r.href}`}
                </div>
              </button>
            ))
          )}
        </div>
        <div className="dx-palette-foot">
          <span>↑↓ move</span>
          <span>↵ open</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  )
}
