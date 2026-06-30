<template>
  <div class="space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Transactions</h1>
        <p class="text-sm text-slate-400">{{ filtered.length }} records found.</p>
      </div>
      <BaseButton variant="primary" @click="openAdd">+ Add Transaction</BaseButton>
    </div>

    <BaseCard>
      <div class="mb-5 grid grid-cols-1 gap-3 md:grid-cols-4">
        <BaseInput v-model="filters.search" placeholder="🔍 Search by title..." />
        <DatePicker v-model="filters.date" label="" />
        <BaseSelect v-model="filters.category" placeholder="All categories" :options="categoryOptions" />
        <BaseSelect v-model="filters.type" placeholder="All types" :options="[{value:'income',label:'Income'},{value:'expense',label:'Expense'}]" />
      </div>

      <LoadingSpinner v-if="tx.loading" />
      <ErrorState v-else-if="tx.error" :message="tx.error" :on-retry="tx.fetch" />
      <EmptyState v-else-if="!filtered.length" message="No transactions match your filters." />
      <template v-else>
        <BaseTable :columns="cols">
          <tr v-for="t in paged" :key="t.id" class="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
            <td class="px-4 py-3 font-medium text-slate-700">{{ t.title }}</td>
            <td class="px-4 py-3"><span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{{ t.category }}</span></td>
            <td class="px-4 py-3 text-slate-500">{{ t.date }}</td>
            <td class="px-4 py-3">
              <span class="rounded-full px-2.5 py-1 text-xs font-semibold" :class="t.type==='income'?'bg-green-50 text-green-600':'bg-red-50 text-red-500'">{{ t.type }}</span>
            </td>
            <td class="px-4 py-3 text-right font-semibold" :class="t.type==='income'?'text-green-600':'text-red-500'">{{ t.type==='income'?'+':'-' }}{{ money(t.amount) }}</td>
            <td class="px-4 py-3 text-right">
              <button class="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-brand-600" @click="openEdit(t)">✏️</button>
              <button class="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500" @click="openDelete(t)">🗑️</button>
            </td>
          </tr>
        </BaseTable>

        <div class="mt-4 flex items-center justify-between text-sm text-slate-500">
          <span>Page {{ page }} of {{ totalPages }}</span>
          <div class="flex gap-2">
            <BaseButton variant="outline" :disabled="page===1" @click="page--">Prev</BaseButton>
            <BaseButton variant="outline" :disabled="page===totalPages" @click="page++">Next</BaseButton>
          </div>
        </div>
      </template>
    </BaseCard>

    <TransactionModal v-model="showForm" :transaction="editing" @save="onSave" />
    <DeleteConfirmModal v-model="showDelete" :name="deleting?.title" @confirm="onDelete" />
  </div>
</template>
<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import DatePicker from '@/components/ui/DatePicker.vue'
import BaseTable from '@/components/ui/BaseTable.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import ErrorState from '@/components/ui/ErrorState.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import TransactionModal from '@/components/transactions/TransactionModal.vue'
import DeleteConfirmModal from '@/components/transactions/DeleteConfirmModal.vue'
import { useTransactionsStore } from '@/stores/transactions'
import { useCategoriesStore } from '@/stores/categories'
import { useToastStore } from '@/stores/toast'

const tx = useTransactionsStore(); const categories = useCategoriesStore(); const toast = useToastStore()
const cols = [{key:'t',label:'Title'},{key:'c',label:'Category'},{key:'d',label:'Date'},{key:'ty',label:'Type'},{key:'a',label:'Amount'},{key:'x',label:''}]
const money = (n) => '$' + Number(n || 0).toLocaleString()

const filters = reactive({ search: '', date: '', category: '', type: '' })
const page = ref(1); const perPage = 8
const showForm = ref(false); const showDelete = ref(false)
const editing = ref(null); const deleting = ref(null)

const categoryOptions = computed(() => categories.items.map((c) => ({ value: c.name, label: c.name })))
const filtered = computed(() => tx.items.filter((t) => {
  if (filters.search && !t.title.toLowerCase().includes(filters.search.toLowerCase())) return false
  if (filters.date && t.date !== filters.date) return false
  if (filters.category && t.category !== filters.category) return false
  if (filters.type && t.type !== filters.type) return false
  return true
}))
const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / perPage)))
const paged = computed(() => filtered.value.slice((page.value - 1) * perPage, page.value * perPage))
watch(filtered, () => { if (page.value > totalPages.value) page.value = 1 })

function openAdd() { editing.value = null; showForm.value = true }
function openEdit(t) { editing.value = { ...t }; showForm.value = true }
function openDelete(t) { deleting.value = t; showDelete.value = true }

async function onSave(payload) {
  try {
    if (editing.value?.id) { await tx.update(editing.value.id, payload); toast.success('Transaction updated') }
    else { await tx.add(payload); toast.success('Transaction added') }
  } catch { toast.error('Could not save transaction') }
}
async function onDelete() {
  try { await tx.remove(deleting.value.id); toast.success('Transaction deleted') }
  catch { toast.error('Could not delete') }
  finally { showDelete.value = false }
}

onMounted(() => { tx.fetch(); categories.fetch() })
</script>
