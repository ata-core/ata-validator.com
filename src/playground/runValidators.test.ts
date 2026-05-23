import { describe, it, expect } from 'vitest'
import { runValidators } from './runValidators'

const schema = JSON.stringify({
  type: 'object',
  properties: { email: { type: 'string', format: 'email' } },
  required: ['name'],
}, null, 2)

describe('runValidators', () => {
  it('reports a JSON parse error for an invalid schema', () => {
    const r = runValidators('{ not json', '{}')
    expect(r.schemaParseError).toBeTruthy()
  })

  it('reports a JSON parse error for invalid data', () => {
    const r = runValidators(schema, '{ not json')
    expect(r.dataParseError).toBeTruthy()
  })

  it('produces ata rich errors with frames for invalid data', () => {
    const r = runValidators(schema, JSON.stringify({ email: 'not-an-email' }))
    expect(r.ataValid).toBe(false)
    expect(r.ataErrors.length).toBeGreaterThan(0)
    expect(r.ataErrors.some(e => e.code && e.schemaSource && e.dataFrame)).toBe(true)
  })

  it('produces ajv errors for invalid data', () => {
    const r = runValidators(schema, JSON.stringify({ email: 'not-an-email' }))
    expect(r.ajvValid).toBe(false)
    expect(r.ajvErrors.length).toBeGreaterThan(0)
  })

  it('reports valid for conforming data', () => {
    const r = runValidators(schema, JSON.stringify({ name: 'M', email: 'a@b.com' }))
    expect(r.ataValid).toBe(true)
    expect(r.ajvValid).toBe(true)
  })
})
