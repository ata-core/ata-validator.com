const cards = [
  {
    title: 'Schema Compilation',
    bars: [
      { label: 'ata', width: 100, cls: 'ata', value: '107,139 ops/s' },
      { label: 'ajv', width: 0.8, cls: 'ajv', value: '891 ops/s' },
    ],
    speedup: '145x faster than ajv',
  },
  {
    title: 'JSON String → Validate',
    bars: [
      { label: 'ata', width: 54, cls: 'ata', value: '966K ops/s' },
      { label: 'ajv', width: 100, cls: 'ajv', value: '1.77M ops/s' },
    ],
    speedup: 'ajv 1.8x (NAPI boundary cost)',
  },
  {
    title: 'isValidJSON — Fast Boolean Check',
    bars: [
      { label: 'ata', width: 70, cls: 'ata', value: '1.24M ops/s' },
      { label: 'ajv', width: 100, cls: 'ajv', value: '1.77M ops/s' },
    ],
    speedup: 'ajv 1.4x — nearly equal',
  },
  {
    title: 'C++ Core (no NAPI)',
    bars: [
      { label: 'valid', width: 100, cls: 'ata', value: '1.4M ops/s' },
      { label: 'invalid', width: 52, cls: 'ata', value: '730K ops/s' },
    ],
    speedup: 'Native speed, no boundary',
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
    title: 'Large Doc Scaling (200KB)',
    bars: [
      { label: 'ata', width: 72, cls: 'ata', value: '1,596 ops/s' },
      { label: 'ajv', width: 100, cls: 'ajv', value: '2,202 ops/s' },
    ],
    speedup: 'Gap narrows: ajv 1.38x',
  },
]

export function Benchmarks() {
  return (
    <section id="benchmarks" className="benchmarks">
      <h2>Benchmarks</h2>
      <p className="section-desc">
        Honest comparison on Apple Silicon. JSON string in, validation result out. Pre-compiled schemas, real-world documents.
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
