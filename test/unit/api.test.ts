import { describe, expect, it } from 'vitest'
import { alignLoopbackHostname, normalizeApiError } from '../../app/composables/useApi'

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

describe('API hostname alignment', () => {
  it('uses the browser loopback alias so the SPA can read Sanctum cookies', () => {
    expect(alignLoopbackHostname('http://localhost:8000/api/v1', '127.0.0.1')).toBe('http://127.0.0.1:8000/api/v1')
  })

  it('does not rewrite configured non-loopback API hosts', () => {
    expect(alignLoopbackHostname('https://api.example.test/api/v1', 'localhost')).toBe('https://api.example.test/api/v1')
  })

  it('leaves relative URLs unchanged', () => {
    expect(alignLoopbackHostname('/api/v1', 'localhost')).toBe('/api/v1')
  })
})
