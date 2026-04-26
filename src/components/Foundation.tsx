const features = [
  {
    title: 'Native speed',
    desc: 'simdjson + RE2 + JS codegen.\nUp to 70x faster than ajv.',
  },
  {
    title: 'Tiny bundle',
    desc: '0.5KB compile mode.\nBrowser-ready, zero deps.',
  },
  {
    title: 'TypeScript types',
    desc: 'ata compile emits .d.mts.\nisValid() narrows the type.',
  },
  {
    title: 'ReDoS-safe',
    desc: 'RE2 engine, no backtrack.\n2,000x safer on attack patterns.',
  },
  {
    title: 'Spec-compliant',
    desc: '98.5% Draft 2020-12.\nFull $dynamicRef + $anchor.',
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
