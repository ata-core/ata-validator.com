const cards = [
  {
    title: 'JS Object Validation — isValidObject()',
    bars: [
      { label: 'ata', width: 100, cls: 'ata', value: '41M ops/s' },
      { label: 'ajv', width: 46, cls: 'ajv', value: '19M ops/s' },
    ],
    speedup: '2.2x faster than ajv (JS codegen)',
  },
  {
    title: 'Parallel Batch — 10K items',
    bars: [
      { label: 'ata', width: 100, cls: 'ata', value: '12.5M items/s' },
      { label: 'ajv', width: 17, cls: 'ajv', value: '2.1M items/s' },
    ],
    speedup: '5.9x faster than ajv',
  },
  {
    title: 'Parallel Batch — 5K items',
    bars: [
      { label: 'ata', width: 100, cls: 'ata', value: '11.3M items/s' },
      { label: 'ajv', width: 19, cls: 'ajv', value: '2.1M items/s' },
    ],
    speedup: '5.3x faster than ajv',
  },
  {
    title: 'Schema Compilation',
    bars: [
      { label: 'ata', width: 100, cls: 'ata', value: '107K ops/s' },
      { label: 'ajv', width: 0.8, cls: 'ajv', value: '891 ops/s' },
    ],
    speedup: '145x faster than ajv',
  },
  {
    title: 'Single Call — isValid(Buffer)',
    bars: [
      { label: 'ata', width: 94, cls: 'ata', value: '1.65M ops/s' },
      { label: 'ajv', width: 100, cls: 'ajv', value: '1.77M ops/s' },
    ],
    speedup: 'Nearly equal (1.06x)',
  },
  {
    title: 'On Demand vs DOM (5KB doc)',
    bars: [
      { label: 'On Demand', width: 100, cls: 'ata', value: '70,000 ops/s' },
      { label: 'DOM', width: 44, cls: 'ajv', value: '31,000 ops/s' },
    ],
    speedup: '2.3x faster with On Demand',
  },
  {
    title: 'C++ Core (no NAPI overhead)',
    bars: [
      { label: 'valid', width: 100, cls: 'ata', value: '1.4M ops/s' },
      { label: 'invalid', width: 52, cls: 'ata', value: '730K ops/s' },
    ],
    speedup: 'Native speed, no boundary',
  },
]

export function Benchmarks() {
  return (
    <section id="benchmarks" className="benchmarks">
      <h2>Benchmarks</h2>
      <p className="section-desc">
        Apple Silicon (12 cores). Multi-core parallel validation vs ajv single-threaded. Pre-compiled schemas, real-world documents.
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
