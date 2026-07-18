const features = [
  {
    title: 'Native speed',
    desc: 'simdjson + RE2 + JS codegen.\n5x faster steady-state than ajv.',
  },
  {
    title: 'Tiny bundle',
    desc: '~1 KB compiled validators.\nBrowser-ready, zero deps.',
  },
  {
    title: 'TypeScript types',
    desc: 'ata compile emits .d.mts.\nisValid() narrows the type.',
  },
  {
    title: 'ReDoS-safe',
    desc: 'Linear-time regex everywhere.\nNo catastrophic backtracking.',
  },
  {
    title: 'Spec-compliant',
    desc: '99.5% Draft 2020-12.\nEvery schema, every runtime.',
  },
]

export function Foundation() {
  return (
    <section className="foundation">
      <div className="foundation-grid">
        {features.map((f) => (
          <div key={f.title} className="foundation-cell">
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
