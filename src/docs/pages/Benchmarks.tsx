import { Link } from 'react-router-dom'
import { DocsCode } from '../../components/DocsCode'

type Bar = { label: string; value: string; ratio: number }

const REQUEST: Bar[] = [
  { label: 'Accepts the body', value: '60 ns', ratio: 0.19 },
  { label: 'Rejects it, verdict only', value: '49 ns', ratio: 0.16 },
  { label: 'Rejects it, error list read', value: '313 ns', ratio: 1 },
]

const BLOCKED = [
  { what: 'Accepts the body', compiled: '60 ns', interpreted: '255 ns' },
  { what: 'Rejects it, verdict only', compiled: '49 ns', interpreted: '125 ns' },
  { what: 'Ten route schemas ready', compiled: '0.10 ms', interpreted: '0.33 ms' },
]

const ZOD = [
  { what: 'Accepts a document, verdict', zod: '512 ns', compiled: '43 ns', bridge: '20 ns' },
  { what: 'Rejects one, verdict', zod: '811 ns', compiled: '823 ns', bridge: '5 ns' },
  { what: 'Rejects via safeParse', zod: '811 ns', compiled: '823 ns', bridge: '6.5 ns' },
  { what: 'Accepts, code generation blocked', zod: '1,260 ns', compiled: '1,245 ns', bridge: '644 ns' },
  { what: 'Rejects, code generation blocked', zod: '1,651 ns', compiled: '1,675 ns', bridge: '107 ns' },
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

      <h2>Measured by others</h2>
      <p>
        Two public harnesses run ata without ata's involvement, and their numbers come before
        any number on this page.
      </p>
      <ul>
        <li>
          <a href="https://schemabenchmarks.dev/validation" target="_blank" rel="noreferrer">
            schemabenchmarks.dev
          </a>{' '}
          benchmarks runtime validation libraries on one product document. On its validation
          page, valid data, the run of 2026-09-13 against ata 1.14.1 puts ata first at{' '}
          <strong>603 ns</strong>, with the next entry at 1.77 times that. The same site puts ata
          last on the download page, 64.9 KB gzipped, because the entry it bundles is the runtime
          compiler; the module <code>ata build</code> emits for that schema is 5.1 KB minified
          and gzipped, and a compiled entry for the harness is in preparation.
        </li>
        <li>
          <a href="https://bowtie.report/" target="_blank" rel="noreferrer">Bowtie</a> runs the
          official JSON Schema Test Suite against every implementation it knows and publishes
          the results side by side. ata's harness declares Draft 2020-12 and draft 7 there; at
          ata 1.16.1 the suite passes under Bowtie's own runner with nothing failed, errored or
          skipped. The v1 dialect is declared in a harness change that waits for a Bowtie
          release.
        </li>
      </ul>
      <h2>The schema everything here uses</h2>
      <p>
        A signup body, five fields with a nested object and a pattern, closed to unknown keys.
        Roughly what an HTTP route carries.
      </p>
      <DocsCode lang="js">{SCHEMA}</DocsCode>

      <h2>One request</h2>
      <Bars rows={REQUEST} />
      <p>
        Accepting a valid body takes 60 ns, so a route handling ten thousand requests a second
        spends less than a millisecond per second on validation. Rejecting is cheaper
        than accepting, because the check stops at the first rule that fails.
      </p>
      <p>
        The third bar is the one worth understanding. Errors are built when you read them. If
        the route answers a bad body with a 400 and no detail, you never pay the 313 ns; if it
        returns the list, you do, once.
      </p>

      <h2>Startup</h2>
      <p>
        Ten route schemas, compiled and ready to serve: <strong>0.10 ms</strong>. A schema is
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
        <strong>3.5 KB gzipped</strong> that imports nothing, full error detail included. No
        compiler, no interpreter, no
        runtime dependency, so the size of the library stops being part of the conversation for
        front-end and edge builds.
      </p>
      <DocsCode lang="shell">{`npx ata compile schema.json --out validate.js`}</DocsCode>
      <p>
        That last sentence only holds if you compile. The runtime API is the other path, and it
        is worth knowing what it costs before measuring the wrong one. A ten-field user schema
        built with <code>bun build --minify --target=browser</code>: the compiled module is{' '}
        <strong>4.5 KB</strong> gzipped, <code>new Validator(schema)</code> is{' '}
        <strong>87.0 KB</strong>. A schema that arrives at run time can use any keyword, so the
        whole engine has to ship with it.
      </p>
      <p>
        On a server that difference is not worth thinking about, and the runtime API is the
        simpler thing to reach for. In a browser, on an edge runtime, or anywhere a cold start
        is charged, compile: the same Hono route starts in 3.5 ms compiled against 10.7 ms on
        the runtime API, and 3.6 ms with no validation at all.
      </p>

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

      <h2>Through a zod schema</h2>
      <p>
        <code>@ata-project/zod</code> takes a zod 4 schema and answers its verdicts from the
        ata engine, with the same answers as zod itself, differential-tested on 13,030
        generated values. Three ways to run one nine-field schema, zod 4.6.5 on
        ata-validator 1.25.0:
      </p>
      <table className="dx-table">
        <thead>
          <tr><th>Same zod schema</th><th>safeParse</th><th>z.compile</th><th>@ata-project/zod</th></tr>
        </thead>
        <tbody>
          {ZOD.map((r) => (
            <tr key={r.what}>
              <td>{r.what}</td>
              <td className="dx-num">{r.zod}</td>
              <td className="dx-num">{r.compiled}</td>
              <td className="dx-num">{r.bridge}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        The rejection rows are the story: a rejected <code>safeParse</code> builds its{' '}
        <code>ZodError</code> on first read, so a route that answers with a plain 400 pays
        6.5 ns. Accepted values are always produced by zod itself, since plain{' '}
        <code>z.object</code> strips unknown keys and defaults fill, so parsing valid input
        runs at zod speed by design. The last two rows are the blocked-codegen case from
        above, through the bridge. Setup and the mode rules are on{' '}
        <Link to="/docs/integrations/zod">the zod integration page</Link>.
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

npm run test:suite                    # correctness, three dialects
node benchmark/bench_docs_site.mjs    # the timing harness behind this page`}</DocsCode>
      <p>
        <Link to="/docs/performance">Performance</Link> explains why the failure path is cheap
        and where the time goes, and <Link to="/docs/compliance">Compliance</Link> has the
        correctness results, which are the ones that should decide this.
      </p>
    </>
  )
}
