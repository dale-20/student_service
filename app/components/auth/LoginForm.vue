<script setup lang="ts">
import { ArrowRight, Eye, EyeOff, CircleHelp } from '@lucide/vue'
import type { ApiProblem } from '~/types/api'

const { login } = useAuth()
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const submitting = ref(false)
const errorMessage = ref('')
const fieldErrors = ref<Record<string, string[]>>({})

async function submit(): Promise<void> {
  if (submitting.value) return
  submitting.value = true
  errorMessage.value = ''
  fieldErrors.value = {}
  try {
    const user = await login(email.value, password.value)
    await navigateTo(user.must_change_password ? '/change-password' : '/dashboard')
  }
  catch (error: unknown) {
    const problem = error as ApiProblem
    errorMessage.value = problem.message || 'Unable to sign in. Please try again.'
    fieldErrors.value = problem.errors ?? {}
  }
  finally { submitting.value = false }
}
</script>

<template>
  <div class="login-form">
    <h1>Sign in to StudentServe</h1>
    <p class="login-intro">Welcome to your school portal. Enter your school account details to continue.</p>
    <form :aria-busy="submitting" @submit.prevent="submit">
      <div v-if="errorMessage" class="login-error" role="alert">{{ errorMessage }}</div>
      <div class="login-field">
        <label for="email">School email address</label>
        <BaseInput id="email" v-model="email" name="email" type="email" autocomplete="username" placeholder="Enter your email address" required :disabled="submitting" :invalid="Boolean(fieldErrors.email)" :aria-describedby="fieldErrors.email ? 'email-error' : undefined" />
        <p v-if="fieldErrors.email" id="email-error" class="field-error">{{ fieldErrors.email[0] }}</p>
      </div>
      <div class="login-field">
        <label for="password">Password</label>
        <div class="password-control">
          <BaseInput id="password" v-model="password" name="password" :type="showPassword ? 'text' : 'password'" autocomplete="current-password" placeholder="Enter your password" required :disabled="submitting" :invalid="Boolean(fieldErrors.password)" :aria-describedby="fieldErrors.password ? 'password-error' : undefined" />
          <button type="button" class="password-toggle" :aria-label="showPassword ? 'Hide password' : 'Show password'" aria-controls="password" :aria-pressed="showPassword" @click="showPassword = !showPassword"><component :is="showPassword ? EyeOff : Eye" :size="19" :stroke-width="1.7" aria-hidden="true" /></button>
        </div>
        <p v-if="fieldErrors.password" id="password-error" class="field-error">{{ fieldErrors.password[0] }}</p>
      </div>
      <BaseButton type="submit" :loading="submitting" class="login-submit">{{ submitting ? 'Signing in…' : 'Sign in' }}<ArrowRight v-if="!submitting" :size="18" aria-hidden="true" /></BaseButton>
    </form>
    <details class="login-help">
      <summary><CircleHelp :size="17" aria-hidden="true" /><span>Need help signing in?</span></summary>
      <p>If you forgot your password or need an account, contact your school registrar or system administrator for assistance.</p>
    </details>
    <div class="login-account-note"><strong>One account. Your school essentials.</strong><p>Access the courses, enrollment, and academic records available to your role.</p></div>
  </div>
</template>

<style scoped>
h1 { font-size: 34px; font-weight: 600; line-height: 1.15; letter-spacing: -0.03em; color: #102a43; }
.login-intro { margin-top: 12px; color: #60728a; font-size: 16px; line-height: 1.6; }
form { margin-top: 32px; }
.login-field + .login-field { margin-top: 22px; }
.login-field label { display: block; margin-bottom: 8px; font-size: 14px; font-weight: 600; color: #20304a; }
.login-field :deep(input) { min-height: 50px; padding: 12px 14px; font-size: 16px; }
.login-field :deep(input::placeholder) { color: #60728a; opacity: 1; }
.password-control { position: relative; }
.password-control :deep(input) { padding-right: 52px; }
.password-toggle { position: absolute; top: 3px; right: 3px; width: 44px; height: 44px; display: grid; place-items: center; color: #60728a; border-radius: 6px; cursor: pointer; }
.password-toggle:hover { color: #102a43; background: #f4f7fb; }
.login-submit { width: 100%; min-height: 50px; margin-top: 28px; justify-content: space-between; padding-inline: 20px; font-size: 16px; box-shadow: none; }
.login-help { margin-top: 22px; font-size: 14px; color: #51657d; }
.login-help summary { display: flex; align-items: center; justify-content: center; gap: 8px; border-radius: 4px; padding: 7px; cursor: pointer; list-style: none; }
.login-help summary::-webkit-details-marker { display: none; }
.login-help summary:hover { color: #084dcc; }
.login-help summary:focus-visible { outline: 2px solid #0b63f3; outline-offset: 3px; }
.login-help[open] summary { color: #084dcc; }
.login-help > p { margin-top: 10px; padding: 14px 16px; border-radius: 8px; background: #f4f7fb; line-height: 1.6; }
.login-account-note { margin-top: 30px; padding-top: 24px; border-top: 1px solid #d8e2ef; }
.login-account-note strong { font-size: 14px; font-weight: 600; color: #20304a; }
.login-account-note p { margin-top: 6px; font-size: 14px; line-height: 1.6; color: #60728a; }
.login-error { margin-bottom: 20px; padding: 12px 16px; border: 1px solid #fecaca; border-radius: 8px; background: #fef2f2; color: #991b1b; font-size: 14px; }
.field-error { margin-top: 6px; font-size: 14px; color: #b91c1c; }
@media (max-width: 767px) { h1 { font-size: 28px; } .login-intro { font-size: 15px; } form { margin-top: 24px; } .login-account-note { margin-top: 24px; padding-top: 20px; } }
</style>
