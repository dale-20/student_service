<script setup lang="ts">
import type { TableColumn } from '~/types/ui'
defineProps<{ columns: TableColumn[]; rows: Record<string, string | number | null | undefined>[]; rowKey?: string }>()
</script>

<template><div class="surface overflow-hidden"><div class="overflow-x-auto"><table class="w-full min-w-[720px] border-collapse text-left text-sm"><thead class="bg-[#f1f5f9] text-xs text-[#52677f]"><tr><th v-for="column in columns" :key="column.key" class="border-b border-[#d8e2ef] px-5 py-3.5 font-semibold" :class="column.align === 'right' && 'text-right'">{{ column.label }}</th></tr></thead><tbody><tr v-for="(row, index) in rows" :key="String(row[rowKey ?? 'id'] ?? index)" class="border-b border-[#e5ecf3] transition-colors duration-150 hover:bg-[#f7faff] last:border-0"><td v-for="column in columns" :key="column.key" class="h-14 px-5 py-3 text-[#29445f]" :class="column.align === 'right' && 'text-right'"><slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]">{{ row[column.key] ?? '—' }}</slot></td></tr></tbody></table></div></div></template>
