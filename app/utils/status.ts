export type StatusTone = 'success' | 'info' | 'warning' | 'danger' | 'neutral'

const statusTones: Record<string, StatusTone> = {
  active: 'success', enrolled: 'success', open: 'success', passed: 'success',
  completed: 'info', scheduled: 'info', upcoming: 'info', ongoing: 'info',
  pending: 'warning', withdrawn: 'warning', incomplete: 'warning',
  suspended: 'danger', failed: 'danger', dropped: 'danger', cancelled: 'danger',
  inactive: 'neutral', closed: 'neutral',
}

export function statusTone(status: string): StatusTone {
  return statusTones[status.toLowerCase()] ?? 'neutral'
}
