import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import type { AjvError } from './types'

export interface AjvResult { valid: boolean; errors: AjvError[] }

// The comparison tab's other validator, with the options a Fastify app uses
// (all errors, non-strict, formats on). Loaded on demand.
export function runAjv(schema: object, data: unknown): AjvResult {
  try {
    const ajv = new Ajv({ allErrors: true, strict: false })
    addFormats(ajv)
    const validate = ajv.compile(schema)
    const valid = validate(data) as boolean
    return { valid, errors: (validate.errors || []) as unknown as AjvError[] }
  } catch (e) {
    return { valid: false, errors: [{ instancePath: '', schemaPath: '', keyword: 'error', params: {}, message: 'ajv: ' + (e as Error).message }] }
  }
}
