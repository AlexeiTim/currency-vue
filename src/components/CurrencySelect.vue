<script setup lang="ts">
import { useCurrencyStore } from '@/stores/currency-store'
import { storeToRefs } from 'pinia'

const currencyStore = useCurrencyStore()
const { selectedCurrency } = storeToRefs(currencyStore)
</script>

<template>
  <select v-model="selectedCurrency">
    <option v-for="currency in currencyStore.currencies" :key="currency" :value="currency">
      {{ currency.toUpperCase() }}
    </option>
  </select>
</template>

<style scoped></style>
