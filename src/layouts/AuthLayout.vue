<template>
  <div class="flex min-h-screen">
    <div class="hidden flex-1 flex-col justify-between bg-gradient-to-br from-brand-600 to-brand-900 p-12 text-white lg:flex">
      <div class="flex items-center gap-2">
        <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 font-bold">F</div>
        <span class="text-xl font-bold">FinFlow</span>
      </div>
      <div>
        <h1 class="text-4xl font-bold leading-tight">Take control of <br />your money.</h1>
        <p class="mt-4 max-w-md text-brand-100">Track spending, set budgets, and visualize your finances with a clean, modern dashboard.</p>
      </div>
      <p class="text-sm text-brand-200">© 2026 FinFlow. All rights reserved.</p>
    </div>
    <div class="flex flex-1 items-center justify-center bg-slate-50 p-6">
      <div class="w-full max-w-md"><RouterView /></div>
    </div>
  </div>
</template>
<script setup>
import { RouterView } from 'vue-router'
</script>
