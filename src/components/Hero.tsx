import { useState } from "react";

const heroTabs = [
  {
    name: "Validation",
    title: "validate(obj) — Valid Data",
    entries: [
      { label: "ata", value: "13 ns", time: 13, highlight: true },
      { label: "ajv", value: "37 ns", time: 37 },
      { label: "typebox", value: "48 ns", time: 48 },
      { label: "valibot", value: "316 ns", time: 316 },
      { label: "zod", value: "328 ns", time: 328 },
    ],
  },
  {
    name: "Invalid",
    title: "validate(obj) — Invalid Data",
    entries: [
      { label: "typebox", value: "3.6 ns", time: 3.6, highlight: false },
      { label: "ata", value: "35 ns", time: 35, highlight: true },
      { label: "ajv", value: "104 ns", time: 104 },
      { label: "valibot", value: "838 ns", time: 838 },
      { label: "zod", value: "11,670 ns", time: 11670 },
    ],
  },
  {
    name: "Complex",
    title: "Complex Schema — patternProperties + dependentSchemas",
    entries: [
      { label: "ata", value: "26 ns", time: 26, highlight: true },
      { label: "ajv", value: "113 ns", time: 113 },
    ],
  },
  {
    name: "Cold Start",
    title: "First Validation (compile + validate)",
    entries: [
      { label: "ata", value: "1.3 us", time: 1.3, highlight: true },
      { label: "typebox", value: "52.9 us", time: 52.9 },
      { label: "ajv", value: "1,070 us", time: 1070 },
    ],
  },
  {
    name: "Compilation",
    title: "Schema Compilation",
    entries: [
      { label: "ata", value: "533 ns", time: 533, highlight: true },
      { label: "typebox", value: "52,030 ns", time: 52030 },
      { label: "ajv", value: "1,140,000 ns", time: 1140000 },
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
          optimizations, 4.4x faster validation on complex schemas, 2,140x faster
          compilation, 829x faster cold start. Full ajv feature parity with Draft 7 support.
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
            <span className="stat-value">4.4x</span>
            <span className="stat-label">Faster Validation</span>
          </div>
          <div className="stat">
            <span className="stat-value">2,140x</span>
            <span className="stat-label">Faster Compilation</span>
          </div>
          <div className="stat">
            <span className="stat-value">5.8x</span>
            <span className="stat-label">Complex Schemas</span>
          </div>
          <div className="stat">
            <span className="stat-value">98.4%</span>
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
