import { CodeWindow } from "./CodeWindow";

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-glow" />
      <div>
        <div className="hero-badge">Powered by simdjson & RE2</div>
        <h1>
          Ultra-fast JSON Schema <span className="accent">Validator</span>
        </h1>
        <p className="hero-desc">
          Native C++ validator built on <strong>simdjson</strong> and{" "}
          <strong>RE2</strong>. Hybrid JS codegen with V8 TurboFan
          optimizations, 8.5x faster than ajv on validate(obj).
        </p>
        <div className="hero-buttons">
          <a href="#quickstart" className="btn btn-primary">
            Get Started
          </a>
          <a
            href="https://github.com/mertcanaltin/ata-validator"
            target="_blank"
            className="btn btn-secondary"
          >
            View on GitHub
          </a>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-value">8.5x</span>
            <span className="stat-label">Faster validate(obj)</span>
          </div>
          <div className="stat">
            <span className="stat-value">138x</span>
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
        <CodeWindow title="bench.txt">{`=== ata vs ajv (isolated) ===

validate(obj) valid:
  ata  67,651,943 ops/sec
  ajv   8,000,000 ops/sec
  ata is 8.5x faster

validate(obj) invalid:
  ata  16,860,818 ops/sec
  ajv   8,000,000 ops/sec
  ata is 2.1x faster

Schema Compilation:
  ata     113,000 ops/sec
  ajv         818 ops/sec
  ata is 138x faster`}</CodeWindow>
      </div>
    </section>
  );
}
