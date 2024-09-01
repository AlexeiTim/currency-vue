<script setup lang="ts">
import { useConverter } from '@/composables/useConverter'
import { useCurrencyStore } from '@/stores/currency-store'

const {
  firstCurrency,
  secondCurrency,
  firstCurrencyValue,
  secondCurrentValue,
  handleInputFirstCurrency,
  handleInputSecondCurrency
} = useConverter()
const currencyStore = useCurrencyStore()
</script>

<template>
  <div>
    <h1>Convert</h1>
    <form>
      <div>
        <select v-model="firstCurrency">
          <option
            v-for="currency in currencyStore.currencies.filter((c) => c !== secondCurrency)"
            :key="currency"
            :value="currency"
          >
            {{ currency.toUpperCase() }}
          </option>
        </select>
        <input v-model="firstCurrencyValue" type="number" @input="handleInputFirstCurrency" />
      </div>

      <div>
        <select v-model="secondCurrency">
          <option
            v-for="currency in currencyStore.currencies.filter((c) => c !== firstCurrency)"
            :key="currency"
            :value="currency"
          >
            {{ currency.toUpperCase() }}
          </option>
        </select>
        <input v-model="secondCurrentValue" type="number" @input="handleInputSecondCurrency" />
      </div>
    </form>
  </div>
</template>

<style></style>
