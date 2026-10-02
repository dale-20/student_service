<script setup lang="ts">
import type { ApiProblem } from '~/types/api'
import { formatDate } from '~/utils/formatters'
import type { EnrollmentStatus } from '~/types/domain'

definePageMeta({ middleware: 'auth' })
const route = useRoute()
const { find, updateStatus } = useEnrollments()
const id = Number(route.params.id)
const { data: enrollment, error, status, refresh } = await useAsyncData(`enrollment-${id}`, () => find(id))
const saving = ref(false)
const message = ref('')
const success = ref('')
const selectedStatus = ref<EnrollmentStatus>(enrollment.value?.status ?? 'enrolled')
watch(enrollment, value => { if (value) selectedStatus.value = value.status })
async function changeStatus() {
  if (saving.value) return
  saving.value = true
  message.value = ''
  success.value = ''
  try { enrollment.value = await updateStatus(id, selectedStatus.value); success.value = 'Enrollment status updated.' }
  catch (failure) { message.value = (failure as ApiProblem).message }
  finally { saving.value = false }
}
</script>
<template>
  <div class="page-shell">
    <LoadingState v-if="status === 'pending'" />
    <ErrorState v-else-if="error" :message="error.message"><template #action><BaseButton @click="refresh()">Try again</BaseButton></template></ErrorState>
    <template v-else-if="enrollment">
      <PageHeader :title="`${enrollment.student?.first_name} ${enrollment.student?.last_name}`" :description="enrollment.course_offering?.course?.course_title"><template #actions><StatusBadge :status="enrollment.status" /><BaseButton :to="`/enrollments/${id}/edit`">Edit enrollment</BaseButton></template></PageHeader>
      <BaseCard>
        <dl class="grid gap-5 sm:grid-cols-3"><div><dt class="text-sm text-muted">Course</dt><dd class="font-semibold">{{ enrollment.course_offering?.course?.course_code }}</dd></div><div><dt class="text-sm text-muted">Enrolled</dt><dd class="font-semibold">{{ formatDate(enrollment.enrollment_date) }}</dd></div><div><dt class="text-sm text-muted">Section</dt><dd class="font-semibold">{{ enrollment.course_offering?.section }}</dd></div></dl>
        <form class="mt-6 space-y-4 border-t border-rule pt-5" @submit.prevent="changeStatus"><FormField for="enrollment-status" label="Enrollment status"><BaseSelect id="enrollment-status" v-model="selectedStatus" class="max-w-sm" :options="['enrolled', 'dropped', 'withdrawn', 'completed'].map(value => ({ label: value, value }))" :disabled="saving" /></FormField><p v-if="message" role="alert" class="text-sm text-red-700">{{ message }}</p><p v-if="success" role="status" class="text-sm text-green-800">{{ success }}</p><BaseButton type="submit" :loading="saving" :disabled="selectedStatus === enrollment.status">Update status</BaseButton></form>
      </BaseCard>
    </template>
  </div>
</template>
