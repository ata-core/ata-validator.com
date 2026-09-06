import { DocsCode } from '../../components/DocsCode'

export default function Integrations() {
  return (
    <>
      <p className="dx-eyebrow">Ecosystem</p>
      <h1>Integrations</h1>
      <p className="dx-lede">
        ata plugs in where a validator is already expected: a schema DSL like zod, an HTTP
        framework, a form library, a build step, or anything that reads Standard Schema.
      </p>

      <h2>zod</h2>
      <p>
        <code>@ata-project/zod</code> runs a zod 4 schema on the ata engine. The schema stays
        zod; <code>compile()</code> converts it through <code>z.toJSONSchema</code> and
        classifies it first, so the answers always match zod's own. Where the conversion is
        exact, ata answers alone; refinements and transforms make ata's rejection final and
        hand acceptances back to zod; coercion hands the whole schema to zod rather than risk
        a wrong answer. The package is differential-tested against zod on 13,030 generated
        values.
      </p>
      <DocsCode lang="js">{`import { z } from 'zod'
import { compile } from '@ata-project/zod'

const user = z.object({
  id: z.number().int().min(1),
  email: z.string().email(),
})

const check = compile(user)
check.isValid(data)    // ata answers
check.safeParse(data)  // zod-shaped result, zod-produced value`}</DocsCode>
      <p>
        Measured on a nine-field object schema, zod 4.5.4 on ata-validator 1.13.1, interleaved
        medians: accepting a document takes 21 ns and rejecting one 5 ns, against 526 and
        1,419 ns through <code>safeParse</code> and 45 and 1,429 ns through{' '}
        <code>z.compile</code>. A rejected <code>safeParse</code> builds its{' '}
        <code>ZodError</code> on first read and costs 6.7 ns until then. With code generation
        blocked, the way a strict CSP blocks it, compiled paths lose their advantage; the
        bridge falls back to ata's interpreted engine and keeps answering at 641 ns for
        accepts and 112 ns for rejects. Accepted values are always produced by zod itself,
        so parsing valid input runs at zod speed by design.
      </p>
      <DocsCode lang="shell">{`npm install @ata-project/zod`}</DocsCode>

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
