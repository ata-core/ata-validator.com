import { Link } from 'react-router-dom'
import { DocsCode } from '../../components/DocsCode'

export default function Performance() {
  return (
    <>
      <p className="dx-eyebrow">Ecosystem</p>
      <h1>Performance</h1>
      <p className="dx-lede">
        Every figure on this page was measured, not estimated. Each one says what was run and
        on what, because a number without a method is not useful.
      </p>

      <h2>How these are measured</h2>
      <ul>
        <li>Interleaved runs in a single process, so both sides meet the same JIT state.</li>
        <li>Medians of repeated rounds, never a single timing.</li>
        <li>Heap figures are deltas across two forced collections, over thousands of instances.</li>
        <li>
          Numbers below were taken on one development machine (Apple silicon, Node 25). They
          show relative cost, not a guarantee for your hardware.
        </li>
      </ul>

      <h2>Validation</h2>
      <p>
        On the shapes used by the public runtime type benchmark, an object of seven fields with
        one nested object:
      </p>
      <table className="dx-table">
        <thead>
          <tr><th>Case</th><th>Throughput</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>Object accepted, unknown keys allowed</td>
            <td className="dx-num">127.8M ops/s</td>
          </tr>
          <tr>
            <td>Object accepted, unknown keys rejected</td>
            <td className="dx-num">69.9M ops/s</td>
          </tr>
        </tbody>
      </table>
      <p>
        The case file that produces these is open in that benchmark's repository, so the
        measurement can be repeated rather than trusted.
      </p>

      <h2>Rejection</h2>
      <p>
        The error list is built when it is read. A rejection that is only counted or turned into
        a status code costs a few nanoseconds, because nothing is allocated for it.
      </p>
      <DocsCode lang="js">{`const r = v.validate(bad)
if (!r.valid) return 400        // no error objects were ever built

for (const e of r.errors) { }   // this is where they are built`}</DocsCode>

      <h2>Memory</h2>
      <p>
        Constructing a validator allocates almost nothing. Methods are materialized on first
        use, and compilation waits for the first validating call. Measured per instance on a
        ten-key object schema, over two thousand instances:
      </p>
      <table className="dx-table">
        <thead>
          <tr><th>State</th><th>Retained heap</th></tr>
        </thead>
        <tbody>
          <tr><td>Constructed, never used, schema shared</td><td className="dx-num">0.43 KB</td></tr>
          <tr><td>Constructed, never used, own schema</td><td className="dx-num">1.12 KB</td></tr>
          <tr><td>Compiled and used</td><td className="dx-num">3.30 KB</td></tr>
        </tbody>
      </table>
      <p>
        Construction itself takes about 855 ns for that schema. Compilation is paid once, on the
        first call.
      </p>

      <h2>Formats</h2>
      <p>
        The <code>date</code> and <code>ipv4</code> checks read the string once, with no regular
        expression and no allocation: 45.7 ns to 14.2 ns and 54.5 ns to 27.1 ns respectively on
        a valid value. Both are fuzzed against their previous forms, with no mismatches.
      </p>

      <h2>Engine coverage</h2>
      <p>
        Work in 1.10.0 moved schema shapes that used to fall back to the interpreter onto the
        compiler: boolean subschemas, recursive definitions, and{' '}
        <code>additionalProperties</code> alongside composition. Every suite group that moved
        got faster, 31 of 31 on Draft 2020-12 and 28 of 28 on draft 7, with the summed per-group
        time down 70 percent. Suite-wide, the figure did not move outside measurement noise,
        which is why the change is described as coverage rather than as a speedup.
      </p>

      <h2>What is not claimed</h2>
      <p>
        Throughput depends on the schema, the data and the runtime. The figures here are the
        ones we run; where a path is slower, such as validation with type coercion enabled, it
        is written down in the repository rather than left out. See{' '}
        <Link to="/docs/compliance">Compliance</Link> for correctness results, which are the
        numbers that matter more.
      </p>
    </>
  )
}
