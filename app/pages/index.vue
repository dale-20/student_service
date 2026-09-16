<script setup lang="ts">const { isAuthenticated, restore, user } = useAuth(); await restore(); await navigateTo(isAuthenticated.value ? (user.value?.must_change_password ? '/change-password' : '/dashboard') : '/login')</script>
<template><div /></template>
