<template>
  <header class="flex items-center justify-between border-b border-slate-100 bg-white/80 px-6 py-3.5 backdrop-blur">
    <button class="rounded-lg p-2 text-slate-500 hover:bg-slate-100 md:hidden" @click="$emit('toggle')">☰</button>
    <div class="relative hidden w-80 md:block">
      <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
      <input v-model="q" class="input-base pl-9" placeholder="Search transactions, categories..." />
    </div>
    <div class="flex items-center gap-3">
      <button class="relative rounded-xl p-2 text-slate-500 hover:bg-slate-100">
        🔔<span class="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
      </button>
      <RouterLink to="/profile" class="flex items-center gap-2 rounded-xl p-1 pr-3 hover:bg-slate-100">
        <img :src="auth.user?.avatar || fallback" class="h-8 w-8 rounded-full object-cover" />
        <span class="hidden text-sm font-medium text-slate-700 sm:block">{{ auth.user?.name || 'User' }}</span>
      </RouterLink>
    </div>
  </header>
</template>
<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
defineEmits(['toggle'])
const auth = useAuthStore()
const q = ref('')
const fallback = 'https://i.pravatar.cc/80?img=12'
</script>
