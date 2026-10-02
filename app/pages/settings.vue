<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const { preferences } = usePreferences()
const form = reactive({ ...preferences.value })
const saved = ref(false)
function save() { preferences.value = { ...form }; saved.value = true }
watch(form, () => { saved.value = false })
</script>
<template>
  <div class="page-shell">
    <PageHeader title="Settings" description="Interface preferences saved in this browser." />
    <BaseCard><form class="space-y-5" @submit.prevent="save">
      <h2 class="font-semibold">Interface preferences</h2>
      <div class="divide-y divide-rule border-y border-rule">
        <label class="flex items-center justify-between gap-5 py-4"><span><strong class="block text-sm">Success notifications</strong><small class="text-muted">Show confirmation messages after actions. Errors always remain visible.</small></span><input v-model="form.notifications" type="checkbox" class="size-5 accent-brand-600"></label>
        <label class="flex items-center justify-between gap-5 py-4"><span><strong class="block text-sm">Compact tables</strong><small class="text-muted">Use shorter rows when reviewing records.</small></span><input v-model="form.compactTables" type="checkbox" class="size-5 accent-brand-600"></label>
      </div>
      <p v-if="saved" role="status" class="text-sm text-green-800">Preferences saved.</p>
      <div class="flex justify-end"><BaseButton type="submit">Save preferences</BaseButton></div>
    </form></BaseCard>
  </div>
</template>
