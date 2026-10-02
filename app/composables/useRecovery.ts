import type { ApiQuery, PaginatedResponse } from '~/types/api'
import type { DeletedRecord, RecoverableType } from '~/types/recovery'

export function useRecovery() {
  const { request } = useApi()
  const list = (type: RecoverableType, query: ApiQuery = {}) => request<PaginatedResponse<DeletedRecord>>('/recycle-bin', { query: { ...query, type } })
  const remove = async (type: RecoverableType, id: number): Promise<void> => { await request(`/${type}/${id}`, { method: 'DELETE' }) }
  const restore = (type: RecoverableType, id: number) => request<{ message: string }>(`/recycle-bin/${type}/${id}/restore`, { method: 'POST' })
  return { list, remove, restore }
}
