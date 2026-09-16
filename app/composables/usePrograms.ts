import type { Program, ProgramCourse } from '~/types/domain'

export function usePrograms() {
  const resource = useResourceApi<Program>('/programs')
  const { request } = useApi()
  const syncCurriculum = async (id: number, courses: Array<Pick<ProgramCourse, 'course_id' | 'year_level' | 'semester'>>): Promise<Program> => (await request<{ data: Program }>(`/programs/${id}/curriculum`, { method: 'PUT', body: { courses: courses.map(course => ({ ...course, is_required: true })) } })).data

  return { ...resource, syncCurriculum }
}
