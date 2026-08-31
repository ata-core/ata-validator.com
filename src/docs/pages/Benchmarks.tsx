import { Link } from 'react-router-dom'
import { DocsCode } from '../../components/DocsCode'

type Bar = { label: string; value: string; ratio: number; note?: string }

const THROUGHPUT: Bar[] = [
  { label: 'Object accepted, unknown keys allowed', value: '127.8M ops/s', ratio: 1 },
  { label: 'Object accepted, unknown keys rejected', value: '69.9M ops/s', ratio: 0.55 },
]

const MEMORY: Bar[] = [
  { label: 'Constructed, never used, schema shared', value: '0.43 KB', ratio: 0.13 },
  { label: 'Constructed, never used, own schema', value: '1.12 KB', ratio: 0.34 },
  { label: 'Compiled and used', value: '3.30 KB', ratio: 1 },
]

const COST = [
  { what: 'validate() on a passing object', value: '4.7 ns' },
  { what: 'Rejection, errors never read', value: '5.0 ns' },
  { what: 'Compile a schema, once, on first use', value: '6.0 µs' },
  { what: 'Construct a validator', value: '855 ns' },
]

const FORMATS = [
  { what: 'date', before: '45.7 ns', after: '14.2 ns' },
  { what: 'ipv4', before: '54.5 ns', after: '27.1 ns' },
]

function Bars({ rows }: { rows: Bar[] }) {
  return (
    <div className="dx-bars">
      {rows.map((r) => (
        <div className="dx-bar-row" key={r.label}>
          <div className="dx-bar-head">
            <span className="dx-bar-label">{r.label}</span>
            <span className="dx-bar-value">{r.value}</span>
          </div>
          <div className="dx-bar-track">
            <div className="dx-bar-fill" style={{ width: `${Math.round(r.ratio * 100)}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Benchmarks() {
  return (
    <>
      <p className="dx-eyebrow">Ecosystem</p>
      <h1>Benchmarks</h1>
      <p className="dx-lede">
        The figures below come from runs on one development machine, Apple silicon on Node 25.
        They are medians of interleaved rounds in a single process. Treat them as relative cost,
        not as a promise for your hardware.
      </p>

      <h2>Throughput</h2>
      <p>
        Measured inside the public runtime type benchmark harness, on its own shapes: an object
        of seven fields with one nested object, run in both of its assertion modes.
      </p>
      <Bars rows={THROUGHPUT} />
      <p className="dx-note">
        The case file that produces these lives in that benchmark's repository, so the run can
        be repeated rather than trusted.
      </p>

      <h2>Cost per call</h2>
      <p>
        On a small object schema with two properties, one of them constrained. Compilation is
        paid once, on the first validating call, and never again.
      </p>
      <table className="dx-table">
        <thead>
          <tr><th>Operation</th><th>Measured</th></tr>
        </thead>
        <tbody>
          {COST.map((r) => (
            <tr key={r.what}>
              <td>{r.what}</td>
              <td className="dx-num">{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        A rejection costs about as much as an acceptance because the error objects are built
        when the list is first read. A service that answers a bad request with a status code
        never pays for them.
      </p>

      <h2>Memory per validator</h2>
      <p>
        Retained heap per instance on a ten-key object schema, measured as the delta across two
        forced collections over two thousand instances.
      </p>
      <Bars rows={MEMORY} />
      <p>
        Methods are built on first use rather than bound in the constructor, so a validator that
        is constructed and never called stays at the first figure.
      </p>

      <h2>Format checks</h2>
      <p>
        Two format checks were rewritten to read the string once, with no regular expression and
        no allocation. Both are fuzzed against their previous forms with no mismatches.
      </p>
      <table className="dx-table">
        <thead>
          <tr><th>Format</th><th>Before</th><th>After</th></tr>
        </thead>
        <tbody>
          {FORMATS.map((r) => (
            <tr key={r.what}>
              <td><code>{r.what}</code></td>
              <td className="dx-num">{r.before}</td>
              <td className="dx-num">{r.after}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Engine coverage</h2>
      <p>
        Release 1.10.0 moved schema shapes that used to fall back to the interpreter onto the
        compiler: boolean subschemas, recursive definitions, and{' '}
        <code>additionalProperties</code> next to composition. Every suite group that moved got
        faster, 31 of 31 on Draft 2020-12 and 28 of 28 on draft 7, with the summed per-group
        time down 70 percent. Suite-wide the figure stayed inside measurement noise, which is
        why this is described as coverage rather than as a speedup.
      </p>

      <h2>Running them yourself</h2>
      <DocsCode lang="shell">{`git clone https://github.com/ata-core/ata-validator
cd ata-validator && npm install

npm run test:suite      # the official suite, three dialects
node benchmark/bench.mjs # the timing harness`}</DocsCode>
      <p>
        <Link to="/docs/performance">Performance</Link> explains what is measured and why some
        paths cost what they do.
      </p>
    </>
  )
}
