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
          optimizations, 761x faster first validation, 2,083x faster compilation.
        </p>
        <div className="hero-buttons">
          <a href="#quickstart" className="btn btn-primary">
            Get Started
          </a>
          <a
            href="https://github.com/ata-core/ata-validator"
            target="_blank"
            className="btn btn-secondary"
          >
            Star on GitHub
          </a>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-value">2,083x</span>
            <span className="stat-label">Faster Compilation</span>
          </div>
          <div className="stat">
            <span className="stat-value">761x</span>
            <span className="stat-label">Faster First Validation</span>
          </div>
          <div className="stat">
            <span className="stat-value">2391x</span>
            <span className="stat-label">ReDoS Immune</span>
          </div>
          <div className="stat">
            <span className="stat-value">98.6%</span>
            <span className="stat-label">Spec Compliance</span>
          </div>
        </div>
      </div>
      <div>
        <CodeWindow title="bench.txt (mitata)">{`=== ata vs ajv (process-isolated) ===

isValidObject (boolean check):
  ata      28.2 ns/iter   35.5M ops/sec
  ajv     110.1 ns/iter    9.1M ops/sec
  ata is 3.9x faster

First Validation (compile + validate):
  ata      1.59 us/iter    629K ops/sec
  ajv      1.21 ms/iter      827 ops/sec
  ata is 761x faster

Schema Compilation:
  ata     626.6 ns/iter   1.60M ops/sec
  ajv      1.31 ms/iter      763 ops/sec
  ata is 2,083x faster`}</CodeWindow>
      </div>
    </section>
  );
}
