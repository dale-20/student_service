import type { AcademicTerm } from '~/types/domain'
export function useAcademicTerms() { return useResourceApi<AcademicTerm>('/academic-terms') }
