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
})
