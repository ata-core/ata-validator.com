import { runAta, gzipSize } from './runAta'
import { runAjv } from './runAjv'
import type { RunResult } from './types'

export { gzipSize }

// Both validators on the same input, as the tests read them.
export function runValidators(schemaText: string, dataText: string): RunResult {
  const r = runAta(schemaText, dataText)
  if (r.schemaParseError || r.dataParseError) return r
  const a = runAjv(JSON.parse(schemaText), JSON.parse(dataText))
  r.ajvValid = a.valid
  r.ajvErrors = a.errors
  return r
}
