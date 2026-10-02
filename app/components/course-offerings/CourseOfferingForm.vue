<script setup lang="ts">
import type { ApiProblem } from '~/types/api'
import type { CourseOffering } from '~/types/domain'

const props = defineProps<{ offering?: CourseOffering }>()
const emit = defineEmits<{ saved: [offering: CourseOffering] }>()
const { get } = useLookups()
const { create, update } = useCourseOfferings()
const { data: lookups, error, status: lookupStatus, refresh } = await useAsyncData(`offering-form-lookups-${props.offering?.id ?? 'new'}`, () => get(props.offering ? { course_offering_id: props.offering.id } : {}))
const form = reactive({ course_id: props.offering?.course_id ?? '', academic_term_id: props.offering?.academic_term_id ?? '', instructor_id: props.offering?.instructor_id ?? '', section: props.offering?.section ?? '', room: props.offering?.room ?? '', capacity: props.offering?.capacity ?? 30, status: props.offering?.status ?? 'open', schedules: props.offering?.schedules?.map(item => ({ day_of_week: item.day_of_week, start_time: item.start_time.slice(0, 5), end_time: item.end_time.slice(0, 5), room: item.room ?? '' })) ?? [{ day_of_week: 'monday', start_time: '08:00', end_time: '09:00', room: '' }] })
const errors = ref<Record<string, string[]>>({})
const submitting = ref(false)
function addSchedule() { form.schedules.push({ day_of_week: 'monday', start_time: '08:00', end_time: '09:00', room: '' }) }
async function submit() {
  if (submitting.value || !lookups.value) return
  errors.value = {}
  submitting.value = true
  try {
    const payload = { ...form, course_id: Number(form.course_id), academic_term_id: Number(form.academic_term_id), instructor_id: form.instructor_id ? Number(form.instructor_id) : null, capacity: Number(form.capacity) }
    const saved = props.offering ? await update(props.offering.id, payload) : await create(payload)
    emit('saved', saved)
  }
  catch (failure) { const problem = failure as ApiProblem; errors.value = problem.errors ?? { form: [problem.message] } }
  finally { submitting.value = false }
}
</script>

<template>
  <LoadingState v-if="lookupStatus === 'pending'" />
  <ErrorState v-else-if="error" :message="error.message"><template #action><BaseButton @click="refresh()">Reload options</BaseButton></template></ErrorState>
  <form v-else class="space-y-6" @submit.prevent="submit">
    <BaseCard><fieldset :disabled="submitting" class="grid gap-4 sm:grid-cols-2">
      <FormField for="course" label="Course" required :error="errors.course_id?.[0]"><BaseSelect id="course" v-model="form.course_id" :options="(lookups?.courses ?? []).map(item => ({ label: `${item.course_code} · ${item.course_title}`, value: item.id }))" /></FormField>
      <FormField for="term" label="Academic term" required :error="errors.academic_term_id?.[0]"><BaseSelect id="term" v-model="form.academic_term_id" :options="(lookups?.academic_terms ?? []).map(item => ({ label: `${item.academic_year} · ${item.term.replaceAll('_', ' ')} · ${item.status}`, value: item.id }))" /></FormField>
      <FormField for="instructor" label="Instructor" :error="errors.instructor_id?.[0]"><BaseSelect id="instructor" v-model="form.instructor_id" placeholder="Unassigned" :options="(lookups?.instructors ?? []).map(item => ({ label: item.name, value: item.id }))" /></FormField>
      <FormField for="section" label="Section" required :error="errors.section?.[0]"><BaseInput id="section" v-model="form.section" /></FormField>
      <FormField for="room" label="Room" :error="errors.room?.[0]"><BaseInput id="room" v-model="form.room" /></FormField>
      <FormField for="capacity" label="Capacity" required :error="errors.capacity?.[0]"><BaseInput id="capacity" v-model="form.capacity" type="number" /></FormField>
      <FormField for="status" label="Status" required :error="errors.status?.[0]"><BaseSelect id="status" v-model="form.status" :options="['open', 'closed', 'ongoing', 'completed', 'cancelled'].map(value => ({ label: value, value }))" /></FormField>
    </fieldset></BaseCard>
    <BaseCard>
      <div class="mb-4 flex items-center justify-between gap-3"><h2 class="font-semibold">Structured schedule</h2><BaseButton variant="secondary" :disabled="submitting" @click="addSchedule">Add schedule</BaseButton></div>
      <p v-if="!form.schedules.length" class="text-sm text-muted">No meetings scheduled. Removed schedules can be recovered from Deleted records after saving.</p>
      <div class="space-y-4"><fieldset v-for="(schedule, index) in form.schedules" :key="index" :disabled="submitting" class="grid gap-3 border-t border-rule pt-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]">
        <legend class="sr-only">Meeting {{ index + 1 }}</legend>
        <FormField :for="`schedule-day-${index}`" label="Day" :error="errors[`schedules.${index}.day_of_week`]?.[0]"><BaseSelect :id="`schedule-day-${index}`" v-model="schedule.day_of_week" :options="['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(value => ({ label: value, value }))" /></FormField>
        <FormField :for="`schedule-start-${index}`" label="Starts" :error="errors[`schedules.${index}.start_time`]?.[0]"><BaseInput :id="`schedule-start-${index}`" v-model="schedule.start_time" type="time" /></FormField>
        <FormField :for="`schedule-end-${index}`" label="Ends" :error="errors[`schedules.${index}.end_time`]?.[0]"><BaseInput :id="`schedule-end-${index}`" v-model="schedule.end_time" type="time" /></FormField>
        <FormField :for="`schedule-room-${index}`" label="Room" :error="errors[`schedules.${index}.room`]?.[0]"><BaseInput :id="`schedule-room-${index}`" v-model="schedule.room" /></FormField>
        <BaseButton variant="ghost" class="self-end" :disabled="submitting" :aria-label="`Remove meeting ${index + 1}`" @click="form.schedules.splice(index, 1)">Remove</BaseButton>
      </fieldset></div>
      <p v-if="errors.schedules" role="alert" class="mt-3 text-sm text-red-700">{{ errors.schedules[0] }}</p>
    </BaseCard>
    <p v-if="errors.form" role="alert" class="text-sm text-red-700">{{ errors.form[0] }}</p>
    <div class="flex justify-end gap-3"><BaseButton to="/course-offerings" variant="secondary">Cancel</BaseButton><BaseButton type="submit" :loading="submitting">Save offering</BaseButton></div>
  </form>
</template>
