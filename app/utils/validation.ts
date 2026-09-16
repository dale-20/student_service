export interface LaravelValidationError {
  message: string
  errors: Record<string, string[]>
}

export function firstValidationError(
  response: LaravelValidationError,
  field: string,
): string | undefined {
  return response.errors[field]?.[0]
}
