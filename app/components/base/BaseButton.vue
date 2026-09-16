<script setup lang="ts">
type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost'
const props = withDefaults(defineProps<{ to?: string; type?: 'button' | 'submit' | 'reset'; variant?: ButtonVariant; loading?: boolean; disabled?: boolean }>(), { to: undefined, type: 'button', variant: 'primary', loading: false, disabled: false })
const classes: Record<ButtonVariant, string> = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 border-transparent',
  secondary: 'bg-white text-slate-700 hover:bg-slate-50 border-slate-300',
  danger: 'bg-red-600 text-white hover:bg-red-700 border-transparent',
  ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 border-transparent',
}
</script>

<template>
  <NuxtLink v-if="props.to" :to="props.to" class="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition" :class="classes[props.variant]">
    <slot />
  </NuxtLink>
  <button v-else :type="props.type" :disabled="props.disabled || props.loading" class="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60" :class="classes[props.variant]">
    <span v-if="props.loading" class="size-4 animate-spin rounded-full border-2 border-current border-r-transparent" aria-hidden="true" />
    <slot>{{ props.loading ? 'Working…' : '' }}</slot>
  </button>
</template>
