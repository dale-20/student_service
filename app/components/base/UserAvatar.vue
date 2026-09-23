<script setup lang="ts">
import { initials } from '~/utils/formatters'
withDefaults(defineProps<{ name: string; size?: 'sm' | 'md' | 'lg' }>(), { size: 'md' })
const sizes = { sm: 'size-8 text-xs', md: 'size-10 text-sm', lg: 'size-16 text-xl' }
</script>

<template><span class="inline-flex shrink-0 items-center justify-center rounded-full border border-brand-100 bg-brand-50 font-semibold text-brand-700" :class="sizes[size]" :aria-label="`${name} avatar`">{{ initials(name) }}</span></template>
