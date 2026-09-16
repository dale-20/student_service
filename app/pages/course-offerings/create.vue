<script setup lang="ts">definePageMeta({ middleware: 'auth' }); async function saved() { await navigateTo('/course-offerings') }</script>
<template><div class="page-shell"><PageHeader title="Create course offering" description="Schedule a course, instructor, and meeting times." /><CourseOfferingForm @saved="saved" /></div></template>
