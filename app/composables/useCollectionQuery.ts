export function useCollectionQuery() {
  const route = useRoute()
  const router = useRouter()
  const search = ref(typeof route.query.search === 'string' ? route.query.search : '')
  const status = ref(typeof route.query.status === 'string' ? route.query.status : '')
  const page = computed(() => Number(route.query.page ?? 1))

  async function updateQuery(changes: Record<string, string | number | undefined>): Promise<void> {
    const query = Object.fromEntries(Object.entries({ ...route.query, ...changes })
      .filter(([, value]) => value !== '' && value !== undefined && value !== 1)
      .map(([key, value]) => [key, String(value)]))
    await router.replace({ query })
  }

  watchDebounced(search, value => updateQuery({ search: value, page: 1 }), 300)
  watch(status, value => updateQuery({ status: value, page: 1 }))

  return { search, status, page, updateQuery }
}

function watchDebounced<T>(source: Ref<T>, callback: (value: T) => void, delay: number): void {
  let timeout: ReturnType<typeof setTimeout> | undefined
  watch(source, value => {
    clearTimeout(timeout)
    timeout = setTimeout(() => callback(value), delay)
  })
}
