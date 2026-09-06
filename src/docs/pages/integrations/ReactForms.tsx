export default function IntegrationReactForms() {
  return (
    <>
      <p className="dx-eyebrow">Integrations</p>
      <h1>React forms</h1>
      <p className="dx-lede">
        react-jsonschema-form ships an ata validator package in its main repository, so a form
        described by a JSON Schema can validate through ata without an adapter.
      </p>
      <p>
        It comes in two forms: a runtime validator, and a precompiled one for applications
        that compile their schemas at build time and want no compiler in the bundle. The
        precompiled path pairs with the Vite plugin or the <code>ata build</code> command,
        which emit standalone validation modules ahead of time.
      </p>
    </>
  )
}
