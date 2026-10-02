import type { GradeInput } from '~/composables/useGrades'
import type { Enrollment, Grade } from '~/types/domain'

export interface GradeRow {
  enrollment_id: number
  student: string
  number: string
  eligible: boolean
  has_grade: boolean
  status: Enrollment['status']
  midterm_grade: number | string | null
  final_grade: number | string | null
  remarks: Grade['remarks']
}

export function gradeRows(enrollments: Enrollment[]): GradeRow[] {
  return enrollments.map(item => ({
    enrollment_id: item.id,
    student: `${item.student?.last_name ?? ''}, ${item.student?.first_name ?? ''}`,
    number: item.student?.student_number ?? '',
    eligible: item.status === 'enrolled' || item.status === 'completed',
    has_grade: Boolean(item.grade),
    status: item.status,
    midterm_grade: item.grade?.midterm_grade ?? null,
    final_grade: item.grade?.final_grade ?? null,
    remarks: item.grade?.remarks ?? null,
  }))
}

export function nullableGrade(value: number | string | null): number | null {
  return value === null || (typeof value === 'string' && value.trim() === '') ? null : Number(value)
}

export function gradePayload(rows: GradeRow[]): GradeInput[] {
  return rows.filter(row => row.eligible && (row.has_grade || nullableGrade(row.midterm_grade) !== null || nullableGrade(row.final_grade) !== null || row.remarks)).map(row => ({ enrollment_id: row.enrollment_id, midterm_grade: nullableGrade(row.midterm_grade), final_grade: nullableGrade(row.final_grade), remarks: row.remarks || null }))
}
