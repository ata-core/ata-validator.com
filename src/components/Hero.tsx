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
          optimizations, 1,580x faster cold start, 450x faster first validation.
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
            <span className="stat-value">1,580x</span>
            <span className="stat-label">Faster Cold Start</span>
          </div>
          <div className="stat">
            <span className="stat-value">450x</span>
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
        <CodeWindow title="bench.txt">{`=== ata vs ajv ===

First Validation (cached):
  ata     396,432 ops/sec
  ajv         880 ops/sec
  ata is 450x faster

Constructor Cold Start:
  ata   1,282,839 ops/sec
  ajv         812 ops/sec
  ata is 1,580x faster

isValidObject (hot path):
  ata  39,465,246 ops/sec
  ajv  17,593,915 ops/sec
  ata is 2.2x faster`}</CodeWindow>
      </div>
    </section>
  );
}
