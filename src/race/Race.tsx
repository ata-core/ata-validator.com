import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { compile } from '@ata-project/zod'
import './Race.css'

// One API-boundary product schema, the same shape the published benchmarks use.
const imageSchema = z.object({
  id: z.number(),
  title: z.string().min(1).max(100),
  type: z.enum(['jpg', 'png']),
  size: z.number(),
  url: z.string().min(1),
})
const productSchema = z.object({
  id: z.number(),
  title: z.string().min(1).max(100),
  brand: z.string().min(1).max(30),
  description: z.string().min(1).max(500),
  price: z.number().min(1).max(10000),
  quantity: z.number().min(0).max(10),
  tags: z.array(z.string().min(1).max(30)),
  images: z.array(imageSchema),
})

const validDoc = {
  id: 252,
  title: 'Apple',
  brand: 'Sunny Backyard',
  description: 'Red apple from Lake Constance',
  price: 89,
  quantity: 5,
  tags: ['fruit', 'red', 'round'],
  images: [
    { id: 1, title: 'a', type: 'jpg', size: 100, url: 'https://example.com/1' },
    { id: 2, title: 'b', type: 'png', size: 200, url: 'https://example.com/2' },
  ],
}
const invalidDoc = { ...validDoc, title: '', quantity: 1000 }

const bridge = compile(productSchema)

const RACE_SECONDS = 6
const SLICE_MS = 12

type LaneState = { ops: number; rate: number }

const zero: LaneState = { ops: 0, rate: 0 }

function fmt(n: number): string {
  return Math.floor(n).toLocaleString('en-US')
}

function fmtRate(perSec: number): string {
  if (perSec >= 1e6) return (perSec / 1e6).toFixed(1) + 'M / s'
  if (perSec >= 1e3) return (perSec / 1e3).toFixed(0) + 'K / s'
  return Math.round(perSec) + ' / s'
}

export default function Race() {
  const [running, setRunning] = useState(false)
  const [finished, setFinished] = useState(false)
  const [docKind, setDocKind] = useState<'invalid' | 'valid'>('invalid')
  const [zodLane, setZodLane] = useState<LaneState>(zero)
  const [ataLane, setAtaLane] = useState<LaneState>(zero)
  const [secondsLeft, setSecondsLeft] = useState(RACE_SECONDS)
  const raceRef = useRef<{ stop: boolean }>({ stop: true })

  useEffect(() => () => { raceRef.current.stop = true }, [])

  const start = () => {
    raceRef.current.stop = true
    const session = { stop: false }
    raceRef.current = session
    setRunning(true)
    setFinished(false)
    setZodLane(zero)
    setAtaLane(zero)
    setSecondsLeft(RACE_SECONDS)

    const doc = docKind === 'valid' ? validDoc : invalidDoc
    const zodRun = () => { productSchema.safeParse(doc) }
    const ataRun = () => { bridge.isValid(doc) }

    const lanes = [
      { fn: zodRun, ops: 0, activeMs: 0, batch: 256, set: setZodLane },
      { fn: ataRun, ops: 0, activeMs: 0, batch: 256, set: setAtaLane },
    ]
    const t0 = performance.now()
    let turn = 0

    const frame = () => {
      if (session.stop) return
      const elapsed = performance.now() - t0
      if (elapsed >= RACE_SECONDS * 1000) {
        setRunning(false)
        setFinished(true)
        setSecondsLeft(0)
        return
      }
      setSecondsLeft(Math.ceil(RACE_SECONDS - elapsed / 1000))

      // The engines alternate slices of the same frame budget, so neither can
      // starve the other and the browser stays responsive between slices.
      const lane = lanes[turn % 2]
      turn++
      const sliceStart = performance.now()
      let now = sliceStart
      while (now - sliceStart < SLICE_MS) {
        const { fn } = lane
        for (let i = 0; i < lane.batch; i++) fn()
        lane.ops += lane.batch
        now = performance.now()
      }
      lane.activeMs += now - sliceStart
      // Aim each inner batch at about two milliseconds of work.
      const perMs = lane.ops / Math.max(1, lane.activeMs)
      lane.batch = Math.max(64, Math.min(1 << 21, Math.round(perMs * 2)))
      lane.set({ ops: lane.ops, rate: (lane.ops / Math.max(1, lane.activeMs)) * 1000 })

      requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  }

  const stop = () => {
    raceRef.current.stop = true
    setRunning(false)
    setFinished(true)
  }

  const multiplier = zodLane.rate > 0 && ataLane.rate > 0 ? ataLane.rate / zodLane.rate : 0

  return (
    <div className="race">
      <div className="race-wrap">
        <div className="race-top">
          <Link className="race-back" to="/docs/integrations/zod">&larr; ata-validator</Link>
          <p className="race-eyebrow">SAME SCHEMA &middot; SAME DOCUMENT &middot; YOUR BROWSER</p>
        </div>

        <h1 className="race-title">
          {docKind === 'invalid' ? 'How many rejections fit in six seconds?' : 'How many verdicts fit in six seconds?'}
        </h1>
        <p className="race-sub">
          One zod product schema. On the left, zod&rsquo;s own <code>safeParse</code>. On the
          right, the same schema through <code>@ata-project/zod</code>. Both counters are real
          work happening in this tab, in alternating {SLICE_MS} ms slices.
        </p>

        <div className="race-lanes">
          <div className="race-lane">
            <p className="race-lane-name">zod &middot; safeParse</p>
            <p className="race-count">{fmt(zodLane.ops)}</p>
            <p className="race-rate">{zodLane.rate ? fmtRate(zodLane.rate) : ' '}</p>
          </div>
          <div className="race-mult">
            {multiplier >= 2 ? <><span>&times;</span>{Math.round(multiplier)}</> : ' '}
          </div>
          <div className="race-lane race-lane-ata">
            <p className="race-lane-name">ata &middot; isValid</p>
            <p className="race-count">{fmt(ataLane.ops)}</p>
            <p className="race-rate">{ataLane.rate ? fmtRate(ataLane.rate) : ' '}</p>
          </div>
        </div>

        <div className="race-controls">
          {!running ? (
            <button className="race-go" onClick={start}>{finished ? 'Race again' : 'Start the race'}</button>
          ) : (
            <button className="race-go race-stop" onClick={stop}>Stop ({secondsLeft}s)</button>
          )}
          <div className="race-toggle" role="radiogroup" aria-label="document kind">
            <button
              className={docKind === 'invalid' ? 'on' : ''}
              disabled={running}
              onClick={() => setDocKind('invalid')}
            >invalid document</button>
            <button
              className={docKind === 'valid' ? 'on' : ''}
              disabled={running}
              onClick={() => setDocKind('valid')}
            >valid document</button>
          </div>
        </div>

        {finished && multiplier >= 2 && (
          <p className="race-verdict">
            Same answers on both sides, differential-tested on 13,030 values. The schema stayed
            zod. <Link to="/docs/integrations/zod">How it works</Link>
          </p>
        )}

        <p className="race-note">
          zod 4 against ata-validator through @ata-project/zod, engine &lsquo;{bridge.engine}&rsquo;,
          compiled in your browser. Rates count only each engine&rsquo;s own active slice time.
          The rejection race is the interesting one: zod builds its error objects eagerly,
          the bridge answers first and builds a ZodError only if somebody reads it.
        </p>
      </div>
    </div>
  )
}
