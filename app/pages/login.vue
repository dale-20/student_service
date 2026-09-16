<script setup lang="ts">
import { LockKeyhole } from '@lucide/vue'
import type { ApiProblem } from '~/types/api'

definePageMeta({ layout: 'auth', middleware: 'guest' })
useSeoMeta({ title: 'Sign in · StudentIS' })
const { login } = useAuth()
const email = ref('')
const password = ref('')
const submitting = ref(false)
const errorMessage = ref('')

async function submit(): Promise<void> {
  submitting.value = true
  errorMessage.value = ''
  try {
    const user = await login(email.value, password.value)
    await navigateTo(user.must_change_password ? '/change-password' : '/dashboard')
  }
  catch (error: unknown) {
    errorMessage.value = (error as ApiProblem).message ?? 'Unable to sign in.'
  }
  finally { submitting.value = false }
}
</script>

<template>
  <BaseCard>
    <div class="mb-7">
      <span class="mb-4 grid size-11 place-items-center rounded-lg bg-brand-50 text-brand-700"><LockKeyhole class="size-5" /></span>
      <h1 class="text-2xl font-bold text-slate-900">Welcome back</h1>
      <p class="mt-1 text-sm text-slate-500">Sign in to your StudentIS workspace.</p>
    </div>
    <form class="space-y-4" @submit.prevent="submit">
      <FormField for="email" label="Email" required><BaseInput id="email" v-model="email" type="email" autocomplete="email" /></FormField>
      <FormField for="password" label="Password" required :error="errorMessage"><BaseInput id="password" v-model="password" type="password" autocomplete="current-password" :invalid="Boolean(errorMessage)" /></FormField>
      <BaseButton type="submit" :loading="submitting" class="w-full">{{ submitting ? 'Signing in…' : 'Sign in' }}</BaseButton>
    </form>
  </BaseCard>
</template>
