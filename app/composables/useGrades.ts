import type { Enrollment, Grade } from '~/types/domain'

export interface GradeInput { enrollment_id: number; midterm_grade: number | null; final_grade: number | null; remarks: Grade['remarks'] }

export function useGrades() {
  const { request } = useApi()
  const list = async (offeringId: number) => (await request<{ data: Enrollment[] }>(`/course-offerings/${offeringId}/grades`)).data
  const save = async (offeringId: number, grades: GradeInput[]) => (await request<{ data: Grade[] }>(`/course-offerings/${offeringId}/grades`, { method: 'PUT', body: { grades } })).data

  return { list, save }
}
