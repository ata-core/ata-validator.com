const cards = [
  {
    title: 'Schema Compilation',
    bars: [
      { label: 'ata', width: 100, cls: 'ata', value: '155,000 ops/s' },
      { label: 'ajv', width: 0.5, cls: 'ajv', value: '831 ops/s' },
    ],
    speedup: '137x faster',
  },
  {
    title: 'C++ Core Validation',
    bars: [
      { label: 'valid', width: 100, cls: 'ata', value: '1.4M ops/s' },
      { label: 'invalid', width: 52, cls: 'ata', value: '730K ops/s' },
    ],
    speedup: 'Native speed',
  },
  {
    title: 'On Demand vs DOM (5KB doc)',
    bars: [
      { label: 'On Demand', width: 100, cls: 'ata', value: '70,000 ops/s' },
      { label: 'DOM', width: 44, cls: 'ajv', value: '31,000 ops/s' },
    ],
    speedup: '2.3x faster',
  },
  {
    title: 'Simple Type Check',
    bars: [
      { label: 'ata', width: 100, cls: 'ata', value: '13.8M ops/s' },
    ],
    speedup: 'Blazing fast',
  },
]

export function Benchmarks() {
  return (
    <section id="benchmarks" className="benchmarks">
      <h2>Benchmarks</h2>
      <p className="section-desc">
        Performance on Apple Silicon (M-series). Pre-compiled schema, realistic documents with nested objects and arrays.
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
