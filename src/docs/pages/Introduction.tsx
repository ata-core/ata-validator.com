import { Link } from 'react-router-dom'
import { DocsCode } from '../../components/DocsCode'

export default function Introduction() {
  return (
    <>
      <p className="dx-eyebrow">Getting started</p>
      <h1>Introduction</h1>
      <p className="dx-lede">
        ata-validator is a JSON Schema validator for JavaScript. It compiles a schema into a
        plain function the first time you use it, validates with that function afterwards, and
        tells you exactly where a document went wrong when it fails.
      </p>

      <h2>What it does</h2>
      <p>
        One package covers three dialects: Draft 2020-12, draft 7 and the JSON Schema v1
        dialect. Every case in the official test suite passes for all three, and the same
        figures hold when code generation is blocked, because schemas that cannot be compiled
        run on an interpreter with identical results.
      </p>
      <p>
        The default install is pure JavaScript and works in Node.js, the browser, Bun, Deno and
        edge runtimes. A native engine ships as an optional per-platform package and
        accelerates the buffer APIs where it is available. It is an accelerator, not a
        requirement.
      </p>

      <h2>What it looks like</h2>
      <DocsCode lang="js">{`import { Validator } from 'ata-validator'

const v = new Validator({
  type: 'object',
  required: ['id'],
  properties: { id: { type: 'integer' } }
})

v.validate({ id: 42 })    // { valid: true, errors: [] }
v.validate({ id: 'x' })   // { valid: false, errors: [ ... ] }`}</DocsCode>

      <h2>Where it fits</h2>
      <ul>
        <li>
          HTTP request validation, where one compiled validator is reused across every request.
        </li>
        <li>
          Configuration files, where the failure message is the whole product and needs to
          point at the line that is wrong.
        </li>
        <li>
          Build steps, through <code>ata compile</code>, which turns a schema into a standalone
          JavaScript module that imports nothing at all.
        </li>
        <li>
          Restricted runtimes, where <code>new Function</code> is unavailable and validation
          still has to work.
        </li>
      </ul>

      <h2>Next</h2>
      <p>
        <Link to="/docs/quick-start">Quick start</Link> installs the package and validates a
        first schema. <Link to="/docs/how-it-works">How it works</Link> explains the engines
        behind <code>validate()</code>, and <Link to="/docs/errors">Errors</Link> covers the
        failure path, which is where most of the design effort went.
      </p>
    </>
  )
}
