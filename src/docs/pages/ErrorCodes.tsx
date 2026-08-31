import { Link } from 'react-router-dom'
import { DocsCode } from '../../components/DocsCode'

export default function ErrorCodes() {
  return (
    <>
      <p className="dx-eyebrow">Reference</p>
      <h1>Error codes</h1>
      <p className="dx-lede">
        Every error carries a stable <code>ATA</code> code and a link to the page that explains
        it. Codes do not change meaning between releases, so they are safe to match on.
      </p>

      <h2>Using a code</h2>
      <DocsCode lang="js">{`const r = v.validate(input)

if (!r.valid) {
  const typeErrors = r.errors.filter(e => e.code === 'ATA1001')
}`}</DocsCode>

      <h2>Ranges</h2>
      <table className="dx-table">
        <thead>
          <tr><th>Range</th><th>Covers</th></tr>
        </thead>
        <tbody>
          <tr><td className="dx-num">ATA1xxx</td><td>Types: the value is the wrong kind of thing</td></tr>
          <tr><td className="dx-num">ATA2xxx</td><td>Numbers: bounds and multiples</td></tr>
          <tr><td className="dx-num">ATA3xxx</td><td>Strings: length, pattern, format</td></tr>
          <tr><td className="dx-num">ATA4xxx</td><td>Arrays: length, items, uniqueness, contains</td></tr>
          <tr><td className="dx-num">ATA5xxx</td><td>Objects: required, additional and dependent properties</td></tr>
          <tr><td className="dx-num">ATA6xxx</td><td>Values: enum and const</td></tr>
          <tr><td className="dx-num">ATA7xxx</td><td>Composition: anyOf, oneOf, allOf, not, if and then</td></tr>
          <tr><td className="dx-num">ATA9xxx</td><td>Input problems, such as JSON that will not parse</td></tr>
        </tbody>
      </table>

      <h2>The explanation pages</h2>
      <p>
        Each code has a page at <code>/e/&lt;code&gt;</code> with what the rule means, a failing
        example and how to fix it. The <code>docUrl</code> on every error points there, so a log
        line is one click from an explanation.
      </p>
      <p>
        <Link to="/e">Browse all error codes</Link>
      </p>
    </>
  )
}
