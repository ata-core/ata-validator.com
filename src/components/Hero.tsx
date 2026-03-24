import { CodeWindow } from './CodeWindow'

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-glow" />
      <div>
        <div className="hero-badge">Faster than ajv on every benchmark</div>
        <h1>
          Ultra-fast JSON Schema{' '}
          <span className="accent">Validator</span>
        </h1>
        <p className="hero-desc">
          Native C++ validator built on <strong>simdjson</strong> and <strong>RE2</strong>.
          Combined single-pass JS codegen with V8 TurboFan optimizations — beats ajv on every metric, valid and invalid.
        </p>
        <div className="hero-buttons">
          <a href="#quickstart" className="btn btn-primary">Get Started</a>
          <a href="https://github.com/mertcanaltin/ata-validator" target="_blank" className="btn btn-secondary">View on GitHub</a>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-value">1.9x</span>
            <span className="stat-label">Faster validate(obj)</span>
          </div>
          <div className="stat">
            <span className="stat-value">145x</span>
            <span className="stat-label">Faster Compilation</span>
          </div>
          <div className="stat">
            <span className="stat-value">2391x</span>
            <span className="stat-label">ReDoS Immune</span>
          </div>
          <div className="stat">
            <span className="stat-value">98.4%</span>
            <span className="stat-label">Spec Compliance</span>
          </div>
        </div>
      </div>
      <div>
        <CodeWindow title="bench.txt">{`=== ata vs ajv ===

validate(obj) valid:
  ata  15,049,853 ops/sec
  ajv   7,996,082 ops/sec
  ata is 1.9x faster

validate(obj) invalid:
  ata  13,142,620 ops/sec
  ajv   8,057,098 ops/sec
  ata is 1.6x faster

Schema Compilation:
  ata     112,000 ops/sec
  ajv         773 ops/sec
  ata is 145x faster`}</CodeWindow>
      </div>
    </section>
  )
}
