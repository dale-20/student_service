export type TableRow = Record<string, string | number | null | undefined>

export function useTableRows(source: MaybeRefOrGetter<TableRow[]>) {
  const route = useRoute()
  return computed(() => {
    const search = typeof route.query.search === 'string' ? route.query.search.toLowerCase() : ''
    const status = typeof route.query.status === 'string' ? route.query.status : ''
    return toValue(source).filter(row => (!search || Object.values(row).some(value => String(value ?? '').toLowerCase().includes(search))) && (!status || row.status === status))
  })
}
