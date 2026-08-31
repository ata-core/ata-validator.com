import { Link } from 'react-router-dom'

export default function Compliance() {
  return (
    <>
      <p className="dx-eyebrow">Ecosystem</p>
      <h1>Compliance</h1>
      <p className="dx-lede">
        Test suite results for the current release. Each row is a suite anyone can run, not a
        summary we produced.
      </p>

      <h2>Official JSON Schema Test Suite</h2>
      <table className="dx-table">
        <thead>
          <tr><th>Dialect</th><th>Result</th></tr>
        </thead>
        <tbody>
          <tr><td>Draft 2020-12</td><td className="dx-num">1299 / 1299</td></tr>
          <tr><td>Draft 7</td><td className="dx-num">927 / 927</td></tr>
          <tr><td>JSON Schema v1</td><td className="dx-num">1133 / 1133</td></tr>
        </tbody>
      </table>
      <p>
        The same three figures hold with code generation blocked, so a runtime that forbids{' '}
        <code>new Function</code> gets identical results on the interpreted engine.
      </p>

      <h2>Cross-checks</h2>
      <table className="dx-table">
        <thead>
          <tr><th>Check</th><th>Result</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>Buffer path agreement with <code>validate()</code></td>
            <td className="dx-num">3359 / 3359 suite cases</td>
          </tr>
          <tr>
            <td>Entry point agreement, all generators and the interpreter</td>
            <td>Whole suite, on every change</td>
          </tr>
          <tr>
            <td>
              <a href="https://github.com/ExodusMovement/schemasafe" target="_blank" rel="noreferrer">
                schemasafe test suite
              </a>
            </td>
            <td className="dx-num">95.3%</td>
          </tr>
          <tr>
            <td>Fastify validation suite, as the framework's validator</td>
            <td className="dx-num">181 / 187</td>
          </tr>
          <tr>
            <td>
              <a href="https://github.com/nst/JSONTestSuite" target="_blank" rel="noreferrer">
                JSONTestSuite parsing cases
              </a>
            </td>
            <td className="dx-num">283 / 283</td>
          </tr>
          <tr>
            <td><code>$dynamicRef</code> and <code>$anchor</code></td>
            <td className="dx-num">42 / 42</td>
          </tr>
        </tbody>
      </table>

      <h2>Bowtie</h2>
      <p>
        ata participates in{' '}
        <a href="https://bowtie.report/" target="_blank" rel="noreferrer">Bowtie</a>, which runs
        the official suite against many implementations and publishes the results side by side.
        That report is the independent version of the table above.
      </p>

      <h2>Fuzzing</h2>
      <p>
        Differential fuzzing runs as part of the test suite: generated schemas and documents are
        validated through every engine and compared, and the position mapping used by the
        renderers is fuzzed against its inputs. Fuzzing has found real bugs here, including a
        read past the end of a buffer in the native padding helper, which is why it stays in the
        suite rather than being run once.
      </p>

      <h2>Suite drift</h2>
      <p>
        The official suite is a submodule and it moves. Every figure above is quoted from a run
        against the pin recorded in the repository at release time, and the pin is checked
        before any number is published. See <Link to="/docs/performance">Performance</Link> for
        how the speed figures are measured.
      </p>
    </>
  )
}
