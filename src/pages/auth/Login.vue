<template>
  <div>
    <h2 class="text-2xl font-bold text-slate-800">Welcome back</h2>
    <p class="mt-1 text-sm text-slate-400">Sign in to continue to your dashboard.</p>
    <form class="mt-8 space-y-4" @submit.prevent="submit">
      <BaseInput v-model="form.email" label="Email" type="email" placeholder="you@example.com" :error="errors.email" />
      <BaseInput v-model="form.password" label="Password" type="password" placeholder="••••••••" :error="errors.password" />
      <BaseButton type="submit" variant="primary" :loading="auth.loading" class="w-full">Sign in</BaseButton>
    </form>
    <p class="mt-6 text-center text-sm text-slate-500">
      Don't have an account?
      <RouterLink to="/auth/register" class="font-semibold text-brand-600 hover:underline">Create one</RouterLink>
    </p>
    <p class="mt-4 rounded-xl bg-brand-50 p-3 text-center text-xs text-brand-700">Demo mode: any email & password works.</p>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useAuthStore } from '@/stores/auth'
import { useToastStore } from '@/stores/toast'
const auth = useAuthStore(); const toast = useToastStore()
const router = useRouter(); const route = useRoute()
const form = reactive({ email: '', password: '' })
const errors = reactive({ email: '', password: '' })
async function submit() {
  errors.email = form.email ? '' : 'Email is required'
  errors.password = form.password ? '' : 'Password is required'
  if (errors.email || errors.password) return
  try { await auth.login({ ...form }); toast.success('Logged in successfully'); router.push(route.query.redirect || '/') }
  catch { toast.error('Invalid credentials') }
}
</script>
