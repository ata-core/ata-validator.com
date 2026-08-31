import { Link } from 'react-router-dom'
import { DocsCode } from '../../components/DocsCode'

export default function Performance() {
  return (
    <>
      <p className="dx-eyebrow">Ecosystem</p>
      <h1>Performance</h1>
      <p className="dx-lede">
        What the library spends time on, and how the figures on{' '}
        <Link to="/docs/benchmarks">Benchmarks</Link> are produced. Every number published here
        was measured, not estimated.
      </p>

      <h2>How measurements are taken</h2>
      <ul>
        <li>Interleaved in a single process, so every side meets the same JIT state.</li>
        <li>Medians of repeated rounds, never a single timing.</li>
        <li>Heap figures are deltas across two forced collections, over thousands of instances.</li>
        <li>
          A figure that moves is remeasured everywhere it appears, rather than updated in one
          place.
        </li>
      </ul>

      <h2>Where the time goes</h2>
      <p>
        Compilation happens once, on the first validating call. Everything after that runs the
        compiled form, so the cost of a request is the cost of one function call over your data.
        Constructing a validator ahead of time and reusing it is the whole optimization; a
        one-shot <code>validate(schema, data)</code> in a loop pays the compile every time.
      </p>
      <DocsCode lang="js">{`const v = new Validator(schema)   // cheap, compiles nothing yet
v.validate(first)                 // compiles here, once
v.validate(second)                // and never again`}</DocsCode>

      <h2>Why a rejection is cheap</h2>
      <p>
        The error list is built when it is read. A service that answers a bad request with a
        status code, or a caller that only counts failures, never allocates an error object.
        Reading <code>errors</code> is where the work happens, and rendering is a further step
        that is opt in.
      </p>
      <DocsCode lang="js">{`const r = v.validate(bad)
if (!r.valid) return reply.code(400).send()   // nothing was built

for (const e of r.errors) { }                 // built on this line`}</DocsCode>

      <h2>Why an unused validator is small</h2>
      <p>
        The public methods are materialized the first time they are read rather than bound in
        the constructor, and the position cache used by the text path is allocated only when
        that path runs. An application that constructs hundreds of validators at startup and
        exercises a few of them pays for the few.
      </p>

      <h2>Engines and speed</h2>
      <p>
        Most schemas compile to generated JavaScript. Shapes the emitter declines run on a
        closure tree or on the interpreter, which are slower but return the same verdicts and
        the same errors. <code>engine()</code> reports which one answered, so a schema that
        matters can be checked rather than assumed. See{' '}
        <Link to="/docs/how-it-works">How it works</Link>.
      </p>

      <h2>What is not claimed</h2>
      <p>
        Throughput depends on the schema, the data and the runtime, and the published figures
        come from one machine. Where a path is slower, it is written down rather than left out:
        validation with type coercion enabled, for example, costs noticeably more than the same
        schema without it, because the input is walked and rewritten before validation begins.
      </p>
    </>
  )
}
