import type { AcademicRecordTerm, Student } from '~/types/domain'

export interface AcademicRecord { student: Student; terms: AcademicRecordTerm[] }

export function useAcademicRecords() {
  const { request } = useApi()
  const forStudent = async (studentId: number) => (await request<{ data: AcademicRecord }>(`/students/${studentId}/academic-record`)).data
  const mine = async () => (await request<{ data: AcademicRecord }>('/me/academic-record')).data

  return { forStudent, mine }
}
