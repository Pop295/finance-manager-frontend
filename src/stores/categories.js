import { defineStore } from 'pinia'
import { categoriesService } from '@/services/categories.service'

export const useCategoriesStore = defineStore('categories', {
  state: () => ({ items: [], loading: false, error: null }),
  actions: {
    async fetch() {
      this.loading = true; this.error = null
      try { this.items = await categoriesService.list() }
      catch (e) { this.error = e?.message || 'Failed to load categories' }
      finally { this.loading = false }
    },
    async add(c) { const item = await categoriesService.create(c); this.items.push(item); return item },
    async update(id, c) { await categoriesService.update(id, c); this.items = this.items.map((x) => (x.id === id ? { ...x, ...c } : x)) },
    async remove(id) { await categoriesService.remove(id); this.items = this.items.filter((x) => x.id !== id) }
  }
})
