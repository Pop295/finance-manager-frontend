<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Budgets</h1>
        <p class="text-sm text-slate-400">Track spending against your limits.</p>
      </div>
    </div>

    <LoadingSpinner v-if="store.loading || tx.loading" />
    <ErrorState v-else-if="store.error" :message="store.error" :on-retry="load" />
    <template v-else>
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <BaseCard title="Monthly Budget" class="lg:col-span-1">
          <p class="text-3xl font-bold text-slate-800">{{ money(store.monthly) }}</p>
          <p class="mt-1 text-sm text-slate-400">Spent {{ money(totalSpent) }} this month</p>
          <div class="mt-4"><ProgressBar label="Overall" :value="totalSpent" :max="store.monthly" /></div>
          <div class="mt-4 flex gap-2">
            <BaseInput v-model.number="newMonthly" type="number" class="flex-1" />
            <BaseButton variant="primary" @click="saveMonthly">Update</BaseButton>
          </div>
        </BaseCard>

        <BaseCard title="Budget per Category" class="lg:col-span-2">
          <div v-if="overBudget.length" class="mb-4 rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-600">
            ⚠️ You are over budget in {{ overBudget.join(', ') }}.
          </div>
          <div class="space-y-5">
            <div v-for="b in withSpent" :key="b.id">
              <ProgressBar :label="`${b.category} — ${money(b.spent)} / ${money(b.limit)}`" :value="b.spent" :max="b.limit" :color="b.color" />
            </div>
          </div>
        </BaseCard>
      </div>
    </template>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import ProgressBar from '@/components/ui/ProgressBar.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import ErrorState from '@/components/ui/ErrorState.vue'
import { useBudgetsStore } from '@/stores/budgets'
import { useTransactionsStore } from '@/stores/transactions'
import { useCategoriesStore } from '@/stores/categories'
import { useToastStore } from '@/stores/toast'

const store = useBudgetsStore(); const tx = useTransactionsStore(); const categories = useCategoriesStore(); const toast = useToastStore()
const newMonthly = ref(0)
const money = (n) => '$' + Number(n || 0).toLocaleString()

const spentByCat = computed(() => {
  const m = {}
  tx.items.filter((t) => t.type === 'expense').forEach((t) => { m[t.categoryId] = (m[t.categoryId] || 0) + t.amount })
  return m
})
const withSpent = computed(() => store.items.map((b) => ({
  ...b, spent: spentByCat.value[b.categoryId] || 0,
  color: categories.items.find((c) => c.id === b.categoryId)?.color
})))
const totalSpent = computed(() => withSpent.value.reduce((s, b) => s + b.spent, 0))
const overBudget = computed(() => withSpent.value.filter((b) => b.spent > b.limit).map((b) => b.category))

async function saveMonthly() { await store.setMonthly(Number(newMonthly.value)); toast.success('Monthly budget updated') }
async function load() { await Promise.all([store.fetch(), tx.fetch(), categories.fetch()]); newMonthly.value = store.monthly }
onMounted(load)
</script>
