import type { ApiQuery, ApiResponse, PaginatedResponse } from '~/types/api'

export function useResourceApi<T, TPayload = Partial<T>>(path: string) {
  const { request } = useApi()

  async function list(query: ApiQuery = {}): Promise<PaginatedResponse<T>> {
    return request<PaginatedResponse<T>>(path, { query })
  }

  async function find(id: number): Promise<T> {
    return (await request<ApiResponse<T>>(`${path}/${id}`)).data
  }

  async function create(payload: TPayload): Promise<T> {
    return (await request<ApiResponse<T>>(path, { method: 'POST', body: payload as Record<string, unknown> })).data
  }

  async function update(id: number, payload: TPayload): Promise<T> {
    return (await request<ApiResponse<T>>(`${path}/${id}`, { method: 'PUT', body: payload as Record<string, unknown> })).data
  }

  return { list, find, create, update }
}
