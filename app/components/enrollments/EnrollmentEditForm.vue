<script setup lang="ts">
import type { ApiProblem } from '~/types/api'
import type { Enrollment, EnrollmentStatus } from '~/types/domain'

const props = defineProps<{ enrollment: Enrollment }>()
const emit = defineEmits<{ saved: [] }>()
const { studentOptions, offeringOptions } = useRecordOptions()
const loadStudents = studentOptions({ status: 'active' })
const loadOfferings = offeringOptions()
const { update } = useEnrollments()
const studentId = ref<number | ''>(props.enrollment.student_id)
const offeringId = ref<number | ''>(props.enrollment.course_offering_id)
const date = ref(props.enrollment.enrollment_date)
const enrollmentStatus = ref<EnrollmentStatus>(props.enrollment.status)
const saving = ref(false)
const errors = ref<Record<string, string[]>>({})

async function save() {
  if (saving.value || !studentId.value || !offeringId.value) return
  saving.value = true
  errors.value = {}
  try {
    await update(props.enrollment.id, { student_id: studentId.value, course_offering_id: offeringId.value, enrollment_date: date.value, status: enrollmentStatus.value })
    emit('saved')
  }
  catch (failure) {
    const problem = failure as ApiProblem
    errors.value = problem.errors ?? { form: [problem.message] }
  }
  finally { saving.value = false }
}
</script>

<template>
  <form class="space-y-5" @submit.prevent="save">
    <p v-if="enrollment.grade" class="text-sm text-muted">This enrollment has grades. Its student and offering are protected; you can update its date and status.</p>
    <BaseCard><RecordPicker id="edit-enrollment-student" v-model="studentId" label="Student" :load="loadStudents" :initial="{ id: enrollment.student_id, label: `${enrollment.student?.student_number} · ${enrollment.student?.first_name} ${enrollment.student?.last_name}` }" :disabled="saving || Boolean(enrollment.grade)" :error="errors.student_id?.[0]" /></BaseCard>
    <BaseCard><RecordPicker id="edit-enrollment-offering" v-model="offeringId" label="Course offering" :load="loadOfferings" :initial="{ id: enrollment.course_offering_id, label: `${enrollment.course_offering?.course?.course_code} · ${enrollment.course_offering?.section}` }" :disabled="saving || Boolean(enrollment.grade)" :error="errors.course_offering_id?.[0]" /></BaseCard>
    <BaseCard class="grid gap-4 sm:grid-cols-2">
      <FormField for="edit-enrollment-date" label="Enrollment date" :error="errors.enrollment_date?.[0]"><BaseInput id="edit-enrollment-date" v-model="date" type="date" :disabled="saving" /></FormField>
      <FormField for="edit-enrollment-status" label="Status" :error="errors.status?.[0]"><BaseSelect id="edit-enrollment-status" v-model="enrollmentStatus" :options="['enrolled', 'dropped', 'withdrawn', 'completed'].map(value => ({ label: value, value }))" :disabled="saving" /></FormField>
    </BaseCard>
    <p v-if="errors.form" role="alert" class="text-sm text-red-700">{{ errors.form[0] }}</p>
    <div class="flex justify-end gap-3"><BaseButton :to="`/enrollments/${enrollment.id}`" variant="secondary">Cancel</BaseButton><BaseButton type="submit" :loading="saving" :disabled="!studentId || !offeringId">Save changes</BaseButton></div>
  </form>
</template>
