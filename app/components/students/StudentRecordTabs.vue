<script setup lang="ts">
import { Mail, MapPin, Phone } from '@lucide/vue'
import type { AcademicRecord } from '~/composables/useAcademicRecords'
import { formatDate, formatTerm } from '~/utils/formatters'

type Section = 'overview' | 'enrollments' | 'grades' | 'academic-record'

const props = defineProps<{ record: AcademicRecord }>()
const sections: { id: Section; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'enrollments', label: 'Enrollments' },
  { id: 'grades', label: 'Grades' },
  { id: 'academic-record', label: 'Academic record' },
]
const activeSection = ref<Section>('overview')
const enrollments = computed(() => props.record.terms.flatMap(group => group.enrollments))
const enrollmentColumns = [
  { key: 'code', label: 'Course code' },
  { key: 'course', label: 'Course' },
  { key: 'term', label: 'Term' },
  { key: 'section', label: 'Section' },
  { key: 'enrolled_on', label: 'Enrolled on' },
  { key: 'status', label: 'Status' },
]
const gradeColumns = [
  { key: 'code', label: 'Course code' },
  { key: 'course', label: 'Course' },
  { key: 'term', label: 'Term' },
  { key: 'midterm', label: 'Midterm' },
  { key: 'final', label: 'Final' },
  { key: 'remarks', label: 'Remarks' },
]
const enrollmentRows = computed(() => enrollments.value.map(item => ({
  id: item.id,
  code: item.course_offering?.course?.course_code,
  course: item.course_offering?.course?.course_title,
  term: item.course_offering?.academic_term
    ? formatTerm(item.course_offering.academic_term.term) + ' · ' + item.course_offering.academic_term.academic_year
    : undefined,
  section: item.course_offering?.section,
  enrolled_on: formatDate(item.enrollment_date),
  status: item.status,
})))
const gradeRows = computed(() => enrollments.value.map(item => ({
  id: item.id,
  code: item.course_offering?.course?.course_code,
  course: item.course_offering?.course?.course_title,
  term: item.course_offering?.academic_term
    ? formatTerm(item.course_offering.academic_term.term) + ' · ' + item.course_offering.academic_term.academic_year
    : undefined,
  midterm: item.grade?.midterm_grade ?? 'Not encoded',
  final: item.grade?.final_grade ?? 'Not encoded',
  remarks: item.grade?.remarks ?? 'In progress',
})))

function focusTab(section: Section): void {
  activeSection.value = section
  nextTick(() => document.getElementById('student-tab-' + section)?.focus())
}

function moveTab(current: Section, direction: number): void {
  const index = sections.findIndex(section => section.id === current)
  const next = sections[(index + direction + sections.length) % sections.length]
  if (next) focusTab(next.id)
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex gap-1 overflow-x-auto border-b border-rule" role="tablist" aria-label="Student sections">
      <button
        v-for="section in sections"
        :id="'student-tab-' + section.id"
        :key="section.id"
        type="button"
        role="tab"
        :aria-controls="'student-panel-' + section.id"
        :aria-selected="activeSection === section.id"
        :tabindex="activeSection === section.id ? 0 : -1"
        class="min-h-11 shrink-0 border-b-2 px-4 py-3 text-sm focus-visible:relative"
        :class="activeSection === section.id ? 'border-brand-600 font-semibold text-brand-700' : 'border-transparent text-muted hover:text-ink'"
        @click="activeSection = section.id"
        @keydown.left.prevent="moveTab(section.id, -1)"
        @keydown.right.prevent="moveTab(section.id, 1)"
        @keydown.home.prevent="focusTab('overview')"
        @keydown.end.prevent="focusTab('academic-record')"
      >{{ section.label }}</button>
    </div>

    <div v-show="activeSection === 'overview'" id="student-panel-overview" role="tabpanel" aria-labelledby="student-tab-overview" tabindex="0">
      <div class="grid gap-6 lg:grid-cols-2">
        <BaseCard>
          <h2 class="mb-5 font-semibold text-brand-900">Academic information</h2>
          <dl class="grid grid-cols-2 gap-5 text-sm">
            <div><dt class="text-muted">Program</dt><dd class="mt-1 font-semibold text-ink">{{ record.student.program?.name ?? 'Not assigned' }}</dd></div>
            <div><dt class="text-muted">Year level</dt><dd class="mt-1 font-semibold text-ink">Year {{ record.student.year_level }}</dd></div>
            <div><dt class="text-muted">Student number</dt><dd class="mt-1 font-semibold text-ink">{{ record.student.student_number }}</dd></div>
            <div><dt class="text-muted">Status</dt><dd class="mt-1"><StatusBadge :status="record.student.status" /></dd></div>
          </dl>
        </BaseCard>
        <BaseCard>
          <h2 class="mb-5 font-semibold text-brand-900">Contact information</h2>
          <div class="space-y-4 text-sm text-ink">
            <p class="flex items-center gap-3"><Mail class="size-4 shrink-0 text-muted" aria-hidden="true" />{{ record.student.email ?? 'No email provided' }}</p>
            <p class="flex items-center gap-3"><Phone class="size-4 shrink-0 text-muted" aria-hidden="true" />{{ record.student.contact_number ?? 'No contact number provided' }}</p>
            <p class="flex items-center gap-3"><MapPin class="size-4 shrink-0 text-muted" aria-hidden="true" />{{ record.student.address ?? 'No address provided' }}</p>
          </div>
        </BaseCard>
      </div>
    </div>

    <div v-show="activeSection === 'enrollments'" id="student-panel-enrollments" role="tabpanel" aria-labelledby="student-tab-enrollments" tabindex="0">
      <EmptyState v-if="!enrollments.length" title="No enrollments" description="This student has no enrolled courses yet." />
      <DataTable v-else :columns="enrollmentColumns" :rows="enrollmentRows">
        <template #cell-status="{ value }"><StatusBadge :status="String(value)" /></template>
      </DataTable>
    </div>

    <div v-show="activeSection === 'grades'" id="student-panel-grades" role="tabpanel" aria-labelledby="student-tab-grades" tabindex="0">
      <EmptyState v-if="!enrollments.length" title="No grades" description="Courses and their recorded grades will appear here after enrollment." />
      <DataTable v-else :columns="gradeColumns" :rows="gradeRows" />
    </div>

    <div v-show="activeSection === 'academic-record'" id="student-panel-academic-record" role="tabpanel" aria-labelledby="student-tab-academic-record" tabindex="0">
      <AcademicRecordView :record="record" />
    </div>
  </div>
</template>
