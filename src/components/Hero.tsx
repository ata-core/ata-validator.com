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
          bytecode engine. Multi-core parallel validation at 12.5M ops/sec with 98.6% spec compliance.
        </p>
        <div className="hero-buttons">
          <a href="#quickstart" className="btn btn-primary">Get Started</a>
          <a href="https://github.com/mertcanaltin/ata-validator" target="_blank" className="btn btn-secondary">View on GitHub</a>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-value">145x</span>
            <span className="stat-label">Faster Compilation</span>
          </div>
          <div className="stat">
            <span className="stat-value">5.9x</span>
            <span className="stat-label">Faster than ajv</span>
          </div>
          <div className="stat">
            <span className="stat-value">12.5M</span>
            <span className="stat-label">Validations/sec</span>
          </div>
          <div className="stat">
            <span className="stat-value">98.6%</span>
            <span className="stat-label">Spec Compliance</span>
          </div>
        </div>
      </div>
      <div>
        <CodeWindow title="bench.txt">{`=== ata vs ajv ===

Schema Compilation:
  ata   107,139 ops/sec
  ajv       891 ops/sec
  ata is 145x faster

Single Call — isValid(Buffer):
  ata 1,650,000 ops/sec
  ajv 1,770,000 ops/sec
  nearly equal

Parallel Batch (10K items):
  ata  12,498,242 items/sec
  ajv   2,132,841 items/sec
  ata is 5.9x faster`}</CodeWindow>
      </div>
    </section>
  )
}
