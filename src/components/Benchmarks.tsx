const cards = [
  {
    title: 'Constructor Cold Start',
    bars: [
      { label: 'ata', width: 100, cls: 'ata', value: '1.28M ops/s' },
      { label: 'ajv', width: 0.06, cls: 'ajv', value: '812 ops/s' },
    ],
    speedup: '1,580x faster -- new Validator() only, no compilation yet',
  },
  {
    title: 'First Validation (construct + validate)',
    bars: [
      { label: 'ata', width: 100, cls: 'ata', value: '396K ops/s' },
      { label: 'ajv', width: 0.2, cls: 'ajv', value: '880 ops/s' },
    ],
    speedup: '450x faster -- schema compilation cache',
  },
  {
    title: 'isValidObject (boolean check)',
    bars: [
      { label: 'ata', width: 100, cls: 'ata', value: '39.5M ops/s' },
      { label: 'ajv', width: 45, cls: 'ajv', value: '17.6M ops/s' },
    ],
    speedup: '2.2x faster -- direct property access, no destructuring',
  },
  {
    title: 'validate(obj) — Valid Data',
    bars: [
      { label: 'ata', width: 100, cls: 'ata', value: '25.5M ops/s' },
      { label: 'ajv', width: 76, cls: 'ajv', value: '19.3M ops/s' },
    ],
    speedup: '1.3x faster -- hybrid codegen',
  },
  {
    title: 'validate(obj) — Invalid Data',
    bars: [
      { label: 'ata', width: 100, cls: 'ata', value: '17.7M ops/s' },
      { label: 'ajv', width: 76, cls: 'ajv', value: '13.5M ops/s' },
    ],
    speedup: '1.3x faster -- single-pass error collection',
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
  {
    title: 'Schema Compilation',
    bars: [
      { label: 'ata', width: 100, cls: 'ata', value: '142K ops/s' },
      { label: 'ajv', width: 0.6, cls: 'ajv', value: '827 ops/s' },
    ],
    speedup: '171x faster',
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
