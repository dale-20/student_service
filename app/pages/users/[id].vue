<script setup lang="ts">
import type { ApiProblem } from '~/types/api'
import { formatDate } from '~/utils/formatters'

definePageMeta({ middleware: 'auth' })
const route = useRoute()
const id = Number(route.params.id)
const { find, update, resetPassword } = useUsers()
const { get } = useLookups()
const { data: account, status, error, refresh } = await useAsyncData(`user-${id}`, () => find(id))
const { data: lookups, error: lookupError, refresh: reloadOptions } = await useAsyncData('user-edit-lookups', () => get())
const form = reactive({ name: account.value?.name ?? '', email: account.value?.email ?? '', status: account.value?.status ?? 'active', role_id: account.value?.role.id ?? 0 })
watch(account, value => { if (value) Object.assign(form, { name: value.name, email: value.email, status: value.status, role_id: value.role.id }) })
const password = reactive({ value: '', confirmation: '' })
const errors = ref<Record<string, string[]>>({})
const saving = ref(false)
const success = ref('')
async function saveAccount() {
  if (saving.value) return
  saving.value = true
  errors.value = {}
  success.value = ''
  try { account.value = await update(id, { ...form, role_id: Number(form.role_id) }); success.value = 'Account updated.' }
  catch (failure) { const problem = failure as ApiProblem; errors.value = problem.errors ?? { form: [problem.message] } }
  finally { saving.value = false }
}
async function reset() {
  if (saving.value) return
  saving.value = true
  errors.value = {}
  success.value = ''
  try { await resetPassword(id, password.value, password.confirmation); password.value = ''; password.confirmation = ''; success.value = 'Temporary password saved. The user must change it after signing in.' }
  catch (failure) { const problem = failure as ApiProblem; errors.value = problem.errors ?? { form: [problem.message] } }
  finally { saving.value = false }
}
</script>

<template>
  <div class="page-shell">
    <LoadingState v-if="status === 'pending'" />
    <ErrorState v-else-if="error" :message="error.message"><template #action><BaseButton @click="refresh()">Try again</BaseButton></template></ErrorState>
    <template v-else-if="account">
      <PageHeader :title="account.name" :description="account.email"><template #actions><StatusBadge :status="account.status" /></template></PageHeader>
      <p v-if="success" role="status" class="text-sm text-green-800">{{ success }}</p>
      <ErrorState v-if="lookupError" :message="lookupError.message"><template #action><BaseButton @click="reloadOptions()">Reload roles</BaseButton></template></ErrorState>
      <div class="grid gap-6 lg:grid-cols-2">
        <BaseCard><form class="space-y-4" @submit.prevent="saveAccount">
          <h2 class="font-semibold">Account details</h2>
          <FormField for="user-name" label="Name" :error="errors.name?.[0]"><BaseInput id="user-name" v-model="form.name" :disabled="saving" /></FormField>
          <FormField for="user-email" label="Email" :error="errors.email?.[0]"><BaseInput id="user-email" v-model="form.email" type="email" :disabled="saving" /></FormField>
          <FormField for="user-role" label="Role" :error="errors.role_id?.[0]"><BaseSelect id="user-role" v-model="form.role_id" :options="(lookups?.roles ?? []).map(role => ({ label: role.name, value: role.id }))" :disabled="saving || !lookups" /></FormField>
          <FormField for="user-status" label="Status" :error="errors.status?.[0]"><BaseSelect id="user-status" v-model="form.status" :options="['active', 'inactive', 'suspended'].map(value => ({ label: value, value }))" :disabled="saving" /></FormField>
          <p class="border-t border-rule pt-4 text-sm text-muted">Last login: {{ account.last_login_at ? formatDate(account.last_login_at) : 'Never' }}</p>
          <BaseButton type="submit" :loading="saving" :disabled="!lookups">Save account</BaseButton>
        </form></BaseCard>
        <BaseCard><form class="space-y-4" @submit.prevent="reset"><h2 class="font-semibold">Reset password</h2>
          <FormField for="reset-password" label="Temporary password" :error="errors.password?.[0]"><BaseInput id="reset-password" v-model="password.value" type="password" :disabled="saving" /></FormField>
          <FormField for="reset-confirmation" label="Confirm password" :error="errors.password_confirmation?.[0]"><BaseInput id="reset-confirmation" v-model="password.confirmation" type="password" :disabled="saving" /></FormField>
          <p class="text-sm text-muted">The user will be required to replace this password after signing in.</p><BaseButton type="submit" :loading="saving">Reset password</BaseButton>
        </form></BaseCard>
      </div>
      <p v-if="errors.form" role="alert" class="text-sm text-red-700">{{ errors.form[0] }}</p>
    </template>
  </div>
</template>
