import { describe, it, expect } from 'vitest'
import { encodeState, decodeState } from './urlState'

describe('urlState', () => {
  it('round-trips schema and data', () => {
    const state = { schema: '{"type":"object"}', data: '{"a":1}' }
    expect(decodeState(encodeState(state))).toEqual(state)
  })

  it('returns null for an empty or malformed hash', () => {
    expect(decodeState('')).toBeNull()
    expect(decodeState('not-base64-$$$')).toBeNull()
  })

  it('handles unicode in the schema', () => {
    const state = { schema: '{"title":"café ü"}', data: '{}' }
    expect(decodeState(encodeState(state))).toEqual(state)
  })

  it('encoded hash does not contain "http"', () => {
    const state = { schema: '{"type":"string"}', data: '"hello"' }
    const hash = encodeState(state)
    expect(hash).not.toContain('http')
  })

  it('copyLink-style URL is well-formed and contains the hash only once', () => {
    const state = { schema: '{"type":"object"}', data: '{"x":1}' }
    const hash = encodeState(state)
    const url = `https://ata-validator.com/playground#${hash}`
    // hash should appear exactly once
    expect(url.split('#').length - 1).toBe(1)
    // decoded state should round-trip
    expect(decodeState(hash)).toEqual(state)
  })

  it('decoding a hash from a well-formed URL never returns data containing "http"', () => {
    const state = { schema: '{"type":"string"}', data: '"value"' }
    const hash = encodeState(state)
    const decoded = decodeState(hash)
    expect(decoded).not.toBeNull()
    expect(decoded!.schema).not.toContain('http')
    expect(decoded!.data).not.toContain('http')
  })
})
