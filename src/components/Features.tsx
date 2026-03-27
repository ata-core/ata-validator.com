import { CodeWindow } from './CodeWindow'

const features = [
  {
    label: 'PARSING',
    title: 'simdjson: Gigabytes per second parsing',
    desc: "Built on Daniel Lemire's simdjson library, ata parses JSON at the speed of your CPU's SIMD instructions. No other validator starts this fast.",
    bullets: [
      { text: '4+ GB/s', rest: ' JSON parsing throughput' },
      { text: 'ARM NEON', rest: ' and x86 AVX2/SSE support' },
      { text: '169x faster', rest: ' schema compilation' },
    ],
    code: `const { Validator } = require('ata-validator');

// Schema compiled with simdjson — 169x faster
const v = new Validator({
  type: "object",
  properties: {
    name: { type: "string", minLength: 1 },
    age:  { type: "integer", minimum: 0 }
  },
  required: ["name", "age"]
});

const result = v.validate({ name: "Mert", age: 26 });
// { valid: true, errors: [] }`,
    codeTitle: 'example.js',
    lang: 'js' as const,
  },
  {
    label: 'REGEX ENGINE',
    title: 'RE2: Linear-time regex, ReDoS-safe',
    desc: 'Replaced std::regex with Google\'s RE2 engine. Linear-time guarantees mean no catastrophic backtracking, ever.',
    bullets: [
      { text: '10-100x faster', rest: ' than std::regex' },
      { text: 'Immune', rest: ' to ReDoS attacks' },
      { text: 'Hand-written parsers', rest: ' for format validators — zero regex' },
    ],
    code: `// Pattern validation powered by RE2
const v = new Validator({
  type: "string",
  pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$"
});

v.validate("user@example.com");
// { valid: true }

// Format validators — no regex at all
const fmt = new Validator({
  type: "string",
  format: "email"  // hand-written parser
});
// Also: date, uri, ipv4, uuid, hostname...`,
    codeTitle: 'pattern.js',
    lang: 'js' as const,
    reverse: true,
  },
  {
    label: 'CODEGEN ENGINE',
    title: 'Bytecode compiler for fast validation',
    desc: 'Schemas are compiled into a flat bytecode plan at compile time. The executor runs through instructions sequentially — no tree walking, no recursion on the hot path.',
    bullets: [
      { text: 'Schema \u2192 bytecode', rest: ' at compile time' },
      { text: 'Zero-allocation', rest: ' validation loop' },
      { text: 'Tree walker fallback', rest: ' only for error details' },
    ],
    code: `// Internal bytecode generated from schema
EXPECT_OBJECT
CHECK_REQUIRED      "name"
CHECK_REQUIRED      "email"
OBJ_PROPS_START
  CHECK_NO_ADDITIONAL
  OBJ_PROP            "name"  -> sub[0]
  OBJ_PROP            "email" -> sub[1]
OBJ_PROPS_END
END

// sub[0]: EXPECT_STRING, CHECK_MIN_LENGTH 1
// sub[1]: EXPECT_STRING, CHECK_FORMAT email`,
    codeTitle: 'bytecode plan',
    lang: 'bytecode' as const,
  },
  {
    label: 'ON DEMAND API',
    title: 'Validate without materializing the DOM',
    desc: "For eligible schemas, ata uses simdjson's On Demand API to validate JSON without building a full DOM tree. Parse and validate in a single pass.",
    bullets: [
      { text: '2.3x faster', rest: ' on large documents' },
      { text: 'No memory allocation', rest: ' for DOM nodes' },
      { text: 'Automatic fallback', rest: ' to DOM for complex schemas' },
    ],
    code: `// Traditional: parse entire DOM, then walk
JSON string
  -> [full parse + tree build]
  -> DOM tree
  -> validation walk

// ata On Demand: single-pass streaming
JSON string
  -> [streaming tokenize + validate]
  -> result

No DOM tree. No allocation. Just validate.`,
    codeTitle: 'on demand path',
    lang: 'plain' as const,
    reverse: true,
  },
]

export function Features() {
  return (
    <section id="features" className="features">
      {features.map((f) => (
        <div key={f.label} className={`feature-row${f.reverse ? ' reverse' : ''}`}>
          <div className="feature-text">
            <div className="feature-label">{f.label}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
            <ul className="feature-list">
              {f.bullets.map((b, i) => (
                <li key={i}><strong>{b.text}</strong>{b.rest}</li>
              ))}
            </ul>
          </div>
          <div className="feature-code">
            <CodeWindow title={f.codeTitle} lang={f.lang}>{f.code}</CodeWindow>
          </div>
        </div>
      ))}
    </section>
  )
}
