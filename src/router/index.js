import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/auth',
    component: () => import('@/layouts/AuthLayout.vue'),
    meta: { guestOnly: true },
    children: [
      { path: '', redirect: '/auth/login' },
      { path: 'login', name: 'login', component: () => import('@/pages/auth/Login.vue') },
      { path: 'register', name: 'register', component: () => import('@/pages/auth/Register.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('@/layouts/DashboardLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'dashboard', component: () => import('@/pages/Dashboard.vue') },
      { path: 'transactions', name: 'transactions', component: () => import('@/pages/Transactions.vue') },
      { path: 'categories', name: 'categories', component: () => import('@/pages/Categories.vue') },
      { path: 'budgets', name: 'budgets', component: () => import('@/pages/Budgets.vue') },
      { path: 'reports', name: 'reports', component: () => import('@/pages/Reports.vue') },
      { path: 'profile', name: 'profile', component: () => import('@/pages/Profile.vue') }
    ]
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) return { name: 'login', query: { redirect: to.fullPath } }
  if (to.meta.guestOnly && auth.isAuthenticated) return { name: 'dashboard' }
  return true
})

export default router
