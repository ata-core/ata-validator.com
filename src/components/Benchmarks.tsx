const cards = [
  {
    title: 'validate(obj) — Valid Data',
    bars: [
      { label: 'ata', width: 100, cls: 'ata', value: '9.6M ops/s' },
      { label: 'ajv', width: 88, cls: 'ajv', value: '8.5M ops/s' },
    ],
    speedup: '1.1x faster — speculative JS codegen',
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
    title: 'validateJSON(str) — Valid Data',
    bars: [
      { label: 'ata', width: 100, cls: 'ata', value: '1.91M ops/s' },
      { label: 'ajv', width: 98, cls: 'ajv', value: '1.87M ops/s' },
    ],
    speedup: '1.02x faster',
  },
  {
    title: 'Parallel Batch — 10K Items',
    bars: [
      { label: 'ata', width: 100, cls: 'ata', value: '12.5M items/s' },
      { label: 'ajv', width: 17, cls: 'ajv', value: '2.1M items/s' },
    ],
    speedup: '5.9x faster — multi-core C++ thread pool',
  },
  {
    title: 'Schema Compilation',
    bars: [
      { label: 'ata', width: 100, cls: 'ata', value: '125K ops/s' },
      { label: 'ajv', width: 0.7, cls: 'ajv', value: '831 ops/s' },
    ],
    speedup: '151x faster',
  },
  {
    title: 'isValidObject(obj) — Boolean Check',
    bars: [
      { label: 'ata', width: 100, cls: 'ata', value: '10.4M ops/s' },
      { label: 'ajv', width: 90, cls: 'ajv', value: '9.3M ops/s' },
    ],
    speedup: '1.1x faster — pure V8 JIT, no NAPI',
  },
]

export function Benchmarks() {
  return (
    <section id="benchmarks" className="benchmarks">
      <h2>Benchmarks</h2>
      <p className="section-desc">
        Apple Silicon (12 cores). Valid data path — the production common case. Pre-compiled schemas, real-world documents. Apples-to-apples comparison.
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
