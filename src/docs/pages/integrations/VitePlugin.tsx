import { DocsCode } from '../../../components/DocsCode'

export default function IntegrationVite() {
  return (
    <>
      <p className="dx-eyebrow">Integrations</p>
      <h1>Vite</h1>
      <p className="dx-lede">
        <code>ata-vite</code> compiles schemas during the build and emits standalone validation
        modules, so the shipped bundle contains validation functions and no schema compiler.
      </p>
      <DocsCode lang="js">{`import ata from 'ata-vite'

export default { plugins: [ata()] }`}</DocsCode>
      <p>
        It handles JavaScript and TypeScript sources and respects path aliases. Outside Vite,
        the same output comes from <code>npx ata compile schema.json</code> or the{' '}
        <code>ata-validator/build</code> API, which is what the plugin drives underneath.
      </p>

      <h2>Keep new Validator, drop the compiler</h2>
      <p>
        Code written against the runtime API can be compiled without being changed. With{' '}
        <code>compileAway</code>, a <code>new Validator(schema)</code> whose schema is known at
        build time is replaced with the compiled module, and the runtime compiler leaves the
        bundle. <code>validate()</code>, <code>isValidObject()</code>,{' '}
        <code>validateJSON()</code> and <code>isValidJSON()</code> give the same answers,
        defaults and errors included.
      </p>
      <DocsCode lang="js">{`import ata from 'ata-vite'

export default { plugins: [ata({ compileAway: true })] }`}</DocsCode>
      <p>
        For a three-schema entry, one of them with defaults, a minified library build goes from
        115.7 KB to 15.5 KB gzipped. In Node, loading a compiled module and answering its first
        two checks takes 1.12 ms against 6.63 ms on the runtime. Across the 977 schemas of
        SchemaStore, 725 can be compiled away; a schema with custom error messages, a call with
        options or a schema built at run time stays on the runtime. Needs ata-validator 1.36.0
        and ata-vite 0.6.0. The same option is in{' '}
        <code>@ata-project/unplugin</code> for Webpack, Rollup, Rolldown, esbuild and Rspack.
      </p>
    </>
  )
}
