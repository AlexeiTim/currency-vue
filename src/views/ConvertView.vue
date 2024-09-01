<script setup lang="ts">
import { useCurrencyStore } from '@/stores/currency-store'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'

const currencyStore = useCurrencyStore()
const { selectedCurrency } = storeToRefs(currencyStore)
const firstCurrency = ref(currencyStore.selectedCurrency || 'rub')
const secondCurrency = ref(currencyStore.selectedCurrency === 'rub' ? 'usd' : 'rub')

function updateCurrencies() {
  firstCurrency.value = currencyStore.selectedCurrency || 'rub'
  secondCurrency.value = currencyStore.selectedCurrency === 'rub' ? 'usd' : 'rub'
}
const firstCurrencyValue = ref(1)
const secondCurrentValue = ref(1)

function formatValue(value: string): string {
  let [integer, decimal] = value.split('.')
  if (decimal) {
    decimal = decimal.substring(0, 2)
  }
  return `${integer}.${decimal || '00'}`
}

function convertFirstToSecond() {
  if (!currencyStore.currency) return
  const rate = currencyStore.currency[`${firstCurrency.value}-${secondCurrency.value}`]
  secondCurrentValue.value = +(rate * firstCurrencyValue.value).toFixed(2)
}

function convertSecondToFirst() {
  if (!currencyStore.currency) return
  const rate = currencyStore.currency[`${secondCurrency.value}-${firstCurrency.value}`]
  firstCurrencyValue.value = +(rate * secondCurrentValue.value).toFixed(2)
}

function handleInputFirstCurrency(event: Event) {
  const target = event.target as HTMLInputElement
  firstCurrencyValue.value = +formatValue(target.value)
  convertFirstToSecond()
}

function handleInputSecondCurrency(event: Event) {
  const target = event.target as HTMLInputElement
  secondCurrentValue.value = +formatValue(target.value)
  convertSecondToFirst()
}

watch([firstCurrency, secondCurrency], () => {
  convertFirstToSecond()
})

watch(selectedCurrency, () => {
  updateCurrencies()
  convertFirstToSecond()
})

onMounted(() => {
  convertFirstToSecond()
})
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
