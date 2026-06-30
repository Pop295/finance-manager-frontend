<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" @click="$emit('update:modelValue', false)" />
        <div class="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-card">
          <div class="mb-4 flex items-center justify-between">
            <h3 class="text-lg font-semibold text-slate-800">{{ title }}</h3>
            <button class="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100" @click="$emit('update:modelValue', false)">✕</button>
          </div>
          <slot />
          <div v-if="$slots.footer" class="mt-6 flex justify-end gap-2"><slot name="footer" /></div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<script setup>
defineProps({ modelValue: Boolean, title: String })
defineEmits(['update:modelValue'])
</script>
