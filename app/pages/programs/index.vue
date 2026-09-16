<script setup lang="ts">
import type { TableColumn } from '~/types/ui'
definePageMeta({ middleware: 'auth' })
const route = useRoute(); const { list } = usePrograms()
const query = computed(() => ({ search: String(route.query.search ?? ''), status: String(route.query.status ?? ''), page: Number(route.query.page ?? 1) }))
const { data: result } = await useAsyncData('programs-list', () => list(query.value), { watch: [query] })
const columns: TableColumn[] = [{ key: 'code', label: 'Code' }, { key: 'name', label: 'Program name' }, { key: 'students', label: 'Students' }, { key: 'courses', label: 'Courses' }, { key: 'status', label: 'Status' }, { key: 'actions', label: 'Actions', align: 'right' }]
const rows = computed(() => (result.value?.data ?? []).map(program => ({ id: program.id, code: program.code, name: program.name, students: program.students_count, courses: program.courses_count, status: program.status, actions: '' })))
</script>
<template><ResourceList title="Programs" description="Manage academic programs and curricula." :columns="columns" :rows="rows" base-path="/programs" create-label="Add program" search-placeholder="Search programs…" :status-options="[{ label: 'Active', value: 'active' }, { label: 'Inactive', value: 'inactive' }]" :page="result?.meta.current_page" :last-page="result?.meta.last_page" :total="result?.meta.total" /></template>
