<template>
  <div>
    <div class="mb-1 flex items-center justify-between text-xs">
      <span class="font-medium text-slate-600">{{ label }}</span>
      <span :class="over ? 'text-red-500 font-semibold' : 'text-slate-400'">{{ Math.round(pct) }}%</span>
    </div>
    <div class="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
      <div class="h-full rounded-full transition-all duration-500"
        :style="{ width: Math.min(pct, 100) + '%', background: over ? '#ef4444' : (color || '#3366ff') }" />
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({ label: String, value: Number, max: Number, color: String })
const pct = computed(() => (props.max ? (props.value / props.max) * 100 : 0))
const over = computed(() => props.value > props.max)
</script>
