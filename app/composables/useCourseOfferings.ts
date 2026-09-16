import type { CourseOffering } from '~/types/domain'
export function useCourseOfferings() { return useResourceApi<CourseOffering>('/course-offerings') }
