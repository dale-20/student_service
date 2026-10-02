import { describe, expect, it } from 'vitest'
import { gradePayload, gradeRows, nullableGrade } from '../../app/utils/grades'
import type { Enrollment } from '../../app/types/domain'

const enrollment = (id: number, status: Enrollment['status']): Enrollment => ({ id, student_id: id, course_offering_id: 1, enrollment_date: '2026-09-01', status })

describe('grade editing', () => {
  it('excludes dropped and withdrawn enrollments from a class save', () => {
    const rows = gradeRows(['enrolled', 'completed', 'dropped', 'withdrawn'].map((status, index) => enrollment(index + 1, status as Enrollment['status'])))
    rows.forEach(row => { row.final_grade = 1.75 })
    expect(gradePayload(rows).map(row => row.enrollment_id)).toEqual([1, 2])
  })

  it('clears grade fields with null while preserving the existing grade record', () => {
    const rows = gradeRows([{ ...enrollment(1, 'enrolled'), grade: { id: 7, enrollment_id: 1, final_grade: 2, remarks: 'passed' } }])
    rows[0]!.final_grade = ''
    rows[0]!.remarks = null
    expect(gradePayload(rows)).toEqual([{ enrollment_id: 1, midterm_grade: null, final_grade: null, remarks: null }])
    expect(nullableGrade('  ')).toBeNull()
    expect(nullableGrade('1.75')).toBe(1.75)
  })

  it('does not create blank permanent grade records for untouched students', () => {
    expect(gradePayload(gradeRows([enrollment(1, 'enrolled')]))).toEqual([])
  })
})
