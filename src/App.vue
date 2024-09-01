<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from './components/TheHeader.vue'
import { useCurrencyStore } from './stores/currency-store'
import { onMounted } from 'vue'
import { ElNotification } from 'element-plus'

const currencyStore = useCurrencyStore()

onMounted(async () => {
  await currencyStore.getCurrency()
  if (currencyStore.error) ElNotification.error('Не удалось получить валюты')
})
</script>

<template>
  <TheHeader style="margin-bottom: 10px" />
  <div v-if="currencyStore.isLoading" v-loading.fullscreen="currencyStore.isLoading" />
  <RouterView v-else />
</template>

<style scoped></style>
