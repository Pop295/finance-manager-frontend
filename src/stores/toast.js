import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', {
  state: () => ({ items: [] }),
  actions: {
    push(message, type = 'success', timeout = 3200) {
      const id = Date.now() + Math.random()
      this.items.push({ id, message, type })
      setTimeout(() => this.dismiss(id), timeout)
    },
    success(m) { this.push(m, 'success') },
    error(m) { this.push(m, 'error') },
    info(m) { this.push(m, 'info') },
    dismiss(id) { this.items = this.items.filter((t) => t.id !== id) }
  }
})
