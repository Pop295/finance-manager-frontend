import api, { USE_MOCK } from './api'
import { delay, mockProfile } from './mock'

export const profileService = {
  async get() { if (USE_MOCK) { await delay(); return { ...mockProfile } } const { data } = await api.get('/profile'); return data },
  async update(p) { if (USE_MOCK) { await delay(); return { ...mockProfile, ...p } } const { data } = await api.put('/profile', p); return data },
  async changePassword(payload) { if (USE_MOCK) { await delay(); return { success: true } } const { data } = await api.put('/profile/password', payload); return data },
  async uploadAvatar(formData) {
    if (USE_MOCK) {
      await delay()
      const file = formData.get('avatar')
      return { avatar: file ? URL.createObjectURL(file) : mockProfile.avatar }
    }
    const { data } = await api.post('/profile/avatar', formData, {
      headers: { 'Content-Type': undefined } // pusti browser da postavi ispravan multipart boundary
    })
    return data
  }
}