import { defineStore } from 'pinia'
import { profileService } from '@/services/profile.service'

export const useProfileStore = defineStore('profile', {
  state: () => ({ data: null, loading: false }),
  actions: {
    async fetch() { this.loading = true; try { this.data = await profileService.get() } finally { this.loading = false } },
    async update(p) { this.data = await profileService.update(p); return this.data },
    async changePassword(payload) { return profileService.changePassword(payload) }
  }
})
