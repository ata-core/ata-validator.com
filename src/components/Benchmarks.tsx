import { useState } from 'react'

type BenchEntry = {
  label: string
  value: string
  time: number // normalized for bar width
  highlight?: boolean
}

type BenchTab = {
  name: string
  title: string
  subtitle: string
  entries: BenchEntry[]
  link: string
}

const tabs: BenchTab[] = [
  {
    name: 'Valid',
    title: 'validate(obj) — Valid Data',
    subtitle: 'Time per validation in nanoseconds, mitata (lower is better)',
    link: 'https://github.com/ata-core/ata-validator/blob/master/benchmark/bench_all_mitata.mjs',
    entries: [
      { label: 'ata', value: '9 ns', time: 9, highlight: true },
      { label: 'ajv', value: '38 ns', time: 38 },
      { label: 'typebox', value: '50 ns', time: 50 },
      { label: 'valibot', value: '326 ns', time: 326 },
      { label: 'zod', value: '334 ns', time: 334 },
    ],
  },
  {
    name: 'Complex',
    title: 'Complex Schema — patternProperties + dependentSchemas',
    subtitle: 'Time per validation in nanoseconds, mitata (lower is better)',
    link: 'https://github.com/ata-core/ata-validator/blob/master/benchmark/bench_complex_mitata.mjs',
    entries: [
      { label: 'ata (valid)', value: '17 ns', time: 17, highlight: true },
      { label: 'ata (invalid)', value: '59 ns', time: 59, highlight: true },
      { label: 'ajv (valid)', value: '115 ns', time: 115 },
      { label: 'ajv (invalid)', value: '194 ns', time: 194 },
    ],
  },
  {
    name: 'Unevaluated',
    title: 'unevaluatedProperties — Three-tier hybrid codegen',
    subtitle: 'Time per validation in nanoseconds, mitata (lower is better)',
    link: 'https://github.com/ata-core/ata-validator/blob/master/benchmark/bench_unevaluated_mitata.mjs',
    entries: [
      { label: 'ata (static)', value: '3.3 ns', time: 3.3, highlight: true },
      { label: 'ata (anyOf)', value: '6.7 ns', time: 6.7, highlight: true },
      { label: 'ajv (static)', value: '8.7 ns', time: 8.7 },
      { label: 'ajv (anyOf)', value: '23.2 ns', time: 23.2 },
    ],
  },
  {
    name: 'Cold Start',
    title: 'First Validation (compile + validate)',
    subtitle: 'Time per cold start, mitata (lower is better)',
    link: 'https://github.com/ata-core/ata-validator/blob/master/benchmark/bench_all_mitata.mjs',
    entries: [
      { label: 'ata', value: '2.1 us', time: 2.1, highlight: true },
      { label: 'typebox', value: '54 us', time: 54 },
      { label: 'ajv', value: '1,110 us', time: 1110 },
    ],
  },
  {
    name: 'Compilation',
    title: 'Schema Compilation',
    subtitle: 'Time per compilation, mitata (lower is better)',
    link: 'https://github.com/ata-core/ata-validator/blob/master/benchmark/bench_all_mitata.mjs',
    entries: [
      { label: 'ata', value: '584 ns', time: 584, highlight: true },
      { label: 'typebox', value: '52,000 ns', time: 52000 },
      { label: 'ajv', value: '1,200,000 ns', time: 1200000 },
    ],
  },
  {
    name: '$dynamicRef',
    title: '$dynamicRef / $dynamicAnchor — Draft 2020-12',
    subtitle: 'Time per validation in nanoseconds, mitata (lower is better)',
    link: 'https://github.com/ata-core/ata-validator/blob/master/benchmark/bench_dynamicref_vs_ajv.mjs',
    entries: [
      { label: 'ata (override)', value: '1.9 ns', time: 1.9, highlight: true },
      { label: 'ata (tree)', value: '19 ns', time: 19, highlight: true },
      { label: 'ajv (tree)', value: '50 ns', time: 50 },
      { label: 'ajv (override)', value: '179 ns', time: 179 },
    ],
  },
  {
    name: 'Security',
    title: 'ReDoS Pattern: ^(a+)+$',
    subtitle: 'Execution time in milliseconds (lower is better)',
    link: 'https://github.com/ata-core/ata-validator',
    entries: [
      { label: 'ata (RE2)', value: '0.3 ms', time: 0.3, highlight: true },
      { label: 'ajv (regex)', value: '765 ms', time: 765 },
    ],
  },
]

export function Benchmarks() {
  const [active, setActive] = useState(0)
  const tab = tabs[active]
  const maxSqrt = Math.max(...tab.entries.map(e => Math.sqrt(e.time)))
  const barWidth = (time: number) => Math.max((Math.sqrt(time) / maxSqrt) * 100, 4)

  return (
    <section id="benchmarks" className="benchmarks">
      <h2>Benchmarks</h2>
      <p className="section-desc">
        Apple Silicon. Process-isolated with <a href="https://github.com/evanwashere/mitata" target="_blank">mitata</a>.
      </p>

      <div className="bench-chart">
        <div className="bench-tabs">
          {tabs.map((t, i) => (
            <button
              key={t.name}
              className={`bench-tab ${i === active ? 'active' : ''}`}
              onClick={() => setActive(i)}
            >
              {t.name}
            </button>
          ))}
        </div>

        <div className="bench-chart-body">
          <h3 className="bench-chart-title">{tab.title}</h3>
          <p className="bench-chart-subtitle">{tab.subtitle}</p>

          <div className="bench-chart-bars">
            {tab.entries.map((entry) => (
              <div key={entry.label} className="bench-chart-row">
                <div className="bench-chart-label">
                  <strong>{entry.label}</strong>
                </div>
                <div className="bench-chart-bar-wrap">
                  <div
                    className={`bench-chart-bar ${entry.highlight ? 'highlight' : ''}`}
                    style={{ width: `${barWidth(entry.time)}%` }}
                  />
                </div>
                <div className="bench-chart-value">{entry.value}</div>
              </div>
            ))}
          </div>
        </div>

        <a href={tab.link} target="_blank" className="bench-chart-link">
          View benchmark →
        </a>
      </div>
    </section>
  )
}
