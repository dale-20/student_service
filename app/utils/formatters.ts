export function formatDate(value?: string | null): string {
  if (!value) return '—'
  return new Intl.DateTimeFormat('en-PH', { dateStyle: 'medium', timeZone: 'Asia/Manila' }).format(new Date(value))
}

export function formatTerm(value: string): string {
  return value.split('_').map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(' ')
}

export function formatStatus(value: string): string {
  return value.replaceAll('_', ' ').replace(/\b\w/g, character => character.toUpperCase())
}

export function initials(name: string): string {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]?.toUpperCase()).join('')
}
