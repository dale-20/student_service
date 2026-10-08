import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import CurriculumEditor from '../../app/components/programs/CurriculumEditor.vue'
import DeleteRecordButton from '../../app/components/resources/DeleteRecordButton.vue'

const mocks = vi.hoisted(() => ({ sync: vi.fn(), remove: vi.fn(), show: vi.fn() }))
mockNuxtImport('usePrograms', () => () => ({ syncCurriculum: mocks.sync }))
mockNuxtImport('useRecovery', () => () => ({ remove: mocks.remove }))
mockNuxtImport('useToasts', () => () => ({ show: mocks.show }))

beforeEach(() => { vi.resetAllMocks() })

describe('curriculum editing', () => {
  it('loads the existing curriculum and preserves its semester and optional flag when saving', async () => {
    mocks.sync.mockResolvedValue({})
    const wrapper = await mountSuspended(CurriculumEditor, { props: {
      programId: 1,
      curriculum: [{ id: 10, program_id: 1, course_id: 2, semester: 'first', year_level: 2, is_required: false }],
      courses: [{ id: 2, course_code: 'IT101', course_title: 'Computing', units: 3, status: 'active' }],
    } })
    expect(wrapper.get<HTMLSelectElement>('#curriculum-course-0').element.value).toBe('2')
    expect(wrapper.get<HTMLSelectElement>('#curriculum-semester-0').element.value).toBe('first')
    expect(wrapper.get<HTMLInputElement>('input[type=checkbox]').element.checked).toBe(false)
    await wrapper.get('form').trigger('submit')
    await flushPromises()
    expect(mocks.sync).toHaveBeenCalledWith(1, [{ course_id: 2, semester: 'first', year_level: 2, is_required: false }])
    expect(wrapper.text()).toContain('Curriculum saved')
    wrapper.unmount()
  })
})

describe('soft delete confirmation', () => {
  it('requires confirmation, prevents duplicate requests, and reports successful deletion', async () => {
    let finish: (() => void) | undefined
    mocks.remove.mockImplementation(() => new Promise<void>((resolve) => { finish = resolve }))
    const wrapper = await mountSuspended(DeleteRecordButton, { props: { type: 'courses', recordId: 4, label: 'IT101' } })
    expect(wrapper.get('button[aria-label="Delete IT101"]').attributes('title')).toBe('Delete IT101')
    expect(wrapper.find('button[aria-label="Delete IT101"] svg').exists()).toBe(true)
    await wrapper.get('button').trigger('click')
    expect(mocks.remove).not.toHaveBeenCalled()
    const confirm = wrapper.findAll('button').find(button => button.text() === 'Confirm delete')!
    await confirm.trigger('click')
    expect(mocks.remove).toHaveBeenCalledExactlyOnceWith('courses', 4)
    expect(confirm.attributes('disabled')).toBeDefined()
    finish?.()
    await flushPromises()
    expect(wrapper.emitted('deleted')).toHaveLength(1)
    wrapper.unmount()
  })

  it('keeps the record visible and explains a deletion conflict', async () => {
    mocks.remove.mockRejectedValue({ status: 409, message: 'This record has linked records.' })
    const wrapper = await mountSuspended(DeleteRecordButton, { props: { type: 'courses', recordId: 4, label: 'IT101' } })
    await wrapper.get('button').trigger('click')
    await wrapper.findAll('button').find(button => button.text() === 'Confirm delete')!.trigger('click')
    await flushPromises()
    expect(wrapper.get('[role=alert]').text()).toContain('linked records')
    expect(wrapper.emitted('deleted')).toBeUndefined()
    wrapper.unmount()
  })
})
