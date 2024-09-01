import { useCurrencyStore } from '@/stores/currency-store'
import { onMounted, ref, watch } from 'vue'

export function useConverter() {
  const currencyStore = useCurrencyStore()

  const firstCurrency = ref(currencyStore.selectedCurrency || 'rub')
  const secondCurrency = ref(currencyStore.selectedCurrency === 'rub' ? 'usd' : 'rub')
  const firstCurrencyValue = ref(1)
  const secondCurrentValue = ref(1)

  function formatValue(value: string): string {
    const [integer, decimal = ''] = value.split('.')
    const formattedDecimal = decimal.substring(0, 2)
    return `${integer}.${formattedDecimal.padEnd(2, '0')}`
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

  function handleInputFirstCurrency(value: string) {
    firstCurrencyValue.value = +formatValue(value)
    convertFirstToSecond()
  }

  function handleInputSecondCurrency(value: string) {
    secondCurrentValue.value = +formatValue(value)
    convertSecondToFirst()
  }

  watch([firstCurrency, secondCurrency], () => {
    convertFirstToSecond()
  })

  onMounted(() => {
    convertFirstToSecond()
  })

  return {
    firstCurrency,
    secondCurrency,
    firstCurrencyValue,
    secondCurrentValue,
    handleInputSecondCurrency,
    handleInputFirstCurrency
  }
}
