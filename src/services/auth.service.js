import api, { USE_MOCK } from './api'
import { delay, mockProfile } from './mock'

export const authService = {
  async login(payload) {
    if (USE_MOCK) {
      await delay()
      return { token: 'mock.jwt.token', user: { ...mockProfile, email: payload.email } }
    }
    const { data } = await api.post('/auth/login', payload)
    return data
  },
  async register(payload) {
    if (USE_MOCK) {
      await delay()
      return { token: 'mock.jwt.token', user: { ...mockProfile, name: payload.name, email: payload.email } }
    }
    const { data } = await api.post('/auth/register', payload)
    return data
  }
}
