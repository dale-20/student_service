<script setup lang="ts">
import type { ApiProblem } from '~/types/api'
import type { RecordOption } from '~/types/selection'

definePageMeta({ middleware: 'auth' })
const { studentOptions, offeringOptions } = useRecordOptions()
const students = studentOptions({ status: 'active' })
const offerings = offeringOptions({ status: 'open' })
const { create } = useEnrollments()
const studentId = ref<number | ''>('')
const offeringId = ref<number | ''>('')
const selectedOffering = ref<RecordOption>()
const selection = ref<RecordOption[]>([])
const submitting = ref(false)
const errors = ref<Record<string, string[]>>({})
function addOffering() {
  if (selectedOffering.value && !selection.value.some(item => item.id === selectedOffering.value?.id)) selection.value.push(selectedOffering.value)
  offeringId.value = ''
}
async function submit() {
  if (submitting.value || !studentId.value || !selection.value.length) return
  submitting.value = true
  errors.value = {}
  try {
    await create(studentId.value, selection.value.map(item => item.id))
    await navigateTo('/enrollments')
  }
  catch (failure) {
    const problem = failure as ApiProblem
    errors.value = problem.errors ?? { form: [problem.message] }
  }
  finally { submitting.value = false }
}
</script>

<template>
  <div class="page-shell">
    <PageHeader title="Enroll student" description="Choose a student and one or more open course offerings." />
    <form class="space-y-6" @submit.prevent="submit">
      <BaseCard><RecordPicker id="enrollment-student" v-model="studentId" label="Student" :load="students" :disabled="submitting" :error="errors.student_id?.[0]" /></BaseCard>
      <BaseCard>
        <RecordPicker id="enrollment-offering" v-model="offeringId" label="Course offering" :load="offerings" :disabled="submitting" @select="option => selectedOffering = option" />
        <BaseButton class="mt-4" variant="secondary" :disabled="!offeringId || submitting" @click="addOffering">Add offering</BaseButton>
        <ul v-if="selection.length" class="mt-5 divide-y divide-rule border-y border-rule"><li v-for="item in selection" :key="item.id" class="flex items-center justify-between gap-3 py-3"><span class="text-sm">{{ item.label }}</span><BaseButton variant="ghost" :disabled="submitting" :aria-label="`Remove ${item.label}`" @click="selection = selection.filter(row => row.id !== item.id)">Remove</BaseButton></li></ul>
        <p v-else class="mt-4 text-sm text-muted">No offerings selected yet.</p>
      </BaseCard>
      <div v-if="Object.keys(errors).length" role="alert" class="text-sm text-red-700"><p v-for="(messages, key) in errors" :key="key">{{ messages[0] }}</p></div>
      <div class="flex justify-end gap-3"><BaseButton to="/enrollments" variant="secondary">Cancel</BaseButton><BaseButton type="submit" :disabled="!studentId || !selection.length" :loading="submitting">Confirm enrollment</BaseButton></div>
    </form>
  </div>
</template>
