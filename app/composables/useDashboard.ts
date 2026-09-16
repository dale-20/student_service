export function useDashboard<T = Record<string, unknown>>() {
  const { request } = useApi()
  const get = async () => (await request<{ data: T }>('/dashboard')).data

  return { get }
}
