import type { User } from '~/types/domain'

export interface UserPayload { role_id: number; name: string; email: string; status: string; password?: string; password_confirmation?: string }

export function useUsers() {
  const resource = useResourceApi<User, UserPayload>('/users')
  const { request } = useApi()
  const resetPassword = (id: number, password: string, passwordConfirmation: string) => request(`/users/${id}/password`, { method: 'PUT', body: { password, password_confirmation: passwordConfirmation } })

  return { ...resource, resetPassword }
}
