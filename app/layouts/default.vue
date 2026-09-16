<script setup lang="ts">
const sidebarOpen = ref(false)
</script>
<template><div class="min-h-screen bg-slate-50"><AppSidebar :open="sidebarOpen" @close="sidebarOpen = false" /><div class="lg:pl-64"><AppHeader @menu="sidebarOpen = true" /><main><slot /></main></div></div></template>
