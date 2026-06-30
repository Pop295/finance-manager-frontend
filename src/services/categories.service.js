import api, { USE_MOCK } from './api'
import { delay, mockCategories } from './mock'

let cache = [...mockCategories]

export const categoriesService = {
  async list() { if (USE_MOCK) { await delay(); return [...cache] } const { data } = await api.get('/categories'); return data },
  async create(c) { if (USE_MOCK) { await delay(); const item = { ...c, id: Date.now() }; cache.push(item); return item } const { data } = await api.post('/categories', c); return data },
  async update(id, c) { if (USE_MOCK) { await delay(); cache = cache.map((x) => (x.id === id ? { ...x, ...c } : x)); return { ...c, id } } const { data } = await api.put(`/categories/${id}`, c); return data },
  async remove(id) { if (USE_MOCK) { await delay(); cache = cache.filter((x) => x.id !== id); return true } await api.delete(`/categories/${id}`); return true }
}
