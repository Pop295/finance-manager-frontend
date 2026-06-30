<template>
  <BaseModal :model-value="modelValue" title="Delete confirmation" @update:model-value="$emit('update:modelValue', $event)">
    <p class="text-sm text-slate-500">Are you sure you want to delete <span class="font-semibold text-slate-700">{{ name }}</span>? This action cannot be undone.</p>
    <template #footer>
      <BaseButton variant="secondary" @click="$emit('update:modelValue', false)">Cancel</BaseButton>
      <BaseButton variant="danger" @click="$emit('confirm')">Delete</BaseButton>
    </template>
  </BaseModal>
</template>
<script setup>
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
defineProps({ modelValue: Boolean, name: String })
defineEmits(['update:modelValue', 'confirm'])
</script>
