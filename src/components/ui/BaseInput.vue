<template>
  <div>
    <label v-if="label" class="label-base">{{ label }}</label>
    <input :type="type" :value="modelValue" :placeholder="placeholder"
      class="input-base" @input="$emit('update:modelValue', $event.target.value)" />
    <p v-if="error" class="mt-1 text-xs text-red-500">{{ error }}</p>
  </div>
</template>
<script setup>
defineProps({ modelValue: [String, Number], label: String, type: { type: String, default: 'text' }, placeholder: String, error: String })
defineEmits(['update:modelValue'])
</script>
