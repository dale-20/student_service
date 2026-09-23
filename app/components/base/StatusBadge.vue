<script setup lang="ts">
import { Circle } from '@lucide/vue'
import { formatStatus } from '~/utils/formatters'
import { statusTone } from '~/utils/status'

const props = defineProps<{ status: string }>()
const classes = {
  success: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  info: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  warning: 'bg-amber-50 text-amber-800 ring-amber-600/20',
  danger: 'bg-red-50 text-red-700 ring-red-600/20',
  neutral: 'bg-slate-100 text-slate-700 ring-slate-500/20',
}
const tone = computed(() => statusTone(props.status))
</script>

<template>
  <span class="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold ring-1 ring-inset" :class="classes[tone]">
    <Circle class="size-1.5 fill-current" aria-hidden="true" />{{ formatStatus(status) }}
  </span>
</template>
