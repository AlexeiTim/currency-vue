<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from './components/TheHeader.vue'
import { useCurrencyStore } from './stores/currency-store'
import { onMounted } from 'vue'

const currencyStore = useCurrencyStore()

onMounted(async () => {
  await currencyStore.getCurrency()
})
</script>

<template>
  <TheHeader />
  <div v-if="currencyStore.isLoading">Loading...</div>
  <RouterView v-else />
</template>

<style scoped></style>
