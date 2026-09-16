import type { ApiResponse, LookupResponse } from '~/types/api'

export function useLookups() {
  const { request } = useApi()
  const get = async () => (await request<ApiResponse<LookupResponse>>('/lookups')).data

  return { get }
}
