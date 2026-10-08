<script setup lang="ts">
import { Eye, Pencil, Plus } from '@lucide/vue'
import type { TableColumn } from '~/types/ui'
import { recoveryTypes } from '~/types/recovery'

const props = defineProps<{ title: string; description: string; columns: TableColumn[]; rows: Record<string, string | number | null | undefined>[]; basePath: string; detailAction?: 'view-and-edit' | 'edit-only'; editSuffix?: '/edit' | ''; createLabel?: string; searchPlaceholder?: string; total?: number; page?: number; lastPage?: number; perPage?: number; statusOptions?: { label: string; value: string }[]; loading?: boolean; error?: string }>()
const emit = defineEmits<{ refresh: [] }>()
const { search, status, updateQuery } = useCollectionQuery()
const recordType = computed(() => recoveryTypes.find(item => `/${item.value}` === props.basePath)?.value)
const detailAction = computed(() => props.detailAction ?? 'view-and-edit')
const editSuffix = computed(() => props.editSuffix ?? '/edit')
function rowLabel(row: Record<string, string | number | null | undefined>): string {
  return String(row.name ?? row.student ?? row.course_title ?? row.course ?? row.code ?? row.course_code ?? row.section ?? row.academic_year ?? `record #${row.id}`)
}
async function deleted() {
  if (props.rows.length === 1 && (props.page ?? 1) > 1) await updateQuery({ page: (props.page ?? 1) - 1 })
  emit('refresh')
}
</script>

<template>
  <div class="page-shell">
    <PageHeader :title="title" :description="description"><template #actions><BaseButton :to="`${basePath}/create`"><Plus class="size-4" />{{ createLabel ?? 'Create' }}</BaseButton></template></PageHeader>
    <div class="flex flex-col gap-3 sm:flex-row"><SearchInput v-model="search" :placeholder="searchPlaceholder" /><BaseSelect v-if="statusOptions" id="status-filter" v-model="status" class="sm:max-w-48" :options="statusOptions" placeholder="All statuses" aria-label="Filter by status" /></div>
    <LoadingState v-if="loading" />
    <ErrorState v-else-if="error" :message="error"><template #action><BaseButton variant="secondary" @click="emit('refresh')">Try again</BaseButton></template></ErrorState>
    <EmptyState v-else-if="rows.length === 0" :title="`No ${title.toLowerCase()} found`" description="Try adjusting your search or filters."><template #action><BaseButton :to="`${basePath}/create`">{{ createLabel ?? 'Create' }}</BaseButton></template></EmptyState>
    <template v-else>
      <DataTable :columns="columns" :rows="rows">
        <template #cell-status="{ value }"><StatusBadge :status="String(value)" /></template>
        <template #cell-actions="{ row }">
          <div class="flex flex-wrap items-center justify-end gap-2">
            <BaseButton v-if="detailAction === 'view-and-edit'" :to="basePath + '/' + row.id" variant="ghost" icon-only :aria-label="'View ' + rowLabel(row)" :title="'View ' + rowLabel(row)"><Eye class="size-4" aria-hidden="true" /></BaseButton>
            <BaseButton :to="basePath + '/' + row.id + editSuffix" variant="ghost" icon-only :aria-label="'Edit ' + rowLabel(row)" :title="'Edit ' + rowLabel(row)"><Pencil class="size-4" aria-hidden="true" /></BaseButton>
            <DeleteRecordButton v-if="recordType" :type="recordType" :record-id="Number(row.id)" :label="rowLabel(row)" @deleted="deleted" />
          </div>
        </template>
      </DataTable>
      <DataTablePagination :page="page ?? 1" :last-page="lastPage ?? 1" :total="total ?? rows.length" :per-page="perPage ?? 20" @change="nextPage => updateQuery({ page: nextPage })" />
    </template>
  </div>
</template>
