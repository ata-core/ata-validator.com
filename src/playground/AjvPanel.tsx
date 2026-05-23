import type { AjvError } from './types'

export function AjvPanel({ errors, valid }: { errors: AjvError[]; valid: boolean }) {
  if (valid) return <pre className="pg-ajv-body pg-ok">no errors.</pre>
  return <pre className="pg-ajv-body">{JSON.stringify(errors, null, 2)}</pre>
}
