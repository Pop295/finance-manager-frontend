<template>
  <div class="flex h-screen overflow-hidden bg-slate-50">
    <div class="hidden md:block"><Sidebar /></div>
    <Transition name="fade">
      <div v-if="open" class="fixed inset-0 z-40 md:hidden">
        <div class="absolute inset-0 bg-slate-900/40" @click="open = false" />
        <div class="relative h-full w-64"><Sidebar /></div>
      </div>
    </Transition>
    <div class="flex flex-1 flex-col overflow-hidden">
      <Topbar @toggle="open = !open" />
      <main class="flex-1 overflow-y-auto p-6">
        <RouterView v-slot="{ Component }">
          <Transition name="fade" mode="out-in"><component :is="Component" /></Transition>
        </RouterView>
      </main>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import Sidebar from '@/components/layout/Sidebar.vue'
import Topbar from '@/components/layout/Topbar.vue'
const open = ref(false)
</script>
