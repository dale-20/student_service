<script setup lang="ts">
import type { AcademicRecord } from '~/composables/useAcademicRecords'
import type { ApiProblem } from '~/types/api'

definePageMeta({ middleware: 'auth' })
const { role } = useAuth()
const { mine, forStudent } = useAcademicRecords()
const { studentOptions } = useRecordOptions()
const loadStudents = studentOptions()
const selectedStudentId = ref<number | ''>('')
const { data: ownRecord, error: ownError, status: ownStatus, refresh } = await useAsyncData('own-academic-record', mine, { immediate: role.value === 'student' })
const record = ref<AcademicRecord | null>(null)
const loading = ref(false)
const message = ref('')
async function loadRecord() {
  if (!selectedStudentId.value || loading.value) return
  loading.value = true
  message.value = ''
  record.value = null
  try { record.value = await forStudent(selectedStudentId.value) }
  catch (failure) { message.value = (failure as ApiProblem).message }
  finally { loading.value = false }
}
watch(selectedStudentId, () => { record.value = null; message.value = '' })
</script>
<template>
  <div class="page-shell">
    <PageHeader title="Academic record" description="Review enrollment history, courses, and grades." />
    <BaseCard v-if="role === 'registrar'"><RecordPicker id="record-student" v-model="selectedStudentId" label="Student" :load="loadStudents" /><BaseButton class="mt-4" :disabled="!selectedStudentId" :loading="loading" @click="loadRecord">View record</BaseButton></BaseCard>
    <LoadingState v-if="loading || ownStatus === 'pending'" />
    <ErrorState v-else-if="message || ownError" :message="message || ownError?.message"><template #action><BaseButton @click="role === 'student' ? refresh() : loadRecord()">Try again</BaseButton></template></ErrorState>
    <AcademicRecordView v-else-if="record || ownRecord" :record="(record ?? ownRecord)!" />
  </div>
</template>
