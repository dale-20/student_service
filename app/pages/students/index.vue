<script setup lang="ts">
import type { TableColumn } from '~/types/ui'
definePageMeta({ middleware: 'auth' })
useSeoMeta({ title: 'Students · StudentServe' })
const route = useRoute()
const { list } = useStudents()
const filters = computed(() => ({ search: typeof route.query.search === 'string' ? route.query.search : undefined, status: typeof route.query.status === 'string' ? route.query.status : undefined, page: Number(route.query.page ?? 1), per_page: 10 }))
const { data: result, status: fetchStatus, error, refresh } = await useAsyncData('students-list', () => list(filters.value), { watch: [filters] })
const columns: TableColumn[] = [{ key: 'student_number', label: 'Student number' }, { key: 'student', label: 'Student' }, { key: 'program', label: 'Program' }, { key: 'year_level', label: 'Year level' }, { key: 'status', label: 'Status' }, { key: 'actions', label: 'Actions', align: 'right' }]
const rows = computed(() => (result.value?.data ?? []).map(student => ({ id: student.id, student_number: student.student_number, student: `${student.last_name}, ${student.first_name}`, program: student.program?.code ?? '—', year_level: `Year ${student.year_level}`, status: student.status, actions: '' })))
</script>
<template><ResourceList :loading="fetchStatus === 'pending'" :error="error?.message" :per-page="result?.meta.per_page" title="Students" description="Manage student profiles and academic information." :columns="columns" :rows="rows" base-path="/students" create-label="Add student" search-placeholder="Search students…" :status-options="[{ label: 'Active', value: 'active' }, { label: 'Inactive', value: 'inactive' }, { label: 'Graduated', value: 'graduated' }]" :page="result?.meta.current_page" :last-page="result?.meta.last_page" :total="result?.meta.total" @refresh="refresh()" /></template>
