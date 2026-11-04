import { defineStore } from 'pinia'
import { authService } from '@/services/auth.service'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('ff_access_token') || null,
    user: JSON.parse(localStorage.getItem('ff_user') || 'null'),
    loading: false
  }),
  getters: { isAuthenticated: (s) => !!s.token },
  actions: {
    persist() {
      if (this.token) localStorage.setItem('ff_access_token', this.token)
      else localStorage.removeItem('ff_access_token')
      if (this.user) localStorage.setItem('ff_user', JSON.stringify(this.user))
      else localStorage.removeItem('ff_user')
    },
    async login(payload) {
      this.loading = true
      try {
        const { token, user } = await authService.login(payload)
        this.token = token; this.user = user; this.persist()
      } finally { this.loading = false }
    },
    async register(payload) {
      this.loading = true
      try {
        const { token, user } = await authService.register(payload)
        this.token = token; this.user = user; this.persist()
      } finally { this.loading = false }
    },
    // Azurira podatke prijavljenog korisnika (npr. avatar) i cuva ih
    setUser(patch) {
      if (!this.user) return
      this.user = { ...this.user, ...patch }
      try { this.persist() } catch { /* localStorage pun - ignorisemo */ }
    },
    logout() { this.token = null; this.user = null; this.persist() }
  }
})
