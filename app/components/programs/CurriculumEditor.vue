<script setup lang="ts">
import type { ApiProblem } from '~/types/api'
import type { Course, CurriculumInput, ProgramCourse, Semester } from '~/types/domain'

const props = defineProps<{ programId: number; curriculum: ProgramCourse[]; courses: Course[] }>()
const emit = defineEmits<{ saved: [] }>()
const { syncCurriculum } = usePrograms()
const rows = ref(props.curriculum.map(item => ({ course_id: item.course_id, year_level: item.year_level ?? '', semester: item.semester ?? '', is_required: item.is_required })))
const saving = ref(false)
const errors = ref<Record<string, string[]>>({})
const success = ref('')
const semesters = [{ label: 'First semester', value: 'first' }, { label: 'Second semester', value: 'second' }, { label: 'Summer', value: 'summer' }]

function addCourse() {
  const available = props.courses.find(course => !rows.value.some(row => row.course_id === course.id))
  if (available) rows.value.push({ course_id: available.id, year_level: 1, semester: 'first', is_required: true })
}
async function save() {
  if (saving.value) return
  saving.value = true
  errors.value = {}
  success.value = ''
  try {
    const payload: CurriculumInput[] = rows.value.map(row => ({ course_id: Number(row.course_id), year_level: row.year_level === '' ? null : Number(row.year_level), semester: row.semester === '' ? null : row.semester as Semester, is_required: row.is_required }))
    await syncCurriculum(props.programId, payload)
    success.value = 'Curriculum saved. Removed entries can be recovered from Deleted records.'
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
  <BaseCard>
    <form class="space-y-5" @submit.prevent="save">
      <div class="flex flex-wrap items-center justify-between gap-3"><h2 class="text-lg font-semibold">Curriculum</h2><BaseButton variant="secondary" :disabled="saving || rows.length >= courses.length" @click="addCourse">Add course</BaseButton></div>
      <p v-if="!rows.length" class="text-sm text-muted">No courses in this curriculum. Add a course to begin.</p>
      <fieldset v-for="(row, index) in rows" :key="index" :disabled="saving" class="grid gap-3 border-t border-rule pt-4 lg:grid-cols-[2fr_1fr_1fr_auto_auto]">
        <legend class="sr-only">Curriculum course {{ index + 1 }}</legend>
        <FormField :for="`curriculum-course-${index}`" label="Course" :error="errors[`courses.${index}.course_id`]?.[0]"><BaseSelect :id="`curriculum-course-${index}`" v-model="row.course_id" :options="courses.map(course => ({ label: `${course.course_code} · ${course.course_title}`, value: course.id }))" /></FormField>
        <FormField :for="`curriculum-year-${index}`" label="Year level" :error="errors[`courses.${index}.year_level`]?.[0]"><BaseSelect :id="`curriculum-year-${index}`" v-model="row.year_level" :options="[1, 2, 3, 4, 5].map(value => ({ label: `Year ${value}`, value }))" placeholder="Not set" /></FormField>
        <FormField :for="`curriculum-semester-${index}`" label="Semester" :error="errors[`courses.${index}.semester`]?.[0]"><BaseSelect :id="`curriculum-semester-${index}`" v-model="row.semester" :options="semesters" placeholder="Not set" /></FormField>
        <label class="flex min-h-10 items-center gap-2 self-end"><input v-model="row.is_required" type="checkbox" class="size-4 accent-brand-600">Required</label>
        <BaseButton class="self-end" variant="ghost" :disabled="saving" :aria-label="`Remove curriculum course ${index + 1}`" @click="rows.splice(index, 1)">Remove</BaseButton>
      </fieldset>
      <p v-for="message in [...(errors.form ?? []), ...(errors.courses ?? [])]" :key="message" role="alert" class="text-sm text-red-700">{{ message }}</p>
      <p v-if="success" role="status" class="text-sm text-green-800">{{ success }}</p>
      <div class="flex justify-end"><BaseButton type="submit" :loading="saving">Save curriculum</BaseButton></div>
    </form>
  </BaseCard>
</template>
