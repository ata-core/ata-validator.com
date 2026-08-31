import { Link } from 'react-router-dom'
import { DocsCode } from '../../components/DocsCode'

export default function QuickStart() {
  return (
    <>
      <p className="dx-eyebrow">Getting started</p>
      <h1>Quick start</h1>
      <p className="dx-lede">
        Install the package, compile a schema once, and validate as many documents as you like
        against it.
      </p>

      <h2>Install</h2>
      <DocsCode lang="shell">{`npm install ata-validator`}</DocsCode>
      <p className="dx-note">
        There is no install script and no build step. npm resolves a per-platform native
        package where one fits; everywhere else the same code runs on pure JavaScript with the
        same results.
      </p>

      <h2>Validate an object</h2>
      <DocsCode lang="js">{`import { Validator } from 'ata-validator'

const v = new Validator({
  type: 'object',
  required: ['id', 'email'],
  properties: {
    id: { type: 'integer', minimum: 1 },
    email: { type: 'string', format: 'email' }
  }
})

const result = v.validate({ id: 42, email: 'a@b.co' })

if (!result.valid) {
  for (const err of result.errors) {
    console.error(err.path, err.message)
  }
}`}</DocsCode>
      <p>
        Construct the <code>Validator</code> once and keep it. The schema compiles on the first
        call, and every call after that runs the compiled function.
      </p>

      <h2>Validate JSON text</h2>
      <p>
        Passing the raw text instead of a parsed object lets each error carry the line and
        column it came from, which is what the renderers use.
      </p>
      <DocsCode lang="js">{`import { Validator, renderPretty } from 'ata-validator'

const v = new Validator(schema)
const result = v.validateJSON(await readFile('config.json', 'utf8'))

if (!result.valid) {
  console.error(renderPretty(result.errors))
}`}</DocsCode>

      <h2>Verdict only</h2>
      <p>
        When you do not need the error list, <code>isValidObject()</code> answers with a boolean
        and builds nothing.
      </p>
      <DocsCode lang="js">{`v.isValidObject(data) // true or false`}</DocsCode>

      <h2>Next</h2>
      <p>
        <Link to="/docs/installation">Installation</Link> covers native packages and
        constrained runtimes. <Link to="/docs/api">API reference</Link> lists every method and
        option.
      </p>
    </>
  )
}
