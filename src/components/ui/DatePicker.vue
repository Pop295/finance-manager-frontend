<template>
  <div>
    <label v-if="label" class="label-base">{{ label }}</label>
    <input type="date" :value="modelValue" class="input-base"
      @input="$emit('update:modelValue', $event.target.value)" />
  </div>
</template>
<script setup>
defineProps({ modelValue: String, label: String })
defineEmits(['update:modelValue'])
</script>
