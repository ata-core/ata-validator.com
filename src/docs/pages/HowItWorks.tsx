import { Link } from 'react-router-dom'
import { DocsCode } from '../../components/DocsCode'

export default function HowItWorks() {
  return (
    <>
      <p className="dx-eyebrow">Guides</p>
      <h1>How it works</h1>
      <p className="dx-lede">
        Two phases. A schema is compiled once into something the engine can run quickly, and
        every validation after that goes through the compiled form.
      </p>

      <DocsCode lang="plain">{`Schema  ──compile──▶  Validator  ──validate(input)──▶  { valid, errors }`}</DocsCode>

      <h2>Three engines, one result</h2>
      <p>
        Which engine answers depends on the schema, not on configuration. All three produce the
        same verdicts and the same errors; an agreement test runs the entire official suite
        through every path on each change to keep it that way.
      </p>
      <table className="dx-table">
        <thead>
          <tr><th>Engine</th><th>Used for</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>codegen</strong></td>
            <td>
              Typical schemas. The compiler emits JavaScript source for the schema and builds a
              function from it, which V8 then optimizes like any other hot code.
            </td>
          </tr>
          <tr>
            <td><strong>closure</strong></td>
            <td>
              Shapes the source emitter declines. A tree of small closures is built instead, no
              source text involved.
            </td>
          </tr>
          <tr>
            <td><strong>interpreter</strong></td>
            <td>
              Everything else, and every schema when code generation is unavailable. A compiled
              plan is walked directly.
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        <code>engine()</code> reports the answer for a given schema, which is useful in startup
        logs and when measuring.
      </p>
      <DocsCode lang="js">{`const v = new Validator(schema)
v.validate(data)
v.engine()   // 'codegen', 'closure' or 'interpreter'`}</DocsCode>

      <h2>Declining beats guessing</h2>
      <p>
        A validator that wrongly rejects gets a bug report. One that wrongly accepts does not.
        Every path that cannot represent a construct declines and hands the schema to a path
        that can, and an empty generated program is never treated as a valid one. That rule is
        enforced by tests, not by convention.
      </p>

      <h2>Lazy by default</h2>
      <p>
        Constructing a <code>Validator</code> does very little: the schema is normalized and
        stored, and nothing else is built. Compilation happens on the first call, error objects
        are built only when the error list is read, and the public methods are materialized on
        first use. A validator that is constructed and never called stays small.
      </p>

      <h2>Ahead of time</h2>
      <p>
        For build pipelines, <code>ata compile</code> writes a standalone JavaScript module for
        a schema. The output imports nothing, contains no interpreter and no compiler, and can
        be checked into a bundle or vendored.
      </p>
      <DocsCode lang="shell">{`npx ata compile schema.json --out validate.js`}</DocsCode>

      <h2>Next</h2>
      <p>
        <Link to="/docs/errors">Errors</Link> covers what happens when validation fails, and{' '}
        <Link to="/docs/performance">Performance</Link> gives the measured figures for each of
        these paths.
      </p>
    </>
  )
}
