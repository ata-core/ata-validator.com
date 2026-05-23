import { describe, it, expect } from 'vitest'
import { presets } from './presets'
import { runValidators } from './runValidators'

describe('presets', () => {
  it('every preset has valid JSON for schema and data', () => {
    for (const p of presets) {
      expect(() => JSON.parse(p.schema), p.name).not.toThrow()
      expect(() => JSON.parse(p.data), p.name).not.toThrow()
    }
  })

  it('every preset actually produces at least one ata error (it is a showcase)', () => {
    for (const p of presets) {
      const r = runValidators(p.schema, p.data)
      expect(r.ataErrors.length, p.name).toBeGreaterThan(0)
    }
  })
})
