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
      { label: 'ata', value: '13 ns', time: 13, highlight: true },
      { label: 'ajv', value: '37 ns', time: 37 },
      { label: 'typebox', value: '48 ns', time: 48 },
      { label: 'valibot', value: '316 ns', time: 316 },
      { label: 'zod', value: '328 ns', time: 328 },
    ],
  },
  {
    name: 'Invalid',
    title: 'validate(obj) — Invalid Data',
    subtitle: 'Time per validation in nanoseconds, mitata (lower is better)',
    link: 'https://github.com/ata-core/ata-validator/blob/master/benchmark/bench_all_mitata.mjs',
    entries: [
      { label: 'typebox', value: '3.6 ns', time: 3.6 },
      { label: 'ata', value: '35 ns', time: 35, highlight: true },
      { label: 'ajv', value: '104 ns', time: 104 },
      { label: 'valibot', value: '838 ns', time: 838 },
      { label: 'zod', value: '11,670 ns', time: 11670 },
    ],
  },
  {
    name: 'Complex',
    title: 'Complex Schema — patternProperties + dependentSchemas',
    subtitle: 'Time per validation in nanoseconds, mitata (lower is better)',
    link: 'https://github.com/ata-core/ata-validator/blob/master/benchmark/bench_complex_mitata.mjs',
    entries: [
      { label: 'ata (valid)', value: '26 ns', time: 26, highlight: true },
      { label: 'ata (invalid)', value: '53 ns', time: 53, highlight: true },
      { label: 'ajv (valid)', value: '113 ns', time: 113 },
      { label: 'ajv (invalid)', value: '195 ns', time: 195 },
    ],
  },
  {
    name: 'Cold Start',
    title: 'First Validation (compile + validate)',
    subtitle: 'Time per cold start, mitata (lower is better)',
    link: 'https://github.com/ata-core/ata-validator/blob/master/benchmark/bench_all_mitata.mjs',
    entries: [
      { label: 'ata', value: '1.3 us', time: 1.3, highlight: true },
      { label: 'typebox', value: '52.9 us', time: 52.9 },
      { label: 'ajv', value: '1,070 us', time: 1070 },
    ],
  },
  {
    name: 'Compilation',
    title: 'Schema Compilation',
    subtitle: 'Time per compilation, mitata (lower is better)',
    link: 'https://github.com/ata-core/ata-validator/blob/master/benchmark/bench_all_mitata.mjs',
    entries: [
      { label: 'ata', value: '533 ns', time: 533, highlight: true },
      { label: 'typebox', value: '52,030 ns', time: 52030 },
      { label: 'ajv', value: '1,140,000 ns', time: 1140000 },
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
  const maxTime = Math.max(...tab.entries.map(e => e.time))

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
                    style={{ width: `${Math.max((entry.time / maxTime) * 100, 2)}%` }}
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
