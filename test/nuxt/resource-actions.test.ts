import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ResourceList from '../../app/components/resources/ResourceList.vue'

const columns = [{ key: 'name', label: 'Name' }, { key: 'actions', label: 'Actions' }]

describe('resource list actions', () => {
  it('offers labeled View, Edit, and Delete icons for records with useful detail pages', async () => {
    const wrapper = await mountSuspended(ResourceList, { props: {
      title: 'Students',
      description: 'Student records',
      basePath: '/students',
      columns,
      rows: [{ id: 76, name: 'Mateo Abernathy', actions: '' }],
    } })

    expect(wrapper.get('a[aria-label="View Mateo Abernathy"]').attributes('href')).toBe('/students/76')
    expect(wrapper.get('a[aria-label="Edit Mateo Abernathy"]').attributes('href')).toBe('/students/76/edit')
    expect(wrapper.get('button[aria-label="Delete Mateo Abernathy"]').attributes('title')).toBe('Delete Mateo Abernathy')
    expect(wrapper.findAll('td svg')).toHaveLength(3)
    wrapper.unmount()
  })

  it('uses Edit directly for small records and the existing user form', async () => {
    const course = await mountSuspended(ResourceList, { props: {
      title: 'Courses',
      description: 'Course catalog',
      basePath: '/courses',
      detailAction: 'edit-only',
      columns,
      rows: [{ id: 4, name: 'Algebra', actions: '' }],
    } })
    expect(course.find('a[aria-label^="View "]').exists()).toBe(false)
    expect(course.get('a[aria-label="Edit Algebra"]').attributes('href')).toBe('/courses/4/edit')
    course.unmount()

    const users = await mountSuspended(ResourceList, { props: {
      title: 'Users',
      description: 'Accounts',
      basePath: '/users',
      detailAction: 'edit-only',
      editSuffix: '',
      columns,
      rows: [{ id: 9, name: 'Ada Instructor', actions: '' }],
    } })
    expect(users.find('a[aria-label^="View "]').exists()).toBe(false)
    expect(users.get('a[aria-label="Edit Ada Instructor"]').attributes('href')).toBe('/users/9')
    users.unmount()
  })
})
