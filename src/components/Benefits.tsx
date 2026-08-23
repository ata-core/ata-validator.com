const BENEFITS = [
  {
    title: 'Runs where eval is refused',
    desc: 'Cloudflare Workers, Deno Deploy and pages under a strict CSP block new Function. ata detects it and validates through an interpreted engine, scoring the same on the official suite either way.',
  },
  {
    title: 'Compiles to nothing but code',
    desc: 'ata compile turns a schema into a standalone module that imports nothing, about 1 KB gzipped, with a .d.mts beside it. No validator in your bundle.',
  },
  {
    title: 'Types come from the schema',
    desc: 'Infer<S> turns a plain JSON Schema literal into a static type. No builder DSL to learn, and validate() narrows to it.',
  },
  {
    title: 'Safe by construction',
    desc: 'Pattern matching is linear-time with no backtracking, so a hostile regex cannot stall a request. One engine backs every path, including compiled output.',
  },
]

export function Benefits() {
  return (
    <section className="benefits" data-reveal>
      <div className="benefits-grid" data-reveal-stagger>
        {BENEFITS.map((b) => (
          <div className="benefit-card" key={b.title}>
            <h3>{b.title}</h3>
            <p>{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
