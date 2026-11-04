import { defineStore } from 'pinia'
import { profileService } from '@/services/profile.service'
import { useAuthStore } from '@/stores/auth'

export const useProfileStore = defineStore('profile', {
  state: () => ({ data: null, loading: false }),
  actions: {
    syncAuth() {
      // Topbar cita ime i avatar iz auth store-a, pa ih drzimo uskladjenim
      if (this.data) useAuthStore().setUser({ name: this.data.name, avatar: this.data.avatar })
    },
    async fetch() { this.loading = true; try { this.data = await profileService.get(); this.syncAuth() } finally { this.loading = false } },
    async update(p) { this.data = await profileService.update(p); this.syncAuth(); return this.data },
    async uploadAvatar(file) {
      const updated = await profileService.uploadAvatar(file)
      this.data.avatar = updated.avatar
      this.syncAuth()
      return updated
    },
    async changePassword(payload) { return profileService.changePassword(payload) }
  }
})
