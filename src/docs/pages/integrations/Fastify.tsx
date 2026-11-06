import { DocsCode } from '../../../components/DocsCode'

export default function IntegrationFastify() {
  return (
    <>
      <p className="dx-eyebrow">Integrations</p>
      <h1>Fastify</h1>
      <p className="dx-lede">
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

      <h2>Validation as the body arrives</h2>
      <p>
        <code>fastify-ata/stream</code>, since fastify-ata 0.11.0, is a content-type parser that
        validates a JSON array or NDJSON body record by record as it arrives and ends the request
        at the first invalid record. A route that sets <code>config.records</code> takes it; other
        routes keep the stock parser.
      </p>
      <DocsCode lang="js">{`const fastifyAtaStream = require('fastify-ata/stream')

await app.register(fastifyAtaStream)

app.post('/import', {
  config: { records: { type: 'object', required: ['id'], properties: { id: { type: 'integer' } } } },
}, async (req) => {
  // req.body is the array of records, every one already validated
  return { imported: req.body.length }
})`}</DocsCode>
      <p>
        On a 100 MB body invalid at record 50: 564 ms and 569 MB of memory before, 11 ms and 2 MB
        with the parser.
      </p>

      <h2>Plans for the page</h2>
      <p>
        <code>fastify-ata/plans</code>, since fastify-ata 0.12.0 on ata-validator 1.63.1, writes
        each named schema as a plan once at startup and serves it at{' '}
        <code>GET /plans/&lt;name&gt;</code> with an ETag and <code>max-age=300</code>, 304 on a
        matching <code>If-None-Match</code>, 404 for an unknown name.{' '}
        <code>fastify.ataPlan(name)</code> gives it to a handler that embeds it.
      </p>
      <DocsCode lang="js">{`const fastifyAtaPlans = require('fastify-ata/plans')

await app.register(fastifyAtaPlans, { plans: { signup: signupSchema } })
// GET /plans/signup  ->  the plan, application/json, with an ETag and max-age=300

// on the page
import { fromPlan } from 'ata-validator/plan'
const signup = await fromPlan(await (await fetch('/plans/signup')).json())`}</DocsCode>
      <p>
        The page reads it with <code>fromPlan</code>, 6.2 KB gzipped, with the same verdicts,
        errors and filled defaults as <code>new Validator(schema)</code> on the same ata version.
        A schema a plan cannot carry fails registration by name; on 1.63.1 that includes{' '}
        <code>anyOf</code>, <code>oneOf</code>, <code>patternProperties</code>,{' '}
        <code>propertyNames</code>, <code>contains</code>, <code>dependentSchemas</code> and{' '}
        <code>propertyDependencies</code>, which the next ata release carries.
      </p>
    </>
  )
}
