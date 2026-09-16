export interface PaginationMeta { current_page: number; per_page: number; total: number; last_page: number }
export interface PaginationLink { url: string | null; label: string; active: boolean }
export interface PaginatedResponse<T> { data: T[]; links: PaginationLink[]; meta: PaginationMeta }
export interface ApiResponse<T> { data: T; message?: string }
export interface ApiValidationError { message: string; errors: Record<string, string[]> }
export interface ApiProblem { status: number; message: string; errors?: Record<string, string[]> }
export type QueryValue = string | number | boolean | null | undefined
export type ApiQuery = Record<string, QueryValue | QueryValue[]>

export interface LookupResponse {
  programs: import('./domain').Program[]
  courses: import('./domain').Course[]
  academic_terms: import('./domain').AcademicTerm[]
  instructors: import('./domain').User[]
  student_users: import('./domain').User[]
  roles: import('./domain').Role[]
}
