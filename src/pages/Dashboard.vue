<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p class="text-sm text-slate-400">Welcome back, here is your financial overview.</p>
      </div>
    </div>

    <LoadingSpinner v-if="tx.loading" label="Loading dashboard..." />
    <ErrorState v-else-if="tx.error" :message="tx.error" :on-retry="load" />

    <template v-else>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Total Balance" :value="money(tx.balance)" icon="💰" tint="#eef4ff" />
        <StatCard label="Monthly Income" :value="money(tx.income)" icon="📥" tint="#ecfdf5" hint="+ this period" hint-class="text-green-500" />
        <StatCard label="Monthly Expenses" :value="money(tx.expenses)" icon="📤" tint="#fef2f2" hint="- this period" hint-class="text-red-500" />
        <StatCard label="Remaining Budget" :value="money(remaining)" icon="🎯" tint="#fffbeb" />
        <StatCard label="Transactions" :value="tx.count" icon="🧾" tint="#f5f3ff" />
      </div>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <BaseCard title="Monthly Spending" subtitle="Income vs expenses" class="lg:col-span-2">
          <div class="h-72"><LineChart :data="lineData" /></div>
        </BaseCard>
        <BaseCard title="Expense by Category">
          <div class="h-72"><PieChart :data="pieData" /></div>
        </BaseCard>
      </div>

      <BaseCard title="Recent Transactions">
        <template #actions><RouterLink to="/transactions" class="text-sm font-semibold text-brand-600 hover:underline">View all</RouterLink></template>
        <EmptyState v-if="!tx.recent.length" message="No transactions yet." />
        <BaseTable v-else :columns="cols">
          <tr v-for="t in tx.recent" :key="t.id" class="border-b border-slate-50 last:border-0">
            <td class="px-4 py-3 font-medium text-slate-700">{{ t.title }}</td>
            <td class="px-4 py-3 text-slate-500">{{ t.category }}</td>
            <td class="px-4 py-3 text-slate-500">{{ t.date }}</td>
            <td class="px-4 py-3 text-right font-semibold" :class="t.type === 'income' ? 'text-green-600' : 'text-red-500'">
              {{ t.type === 'income' ? '+' : '-' }}{{ money(t.amount) }}
            </td>
          </tr>
        </BaseTable>
      </BaseCard>
    </template>
  </div>
</template>
<script setup>
import { computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import BaseCard from '@/components/ui/BaseCard.vue'
import StatCard from '@/components/ui/StatCard.vue'
import BaseTable from '@/components/ui/BaseTable.vue'
import LineChart from '@/components/charts/LineChart.vue'
import PieChart from '@/components/charts/PieChart.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import ErrorState from '@/components/ui/ErrorState.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import { useTransactionsStore } from '@/stores/transactions'
import { useCategoriesStore } from '@/stores/categories'
import { useBudgetsStore } from '@/stores/budgets'

const tx = useTransactionsStore(); const categories = useCategoriesStore(); const budgets = useBudgetsStore()
const cols = [{ key: 't', label: 'Title' }, { key: 'c', label: 'Category' }, { key: 'd', label: 'Date' }, { key: 'a', label: 'Amount' }]
const money = (n) => '$' + Number(n || 0).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })
const remaining = computed(() => Math.max(budgets.monthly - tx.expenses, 0))

const pieData = computed(() => {
  const totals = {}
  tx.items.filter((t) => t.type === 'expense').forEach((t) => { totals[t.category] = (totals[t.category] || 0) + t.amount })
  const labels = Object.keys(totals)
  const colors = labels.map((l) => categories.items.find((c) => c.name === l)?.color || '#cbd5e1')
  return { labels, datasets: [{ data: Object.values(totals), backgroundColor: colors, borderWidth: 0 }] }
})

const lineData = computed(() => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  return {
    labels: months,
    datasets: [
      { label: 'Income', data: months.map((_, i) => 2600 + i * 90), borderColor: '#16a34a', backgroundColor: 'rgba(22,163,74,.08)', fill: true, tension: .4 },
      { label: 'Expenses', data: months.map((_, i) => 1700 + ((i * 130) % 700)), borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,.08)', fill: true, tension: .4 }
    ]
  }
})

async function load() { await Promise.all([tx.fetch(), categories.fetch(), budgets.fetch()]) }
onMounted(load)
</script>
