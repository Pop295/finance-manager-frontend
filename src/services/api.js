import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000
})

// Attach JWT from storage on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ff_access_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Global 401 handling
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('ff_access_token')
      localStorage.removeItem('ff_user')
      if (!location.pathname.startsWith('/auth')) location.href = '/auth/login'
    }
    return Promise.reject(error)
  }
)

export const USE_MOCK = String(import.meta.env.VITE_USE_MOCK ?? 'true') === 'true'
export default api
