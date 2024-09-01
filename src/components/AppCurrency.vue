<script setup lang="ts">
import { useCurrencyStore } from '@/stores/currency-store'
import { storeToRefs } from 'pinia'

const currencyStore = useCurrencyStore()
const { selectedCurrency, currentCurrency } = storeToRefs(currencyStore)
</script>

<template>
  <ElCard>
    <div v-for="currency in currentCurrency" :key="currency.name">
      1 {{ currency.name.toUpperCase() }} - {{ currency.value.toFixed(2) }}
      {{ selectedCurrency.toUpperCase() }}
    </div>
  </ElCard>
</template>
