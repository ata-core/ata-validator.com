import { useState } from "react";

const heroTabs = [
  {
    name: "Validation",
    title: "validate(obj) — Valid Data",
    entries: [
      { label: "ata", value: "12 ns", time: 12, highlight: true },
      { label: "ajv", value: "37 ns", time: 37 },
      { label: "typebox", value: "47 ns", time: 47 },
      { label: "valibot", value: "304 ns", time: 304 },
      { label: "zod", value: "430 ns", time: 430 },
    ],
  },
  {
    name: "Cold Start",
    title: "First Validation (compile + validate)",
    entries: [
      { label: "ata", value: "1.6 us", time: 1.6, highlight: true },
      { label: "typebox", value: "55 us", time: 55 },
      { label: "ajv", value: "1,290 us", time: 1290 },
    ],
  },
  {
    name: "Compilation",
    title: "Schema Compilation",
    entries: [
      { label: "ata", value: "618 ns", time: 618, highlight: true },
      { label: "typebox", value: "54,000 ns", time: 54000 },
      { label: "ajv", value: "1,280,000 ns", time: 1280000 },
    ],
  },
  {
    name: "Security",
    title: "ReDoS Pattern: ^(a+)+$",
    entries: [
      { label: "ata (RE2)", value: "0.3 ms", time: 0.3, highlight: true },
      { label: "ajv (regex)", value: "765 ms", time: 765 },
    ],
  },
];

export function Hero() {
  const [active, setActive] = useState(0);
  const tab = heroTabs[active];
  const maxTime = Math.max(...tab.entries.map((e) => e.time));

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
          optimizations, 793x faster first validation, 2,067x faster
          compilation.
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
            <span className="stat-value">2,067x</span>
            <span className="stat-label">Faster Compilation</span>
          </div>
          <div className="stat">
            <span className="stat-value">793x</span>
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
        <div className="hero-chart">
          <div className="hero-chart-tabs">
            {heroTabs.map((t, i) => (
              <button
                key={t.name}
                className={`hero-chart-tab ${i === active ? "active" : ""}`}
                onClick={() => setActive(i)}
              >
                {t.name}
              </button>
            ))}
          </div>
          <div className="hero-chart-body">
            <h3 className="hero-chart-title">{tab.title}</h3>
            <div className="hero-chart-bars">
              {tab.entries.map((entry) => (
                <div key={entry.label} className="hero-chart-row">
                  <div className="hero-chart-label">
                    <strong>{entry.label}</strong>
                  </div>
                  <div className="hero-chart-bar-wrap">
                    <div
                      className={`hero-chart-bar ${entry.highlight ? "highlight" : ""}`}
                      style={{
                        width: `${Math.max((entry.time / maxTime) * 100, 2)}%`,
                      }}
                    />
                  </div>
                  <div className="hero-chart-value">{entry.value}</div>
                </div>
              ))}
            </div>
          </div>
          <a
            href="https://github.com/ata-core/ata-validator/tree/master/benchmark"
            target="_blank"
            className="hero-chart-link"
          >
            View benchmark →
          </a>
        </div>
      </div>
    </section>
  );
}
