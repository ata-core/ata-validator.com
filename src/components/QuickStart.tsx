import { CodeWindow } from './CodeWindow'

export function QuickStart() {
  return (
    <section id="quickstart" className="quickstart">
      <div className="qs-header">
        <div className="section-kicker">Get started in seconds</div>
        <h2 className="section-title-xl gradient-text">Quick Start</h2>
      </div>
      <div className="qs-grid">
        <div className="qs-card">
          <h4>Node.js</h4>
          <CodeWindow title="terminal">{`$ npm install ata-validator`}</CodeWindow>
          <CodeWindow title="app.js">{`const { Validator } = require('ata-validator');

const v = new Validator({
  type: "object",
  properties: {
    name: { type: "string" },
    age:  { type: "integer", minimum: 0 }
  },
  required: ["name"]
});

const result = v.validate({ name: "Mert", age: 26 });
console.log(result.valid); // true`}</CodeWindow>
        </div>
        <div className="qs-card">
          <h4>Build-time compile (TypeScript types included)</h4>
          <CodeWindow title="terminal">{`$ npx ata compile schemas/user.json \\
    -o src/user.validator.mjs --name User`}</CodeWindow>
          <CodeWindow title="handler.ts">{`import { isValid, validate, type User }
  from './user.validator.mjs'

if (isValid(incoming)) {
  incoming.id    // number (narrowed)
  incoming.role  // 'admin' | 'user' | 'guest' | undefined
}

// Output bundle: ~1 KB gzipped (standard)
//                ~0.5 KB gzipped (--abort-early)
// Zero ata-validator dependency at runtime.`}</CodeWindow>
        </div>
        <div className="qs-card">
          <h4>C / C++</h4>
          <CodeWindow title="CMakeLists.txt">{`FetchContent_Declare(ata
  GIT_REPOSITORY https://github.com/
    ata-core/ata-validator.git
)
FetchContent_MakeAvailable(ata)
target_link_libraries(myapp ata::ata)`}</CodeWindow>
          <CodeWindow title="main.cpp">{`#include "ata.h"

auto schema = ata::compile(R"({
  "type": "object",
  "properties": {
    "name": {"type": "string"}
  }
})");

auto r = ata::validate(schema, json);
// r.valid == true`}</CodeWindow>
        </div>
      </div>
    </section>
  )
}
