import { Link } from 'react-router-dom'
import { DocsCode } from '../../components/DocsCode'

type Bar = { label: string; value: string; ratio: number }

const REQUEST: Bar[] = [
  { label: 'Accepts the body', value: '24 ns', ratio: 0.05 },
  { label: 'Rejects it, verdict only', value: '15 ns', ratio: 0.03 },
  { label: 'Rejects it, error list read', value: '478 ns', ratio: 1 },
]

const BLOCKED = [
  { what: 'Accepts the body', compiled: '24 ns', interpreted: '223 ns' },
  { what: 'Rejects it, verdict only', compiled: '15 ns', interpreted: '93 ns' },
  { what: 'Ten route schemas ready', compiled: '0.24 ms', interpreted: '0.52 ms' },
]

const MEMORY: Bar[] = [
  { label: 'Constructed, never called', value: '0.43 KB', ratio: 0.13 },
  { label: 'Constructed with its own schema', value: '1.12 KB', ratio: 0.34 },
  { label: 'Compiled and in use', value: '3.30 KB', ratio: 1 },
]

const SCHEMA = `{
  type: 'object',
  required: ['email', 'name', 'age'],
  additionalProperties: false,
  properties: {
    email: { type: 'string', format: 'email', maxLength: 128 },
    name: { type: 'string', minLength: 1, maxLength: 80 },
    age: { type: 'integer', minimum: 13, maximum: 130 },
    tags: { type: 'array', items: { type: 'string' }, maxItems: 10 },
    address: {
      type: 'object',
      required: ['city', 'country'],
      properties: {
        city: { type: 'string' },
        country: { type: 'string', minLength: 2, maxLength: 2 },
        zip: { type: 'string', pattern: '^[0-9]{5}$' }
      }
    }
  }
}`

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
            <div className="dx-bar-fill" style={{ width: `${Math.max(2, Math.round(r.ratio * 100))}%` }} />
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
        The interesting question is not which validator wins a microbenchmark. It is what
        validation costs inside your own request, at startup, in your bundle, and when the
        runtime will not let you generate code. Those are the four numbers below.
      </p>

      <h2>The schema everything here uses</h2>
      <p>
        A signup body, five fields with a nested object and a pattern, closed to unknown keys.
        Roughly what an HTTP route carries.
      </p>
      <DocsCode lang="js">{SCHEMA}</DocsCode>

      <h2>One request</h2>
      <Bars rows={REQUEST} />
      <p>
        Accepting a valid body takes 24 ns, so a route handling ten thousand requests a second
        spends about a quarter of a millisecond per second on validation. Rejecting is cheaper
        than accepting, because the check stops at the first rule that fails.
      </p>
      <p>
        The third bar is the one worth understanding. Errors are built when you read them. If
        the route answers a bad body with a 400 and no detail, you never pay the 478 ns; if it
        returns the list, you do, once.
      </p>

      <h2>Startup</h2>
      <p>
        Ten route schemas, compiled and ready to serve: <strong>0.24 ms</strong>. A schema is
        compiled the first time it validates something, so a process that boots and idles
        compiles nothing at all. This matters on platforms that charge for cold starts.
      </p>

      <h2>When code generation is blocked</h2>
      <p>
        Some runtimes refuse <code>new Function</code>: browser pages under a strict policy,
        several edge platforms, a few embedded engines. ata keeps working there on its
        interpreter, and this is what that costs.
      </p>
      <table className="dx-table">
        <thead>
          <tr><th>Same schema</th><th>Compiled</th><th>Code generation blocked</th></tr>
        </thead>
        <tbody>
          {BLOCKED.map((r) => (
            <tr key={r.what}>
              <td>{r.what}</td>
              <td className="dx-num">{r.compiled}</td>
              <td className="dx-num">{r.interpreted}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Slower, and still fast enough to be unremarkable in a request. The verdicts are
        identical: the whole official suite runs in this mode on every change, at the same
        counts as the compiled path.
      </p>

      <h2>In a bundle</h2>
      <p>
        <code>ata compile</code> turns that schema into a module of{' '}
        <strong>2.27 KB gzipped</strong> that imports nothing. No compiler, no interpreter, no
        runtime dependency, so the size of the library stops being part of the conversation for
        front-end and edge builds.
      </p>
      <DocsCode lang="shell">{`npx ata compile schema.json --out validate.js`}</DocsCode>

      <h2>Memory per validator</h2>
      <p>
        An application with two hundred routes constructs two hundred validators, and usually
        exercises a handful per request. Retained heap per instance, on a ten-key object schema:
      </p>
      <Bars rows={MEMORY} />
      <p>
        Methods are built on first use instead of being bound in the constructor, which is why
        an idle validator sits at 0.43 KB.
      </p>

      <h2>The public harness</h2>
      <p>
        On the shapes used by the runtime type benchmark that most of the ecosystem reports
        against, ata reaches <strong>127.8M ops/s</strong> with unknown keys allowed and{' '}
        <strong>69.9M ops/s</strong> with them rejected. The case file is in that project's
        repository, so the run is reproducible by anyone.
      </p>

      <h2>How these were taken</h2>
      <p>
        One laptop, Apple silicon, Node 25. Medians of nine interleaved rounds in a single
        process, after a warmup. Heap figures are deltas across two forced collections over two
        thousand instances. Numbers move with hardware and with the schema, so treat them as
        shape rather than as a contract, and rerun them yourself:
      </p>
      <DocsCode lang="shell">{`git clone https://github.com/ata-core/ata-validator
cd ata-validator && npm install

npm run test:suite         # correctness, three dialects
node benchmark/bench.mjs   # the timing harness`}</DocsCode>
      <p>
        <Link to="/docs/performance">Performance</Link> explains why the failure path is cheap
        and where the time goes, and <Link to="/docs/compliance">Compliance</Link> has the
        correctness results, which are the ones that should decide this.
      </p>
    </>
  )
}
