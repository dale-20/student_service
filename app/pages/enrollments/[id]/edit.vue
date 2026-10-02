<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const route = useRoute()
const id = Number(route.params.id)
const { find } = useEnrollments()
const { data: enrollment, error, status, refresh } = await useAsyncData(`enrollment-edit-${id}`, () => find(id))
async function saved() { await navigateTo(`/enrollments/${id}`) }
</script>

<template>
  <div class="page-shell">
    <PageHeader title="Edit enrollment" description="Correct an enrollment while preserving its academic history." />
    <LoadingState v-if="status === 'pending'" />
    <ErrorState v-else-if="error" :message="error.message"><template #action><BaseButton @click="refresh()">Try again</BaseButton></template></ErrorState>
    <EnrollmentEditForm v-else-if="enrollment" :enrollment="enrollment" @saved="saved" />
  </div>
</template>
