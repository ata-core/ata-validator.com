const cards = [
  {
    title: 'validate(obj) — Valid Data',
    bars: [
      { label: 'ata', width: 100, cls: 'ata', value: '15M ops/s' },
      { label: 'ajv', width: 53, cls: 'ajv', value: '8M ops/s' },
    ],
    speedup: '1.9x faster — combined single-pass codegen',
  },
  {
    title: 'validate(obj) — Invalid Data',
    bars: [
      { label: 'ata', width: 100, cls: 'ata', value: '13.1M ops/s' },
      { label: 'ajv', width: 62, cls: 'ajv', value: '8.1M ops/s' },
    ],
    speedup: '1.6x faster — lazy error array, single pass',
  },
  {
    title: 'validate(obj) — 100 Users (20KB)',
    bars: [
      { label: 'ata', width: 100, cls: 'ata', value: '658K ops/s' },
      { label: 'ajv', width: 37, cls: 'ajv', value: '243K ops/s' },
    ],
    speedup: '2.7x faster — V8-optimized codegen',
  },
  {
    title: 'ReDoS Protection',
    bars: [
      { label: 'ata (RE2)', width: 0.04, cls: 'ata', value: '0.3ms' },
      { label: 'ajv (regex)', width: 100, cls: 'ajv', value: '765ms' },
    ],
    speedup: '2391x faster — immune to catastrophic backtracking',
  },
  {
    title: 'Serverless Cold Start (50 schemas)',
    bars: [
      { label: 'ata', width: 8, cls: 'ata', value: '7.7ms' },
      { label: 'ajv', width: 100, cls: 'ajv', value: '96ms' },
    ],
    speedup: '12.5x faster — compile + validate in 7.7ms',
  },
  {
    title: 'Parallel Batch — 10K Items',
    bars: [
      { label: 'ata', width: 100, cls: 'ata', value: '13.4M items/s' },
      { label: 'ajv', width: 38, cls: 'ajv', value: '5.1M items/s' },
    ],
    speedup: '2.6x faster — multi-core C++ thread pool',
  },
  {
    title: 'validateJSON(str) — Valid',
    bars: [
      { label: 'ata', width: 100, cls: 'ata', value: '2.15M ops/s' },
      { label: 'ajv', width: 87, cls: 'ajv', value: '1.88M ops/s' },
    ],
    speedup: '1.1x faster',
  },
  {
    title: 'Schema Compilation',
    bars: [
      { label: 'ata', width: 100, cls: 'ata', value: '112K ops/s' },
      { label: 'ajv', width: 0.7, cls: 'ajv', value: '773 ops/s' },
    ],
    speedup: '145x faster',
  },
]

export function Benchmarks() {
  return (
    <section id="benchmarks" className="benchmarks">
      <h2>Benchmarks</h2>
      <p className="section-desc">
        Apple Silicon (12 cores). Apples-to-apples comparison — ata is faster on <strong>every</strong> metric.
      </p>
      <div className="bench-grid">
        {cards.map((card) => (
          <div key={card.title} className="bench-card">
            <h4>{card.title}</h4>
            <div className="bench-bar-group">
              {card.bars.map((bar) => (
                <div key={bar.label} className="bench-item">
                  <span className="bench-label">{bar.label}</span>
                  <div className="bench-bar-wrap">
                    <div className={`bench-bar ${bar.cls}`} style={{ width: `${bar.width}%` }} />
                  </div>
                  <span className="bench-value">{bar.value}</span>
                </div>
              ))}
            </div>
            <div className="bench-speedup">{card.speedup}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
