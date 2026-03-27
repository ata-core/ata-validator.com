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
          optimizations, 1,722x faster cold start than ajv.
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
            <span className="stat-value">1,722x</span>
            <span className="stat-label">Faster Cold Start</span>
          </div>
          <div className="stat">
            <span className="stat-value">169x</span>
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
  ata  17,055,036 ops/sec
  ajv   9,363,584 ops/sec
  ata is 1.8x faster

Constructor Cold Start:
  ata   1,465,729 ops/sec
  ajv         851 ops/sec
  ata is 1,722x faster

Schema Compilation:
  ata     137,421 ops/sec
  ajv         814 ops/sec
  ata is 169x faster`}</CodeWindow>
      </div>
    </section>
  );
}
