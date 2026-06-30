<template>
  <div>
    <label v-if="label" class="label-base">{{ label }}</label>
    <select :value="modelValue" class="input-base" @change="$emit('update:modelValue', $event.target.value)">
      <option v-if="placeholder" value="">{{ placeholder }}</option>
      <option v-for="opt in normalized" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
    </select>
  </div>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({ modelValue: [String, Number], label: String, placeholder: String, options: { type: Array, default: () => [] } })
defineEmits(['update:modelValue'])
const normalized = computed(() => props.options.map((o) => (typeof o === 'object' ? o : { value: o, label: o })))
</script>
