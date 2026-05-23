import { useEffect, useMemo, useState } from 'react'
import './Playground.css'
import { runValidators } from './runValidators'
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

export default function Playground() {
  const initial = decodeState(window.location.hash.replace(/^#/, '')) ?? presets[0]
  const [schema, setSchema] = useState(initial.schema)
  const [data, setData] = useState(initial.data)

  const dSchema = useDebounced(schema, 300)
  const dData = useDebounced(data, 300)
  const result = useMemo(() => runValidators(dSchema, dData), [dSchema, dData])

  function loadPreset(name: string) {
    const p = presets.find(x => x.name === name)
    if (p) { setSchema(p.schema); setData(p.data) }
  }

  function copyLink() {
    const hash = encodeState({ schema, data })
    const url = `${window.location.origin}/playground#${hash}`
    window.history.replaceState(null, '', `#${hash}`)
    navigator.clipboard?.writeText(url)
  }

  return (
    <div className="pg">
      <header className="pg-top">
        <a className="pg-home" href="/">ata</a>
        <select className="pg-preset" onChange={e => loadPreset(e.target.value)} defaultValue={presets[0].name}>
          {presets.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
        </select>
        <button className="pg-share" onClick={copyLink}>Copy link</button>
      </header>

      <div className="pg-grid">
        <div className="pg-col">
          <label className="pg-label">schema.json</label>
          <textarea className="pg-editor" value={schema} onChange={e => setSchema(e.target.value)} spellCheck={false} />
          {result.schemaParseError && <div className="pg-parse-err">invalid JSON: {result.schemaParseError}</div>}
        </div>
        <div className="pg-col">
          <label className="pg-label">data.json</label>
          <textarea className="pg-editor" value={data} onChange={e => setData(e.target.value)} spellCheck={false} />
          {result.dataParseError && <div className="pg-parse-err">invalid JSON: {result.dataParseError}</div>}
        </div>
      </div>

      <div className="pg-grid pg-out">
        <div className="pg-col">
          <div className="pg-out-head">ajv</div>
          <AjvPanel errors={result.ajvErrors} valid={result.ajvValid} />
        </div>
        <div className="pg-col">
          <div className="pg-out-head">ata</div>
          <ErrorFrame errors={result.ataErrors} valid={result.ataValid} />
        </div>
      </div>
    </div>
  )
}
