<script setup lang="ts">
import { CheckCircle2, CircleAlert, Info, X } from '@lucide/vue'
const { toasts, remove } = useToasts()
const icons = { success: CheckCircle2, error: CircleAlert, info: Info }
const tones = { success: 'text-green-700 bg-green-50 border-green-200', error: 'text-red-700 bg-red-50 border-red-200', info: 'text-blue-700 bg-blue-50 border-blue-200' }
</script>

<template><div class="fixed right-4 top-4 z-[100] w-[calc(100%-2rem)] max-w-sm space-y-2" aria-live="polite"><div v-for="toast in toasts" :key="toast.id" class="flex gap-3 rounded-xl border p-4 shadow-lg" :class="tones[toast.tone]"><component :is="icons[toast.tone]" class="mt-0.5 size-5 shrink-0" /><div class="flex-1"><p class="text-sm font-semibold">{{ toast.title }}</p><p v-if="toast.message" class="mt-0.5 text-sm opacity-80">{{ toast.message }}</p></div><button class="rounded p-1" aria-label="Dismiss notification" @click="remove(toast.id)"><X class="size-4" /></button></div></div></template>
