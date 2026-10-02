<script setup lang="ts">
import type { ApiProblem } from '~/types/api'
import { recoveryTypes, type DeletedRecord, type RecoverableType } from '~/types/recovery'

definePageMeta({ middleware: 'auth' })
const route = useRoute()
const { role } = useAuth()
const { list, restore } = useRecovery()
const { search, updateQuery } = useCollectionQuery()
const types = computed(() => recoveryTypes.filter(item => item.value !== 'users' || role.value === 'administrator'))
const type = computed<RecoverableType>(() => types.value.find(item => item.value === route.query.type)?.value ?? 'students')
const selectedType = computed({ get: () => type.value, set: value => { void updateQuery({ type: value, page: 1 }) } })
const query = computed(() => ({ search: String(route.query.search ?? ''), page: Number(route.query.page ?? 1), per_page: 20 }))
const { data: result, status, error, refresh } = await useAsyncData('deleted-records', () => list(type.value, query.value), { watch: [type, query] })
const restoringId = ref<number | null>(null)
const recoveryError = ref('')
const success = ref('')
watch(type, () => { recoveryError.value = ''; success.value = '' })

async function recover(record: DeletedRecord): Promise<void> {
  if (restoringId.value !== null) return
  restoringId.value = record.id
  recoveryError.value = ''
  success.value = ''
  try {
    await restore(record.type, record.id)
    success.value = `${record.label} was recovered.`
    await refresh()
    if (!result.value?.data.length && query.value.page > 1) await updateQuery({ page: query.value.page - 1 })
  }
  catch (failure) {
    recoveryError.value = (failure as ApiProblem).message
  }
  finally {
    restoringId.value = null
  }
}
</script>

<template>
  <div class="page-shell">
    <PageHeader title="Deleted records" description="Find and recover records removed from the workspace." />
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end">
      <FormField for="deleted-type" label="Record type" class="sm:w-64"><BaseSelect id="deleted-type" v-model="selectedType" :options="types" /></FormField>
      <SearchInput v-model="search" placeholder="Search deleted records…" />
    </div>
    <p class="text-sm text-muted">Recovery keeps the original record and its links. Recover deleted parent records first when prompted. Grades cannot be deleted.</p>
    <p v-if="success" role="status" class="text-sm text-green-800">{{ success }}</p>
    <p v-if="recoveryError" role="alert" class="text-sm text-red-700">{{ recoveryError }}</p>
    <LoadingState v-if="status === 'pending'" />
    <ErrorState v-else-if="error" :message="error.message"><template #action><BaseButton variant="secondary" @click="refresh()">Try again</BaseButton></template></ErrorState>
    <EmptyState v-else-if="!result?.data.length" title="No deleted records found" description="Deleted records of this type will appear here. Try a different type or search." />
    <template v-else>
      <DeletedRecordsTable :records="result.data" :restoring-id="restoringId" @restore="recover" />
      <DataTablePagination :page="result.meta.current_page" :last-page="result.meta.last_page" :total="result.meta.total" :per-page="result.meta.per_page" @change="page => updateQuery({ page })" />
    </template>
  </div>
</template>
