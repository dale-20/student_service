import type { Program, CurriculumInput } from '~/types/domain'

export function usePrograms() {
  const resource = useResourceApi<Program>('/programs')
  const { request } = useApi()
  const syncCurriculum = async (id: number, courses: CurriculumInput[]): Promise<Program> => (await request<{ data: Program }>(`/programs/${id}/curriculum`, { method: 'PUT', body: { courses } })).data

  return { ...resource, syncCurriculum }
}
