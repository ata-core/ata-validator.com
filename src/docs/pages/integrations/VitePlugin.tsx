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
        Code written against the runtime API can be compiled without being changed. This is on
        by default: a <code>new Validator(schema)</code> whose schema is known at build time is
        replaced with the compiled module, and the runtime compiler leaves the bundle.
        <code>compileAway: false</code> turns it off. <code>validate()</code>, <code>isValidObject()</code>,{' '}
        <code>validateJSON()</code> and <code>isValidJSON()</code> give the same answers,
        defaults and errors included.
      </p>
      <DocsCode lang="js">{`import ata from 'ata-vite'

export default { plugins: [ata()] }`}</DocsCode>
      <p>
        A form with two validators, one reading errors and one asking only for a verdict,
        bundles to 10.7 KB gzipped, or 3.1 KB with <code>richErrors: false</code> on the one that
        reads errors, against 53.2 KB for the runtime's first load (esbuild, ata-validator 1.61.1,
        @ata-project/unplugin 0.11.1). A validator only ever called, never handed to other code,
        takes a wrapper without Standard Schema or the extension hook; one that only answers a
        verdict carries no error machinery at all.{' '}
        <code>withKeywords(new Validator(schema))</code> from <code>@ata-project/keywords</code> is
        compiled too. Across the 977 schemas of SchemaStore, 395 of those with sample documents
        compile away and answer every sample exactly as the runtime does; a schema with custom
        error messages, a call with options other than <code>useDefaults</code>, or a schema built
        at run time stays on the runtime. Needs ata-validator 1.40.0 and ata-vite 0.7.0. The same
        plugin is <code>@ata-project/unplugin</code> for Webpack, Rollup, Rolldown, esbuild and
        Rspack.
      </p>
    </>
  )
}
