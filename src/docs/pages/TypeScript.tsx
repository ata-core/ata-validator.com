import { DocsCode } from '../../components/DocsCode'

export default function TypeScriptPage() {
  return (
    <>
      <p className="dx-eyebrow">Guides</p>
      <h1>TypeScript</h1>
      <p className="dx-lede">
        Types come from the schema itself. There is no second declaration to keep in sync and
        no adapter between the runtime value and the static type.
      </p>

      <h2>defineSchema</h2>
      <p>
        <code>defineSchema</code> returns the schema untouched at runtime. In TypeScript it
        gives keyword completion, flags a value of the wrong shape, and preserves the literal
        types without <code>as const</code>.
      </p>
      <DocsCode lang="js">{`import { defineSchema, Validator } from 'ata-validator'

const userSchema = defineSchema({
  type: 'object',
  required: ['id', 'name'],
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    tags: { type: 'array', items: { type: 'string' } }
  }
})

const v = new Validator(userSchema)
const r = v.validate(input)

if (r.valid) {
  r.data.name.toUpperCase()   // typed, no annotation needed
}`}</DocsCode>

      <h2>Infer</h2>
      <p>
        <code>Infer&lt;S&gt;</code> gives the type a schema describes. It follows{' '}
        <code>anyOf</code> and <code>oneOf</code> into unions, <code>allOf</code> into
        intersections, <code>prefixItems</code> into tuples, and local and recursive{' '}
        <code>$ref</code> back to their definitions.
      </p>
      <DocsCode lang="js">{`import { defineSchema, type Infer } from 'ata-validator'

const event = defineSchema({
  type: 'object',
  required: ['kind'],
  properties: {
    kind: { enum: ['click', 'view'] },
    at: { type: 'string', format: 'date-time' }
  }
})

type Event = Infer<typeof event>
// { kind: 'click' | 'view'; at?: string }`}</DocsCode>

      <h2>The chainable builder</h2>
      <p>
        If you prefer a builder to schema literals, <code>ata-validator/t</code> ships one whose
        output is still plain JSON Schema. The runtime validator, <code>Infer</code> and the
        ahead-of-time pipeline all keep working on it with no adapter.
      </p>
      <DocsCode lang="js">{`import { t } from 'ata-validator/t'
import { Validator, type Infer } from 'ata-validator'

const User = t.object({
  id: t.integer({ minimum: 1 }),
  name: t.string(),
  email: t.optional(t.string({ format: 'email' }))
})

type User = Infer<typeof User>

const v = new Validator(User)`}</DocsCode>
      <p>
        Because the builder produces schemas rather than a private representation, anything that
        reads JSON Schema, including documentation generators and other validators, can read the
        output.
      </p>

      <h2>Standard Schema</h2>
      <p>
        A <code>Validator</code> implements the Standard Schema V1 interface, so libraries that
        accept that shape can take an ata schema directly.
      </p>
      <DocsCode lang="js">{`const result = v['~standard'].validate(input)`}</DocsCode>
    </>
  )
}
