import api, { USE_MOCK } from './api'
import { delay, mockBudgets } from './mock'

let cache = [...mockBudgets]
let monthly = 3500

export const budgetsService = {
  async list() { if (USE_MOCK) { await delay(); return { monthly, items: [...cache] } } const { data } = await api.get('/budgets'); return data },
  async update(id, b) { if (USE_MOCK) { await delay(); cache = cache.map((x) => (x.id === id ? { ...x, ...b } : x)); return { ...b, id } } const { data } = await api.put(`/budgets/${id}`, b); return data },
  async setMonthly(value) { if (USE_MOCK) { await delay(); monthly = value; return { monthly } } const { data } = await api.put('/budgets/monthly', { monthly: value }); return data }
}
