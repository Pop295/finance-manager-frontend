import { defineStore } from 'pinia'
import { transactionsService } from '@/services/transactions.service'
import api from '@/services/api'

export const useTransactionsStore = defineStore('transactions', {
  state: () => ({ 
    items: [], 
    monthly_trend: [],
    balance: 0,
    income: 0,
    expenses: 0,
    remaining_budget: null,
    loading: false, 
    error: null 
  }),
  getters: {
    count: (s) => s.items.length,
    recent: (s) => [...s.items].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6)
  },
  actions: {
    async fetch() {
      this.loading = true; this.error = null
      try { 
        // ucitavamo transakcije i dashboard podatke istovremeno
        const [items, dashboard] = await Promise.all([
          transactionsService.list(),
          api.get('/dashboard').then(r => r.data)
        ])
        this.items = items
        this.monthly_trend = dashboard.monthly_trend || []
        this.balance = dashboard.balance || 0
        this.income = dashboard.income || 0
        this.expenses = dashboard.expenses || 0
        this.remaining_budget = dashboard.remaining_budget
      }
      catch (e) { this.error = e?.message || 'Failed to load transactions' }
      finally { this.loading = false }
    },
    async add(tx) { const item = await transactionsService.create(tx); this.items.unshift(item); return item },
    async update(id, tx) { 
      await transactionsService.update(id, tx)
      await this.fetch()
    },
    async remove(id) { await transactionsService.remove(id); this.items = this.items.filter((t) => t.id !== id) }
  }
})