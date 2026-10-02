<script setup lang="ts">
withDefaults(defineProps<{ compact?: boolean; inverse?: boolean }>(), { compact: false, inverse: false })
</script>

<template>
  <span class="app-brand" :class="{ 'app-brand--compact': compact, 'app-brand--inverse': inverse }">
    <img class="app-brand__crest" src="/brand/studentserve-crest.svg" alt="" aria-hidden="true" width="56" height="64">
    <span class="app-brand__type">
      <strong>StudentServe</strong>
      <small>{{ compact ? 'Academic services' : 'Student Information System' }}</small>
    </span>
  </span>
</template>

<style scoped>
.app-brand { display: inline-flex; align-items: center; gap: 14px; }
.app-brand__crest { display: block; width: 56px; height: 64px; flex-shrink: 0; }
.app-brand__type { display: block; }
.app-brand strong { display: block; color: #102a43; font-family: Georgia, 'Times New Roman', serif; font-size: 29px; font-weight: 700; line-height: 1.1; letter-spacing: -0.035em; }
.app-brand small { display: block; margin-top: 6px; color: #51657d; font-size: 12px; font-weight: 500; line-height: 1.4; letter-spacing: 0.025em; }
.app-brand--compact { gap: 10px; }
.app-brand--compact .app-brand__crest { width: 38px; height: 44px; }
.app-brand--compact strong { font-size: 21px; }
.app-brand--compact small { margin-top: 3px; font-size: 11px; letter-spacing: 0.015em; }
.app-brand--inverse strong { color: #fff; }
.app-brand--inverse small { color: #d8e2ef; }
@media (max-width: 767px) {
  .app-brand:not(.app-brand--compact) .app-brand__crest { width: 46px; height: 53px; }
  .app-brand:not(.app-brand--compact) strong { font-size: 26px; }
  .app-brand:not(.app-brand--compact) { gap: 12px; }
}
</style>
