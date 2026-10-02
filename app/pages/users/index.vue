<script setup lang="ts">
import type { TableColumn } from '~/types/ui'; import { formatDate } from '~/utils/formatters'
definePageMeta({ middleware: 'auth' })
const route = useRoute(); const { list } = useUsers()
const query = computed(() => ({ search: String(route.query.search ?? ''), status: String(route.query.status ?? ''), page: Number(route.query.page ?? 1) }))
const { data: result, status: fetchStatus, error, refresh } = await useAsyncData('users-list', () => list(query.value), { watch: [query] })
const columns: TableColumn[] = [{ key: 'name', label: 'Name' }, { key: 'email', label: 'Email' }, { key: 'role', label: 'Role' }, { key: 'status', label: 'Status' }, { key: 'last_login', label: 'Last login' }, { key: 'actions', label: 'Actions', align: 'right' }]
const rows = computed(() => (result.value?.data ?? []).map(user => ({ id: user.id, name: user.name, email: user.email, role: user.role.name, status: user.status, last_login: user.last_login_at ? formatDate(user.last_login_at) : 'Never', actions: '' })))
</script>
<template><ResourceList :loading="fetchStatus === 'pending'" :error="error?.message" :per-page="result?.meta.per_page" title="Users" description="Manage application accounts and role assignments." :columns="columns" :rows="rows" base-path="/users" create-label="Add user" search-placeholder="Search users…" :status-options="[{ label: 'Active', value: 'active' }, { label: 'Inactive', value: 'inactive' }, { label: 'Suspended', value: 'suspended' }]" :page="result?.meta.current_page" :last-page="result?.meta.last_page" :total="result?.meta.total" @refresh="refresh()" /></template>
