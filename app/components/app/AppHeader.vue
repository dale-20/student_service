<script setup lang="ts">
import { Bell, ChevronDown, Menu } from '@lucide/vue'
const emit = defineEmits<{ menu: [] }>()
const route = useRoute()
const { user, logout } = useAuth()
const menuOpen = ref(false)
const pageName = computed(() => route.path.split('/').filter(Boolean).at(-1)?.replaceAll('-', ' ') ?? 'Dashboard')
</script>

<template>
  <header class="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6">
    <div class="flex items-center gap-3"><button class="rounded-lg p-2 text-slate-600 lg:hidden" aria-label="Open navigation" @click="emit('menu')"><Menu class="size-5" /></button><div><p class="text-xs text-slate-400">Student Information System</p><p class="text-sm font-semibold capitalize text-slate-700">{{ pageName }}</p></div></div>
    <div class="flex items-center gap-2"><button class="rounded-lg p-2.5 text-slate-500 hover:bg-slate-100" aria-label="Notifications"><Bell class="size-5" /></button><div v-if="user" class="relative"><button class="flex items-center gap-2 rounded-lg p-1.5 hover:bg-slate-100" :aria-expanded="menuOpen" @click="menuOpen = !menuOpen"><UserAvatar :name="user.name" size="sm" /><span class="hidden text-left sm:block"><span class="block text-sm font-semibold text-slate-800">{{ user.name }}</span><span class="block text-xs text-slate-500">{{ user.role.name }}</span></span><ChevronDown class="hidden size-4 text-slate-400 sm:block" /></button><div v-if="menuOpen" class="absolute right-0 mt-2 w-44 rounded-xl border border-slate-200 bg-white p-1 shadow-lg"><NuxtLink to="/profile" class="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50" @click="menuOpen = false">Profile</NuxtLink><button class="w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50" @click="logout">Logout</button></div></div></div>
  </header>
</template>
