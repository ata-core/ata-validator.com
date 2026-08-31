import { DocsCode } from '../../components/DocsCode'

export default function Installation() {
  return (
    <>
      <p className="dx-eyebrow">Getting started</p>
      <h1>Installation</h1>
      <p className="dx-lede">
        The package installs as plain JavaScript. Native acceleration is optional, resolved by
        npm, and never required for correctness.
      </p>

      <h2>From npm</h2>
      <DocsCode lang="shell">{`npm install ata-validator`}</DocsCode>
      <p>
        No install script runs. The native engine ships as per-platform optional packages for
        Linux x64 and arm64 (gnu and musl), macOS arm64 and x64, and Windows x64, the same
        pattern several build tools use for their binaries. npm picks the one that matches the
        machine and skips the rest.
      </p>

      <h2>Without the native engine</h2>
      <p>
        Install with <code>--omit=optional</code>, or set <code>ATA_NO_NATIVE=1</code>, for a
        setup with no binaries at all.
      </p>
      <DocsCode lang="shell">{`npm install --omit=optional ata-validator`}</DocsCode>
      <p>
        Validation results do not change. The whole official test suite passes on the pure-JS
        setup, with the same counts as the native one. Only the buffer and parallel APIs
        (<code>isValid</code>, <code>countValid</code>, <code>batchIsValid</code>,{' '}
        <code>validateAndParse</code>) need the native engine, and they say so with a clear
        error rather than falling back silently.
      </p>

      <h2>Browsers and edge runtimes</h2>
      <p>
        The browser entry point contains no filesystem access and no native loading. Bundlers
        pick it up through the package exports map, so a bundle built for the browser or an
        edge runtime carries the pure-JS engine only.
      </p>
      <DocsCode lang="js">{`import { Validator } from 'ata-validator'   // resolves to the fs-free build`}</DocsCode>

      <h2>Where code generation is blocked</h2>
      <p>
        Under a Content Security Policy that forbids <code>new Function</code>, the compiler
        cannot run. ata detects that once, at compile time, and routes the schema to the
        interpreted engine instead. The results are the same and no configuration is needed.
        The test suite is run in that mode on every change, so the behavior is a tested path
        rather than a promise.
      </p>

      <h2>Building without RE2</h2>
      <p>
        For environments where the RE2 dependency is unwanted, build with{' '}
        <code>ATA_NO_RE2</code>. Pattern keywords then use the JavaScript regular expression
        engine. The bundled linear-time matcher still covers the common pattern shapes.
      </p>
      <DocsCode lang="shell">{`ATA_NO_RE2=1 npm install ata-validator`}</DocsCode>

      <h2>Supported runtimes</h2>
      <table className="dx-table">
        <tbody>
          <tr>
            <td><strong>Node.js</strong></td>
            <td>18 and later</td>
          </tr>
          <tr>
            <td><strong>Browsers</strong></td>
            <td>Any runtime with ES2020, through the fs-free entry point</td>
          </tr>
          <tr>
            <td><strong>Bun, Deno</strong></td>
            <td>Supported on the pure-JS path</td>
          </tr>
          <tr>
            <td><strong>Native packages</strong></td>
            <td>Linux x64 and arm64 (gnu, musl), macOS arm64 and x64, Windows x64</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
