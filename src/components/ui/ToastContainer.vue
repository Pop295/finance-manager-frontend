<template>
  <div class="pointer-events-none fixed bottom-5 right-5 z-[60] flex w-80 flex-col gap-2">
    <TransitionGroup name="fade">
      <div v-for="t in toast.items" :key="t.id"
        class="pointer-events-auto flex items-start gap-3 rounded-xl border bg-white px-4 py-3 shadow-card"
        :class="border[t.type]">
        <span>{{ icon[t.type] }}</span>
        <p class="flex-1 text-sm text-slate-700">{{ t.message }}</p>
        <button class="text-slate-300 hover:text-slate-500" @click="toast.dismiss(t.id)">✕</button>
      </div>
    </TransitionGroup>
  </div>
</template>
<script setup>
import { useToastStore } from '@/stores/toast'
const toast = useToastStore()
const icon = { success: '✅', error: '❌', info: 'ℹ️' }
const border = { success: 'border-green-100', error: 'border-red-100', info: 'border-brand-100' }
</script>
