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
  handleInputFirstCurrency,
  handleInputSecondCurrency
} = useConverter()
</script>

<template>
  <ElCard>
    <h1>Converter</h1>
    <ElForm>
      <ElFormItem>
        <div class="form__item">
          <CurrencySelect v-model="firstCurrency" :currencies="firstCurrencies" />
          <ElInput
            v-model.number="firstCurrencyValue"
            type="number"
            @input="handleInputFirstCurrency"
          />
        </div>
      </ElFormItem>

      <ElFormItem>
        <div class="form__item">
          <CurrencySelect v-model="secondCurrency" :currencies="secondCurrencies" />
          <ElInput
            v-model.number="secondCurrentValue"
            type="number"
            @input="handleInputSecondCurrency"
          />
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
