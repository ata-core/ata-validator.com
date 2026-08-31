import { DocsCode } from '../../components/DocsCode'

export default function Integrations() {
  return (
    <>
      <p className="dx-eyebrow">Ecosystem</p>
      <h1>Integrations</h1>
      <p className="dx-lede">
        ata plugs in where a validator is already expected: an HTTP framework, a form library, a
        build step, or anything that reads Standard Schema.
      </p>

      <h2>Fastify</h2>
      <p>
        Fastify lists ata as one of its alternative validators. Point{' '}
        <code>setValidatorCompiler</code> at it and every route with a body, query or params
        schema goes through ata.
      </p>
      <DocsCode lang="js">{`import Fastify from 'fastify'
import { Validator } from 'ata-validator'

const app = Fastify()

app.setValidatorCompiler(({ schema }) => {
  const v = new Validator(schema, { coerceTypes: true, removeAdditional: true })
  return (data) => {
    const r = v.validate(data)
    if (r.valid) return { value: data }
    const error = new Error(r.errors.map(e => e.message).join(', '))
    error.validation = r.errors
    return { error }
  }
})`}</DocsCode>
      <p>
        The <code>fastify-ata</code> plugin does the same wiring with Fastify's own defaults
        already applied, so behavior matches the framework's built-in validator without any
        options to tune.
      </p>
      <DocsCode lang="shell">{`npm install fastify-ata`}</DocsCode>

      <h2>react-jsonschema-form</h2>
      <p>
        rjsf ships an ata validator package in its main repository, in two forms: a runtime
        validator, and a precompiled one for applications that compile their schemas at build
        time and want no compiler in the bundle.
      </p>

      <h2>Vite</h2>
      <p>
        <code>ata-vite</code> compiles schemas during the build and emits standalone validation
        modules, so the shipped bundle contains validation functions and no schema compiler. It
        handles JavaScript and TypeScript sources and respects path aliases.
      </p>
      <DocsCode lang="js">{`import ata from 'ata-vite'

export default { plugins: [ata()] }`}</DocsCode>

      <h2>Standard Schema V1</h2>
      <p>
        A <code>Validator</code> implements the Standard Schema V1 interface, so form libraries,
        ORMs and RPC layers that accept that shape can take an ata schema with no adapter.
      </p>

      <h2>Node.js</h2>
      <p>
        A vendored integration for validating <code>node.config.json</code> was prototyped in
        nodejs/node#62603. It is parked as a draft while the discussion about which validation
        API core should expose continues, so ata is not part of Node.js today.
      </p>

      <h2>Bowtie</h2>
      <p>
        ata takes part in Bowtie, the cross-implementation JSON Schema test harness, so its
        results can be compared against other implementations on the official suite without
        anyone taking our word for it.
      </p>
    </>
  )
}
