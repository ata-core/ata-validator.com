import { useEffect, useRef, useState } from 'react'
import './ErrorShowcase.css'

// The ata panel's lines are individually wrapped so the entrance animation
// can stagger them; --i drives each line's delay in CSS.
function Line({ i, help, children }: { i: number; help?: boolean; children: React.ReactNode }) {
  return (
    <span className={help ? 'sc-line sc-line--help' : 'sc-line'} style={{ '--i': i } as React.CSSProperties}>
      {children}
    </span>
  )
}

export function ErrorShowcase() {
  const panelRef = useRef<HTMLDivElement>(null)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const el = panelRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setAnimate(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

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

      <div ref={panelRef} className={animate ? 'showcase-panel showcase-after showcase-animate' : 'showcase-panel showcase-after'}>
        <div className="showcase-head">
          <span className="showcase-dot showcase-dot--red" />
          <span className="showcase-dot showcase-dot--yellow" />
          <span className="showcase-dot showcase-dot--green" />
          <span className="showcase-label">ata-validator 1.0</span>
        </div>
        <pre className="showcase-body">
          <Line i={0}><span className="sc-err">error[ATA3001]:</span> <span className="sc-fg">value does not match format "email"</span></Line>
          <Line i={1}>{`  --> `}<span className="sc-path">schemas/user.json:5:7</span></Line>
          <Line i={2}>{`   |`}</Line>
          <Line i={3}>{` 5 | `}<span className="sc-fg">      "email": {'{'} "type": "string", "format": "email" {'}'}</span></Line>
          <Line i={4}>{`   |       `}<span className="sc-caret">^</span>  <span className="sc-dim">expected format 'email'</span></Line>
          <Line i={5}>{`   |`}</Line>
          <Line i={6}>{`  --> `}<span className="sc-dim">input, byte 23</span></Line>
          <Line i={7}>{`   |`}</Line>
          <Line i={8}>{` 1 | `}<span className="sc-fg">{'{ "name": "M", "email": "not-an-email" }'}</span></Line>
          <Line i={9}>{`   |                       `}<span className="sc-caret">^^^^^^^^^^^^^^</span>  <span className="sc-dim">got "not-an-email"</span></Line>
          <Line i={10}>{`   |`}</Line>
          <Line i={11} help>{`   = `}<span className="sc-help">help:</span> missing '@' and domain part</Line>
          <Line i={12}>{`   = `}<span className="sc-dim">note: see https://ata-validator.com/e/ATA3001</span></Line>
        </pre>
      </div>
    </div>
  )
}
