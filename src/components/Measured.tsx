const SUITE_ROWS = [
  { dialect: 'Draft 2020-12', score: '1,298 / 1,299', note: 'the one miss needs $vocabulary' },
  { dialect: 'Draft 7', score: '927 / 927', note: '' },
  { dialect: 'JSON Schema v1', score: '1,133 / 1,133', note: 'the new dialect, supported since 1.6' },
]

const PERF_ROWS = [
  { what: 'Compile one schema', value: '6 µs', note: 'lazy, on first use' },
  { what: 'validate() on a passing object', value: '7 ns', note: 'generated JS, warm' },
  { what: 'Compiled validator, gzipped', value: '955 B', note: 'imports nothing' },
  { what: 'Fastify boot, 10 route schemas', value: '3.1 ms', note: 'cold process to first validated request' },
]

export function Measured() {
  return (
    <section id="compliance" className="measured" data-reveal>
      <div className="section-kicker">Measured, not estimated</div>
      <h2 className="section-title-xl">Every number on this page is from a run</h2>
      <p className="measured-sub">
        The official JSON Schema Test Suite, three dialects, nothing excluded,{' '}
        <code>format</code> and <code>default</code> under specification semantics.
        The same figures hold with <code>eval</code> and <code>new Function</code>{' '}
        blocked, and <code>npm test</code> fails if any of them drop.
      </p>

      <div className="measured-tables">
        <table className="measured-table">
          <thead>
            <tr><th>Dialect</th><th>Suite</th><th aria-label="note" /></tr>
          </thead>
          <tbody>
            {SUITE_ROWS.map((r) => (
              <tr key={r.dialect}>
                <td>{r.dialect}</td>
                <td className="measured-score">{r.score}</td>
                <td className="measured-note">{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className="measured-table">
          <thead>
            <tr><th>Cost</th><th>Measured</th><th aria-label="note" /></tr>
          </thead>
          <tbody>
            {PERF_ROWS.map((r) => (
              <tr key={r.what}>
                <td>{r.what}</td>
                <td className="measured-score">{r.value}</td>
                <td className="measured-note">{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="measured-foot">
        Benchmarks run on Apple Silicon with{' '}
        <a href="https://github.com/evanwashere/mitata" target="_blank" rel="noopener noreferrer">mitata</a>;
        reproduce with the scripts in{' '}
        <a href="https://github.com/ata-core/ata-validator/tree/master/benchmark" target="_blank" rel="noopener noreferrer">benchmark/</a>.
        Suite figures: <code>npm run test:suite</code>.
      </p>
    </section>
  )
}
