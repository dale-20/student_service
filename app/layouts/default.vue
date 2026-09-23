<script setup lang="ts">
const sidebarOpen = ref(false)
</script>
<template><div class="min-h-[100dvh] bg-[#f4f7fb]"><AppSidebar :open="sidebarOpen" @close="sidebarOpen = false" /><div class="lg:pl-[17rem]"><AppHeader @menu="sidebarOpen = true" /><main><slot /></main></div></div></template>
