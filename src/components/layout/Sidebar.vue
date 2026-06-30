<template>
  <aside class="flex h-full w-64 flex-col border-r border-slate-100 bg-white">
    <div class="flex items-center gap-2 px-6 py-5">
      <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white font-bold">F</div>
      <span class="text-lg font-bold text-slate-800">FinFlow</span>
    </div>
    <nav class="flex-1 space-y-1 px-3 py-2">
      <RouterLink v-for="item in items" :key="item.to" :to="item.to"
        class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-800"
        active-class="!bg-brand-50 !text-brand-700" exact-active-class="">
        <span class="text-lg">{{ item.icon }}</span>{{ item.label }}
      </RouterLink>
    </nav>
    <div class="border-t border-slate-100 p-3">
      <button class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50" @click="logout">
        <span class="text-lg">🚪</span>Logout
      </button>
    </div>
  </aside>
</template>
<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToastStore } from '@/stores/toast'
const router = useRouter(); const auth = useAuthStore(); const toast = useToastStore()
const items = [
  { to: '/', label: 'Dashboard', icon: '📊' },
  { to: '/transactions', label: 'Transactions', icon: '💸' },
  { to: '/categories', label: 'Categories', icon: '🏷️' },
  { to: '/budgets', label: 'Budgets', icon: '🎯' },
  { to: '/reports', label: 'Reports', icon: '📈' },
  { to: '/profile', label: 'Profile', icon: '👤' }
]
function logout() { auth.logout(); toast.info('You have been logged out'); router.push('/auth/login') }
</script>
