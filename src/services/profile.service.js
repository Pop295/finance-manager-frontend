import api, { USE_MOCK } from './api'
import { delay, mockProfile } from './mock'

export const profileService = {
  async get() { if (USE_MOCK) { await delay(); return { ...mockProfile } } const { data } = await api.get('/profile'); return data },
  async update(p) { if (USE_MOCK) { await delay(); return { ...mockProfile, ...p } } const { data } = await api.put('/profile', p); return data },
  async changePassword(payload) { if (USE_MOCK) { await delay(); return { success: true } } const { data } = await api.put('/profile/password', payload); return data }
}
