import { Validator, toTypeScript } from 'ata-validator'
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

function typeName(schema: Record<string, unknown>): string {
  const title = typeof schema.title === 'string' ? schema.title.trim() : ''
  const raw = title || 'Schema'
  const cleaned = raw.replace(/[^A-Za-z0-9_]+/g, '_').replace(/^_+|_+$/g, '').replace(/^[0-9]/, '_$&')
  if (!cleaned) return 'Schema'
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1)
}

// gzipped byte size via the platform CompressionStream (browser + Workers).
export async function gzipSize(text: string): Promise<number | null> {
  if (typeof CompressionStream === 'undefined') return null
  const cs = new CompressionStream('gzip')
  const writer = cs.writable.getWriter()
  void writer.write(new TextEncoder().encode(text))
  void writer.close()
  const reader = cs.readable.getReader()
  let total = 0
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    total += value.length
  }
  return total
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
    tsType: '',
    compiledCode: '',
    compiledBytes: 0,
    compileError: null,
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

  // inferred type + compiled zero-dependency validator
  try {
    base.tsType = toTypeScript(schema, { name: typeName(schema as Record<string, unknown>) })
    const code = new Validator(schema).toStandaloneModule({ format: 'esm' })
    if (code) {
      base.compiledCode = code
      base.compiledBytes = new TextEncoder().encode(code).length
    } else {
      base.compileError = 'This schema is too complex to compile to a standalone module.'
    }
  } catch (e) {
    base.compileError = (e as Error).message
  }

  return base
}
