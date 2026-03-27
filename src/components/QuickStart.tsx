import { CodeWindow } from './CodeWindow'

export function QuickStart() {
  return (
    <section id="quickstart" className="quickstart">
      <h2>Quick Start</h2>
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
