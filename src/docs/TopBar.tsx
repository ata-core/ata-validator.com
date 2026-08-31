import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ATA_VERSION } from './registry'
import { SearchPalette } from './SearchPalette'

type HeadingIndex = Map<string, { text: string; id: string; page: string }[]>

// The bar at the top of every page. The landing page and the documentation
// share it so the two halves of the site do not drift apart. Search works on
// both: without a heading index it still finds every page.
export function TopBar({
  onToggleNav,
  getHeadings,
}: {
  onToggleNav?: () => void
  getHeadings?: () => HeadingIndex
}) {
  const [paletteOpen, setPaletteOpen] = useState(false)
  const location = useLocation()
  const inDocs = location.pathname.startsWith('/docs')

  const headingsGetter = useCallback(
    () => (getHeadings ? getHeadings() : (new Map() as HeadingIndex)),
    [getHeadings],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((v) => !v)
      }
      if (e.key === 'Escape') setPaletteOpen(false)
      if (e.key === '/') {
        const tag = (e.target as HTMLElement)?.tagName
        if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
          e.preventDefault()
          setPaletteOpen(true)
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header className="dx-topbar">
        {onToggleNav && (
          <button className="dx-menu-btn" aria-label="Open navigation" onClick={onToggleNav}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M2 4h12M2 8h12M2 12h12" />
            </svg>
          </button>
        )}

        <Link to="/" className="dx-brand">
          <span className="dx-brand-mark">ata</span>
        </Link>
        <span className="dx-version">v{ATA_VERSION}</span>

        <div className="dx-topbar-spacer" />

        <button className="dx-search-trigger" onClick={() => setPaletteOpen(true)}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="7" cy="7" r="4.5" />
            <path d="M10.5 10.5 14 14" />
          </svg>
          <span>Search</span>
          <kbd>⌘K</kbd>
        </button>

        <nav className="dx-toplinks">
          <Link to="/docs" className={inDocs ? 'active' : undefined}>Docs</Link>
          <Link to="/playground" className="dx-hide-sm">Playground</Link>
          <a
            href="https://github.com/ata-core/ata-validator"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </nav>
      </header>

      {paletteOpen && (
        <SearchPalette onClose={() => setPaletteOpen(false)} getHeadings={headingsGetter} />
      )}
    </>
  )
}
