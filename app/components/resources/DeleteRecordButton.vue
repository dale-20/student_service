<script setup lang="ts">
import type { ApiProblem } from '~/types/api'
import type { RecoverableType } from '~/types/recovery'

const props = defineProps<{ type: RecoverableType; recordId: number; label: string }>()
const emit = defineEmits<{ deleted: [] }>()
const { remove } = useRecovery()
const { show } = useToasts()
const confirming = ref(false)
const deleting = ref(false)
const error = ref('')

async function confirm(): Promise<void> {
  if (deleting.value) return
  deleting.value = true
  error.value = ''
  try {
    await remove(props.type, props.recordId)
    show('Record moved to Deleted records.')
    confirming.value = false
    emit('deleted')
  }
  catch (failure) {
    error.value = (failure as ApiProblem).message
  }
  finally {
    deleting.value = false
  }
}
</script>

<template>
  <div class="inline-block max-w-sm text-left">
    <BaseButton v-if="!confirming" variant="ghost" :aria-label="`Delete ${label}`" @click="confirming = true">Delete</BaseButton>
    <div v-else class="space-y-3" @keydown.esc="!deleting && (confirming = false)">
      <p class="text-sm">Move <strong>{{ label }}</strong> to Deleted records? You can recover it later.</p>
      <p v-if="error" role="alert" class="text-sm text-red-700">{{ error }}</p>
      <div class="flex flex-wrap gap-2">
        <BaseButton variant="secondary" :disabled="deleting" @click="confirming = false; error = ''">Cancel</BaseButton>
        <BaseButton variant="danger" :loading="deleting" @click="confirm">Confirm delete</BaseButton>
      </div>
    </div>
  </div>
</template>
