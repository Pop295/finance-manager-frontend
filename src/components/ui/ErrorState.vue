<template>
  <div class="flex flex-col items-center justify-center py-12 text-center">
    <div class="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-2xl">⚠️</div>
    <h4 class="font-semibold text-slate-700">Something went wrong</h4>
    <p class="mt-1 max-w-sm text-sm text-slate-400">{{ message }}</p>
    <button v-if="onRetry" class="mt-4 rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200" @click="onRetry">Try again</button>
  </div>
</template>
<script setup>
defineProps({ message: String, onRetry: Function })
</script>
