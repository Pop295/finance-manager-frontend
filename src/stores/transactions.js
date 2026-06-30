import { defineStore } from 'pinia'
import { transactionsService } from '@/services/transactions.service'

export const useTransactionsStore = defineStore('transactions', {
  state: () => ({ items: [], loading: false, error: null }),
  getters: {
    income: (s) => s.items.filter((t) => t.type === 'income').reduce((a, t) => a + t.amount, 0),
    expenses: (s) => s.items.filter((t) => t.type === 'expense').reduce((a, t) => a + t.amount, 0),
    balance() { return this.income - this.expenses },
    count: (s) => s.items.length,
    recent: (s) => [...s.items].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6)
  },
  actions: {
    async fetch() {
      this.loading = true; this.error = null
      try { this.items = await transactionsService.list() }
      catch (e) { this.error = e?.message || 'Failed to load transactions' }
      finally { this.loading = false }
    },
    async add(tx) { const item = await transactionsService.create(tx); this.items.unshift(item); return item },
    async update(id, tx) { await transactionsService.update(id, tx); this.items = this.items.map((t) => (t.id === id ? { ...t, ...tx } : t)) },
    async remove(id) { await transactionsService.remove(id); this.items = this.items.filter((t) => t.id !== id) }
  }
})
