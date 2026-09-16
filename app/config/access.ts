import type { RoleSlug } from '~/types/domain'

export const routeAccess: Record<string, RoleSlug[]> = {
  '/students': ['administrator', 'registrar'],
  '/programs': ['administrator', 'registrar'],
  '/courses': ['administrator', 'registrar'],
  '/academic-terms': ['administrator', 'registrar'],
  '/course-offerings': ['administrator', 'registrar'],
  '/enrollments': ['administrator', 'registrar'],
  '/grades': ['administrator', 'registrar'],
  '/academic-record': ['registrar', 'student'],
  '/users': ['administrator'],
  '/settings': ['administrator'],
  '/my-course-offerings': ['instructor'],
  '/my-profile': ['student'],
  '/my-enrollments': ['student'],
  '/my-grades': ['student'],
}

export function rolesForPath(path: string): RoleSlug[] | undefined {
  const entry = Object.entries(routeAccess).find(([prefix]) => path === prefix || path.startsWith(`${prefix}/`))
  return entry?.[1]
}
