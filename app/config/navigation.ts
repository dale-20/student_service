import { BookOpen, BookUser, CalendarDays, ClipboardList, FileText, GraduationCap, LayoutDashboard, Library, Settings, ShieldCheck, UserRound, Users } from '@lucide/vue'
import type { NavigationGroup } from '~/types/navigation'

const allRoles = ['administrator', 'registrar', 'instructor', 'student'] as const

export const navigationGroups: NavigationGroup[] = [
  { items: [{ label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard, roles: [...allRoles] }] },
  { label: 'Academic', items: [
    { label: 'Students', to: '/students', icon: GraduationCap, roles: ['administrator', 'registrar'] },
    { label: 'Programs', to: '/programs', icon: Library, roles: ['administrator', 'registrar'] },
    { label: 'Courses', to: '/courses', icon: BookOpen, roles: ['administrator', 'registrar'] },
    { label: 'Academic Terms', to: '/academic-terms', icon: CalendarDays, roles: ['administrator', 'registrar'] },
    { label: 'Course Offerings', to: '/course-offerings', icon: ClipboardList, roles: ['administrator', 'registrar'] },
    { label: 'My Course Offerings', to: '/my-course-offerings', icon: BookOpen, roles: ['instructor'] },
    { label: 'My Profile', to: '/my-profile', icon: UserRound, roles: ['student'] },
  ] },
  { label: 'Records', items: [
    { label: 'Enrollments', to: '/enrollments', icon: BookUser, roles: ['administrator', 'registrar'] },
    { label: 'Grades', to: '/grades', icon: FileText, roles: ['administrator', 'registrar'] },
    { label: 'Academic Records', to: '/academic-record', icon: FileText, roles: ['registrar', 'student'] },
    { label: 'My Enrollments', to: '/my-enrollments', icon: BookUser, roles: ['student'] },
    { label: 'My Grades', to: '/my-grades', icon: FileText, roles: ['student'] },
  ] },
  { label: 'Administration', items: [
    { label: 'Users', to: '/users', icon: Users, roles: ['administrator'] },
    { label: 'Settings', to: '/settings', icon: Settings, roles: ['administrator'] },
  ] },
  { label: 'Account', items: [{ label: 'Profile', to: '/profile', icon: ShieldCheck, roles: ['administrator', 'registrar', 'instructor'] }] },
]
