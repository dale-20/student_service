import { ofetch, type FetchOptions } from 'ofetch'
import type { ApiProblem } from '~/types/api'

const stateChangingMethods = new Set(['POST', 'PUT', 'PATCH', 'DELETE'])

export function normalizeApiError(error: unknown): ApiProblem {
  const candidate = error as { status?: number; statusCode?: number; data?: { message?: string; errors?: Record<string, string[]> } }
  const status = candidate.statusCode ?? candidate.status ?? 500

  return {
    status,
    message: candidate.data?.message ?? (status >= 500 ? 'Something went wrong. Please try again.' : 'The request could not be completed.'),
    errors: candidate.data?.errors,
  }
}

export function useApi() {
  const config = useRuntimeConfig()
  const requestHeaders = import.meta.server ? useRequestHeaders(['cookie']) : undefined
  const serverOrigin = import.meta.server ? useRequestURL().origin : undefined

  async function csrf(): Promise<void> {
    if (import.meta.server) return
    await ofetch('/sanctum/csrf-cookie', {
      baseURL: config.public.backendOrigin,
      credentials: 'include',
      headers: { Accept: 'application/json' },
    })
  }

  async function request<T>(path: string, options: FetchOptions<'json'> = {}): Promise<T> {
    const method = String(options.method ?? 'GET').toUpperCase()

    try {
      if (stateChangingMethods.has(method)) await csrf()
      const xsrf = import.meta.client ? useCookie<string | null>('XSRF-TOKEN').value : null

      return await ofetch<T>(path, {
        baseURL: config.public.apiBase,
        credentials: 'include',
        ...options,
        headers: {
          Accept: 'application/json',
          ...requestHeaders,
          ...(serverOrigin ? { Origin: serverOrigin } : {}),
          ...(xsrf ? { 'X-XSRF-TOKEN': decodeURIComponent(xsrf) } : {}),
          ...options.headers,
        },
      })
    }
    catch (error: unknown) {
      throw normalizeApiError(error)
    }
  }

  return { request, csrf }
}
