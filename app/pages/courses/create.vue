<script setup lang="ts">
import type { ApiProblem } from '~/types/api'; import type { Course } from '~/types/domain'; import type { FormFieldDefinition } from '~/types/forms'
definePageMeta({ middleware: 'auth' })
const fields: FormFieldDefinition[] = [{ key: 'course_code', label: 'Course code', required: true, placeholder: 'IT101' }, { key: 'course_title', label: 'Course title', required: true }, { key: 'units', label: 'Units', type: 'number', required: true }, { key: 'status', label: 'Status', type: 'select', required: true, options: [{ label: 'Active', value: 'active' }, { label: 'Inactive', value: 'inactive' }] }]
const { create } = useCourses(); const { show } = useToasts(); const submitting = ref(false); const errors = ref<Record<string, string[]>>({})
async function save(values: Record<string, string | number>): Promise<void> { submitting.value = true; errors.value = {}; try { await create({ ...values, units: Number(values.units) } as unknown as Partial<Course>); show('Course created successfully.'); await navigateTo('/courses') } catch (error) { const problem = error as ApiProblem; errors.value = problem.errors ?? { form: [problem.message] } } finally { submitting.value = false } }
</script>
<template><div class="page-shell"><PageHeader title="Add course" description="Create a course catalog entry." /><EntityForm :fields="fields" submit-label="Create course" cancel-to="/courses" :submitting="submitting" :server-errors="errors" @submit="save" /></div></template>
