<script setup lang="ts">
import type { TableColumn } from '~/types/ui'; import { formatDate, formatTerm } from '~/utils/formatters'
definePageMeta({ middleware: 'auth' })
const route = useRoute(); const { list } = useEnrollments()
const query = computed(() => ({ search: String(route.query.search ?? ''), status: String(route.query.status ?? ''), page: Number(route.query.page ?? 1) }))
const { data: result } = await useAsyncData('enrollments-list', () => list(query.value), { watch: [query] })
const columns: TableColumn[] = [{ key: 'student', label: 'Student' }, { key: 'course', label: 'Course' }, { key: 'section', label: 'Section' }, { key: 'term', label: 'Academic term' }, { key: 'enrollment_date', label: 'Enrollment date' }, { key: 'status', label: 'Status' }, { key: 'actions', label: 'Actions', align: 'right' }]
const rows = computed(() => (result.value?.data ?? []).map(enrollment => ({ id: enrollment.id, student: `${enrollment.student?.last_name}, ${enrollment.student?.first_name}`, course: enrollment.course_offering?.course?.course_code, section: enrollment.course_offering?.section, term: `${enrollment.course_offering?.academic_term?.academic_year} · ${formatTerm(enrollment.course_offering?.academic_term?.term ?? '')}`, enrollment_date: formatDate(enrollment.enrollment_date), status: enrollment.status, actions: '' })))
</script>
<template><ResourceList title="Enrollments" description="Track student course registrations and status." :columns="columns" :rows="rows" base-path="/enrollments" create-label="Enroll student" search-placeholder="Search enrollments…" :status-options="[{ label: 'Enrolled', value: 'enrolled' }, { label: 'Completed', value: 'completed' }, { label: 'Dropped', value: 'dropped' }, { label: 'Withdrawn', value: 'withdrawn' }]" :page="result?.meta.current_page" :last-page="result?.meta.last_page" :total="result?.meta.total" /></template>
