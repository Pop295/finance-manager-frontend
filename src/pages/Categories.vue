<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Categories</h1>
        <p class="text-sm text-slate-400">Organize your transactions.</p>
      </div>
      <BaseButton variant="primary" @click="openAdd">+ Add Category</BaseButton>
    </div>

    <LoadingSpinner v-if="store.loading" />
    <ErrorState v-else-if="store.error" :message="store.error" :on-retry="store.fetch" />
    <EmptyState v-else-if="!store.items.length" message="Create your first category." />
    <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <BaseCard v-for="c in store.items" :key="c.id">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <span class="flex h-11 w-11 items-center justify-center rounded-xl text-xl" :style="{ background: c.color + '22' }">{{ c.icon }}</span>
            <div>
              <p class="font-semibold text-slate-800">{{ c.name }}</p>
              <span class="inline-flex items-center gap-1 text-xs text-slate-400"><span class="h-3 w-3 rounded-full" :style="{ background: c.color }" />{{ c.color }}</span>
            </div>
          </div>
          <div class="flex gap-1">
            <button class="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-brand-600" @click="openEdit(c)">✏️</button>
            <button class="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500" @click="openDelete(c)">🗑️</button>
          </div>
        </div>
      </BaseCard>
    </div>

    <BaseModal v-model="showForm" :title="editing?.id ? 'Edit Category' : 'Add Category'">
      <div class="space-y-4">
        <BaseInput v-model="form.name" label="Name" placeholder="e.g. Groceries" :error="nameError" />
        <BaseSelect v-model="form.icon" label="Icon" :options="icons" />
        <div>
          <label class="label-base">Color</label>
          <div class="flex items-center gap-3">
            <input v-model="form.color" type="color" class="h-10 w-14 cursor-pointer rounded-lg border border-slate-200" />
            <BaseInput v-model="form.color" class="flex-1" />
          </div>
        </div>
      </div>
      <template #footer>
        <BaseButton variant="secondary" @click="showForm=false">Cancel</BaseButton>
        <BaseButton variant="primary" @click="save">Save</BaseButton>
      </template>
    </BaseModal>

    <DeleteConfirmModal v-model="showDelete" :name="deleting?.name" @confirm="onDelete" />
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import ErrorState from '@/components/ui/ErrorState.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import DeleteConfirmModal from '@/components/transactions/DeleteConfirmModal.vue'
import { useCategoriesStore } from '@/stores/categories'
import { useToastStore } from '@/stores/toast'

const store = useCategoriesStore(); const toast = useToastStore()
const icons = ['💼','🛒','🏠','🚗','🎬','🩺','✈️','🍔','📱','🎓','💡','🎁']
const showForm = ref(false); const showDelete = ref(false)
const editing = ref(null); const deleting = ref(null); const nameError = ref('')
const form = reactive({ name: '', color: '#3366ff', icon: '💼' })

function openAdd() { editing.value = null; Object.assign(form, { name: '', color: '#3366ff', icon: '💼' }); showForm.value = true }
function openEdit(c) { editing.value = c; Object.assign(form, { name: c.name, color: c.color, icon: c.icon }); showForm.value = true }
function openDelete(c) { deleting.value = c; showDelete.value = true }

async function save() {
  nameError.value = form.name ? '' : 'Name is required'
  if (nameError.value) return
  try {
    if (editing.value?.id) { await store.update(editing.value.id, { ...form }); toast.success('Category updated') }
    else { await store.add({ ...form }); toast.success('Category added') }
    showForm.value = false
  } catch { toast.error('Could not save category') }
}
async function onDelete() {
  try { await store.remove(deleting.value.id); toast.success('Category deleted') }
  catch { toast.error('Could not delete') }
  finally { showDelete.value = false }
}
onMounted(store.fetch)
</script>
