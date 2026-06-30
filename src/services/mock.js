// Mock data + helpers so the app runs without the Flask backend.
const delay = (ms = 350) => new Promise((r) => setTimeout(r, ms))

export const mockCategories = [
  { id: 1, name: 'Salary', color: '#16a34a', icon: '💼' },
  { id: 2, name: 'Groceries', color: '#f59e0b', icon: '🛒' },
  { id: 3, name: 'Rent', color: '#ef4444', icon: '🏠' },
  { id: 4, name: 'Transport', color: '#3b82f6', icon: '🚗' },
  { id: 5, name: 'Entertainment', color: '#a855f7', icon: '🎬' },
  { id: 6, name: 'Health', color: '#06b6d4', icon: '🩺' }
]

const titles = ['Monthly salary', 'Supermarket', 'Apartment rent', 'Fuel', 'Cinema night',
  'Pharmacy', 'Bonus', 'Coffee', 'Uber ride', 'Streaming subscription']

export const mockTransactions = Array.from({ length: 47 }).map((_, i) => {
  const cat = mockCategories[i % mockCategories.length]
  const type = cat.name === 'Salary' ? 'income' : 'expense'
  const d = new Date()
  d.setDate(d.getDate() - i * 2)
  return {
    id: i + 1,
    title: titles[i % titles.length],
    amount: type === 'income' ? 2500 + (i % 3) * 250 : 12 + ((i * 37) % 320),
    date: d.toISOString().slice(0, 10),
    category: cat.name,
    categoryId: cat.id,
    type,
    description: 'Auto-generated sample transaction.'
  }
})

export const mockBudgets = mockCategories
  .filter((c) => c.name !== 'Salary')
  .map((c, i) => ({ id: i + 1, categoryId: c.id, category: c.name, limit: [800, 1500, 300, 200, 250][i] || 300 }))

export const mockProfile = {
  id: 1, name: 'Alex Morgan', email: 'alex@finflow.app',
  avatar: 'https://i.pravatar.cc/120?img=12', currency: 'USD'
}

export { delay }
