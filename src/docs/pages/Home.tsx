import { Link } from 'react-router-dom'
import { DocsCode } from '../../components/DocsCode'

const SUITE = [
  { dialect: 'Draft 2020-12', score: '1301 / 1301' },
  { dialect: 'Draft 7', score: '929 / 929' },
  { dialect: 'JSON Schema v1', score: '1135 / 1135' },
]

// Projects whose code depends on ata, from GitHub's dependency graph, plus the
// framework that lists the plugin. Each line says what the project does with
// it, checked against the project's own code; nothing here claims an
// endorsement. Socket lists ata as a devDependency: it runs in their repository
// tooling, not in the packages they publish, and the line says so.
const USED_BY: { name: string; href: string; what: string; logo?: string; mono?: string }[] = [
  {
    name: 'react-jsonschema-form',
    href: 'https://github.com/rjsf-team/react-jsonschema-form',
    logo: '/refs/rjsf.png',
    what: 'Ships an ata validator in its main repository, runtime and precompiled.',
  },
  {
    name: 'Socket',
    href: 'https://github.com/SocketDev/socket-cli',
    logo: '/refs/socket.png',
    what: 'Uses ata, compiled ahead of time, in the shared build tooling of its repositories.',
  },
  {
    name: 'JollyPixel',
    href: 'https://github.com/JollyPixel/editor',
    logo: '/refs/jollypixel.jpg',
    what: 'Parses and validates JSON on its back end with ata, compiled ahead of time.',
  },
  {
    name: 'Fastify',
    href: 'https://fastify.dev/ecosystem/',
    logo: '/refs/fastify.png',
    what: 'Lists the fastify-ata plugin in its ecosystem.',
  },
  {
    name: 'better-drizzle',
    href: 'https://github.com/almeidazs/better-drizzle',
    mono: 'bd',
    what: 'Ships an ata plugin for queries and rows.',
  },
  {
    name: 'svelte-jsonschema-form',
    href: 'https://github.com/x0k/svelte-jsonschema-form',
    mono: 'sj',
    what: 'Publishes an ata validator package, runtime and precompiled.',
  },
]

const COST = [
  { what: 'Accept a typical route body', value: '43 ns' },
  { what: 'Reject it, verdict only', value: '29 ns' },
  { what: 'Ten route schemas ready at startup', value: '0.12 ms' },
  { what: 'Compiled validator in a bundle, gzipped', value: '3.8 KB' },
]

export default function Home() {
  return (
    <>
      <header className="dx-hero">
        <p className="dx-hero-mark">ata</p>
        <h1>A JSON Schema validator that runs where code generation is blocked</h1>
        <p className="dx-lede">
          It compiles your schema into a plain function for speed, and falls back to a complete
          interpreted engine where <code>new Function</code> is refused, on an edge runtime or
          under a strict Content-Security-Policy. Both engines give the same answers, at 100% of
          the official suite in either mode, and a failing document still points at the line that
          broke it.
        </p>

        <DocsCode lang="shell">{`npm install ata-validator`}</DocsCode>

        <DocsCode lang="js">{`// npm install ata-validator
import { Validator } from 'ata-validator'

const v = new Validator({
  type: 'object',
  required: ['id', 'email'],
  properties: {
    id: { type: 'integer', minimum: 1 },
    email: { type: 'string', format: 'email' }
  }
})

v.validate({ id: 42, email: 'a@b.co' })   // { valid: true, errors: [] }`}</DocsCode>

        <div className="dx-hero-actions">
          <Link className="dx-btn dx-btn-primary" to="/docs/quick-start">Get started</Link>
          <Link className="dx-btn" to="/playground">Playground</Link>
          <a
            className="dx-btn"
            href="https://github.com/ata-core/ata-validator"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </header>

      <h2>When it fails</h2>
      <p>
        Pass the JSON text rather than a parsed object and every error carries the line and
        column it came from. The renderers turn that into something a person can act on.
      </p>
      <DocsCode lang="plain">{`error[ATA6001]: expected one of ["dev", "prod"], found "prd"
  --> input:4:11  (body.mode)
   |
  4 |   "mode": "prd"
   |           ^^^^^  found "prd"
   |
   = help: did you mean \`prod\`?
   = note: see https://ata-validator.com/e/ATA6001`}</DocsCode>
      <p>
        The list behind that output is ordinary data: stable codes, JSON pointers, the expected
        and received values. Rendering is opt in, so a service that only returns a status code
        never pays for it. <Link to="/docs/errors">Read about errors</Link>.
      </p>

      <h2>What you get</h2>
      <ul>
        <li>
          <strong>Three dialects.</strong> Draft 2020-12, draft 7 and the JSON Schema v1
          dialect, each at the full official suite count.
        </li>
        <li>
          <strong>No required binaries.</strong> The default install is pure JavaScript. A
          native engine is optional and accelerates the buffer APIs where it is present.
        </li>
        <li>
          <strong>Works where code generation is blocked.</strong> Under a policy that forbids{' '}
          <code>new Function</code>, schemas run on an interpreter with the same results, and
          the whole suite is tested in that mode.
        </li>
        <li>
          <strong>Types from the schema.</strong> <code>defineSchema</code> and{' '}
          <code>Infer&lt;S&gt;</code> give the static type without a second declaration.
        </li>
        <li>
          <strong>A build step when you want one.</strong> <code>ata compile</code> emits a
          standalone module that imports nothing at all.
        </li>
      </ul>

      <h2>Measured, not estimated</h2>
      <p>
        Every figure here comes from a run that anyone can repeat. The suite figures come from{' '}
        <code>npm run test:suite</code> and hold with code generation blocked.
      </p>

      <table className="dx-table">
        <thead>
          <tr><th>Dialect</th><th>Official suite</th></tr>
        </thead>
        <tbody>
          {SUITE.map((r) => (
            <tr key={r.dialect}>
              <td>{r.dialect}</td>
              <td className="dx-num">{r.score}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className="dx-table">
        <thead>
          <tr><th>Cost</th><th>Measured</th></tr>
        </thead>
        <tbody>
          {COST.map((r) => (
            <tr key={r.what}>
              <td>{r.what}</td>
              <td className="dx-num">{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="dx-note">
        Medians of interleaved runs on one laptop, on a signup body with a nested object.
        Yours will differ with hardware and schema.{' '}
<Link to="/docs/benchmarks">See the benchmarks</Link>.
      </p>

      <h2>Where it is used</h2>
      <ul className="dx-usedby">
        {USED_BY.map((u) => (
          <li key={u.name}>
            <a href={u.href} target="_blank" rel="noopener noreferrer">
              {u.logo
                ? <img src={u.logo} alt="" width={40} height={40} loading="lazy" />
                : <span className="dx-usedby-mono" aria-hidden="true">{u.mono}</span>}
              <span className="dx-usedby-text">
                <strong>{u.name}</strong>
                <span>{u.what}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p>
        The <code>fastify-ata</code> plugin wires ata into Fastify with the framework's own
        defaults, and <code>ata-vite</code> compiles schemas during a build so the bundle
        carries validation functions and no compiler.{' '}
        <Link to="/docs/integrations">See the integrations</Link>.
      </p>

      <figure className="dx-quote">
        <img src="/refs/jollypixel.jpg" alt="JollyPixel" width={44} height={44} loading="lazy" />
        <div>
          <blockquote>
            On the JollyPixel back end I use ata instead of AJV for parsing and validating JSON,
            with AOT pre-compilation for performance and type inference from the schema.
          </blockquote>
          <figcaption>
            Thomas Gentilhomme, on{' '}
            <a href="https://github.com/fraxken" rel="noreferrer">building JollyPixel</a>
          </figcaption>
        </div>
      </figure>

      <h2>Start here</h2>
      <p>
        <Link to="/docs/quick-start">Quick start</Link> takes about a minute.{' '}
        <Link to="/docs">Introduction</Link> explains the shape of the library, and{' '}
        <Link to="/docs/api">API reference</Link> lists everything it exposes.
      </p>
    </>
  )
}
