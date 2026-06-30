import api, { USE_MOCK } from './api'
import { delay, mockTransactions, mockCategories } from './mock'

export const reportsService = {
  async get() {
    if (USE_MOCK) {
      await delay()
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
      const income = months.map((_, i) => 2600 + (i * 90))
      const expenses = months.map((_, i) => 1700 + ((i * 130) % 700))
      const byCategory = mockCategories.filter((c) => c.name !== 'Salary').map((c) => ({
        name: c.name, color: c.color,
        total: mockTransactions.filter((t) => t.categoryId === c.id).reduce((s, t) => s + t.amount, 0)
      }))
      return { months, income, expenses, byCategory }
    }
    const { data } = await api.get('/reports'); return data
  }
}
