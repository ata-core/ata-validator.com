import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Docs.css'

export default function Docs() {
  const [tocOpen, setTocOpen] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1025px)')
    setTocOpen(mq.matches)
    const handler = (e: MediaQueryListEvent) => setTocOpen(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <>
      <nav className="docs-nav">
        <Link to="/" className="docs-back">← Back to home</Link>
        <span className="docs-title">ata-validator docs</span>
      </nav>

      <div className="docs-layout">
        <aside className="docs-sidebar">
          <details className="docs-toc" open={tocOpen}>
            <summary>Contents</summary>
            <ul>
              <li><a href="#quick-start">Quick start</a></li>
              <li><a href="#what">What is ata</a></li>
              <li><a href="#how">How it works</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#install">Installation</a></li>
              <li><a href="#api">API reference</a></li>
              <li><a href="#integrations">Integrations</a></li>
              <li><a href="#compliance">Compliance</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </details>
        </aside>

        <main className="docs-content">
          <section id="quick-start" className="quick-start">
            <h1>Quick start</h1>
            <p>Install and validate your first schema.</p>

            <h3>Install</h3>
            <pre className="docs-code">{`npm install ata-validator`}</pre>

            <h3>Validate</h3>
            <pre className="docs-code">{`import { Validator } from 'ata-validator'

const v = new Validator({
  type: 'object',
  required: ['id'],
  properties: { id: { type: 'integer' } }
})

const result = v.validate({ id: 42 })
// { valid: true, errors: [] }`}</pre>

            <p className="quick-note">
              Works without a native addon. Install takes care of prebuilt binaries when available, falls back to pure JS otherwise.
            </p>
          </section>

          <section id="what">
            <h2>What is ata</h2>
            <p>
              ata-validator is a JSON Schema validator for Draft 2020-12 and Draft 7. It
              compiles schemas into V8-optimized JavaScript, uses simdjson for JSON parsing
              and RE2 for pattern keywords, and falls back to a pure-JS engine when the
              native addon is unavailable.
            </p>
            <p>
              The goal is to be a drop-in, predictable validator for HTTP pipelines (Fastify),
              configuration files (Node.js core, <code>node.config.json</code>), and any
              Standard Schema V1 consumer. Correctness first, speed as a consequence.
            </p>
          </section>

          <section id="how">
            <h2>How it works</h2>
            <p>Two phases: compile once, validate many times.</p>
            <pre className="docs-code">{`Schema  ──compile──▶  Validator  ──validate(input)──▶  { valid, errors }`}</pre>
            <p>Where the speed comes from:</p>
            <ul>
              <li><strong>V8 codegen.</strong> Compiled validators are plain functions that V8 JITs like any other hot code.</li>
              <li><strong>simdjson.</strong> JSON parsing is offloaded to SIMD-accelerated C++ when a buffer is passed.</li>
              <li><strong>RE2.</strong> Pattern keywords run on a linear-time regex engine, immune to catastrophic backtracking.</li>
              <li><strong>Precompiled Validator.</strong> Reusing a single <code>Validator</code> instance across requests avoids compile overhead on the hot path.</li>
            </ul>
          </section>

          <section id="features">
            <h2>Features</h2>
            <p>Supported JSON Schema drafts, keywords, and formats.</p>

            <table className="docs-table">
              <thead>
                <tr><th>Area</th><th>Supported</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Drafts</strong></td>
                  <td>Draft 2020-12, Draft 7</td>
                </tr>
                <tr>
                  <td><strong>Keywords</strong></td>
                  <td>
                    type, properties, items, prefixItems, $ref, $dynamicRef, $anchor,
                    oneOf, anyOf, allOf, not, if/then/else, dependencies,
                    patternProperties, additionalProperties, contains, minContains,
                    maxContains, unevaluatedProperties, unevaluatedItems,
                    minLength, maxLength, minimum, maximum, multipleOf, enum, const
                  </td>
                </tr>
                <tr>
                  <td><strong>Formats</strong></td>
                  <td>date, date-time, time, email, uri, uri-reference, uuid, ipv4, ipv6, regex (RE2), hostname</td>
                </tr>
                <tr>
                  <td><strong>Extras</strong></td>
                  <td>Cross-schema $ref, recursion depth guard for circular refs, Standard Schema V1 compatibility, <code>__proto__</code>-safe const/enum comparison</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section id="install">
            <h2>Installation</h2>

            <h3>From npm</h3>
            <pre className="docs-code">{`npm install ata-validator`}</pre>
            <p>
              The install script downloads a prebuilt binary for your platform when available.
              Linux x64/arm64, macOS x64/arm64, and Windows x64 are covered.
            </p>

            <h3>Without a native addon</h3>
            <p>
              If no prebuilt is available and a native build fails, ata automatically falls
              back to a pure-JS validator. Every feature works; only raw throughput differs.
            </p>

            <h3>Building without RE2</h3>
            <p>
              For environments where the RE2 dependency is undesirable (Node.js core vendoring, for
              example), build with the <code>ATA_NO_RE2</code> flag. The JS regex engine is used for
              pattern keywords instead, at the cost of linear-time guarantees.
            </p>
            <pre className="docs-code">{`ATA_NO_RE2=1 npm install ata-validator`}</pre>
          </section>

          <section id="api">
            <h2>API reference</h2>

            <h3>Validator</h3>
            <p>Compiles a schema once, validates many times. Preferred for HTTP pipelines.</p>
            <pre className="docs-code">{`import { Validator } from 'ata-validator'

const v = new Validator(schema)
const result = v.validate(data)
// result: { valid: boolean, errors: Error[] }`}</pre>

            <h3>validate (one-shot)</h3>
            <p>Compiles and validates in a single call. Convenient, but allocates on every run.</p>
            <pre className="docs-code">{`import { validate } from 'ata-validator'

const result = validate(schema, data)`}</pre>

            <h3>fastValidate</h3>
            <p>
              Uses a precompiled fast path for supported schemas. Returns <code>null</code> on
              validation success, an array of errors on failure, keeping the hot path
              allocation-free.
            </p>
            <pre className="docs-code">{`import { fastValidate } from 'ata-validator'

const errors = fastValidate(schema, data)
if (errors) { /* handle */ }`}</pre>

            <h3>Standard Schema V1</h3>
            <p>
              A <code>Validator</code> instance is compatible with the{' '}
              <a href="https://standardschema.dev/" target="_blank" rel="noreferrer">Standard Schema V1</a>{' '}
              interface, so any library expecting that shape can consume ata schemas directly.
            </p>
          </section>

          <section id="integrations">
            <h2>Integrations</h2>

            <h3>Fastify</h3>
            <p>
              Replace Fastify's default validator with ata via <code>setValidatorCompiler</code>.
              Every route with a body/query/params schema goes through ata.
            </p>
            <pre className="docs-code">{`import Fastify from 'fastify'
import { Validator } from 'ata-validator'

const app = Fastify()

app.setValidatorCompiler(({ schema }) => {
  const v = new Validator(schema)
  return (data) => {
    const r = v.validate(data)
    if (r.valid) return { value: data }
    const error = new Error(r.errors.map(e => e.message).join(', '))
    error.validation = r.errors
    return { error }
  }
})

app.post('/users', {
  schema: {
    body: {
      type: 'object',
      required: ['id', 'name'],
      properties: {
        id: { type: 'integer', minimum: 1 },
        name: { type: 'string', minLength: 1 },
      },
    },
  },
}, async (req) => ({ ok: true, user: req.body }))`}</pre>

            <h3>Node.js core</h3>
            <p>
              An integration to validate <code>node.config.json</code> against its JSON Schema
              is in progress at{' '}
              <a href="https://github.com/nodejs/node/pull/62603" target="_blank" rel="noreferrer">nodejs/node#62603</a>.
              The path being explored: vendored <code>deps/ata/</code>, built with{' '}
              <code>ATA_NO_RE2</code>, no new external dependencies (simdjson is already in core).
            </p>

            <h3>Standard Schema V1</h3>
            <p>
              ata-validator ships a Standard Schema V1 shape. Any tooling that accepts the
              Standard Schema interface (form libraries, ORMs, RPC layers) can consume an ata
              schema without adapters.
            </p>
          </section>

          <section id="compliance">
            <h2>Compliance</h2>
            <p>Test suite results for the current release.</p>

            <table className="docs-table">
              <thead>
                <tr><th>Suite</th><th>Result</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <a href="https://github.com/json-schema-org/JSON-Schema-Test-Suite" target="_blank" rel="noreferrer">
                      JSON Schema Test Suite (Draft 2020-12)
                    </a>
                  </td>
                  <td>98.5%</td>
                </tr>
                <tr>
                  <td>
                    <a href="https://github.com/ExodusMovement/schemasafe" target="_blank" rel="noreferrer">
                      @exodus/schemasafe test suite
                    </a>
                  </td>
                  <td>95.3%</td>
                </tr>
                <tr>
                  <td>
                    <a href="https://github.com/nst/JSONTestSuite" target="_blank" rel="noreferrer">
                      JSONTestSuite (nst)
                    </a>
                  </td>
                  <td>283 / 283</td>
                </tr>
                <tr>
                  <td>$dynamicRef / $anchor</td>
                  <td>42 / 42</td>
                </tr>
                <tr>
                  <td>OSS-Fuzz</td>
                  <td>Submitted</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section id="faq">
            <h2>FAQ</h2>

            <h3>Does it work without a native addon?</h3>
            <p>
              Yes. If the native binary cannot load, ata falls back to a pure-JS validator.
              Feature parity is preserved; only raw throughput differs.
            </p>

            <h3>How does it differ from Ajv?</h3>
            <p>
              ata is native-first (simdjson + RE2 + V8 codegen) and built with Fastify and
              Node.js core integration as explicit goals. Ajv is the long-standing default
              in the ecosystem and remains the correct choice in many cases. The two
              coexist; ata targets the pipelines where native parsing and linear-time regex
              matter.
            </p>

            <h3>Which Node.js versions are supported?</h3>
            <p>Node.js 18 and later. Tested on 18, 20, 22, and 24.</p>

            <h3>Is it cross-platform?</h3>
            <p>Linux x64/arm64, macOS x64/arm64, Windows x64. Pure-JS fallback runs anywhere.</p>

            <h3>Can I skip RE2?</h3>
            <p>
              Yes, build with <code>ATA_NO_RE2=1</code>. Useful when the RE2 dependency is
              undesirable (Node.js core vendoring, for example). The JS regex engine is used
              for pattern keywords, at the cost of linear-time guarantees.
            </p>

            <h3>Is it production-ready?</h3>
            <p>
              ata is pre-1.0. The core validation paths are backed by the JSON Schema Test
              Suite, schemasafe tests, and OSS-Fuzz, and are in use in the projects described
              under Integrations. API surface may still change before 1.0.
            </p>
          </section>
        </main>
      </div>
    </>
  )
}
