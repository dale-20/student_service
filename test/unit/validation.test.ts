import { describe, expect, it } from 'vitest'
import { firstValidationError } from '../../app/utils/validation'

describe('firstValidationError', () => {
  it('returns the first message for a field', () => {
    const response = {
      message: 'The given data was invalid.',
      errors: {
        email: ['The email field is required.', 'The email must be valid.'],
      },
    }

    expect(firstValidationError(response, 'email')).toBe('The email field is required.')
  })

  it('returns undefined when the field has no error', () => {
    const response = {
      message: 'The given data was invalid.',
      errors: {},
    }

    expect(firstValidationError(response, 'email')).toBeUndefined()
  })
})
