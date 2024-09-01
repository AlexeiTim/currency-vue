<script setup lang="ts">
import CurrencySelect from '@/components/CurrencySelect.vue'
import { useConverter } from '@/composables/useConverter'

const {
  firstCurrency,
  secondCurrency,
  firstCurrencyValue,
  secondCurrentValue,
  firstCurrencies,
  secondCurrencies,
  firstCurrencyError,
  secondCurrencyError,
  handleInputFirstCurrency,
  handleInputSecondCurrency
} = useConverter()
</script>

<template>
  <ElCard>
    <h1>Converter</h1>
    <ElForm>
      <ElFormItem :error="firstCurrencyError">
        <div class="form__item">
          <CurrencySelect v-model="firstCurrency" :currencies="firstCurrencies" />
          <ElInput
            step="0.01"
            v-model="firstCurrencyValue"
            type="text"
            @input="handleInputFirstCurrency"
          />
        </div>
      </ElFormItem>

      <ElFormItem :error="secondCurrencyError">
        <div class="form__item">
          <CurrencySelect v-model="secondCurrency" :currencies="secondCurrencies" />
          <ElInput v-model="secondCurrentValue" type="text" @input="handleInputSecondCurrency" />
        </div>
      </ElFormItem>
    </ElForm>
  </ElCard>
</template>

<style scoped>
.form__item {
  display: flex;
  align-items: center;
  gap: 1px;
}
</style>
