<script setup lang="ts">
import type { ApiProblem } from '~/types/api'

definePageMeta({ middleware: 'auth', layout: 'auth' })
const { changePassword, user } = useAuth()
const form = reactive({ current_password: '', password: '', password_confirmation: '' })
const errors = ref<Record<string, string[]>>({})
const submitting = ref(false)

async function submit(): Promise<void> {
  errors.value = {}
  submitting.value = true
  try {
    await changePassword(form)
    await navigateTo('/dashboard')
  }
  catch (error: unknown) {
    const problem = error as ApiProblem
    errors.value = problem.errors ?? { form: [problem.message] }
  }
  finally { submitting.value = false }
}
</script>

<template>
  <BaseCard class="w-full max-w-md">
    <h1 class="text-2xl font-bold text-slate-900">Change your password</h1>
    <p class="mt-2 text-sm text-slate-500">{{ user?.must_change_password ? 'Replace the temporary password before continuing.' : 'Choose a new secure password.' }}</p>
    <form class="mt-6 space-y-4" @submit.prevent="submit">
      <FormField for="current-password" label="Current password" required :error="errors.current_password?.[0]"><BaseInput id="current-password" v-model="form.current_password" type="password" /></FormField>
      <FormField for="new-password" label="New password" required :error="errors.password?.[0]"><BaseInput id="new-password" v-model="form.password" type="password" /></FormField>
      <FormField for="confirm-password" label="Confirm new password" required><BaseInput id="confirm-password" v-model="form.password_confirmation" type="password" /></FormField>
      <p class="text-xs text-slate-500">Use at least 12 characters with uppercase, lowercase, a number, and a symbol.</p>
      <p v-if="errors.form" class="text-sm text-red-600">{{ errors.form[0] }}</p>
      <BaseButton class="w-full" type="submit" :loading="submitting">Save password</BaseButton>
    </form>
  </BaseCard>
</template>
