<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const { offeringOptions } = useRecordOptions()
const load = offeringOptions()
const selectedId = ref<number | ''>('')
</script>
<template>
  <div class="page-shell">
    <PageHeader title="Grade management" description="Select an offering to review and update grades." />
    <BaseCard><RecordPicker id="grade-offering" v-model="selectedId" label="Course offering" :load="load" /></BaseCard>
    <GradeEditor v-if="selectedId" :key="selectedId" :offering-id="selectedId" />
    <EmptyState v-else title="Select a course offering" description="Search or browse offerings to open the grade roster." />
  </div>
</template>
