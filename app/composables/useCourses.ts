import type { Course } from '~/types/domain'
export function useCourses() { return useResourceApi<Course>('/courses') }
