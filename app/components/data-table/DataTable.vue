<script setup lang="ts">
import type { TableColumn } from '~/types/ui'
defineProps<{ columns: TableColumn[]; rows: Record<string, string | number | null | undefined>[]; rowKey?: string }>()
</script>

<template><div class="surface overflow-hidden"><div class="overflow-x-auto"><table class="w-full min-w-[720px] border-collapse text-left text-sm"><thead class="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th v-for="column in columns" :key="column.key" class="border-b border-slate-200 px-5 py-3 font-semibold" :class="column.align === 'right' && 'text-right'">{{ column.label }}</th></tr></thead><tbody><tr v-for="(row, index) in rows" :key="String(row[rowKey ?? 'id'] ?? index)" class="border-b border-slate-100 transition hover:bg-slate-50/70 last:border-0"><td v-for="column in columns" :key="column.key" class="h-14 px-5 py-3 text-slate-700" :class="column.align === 'right' && 'text-right'"><slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]">{{ row[column.key] ?? '—' }}</slot></td></tr></tbody></table></div></div></template>
