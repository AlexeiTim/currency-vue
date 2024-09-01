import { useCurrencyStore } from '@/stores/currency-store'
import { formatCurrencyNumber } from '@/utils/formatCurrencyNumber'
import { computed, onMounted, ref, watch } from 'vue'

export function useConverter() {
  const currencyStore = useCurrencyStore()

  const firstCurrency = ref(currencyStore.selectedCurrency || 'rub')
  const secondCurrency = ref(currencyStore.selectedCurrency === 'rub' ? 'usd' : 'rub')
  const firstCurrencyError = ref('')
  const secondCurrencyError = ref('')

  const firstCurrencyValue = ref('1')
  const secondCurrentValue = ref('1')

  /** Валюты не содержат валюту из второго селекта */
  const firstCurrencies = computed(() =>
    currencyStore.currencies.filter((c) => c !== secondCurrency.value)
  )

  /** Валюты не содержат валюту из первого селекта */
  const secondCurrencies = computed(() =>
    currencyStore.currencies.filter((c) => c !== firstCurrency.value)
  )

  /** Валидация от ИИ */
  function containsInvalidCharacters(value: string): boolean {
    return /[^0-9.,]/.test(value) || (value.match(/[.,]/g) || []).length > 1
  }

  /** При изменении значения первой валюты конвертировать значение второй валюты */
  function convertFirstToSecond() {
    if (!currencyStore.currency) return
    const rate = currencyStore.currency[`${firstCurrency.value}-${secondCurrency.value}`]
    secondCurrentValue.value = (rate * +firstCurrencyValue.value).toFixed(2)
  }

  /** При изменения значения второй валюты конвертировать значение первой валюты */
  function convertSecondToFirst() {
    if (!currencyStore.currency) return
    const rate = currencyStore.currency[`${secondCurrency.value}-${firstCurrency.value}`]
    firstCurrencyValue.value = (rate * +secondCurrentValue.value).toFixed(2)
  }

  /** Обработчик для первого поля */
  function handleInputFirstCurrency(value: string) {
    if (containsInvalidCharacters(value)) {
      firstCurrencyError.value = 'Not valid'
      return
    }
    firstCurrencyError.value = ''
    firstCurrencyValue.value = formatCurrencyNumber(value)
    convertFirstToSecond()
  }

  /** Обработчик для второго поля */
  function handleInputSecondCurrency(value: string) {
    if (containsInvalidCharacters(value)) {
      secondCurrencyError.value = 'Not valid'
      return
    }
    secondCurrencyError.value = ''
    secondCurrentValue.value = formatCurrencyNumber(value)
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
    secondCurrencyError,
    firstCurrencyError,
    handleInputSecondCurrency,
    handleInputFirstCurrency
  }
}
