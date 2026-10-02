<script setup lang="ts">
withDefaults(defineProps<{ inverse?: boolean }>(), { inverse: false })
</script>

<template>
  <NuxtLink to="/dashboard" aria-label="StudentServe dashboard" class="pressable rounded-lg">
    <AppBrand compact :inverse="inverse" />
  </NuxtLink>
</template>
