import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { currencyService } from '@/services/api/rest/currency.service'
import type { Currency } from '@/types/currency'

const AVAILABEL_CURRENCIES = ['rub', 'eur', 'usd']

export const useCurrencyStore = defineStore('currency', () => {
  const isLoading = ref(false)
  const error = ref<any>(null)
  const currency = ref<Currency | null>(null)
  const selectedCurrency = ref('rub')

  async function getCurrency() {
    /** Если уже получал данные сразу возвращаю их(можно добавить пуллинг чтобы обновлять с течением времени) */
    if (currency.value) return currency.value

    isLoading.value = true
    error.value = null
    try {
      const { data } = await currencyService.getCurrency<Currency>()
      const filterdCurrencies = Object.fromEntries(
        Object.entries(data).filter(([key]) => {
          const keys = key.split('-')
          return AVAILABEL_CURRENCIES.includes(keys[0]) && AVAILABEL_CURRENCIES.includes(keys[1])
        })
      )
      return (currency.value = filterdCurrencies)
    } catch (e) {
      error.value = e
    } finally {
      isLoading.value = false
    }
  }

  const currentCurrency = computed(() => {
    if (!currency.value) return []
    const items = Object.entries(currency.value)
      .filter(([key]) => key.split('-')[1] === selectedCurrency.value)
      .map(([key, value]) => {
        const currentKey = key.split('-')[0]
        return {
          name: currentKey,
          value
        }
      })
    return items
  })

  const currencies = computed(() => {
    if (!currency.value) return []
    return [...new Set(Object.entries(currency.value).map(([key]) => key.split('-')[0]))]
  })

  return { isLoading, error, currency, getCurrency, currencies, selectedCurrency, currentCurrency }
})
