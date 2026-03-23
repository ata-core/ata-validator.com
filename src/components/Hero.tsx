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
            <span className="stat-value">145x</span>
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
        <CodeWindow title="bench.txt">{`=== ata vs ajv — JSON string pipeline ===

Schema Compilation:
  ata compile              107,139 ops/sec
  ajv compile                  891 ops/sec
  ata is 145x faster

JSON string → validate:
  ata validateJSON         966,114 ops/sec
  ajv JSON.parse+validate  1,773,844 ops/sec

isValidJSON (fast path):
  ata isValidJSON        1,237,880 ops/sec
  ajv JSON.parse+validate  1,773,721 ops/sec

On Demand (large doc, 5KB):
  On Demand path            70,000 ops/sec
  DOM path                  31,000 ops/sec
  Speedup: 2.3x`}</CodeWindow>
      </div>
    </section>
  )
}
