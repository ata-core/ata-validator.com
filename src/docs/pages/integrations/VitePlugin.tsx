import { DocsCode } from '../../../components/DocsCode'

export default function IntegrationVite() {
  return (
    <>
      <p className="dx-eyebrow">Integrations</p>
      <h1>Vite</h1>
      <p className="dx-lede">
        <code>ata-vite</code> is the Vite entry of <code>@ata-project/unplugin</code>. It compiles
        schemas during the build and emits standalone validation modules, so the shipped bundle
        contains validation functions and no schema compiler.
      </p>
      <DocsCode lang="js">{`import ata from 'ata-vite'   // the Vite entry of @ata-project/unplugin

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

      <h2>Schemas written in zod, valibot or TypeBox</h2>
      <p>
        Since @ata-project/unplugin 0.13.0, which ata-vite 0.8.2 carries, the <code>zod</code>{' '}
        option names modules that export zod 4 schemas and compiles them at build time.
      </p>
      <DocsCode lang="js">{`import ata from 'ata-vite'

export default { plugins: [ata({ zod: 'src/events/*.ts' })] }`}</DocsCode>
      <p>
        The build loads each module, converts every exported schema with zod's own{' '}
        <code>z.toJSONSchema</code>, and writes <code>&lt;module&gt;.validators.mjs</code> and{' '}
        <code>.d.mts</code> beside it, one <code>{'{ validate, isValidObject }'}</code> per export,
        typed as <code>z.input</code> of the schema. The page keeps writing schemas in zod and
        carries neither zod nor a validator runtime. A <code>.refine(fn)</code> or{' '}
        <code>.transform(fn)</code> that reads only its own parameter is carried and runs on the
        page in zod's order; one that closes over an outside name, a <code>superRefine</code>, a{' '}
        <code>preprocess</code> or a refine inside a union stops the build by export and path, and{' '}
        <code>dropRefinements: true</code> takes them out knowingly. The <code>from</code> option
        takes zod, valibot or TypeBox modules the same way, with each library's own types.
      </p>
      <DocsCode lang="js">{`export default { plugins: [ata({ from: 'src/schemas/*.ts' })] }`}</DocsCode>
      <p>
        Measured with esbuild, minified and gzipped, on ata-validator 1.63.1: three event schemas
        put 3.9 KB on the page with the compiled validators and 93.0 KB with zod 4.6.7; one schema
        alone is 1.1 KB, and three carried refines on a signup schema add 0.5 KB. A TypeBox 0.34.52
        schema is 1.1 KB compiled against 25.5 KB with <code>Value.Check</code> on the page; a
        valibot 1.5.0 schema is 1.1 KB against 1.7 KB. Converting a module costs the build 4 ms
        after a one-time 132 ms to load the library. Not covered: zod 3, arktype, effect, and the
        stripping of unknown keys, which the page leaves in place where <code>z.object</code>{' '}
        would drop them.
      </p>
    </>
  )
}
