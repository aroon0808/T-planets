<template>
  <form @submit.prevent="">
    <div class="searchWrapper">
      <input type="text" v-model="searchValue" @input="search" placeholder="Search" />
      <button v-if="searchValue" @click="search" class="close">
        <IconClose class="close-icon" />
      </button>
    </div>
  </form>
</template>

<script setup>
import IconClose from '@/assets/icons/IconClose.vue'

import { ref } from 'vue'

const emit = defineEmits(['search'])
const searchValue = ref('')

const search = (e) => {
  const value = e.target.value || ''
  searchValue.value = value
  emit('search', value)
}
</script>

<style scoped>
.searchWrapper {
  position: relative;
  margin-top: 5rem;
  margin-bottom: 2rem;
}

.close {
  position: absolute;
  left: 10rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.close-icon {
  margin-top: 11px;
}

input {
  border: 1px solid #c3c3c3;
  border-radius: 0.5rem;
  padding: 10px;
}

input:focus-visible {
  border: 1px solid #e6007d;
  outline: 1px solid #e6007d;
}
</style>
