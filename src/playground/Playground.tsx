import { useEffect, useMemo, useState } from 'react'
import './Playground.css'
import { runValidators, gzipSize } from './runValidators'
import { ErrorFrame } from './ErrorFrame'
import { AjvPanel } from './AjvPanel'
import { presets } from './presets'
import { encodeState, decodeState } from './urlState'

function useDebounced<T>(value: T, ms: number): T {
  const [v, setV] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setV(value), ms)
    return () => clearTimeout(t)
  }, [value, ms])
  return v
}

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`
  return `${(n / 1024).toFixed(1)} KB`
}

const codeStyle: React.CSSProperties = {
  margin: 0,
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  fontSize: '12px',
  lineHeight: 1.5,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  overflowY: 'auto',
  maxHeight: '320px',
  color: '#c9d1d9',
}

function WinDots() {
  return (
    <>
      <span className="pg-dot pg-dot--red" />
      <span className="pg-dot pg-dot--yellow" />
      <span className="pg-dot pg-dot--green" />
    </>
  )
}

export default function Playground() {
  const initial = decodeState(window.location.hash.replace(/^#/, '')) ?? presets[0]
  const [schema, setSchema] = useState(initial.schema)
  const [data, setData] = useState(initial.data)
  const [copied, setCopied] = useState(false)

  const dSchema = useDebounced(schema, 300)
  const dData = useDebounced(data, 300)
  const result = useMemo(() => runValidators(dSchema, dData), [dSchema, dData])

  const [gzipBytes, setGzipBytes] = useState<number | null>(null)
  useEffect(() => {
    let cancelled = false
    if (!result.compiledCode) { setGzipBytes(null); return }
    gzipSize(result.compiledCode).then(n => { if (!cancelled) setGzipBytes(n) })
    return () => { cancelled = true }
  }, [result.compiledCode])

  function loadPreset(name: string) {
    const p = presets.find(x => x.name === name)
    if (p) { setSchema(p.schema); setData(p.data) }
  }

  function copyLink() {
    const hash = encodeState({ schema, data })
    const url = `${window.location.origin}/playground#${hash}`
    window.history.replaceState(null, '', `#${hash}`)
    navigator.clipboard?.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="pg">
      <header className="pg-top">
        <a className="pg-home" href="/">ata</a>
        <span className="pg-sep">/</span>
        <span className="pg-sep">playground</span>
        <select
          className="pg-preset"
          onChange={e => loadPreset(e.target.value)}
          defaultValue={presets[0].name}
        >
          {presets.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
        </select>
        <button
          className={`pg-share${copied ? ' pg-share--copied' : ''}`}
          onClick={copyLink}
        >
          {copied ? 'Copied!' : 'Copy link'}
        </button>
      </header>

      {/* Editor row */}
      <div className="pg-grid">
        <div className="pg-col">
          <div className="pg-window">
            <div className="pg-win-head">
              <WinDots />
              <span className="pg-win-label">schema.json</span>
            </div>
            <textarea
              className="pg-editor"
              value={schema}
              onChange={e => setSchema(e.target.value)}
              spellCheck={false}
            />
            {result.schemaParseError && (
              <div className="pg-parse-err">invalid JSON: {result.schemaParseError}</div>
            )}
          </div>
        </div>
        <div className="pg-col">
          <div className="pg-window">
            <div className="pg-win-head">
              <WinDots />
              <span className="pg-win-label">data.json</span>
            </div>
            <textarea
              className="pg-editor"
              value={data}
              onChange={e => setData(e.target.value)}
              spellCheck={false}
            />
            {result.dataParseError && (
              <div className="pg-parse-err">invalid JSON: {result.dataParseError}</div>
            )}
          </div>
        </div>
      </div>

      {/* Output row */}
      <div className="pg-grid pg-out">
        <div className="pg-col">
          <div className="pg-window">
            <div className="pg-win-head">
              <WinDots />
              <span className="pg-win-label">ajv</span>
            </div>
            <div className="pg-out-body">
              <AjvPanel errors={result.ajvErrors} valid={result.ajvValid} />
            </div>
          </div>
        </div>
        <div className="pg-col">
          <div className="pg-window pg-window--hero">
            <div className="pg-win-head">
              <WinDots />
              <span className="pg-win-label">ata</span>
            </div>
            <div className="pg-out-body">
              <ErrorFrame errors={result.ataErrors} valid={result.ataValid} />
            </div>
          </div>
        </div>
      </div>

      {/* Generated output row: inferred type + compiled zero-dependency validator */}
      <div className="pg-grid pg-out">
        <div className="pg-col">
          <div className="pg-window">
            <div className="pg-win-head">
              <WinDots />
              <span className="pg-win-label">inferred type</span>
            </div>
            <div className="pg-out-body">
              {result.compileError
                ? <div className="pg-parse-err">{result.compileError}</div>
                : <pre style={codeStyle}>{result.tsType || '// the TypeScript type appears here'}</pre>}
            </div>
          </div>
        </div>
        <div className="pg-col">
          <div className="pg-window">
            <div className="pg-win-head">
              <WinDots />
              <span className="pg-win-label">compiled validator</span>
              {result.compiledCode && (
                <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#8b949e' }}>
                  {formatBytes(result.compiledBytes)}
                  {gzipBytes != null && ` · ${formatBytes(gzipBytes)} gzip`}
                  {' · 0 deps'}
                </span>
              )}
            </div>
            <div className="pg-out-body">
              {result.compileError
                ? <div className="pg-parse-err">{result.compileError}</div>
                : <pre style={codeStyle}>{result.compiledCode || '// the zero-dependency validator appears here'}</pre>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
