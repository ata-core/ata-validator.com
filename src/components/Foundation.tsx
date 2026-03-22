const tabs = ['simdjson', 'RE2', 'Codegen', 'On Demand', 'Draft 2020-12']

export function Foundation() {
  return (
    <section className="foundation">
      <h2>Foundation of High-Performance<br />JSON Validation</h2>
      <div className="foundation-tabs">
        {tabs.map((t, i) => (
          <span key={t} className={`tab${i === 0 ? ' active' : ''}`}>{t}</span>
        ))}
      </div>
    </section>
  )
}
