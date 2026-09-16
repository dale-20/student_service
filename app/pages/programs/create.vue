<script setup lang="ts">
import type { ApiProblem } from '~/types/api'; import type { Program } from '~/types/domain'; import type { FormFieldDefinition } from '~/types/forms'
definePageMeta({ middleware: 'auth' })
const fields: FormFieldDefinition[] = [{ key: 'code', label: 'Program code', required: true, placeholder: 'BSIT' }, { key: 'name', label: 'Program name', required: true }, { key: 'status', label: 'Status', type: 'select', required: true, options: [{ label: 'Active', value: 'active' }, { label: 'Inactive', value: 'inactive' }] }]
const { create } = usePrograms(); const { show } = useToasts(); const submitting = ref(false); const errors = ref<Record<string, string[]>>({})
async function save(values: Record<string, string | number>): Promise<void> { submitting.value = true; errors.value = {}; try { await create(values as unknown as Partial<Program>); show('Program created successfully.'); await navigateTo('/programs') } catch (error) { const problem = error as ApiProblem; errors.value = problem.errors ?? { form: [problem.message] } } finally { submitting.value = false } }
</script>
<template><div class="page-shell"><PageHeader title="Add program" description="Create a new academic program." /><EntityForm :fields="fields" submit-label="Create program" cancel-to="/programs" :submitting="submitting" :server-errors="errors" @submit="save" /></div></template>
