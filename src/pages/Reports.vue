<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-slate-800">Reports</h1>
      <p class="text-sm text-slate-400">Analytics and insights into your finances.</p>
    </div>

    <LoadingSpinner v-if="store.loading" />
    <ErrorState v-else-if="store.error" :message="store.error" :on-retry="store.fetch" />
    <template v-else-if="store.data">
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Income" :value="money(sum(store.data.income))" icon="📥" tint="#ecfdf5" />
        <StatCard label="Total Expenses" :value="money(sum(store.data.expenses))" icon="📤" tint="#fef2f2" />
        <StatCard label="Net Savings" :value="money(sum(store.data.income)-sum(store.data.expenses))" icon="💰" tint="#eef4ff" />
        <StatCard label="Top Category" :value="topCategory.name" icon="🏆" tint="#fffbeb" />
      </div>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <BaseCard title="Monthly Expenses"><div class="h-72"><BarChart :data="expenseBar" /></div></BaseCard>
        <BaseCard title="Monthly Income"><div class="h-72"><BarChart :data="incomeBar" /></div></BaseCard>
        <BaseCard title="Expenses by Category"><div class="h-72"><PieChart :data="pie" /></div></BaseCard>
        <BaseCard title="Top Spending Categories">
          <div class="space-y-4">
            <div v-for="c in topCategories" :key="c.name">
              <ProgressBar :label="`${c.name} — ${money(c.total)}`" :value="c.total" :max="topCategories[0].total" :color="c.color" />
            </div>
          </div>
        </BaseCard>
      </div>
    </template>
  </div>
</template>
<script setup>
import { computed, onMounted } from 'vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import StatCard from '@/components/ui/StatCard.vue'
import ProgressBar from '@/components/ui/ProgressBar.vue'
import BarChart from '@/components/charts/BarChart.vue'
import PieChart from '@/components/charts/PieChart.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import ErrorState from '@/components/ui/ErrorState.vue'
import { useReportsStore } from '@/stores/reports'

const store = useReportsStore()
const money = (n) => '$' + Number(n || 0).toLocaleString()
const sum = (arr) => (arr || []).reduce((a, b) => a + b, 0)

const expenseBar = computed(() => ({ labels: store.data.months, datasets: [{ label: 'Expenses', data: store.data.expenses, backgroundColor: '#ef4444', borderRadius: 6 }] }))
const incomeBar = computed(() => ({ labels: store.data.months, datasets: [{ label: 'Income', data: store.data.income, backgroundColor: '#16a34a', borderRadius: 6 }] }))
const topCategories = computed(() => [...store.data.byCategory].sort((a, b) => b.total - a.total))
const topCategory = computed(() => topCategories.value[0] || { name: '—' })
const pie = computed(() => ({ labels: topCategories.value.map((c) => c.name), datasets: [{ data: topCategories.value.map((c) => c.total), backgroundColor: topCategories.value.map((c) => c.color), borderWidth: 0 }] }))

onMounted(store.fetch)
</script>
