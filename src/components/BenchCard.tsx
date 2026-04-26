import { useState } from 'react'

type Entry = {
  label: string
  value: string
  time: number
  highlight?: boolean
}

type Tab = {
  name: string
  title: string
  entries: Entry[]
  link: string
}

const FILE_BASE = 'https://github.com/ata-core/ata-validator/blob/master/benchmark'
const REPO_ROOT = 'https://github.com/ata-core/ata-validator/tree/master/benchmark'

const tabs: Tab[] = [
  {
    name: 'Cold',
    title: 'First Validation (compile + validate)',
    link: `${FILE_BASE}/bench_all_mitata.mjs`,
    entries: [
      { label: 'ata', value: '2.1 us', time: 2.1, highlight: true },
      { label: 'typebox', value: '54 us', time: 54 },
      { label: 'ajv', value: '1,110 us', time: 1110 },
    ],
  },
  {
    name: 'Valid',
    title: 'validate(obj), valid data',
    link: `${FILE_BASE}/bench_all_mitata.mjs`,
    entries: [
      { label: 'ata', value: '7 ns', time: 7, highlight: true },
      { label: 'ajv', value: '38 ns', time: 38 },
      { label: 'typebox', value: '50 ns', time: 50 },
      { label: 'valibot', value: '337 ns', time: 337 },
      { label: 'zod', value: '342 ns', time: 342 },
    ],
  },
  {
    name: 'Complex',
    title: 'Complex Schema (patternProperties + dependentSchemas)',
    link: `${FILE_BASE}/bench_complex_mitata.mjs`,
    entries: [
      { label: 'ata (valid)', value: '19 ns', time: 19, highlight: true },
      { label: 'ata (invalid)', value: '62 ns', time: 62, highlight: true },
      { label: 'ajv (valid)', value: '116 ns', time: 116 },
      { label: 'ajv (invalid)', value: '195 ns', time: 195 },
    ],
  },
  {
    name: 'Uneval',
    title: 'unevaluatedProperties (three-tier hybrid codegen)',
    link: `${FILE_BASE}/bench_unevaluated_mitata.mjs`,
    entries: [
      { label: 'ata (static)', value: '3.3 ns', time: 3.3, highlight: true },
      { label: 'ata (anyOf)', value: '6.7 ns', time: 6.7, highlight: true },
      { label: 'ajv (static)', value: '8.5 ns', time: 8.5 },
      { label: 'ajv (anyOf)', value: '22.9 ns', time: 22.9 },
    ],
  },
  {
    name: 'Compile',
    title: 'Schema Compilation',
    link: `${FILE_BASE}/bench_all_mitata.mjs`,
    entries: [
      { label: 'ata', value: '9 ns', time: 9, highlight: true },
      { label: 'typebox', value: '53,000 ns', time: 53000 },
      { label: 'ajv', value: '1,200,000 ns', time: 1200000 },
    ],
  },
  {
    name: 'Dynamic',
    title: '$dynamicRef cross-schema override',
    link: `${FILE_BASE}/bench_dynamicref_vs_ajv.mjs`,
    entries: [
      { label: 'ata (override)', value: '2.6 ns', time: 2.6, highlight: true },
      { label: 'ata (tree)', value: '22 ns', time: 22, highlight: true },
      { label: 'ajv (tree)', value: '54 ns', time: 54 },
      { label: 'ajv (override)', value: '187 ns', time: 187 },
    ],
  },
  {
    name: 'Security',
    title: 'ReDoS pattern: ^(a+)+$',
    link: REPO_ROOT,
    entries: [
      { label: 'ata (RE2)', value: '0.3 ms', time: 0.3, highlight: true },
      { label: 'ajv (regex)', value: '765 ms', time: 765 },
    ],
  },
  {
    name: 'Bundle',
    title: 'Browser bundle size (gzipped, 10-field schema)',
    link: REPO_ROOT,
    entries: [
      { label: 'ata compile (abort-early)', value: '0.5 KB', time: 0.5, highlight: true },
      { label: 'ata compile (standard)', value: '1.1 KB', time: 1.1, highlight: true },
      { label: 'ata (runtime)', value: '27 KB', time: 27 },
      { label: 'ajv (runtime)', value: '30 KB', time: 30 },
    ],
  },
]

export function BenchCard() {
  const [active, setActive] = useState(0)
  const tab = tabs[active]
  const maxSqrt = Math.max(...tab.entries.map((e) => Math.sqrt(e.time)))
  const minVisibleWidth = 4
  const barWidth = (time: number) =>
    Math.max((Math.sqrt(time) / maxSqrt) * 100, minVisibleWidth)

  return (
    <div className="bench-card">
      <div className="bench-card-tabs" role="tablist">
        {tabs.map((t, i) => (
          <button
            key={t.name}
            role="tab"
            aria-selected={i === active}
            className={`bench-card-tab ${i === active ? 'is-active' : ''}`}
            onClick={() => setActive(i)}
          >
            {t.name}
          </button>
        ))}
      </div>

      <div className="bench-card-body">
        <h3 className="bench-card-title">{tab.title}</h3>
        <div className="bench-card-rows">
          {tab.entries.map((e) => (
            <div key={e.label} className="bench-card-row">
              <span className="bench-card-label">{e.label}</span>
              <div className="bench-card-bar-wrap">
                <div
                  className={`bench-card-bar ${e.highlight ? 'is-highlight' : ''}`}
                  style={{ width: `${barWidth(e.time)}%` }}
                />
              </div>
              <span className="bench-card-value">{e.value}</span>
            </div>
          ))}
        </div>
      </div>

      <a
        href={tab.link}
        target="_blank"
        rel="noopener noreferrer"
        className="bench-card-link"
      >
        View benchmark →
      </a>
    </div>
  )
}
