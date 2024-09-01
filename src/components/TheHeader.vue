<script setup lang="ts">
import CurrencySelect from './CurrencySelect.vue'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/convert">Convert</RouterLink>
      <CurrencySelect />
    </nav>
  </header>
</template>

<style scoped></style>
