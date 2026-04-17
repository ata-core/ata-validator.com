import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Docs.css'

export default function Docs() {
  const [tocOpen, setTocOpen] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1025px)')
    setTocOpen(mq.matches)
    const handler = (e: MediaQueryListEvent) => setTocOpen(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <>
      <nav className="docs-nav">
        <Link to="/" className="docs-back">← Back to home</Link>
        <span className="docs-title">ata-validator docs</span>
      </nav>

      <div className="docs-layout">
        <aside className="docs-sidebar">
          <details className="docs-toc" open={tocOpen}>
            <summary>Contents</summary>
            <ul>
              <li><a href="#quick-start">Quick start</a></li>
              <li><a href="#what">What is ata</a></li>
              <li><a href="#how">How it works</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#install">Installation</a></li>
              <li><a href="#api">API reference</a></li>
              <li><a href="#integrations">Integrations</a></li>
              <li><a href="#compliance">Compliance</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </details>
        </aside>

        <main className="docs-content">
          {/* Content sections added in later tasks */}
          <section id="quick-start">
            <h1>Quick start</h1>
            <p>Content coming in next task.</p>
          </section>
        </main>
      </div>
    </>
  )
}
