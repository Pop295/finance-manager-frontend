<template>
  <BaseModal :model-value="modelValue" :title="isEdit ? 'Edit Transaction' : 'Add Transaction'" @update:model-value="$emit('update:modelValue', $event)">
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div class="sm:col-span-2"><BaseInput v-model="form.title" label="Title" placeholder="e.g. Grocery shopping" :error="errors.title" /></div>
      <BaseInput v-model.number="form.amount" label="Amount" type="number" placeholder="0.00" :error="errors.amount" />
      <DatePicker v-model="form.date" label="Date" />
      <BaseSelect v-model="form.type" label="Type" :options="[{value:'expense',label:'Expense'},{value:'income',label:'Income'}]" />
      <BaseSelect v-model="form.categoryId" label="Category" placeholder="Select category" :options="categoryOptions" />
      <div class="sm:col-span-2">
        <label class="label-base">Description</label>
        <textarea v-model="form.description" rows="3" class="input-base" placeholder="Optional notes..." />
      </div>
    </div>
    <template #footer>
      <BaseButton variant="secondary" @click="$emit('update:modelValue', false)">Cancel</BaseButton>
      <BaseButton variant="primary" @click="save">{{ isEdit ? 'Save changes' : 'Add transaction' }}</BaseButton>
    </template>
  </BaseModal>
</template>
<script setup>
import { reactive, computed, watch } from 'vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import DatePicker from '@/components/ui/DatePicker.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useCategoriesStore } from '@/stores/categories'

const props = defineProps({ modelValue: Boolean, transaction: Object })
const emit = defineEmits(['update:modelValue', 'save'])
const categories = useCategoriesStore()
const isEdit = computed(() => !!props.transaction?.id)
const categoryOptions = computed(() => categories.items.map((c) => ({ value: c.id, label: `${c.icon} ${c.name}` })))

const empty = () => ({ title: '', amount: null, date: new Date().toISOString().slice(0, 10), type: 'expense', categoryId: '', description: '' })
const form = reactive(empty())
const errors = reactive({ title: '', amount: '' })

watch(() => props.modelValue, (open) => {
  if (open) Object.assign(form, props.transaction ? { ...props.transaction } : empty())
})

function save() {
  errors.title = form.title ? '' : 'Title is required'
  errors.amount = form.amount > 0 ? '' : 'Enter a valid amount'
  if (errors.title || errors.amount) return
  const cat = categories.items.find((c) => c.id === Number(form.categoryId))
  emit('save', { ...form, amount: Number(form.amount), categoryId: Number(form.categoryId), category: cat?.name || 'Uncategorized' })
  emit('update:modelValue', false)
}
</script>
