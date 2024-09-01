/** Форматирование значения
 * Утилиту попросил у ИИ
 */
export function formatCurrencyNumber(value: string): string {
  let normalizedValue = value.replace(',', '.')
  if (value.length === 2 && value[0] === '0' && value[1] !== '.') return value[1]

  normalizedValue = normalizedValue.replace(/[^0-9.]/g, '')

  const parts = normalizedValue.split('.')
  if (parts.length > 2) {
    normalizedValue = `${parts[0]}.${parts.slice(1).join('')}`
  }

  if (parts[1]) {
    normalizedValue = `${parts[0]}.${parts[1].slice(0, 2)}`
  }

  if (normalizedValue === '' || normalizedValue === '.') {
    return '0'
  }

  return normalizedValue
}
