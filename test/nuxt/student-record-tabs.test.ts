import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import StudentRecordTabs from '../../app/components/students/StudentRecordTabs.vue'
import type { AcademicRecord } from '../../app/composables/useAcademicRecords'
import type { AcademicTerm, Enrollment } from '../../app/types/domain'

const term: AcademicTerm = {
  id: 1,
  academic_year: '2026-2027',
  term: 'first_semester',
  start_date: '2026-06-01',
  end_date: '2026-10-01',
  status: 'active',
}
const enrollments: Enrollment[] = [
  {
    id: 10,
    student_id: 76,
    course_offering_id: 3,
    enrollment_date: '2026-06-01',
    status: 'enrolled',
    course_offering: {
      id: 3, course_id: 4, academic_term_id: 1, section: 'A', capacity: 30, status: 'open',
      course: { id: 4, course_code: 'CS101', course_title: 'Computing', units: 3, status: 'active' },
      academic_term: term,
    },
    grade: { id: 12, enrollment_id: 10, midterm_grade: 1.75, final_grade: 2, remarks: 'passed' },
  },
  {
    id: 11,
    student_id: 76,
    course_offering_id: 4,
    enrollment_date: '2026-06-01',
    status: 'enrolled',
    course_offering: {
      id: 4, course_id: 5, academic_term_id: 1, section: 'B', capacity: 30, status: 'open',
      course: { id: 5, course_code: 'CS102', course_title: 'Networks', units: 3, status: 'active' },
      academic_term: term,
    },
    grade: null,
  },
]
const record: AcademicRecord = {
  student: {
    id: 76,
    program_id: 1,
    student_number: '2026-00076',
    first_name: 'Mateo',
    last_name: 'Abernathy',
    year_level: 2,
    status: 'active',
    program: { id: 1, code: 'BSIT', name: 'Information Technology', status: 'active' },
  },
  terms: [{ term, enrollments, total_units: 6 }],
}

describe('student record tabs', () => {
  it('switches this student’s records in place without changing the URL', async () => {
    const wrapper = await mountSuspended(StudentRecordTabs, { props: { record } })
    const url = window.location.href

    expect(wrapper.get('#student-panel-overview').attributes('style') ?? '').not.toContain('display: none')
    expect(wrapper.get('#student-panel-enrollments').attributes('style')).toContain('display: none')

    await wrapper.get('#student-tab-enrollments').trigger('click')
    expect(wrapper.get('#student-panel-enrollments').attributes('style') ?? '').not.toContain('display: none')
    expect(wrapper.get('#student-panel-enrollments').text()).toContain('CS101')
    expect(wrapper.get('#student-panel-enrollments').text()).toContain('Networks')
    expect(wrapper.get('#student-tab-enrollments').attributes('aria-selected')).toBe('true')

    await wrapper.get('#student-tab-grades').trigger('click')
    expect(wrapper.get('#student-panel-grades').attributes('style') ?? '').not.toContain('display: none')
    expect(wrapper.get('#student-panel-grades').text()).toContain('1.75')
    expect(wrapper.get('#student-panel-grades').text()).toContain('Not encoded')

    await wrapper.get('#student-tab-academic-record').trigger('click')
    expect(wrapper.get('#student-panel-academic-record').attributes('style') ?? '').not.toContain('display: none')
    expect(wrapper.get('#student-panel-academic-record').text()).toContain('Academic year 2026-2027')
    expect(window.location.href).toBe(url)
    wrapper.unmount()
  })

  it('shows empty states for a student without enrollments', async () => {
    const wrapper = await mountSuspended(StudentRecordTabs, { props: { record: { ...record, terms: [] } } })
    await wrapper.get('#student-tab-enrollments').trigger('click')
    expect(wrapper.get('#student-panel-enrollments').text()).toContain('No enrollments')
    await wrapper.get('#student-tab-grades').trigger('click')
    expect(wrapper.get('#student-panel-grades').text()).toContain('No grades')
    wrapper.unmount()
  })
})
