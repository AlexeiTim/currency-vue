<script setup lang="ts">
import { useCurrencyStore } from '@/stores/currency-store'
import CurrencySelect from './CurrencySelect.vue'
import { storeToRefs } from 'pinia'

const currencyStore = useCurrencyStore()
const { selectedCurrency } = storeToRefs(currencyStore)
</script>

<template>
  <header>
    <nav class="header__nav">
      <RouterLink to="/">
        <ElLink> Home </ElLink>
      </RouterLink>
      <RouterLink to="/convert">
        <ElLink>Convert</ElLink>
      </RouterLink>
      <CurrencySelect
        style="width: 100px"
        :currencies="currencyStore.currencies"
        v-model="selectedCurrency"
      />
    </nav>
  </header>
</template>

<style scoped>
.header__nav {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
