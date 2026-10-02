import type { ApiQuery } from '~/types/api'
import type { RecordOptionLoader } from '~/types/selection'

export function useRecordOptions() {
  const students = useStudents()
  const offerings = useCourseOfferings()
  const studentOptions = (filters: ApiQuery = {}): RecordOptionLoader => async (query) => {
    const result = await students.list({ ...filters, ...query })
    return { ...result, data: result.data.map(item => ({ id: item.id, label: `${item.student_number} · ${item.last_name}, ${item.first_name}` })) }
  }
  const offeringOptions = (filters: ApiQuery = {}): RecordOptionLoader => async (query) => {
    const result = await offerings.list({ ...filters, ...query })
    return { ...result, data: result.data.map(item => ({ id: item.id, label: `${item.course?.course_code} · ${item.section} · ${item.academic_term?.academic_year} ${item.academic_term?.term.replaceAll('_', ' ')} · ${item.enrolled_count ?? 0}/${item.capacity}` })) }
  }
  return { studentOptions, offeringOptions }
}
