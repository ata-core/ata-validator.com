import { Link } from 'react-router-dom'
import { DocsCode } from '../../../components/DocsCode'

export default function IntegrationZod() {
  return (
    <>
      <p className="dx-eyebrow">Integrations</p>
      <h1>zod</h1>
      <p className="dx-lede">
        <code>@ata-project/zod</code> runs a zod 4 schema on the ata engine. The schema stays
        zod, the answers always match zod's own, and the verdicts arrive in nanoseconds.
      </p>

      <DocsCode lang="shell">{`npm install @ata-project/zod`}</DocsCode>
      <p>
        zod 4 and ata-validator are peer dependencies; npm and pnpm install them automatically.
      </p>
      <DocsCode lang="js">{`import { z } from 'zod'
import { compile } from '@ata-project/zod'

const user = z.object({
  id: z.number().int().min(1),
  email: z.string().email(),
})

const check = compile(user)
check.isValid(data)        // ata answers
check.safeParse(data)      // zod-shaped result, zod-produced value
check.parse(data)          // throws a real ZodError
check.isValidBytes(bytes)  // verdict straight from a Buffer, no JSON.parse`}</DocsCode>

      <h2>How it stays correct</h2>
      <p>
        <code>compile()</code> converts the schema through <code>z.toJSONSchema</code>, and that
        conversion is lossy in both directions: refinements and transforms are dropped
        silently, which makes the emitted schema looser than zod, and coercion is dropped too,
        which makes it stricter. A wrong answer in either direction is unacceptable, so the
        schema is classified by walking zod's own definition tree before anything runs:
      </p>
      <table className="dx-table">
        <thead>
          <tr><th>Mode</th><th>When</th><th>Who answers</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><code>ata</code></td>
            <td>the conversion is exact</td>
            <td>ata alone</td>
          </tr>
          <tr>
            <td><code>hybrid</code></td>
            <td>refine, transform, pipe, Date and other non-JSON types</td>
            <td>ata's rejection is final; an acceptance runs zod for the residue</td>
          </tr>
          <tr>
            <td><code>zod</code></td>
            <td>coerce, catch, preprocess, or a node the classifier does not recognise</td>
            <td>zod, undecorated</td>
          </tr>
        </tbody>
      </table>
      <p>
        The classification is conservative: an unrecognised node lands in <code>zod</code>{' '}
        mode, so a new zod feature can make the bridge slower, never wrong. The package is
        differential-tested against zod on 13,030 generated values across all three modes,
        and the whole suite runs a second time with code generation blocked.{' '}
        <code>compiled.engine</code> tells you which mode you got, <code>compiled.reasons</code>{' '}
        says why.
      </p>

      <h2>What it costs</h2>
      <img
        src="/integrations/zod-bench.png"
        alt="One zod schema, three ways to run it: measured times for accepting and rejecting documents, in Node and with code generation blocked"
        style={{ width: '100%', borderRadius: 12, border: '1px solid var(--border, #e3e3e0)', margin: '4px 0 16px' }}
        loading="lazy"
      />
      <p>
        Measured on a nine-field object schema, zod 4.5.4 on ata-validator 1.13.1, interleaved
        medians: accepting a document takes 21 ns and rejecting one 5 ns, against 526 and
        1,419 ns through <code>safeParse</code> and 45 and 1,429 ns through{' '}
        <code>z.compile</code>. A rejected <code>safeParse</code> builds its{' '}
        <code>ZodError</code> on first read and costs 6.7 ns until then. With code generation
        blocked, the way a strict CSP blocks it, compiled paths lose their advantage; the
        bridge falls back to ata's interpreted engine and keeps answering at 641 ns for
        accepts and 112 ns for rejects. The full table is on{' '}
        <Link to="/docs/benchmarks">Benchmarks</Link>. Or skip the tables and{' '}
        <Link to="/race">watch the two engines race in your own browser</Link>.
      </p>
      <p>
        Accepted values are always produced by zod itself, since plain <code>z.object</code>{' '}
        strips unknown keys, defaults fill and transforms rewrite, so parsing valid input runs
        at zod speed by design. The verdict and the rejection are what the bridge accelerates.
      </p>

      <h2>Raw bytes</h2>
      <p>
        Since 0.2.0, <code>isValidBytes</code> answers from a <code>Buffer</code>,{' '}
        <code>Uint8Array</code> or JSON string without <code>JSON.parse</code> and without
        materializing a JavaScript object, a path zod does not have. On an{' '}
        <code>engine: 'ata'</code> schema with the native engine present the verdict comes from
        a SIMD walk of the buffer; other modes and pure-JS installs parse first, so the call is
        correct everywhere. Bytes that are not valid JSON return <code>false</code> rather than
        throwing.
      </p>
      <p>
        Measured on the same schema, first element invalid on the rejects: a 0.2 KB payload is
        rejected in 0.6 &micro;s against 1.6 &micro;s for parse-then-<code>safeParse</code>,
        and a 229 KB payload in 482 &micro;s against 791 &micro;s. Rejection never costs more
        than acceptance. This is a verdict, not a parse: when you need the value, parse and{' '}
        <code>safeParse</code> as before. It earns its keep where rejection is the common case,
        gateways, webhook endpoints and queue consumers that drop bad messages before doing any
        further work.
      </p>

      <h2>Standard Schema</h2>
      <p>
        The compiled object implements Standard Schema V1, so anything that accepts a standard
        schema runs the fast path without knowing either library.
      </p>
    </>
  )
}
