import { defineStore } from 'pinia'
import { budgetsService } from '@/services/budgets.service'

export const useBudgetsStore = defineStore('budgets', {
  state: () => ({ monthly: 0, items: [], loading: false, error: null }),
  actions: {
    async fetch() {
      this.loading = true; this.error = null
      try { const { monthly, items } = await budgetsService.list(); this.monthly = monthly; this.items = items }
      catch (e) { this.error = e?.message || 'Failed to load budgets' }
      finally { this.loading = false }
    },
    async updateItem(id, b) { await budgetsService.update(id, b); this.items = this.items.map((x) => (x.id === id ? { ...x, ...b } : x)) },
    async setMonthly(v) { await budgetsService.setMonthly(v); this.monthly = v }
  }
})
