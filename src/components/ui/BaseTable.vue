<template>
  <div class="overflow-x-auto">
    <table class="w-full text-left text-sm">
      <thead>
        <tr class="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
          <th v-for="col in columns" :key="col.key" class="px-4 py-3 font-medium">{{ col.label }}</th>
        </tr>
      </thead>
      <tbody>
        <slot />
      </tbody>
    </table>
  </div>
</template>
<script setup>
defineProps({ columns: { type: Array, default: () => [] } })
</script>
