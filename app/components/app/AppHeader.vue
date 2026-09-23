<script setup lang="ts">
import { Bell, ChevronDown, Menu } from '@lucide/vue'
const emit = defineEmits<{ menu: [] }>()
const route = useRoute()
const { user, logout } = useAuth()
const menuOpen = ref(false)
const pageName = computed(() => route.path.split('/').filter(Boolean).at(-1)?.replaceAll('-', ' ') ?? 'Dashboard')
</script>

<template>
  <header class="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#d8e2ef] bg-white/95 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
    <div class="flex items-center gap-3"><button class="pressable rounded-lg p-2 text-[#51657d] hover:bg-[#edf3f9] lg:hidden" aria-label="Open navigation" @click="emit('menu')"><Menu class="size-5" /></button><div><p class="text-[11px] font-medium text-[#77879b]">Student Information System</p><p class="text-sm font-semibold capitalize text-[#18334f]">{{ pageName }}</p></div></div>
    <div class="flex items-center gap-2"><button class="pressable relative rounded-lg p-2.5 text-[#60728a] hover:bg-[#edf3f9]" aria-label="Notifications"><Bell class="size-5" /><span class="absolute right-2 top-2 size-1.5 rounded-full bg-brand-600" aria-hidden="true" /></button><span class="mx-1 hidden h-7 w-px bg-[#d8e2ef] sm:block" /><div v-if="user" class="relative"><button class="pressable flex items-center gap-2 rounded-lg p-1.5 hover:bg-[#edf3f9]" :aria-expanded="menuOpen" @click="menuOpen = !menuOpen"><UserAvatar :name="user.name" size="sm" /><span class="hidden text-left sm:block"><span class="block text-sm font-semibold text-[#18334f]">{{ user.name }}</span><span class="block text-xs capitalize text-[#6b7d92]">{{ user.role.name }}</span></span><ChevronDown class="hidden size-4 text-[#708198] sm:block" /></button><Transition name="menu"><div v-if="menuOpen" class="absolute right-0 mt-2 w-44 origin-top-right rounded-xl border border-[#d8e2ef] bg-white p-1 shadow-[0_18px_45px_-24px_rgba(15,39,66,0.55)]"><NuxtLink to="/profile" class="block rounded-lg px-3 py-2 text-sm text-[#29445f] hover:bg-[#edf3f9]" @click="menuOpen = false">Profile</NuxtLink><button class="w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50" @click="logout">Logout</button></div></Transition></div></div>
  </header>
</template>
