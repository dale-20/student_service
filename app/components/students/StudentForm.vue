<script setup lang="ts">
import type { ApiProblem } from '~/types/api'
import type { Student } from '~/types/domain'

const props = defineProps<{ student?: Student }>()
const emit = defineEmits<{ saved: [student: Student] }>()
const { save } = useStudents(); const { get } = useLookups()
const { data: lookups, error: lookupError, status: lookupStatus, refresh } = await useAsyncData(`student-form-lookups-${props.student?.id ?? 'new'}`, () => get(props.student ? { student_id: props.student.id } : {}))
const form = reactive({ user_id: props.student?.user_id ?? '', student_number: props.student?.student_number ?? '', first_name: props.student?.first_name ?? '', middle_name: props.student?.middle_name ?? '', last_name: props.student?.last_name ?? '', suffix: props.student?.suffix ?? '', birth_date: props.student?.birth_date ?? '', email: props.student?.email ?? '', contact_number: props.student?.contact_number ?? '', address: props.student?.address ?? '', program_id: props.student?.program_id ?? '', year_level: props.student?.year_level ?? 1, status: props.student?.status ?? 'active' })
const errors = ref<Record<string, string[]>>({}); const submitting = ref(false)

async function submit(): Promise<void> {
  if (submitting.value) return
  errors.value = {}; submitting.value = true
  try { emit('saved', await save({ ...form, user_id: form.user_id ? Number(form.user_id) : null, program_id: Number(form.program_id), year_level: Number(form.year_level) }, props.student?.id)) }
  catch (error: unknown) { const problem = error as ApiProblem; errors.value = problem.errors ?? { form: [problem.message] } }
  finally { submitting.value = false }
}
</script>

<template>
  <LoadingState v-if="lookupStatus === 'pending'" /><ErrorState v-else-if="lookupError" :message="lookupError.message"><template #action><BaseButton @click="refresh()">Reload options</BaseButton></template></ErrorState><form v-else class="space-y-6" @submit.prevent="submit">
    <BaseCard><h2 class="mb-5 text-lg font-semibold">Personal information</h2><div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"><FormField for="first-name" label="First name" required :error="errors.first_name?.[0]"><BaseInput id="first-name" v-model="form.first_name" /></FormField><FormField for="middle-name" label="Middle name" :error="errors.middle_name?.[0]"><BaseInput id="middle-name" v-model="form.middle_name" /></FormField><FormField for="last-name" label="Last name" required :error="errors.last_name?.[0]"><BaseInput id="last-name" v-model="form.last_name" /></FormField><FormField for="suffix" label="Suffix" :error="errors.suffix?.[0]"><BaseInput id="suffix" v-model="form.suffix" /></FormField><FormField for="birth-date" label="Birth date" :error="errors.birth_date?.[0]"><BaseInput id="birth-date" v-model="form.birth_date" type="date" /></FormField></div></BaseCard>
    <BaseCard><h2 class="mb-5 text-lg font-semibold">Contact information</h2><div class="grid gap-4 sm:grid-cols-2"><FormField for="email" label="Email" :error="errors.email?.[0]"><BaseInput id="email" v-model="form.email" type="email" /></FormField><FormField for="contact" label="Contact number" :error="errors.contact_number?.[0]"><BaseInput id="contact" v-model="form.contact_number" /></FormField><FormField for="address" label="Address" class="sm:col-span-2" :error="errors.address?.[0]"><BaseInput id="address" v-model="form.address" /></FormField></div></BaseCard>
    <BaseCard><h2 class="mb-5 text-lg font-semibold">Academic information</h2><div class="grid gap-4 sm:grid-cols-2"><FormField for="student-number" label="Student number" required :error="errors.student_number?.[0]"><BaseInput id="student-number" v-model="form.student_number" /></FormField><FormField for="program" label="Program" required :error="errors.program_id?.[0]"><BaseSelect id="program" v-model="form.program_id" :options="(lookups?.programs ?? []).map(program => ({ label: `${program.code} · ${program.name}`, value: program.id }))" /></FormField><FormField for="student-account" label="Linked student account" :error="errors.user_id?.[0]"><BaseSelect id="student-account" v-model="form.user_id" :options="[{ label: 'No linked account', value: '' }, ...(lookups?.student_users ?? []).map(user => ({ label: `${user.name} · ${user.email}`, value: user.id }))]" /></FormField><FormField for="year-level" label="Year level" required :error="errors.year_level?.[0]"><BaseSelect id="year-level" v-model="form.year_level" :options="[1, 2, 3, 4, 5].map(level => ({ label: `Year ${level}`, value: level }))" /></FormField><FormField for="status" label="Status" required :error="errors.status?.[0]"><BaseSelect id="status" v-model="form.status" :options="[{ label: 'Active', value: 'active' }, { label: 'Inactive', value: 'inactive' }, { label: 'Graduated', value: 'graduated' }, { label: 'Dropped', value: 'dropped' }]" /></FormField></div></BaseCard>
    <p v-if="errors.form" class="text-sm text-red-600">{{ errors.form[0] }}</p><div class="flex justify-end gap-3"><BaseButton to="/students" variant="secondary">Cancel</BaseButton><BaseButton type="submit" :loading="submitting" :disabled="submitting">{{ submitting ? 'Saving…' : student ? 'Save changes' : 'Create student' }}</BaseButton></div>
  </form>
</template>
