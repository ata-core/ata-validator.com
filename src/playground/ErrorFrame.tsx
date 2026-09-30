import '../components/ErrorShowcase.css'
import { renderPretty } from 'ata-validator'
import type { AtaError } from './types'

// ata-validator 1.40.0 reads `process` in its renderers and a browser has none;
// the fix is in ata-validator's next release. Until the site moves to it, a
// stand-in with no terminal lets renderPretty run here. Remove with that bump.
if (typeof (globalThis as { process?: unknown }).process === 'undefined') {
  ;(globalThis as { process?: unknown }).process = { env: {}, stdout: {}, cwd: () => '' }
}

// The playground shows exactly what `renderPretty` prints in a terminal, the
// same text line for line, and only adds colour. It used to draw its own
// frames, which drifted from ata's output (byte offsets, "got", carets off by
// a column) as the renderer moved on.
function Line({ text }: { text: string }) {
  let m: RegExpMatchArray | null
  if ((m = text.match(/^(error(?:\[[A-Z0-9]+\])?:)(.*)$/))) {
    return <div><span className="sc-err">{m[1]}</span><span className="sc-fg">{m[2]}</span></div>
  }
  if ((m = text.match(/^(\s*-->\s+)(\S+)(.*)$/))) {
    return <div><span className="sc-dim">{m[1]}</span><span className="sc-path">{m[2]}</span><span className="sc-dim">{m[3]}</span></div>
  }
  if ((m = text.match(/^(\s*\d+ \| )(.*)$/))) {
    return <div><span className="sc-dim">{m[1]}</span><span className="sc-fg">{m[2]}</span></div>
  }
  if ((m = text.match(/^(\s*\| )(\s*)(\^+)(.*)$/))) {
    return <div><span className="sc-dim">{m[1]}</span>{m[2]}<span className="sc-caret">{m[3]}</span><span className="sc-dim">{m[4]}</span></div>
  }
  if ((m = text.match(/^(\s*= )(help:)(.*)$/))) {
    return <div><span className="sc-dim">{m[1]}</span><span className="sc-help">{m[2]}</span>{m[3]}</div>
  }
  if ((m = text.match(/^(\s*= note: see )(https?:\/\/\S+)(.*)$/))) {
    return <div><span className="sc-dim">{m[1]}</span><a className="sc-dim" href={m[2]} target="_blank" rel="noreferrer">{m[2]}</a>{m[3]}</div>
  }
  return <div className="sc-dim">{text || ' '}</div>
}

export function ErrorFrame({ errors, valid }: { errors: AtaError[]; valid: boolean }) {
  if (valid) return <div className="pg-ok">no errors. data is valid.</div>
  let text: string
  try {
    text = renderPretty(errors as never, { color: 'never', cwd: '', maxErrors: 0 })
  } catch (e) {
    text = `error: could not render (${e instanceof Error ? e.message : String(e)})`
  }
  return (
    <pre className="pg-frames sc-block">
      {text.split('\n').map((l, i) => <Line text={l} key={i} />)}
    </pre>
  )
}
