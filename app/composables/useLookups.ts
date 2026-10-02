import type { ApiQuery, ApiResponse, LookupResponse } from '~/types/api'

export function useLookups() {
  const { request } = useApi()
  const get = async (query: ApiQuery = {}) => (await request<ApiResponse<LookupResponse>>('/lookups', { query })).data

  return { get }
}
