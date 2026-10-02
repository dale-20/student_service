import type { CourseOffering, OfferingStatus } from '~/types/domain'

export interface CourseOfferingPayload {
  course_id: number
  academic_term_id: number
  instructor_id: number | null
  section: string
  room: string
  capacity: number
  status: OfferingStatus
  schedules: { day_of_week: string; start_time: string; end_time: string; room: string }[]
}
export function useCourseOfferings() { return useResourceApi<CourseOffering, CourseOfferingPayload>('/course-offerings') }
