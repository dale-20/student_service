<script setup lang="ts">
import type { ApiProblem } from '~/types/api'
import { gradeRows, gradePayload } from '~/utils/grades'

const props = defineProps<{ offeringId: number }>()
const { list, save } = useGrades()
const { data: enrollments, status, error, refresh } = await useAsyncData(`grades-${props.offeringId}`, () => list(props.offeringId))
const rows = ref(gradeRows(enrollments.value ?? []))
const dirty = ref(false)
const saving = ref(false)
const errors = ref<Record<string, string[]>>({})
const success = ref('')
watch(enrollments, value => { rows.value = gradeRows(value ?? []); dirty.value = false })
const eligible = computed(() => rows.value.filter(row => row.eligible))
const payloadRows = computed(() => gradePayload(rows.value))
function fieldError(enrollmentId: number, field: string) {
  return errors.value[`grades.${payloadRows.value.findIndex(row => row.enrollment_id === enrollmentId)}.${field}`]?.[0]
}
async function submit() {
  if (saving.value || !dirty.value) return
  saving.value = true
  errors.value = {}
  success.value = ''
  try {
    const payload = gradePayload(rows.value)
    if (payload.length) {
      await save(props.offeringId, payload)
      for (const row of rows.value) {
        if (payload.some(item => item.enrollment_id === row.enrollment_id)) row.has_grade = true
      }
    }
    dirty.value = false
    success.value = 'Grades saved successfully.'
  }
  catch (failure) {
    const problem = failure as ApiProblem
    errors.value = problem.errors ?? { form: [problem.message] }
  }
  finally { saving.value = false }
}
</script>

<template>
  <div class="space-y-4">
    <LoadingState v-if="status === 'pending'" />
    <ErrorState v-else-if="error" :message="error.message"><template #action><BaseButton @click="refresh()">Try again</BaseButton></template></ErrorState>
    <EmptyState v-else-if="!rows.length" title="No enrolled students" description="Students will appear here after enrollment." />
    <template v-else>
      <div class="flex flex-wrap items-center justify-between gap-3"><p class="text-sm text-muted">Dropped and withdrawn enrollments are read-only. Grade records cannot be deleted.</p><BaseButton :disabled="!dirty || !eligible.length" :loading="saving" @click="submit">Save grades</BaseButton></div>
      <p v-for="message in [...(errors.form ?? []), ...(errors.grades ?? [])]" :key="message" role="alert" class="text-sm text-red-700">{{ message }}</p>
      <p v-if="success" role="status" class="text-sm text-green-800">{{ success }}</p>
      <BaseCard :padded="false"><div class="overflow-x-auto"><table class="w-full min-w-[720px] text-left text-sm">
        <thead class="bg-brand-50"><tr><th class="p-4">Student</th><th class="p-4">Midterm</th><th class="p-4">Final</th><th class="p-4">Remarks</th></tr></thead>
        <tbody><tr v-for="row in rows" :key="row.enrollment_id" class="border-t border-rule">
          <td class="p-4"><strong>{{ row.student }}</strong><small class="block text-muted">{{ row.number }} · {{ row.status }}</small></td>
          <td class="p-4"><label :for="`midterm-${row.enrollment_id}`" class="sr-only">Midterm grade for {{ row.student }}</label><input :id="`midterm-${row.enrollment_id}`" v-model="row.midterm_grade" class="field-control" type="number" min="1" max="5" step="0.01" :disabled="!row.eligible || saving" :aria-invalid="Boolean(fieldError(row.enrollment_id, 'midterm_grade'))" @input="dirty = true; success = ''"><p v-if="fieldError(row.enrollment_id, 'midterm_grade')" class="mt-1 text-red-700">{{ fieldError(row.enrollment_id, 'midterm_grade') }}</p></td>
          <td class="p-4"><label :for="`final-${row.enrollment_id}`" class="sr-only">Final grade for {{ row.student }}</label><input :id="`final-${row.enrollment_id}`" v-model="row.final_grade" class="field-control" type="number" min="1" max="5" step="0.01" :disabled="!row.eligible || saving" :aria-invalid="Boolean(fieldError(row.enrollment_id, 'final_grade'))" @input="dirty = true; success = ''"><p v-if="fieldError(row.enrollment_id, 'final_grade')" class="mt-1 text-red-700">{{ fieldError(row.enrollment_id, 'final_grade') }}</p></td>
          <td class="p-4"><label :for="`remarks-${row.enrollment_id}`" class="sr-only">Remarks for {{ row.student }}</label><select :id="`remarks-${row.enrollment_id}`" v-model="row.remarks" class="field-control" :disabled="!row.eligible || saving" @change="dirty = true; success = ''"><option :value="null">Not set</option><option v-for="value in ['passed', 'failed', 'incomplete', 'dropped']" :key="value" :value="value">{{ value }}</option></select><p v-if="fieldError(row.enrollment_id, 'remarks')" class="mt-1 text-red-700">{{ fieldError(row.enrollment_id, 'remarks') }}</p></td>
        </tr></tbody>
      </table></div></BaseCard>
    </template>
  </div>
</template>
