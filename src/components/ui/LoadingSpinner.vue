<template>
  <div class="flex items-center justify-center py-10">
    <div class="h-8 w-8 animate-spin rounded-full border-[3px] border-brand-200 border-t-brand-600" />
    <span v-if="label" class="ml-3 text-sm text-slate-400">{{ label }}</span>
  </div>
</template>
<script setup>
defineProps({ label: String })
</script>
