<script setup lang="ts">
import type { TableColumn } from '~/types/ui'
definePageMeta({ middleware: 'auth' })
const route = useRoute(); const { list } = useCourseOfferings()
const query = computed(() => ({ search: String(route.query.search ?? ''), status: String(route.query.status ?? ''), page: Number(route.query.page ?? 1) }))
const { data: result, status: fetchStatus, error, refresh } = await useAsyncData('offerings-list', () => list(query.value), { watch: [query] })
const columns: TableColumn[] = [{ key: 'course', label: 'Course' }, { key: 'section', label: 'Section' }, { key: 'instructor', label: 'Instructor' }, { key: 'schedule', label: 'Schedule' }, { key: 'capacity', label: 'Students / Capacity' }, { key: 'status', label: 'Status' }, { key: 'actions', label: 'Actions', align: 'right' }]
const rows = computed(() => (result.value?.data ?? []).map(offering => ({ id: offering.id, course: `${offering.course?.course_code} · ${offering.course?.course_title}`, section: offering.section, instructor: offering.instructor?.name ?? 'Unassigned', schedule: `${offering.schedules?.[0]?.day_of_week ?? '—'} ${offering.schedules?.[0]?.start_time ?? ''}`, capacity: `${offering.enrolled_count ?? 0} / ${offering.capacity}`, status: offering.status, actions: '' })))
</script>
<template><ResourceList :loading="fetchStatus === 'pending'" :error="error?.message" :per-page="result?.meta.per_page" title="Course offerings" description="Manage scheduled classes for each academic term." :columns="columns" :rows="rows" base-path="/course-offerings" detail-action="edit-only" create-label="Create offering" search-placeholder="Search offerings…" :status-options="[{ label: 'Open', value: 'open' }, { label: 'Ongoing', value: 'ongoing' }, { label: 'Closed', value: 'closed' }]" :page="result?.meta.current_page" :last-page="result?.meta.last_page" :total="result?.meta.total" @refresh="refresh()" /></template>
