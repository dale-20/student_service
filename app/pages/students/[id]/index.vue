<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const route = useRoute()
const studentId = computed(() => Number(route.params.id))
const { forStudent } = useAcademicRecords()
const { data: record, status, error, refresh } = await useAsyncData(
  () => 'student-details-' + studentId.value,
  () => forStudent(studentId.value),
)

useSeoMeta({
  title: () => record.value
    ? record.value.student.first_name + ' ' + record.value.student.last_name + ' · StudentServe'
    : 'Student · StudentServe',
})
</script>

<template>
  <div class="page-shell">
    <LoadingState v-if="status === 'pending' && !record" />
    <ErrorState v-else-if="error" :message="error.message">
      <template #action><BaseButton variant="secondary" @click="refresh()">Try again</BaseButton></template>
    </ErrorState>
    <template v-else-if="record">
      <PageHeader :title="record.student.first_name + ' ' + record.student.last_name" :description="record.student.student_number">
        <template #actions>
          <StatusBadge :status="record.student.status" />
          <BaseButton :to="'/students/' + record.student.id + '/edit'">Edit student</BaseButton>
        </template>
      </PageHeader>
      <StudentRecordTabs :record="record" />
    </template>
  </div>
</template>
