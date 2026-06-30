<template>
  <button :type="type" :disabled="disabled || loading"
    class="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold
           transition focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
    :class="variants[variant]">
    <span v-if="loading" class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
    <slot />
  </button>
</template>
<script setup>
defineProps({
  variant: { type: String, default: 'primary' },
  type: { type: String, default: 'button' },
  disabled: Boolean, loading: Boolean
})
const variants = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 focus:ring-brand-200',
  secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200 focus:ring-slate-200',
  outline: 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-200',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-200',
  ghost: 'text-slate-600 hover:bg-slate-100 focus:ring-slate-200'
}
</script>
