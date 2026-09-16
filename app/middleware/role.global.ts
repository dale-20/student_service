import { rolesForPath } from '~/config/access'

export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === '/login' || to.path === '/forbidden') return
  const allowedRoles = rolesForPath(to.path)
  if (!allowedRoles) return
  const { role, isAuthenticated, restore } = useAuth()
  await restore()
  if (isAuthenticated.value && (!role.value || !allowedRoles.includes(role.value))) return navigateTo('/forbidden')
})
