import { Link } from 'react-router-dom'

export default function Faq() {
  return (
    <>
      <p className="dx-eyebrow">Ecosystem</p>
      <h1>FAQ</h1>
      <p className="dx-lede">Short answers to the questions that come up most.</p>

      <h2>Does it work without the native addon?</h2>
      <p>
        Yes. The default install is pure JavaScript and the whole official test suite passes on
        it. The native engine accelerates the buffer APIs where it is present; those four
        methods are the only ones that require it, and they say so clearly.
      </p>

      <h2>What happens under a Content Security Policy?</h2>
      <p>
        If <code>new Function</code> is unavailable, the compiler is skipped and schemas run on
        the interpreted engine with the same results. Nothing needs configuring, and the test
        suite is run in that mode on every change.
      </p>

      <h2>Which Node.js versions are supported?</h2>
      <p>Node.js 18 and later. Continuous integration runs on 18, 20, 22 and 24.</p>

      <h2>Does it run in the browser?</h2>
      <p>
        Yes. The browser entry point has no filesystem access and no native loading, and
        bundlers resolve it through the package exports map. For applications that would rather
        ship no compiler at all, <code>ata compile</code> emits a standalone module.
      </p>

      <h2>Is the API stable?</h2>
      <p>
        The package is past 1.0 and follows semantic versioning. Error codes are stable across
        releases by policy, and a lock file in the repository fails the build if one changes
        meaning.
      </p>

      <h2>Which JSON Schema drafts are covered?</h2>
      <p>
        Draft 2020-12, draft 7 and the JSON Schema v1 dialect, all at the full suite counts
        listed under <Link to="/docs/compliance">Compliance</Link>. Draft 4 and draft 6 are not
        supported.
      </p>

      <h2>Can I skip RE2?</h2>
      <p>
        Yes, build with <code>ATA_NO_RE2=1</code>. Pattern keywords then use the JavaScript
        regular expression engine, and the bundled linear-time matcher still covers the common
        pattern shapes.
      </p>

      <h2>How do I report a bug?</h2>
      <p>
        Open an issue on{' '}
        <a href="https://github.com/ata-core/ata-validator/issues" target="_blank" rel="noreferrer">
          GitHub
        </a>
        . A schema, an input and the expected verdict is enough; a failing case is usually
        turned into a suite entry.
      </p>
    </>
  )
}
