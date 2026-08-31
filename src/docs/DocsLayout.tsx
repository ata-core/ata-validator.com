import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import { DOC_GROUPS, DOC_PAGES, docHref } from './registry'
import { TopBar } from './TopBar'
import './docs.css'

// The documentation used to be one page with anchors. Links to those anchors
// exist outside this site, so they are pointed at the page that now holds the
// section instead of quietly landing on the introduction.
const LEGACY_ANCHORS: Record<string, string> = {
  '#quick-start': '/docs/quick-start',
  '#install': '/docs/installation',
  '#how': '/docs/how-it-works',
  '#features': '/docs/api',
  '#dialects': '/docs/dialects',
  '#api': '/docs/api',
  '#integrations': '/docs/integrations',
  '#compliance': '/docs/compliance',
  '#faq': '/docs/faq',
}

type Heading = { text: string; id: string; page: string; level: number }

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

export default function DocsLayout() {
  const location = useLocation()
  const slug = location.pathname.replace(/^\/docs\/?/, '').replace(/\/$/, '')
  const index = DOC_PAGES.findIndex((p) => p.slug === slug)
  const prev = index > 0 ? DOC_PAGES[index - 1] : null
  const next = index >= 0 && index < DOC_PAGES.length - 1 ? DOC_PAGES[index + 1] : null

  const legacyTarget =
    location.pathname.replace(/\/$/, '') === '/docs' ? LEGACY_ANCHORS[location.hash] : undefined

  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState('')
  const [navOpen, setNavOpen] = useState(false)
  const articleRef = useRef<HTMLDivElement>(null)
  const headingIndex = useRef(new Map<string, { text: string; id: string; page: string }[]>())

  // Give every h2/h3 in the article an id, then read them back as the outline.
  useEffect(() => {
    const root = articleRef.current
    if (!root) return
    const found: Heading[] = []
    root.querySelectorAll('h2, h3').forEach((el) => {
      const text = (el.textContent ?? '').replace('#', '').trim()
      if (!text) return
      const id = el.id || slugify(text)
      el.id = id
      found.push({ text, id, page: slug, level: el.tagName === 'H3' ? 3 : 2 })
    })
    headingIndex.current.set(
      slug,
      found.map((h) => ({ text: h.text, id: h.id, page: h.page })),
    )
    // Published on the next frame: the outline is derived from the rendered
    // article, so it lands one paint after the content it describes.
    const frame = requestAnimationFrame(() => {
      setHeadings(found)
      setActiveId(found[0]?.id ?? '')
    })
    return () => cancelAnimationFrame(frame)
  }, [slug, location.pathname])

  // Scroll to the hash target once the page it belongs to has rendered.
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0)
      return
    }
    const el = document.getElementById(location.hash.slice(1))
    if (el) el.scrollIntoView({ block: 'start' })
  }, [location.pathname, location.hash, headings.length])

  // Highlight the outline entry for the heading nearest the top of the viewport.
  useEffect(() => {
    if (headings.length === 0) return
    const onScroll = () => {
      let best = headings[0].id
      for (const h of headings) {
        const el = document.getElementById(h.id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= 120) best = h.id
      }
      setActiveId(best)
    }
    const frame = requestAnimationFrame(onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [headings])

  const getHeadings = useCallback(() => headingIndex.current, [])

  const grouped = useMemo(
    () => DOC_GROUPS.map((g) => ({ group: g, pages: DOC_PAGES.filter((p) => p.group === g) })),
    [],
  )

  if (legacyTarget) return <Navigate to={legacyTarget} replace />

  return (
    <div className="dx">
      <TopBar onToggleNav={() => setNavOpen((v) => !v)} getHeadings={getHeadings} />

      <div className="dx-body">
        {navOpen && <div className="dx-scrim" onClick={() => setNavOpen(false)} />}

        <aside className={navOpen ? 'dx-sidebar open' : 'dx-sidebar'}>
          {grouped.map(({ group, pages }) => (
            <div className="dx-group" key={group}>
              <p className="dx-group-label">{group}</p>
              <ul>
                {pages.map((p) => (
                  <li key={p.slug}>
                    <Link
                      to={docHref(p.slug)}
                      className={p.slug === slug ? 'active' : undefined}
                      onClick={() => setNavOpen(false)}
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        <main className="dx-main">
          <article className="dx-article" ref={articleRef}>
            <Outlet />
          </article>

          {(prev || next) && (
            <nav className="dx-pager">
              {prev && (
                <Link to={docHref(prev.slug)}>
                  <span className="dx-pager-dir">Previous</span>
                  {prev.title}
                </Link>
              )}
              {next && (
                <Link to={docHref(next.slug)} className="dx-pager-next">
                  <span className="dx-pager-dir">Next</span>
                  {next.title}
                </Link>
              )}
            </nav>
          )}
        </main>

        <aside className="dx-outline">
          {headings.length > 1 && (
            <>
              <p className="dx-outline-label">On this page</p>
              <ul>
                {headings.map((h) => (
                  <li key={h.id}>
                    <a
                      href={`#${h.id}`}
                      className={`${h.level === 3 ? 'dx-outline-sub' : ''}${
                        activeId === h.id ? ' active' : ''
                      }`}
                      onClick={(e) => {
                        e.preventDefault()
                        document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        history.replaceState(null, '', `#${h.id}`)
                      }}
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </aside>
      </div>

    </div>
  )
}
