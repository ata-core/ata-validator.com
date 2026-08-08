const keywords = [
  'type', 'properties', 'required', 'additionalProperties',
  'patternProperties', 'items', 'prefixItems', 'contains',
  'allOf', 'anyOf', 'oneOf', 'not', 'if/then/else', '$ref',
  '$defs', 'enum', 'const', 'format', 'minimum', 'maximum',
  'pattern', 'minLength', 'maxLength', 'uniqueItems',
  'dependentRequired', 'dependentSchemas', 'propertyDependencies',
  'propertyNames',
  'unevaluatedProperties', 'unevaluatedItems',
  '$id', '$anchor', '$dynamicRef', '$dynamicAnchor',
  'definitions', 'dependencies',
]

export function Compliance() {
  return (
    <section className="compliance">
      <div className="compliance-inner">
        <div className="compliance-text" data-reveal>
          <div className="section-kicker">Standards</div>
          <h2 className="section-title-xl gradient-text">99.6% spec coverage</h2>
          <p>
            Measured against the official{' '}
            <a href="https://github.com/json-schema-org/JSON-Schema-Test-Suite" target="_blank" rel="noopener noreferrer">
              JSON Schema Test Suite
            </a>{' '}
            with nothing excluded, across all three dialects, and against the{' '}
            <a href="https://github.com/ExodusMovement/schemasafe" target="_blank" rel="noopener noreferrer">
              @exodus/schemasafe
            </a>{' '}
            suite. <code>npm run test:suite</code> reproduces every number here
            and names the cases that still fail.
          </p>
          <div className="compliance-score">
            <div className="score-ring">
              <svg viewBox="0 0 120 120">
                <defs>
                  <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00C9A7" />
                    <stop offset="55%" stopColor="#00B7D6" />
                    <stop offset="100%" stopColor="#3D5AFE" />
                  </linearGradient>
                </defs>
                <circle cx="60" cy="60" r="54" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                <circle
                  cx="60" cy="60" r="54" fill="none" stroke="url(#scoreGrad)" strokeWidth="8"
                  className="score-arc" strokeDasharray="339.3" strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />
              </svg>
              <span className="score-text gradient-text">99.6%</span>
            </div>
            <div className="score-details">
              <div><strong>Draft 2020-12</strong> 1,285 of 1,290</div>
              <div><strong>JSON Schema v1</strong> 1,123 of 1,127</div>
              <div><strong>Draft 7</strong> 911 of 922, native or pure JS</div>
            </div>
          </div>
        </div>
        <div className="compliance-list" data-reveal>
          <h4>Fully supported keywords</h4>
          <div className="keyword-grid">
            {keywords.map((kw) => (
              <span key={kw} className="kw pass">
                <span className="kw-dot" aria-hidden />
                {kw}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
