import './ErrorShowcase.css'

export function ErrorShowcase() {
  return (
    <div className="showcase">
      <div className="showcase-panel showcase-before">
        <div className="showcase-head">
          <span className="showcase-dot showcase-dot--red" />
          <span className="showcase-dot showcase-dot--yellow" />
          <span className="showcase-dot showcase-dot--green" />
          <span className="showcase-label">every other validator</span>
        </div>
        <pre className="showcase-body">
{`[{"instancePath":"/email",
  "schemaPath":"#/properties/email/format",
  "keyword":"format",
  "params":{"format":"email"},
  "message":"must match format \\"email\\""
}]`}
        </pre>
      </div>

      <div className="showcase-panel showcase-after">
        <div className="showcase-head">
          <span className="showcase-dot showcase-dot--red" />
          <span className="showcase-dot showcase-dot--yellow" />
          <span className="showcase-dot showcase-dot--green" />
          <span className="showcase-label">ata-validator 1.0</span>
        </div>
        <pre className="showcase-body">
<span className="sc-err">error[ATA3001]:</span> <span className="sc-fg">value does not match format "email"</span>{`\n`}
{`  --> `}<span className="sc-path">schemas/user.json:5:7</span>{`\n`}
{`   |\n`}
{` 5 | `}<span className="sc-fg">      "email": {'{'} "type": "string", "format": "email" {'}'}</span>{`\n`}
{`   |       `}<span className="sc-caret">^</span>  <span className="sc-dim">expected format 'email'</span>{`\n`}
{`   |\n`}
{`  --> `}<span className="sc-dim">input, byte 23</span>{`\n`}
{`   |\n`}
{` 1 | `}<span className="sc-fg">{'{ "name": "M", "email": "not-an-email" }'}</span>{`\n`}
{`   |                       `}<span className="sc-caret">^^^^^^^^^^^^^^</span>  <span className="sc-dim">got "not-an-email"</span>{`\n`}
{`   |\n`}
{`   = `}<span className="sc-help">help:</span> missing '@' and domain part{`\n`}
{`   = `}<span className="sc-dim">note: see https://ata-validator.com/e/ATA3001</span>
        </pre>
      </div>
    </div>
  )
}
