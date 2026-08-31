import { Link } from 'react-router-dom'
import { DocsCode } from '../../components/DocsCode'

const SUITE = [
  { dialect: 'Draft 2020-12', score: '1299 / 1299' },
  { dialect: 'Draft 7', score: '927 / 927' },
  { dialect: 'JSON Schema v1', score: '1133 / 1133' },
]

const COST = [
  { what: 'validate() on a passing object', value: '4.7 ns' },
  { what: 'Rejection, errors never read', value: '5.0 ns' },
  { what: 'Compile a schema, once, on first use', value: '6.0 µs' },
  { what: 'Validator constructed and never used', value: '0.43 KB' },
]

export default function Home() {
  return (
    <>
      <header className="dx-hero">
        <p className="dx-hero-mark">ata</p>
        <h1>A JSON Schema validator that explains itself</h1>
        <p className="dx-lede">
          Compiles your schema into a plain function on first use, validates with it afterwards,
          and points at the exact line that broke when a document fails. Three dialects, no
          required binaries, and the same results in every runtime.
        </p>

        <DocsCode lang="js">{`// npm install ata-validator
import { Validator } from 'ata-validator'

const v = new Validator({
  type: 'object',
  required: ['id', 'email'],
  properties: {
    id: { type: 'integer', minimum: 1 },
    email: { type: 'string', format: 'email' }
  }
})

v.validate({ id: 42, email: 'a@b.co' })   // { valid: true, errors: [] }`}</DocsCode>

        <div className="dx-hero-actions">
          <Link className="dx-btn dx-btn-primary" to="/docs/quick-start">Get started</Link>
          <Link className="dx-btn" to="/playground">Playground</Link>
          <a
            className="dx-btn"
            href="https://github.com/ata-core/ata-validator"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </header>

      <h2>When it fails</h2>
      <p>
        Pass the JSON text rather than a parsed object and every error carries the line and
        column it came from. The renderers turn that into something a person can act on.
      </p>
      <DocsCode lang="plain">{`error[ATA6001]: expected one of ["dev", "prod"], found "prd"
  --> input:4:11  (body.mode)
   |
  4 |   "mode": "prd"
   |           ^^^^^  found "prd"
   |
   = help: did you mean \`prod\`?
   = note: see https://ata-validator.com/e/ATA6001`}</DocsCode>
      <p>
        The list behind that output is ordinary data: stable codes, JSON pointers, the expected
        and received values. Rendering is opt in, so a service that only returns a status code
        never pays for it. <Link to="/docs/errors">Read about errors</Link>.
      </p>

      <h2>What you get</h2>
      <ul>
        <li>
          <strong>Three dialects.</strong> Draft 2020-12, draft 7 and the JSON Schema v1
          dialect, each at the full official suite count.
        </li>
        <li>
          <strong>No required binaries.</strong> The default install is pure JavaScript. A
          native engine is optional and accelerates the buffer APIs where it is present.
        </li>
        <li>
          <strong>Works where code generation is blocked.</strong> Under a policy that forbids{' '}
          <code>new Function</code>, schemas run on an interpreter with the same results, and
          the whole suite is tested in that mode.
        </li>
        <li>
          <strong>Types from the schema.</strong> <code>defineSchema</code> and{' '}
          <code>Infer&lt;S&gt;</code> give the static type without a second declaration.
        </li>
        <li>
          <strong>A build step when you want one.</strong> <code>ata compile</code> emits a
          standalone module that imports nothing at all.
        </li>
      </ul>

      <h2>Measured, not estimated</h2>
      <p>
        Every figure here comes from a run that anyone can repeat. The suite figures come from{' '}
        <code>npm run test:suite</code> and hold with code generation blocked.
      </p>

      <table className="dx-table">
        <thead>
          <tr><th>Dialect</th><th>Official suite</th></tr>
        </thead>
        <tbody>
          {SUITE.map((r) => (
            <tr key={r.dialect}>
              <td>{r.dialect}</td>
              <td className="dx-num">{r.score}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className="dx-table">
        <thead>
          <tr><th>Cost</th><th>Measured</th></tr>
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
      <p className="dx-note">
        Timings are medians of interleaved runs on one development machine, on a small object
        schema. They show relative cost, not a promise for your hardware.{' '}
        <Link to="/docs/performance">How these are measured</Link>.
      </p>

      <h2>Where it is used</h2>
      <p>
        Fastify lists ata among its alternative validators, and the{' '}
        <code>fastify-ata</code> plugin wires it in with the framework's own defaults.
        react-jsonschema-form ships an ata validator in its main repository, in a runtime and a
        precompiled form. <code>ata-vite</code> compiles schemas during a build so the bundle
        carries validation functions and no compiler.{' '}
        <Link to="/docs/integrations">See the integrations</Link>.
      </p>

      <h2>Start here</h2>
      <p>
        <Link to="/docs/quick-start">Quick start</Link> takes about a minute.{' '}
        <Link to="/docs">Introduction</Link> explains the shape of the library, and{' '}
        <Link to="/docs/api">API reference</Link> lists everything it exposes.
      </p>
    </>
  )
}
