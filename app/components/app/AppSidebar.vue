<script setup lang="ts">
import { LogOut, X } from '@lucide/vue'
defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()
const route = useRoute()
const { groups } = useAppNavigation()
const { user, logout } = useAuth()
const isActive = (to: string) => route.path === to || route.path.startsWith(`${to}/`)
</script>

<template>
  <div v-if="open" class="fixed inset-0 z-40 bg-slate-900/40 lg:hidden" aria-hidden="true" @click="emit('close')" />
  <aside class="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform lg:translate-x-0" :class="open ? 'translate-x-0' : '-translate-x-full'">
    <div class="flex h-20 items-center justify-between px-5"><AppLogo /><button class="rounded-lg p-2 text-slate-500 lg:hidden" aria-label="Close navigation" @click="emit('close')"><X class="size-5" /></button></div>
    <nav class="flex-1 space-y-5 overflow-y-auto px-3 py-3" aria-label="Primary navigation">
      <section v-for="(group, index) in groups" :key="group.label ?? index">
        <p v-if="group.label" class="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">{{ group.label }}</p>
        <div class="space-y-1"><NuxtLink v-for="item in group.items" :key="item.to" :to="item.to" class="relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition" :class="isActive(item.to) ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'" @click="emit('close')"><span v-if="isActive(item.to)" class="absolute inset-y-2 left-0 w-0.5 rounded-full bg-brand-600" /><component :is="item.icon" class="size-[18px]" />{{ item.label }}</NuxtLink></div>
      </section>
    </nav>
    <div v-if="user" class="border-t border-slate-200 p-3"><div class="flex items-center gap-3 rounded-lg p-2"><UserAvatar :name="user.name" size="sm" /><div class="min-w-0 flex-1"><p class="truncate text-sm font-semibold text-slate-800">{{ user.name }}</p><p class="truncate text-xs text-slate-500">{{ user.role.name }}</p></div><button class="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-red-600" aria-label="Log out" @click="logout"><LogOut class="size-4" /></button></div></div>
  </aside>
</template>
