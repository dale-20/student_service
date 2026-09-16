<script setup lang="ts">
import { Plus } from '@lucide/vue'
import type { TableColumn } from '~/types/ui'

defineProps<{ title: string; description: string; columns: TableColumn[]; rows: Record<string, string | number | null | undefined>[]; basePath: string; createLabel?: string; searchPlaceholder?: string; total?: number; page?: number; lastPage?: number; statusOptions?: { label: string; value: string }[] }>()
const { search, status, updateQuery } = useCollectionQuery()
</script>

<template><div class="page-shell"><PageHeader :title="title" :description="description"><template #actions><BaseButton :to="`${basePath}/create`"><Plus class="size-4" />{{ createLabel ?? 'Create' }}</BaseButton></template></PageHeader><div class="flex flex-col gap-3 sm:flex-row"><SearchInput v-model="search" :placeholder="searchPlaceholder" /><BaseSelect v-if="statusOptions" id="status-filter" v-model="status" class="sm:max-w-48" :options="statusOptions" placeholder="All statuses" /></div><EmptyState v-if="rows.length === 0" :title="`No ${title.toLowerCase()} found`" description="Try adjusting your search or filters."><template #action><BaseButton :to="`${basePath}/create`">{{ createLabel ?? 'Create' }}</BaseButton></template></EmptyState><template v-else><DataTable :columns="columns" :rows="rows"><template #cell-status="{ value }"><StatusBadge :status="String(value)" /></template><template #cell-actions="{ row }"><BaseButton :to="`${basePath}/${row.id}`" variant="ghost">View</BaseButton></template></DataTable><DataTablePagination :page="page ?? 1" :last-page="lastPage ?? 1" :total="total ?? rows.length" @change="nextPage => updateQuery({ page: nextPage })" /></template></div></template>
