export interface ToastMessage { id: number; title: string; message?: string; tone: 'success' | 'error' | 'info' }

let nextToastId = 1

export function useToasts() {
  const toasts = useState<ToastMessage[]>('app-toasts', () => [])
  const { preferences } = usePreferences()

  function show(title: string, options: { message?: string; tone?: ToastMessage['tone'] } = {}): void {
    if (!preferences.value.notifications && (options.tone ?? 'success') !== 'error') return
    const id = nextToastId++
    toasts.value.push({ id, title, message: options.message, tone: options.tone ?? 'success' })
    setTimeout(() => remove(id), 4500)
  }

  function remove(id: number): void {
    toasts.value = toasts.value.filter(toast => toast.id !== id)
  }

  return { toasts, show, remove }
}
