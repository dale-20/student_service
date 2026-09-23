<script setup lang="ts">
defineProps<{ for: string; label: string; required?: boolean; error?: string; hint?: string }>()
</script>

<template>
  <div class="space-y-1.5">
    <label :for="$props.for" class="block text-sm font-medium text-[#29445f]">{{ label }} <span v-if="required" class="text-red-600">*</span></label>
    <slot />
    <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
    <p v-else-if="hint" class="text-sm text-[#60728a]">{{ hint }}</p>
  </div>
</template>
