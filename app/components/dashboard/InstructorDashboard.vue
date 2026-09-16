<script setup lang="ts">
import { BookOpen, FileClock, Users } from '@lucide/vue'; import type { CourseOffering } from '~/types/domain'
interface Data { offerings: CourseOffering[]; total_students: number; grades_pending: number }
const { get } = useDashboard<Data>(); const { data } = await useAsyncData('instructor-dashboard', get)
const stats = computed(() => [{ label: 'My Offerings', value: data.value?.offerings.length ?? 0, detail: 'Assigned classes', icon: BookOpen }, { label: 'Total Students', value: data.value?.total_students ?? 0, detail: 'Across classes', icon: Users }, { label: 'Grades Pending', value: data.value?.grades_pending ?? 0, detail: 'Require grades', icon: FileClock }])
</script>
<template><div class="space-y-6"><div class="grid gap-4 sm:grid-cols-3"><StatCard v-for="stat in stats" :key="stat.label" v-bind="stat" /></div><div class="grid gap-4 lg:grid-cols-2"><BaseCard v-for="offering in data?.offerings" :key="offering.id"><h3 class="font-semibold">{{ offering.course?.course_code }} · {{ offering.section }}</h3><p class="mt-2 text-sm text-slate-500">{{ offering.course?.course_title }}</p><BaseButton class="mt-4" :to="`/my-course-offerings/${offering.id}`" variant="secondary">View class</BaseButton></BaseCard></div></div></template>
