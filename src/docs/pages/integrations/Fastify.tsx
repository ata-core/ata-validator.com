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
    </>
  )
}
