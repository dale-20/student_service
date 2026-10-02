<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const route = useRoute()
const id = Number(route.params.id)
const { find } = usePrograms()
const { get } = useLookups()
const { data: program, error, status, refresh } = await useAsyncData(`program-${id}`, () => find(id))
const { data: lookups, error: lookupError, refresh: refreshLookups } = await useAsyncData('curriculum-lookups', () => get())
</script>

<template>
  <div class="page-shell">
    <LoadingState v-if="status === 'pending' && !program" />
    <ErrorState v-else-if="error" :message="error.message"><template #action><BaseButton @click="refresh()">Try again</BaseButton></template></ErrorState>
    <template v-else-if="program">
      <PageHeader :title="program.code" :description="program.name"><template #actions><StatusBadge :status="program.status" /><BaseButton :to="`/programs/${program.id}/edit`">Edit program</BaseButton></template></PageHeader>
      <p v-if="program.description" class="max-w-prose text-sm text-muted">{{ program.description }}</p>
      <ErrorState v-if="lookupError" :message="lookupError.message"><template #action><BaseButton @click="refreshLookups()">Reload course options</BaseButton></template></ErrorState>
      <CurriculumEditor v-else-if="lookups" :program-id="id" :curriculum="program.curriculum ?? []" :courses="lookups.courses" @saved="refresh()" />
    </template>
  </div>
</template>
