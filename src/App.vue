<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from './components/TheHeader.vue'
import { useCurrencyStore } from './stores/currency-store'
import { onMounted } from 'vue'
import { ElAlert, ElNotification } from 'element-plus'

const currencyStore = useCurrencyStore()

onMounted(async () => {
  await currencyStore.getCurrency()
  if (currencyStore.error) ElNotification.error('Failed to get currencies')
})
</script>

<template>
  <div v-if="currencyStore.isLoading" v-loading.fullscreen="currencyStore.isLoading" />
  <div v-else-if="currencyStore.error">
    <ElAlert type="error"> Failed to get currencies . Try again later</ElAlert>
  </div>
  <div v-else>
    <TheHeader style="margin-bottom: 10px" />
    <RouterView />
  </div>
</template>

<style scoped></style>
