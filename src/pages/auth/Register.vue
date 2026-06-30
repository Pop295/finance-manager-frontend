<template>
  <div>
    <h2 class="text-2xl font-bold text-slate-800">Create your account</h2>
    <p class="mt-1 text-sm text-slate-400">Start managing your money in minutes.</p>
    <form class="mt-8 space-y-4" @submit.prevent="submit">
      <BaseInput v-model="form.name" label="Full name" placeholder="Alex Morgan" :error="errors.name" />
      <BaseInput v-model="form.email" label="Email" type="email" placeholder="you@example.com" :error="errors.email" />
      <BaseInput v-model="form.password" label="Password" type="password" placeholder="••••••••" :error="errors.password" />
      <BaseButton type="submit" variant="primary" :loading="auth.loading" class="w-full">Create account</BaseButton>
    </form>
    <p class="mt-6 text-center text-sm text-slate-500">
      Already have an account?
      <RouterLink to="/auth/login" class="font-semibold text-brand-600 hover:underline">Sign in</RouterLink>
    </p>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useAuthStore } from '@/stores/auth'
import { useToastStore } from '@/stores/toast'
const auth = useAuthStore(); const toast = useToastStore(); const router = useRouter()
const form = reactive({ name: '', email: '', password: '' })
const errors = reactive({ name: '', email: '', password: '' })
async function submit() {
  errors.name = form.name ? '' : 'Name is required'
  errors.email = form.email ? '' : 'Email is required'
  errors.password = form.password.length >= 6 ? '' : 'Min 6 characters'
  if (errors.name || errors.email || errors.password) return
  try { await auth.register({ ...form }); toast.success('Account created'); router.push('/') }
  catch { toast.error('Registration failed') }
}
</script>
