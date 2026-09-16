import type { Student } from '~/types/domain'

export interface StudentFilters { search?: string; program_id?: number; year_level?: number; status?: string; page?: number; per_page?: number }

export function useStudents() {
  const resource = useResourceApi<Student>('/students')
  const list = (filters: StudentFilters = {}) => resource.list({ ...filters })
  const find = resource.find
  const save = (payload: Partial<Student>, id?: number) => id ? resource.update(id, payload) : resource.create(payload)

  return { list, find, save }
}
