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
          bytecode engine. Speculative validation with V8-optimized JS codegen — beats ajv on every valid-path benchmark.
        </p>
        <div className="hero-buttons">
          <a href="#quickstart" className="btn btn-primary">Get Started</a>
          <a href="https://github.com/mertcanaltin/ata-validator" target="_blank" className="btn btn-secondary">View on GitHub</a>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-value">151x</span>
            <span className="stat-label">Faster Compilation</span>
          </div>
          <div className="stat">
            <span className="stat-value">2.7x</span>
            <span className="stat-label">Faster validate(obj)</span>
          </div>
          <div className="stat">
            <span className="stat-value">5.9x</span>
            <span className="stat-label">Faster Parallel Batch</span>
          </div>
          <div className="stat">
            <span className="stat-value">98.5%</span>
            <span className="stat-label">Spec Compliance</span>
          </div>
        </div>
      </div>
      <div>
        <CodeWindow title="bench.txt">{`=== ata vs ajv — valid path ===

validate(obj):
  ata   9,633,524 ops/sec
  ajv   8,468,685 ops/sec
  ata is 1.1x faster

validate(obj) 100 users:
  ata     658,415 ops/sec
  ajv     243,385 ops/sec
  ata is 2.7x faster

Schema Compilation:
  ata     125,690 ops/sec
  ajv         831 ops/sec
  ata is 151x faster`}</CodeWindow>
      </div>
    </section>
  )
}
