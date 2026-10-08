<script setup lang="ts">
import type { TableColumn } from '~/types/ui'; import { formatDate, formatTerm } from '~/utils/formatters'
definePageMeta({ middleware: 'auth' })
const route = useRoute(); const { list } = useAcademicTerms()
const query = computed(() => ({ search: String(route.query.search ?? ''), status: String(route.query.status ?? ''), page: Number(route.query.page ?? 1) }))
const { data: result, status: fetchStatus, error, refresh } = await useAsyncData('terms-list', () => list(query.value), { watch: [query] })
const columns: TableColumn[] = [{ key: 'academic_year', label: 'Academic year' }, { key: 'term', label: 'Term' }, { key: 'start_date', label: 'Start date' }, { key: 'end_date', label: 'End date' }, { key: 'status', label: 'Status' }, { key: 'actions', label: 'Actions', align: 'right' }]
const rows = computed(() => (result.value?.data ?? []).map(term => ({ id: term.id, academic_year: term.academic_year, term: formatTerm(term.term), start_date: formatDate(term.start_date), end_date: formatDate(term.end_date), status: term.status, actions: '' })))
</script>
<template><ResourceList :loading="fetchStatus === 'pending'" :error="error?.message" :per-page="result?.meta.per_page" title="Academic terms" description="Set academic calendars and active terms." :columns="columns" :rows="rows" base-path="/academic-terms" detail-action="edit-only" create-label="Add term" search-placeholder="Search terms…" :status-options="[{ label: 'Upcoming', value: 'upcoming' }, { label: 'Active', value: 'active' }, { label: 'Completed', value: 'completed' }]" :page="result?.meta.current_page" :last-page="result?.meta.last_page" :total="result?.meta.total" @refresh="refresh()" /></template>
