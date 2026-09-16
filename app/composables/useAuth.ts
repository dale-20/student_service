import type { ApiProblem, ApiResponse } from '~/types/api'
import type { User } from '~/types/domain'

export function useAuth() {
  const user = useState<User | null>('auth-user', () => null)
  const initialized = useState('auth-initialized', () => false)
  const loading = useState('auth-loading', () => false)
  const { request } = useApi()

  const isAuthenticated = computed(() => user.value !== null)
  const role = computed(() => user.value?.role.slug ?? null)

  async function restore(force = false): Promise<void> {
    if ((initialized.value && !force) || loading.value) return
    loading.value = true
    try {
      const response = await request<ApiResponse<User>>('/auth/me')
      user.value = response.data
    }
    catch (error: unknown) {
      if ((error as ApiProblem).status !== 401) throw error
      user.value = null
    }
    finally {
      initialized.value = true
      loading.value = false
    }
  }

  async function login(email: string, password: string): Promise<User> {
    const response = await request<ApiResponse<User>>('/auth/login', { method: 'POST', body: { email, password } })
    user.value = response.data
    initialized.value = true
    return response.data
  }

  async function changePassword(payload: { current_password: string; password: string; password_confirmation: string }): Promise<void> {
    const response = await request<ApiResponse<User>>('/auth/password', { method: 'PUT', body: payload })
    user.value = response.data
  }

  async function logout(): Promise<void> {
    try { await request('/auth/logout', { method: 'POST' }) }
    finally {
      user.value = null
      initialized.value = true
      await navigateTo('/login')
    }
  }

  return { user: readonly(user), initialized: readonly(initialized), loading: readonly(loading), isAuthenticated, role, restore, login, changePassword, logout }
}
