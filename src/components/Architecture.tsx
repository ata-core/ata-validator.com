const steps = [
  { n: '1', title: 'Compile', desc: 'Schema is parsed with simdjson and compiled into a bytecode plan + regex cache' },
  { n: '2', title: 'Route', desc: 'Eligible schemas use On Demand API, others use DOM. Decided at compile time.' },
  { n: '3', title: 'Execute', desc: 'Bytecode executor validates in a tight loop. Falls back to tree walker only for errors.' },
  { n: '4', title: 'Result', desc: 'Returns valid/invalid with detailed error paths. Reuse compiled schema millions of times.' },
]

export function Architecture() {
  return (
    <section className="architecture">
      <div className="arch-header">
        <div className="section-kicker">Pipeline</div>
        <h2 className="section-title-xl gradient-text">How it works</h2>
      </div>
      <div className="arch-flow">
        {steps.map((s, i) => (
          <div key={s.n} style={{ display: 'contents' }}>
            {i > 0 && <div className="arch-arrow">&rarr;</div>}
            <div className="arch-step">
              <div className="arch-icon">{s.n}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
