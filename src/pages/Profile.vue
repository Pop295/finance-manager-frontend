<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-slate-800">Profile & Settings</h1>
      <p class="text-sm text-slate-400">Manage your account information.</p>
    </div>

    <LoadingSpinner v-if="store.loading" />
    <div v-else-if="store.data" class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <BaseCard class="lg:col-span-1">
        <div class="flex flex-col items-center text-center">
          <img :src="store.data.avatar" class="h-24 w-24 rounded-full object-cover ring-4 ring-brand-50" />
          <h3 class="mt-4 text-lg font-semibold text-slate-800">{{ store.data.name }}</h3>
          <p class="text-sm text-slate-400">{{ store.data.email }}</p>
          <BaseButton variant="outline" class="mt-4">Change avatar</BaseButton>
        </div>
      </BaseCard>

      <div class="space-y-6 lg:col-span-2">
        <BaseCard title="Personal Information">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <BaseInput v-model="profile.name" label="Full name" />
            <BaseInput v-model="profile.email" label="Email" type="email" />
            <BaseSelect v-model="profile.currency" label="Currency" :options="['USD','EUR','GBP','JPY']" />
          </div>
          <div class="mt-5"><BaseButton variant="primary" @click="saveProfile">Save changes</BaseButton></div>
        </BaseCard>

        <BaseCard title="Change Password">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div class="sm:col-span-2"><BaseInput v-model="pwd.current" label="Current password" type="password" /></div>
            <BaseInput v-model="pwd.next" label="New password" type="password" />
            <BaseInput v-model="pwd.confirm" label="Confirm new password" type="password" :error="pwdError" />
          </div>
          <div class="mt-5"><BaseButton variant="primary" @click="changePassword">Update password</BaseButton></div>
        </BaseCard>

        <BaseCard title="Settings">
          <div class="space-y-4">
            <label class="flex items-center justify-between">
              <span class="text-sm text-slate-600">Email notifications</span>
              <input v-model="settings.emails" type="checkbox" class="h-5 w-5 rounded accent-brand-600" />
            </label>
            <label class="flex items-center justify-between">
              <span class="text-sm text-slate-600">Budget overspend alerts</span>
              <input v-model="settings.alerts" type="checkbox" class="h-5 w-5 rounded accent-brand-600" />
            </label>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref, watch, onMounted } from 'vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import { useProfileStore } from '@/stores/profile'
import { useToastStore } from '@/stores/toast'

const store = useProfileStore(); const toast = useToastStore()
const profile = reactive({ name: '', email: '', currency: 'USD' })
const pwd = reactive({ current: '', next: '', confirm: '' })
const settings = reactive({ emails: true, alerts: true })
const pwdError = ref('')

watch(() => store.data, (d) => { if (d) Object.assign(profile, { name: d.name, email: d.email, currency: d.currency }) })

async function saveProfile() { await store.update({ ...profile }); toast.success('Profile updated') }
async function changePassword() {
  pwdError.value = pwd.next && pwd.next === pwd.confirm ? '' : 'Passwords do not match'
  if (pwdError.value) return
  await store.changePassword({ current: pwd.current, next: pwd.next })
  toast.success('Password changed'); Object.assign(pwd, { current: '', next: '', confirm: '' })
}
onMounted(store.fetch)
</script>
