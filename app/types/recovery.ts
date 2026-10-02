export type RecoverableType = 'users' | 'students' | 'programs' | 'courses' | 'academic-terms' | 'course-offerings' | 'enrollments' | 'curriculum' | 'schedules'

export interface DeletedRecord {
  id: number
  type: RecoverableType
  label: string
  detail: string | null
  deleted_at: string
}

export const recoveryTypes: { value: RecoverableType; label: string }[] = [
  { value: 'students', label: 'Students' },
  { value: 'programs', label: 'Programs' },
  { value: 'courses', label: 'Courses' },
  { value: 'academic-terms', label: 'Academic terms' },
  { value: 'course-offerings', label: 'Course offerings' },
  { value: 'enrollments', label: 'Enrollments' },
  { value: 'curriculum', label: 'Curriculum entries' },
  { value: 'schedules', label: 'Offering schedules' },
  { value: 'users', label: 'Users' },
]
