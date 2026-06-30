<template>
  <div class="rounded-2xl border border-slate-100 bg-white p-5 shadow-card transition hover:shadow-soft">
    <div v-if="title || $slots.actions" class="mb-4 flex items-center justify-between">
      <div>
        <h3 class="text-base font-semibold text-slate-800">{{ title }}</h3>
        <p v-if="subtitle" class="text-sm text-slate-400">{{ subtitle }}</p>
      </div>
      <slot name="actions" />
    </div>
    <slot />
  </div>
</template>
<script setup>
defineProps({ title: String, subtitle: String })
</script>
