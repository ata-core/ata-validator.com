const BENEFITS = [
  {
    title: 'Errors are built when read',
    desc: 'validate() answers the verdict from the fastest engine for the schema; the error object, its code, the offending byte and the suggestion are materialized on first access and cached. A gateway that only checks .valid never pays for them.',
  },
  {
    title: 'Every path, one verdict',
    desc: 'Four code generators, a closure compiler, an interpreter and the buffer APIs are run against each other over the whole official suite in CI. Any split verdict fails the build. The count of disagreements is held at zero, not documented.',
  },
  {
    title: 'Runs where eval is refused',
    desc: 'Cloudflare Workers and pages under a strict CSP block new Function. ata compiles schemas into a tree of plain closures instead and scores the same 1298 of 1299 with code generation blocked.',
  },
  {
    title: 'Safe by construction',
    desc: 'Pattern matching is linear-time with no backtracking: a hostile ^(a+)+$ against 100,000 characters takes one millisecond, not thirty seconds. The same engine backs every path, including compiled output.',
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
