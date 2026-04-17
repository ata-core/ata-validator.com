import { useState } from "react";

const heroTabs = [
  {
    name: "Cold",
    title: "First Validation (compile + validate)",
    entries: [
      { label: "ata", value: "2.1 us", time: 2.1, highlight: true },
      { label: "typebox", value: "54 us", time: 54 },
      { label: "ajv", value: "1,110 us", time: 1110 },
    ],
  },
  {
    name: "Valid",
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
    name: "Uneval",
    title: "unevaluatedProperties — anyOf + bitmask tracking",
    entries: [
      { label: "ata (valid)", value: "6.7 ns", time: 6.7, highlight: true },
      { label: "ata (invalid)", value: "7.1 ns", time: 7.1, highlight: true },
      { label: "ajv (valid)", value: "23.2 ns", time: 23.2 },
      { label: "ajv (invalid)", value: "42.4 ns", time: 42.4 },
    ],
  },
  {
    name: "Compile",
    title: "Schema Compilation",
    entries: [
      { label: "ata", value: "453 ns", time: 453, highlight: true },
      { label: "typebox", value: "52,000 ns", time: 52000 },
      { label: "ajv", value: "1,200,000 ns", time: 1200000 },
    ],
  },
  {
    name: "Dynamic",
    title: "$dynamicRef Cross-Schema Override",
    entries: [
      { label: "ata", value: "2.6 ns", time: 2.6, highlight: true },
      { label: "ajv", value: "183 ns", time: 183 },
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
          optimizations. Up to 70x faster on $dynamicRef, 3.1x on normal schemas, 2,729x faster
          compilation. Full $dynamicRef/$anchor support, Draft 2020-12 + Draft 7 compatible.
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
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-value">70x</span>
            <span className="stat-label">$dynamicRef Override</span>
          </div>
          <div className="stat">
            <span className="stat-value">3.1x</span>
            <span className="stat-label">Normal Validation</span>
          </div>
          <div className="stat">
            <span className="stat-value">2,729x</span>
            <span className="stat-label">Faster Compilation</span>
          </div>
          <div className="stat">
            <span className="stat-value">98.5%</span>
            <span className="stat-label">Spec Compliance</span>
          </div>
        </div>
      </div>
    </section>
  );
}
