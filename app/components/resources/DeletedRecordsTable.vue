<script setup lang="ts">
import type { DeletedRecord } from '~/types/recovery'
import { formatDate } from '~/utils/formatters'

const props = defineProps<{ records: DeletedRecord[]; restoringId: number | null }>()
const emit = defineEmits<{ restore: [record: DeletedRecord] }>()
const columns = [{ key: 'label', label: 'Record' }, { key: 'detail', label: 'Details' }, { key: 'deleted_at', label: 'Deleted on' }, { key: 'actions', label: 'Recovery', align: 'right' as const }]
const rows = computed(() => props.records.map(record => ({ id: record.id, label: record.label, detail: record.detail, deleted_at: formatDate(record.deleted_at), actions: '' })))
function recover(id: number) {
  const record = props.records.find(item => item.id === id)
  if (record) emit('restore', record)
}
</script>

<template>
  <DataTable :columns="columns" :rows="rows">
    <template #cell-actions="{ row }">
      <BaseButton variant="secondary" :loading="restoringId === row.id" :disabled="restoringId !== null" :aria-label="`Recover ${row.label}`" @click="recover(Number(row.id))">Recover</BaseButton>
    </template>
  </DataTable>
</template>
