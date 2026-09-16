<script setup lang="ts">
const model = defineModel<string | number>({ required: true })
withDefaults(defineProps<{ id: string; type?: string; placeholder?: string; disabled?: boolean; invalid?: boolean }>(), { type: 'text', placeholder: '', disabled: false, invalid: false })
</script>

<template><input :id="id" v-model="model" :type="type" :placeholder="placeholder" :disabled="disabled" class="field-control" :class="invalid && 'border-red-500 focus-visible:ring-red-500'" :aria-invalid="invalid" ></template>
