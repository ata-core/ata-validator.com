import './Integrations.css'

type Integration = {
  name: string
  tag: string
  logo?: string
  initials?: string
  description: string
  href: string
}

const INTEGRATIONS: Integration[] = [
  {
    name: 'react-jsonschema-form',
    tag: 'Official',
    logo: '/integrations/rjsf.png',
    description:
      'The @rjsf/validator-ata package ships in the RJSF monorepo. Swap the import from validator-ajv8 and your forms get compiler-grade validation errors.',
    href: 'https://github.com/rjsf-team/react-jsonschema-form/tree/main/packages/validator-ata',
  },
  {
    name: 'Fastify',
    tag: 'Plugin',
    logo: '/ecosystem/fastify.webp',
    description:
      'fastify-ata is a drop-in for Fastify’s default validator. Existing JSON Schema route definitions keep working, with faster cold start and richer errors.',
    href: 'https://github.com/ata-core/fastify-ata',
  },
  {
    name: 'Standard Schema V1',
    tag: 'Spec',
    initials: 'S1',
    description:
      'ata implements the Standard Schema V1 interface, so it plugs into tRPC, TanStack Form, and any tool that accepts a Standard Schema validator.',
    href: 'https://standardschema.dev',
  },
]

export function Integrations() {
  return (
    <section id="integrations" className="integrations">
      <div className="integrations-header">
        <div className="section-kicker">Integrations</div>
        <h2 className="section-title-xl gradient-text">Works with your stack.</h2>
        <p className="section-sub">
          ata fits the JSON Schema tools teams already run. These are live
          integrations you can install today, not roadmap promises.
        </p>
      </div>

      <div className="integrations-grid">
        {INTEGRATIONS.map((it) => (
          <a
            key={it.name}
            href={it.href}
            target="_blank"
            rel="noopener noreferrer"
            className="integration-card"
          >
            <div className="integration-card-top">
              <div className="integration-logo">
                {it.logo ? (
                  <img src={it.logo} alt={it.name} />
                ) : (
                  <span className="integration-logo-initials">{it.initials}</span>
                )}
              </div>
              <span className="integration-tag">{it.tag}</span>
            </div>
            <div className="integration-name">{it.name}</div>
            <p className="integration-desc">{it.description}</p>
            <span className="integration-link">View integration &rarr;</span>
          </a>
        ))}
      </div>
    </section>
  )
}
