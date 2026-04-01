import { useState } from "react";

const heroTabs = [
  {
    name: "Cold Start",
    title: "First Validation (compile + validate)",
    entries: [
      { label: "ata", value: "2.1 us", time: 2.1, highlight: true },
      { label: "typebox", value: "54 us", time: 54 },
      { label: "ajv", value: "1,110 us", time: 1110 },
    ],
  },
  {
    name: "Validation",
    title: "validate(obj) — Valid Data",
    entries: [
      { label: "ata", value: "9 ns", time: 9, highlight: true },
      { label: "ajv", value: "38 ns", time: 38 },
      { label: "typebox", value: "50 ns", time: 50 },
      { label: "valibot", value: "326 ns", time: 326 },
      { label: "zod", value: "334 ns", time: 334 },
    ],
  },
  {
    name: "Complex",
    title: "Complex Schema — patternProperties + dependentSchemas",
    entries: [
      { label: "ata", value: "17 ns", time: 17, highlight: true },
      { label: "ajv", value: "116 ns", time: 116 },
    ],
  },
  {
    name: "Unevaluated",
    title: "unevaluatedProperties — anyOf + bitmask tracking",
    entries: [
      { label: "ata (valid)", value: "6.7 ns", time: 6.7, highlight: true },
      { label: "ata (invalid)", value: "7.1 ns", time: 7.1, highlight: true },
      { label: "ajv (valid)", value: "23.2 ns", time: 23.2 },
      { label: "ajv (invalid)", value: "42.4 ns", time: 42.4 },
    ],
  },
  {
    name: "Compilation",
    title: "Schema Compilation",
    entries: [
      { label: "ata", value: "584 ns", time: 584, highlight: true },
      { label: "typebox", value: "52,000 ns", time: 52000 },
      { label: "ajv", value: "1,200,000 ns", time: 1200000 },
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
  const maxSqrt = Math.max(...tab.entries.map((e) => Math.sqrt(e.time)));
  const barWidth = (time: number) => Math.max((Math.sqrt(time) / maxSqrt) * 100, 4);

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
          optimizations, 6.8x faster validation on complex schemas, 2,051x faster
          compilation, 534x faster cold start. Works without native addon. Full unevaluatedProperties support with Draft 7 compatibility.
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
            <span className="stat-value">6.8x</span>
            <span className="stat-label">Faster Validation</span>
          </div>
          <div className="stat">
            <span className="stat-value">2,051x</span>
            <span className="stat-label">Faster Compilation</span>
          </div>
          <div className="stat">
            <span className="stat-value">4.3x</span>
            <span className="stat-label">Simple Schemas</span>
          </div>
          <div className="stat">
            <span className="stat-value">96.9%</span>
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
                        width: `${barWidth(entry.time)}%`,
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
