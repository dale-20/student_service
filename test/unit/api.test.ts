import { describe, expect, it } from 'vitest'
import { normalizeApiError } from '../../app/composables/useApi'

describe('API error normalization', () => {
  it('preserves Laravel validation fields', () => {
    expect(normalizeApiError({ statusCode: 422, data: { message: 'Invalid data.', errors: { email: ['Already used.'] } } })).toEqual({
      status: 422,
      message: 'Invalid data.',
      errors: { email: ['Already used.'] },
    })
  })

  it('hides raw server failures behind a safe message', () => {
    expect(normalizeApiError({ status: 500 }).message).toBe('Something went wrong. Please try again.')
  })
})
