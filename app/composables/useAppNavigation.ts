import { navigationGroups } from '~/config/navigation'

export function useAppNavigation() {
  const { role } = useAuth()
  const groups = computed(() => navigationGroups
    .map(group => ({ ...group, items: group.items.filter(item => role.value && item.roles.includes(role.value)) }))
    .filter(group => group.items.length > 0))
  return { groups }
}
