export default defineNuxtRouteMiddleware(async (to) => {
  const { isAuthenticated, restore, user } = useAuth()
  await restore()
  if (!isAuthenticated.value) return navigateTo('/login')
  if (user.value?.must_change_password && to.path !== '/change-password') return navigateTo('/change-password')
})
