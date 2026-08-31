import { DocsCode } from '../../components/DocsCode'

export default function Dialects() {
  return (
    <>
      <p className="dx-eyebrow">Guides</p>
      <h1>Dialects</h1>
      <p className="dx-lede">
        Draft 2020-12 is the default. Draft 7 is normalized on the way in, and the JSON Schema
        v1 dialect is selected by its <code>$schema</code>.
      </p>

      <h2>Choosing one</h2>
      <table className="dx-table">
        <thead>
          <tr><th>Dialect</th><th>$schema</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Draft 2020-12</strong></td>
            <td>Default when no <code>$schema</code> is present</td>
          </tr>
          <tr>
            <td><strong>Draft 7</strong></td>
            <td><code>http://json-schema.org/draft-07/schema#</code></td>
          </tr>
          <tr>
            <td><strong>JSON Schema v1</strong></td>
            <td>
              <code>https://json-schema.org/v1</code> or the dated{' '}
              <code>https://json-schema.org/v1/2026</code>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>What v1 changes</h2>
      <p>
        Two keywords differ. <code>propertyDependencies</code> selects a subschema by the value
        of a property rather than by its presence, which is what <code>dependentSchemas</code>{' '}
        does.
      </p>
      <DocsCode lang="js">{`const v = new Validator({
  $schema: 'https://json-schema.org/v1',
  type: 'object',
  propertyDependencies: {
    kind: {
      card: { required: ['cardNumber'] },
      bank: { required: ['iban'] }
    }
  }
})`}</DocsCode>
      <p>
        And <code>$dynamicRef</code> no longer requires bookending: the reference resolves
        through the dynamic scope whether or not the schema it first lands on carries a
        matching <code>$dynamicAnchor</code>, so the outermost matching anchor still in scope
        wins.
      </p>

      <h2>Vocabularies</h2>
      <p>
        A meta-schema that declares <code>$vocabulary</code> is honored: keywords from a
        vocabulary that is not in the list are treated as annotations rather than assertions.
      </p>

      <h2>Mixing them</h2>
      <p>
        Everything else is identical across dialects, so a schema that declares no{' '}
        <code>$schema</code> behaves the same as it always did. Both v1 keywords are implemented
        in the interpreted engine, which means a v1 schema that uses <code>$dynamicRef</code>{' '}
        validates there rather than through the compiler, since the compiler resolves references
        the 2020-12 way. Schemas that use neither keyword take the compiled path.
      </p>
    </>
  )
}
