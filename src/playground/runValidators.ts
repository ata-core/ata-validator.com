import { Validator } from 'ata-validator'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import type { RunResult, AtaError, AjvError } from './types'

function parse(text: string): { value?: unknown; error: string | null } {
  try {
    return { value: JSON.parse(text), error: null }
  } catch (e) {
    return { error: (e as Error).message }
  }
}

export function runValidators(schemaText: string, dataText: string): RunResult {
  const schemaParsed = parse(schemaText)
  const dataParsed = parse(dataText)

  const base: RunResult = {
    schemaParseError: schemaParsed.error,
    dataParseError: dataParsed.error,
    ataValid: true,
    ataErrors: [],
    ajvValid: true,
    ajvErrors: [],
  }
  if (schemaParsed.error || dataParsed.error) return base

  const schema = schemaParsed.value as object

  // ata
  try {
    const v = new Validator(schema, { source: { path: 'schema.json', content: schemaText } })
    const r = v.validateJSON(dataText)
    base.ataValid = r.valid
    base.ataErrors = (r.errors || []) as AtaError[]
  } catch (e) {
    base.ataValid = false
    base.ataErrors = [{ message: 'ata: ' + (e as Error).message }]
  }

  // ajv (mirror Fastify defaults closely enough for a fair comparison)
  try {
    const ajv = new Ajv({ allErrors: true, strict: false })
    addFormats(ajv)
    const validate = ajv.compile(schema)
    base.ajvValid = validate(dataParsed.value) as boolean
    base.ajvErrors = (validate.errors || []) as unknown as AjvError[]
  } catch (e) {
    base.ajvValid = false
    base.ajvErrors = [{ instancePath: '', schemaPath: '', keyword: 'error', params: {}, message: 'ajv: ' + (e as Error).message }]
  }

  return base
}
