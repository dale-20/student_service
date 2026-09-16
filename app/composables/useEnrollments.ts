import type { ApiQuery, ApiResponse, PaginatedResponse } from '~/types/api'
import type { Enrollment } from '~/types/domain'

export function useEnrollments() {
  const { request } = useApi()
  const list = (query: ApiQuery = {}) => request<PaginatedResponse<Enrollment>>('/enrollments', { query })
  const find = async (id: number) => (await request<ApiResponse<Enrollment>>(`/enrollments/${id}`)).data
  const create = async (studentId: number, courseOfferingIds: number[]) => (await request<{ data: Enrollment[] }>('/enrollments', { method: 'POST', body: { student_id: studentId, course_offering_ids: courseOfferingIds } })).data
  const updateStatus = async (id: number, status: string) => (await request<ApiResponse<Enrollment>>(`/enrollments/${id}/status`, { method: 'PATCH', body: { status } })).data

  return { list, find, create, updateStatus }
}
