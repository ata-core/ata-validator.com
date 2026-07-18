import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ErrorShowcase } from './ErrorShowcase'

const INSTALL_CMD = 'npm install ata-validator'
const RELEASE_URL = 'https://github.com/ata-core/ata-validator/releases/tag/v1.2.0'

export function Hero() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_CMD)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard unavailable; ignore silently */
    }
  }

  return (
    <section id="benchmarks" className="hero">
      <div className="hero-grid" aria-hidden />

      <div className="hero-content">
        <a href={RELEASE_URL} target="_blank" rel="noopener noreferrer" className="hero-badge badge-ocean">
          1.2 is out → every schema, every runtime
        </a>

        <h1 className="hero-title">
          <span className="gradient-text">
            JSON Schema validation,<br />
            finally readable.
          </span>
        </h1>

        <p className="hero-desc">
          ata-validator gives you <strong>tsc --pretty</strong> style errors with
          schema source frame, request payload byte offset, and stable error
          codes, in a <strong>1 KB</strong> compiled bundle.
        </p>

        <p className="hero-desc hero-desc-sub">
          First-class TypeScript. AOT compilation. Standard Schema V1. Drop-in for
          Fastify and RJSF. MIT licensed.
        </p>

        <p className="hero-proof">
          <a
            href="https://github.com/rjsf-team/react-jsonschema-form/blob/main/packages/docs/docs/api-reference/validator-ata.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            ships in react-jsonschema-form
          </a>
          <span aria-hidden> · </span>
          <a href="https://fastify.dev/docs/latest/Guides/Ecosystem/" target="_blank" rel="noopener noreferrer">
            listed in the Fastify docs
          </a>
          <span aria-hidden> · </span>
          <a
            href="https://github.com/ata-core/ata-validator/blob/master/docs/STABILITY.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            1.x stable
          </a>
        </p>

        <div className="hero-buttons">
          <a href={RELEASE_URL} target="_blank" rel="noopener noreferrer" className="btn-gradient">
            See the 1.2 release →
          </a>
          <a href="#quickstart" className="btn btn-secondary">
            Try in 30 seconds
          </a>
          <a
            href="https://github.com/ata-core/ata-validator"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            ★ GitHub
          </a>
          <Link to="/docs" className="btn btn-secondary btn-mobile-only">Docs</Link>
        </div>

        <div className="hero-install-block">
          <div className="hero-install-label">Install ata-validator</div>
          <div className="hero-install">
            <span className="hero-install-prompt" aria-hidden>$</span>
            <code className="hero-install-cmd">{INSTALL_CMD}</code>
            <button
              type="button"
              className="hero-install-copy"
              onClick={handleCopy}
              aria-label={copied ? 'Copied' : 'Copy install command'}
            >
              {copied ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="hero-card">
        <ErrorShowcase />
        <a className="pg-try-cta" href="/playground">Try it live &rarr;</a>
      </div>
    </section>
  )
}
