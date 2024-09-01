<script setup lang="ts">
import { useCurrencyStore } from '@/stores/currency-store'
import { storeToRefs } from 'pinia'

const currencyStore = useCurrencyStore()
const { isLoading, error, selectedCurrency, currentCurrency } = storeToRefs(currencyStore)
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-if="!isLoading && !error">
    <div v-for="currency in currentCurrency" :key="currency.name">
      1 {{ currency.name.toUpperCase() }} - {{ currency.value.toFixed(2) }}
      {{ selectedCurrency.toUpperCase() }}
    </div>
  </div>
  <main>Main</main>
  <div></div>
</template>
