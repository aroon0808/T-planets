<script setup>
  import Planets from '@/components/Planets.vue'
</script>

<template>
  <header>
    <img alt="T-Planets logo" class="logo" src="./assets/logo.svg" width="60" height="60" />
  </header>

  <main>
    <Planets />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1200px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 1rem;
  }
}
</style>
