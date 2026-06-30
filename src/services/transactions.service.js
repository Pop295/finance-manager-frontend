import api, { USE_MOCK } from './api'
import { delay, mockTransactions } from './mock'

let cache = [...mockTransactions]

export const transactionsService = {
  async list() {
    if (USE_MOCK) { await delay(); return [...cache] }
    const { data } = await api.get('/transactions'); return data
  },
  async create(tx) {
    if (USE_MOCK) { await delay(); const item = { ...tx, id: Date.now() }; cache.unshift(item); return item }
    const { data } = await api.post('/transactions', tx); return data
  },
  async update(id, tx) {
    if (USE_MOCK) { await delay(); cache = cache.map((t) => (t.id === id ? { ...t, ...tx } : t)); return { ...tx, id } }
    const { data } = await api.put(`/transactions/${id}`, tx); return data
  },
  async remove(id) {
    if (USE_MOCK) { await delay(); cache = cache.filter((t) => t.id !== id); return true }
    await api.delete(`/transactions/${id}`); return true
  }
}
