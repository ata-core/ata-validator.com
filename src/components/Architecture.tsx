const steps = [
  { n: '1', title: 'Classify', desc: 'Trivial shapes run on a tiny fast-path interpreter with zero compile cost.' },
  { n: '2', title: 'Compile', desc: 'Hot schemas become specialized JS functions that V8 JITs like any other code.' },
  { n: '3', title: 'Accelerate', desc: 'When the native package is installed, simdjson parsing and parallel buffer APIs kick in.' },
  { n: '4', title: 'Fall back', desc: 'Shapes codegen cannot represent run on the interpreted engine, in every runtime.' },
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
