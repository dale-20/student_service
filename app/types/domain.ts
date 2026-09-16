export type RoleSlug = 'administrator' | 'registrar' | 'instructor' | 'student'
export type EntityStatus = 'active' | 'inactive' | 'suspended' | 'graduated' | 'dropped'
export type EnrollmentStatus = 'enrolled' | 'dropped' | 'withdrawn' | 'completed'
export type OfferingStatus = 'open' | 'closed' | 'ongoing' | 'completed' | 'cancelled'

export interface Role { id: number; name: string; slug: RoleSlug }
export interface User { id: number; name: string; email: string; role: Role; status: EntityStatus; last_login_at?: string | null; must_change_password?: boolean; student?: Student | null }
export interface ProgramCourse { id: number; program_id: number; course_id: number; year_level: number; semester: string; course?: Course }
export interface Program { id: number; code: string; name: string; description?: string | null; status: 'active' | 'inactive'; students_count?: number; courses_count?: number; program_courses?: ProgramCourse[] }
export interface Student { id: number; user_id?: number | null; program_id: number; student_number: string; first_name: string; middle_name?: string | null; last_name: string; suffix?: string | null; birth_date?: string | null; email?: string | null; contact_number?: string | null; address?: string | null; year_level: number; status: EntityStatus; program?: Program; user?: User | null }
export interface Course { id: number; course_code: string; course_title: string; description?: string | null; units: number; status: 'active' | 'inactive' }
export interface AcademicTerm { id: number; academic_year: string; term: 'first_semester' | 'second_semester' | 'summer'; start_date: string; end_date: string; status: 'upcoming' | 'active' | 'completed' }
export interface CourseOfferingSchedule { id: number; day_of_week: string; start_time: string; end_time: string; room?: string | null }
export interface CourseOffering { id: number; course_id: number; academic_term_id: number; instructor_id?: number | null; section: string; room?: string | null; schedule?: string | null; capacity: number; enrolled_count?: number; status: OfferingStatus; course?: Course; academic_term?: AcademicTerm; instructor?: User | null; schedules?: CourseOfferingSchedule[] }
export interface Enrollment { id: number; student_id: number; course_offering_id: number; enrollment_date: string; status: EnrollmentStatus; student?: Student; course_offering?: CourseOffering; grade?: Grade | null }
export interface Grade { id: number; enrollment_id: number; midterm_grade?: number | null; final_grade?: number | null; remarks?: 'passed' | 'failed' | 'incomplete' | 'dropped' | null }
export interface AcademicRecordTerm { term: AcademicTerm; enrollments: Enrollment[]; total_units: number }
