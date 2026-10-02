<script setup lang="ts">
const { user, role } = useAuth()
const props = defineProps<{ studentView?: boolean }>()
const { profile } = useSelfService()
const isStudent = computed(() => props.studentView || role.value === 'student')
const { data: student, status, error, refresh } = await useAsyncData('my-student-profile', () => profile(), { immediate: isStudent.value })
</script>
<template>
  <div v-if="user" class="space-y-5">
    <div class="grid gap-6 lg:grid-cols-[320px_1fr]">
      <BaseCard class="text-center"><UserAvatar :name="user.name" size="lg" /><h2 class="mt-4 text-lg font-semibold">{{ user.name }}</h2><p class="text-sm text-muted">{{ user.email }}</p><div class="mt-3"><StatusBadge :status="user.status" /></div></BaseCard>
      <BaseCard><h2 class="mb-5 font-semibold">Account information</h2><dl class="grid gap-5 text-sm sm:grid-cols-2"><div><dt class="text-muted">Full name</dt><dd class="mt-1 font-semibold">{{ user.name }}</dd></div><div><dt class="text-muted">Role</dt><dd class="mt-1 font-semibold">{{ user.role.name }}</dd></div><div><dt class="text-muted">Email</dt><dd class="mt-1 font-semibold">{{ user.email }}</dd></div></dl></BaseCard>
    </div>
    <template v-if="isStudent">
      <LoadingState v-if="status === 'pending'" />
      <ErrorState v-else-if="error" title="Unable to load student profile" :message="error.statusCode === 404 ? 'Your account is not linked to a student record. Contact the registrar.' : error.message"><template #action><BaseButton @click="refresh()">Try again</BaseButton></template></ErrorState>
      <BaseCard v-else-if="student"><h2 class="mb-5 font-semibold">Academic profile</h2><dl class="grid gap-5 text-sm sm:grid-cols-3"><div><dt class="text-muted">Student number</dt><dd class="mt-1 font-semibold">{{ student.student_number }}</dd></div><div><dt class="text-muted">Program</dt><dd class="mt-1 font-semibold">{{ student.program?.name ?? 'No program assigned' }}</dd></div><div><dt class="text-muted">Year level</dt><dd class="mt-1 font-semibold">Year {{ student.year_level }}</dd></div></dl></BaseCard>
    </template>
  </div>
</template>
