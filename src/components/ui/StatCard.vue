<template>
  <div class="rounded-2xl border border-slate-100 bg-white p-5 shadow-card">
    <div class="flex items-center justify-between">
      <span class="text-sm font-medium text-slate-400">{{ label }}</span>
      <span class="flex h-9 w-9 items-center justify-center rounded-xl text-lg" :style="{ background: tint }">{{ icon }}</span>
    </div>
    <p class="mt-3 text-2xl font-bold text-slate-800">{{ value }}</p>
    <p v-if="hint" class="mt-1 text-xs" :class="hintClass">{{ hint }}</p>
  </div>
</template>
<script setup>
defineProps({ label: String, value: [String, Number], icon: String, hint: String, hintClass: { type: String, default: 'text-slate-400' }, tint: { type: String, default: '#eef4ff' } })
</script>
