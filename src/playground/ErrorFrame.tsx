import '../components/ErrorShowcase.css'
import type { AtaError } from './types'

function caret(col: number, length = 1) {
  return ' '.repeat(Math.max(0, col - 1)) + '^'.repeat(Math.max(1, length))
}

function OneError({ e }: { e: AtaError }) {
  const ss = e.schemaSource
  const df = e.dataFrame
  return (
    <div className="pg-frame">
      <div>
        <span className="sc-err">error[{e.code ?? 'ATA'}]:</span>{' '}
        <span className="sc-fg">{e.message}</span>
      </div>
      {ss && (
        <pre className="sc-block">
{`  --> `}<span className="sc-path">{ss.file}:{ss.line}:{ss.col}</span>{`\n`}
{`   |\n`}
{` ${ss.line} | `}<span className="sc-fg">{ss.text}</span>{`\n`}
{`   | `}<span className="sc-caret">{caret(ss.col + 4)}</span>{e.expected ? <>  <span className="sc-dim">{e.expected}</span></> : null}
        </pre>
      )}
      {df && (
        <pre className="sc-block">
{`  --> `}<span className="sc-dim">input, byte {df.byteOffset}</span>{`\n`}
{`   |\n`}
{` ${df.line} | `}<span className="sc-fg">{df.text}</span>{`\n`}
{`   | `}<span className="sc-caret">{caret(df.col + 4, df.length)}</span>{e.received ? <>  <span className="sc-dim">got {e.received}</span></> : null}
        </pre>
      )}
      {e.suggestion && (
        <div>{`   = `}<span className="sc-help">help:</span> {e.suggestion.text}</div>
      )}
      {e.docUrl && (
        <div>{`   = `}<span className="sc-dim">note: see </span>
          <a className="sc-dim" href={e.docUrl} target="_blank" rel="noreferrer">{e.docUrl}</a>
        </div>
      )}
    </div>
  )
}

export function ErrorFrame({ errors, valid }: { errors: AtaError[]; valid: boolean }) {
  if (valid) return <div className="pg-ok">no errors. data is valid.</div>
  return (
    <div className="pg-frames">
      {errors.map((e, i) => <OneError e={e} key={i} />)}
      <div className="sc-dim">{`error: ${errors.length} schema violation${errors.length === 1 ? '' : 's'} in input`}</div>
    </div>
  )
}
