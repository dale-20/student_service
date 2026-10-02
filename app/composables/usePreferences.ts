export interface InterfacePreferences { notifications: boolean; compactTables: boolean }

export function usePreferences() {
  const preferences = useCookie<InterfacePreferences>('studentis-interface', {
    default: () => ({ notifications: true, compactTables: false }),
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    watch: true,
  })
  return { preferences }
}
