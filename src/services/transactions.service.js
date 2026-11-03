import api, { USE_MOCK } from './api'
import { delay, mockTransactions } from './mock'

function buildMockDashboard(items) {
  const monthKey = (d) => d.slice(0, 7)
  const current = new Date().toISOString().slice(0, 7)
  const sum = (list, type) => list.filter((t) => t.type === type).reduce((s, t) => s + Number(t.amount || 0), 0)
  const thisMonth = items.filter((t) => monthKey(t.date) === current)
  const trend = []
  for (let i = 5; i >= 0; i--) {
    const d = new Date(); d.setDate(1); d.setMonth(d.getMonth() - i)
    const key = d.toISOString().slice(0, 7)
    const list = items.filter((t) => monthKey(t.date) === key)
    trend.push({ month: key, income: sum(list, 'income'), expenses: sum(list, 'expense') })
  }
  return {
    balance: sum(items, 'income') - sum(items, 'expense'),
    income: sum(thisMonth, 'income'),
    expenses: sum(thisMonth, 'expense'),
    remaining_budget: null,
    monthly_trend: trend
  }
}

let cache = [...mockTransactions]

export const transactionsService = {
  async dashboard() {
    if (USE_MOCK) { await delay(); return buildMockDashboard(cache) }
    const { data } = await api.get('/dashboard'); return data
  },
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
