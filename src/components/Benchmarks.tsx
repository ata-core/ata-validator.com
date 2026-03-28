const cards = [
  {
    title: 'Schema Compilation',
    bars: [
      { label: 'ata', width: 100, cls: 'ata', value: '1.6M ops/s' },
      { label: 'ajv', width: 0.05, cls: 'ajv', value: '763 ops/s' },
    ],
    speedup: '2,083x faster -- lazy compilation + schema cache',
  },
  {
    title: 'First Validation (construct + validate)',
    bars: [
      { label: 'ata', width: 100, cls: 'ata', value: '629K ops/s' },
      { label: 'ajv', width: 0.1, cls: 'ajv', value: '827 ops/s' },
    ],
    speedup: '761x faster -- schema compilation cache',
  },
  {
    title: 'isValidObject (boolean check)',
    bars: [
      { label: 'ata', width: 100, cls: 'ata', value: '35.5M ops/s' },
      { label: 'ajv', width: 26, cls: 'ajv', value: '9.1M ops/s' },
    ],
    speedup: '3.9x faster -- direct property access, optimized codegen',
  },
  {
    title: 'validate(obj) — Valid Data',
    bars: [
      { label: 'ata', width: 100, cls: 'ata', value: '17.7M ops/s' },
      { label: 'ajv', width: 54, cls: 'ajv', value: '9.5M ops/s' },
    ],
    speedup: '1.9x faster -- hybrid codegen',
  },
  {
    title: 'validate(obj) — Invalid Data',
    bars: [
      { label: 'ata', width: 100, cls: 'ata', value: '9.0M ops/s' },
      { label: 'ajv', width: 58, cls: 'ajv', value: '5.2M ops/s' },
    ],
    speedup: '1.7x faster -- single-pass error collection',
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
    title: 'vs typebox 1.x — Boolean Check (with email)',
    bars: [
      { label: 'ata', width: 100, cls: 'ata', value: '87.5M ops/s' },
      { label: 'typebox', width: 21, cls: 'ajv', value: '18.0M ops/s' },
    ],
    speedup: '4.9x faster — hand-written format parsers, optimized codegen',
  },
  {
    title: 'Cold Start (50 schemas, 3 used)',
    bars: [
      { label: 'ata', width: 5, cls: 'ata', value: '0.8ms' },
      { label: 'ajv', width: 100, cls: 'ajv', value: '15.9ms' },
    ],
    speedup: '20x faster — only compiles schemas that get requests',
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
]

export function Benchmarks() {
  return (
    <section id="benchmarks" className="benchmarks">
      <h2>Benchmarks</h2>
      <p className="section-desc">
        Apple Silicon. Process-isolated benchmarks with <a href="https://github.com/evanwashere/mitata" target="_blank">mitata</a>.
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
