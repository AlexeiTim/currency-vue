import { useCurrencyStore } from '@/stores/currency-store'
import { computed, onMounted, ref, watch } from 'vue'

export function useConverter() {
  const currencyStore = useCurrencyStore()

  const firstCurrency = ref(currencyStore.selectedCurrency || 'rub')
  const secondCurrency = ref(currencyStore.selectedCurrency === 'rub' ? 'usd' : 'rub')
  const firstCurrencyValue = ref(1)
  const secondCurrentValue = ref(1)

  /** Валюты не содержат валюту из второго селекта */
  const firstCurrencies = computed(() =>
    currencyStore.currencies.filter((c) => c !== secondCurrency.value)
  )

  /** Валюты не содержат валюту из первого селекта */
  const secondCurrencies = computed(() =>
    currencyStore.currencies.filter((c) => c !== firstCurrency.value)
  )

  /** Форматирование значения, для 2 знаков после запятой */
  function formatValue(value: string): string {
    const [integer, decimal = ''] = value.split('.')
    const formattedDecimal = decimal.substring(0, 2)
    return `${integer}.${formattedDecimal.padEnd(2, '0')}`
  }

  /** При изменении значения первой валюты конвертировать значение второй валюты */
  function convertFirstToSecond() {
    if (!currencyStore.currency) return
    const rate = currencyStore.currency[`${firstCurrency.value}-${secondCurrency.value}`]
    secondCurrentValue.value = +(rate * firstCurrencyValue.value).toFixed(2)
  }

  /** При изменения значения второй валюты конвертировать значение первой валюты */
  function convertSecondToFirst() {
    if (!currencyStore.currency) return
    const rate = currencyStore.currency[`${secondCurrency.value}-${firstCurrency.value}`]
    firstCurrencyValue.value = +(rate * secondCurrentValue.value).toFixed(2)
  }

  /** Обработчик для первого поля */
  function handleInputFirstCurrency(value: string) {
    firstCurrencyValue.value = +formatValue(value)
    convertFirstToSecond()
  }

  /** Обработчик для второго поля */
  function handleInputSecondCurrency(value: string) {
    secondCurrentValue.value = +formatValue(value)
    convertSecondToFirst()
  }

  /** При изменении выбранной валюты конвертирую на актуальную(изменяю относительно первой вторую валюту) */
  watch([firstCurrency, secondCurrency], () => {
    convertFirstToSecond()
  })

  /** При первом рендере необходимо конвертировать значение из первого инпута во второй */
  onMounted(() => {
    convertFirstToSecond()
  })

  return {
    firstCurrency,
    secondCurrency,
    firstCurrencyValue,
    secondCurrentValue,
    firstCurrencies,
    secondCurrencies,
    handleInputSecondCurrency,
    handleInputFirstCurrency
  }
}
