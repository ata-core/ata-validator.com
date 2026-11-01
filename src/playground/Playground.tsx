import { useEffect, useMemo, useState } from 'react'
import './Playground.css'
import { runAta, gzipSize } from './runAta'
import type { AjvResult } from './runAjv'
import { ErrorFrame } from './ErrorFrame'
import { AjvPanel } from './AjvPanel'
import { CodeEditor } from './CodeEditor'
import { presets } from './presets'
import { encodeState, decodeState } from './urlState'

type Tab = 'errors' | 'types' | 'compiled' | 'compare'

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

function formatNs(ns: number): string {
  return ns < 1000 ? `${ns} ns` : `${(ns / 1000).toFixed(1)} µs`
}

function pretty(text: string): string | null {
  try { return JSON.stringify(JSON.parse(text), null, 2) } catch { return null }
}

function CopyButton({ text }: { text: string }) {
  const [done, setDone] = useState(false)
  return (
    <button
      type="button"
      className="pgx-btn pgx-btn--ghost"
      disabled={!text}
      onClick={() => {
        navigator.clipboard?.writeText(text)
        setDone(true)
        setTimeout(() => setDone(false), 1400)
      }}
    >
      {done ? 'Copied' : 'Copy'}
    </button>
  )
}

export default function Playground() {
  const initial = decodeState(window.location.hash.replace(/^#/, '')) ?? presets[0]
  const [schema, setSchema] = useState(initial.schema)
  const [data, setData] = useState(initial.data)
  const [preset, setPreset] = useState(presets.find(p => p.schema === initial.schema && p.data === initial.data)?.name ?? '')
  const [tab, setTab] = useState<Tab>('errors')
  const [shared, setShared] = useState(false)

  const dSchema = useDebounced(schema, 250)
  const dData = useDebounced(data, 250)
  const result = useMemo(() => runAta(dSchema, dData), [dSchema, dData])

  // The gzip size arrives asynchronously; kept with the code it measured so a
  // size from an earlier schema is never shown next to the current module.
  const [gz, setGz] = useState<{ code: string; bytes: number } | null>(null)
  useEffect(() => {
    const code = result.compiledCode
    if (!code) return
    let cancelled = false
    gzipSize(code).then(n => { if (!cancelled && n != null) setGz({ code, bytes: n }) })
    return () => { cancelled = true }
  }, [result.compiledCode])
  const gzipBytes = gz && gz.code === result.compiledCode ? gz.bytes : null

  // The comparison validator is fetched the first time its tab is opened.
  const [ajv, setAjv] = useState<AjvResult | null>(null)
  useEffect(() => {
    if (tab !== 'compare' || result.schemaParseError || result.dataParseError) return
    let cancelled = false
    import('./runAjv').then(({ runAjv }) => {
      if (!cancelled) setAjv(runAjv(JSON.parse(dSchema), JSON.parse(dData)))
    })
    return () => { cancelled = true }
  }, [tab, dSchema, dData, result.schemaParseError, result.dataParseError])

  const parseError = result.schemaParseError || result.dataParseError
  const errorCount = result.ataErrors.length

  // Lines the errors point at, flagged in each editor's gutter.
  const { schemaLines, dataLines } = useMemo(() => {
    const s = new Set<number>(), d = new Set<number>()
    if (!result.ataValid) for (const e of result.ataErrors) {
      if (e.schemaSource?.line) s.add(e.schemaSource.line)
      if (e.dataFrame?.line) d.add(e.dataFrame.line)
    }
    return { schemaLines: s, dataLines: d }
  }, [result])

  function loadPreset(name: string) {
    const p = presets.find(x => x.name === name)
    if (p) { setSchema(p.schema); setData(p.data); setPreset(name) }
  }

  function share() {
    const hash = encodeState({ schema, data })
    window.history.replaceState(null, '', `#${hash}`)
    navigator.clipboard?.writeText(`${window.location.origin}/playground#${hash}`)
    setShared(true)
    setTimeout(() => setShared(false), 1500)
  }

  const status = parseError
    ? { cls: 'pgx-pill--idle', text: 'Invalid JSON' }
    : result.ataValid
      ? { cls: 'pgx-pill--ok', text: 'Valid' }
      : { cls: 'pgx-pill--bad', text: `${errorCount} ${errorCount === 1 ? 'error' : 'errors'}` }

  const tabs: { id: Tab; label: string; badge?: string }[] = [
    { id: 'errors', label: 'Errors', badge: !parseError && !result.ataValid ? String(errorCount) : undefined },
    { id: 'types', label: 'TypeScript' },
    { id: 'compiled', label: 'Compiled module' },
    { id: 'compare', label: 'Compare' },
  ]

  return (
    <div className="pgx">
      <header className="pgx-top">
        <a className="pgx-brand" href="/">ata</a>
        <span className="pgx-crumb">/</span>
        <span className="pgx-title">Playground</span>

        <label className="pgx-examples">
          <span className="pgx-examples-label">Example</span>
          <select value={preset} onChange={e => loadPreset(e.target.value)}>
            {preset === '' ? <option value="">Custom</option> : null}
            {presets.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
          </select>
        </label>

        <div className="pgx-top-right">
          <span className={`pgx-pill ${status.cls}`}>{status.text}</span>
          <a className="pgx-version" href="https://www.npmjs.com/package/ata-validator" target="_blank" rel="noreferrer" title="The ata-validator release this page runs, the latest on npm">
            v{__ATA_VERSION__}
          </a>
          <button type="button" className="pgx-btn" onClick={share}>{shared ? 'Link copied' : 'Share'}</button>
          <a className="pgx-btn pgx-btn--ghost" href="/docs">Docs</a>
        </div>
      </header>

      <main className="pgx-work">
        <div className="pgx-col pgx-col--inputs">
          <CodeEditor
            label="schema.json"
            value={schema}
            onChange={v => { setSchema(v); setPreset('') }}
            marked={schemaLines}
            error={result.schemaParseError}
            onFormat={() => { const p = pretty(schema); if (p) setSchema(p) }}
          />
          <CodeEditor
            label="data.json"
            value={data}
            onChange={v => { setData(v); setPreset('') }}
            marked={dataLines}
            error={result.dataParseError}
            onFormat={() => { const p = pretty(data); if (p) setData(p) }}
          />
        </div>

        <section className="pgx-panel pgx-col pgx-col--output">
          <nav className="pgx-tabs" role="tablist">
            {tabs.map(t => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                className={tab === t.id ? 'pgx-tab pgx-tab--on' : 'pgx-tab'}
                onClick={() => setTab(t.id)}
              >
                {t.label}
                {t.badge ? <span className="pgx-tab-badge">{t.badge}</span> : null}
              </button>
            ))}
            <span className="pgx-tabs-meta">
              {tab === 'compiled' && result.compiledCode ? (
                <>
                  {formatBytes(result.compiledBytes)}
                  {gzipBytes != null ? ` · ${formatBytes(gzipBytes)} gzip` : ''}
                  {' · no imports'}
                </>
              ) : null}
              {tab === 'types' && result.tsType ? <CopyButton text={result.tsType} /> : null}
              {tab === 'compiled' && result.compiledCode ? <CopyButton text={result.compiledCode} /> : null}
            </span>
          </nav>

          <div className="pgx-out" role="tabpanel">
            {parseError ? (
              <p className="pgx-empty">Fix the JSON on the left to see results.</p>
            ) : tab === 'errors' ? (
              <ErrorFrame errors={result.ataErrors} valid={result.ataValid} />
            ) : tab === 'types' ? (
              result.compileError
                ? <p className="pgx-out-err">{result.compileError}</p>
                : <pre className="pgx-code">{result.tsType}</pre>
            ) : tab === 'compiled' ? (
              result.compileError
                ? <p className="pgx-out-err">{result.compileError}</p>
                : (
                  <>
                    <p className="pgx-note">
                      What <code>ata build</code> writes for this schema: a module that imports nothing and
                      validates without generating code at run time.
                    </p>
                    <pre className="pgx-code">{result.compiledCode}</pre>
                  </>
                )
            ) : (
              <div className="pgx-compare">
                <div>
                  <h3 className="pgx-compare-head">ata</h3>
                  <ErrorFrame errors={result.ataErrors} valid={result.ataValid} />
                </div>
                <div>
                  <h3 className="pgx-compare-head">ajv, allErrors with ajv-formats</h3>
                  {ajv ? <AjvPanel errors={ajv.errors} valid={ajv.valid} /> : <p className="pgx-empty">Loading…</p>}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="pgx-status">
        <span>
          engine <strong>{result.engine ?? 'none'}</strong>
        </span>
        {result.verdictNs != null ? (
          <span title="Median cost of isValidObject() on this data, measured in this browser">
            verdict <strong>{formatNs(result.verdictNs)}</strong> in this browser
          </span>
        ) : null}
        <span className="pgx-status-right">
          Runs entirely in your browser. Nothing is sent anywhere.
        </span>
      </footer>
    </div>
  )
}
