import { CodeWindow } from './CodeWindow'

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-glow" />
      <div>
        <div className="hero-badge">Powered by simdjson</div>
        <h1>
          Ultra-fast JSON Schema{' '}
          <span className="accent">Validator</span>
        </h1>
        <p className="hero-desc">
          A native C++ JSON Schema validator built on <strong>simdjson</strong>, <strong>RE2</strong>, and a custom
          bytecode engine. Validates at millions of operations per second with 98.6% spec compliance.
        </p>
        <div className="hero-buttons">
          <a href="#quickstart" className="btn btn-primary">Get Started</a>
          <a href="https://github.com/mertcanaltin/ata-validator" target="_blank" className="btn btn-secondary">View on GitHub</a>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-value">137x</span>
            <span className="stat-label">Faster Compilation</span>
          </div>
          <div className="stat">
            <span className="stat-value">1.4M</span>
            <span className="stat-label">Validations/sec</span>
          </div>
          <div className="stat">
            <span className="stat-value">98.6%</span>
            <span className="stat-label">Spec Compliance</span>
          </div>
        </div>
      </div>
      <div>
        <CodeWindow title="bench.txt">{`=== ata v0.1.0 Benchmark ===

Schema Compilation:
  compile schema          155,000 ops/sec

Validation (pre-compiled):
  valid document        1,400,000 ops/sec
  invalid document        730,000 ops/sec

On Demand (large doc):
  DOM path                 31,000 ops/sec
  On Demand path           70,000 ops/sec
  Speedup: 2.3x`}</CodeWindow>
      </div>
    </section>
  )
}
