import api, { USE_MOCK } from './api'
import { delay, mockProfile } from './mock'

export const profileService = {
  async get() { if (USE_MOCK) { await delay(); return { ...mockProfile } } const { data } = await api.get('/profile'); return data },
  async update(p) { if (USE_MOCK) { await delay(); return { ...mockProfile, ...p } } const { data } = await api.put('/profile', p); return data },
  async uploadAvatar(file) {
    if (USE_MOCK) {
      await delay()
      const avatar = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
      return { ...mockProfile, avatar }
    }
    const form = new FormData()
    form.append('avatar', file)
    const { data } = await api.post('/profile/avatar', form, { headers: { 'Content-Type': 'multipart/form-data' } })
    return data
  },
  async changePassword(payload) { if (USE_MOCK) { await delay(); return { success: true } } const { data } = await api.put('/profile/password', payload); return data }
}
