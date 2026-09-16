export default defineNuxtRouteMiddleware(async () => {
  const { isAuthenticated, restore, user } = useAuth()
  await restore()
  if (isAuthenticated.value) return navigateTo(user.value?.must_change_password ? '/change-password' : '/dashboard')
})
