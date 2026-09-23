import { ofetch, type FetchOptions } from 'ofetch'
import type { ApiProblem } from '~/types/api'

const stateChangingMethods = new Set(['POST', 'PUT', 'PATCH', 'DELETE'])
const loopbackHostnames = new Set(['localhost', '127.0.0.1', '::1'])

export function alignLoopbackHostname(baseUrl: string, browserHostname: string): string {
  try {
    const url = new URL(baseUrl)

    if (loopbackHostnames.has(url.hostname) && loopbackHostnames.has(browserHostname)) {
      url.hostname = browserHostname
    }

    return url.toString().replace(/\/$/, '')
  }
  catch {
    return baseUrl
  }
}

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
  const browserHostname = import.meta.client ? window.location.hostname : null
  const backendOrigin = browserHostname
    ? alignLoopbackHostname(config.public.backendOrigin, browserHostname)
    : config.public.backendOrigin
  const apiBase = browserHostname
    ? alignLoopbackHostname(config.public.apiBase, browserHostname)
    : config.public.apiBase

  async function csrf(): Promise<string | null> {
    if (import.meta.server) return null
    await ofetch('/sanctum/csrf-cookie', {
      baseURL: backendOrigin,
      credentials: 'include',
      headers: { Accept: 'application/json' },
    })

    const token = useCookie<string | null>('XSRF-TOKEN').value

    if (!token) {
      throw {
        status: 419,
        message: 'Unable to initialize a secure login session. Use the same hostname for the frontend and API, then try again.',
      } satisfies ApiProblem
    }

    return decodeURIComponent(token)
  }

  async function request<T>(path: string, options: FetchOptions<'json'> = {}): Promise<T> {
    const method = String(options.method ?? 'GET').toUpperCase()

    try {
      const xsrf = stateChangingMethods.has(method) ? await csrf() : null

      return await ofetch<T>(path, {
        baseURL: apiBase,
        credentials: 'include',
        ...options,
        headers: {
          Accept: 'application/json',
          ...requestHeaders,
          ...(serverOrigin ? { Origin: serverOrigin } : {}),
          ...(xsrf ? { 'X-XSRF-TOKEN': xsrf } : {}),
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
