import { defineStore } from 'pinia'
import { reportsService } from '@/services/reports.service'

export const useReportsStore = defineStore('reports', {
  state: () => ({ data: null, loading: false, error: null }),
  actions: {
    async fetch() {
      this.loading = true; this.error = null
      try { this.data = await reportsService.get() }
      catch (e) { this.error = e?.message || 'Failed to load reports' }
      finally { this.loading = false }
    }
  }
})
