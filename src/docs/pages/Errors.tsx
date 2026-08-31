import { Link } from 'react-router-dom'
import { DocsCode } from '../../components/DocsCode'

export default function Errors() {
  return (
    <>
      <p className="dx-eyebrow">Guides</p>
      <h1>Errors</h1>
      <p className="dx-lede">
        A failed validation returns a list of errors that is machine readable first and
        human readable on demand. Nothing is computed until you ask for it.
      </p>

      <h2>The result</h2>
      <DocsCode lang="js">{`const r = v.validate({ id: 'x' })

r.valid    // false
r.errors   // built when this property is first read`}</DocsCode>
      <p>
        The error list is lazy. A rejection that is only counted, logged as a status code or
        turned into a boolean never pays for the objects behind it.
      </p>

      <h2>One error</h2>
      <DocsCode lang="js">{`{
  "code": "ATA1001",
  "keyword": "type",
  "message": "must be string",
  "path": "/name",
  "instancePath": "/name",
  "schemaPath": "#/properties/name/type",
  "expected": "string",
  "received": "42",
  "params": { "type": "string" },
  "docUrl": "https://ata-validator.com/e/ATA1001"
}`}</DocsCode>
      <p>
        <code>path</code> and <code>instancePath</code> point at the value, <code>schemaPath</code>{' '}
        at the rule that rejected it, and <code>code</code> is stable across releases so it can
        be matched on. Every code has an explanation page linked from{' '}
        <code>docUrl</code>; see <Link to="/docs/error-codes">Error codes</Link>.
      </p>

      <h2>Rendering for a person</h2>
      <p>
        <code>renderPretty</code> and <code>renderCompact</code> turn the same array into text.
        When the document was passed as JSON text, each diagnostic carries the line and column
        it came from, and when the schema was supplied with a source, the rule is quoted too.
      </p>
      <DocsCode lang="js">{`import { Validator, renderPretty } from 'ata-validator'

const v = new Validator(schema, {
  source: { path: 'server.schema.json', content: schemaText }
})

const r = v.validateJSON(configText)
if (!r.valid) console.error(renderPretty(r.errors))`}</DocsCode>

      <DocsCode lang="plain">{`error[ATA1001]: expected string, found number
  --> server.schema.json:9:15
   |
  9 |       "type": "string"
   |               ^  expected string
   |
  --> input:2:11  (body.name)
   |
  2 |   "name": 42,
   |           ^^  found 42
   |
   = note: see https://ata-validator.com/e/ATA1001

error[ATA6001]: expected one of ["dev", "prod"], found "prd"
  --> input:4:11  (body.mode)
   |
  4 |   "mode": "prd"
   |           ^^^^^  found "prd"
   |
   = help: did you mean \`prod\`?
   = note: see https://ata-validator.com/e/ATA6001

error: 3 schema violations in input`}</DocsCode>

      <p>
        Rendering does not change the array. When two errors describe the same mistake, such as
        a key typed <code>nmae</code> where <code>name</code> was required, they are shown as
        one diagnostic and the footer says so, so the count never drifts from{' '}
        <code>errors.length</code>.
      </p>

      <h3>Objects instead of text</h3>
      <p>
        With a parsed object there is no source text to point at, so pass the data to the
        renderer and it reconstructs the frame.
      </p>
      <DocsCode lang="js">{`const r = v.validate(obj)
if (!r.valid) console.error(renderPretty(r.errors, { data: obj }))`}</DocsCode>
      <p className="dx-note">
        <code>validate()</code> attaches nothing to the array on its own. It is the library hot
        path, and a caller that never renders should not pay for it.
      </p>

      <h2>Custom messages</h2>
      <p>
        <code>errorMessage</code> replaces the text for a keyword or for a whole subschema,
        which is useful when the audience is not the developer who wrote the schema.
      </p>
      <DocsCode lang="js">{`{
  type: 'object',
  properties: {
    port: {
      type: 'integer',
      minimum: 1,
      errorMessage: { minimum: 'port must be 1 or higher' }
    }
  }
}`}</DocsCode>

      <h2>Order</h2>
      <p>
        Errors come back in the order the schema declares its properties, not in the order the
        input happens to list them, so the same failure always reads the same way.
      </p>
    </>
  )
}
