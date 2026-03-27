const cards = [
  {
    title: 'Constructor Cold Start',
    bars: [
      { label: 'ata', width: 100, cls: 'ata', value: '1.47M ops/s' },
      { label: 'ajv', width: 0.06, cls: 'ajv', value: '851 ops/s' },
    ],
    speedup: '1,722x faster — lazy compilation, near-zero constructor',
  },
  {
    title: 'First Validation (construct + validate)',
    bars: [
      { label: 'ata', width: 100, cls: 'ata', value: '19.3K ops/s' },
      { label: 'ajv', width: 4.5, cls: 'ajv', value: '861 ops/s' },
    ],
    speedup: '22x faster — compile on first use, not on startup',
  },
  {
    title: 'validate(obj) — Valid Data',
    bars: [
      { label: 'ata', width: 100, cls: 'ata', value: '17M ops/s' },
      { label: 'ajv', width: 55, cls: 'ajv', value: '9.4M ops/s' },
    ],
    speedup: '1.8x faster — hybrid validator, V8 machine code speed',
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
      { label: 'ata', width: 0.4, cls: 'ata', value: '0.1ms' },
      { label: 'ajv', width: 100, cls: 'ajv', value: '23ms' },
    ],
    speedup: '242x faster — lazy init, only compile what you use',
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
      { label: 'ata', width: 100, cls: 'ata', value: '2.1M ops/s' },
      { label: 'ajv', width: 87, cls: 'ajv', value: '1.8M ops/s' },
    ],
    speedup: '1.1x faster',
  },
  {
    title: 'Fastify Startup — 5 Routes',
    bars: [
      { label: 'ata', width: 8, cls: 'ata', value: '0.5ms' },
      { label: 'ajv', width: 100, cls: 'ajv', value: '6.0ms' },
    ],
    speedup: '12x faster — lazy compilation, no build step needed',
  },
  {
    title: 'Schema Compilation',
    bars: [
      { label: 'ata', width: 100, cls: 'ata', value: '137K ops/s' },
      { label: 'ajv', width: 0.6, cls: 'ajv', value: '814 ops/s' },
    ],
    speedup: '169x faster',
  },
]

export function Benchmarks() {
  return (
    <section id="benchmarks" className="benchmarks">
      <h2>Benchmarks</h2>
      <p className="section-desc">
        Apple Silicon. Isolated single-schema benchmarks. ata is faster on <strong>every</strong> metric.
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
