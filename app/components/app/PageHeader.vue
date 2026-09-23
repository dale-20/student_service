<script setup lang="ts">
defineProps<{ title: string; description?: string }>()
</script>

<template>
  <header class="flex flex-col gap-4 border-b border-[#d8e2ef] pb-5 sm:flex-row sm:items-start sm:justify-between">
    <div><h1 class="text-[1.75rem] font-semibold tracking-[-0.035em] text-[#0f2742] sm:text-[2rem]">{{ title }}</h1><p v-if="description" class="mt-1.5 max-w-3xl text-sm leading-6 text-[#60728a]">{{ description }}</p></div>
    <div v-if="$slots.actions" class="flex flex-wrap gap-2"><slot name="actions" /></div>
  </header>
</template>
