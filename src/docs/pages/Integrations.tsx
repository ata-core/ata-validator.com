import { Link } from 'react-router-dom'

const TOPICS = [
  {
    to: '/docs/integrations/zod',
    title: 'zod',
    what: 'Run a zod 4 schema on the ata engine: same answers, verdicts in nanoseconds, speed that survives a strict CSP.',
  },
  {
    to: '/docs/integrations/fastify',
    title: 'Fastify',
    what: "Listed in Fastify's own docs as an alternative validator; one compiler hook, or the fastify-ata plugin with the framework's defaults.",
  },
  {
    to: '/docs/integrations/react-forms',
    title: 'React forms',
    what: 'react-jsonschema-form ships an ata validator in its main repository, runtime and precompiled.',
  },
  {
    to: '/docs/integrations/vite',
    title: 'Vite',
    what: 'ata-vite compiles schemas at build time into standalone modules, so no compiler ships to the browser.',
  },
  {
    to: '/docs/integrations/standards',
    title: 'Standards and runtimes',
    what: 'Standard Schema V1, the Node.js story, and Bowtie, where the engine is verified in public.',
  },
]

export default function Integrations() {
  return (
    <>
      <p className="dx-eyebrow">Integrations</p>
      <h1>Integrations</h1>
      <p className="dx-lede">
        ata plugs in where a validator is already expected: a schema DSL like zod, an HTTP
        framework, a form library, a build step, or anything that reads Standard Schema. Each
        topic below has its own page with setup and the measured cost.
      </p>

      {TOPICS.map((t) => (
        <section key={t.to}>
          <h2>
            <Link to={t.to}>{t.title}</Link>
          </h2>
          <p>{t.what}</p>
        </section>
      ))}
    </>
  )
}
