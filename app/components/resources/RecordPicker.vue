<script setup lang="ts">
import type { RecordOption, RecordOptionLoader } from '~/types/selection'

const props = defineProps<{ id: string; label: string; load: RecordOptionLoader; initial?: RecordOption; disabled?: boolean; error?: string }>()
const model = defineModel<number | ''>({ required: true })
const emit = defineEmits<{ select: [option: RecordOption | undefined] }>()
const search = ref('')
const page = ref(1)
const selected = ref(props.initial)
const { data, status, error: loadError, refresh } = await useAsyncData(`picker-${props.id}`, () => props.load({ search: search.value, page: page.value, per_page: 20 }), { watch: [search, page] })
watch(search, () => { page.value = 1 })
const options = computed(() => {
  const rows = data.value?.data ?? []
  const items = selected.value && !rows.some(item => item.id === selected.value?.id) ? [selected.value, ...rows] : rows
  return items.map(item => ({ label: item.label, value: item.id }))
})
watch(model, value => {
  if (!value) selected.value = undefined
  else selected.value = data.value?.data.find(item => item.id === value) ?? selected.value
  emit('select', selected.value)
})
</script>

<template>
  <fieldset class="space-y-3" :disabled="disabled">
    <legend class="mb-2 text-sm font-semibold">{{ label }}</legend>
    <label :for="`${id}-search`" class="sr-only">Search {{ label.toLowerCase() }}</label>
    <BaseInput :id="`${id}-search`" v-model="search" type="search" :placeholder="`Search ${label.toLowerCase()}…`" :disabled="disabled" />
    <p v-if="status === 'pending'" role="status" class="text-sm text-muted">Loading options…</p>
    <div v-if="loadError" role="alert" class="space-y-2"><p class="text-sm text-red-700">{{ loadError.message }}</p><BaseButton variant="secondary" @click="refresh()">Try again</BaseButton></div>
    <template v-else>
      <FormField :for="id" :label="`Select ${label.toLowerCase()}`" :error="error"><BaseSelect :id="id" v-model="model" :options="options" :disabled="disabled || status === 'pending'" /></FormField>
      <p v-if="status !== 'pending' && !data?.data.length" class="text-sm text-muted">No matching records. Try another search.</p>
      <DataTablePagination v-if="data && data.meta.last_page > 1" :page="data.meta.current_page" :last-page="data.meta.last_page" :total="data.meta.total" :per-page="data.meta.per_page" @change="value => page = value" />
    </template>
  </fieldset>
</template>
