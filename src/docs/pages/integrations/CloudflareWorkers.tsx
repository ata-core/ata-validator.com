import { DocsCode } from '../../../components/DocsCode'

export default function IntegrationCloudflareWorkers() {
  return (
    <>
      <p className="dx-eyebrow">Integrations</p>
      <h1>Cloudflare Workers</h1>
      <p className="dx-lede">
        The Workers runtime disallows runtime code generation: <code>eval</code> and{' '}
        <code>new Function</code> throw. Most fast JSON Schema validators compile schemas
        through exactly that mechanism, so they cannot start there at all. ata has two paths
        that never generate code, and one of them is the fastest thing we have measured on
        the platform.
      </p>

      <h2>The build-time path</h2>
      <p>
        When the schema is known at build time, compile it on your machine and ship the
        result. The emitted module imports nothing, contains no <code>eval</code>, and
        carries full per-field error reporting.
      </p>
      <DocsCode lang="shell">{`npx ata compile schema/event.json -o src/validator.mjs`}</DocsCode>
      <DocsCode lang="js">{`// src/worker.mjs
import { validate } from './validator.mjs'

export default {
  async fetch(request) {
    const event = await request.json()
    const result = validate(event)
    if (!result.valid) {
      return Response.json({ details: result.errors }, { status: 422 })
    }
    return Response.json({ accepted: true }, { status: 202 })
  },
}`}</DocsCode>
      <p>
        The module for a realistic event schema is about 19 KB verdict-only, about 32 KB
        with full error detail. Each module exports <code>schemaHash</code>, so a build can
        detect a stale artifact by comparing it with{' '}
        <code>schemaHash(currentSchema)</code> from <code>ata-validator/build</code>.
      </p>

      <h2>The runtime path</h2>
      <p>
        A schema that only exists at request time still works:{' '}
        <code>new Validator(schema)</code> runs on the interpreted engine, which never
        generates code and passes the official test suite on all three supported dialects
        under the restriction, with the same counts as anywhere else.
      </p>

      <h2>Measured</h2>
      <p>
        The restriction reproduced with Node&apos;s{' '}
        <code>--disallow-code-generation-from-strings</code>, the same constraint the
        Workers runtime enforces. One validator per process, interleaved, median of 7 runs,
        Apple M4, Node 24, a realistic API event schema, ata 1.25.0.
      </p>
      <table className="dx-table">
          <thead>
            <tr>
              <th>validator</th>
              <th>valid ops/s</th>
              <th>invalid ops/s</th>
              <th>first-use cost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ata, compiled module</td>
              <td>27,024,938</td>
              <td>32,034,379</td>
              <td>0.87 ms</td>
            </tr>
            <tr>
              <td>ata, runtime Validator</td>
              <td>3,379,209</td>
              <td>3,856,590</td>
              <td>12.96 ms</td>
            </tr>
            <tr>
              <td>@cfworker/json-schema</td>
              <td>187,636</td>
              <td>202,434</td>
              <td>3.34 ms</td>
            </tr>
            <tr>
              <td>ajv</td>
              <td colSpan={3}>throws at compile under the restriction</td>
            </tr>
            <tr>
              <td>@exodus/schemasafe</td>
              <td colSpan={3}>throws at compile under the restriction</td>
            </tr>
          </tbody>
      </table>
      <p>
        ajv and schemasafe are excellent validators; they throw here because their
        compilation model requires <code>new Function</code>, which this environment
        forbids. That is the point of the comparison, not a criticism of either.
      </p>
      <p>
        A runnable Worker with this schema, and the benchmark harness that reproduces the
        table, are in the{' '}
        <a href="https://github.com/mertcanaltin/ata-workers-demo">ata-workers-demo</a>{' '}
        repository.
      </p>
    </>
  )
}
