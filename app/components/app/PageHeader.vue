<script setup lang="ts">
defineProps<{ title: string; description?: string }>()
</script>

<template>
  <header class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
    <div><h1 class="text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">{{ title }}</h1><p v-if="description" class="mt-1 text-sm text-slate-500 sm:text-base">{{ description }}</p></div>
    <div v-if="$slots.actions" class="flex flex-wrap gap-2"><slot name="actions" /></div>
  </header>
</template>
