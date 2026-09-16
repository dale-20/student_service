import { describe, expect, it } from 'vitest'
import { navigationGroups } from '../../app/config/navigation'
import { rolesForPath } from '../../app/config/access'
import { formatStatus, formatTerm, initials } from '../../app/utils/formatters'
import { statusTone } from '../../app/utils/status'

describe('role-aware navigation', () => {
  it('keeps administrator-only navigation hidden from students', () => {
    const studentLinks = navigationGroups.flatMap(group => group.items).filter(item => item.roles.includes('student')).map(item => item.to)
    expect(studentLinks).toContain('/my-grades')
    expect(studentLinks).not.toContain('/users')
    expect(studentLinks).not.toContain('/students')
  })

  it('maps protected route prefixes to their allowed roles', () => {
    expect(rolesForPath('/users/5')).toEqual(['administrator'])
    expect(rolesForPath('/my-course-offerings/2/grades')).toEqual(['instructor'])
  })
})

describe('shared presentation mappings', () => {
  it('formats consistent labels and initials', () => {
    expect(formatTerm('first_semester')).toBe('First Semester')
    expect(formatStatus('in_progress')).toBe('In Progress')
    expect(initials('Juan Dela Cruz')).toBe('JD')
  })

  it('uses centralized semantic status tones', () => {
    expect(statusTone('enrolled')).toBe('success')
    expect(statusTone('withdrawn')).toBe('warning')
    expect(statusTone('failed')).toBe('danger')
  })
})
