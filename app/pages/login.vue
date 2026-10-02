<script setup lang="ts">
import LoginForm from '~/components/auth/LoginForm.vue'

definePageMeta({ layout: 'school-portal', middleware: 'guest' })
useSeoMeta({ title: 'Sign in · StudentServe', description: 'Sign in to the StudentServe Student Information System to access your academic records, enrollment, courses, and grades.' })
</script>

<template>
  <LoginForm />
</template>
