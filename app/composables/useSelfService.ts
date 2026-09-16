import type { PaginatedResponse } from '~/types/api'
import type { CourseOffering, Enrollment, Student } from '~/types/domain'

export function useSelfService() {
  const { request } = useApi()
  const profile = async () => (await request<{ data: Student }>('/me/student')).data
  const enrollments = (page = 1) => request<PaginatedResponse<Enrollment>>('/me/enrollments', { query: { page } })
  const offerings = (page = 1) => request<PaginatedResponse<CourseOffering>>('/me/course-offerings', { query: { page } })

  return { profile, enrollments, offerings }
}
