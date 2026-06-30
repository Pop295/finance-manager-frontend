<template>
  <div class="flex flex-col items-center justify-center py-12 text-center">
    <div class="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">{{ icon || '📭' }}</div>
    <h4 class="font-semibold text-slate-700">{{ title || 'Nothing here yet' }}</h4>
    <p class="mt-1 max-w-sm text-sm text-slate-400">{{ message }}</p>
    <div class="mt-4"><slot /></div>
  </div>
</template>
<script setup>
defineProps({ title: String, message: String, icon: String })
</script>
