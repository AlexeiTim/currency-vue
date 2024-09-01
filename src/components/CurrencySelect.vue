<script setup lang="ts">
const props = defineProps<{
  currencies: string[]
}>()
const modelValue = defineModel({ default: '' })
</script>

<template>
  <ElSelect v-model="modelValue">
    <ElOption
      v-for="currency in props.currencies"
      :key="currency"
      :value="currency"
      :label="currency.toUpperCase()"
    >
    </ElOption>
  </ElSelect>
</template>
