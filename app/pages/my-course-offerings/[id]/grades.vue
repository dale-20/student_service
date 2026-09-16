<script setup lang="ts">definePageMeta({ middleware: 'auth' }); const route = useRoute(); const id = Number(route.params.id)</script>
<template><div class="page-shell"><PageHeader title="Enter grades" :description="`Course offering #${id}`" /><GradeEditor :offering-id="id" /></div></template>
