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
    </>
  )
}
