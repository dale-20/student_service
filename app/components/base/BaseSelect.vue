<script setup lang="ts">
const model = defineModel<string | number>({ required: true })
defineProps<{ id: string; options: { label: string; value: string | number }[]; placeholder?: string; invalid?: boolean; disabled?: boolean }>()
</script>

<template><select :id="id" v-model="model" :disabled="disabled" class="field-control" :class="invalid && 'border-red-500'" :aria-invalid="invalid"><option value="">{{ placeholder ?? 'Select an option' }}</option><option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option></select></template>
