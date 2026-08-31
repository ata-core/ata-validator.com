import { Link } from 'react-router-dom'
import { DocsCode } from '../../components/DocsCode'

export default function Api() {
  return (
    <>
      <p className="dx-eyebrow">Reference</p>
      <h1>API reference</h1>
      <p className="dx-lede">
        One class covers the runtime surface. The standalone build turns the same schema into a
        module with no imports.
      </p>

      <h2>new Validator(schema, options)</h2>
      <p>
        Normalizes and stores the schema. Compilation happens on the first validating call, not
        here.
      </p>
      <DocsCode lang="js">{`import { Validator } from 'ata-validator'

const v = new Validator(schema, { coerceTypes: true })`}</DocsCode>

      <h3>Options</h3>
      <table className="dx-table">
        <thead>
          <tr><th>Option</th><th>Default</th><th>Effect</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><code>useDefaults</code></td>
            <td className="dx-num">true</td>
            <td>Fill in <code>default</code> values on absent properties, in place, before validating.</td>
          </tr>
          <tr>
            <td><code>coerceTypes</code></td>
            <td className="dx-num">false</td>
            <td>Convert types in place, so <code>"42"</code> satisfies an integer field.</td>
          </tr>
          <tr>
            <td><code>removeAdditional</code></td>
            <td className="dx-num">false</td>
            <td>Remove properties the schema does not declare.</td>
          </tr>
          <tr>
            <td><code>assertFormat</code></td>
            <td className="dx-num">true</td>
            <td>Treat <code>format</code> as an assertion. Set false to make it an annotation.</td>
          </tr>
          <tr>
            <td><code>richErrors</code></td>
            <td className="dx-num">true</td>
            <td>Include <code>code</code>, <code>expected</code>, <code>received</code> and <code>docUrl</code> on each error.</td>
          </tr>
          <tr>
            <td><code>verbose</code></td>
            <td className="dx-num">false</td>
            <td>Attach the subschema that produced each error.</td>
          </tr>
          <tr>
            <td><code>formats</code></td>
            <td className="dx-num">none</td>
            <td>Extra format checkers, as a map of name to predicate.</td>
          </tr>
          <tr>
            <td><code>schemas</code></td>
            <td className="dx-num">none</td>
            <td>Other schemas, for cross-document <code>$ref</code> resolution.</td>
          </tr>
          <tr>
            <td><code>source</code></td>
            <td className="dx-num">none</td>
            <td>Schema file path and text, so errors can quote the rule that rejected.</td>
          </tr>
        </tbody>
      </table>

      <h2>Methods</h2>
      <table className="dx-table">
        <thead>
          <tr><th>Method</th><th>Returns</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><code>validate(data)</code></td>
            <td><code>{'{ valid, errors }'}</code>, with a lazily built error list</td>
          </tr>
          <tr>
            <td><code>isValidObject(data)</code></td>
            <td>Boolean. No result object, no error construction</td>
          </tr>
          <tr>
            <td><code>validateJSON(text)</code></td>
            <td>Same result, from JSON text, with source positions on each error</td>
          </tr>
          <tr>
            <td><code>isValidJSON(text)</code></td>
            <td>Boolean, from JSON text</td>
          </tr>
          <tr>
            <td><code>engine()</code></td>
            <td><code>codegen</code>, <code>closure</code> or <code>interpreter</code></td>
          </tr>
          <tr>
            <td><code>addSchema(schema)</code></td>
            <td>Registers another schema for <code>$ref</code> resolution</td>
          </tr>
          <tr>
            <td><code>isValid(buffer)</code></td>
            <td>Boolean, straight from a Buffer or Uint8Array. Native engine only</td>
          </tr>
          <tr>
            <td><code>countValid(ndjson)</code></td>
            <td>Number of valid lines in an NDJSON buffer. Native engine only</td>
          </tr>
          <tr>
            <td><code>batchIsValid(buffers)</code></td>
            <td>One boolean per buffer. Native engine only</td>
          </tr>
          <tr>
            <td><code>validateAndParse(text)</code></td>
            <td>Validates and returns the parsed value in one pass. Native engine only</td>
          </tr>
        </tbody>
      </table>
      <p className="dx-note">
        The four native-only methods throw a clear error when the native engine is not
        installed, rather than falling back quietly to a slower path.
      </p>

      <h2>Rendering</h2>
      <p>
        <code>renderPretty(errors, options)</code> and <code>renderCompact(errors, options)</code>{' '}
        turn an error array into text. Both accept <code>{'{ data }'}</code> to reconstruct a
        frame for object input and <code>{'{ color: false }'}</code> for plain output. See{' '}
        <Link to="/docs/errors">Errors</Link>.
      </p>

      <h2>One-shot validate</h2>
      <p>
        <code>validate(schema, data)</code> compiles and validates in a single call. Convenient
        for a script, wasteful in a loop, because it cannot reuse the compiled form.
      </p>
      <DocsCode lang="js">{`import { validate } from 'ata-validator'

const r = validate(schema, data)`}</DocsCode>

      <h2>Ahead of time</h2>
      <p>
        <code>toStandaloneModule(schema, options)</code> returns JavaScript source for a schema
        that imports nothing. <code>Validator.bundle(schemas)</code> does the same for several
        schemas at once, and <code>Validator.fromStandalone(module, schema)</code> loads the
        result back into the normal interface.
      </p>
      <DocsCode lang="shell">{`npx ata compile schema.json --out validate.js`}</DocsCode>

      <h2>Formats</h2>
      <p>
        Built in: <code>email</code>, <code>date</code>, <code>date-time</code>,{' '}
        <code>time</code>, <code>uri</code>, <code>uri-reference</code>, <code>ipv4</code>,{' '}
        <code>ipv6</code>, <code>uuid</code>, <code>hostname</code>, <code>regex</code>. Add
        your own through the <code>formats</code> option.
      </p>
    </>
  )
}
