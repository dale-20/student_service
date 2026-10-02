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
  <div v-if="open" class="fixed inset-0 z-40 bg-[#071b2f]/55 lg:hidden" aria-hidden="true" @click="emit('close')" />
  <aside class="fixed inset-y-0 left-0 z-50 flex w-[17rem] flex-col border-r border-white/10 bg-[#102a43] text-white transition-transform duration-300 [transition-timing-function:var(--ease-drawer)] lg:translate-x-0" :class="open ? 'translate-x-0' : '-translate-x-full'">
    <div class="flex h-20 items-center justify-between px-5"><AppLogo inverse /><button class="pressable rounded-lg p-2 text-blue-100 hover:bg-white/10 lg:hidden" aria-label="Close navigation" @click="emit('close')"><X class="size-5" /></button></div>
    <nav class="flex-1 space-y-6 overflow-y-auto px-3 py-4" aria-label="Primary navigation">
      <section v-for="(group, index) in groups" :key="group.label ?? index">
        <p v-if="group.label" class="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-200/70">{{ group.label }}</p>
        <div class="space-y-1"><NuxtLink v-for="item in group.items" :key="item.to" :to="item.to" class="pressable relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium" :class="isActive(item.to) ? 'bg-brand-600 text-white shadow-[0_10px_24px_-18px_rgba(11,99,243,1)]' : 'text-blue-100/85 hover:bg-white/8 hover:text-white'" @click="emit('close')"><component :is="item.icon" class="size-[18px]" :stroke-width="isActive(item.to) ? 2.2 : 1.8" />{{ item.label }}</NuxtLink></div>
      </section>
    </nav>
    <div v-if="user" class="border-t border-white/10 p-3"><div class="flex items-center gap-3 rounded-lg p-2"><UserAvatar :name="user.name" size="sm" /><div class="min-w-0 flex-1"><p class="truncate text-sm font-semibold text-white">{{ user.name }}</p><p class="truncate text-xs capitalize text-blue-200/75">{{ user.role.name }}</p></div><button class="pressable rounded-lg p-2 text-blue-200/70 hover:bg-white/10 hover:text-white" aria-label="Log out" @click="logout"><LogOut class="size-4" /></button></div></div>
  </aside>
</template>
