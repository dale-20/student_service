<script setup lang="ts">
import type { TableColumn } from '~/types/ui'
definePageMeta({ middleware: 'auth' })
const route = useRoute(); const { list } = useCourses()
const query = computed(() => ({ search: String(route.query.search ?? ''), status: String(route.query.status ?? ''), page: Number(route.query.page ?? 1) }))
const { data: result, status: fetchStatus, error, refresh } = await useAsyncData('courses-list', () => list(query.value), { watch: [query] })
const columns: TableColumn[] = [{ key: 'course_code', label: 'Course code' }, { key: 'course_title', label: 'Course title' }, { key: 'units', label: 'Units' }, { key: 'status', label: 'Status' }, { key: 'actions', label: 'Actions', align: 'right' }]
const rows = computed(() => (result.value?.data ?? []).map(course => ({ id: course.id, course_code: course.course_code, course_title: course.course_title, units: course.units, status: course.status, actions: '' })))
</script>
<template><ResourceList :loading="fetchStatus === 'pending'" :error="error?.message" :per-page="result?.meta.per_page" title="Courses" description="Maintain the institutional course catalog." :columns="columns" :rows="rows" base-path="/courses" detail-action="edit-only" create-label="Add course" search-placeholder="Search courses…" :status-options="[{ label: 'Active', value: 'active' }, { label: 'Inactive', value: 'inactive' }]" :page="result?.meta.current_page" :last-page="result?.meta.last_page" :total="result?.meta.total" @refresh="refresh()" /></template>
