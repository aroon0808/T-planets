<template>
  <button @click="sorting(header)" class="sort-button">
    {{ header === 'rotation_period' ? underScoreFormatter(header) : header }}
    <IconSorting v-if="!direction" />
    <IconSortingDesc v-if="direction === 'DESC'" />
    <IconSortingAsc v-if="direction === 'ASC'" />
  </button>
</template>

<script setup>
import IconSorting from '@/assets/icons/IconSorting.vue'
import IconSortingDesc from '@/assets/icons/IconSortingDesc.vue'
import IconSortingAsc from '@/assets/icons/IconSortingAsc.vue'

import { defineProps } from 'vue'

import { underScoreFormatter } from '@/utils/underScoreFormatter.js'

const emit = defineEmits(['sorting'])

defineProps({
  header: {
    type: String,
    default: ''
  },
  direction: {
    type: String,
    default: ''
  }
})

const sorting = (header) => {
  emit('sorting', header)
}
</script>

<style scoped>
.sort-button {
  text-transform: capitalize;
  display: flex;
  cursor: pointer;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;
  background: transparent;
  border: none;
  color: #fff;
}
</style>
