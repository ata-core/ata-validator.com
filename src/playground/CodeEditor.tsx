import { useRef } from 'react'

interface Props {
  value: string
  onChange: (v: string) => void
  label: string
  marked?: Set<number>
  error?: string | null
  onFormat?: () => void
}

// A plain textarea with a line-number gutter kept in step with its scroll.
// Lines named in `marked` (those an error points at) are flagged in the
// gutter. Tab inserts two spaces instead of leaving the field.
export function CodeEditor({ value, onChange, label, marked, error, onFormat }: Props) {
  const gutter = useRef<HTMLDivElement>(null)
  const lines = value.split('\n').length

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key !== 'Tab' || e.shiftKey || e.metaKey || e.ctrlKey || e.altKey) return
    e.preventDefault()
    const t = e.currentTarget
    const { selectionStart: s, selectionEnd: end } = t
    const next = value.slice(0, s) + '  ' + value.slice(end)
    onChange(next)
    requestAnimationFrame(() => { t.selectionStart = t.selectionEnd = s + 2 })
  }

  return (
    <section className="pgx-panel">
      <header className="pgx-panel-head">
        <span className="pgx-panel-label">{label}</span>
        {error ? <span className="pgx-panel-status pgx-panel-status--bad">invalid JSON</span> : null}
        {onFormat ? (
          <button type="button" className="pgx-btn pgx-btn--ghost" onClick={onFormat} disabled={!!error}>
            Format
          </button>
        ) : null}
      </header>
      <div className="pgx-editor">
        <div className="pgx-gutter" ref={gutter} aria-hidden="true">
          {Array.from({ length: lines }, (_, i) => (
            <div key={i} className={marked?.has(i + 1) ? 'pgx-ln pgx-ln--mark' : 'pgx-ln'}>{i + 1}</div>
          ))}
        </div>
        <textarea
          className="pgx-textarea"
          value={value}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          aria-label={label}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          onScroll={(e) => { if (gutter.current) gutter.current.scrollTop = e.currentTarget.scrollTop }}
        />
      </div>
      {error ? <div className="pgx-parse-err">{error}</div> : null}
    </section>
  )
}
