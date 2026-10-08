<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const route = useRoute()
await navigateTo('/courses/' + route.params.id + '/edit', { replace: true })
</script>

<template><div /></template>
