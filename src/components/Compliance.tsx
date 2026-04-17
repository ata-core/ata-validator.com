const keywords = [
  'type', 'properties', 'required', 'additionalProperties',
  'patternProperties', 'items', 'prefixItems', 'contains',
  'allOf', 'anyOf', 'oneOf', 'not', 'if/then/else', '$ref',
  '$defs', 'enum', 'const', 'format', 'minimum', 'maximum',
  'pattern', 'minLength', 'maxLength', 'uniqueItems',
  'dependentRequired', 'dependentSchemas', 'propertyNames',
  'unevaluatedProperties', 'unevaluatedItems',
  '$id', '$anchor', '$dynamicRef', '$dynamicAnchor',
  'definitions', 'dependencies',
]

export function Compliance() {
  return (
    <section className="compliance">
      <div className="compliance-inner">
        <div className="compliance-text">
          <h2>98.5% Spec Compliance</h2>
          <p>
            Tested against the official{' '}
            <a href="https://github.com/json-schema-org/JSON-Schema-Test-Suite" target="_blank">
              JSON Schema Test Suite
            </a>{' '}
            and{' '}
            <a href="https://github.com/ExodusMovement/schemasafe" target="_blank">
              @exodus/schemasafe
            </a>{' '}
            test suite for Draft 2020-12.
          </p>
          <div className="compliance-score">
            <div className="score-ring">
              <svg viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="#1a2332" strokeWidth="8" />
                <circle
                  cx="60" cy="60" r="54" fill="none" stroke="#00d4aa" strokeWidth="8"
                  strokeDasharray="339.3" strokeDashoffset="5.1" strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />
              </svg>
              <span className="score-text">98.5%</span>
            </div>
            <div className="score-details">
              <div><strong>1,172</strong> tests passed</div>
              <div><strong>$dynamicRef</strong> 42/42 (100%)</div>
              <div><strong>Draft 7 + 2020-12</strong></div>
            </div>
          </div>
        </div>
        <div className="compliance-list">
          <h4>Fully supported keywords</h4>
          <div className="keyword-grid">
            {keywords.map((kw) => (
              <span key={kw} className="kw pass">{kw}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
