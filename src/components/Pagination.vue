<template>
  <div class="pagination-wrapper">
    <button class="previous" :disabled="!status.previous" @click="changePagination('previous')"><ChevronLeft/></button>
    <button class="next" :disabled="!status.next" @click="changePagination ('next')"><ChevronRight/></button>
  </div>
</template>


<script setup>
import ChevronLeft from "@/assets/icons/IconChevronLeft.vue";
import ChevronRight from "@/assets/icons/IconChevronRight.vue";

import { defineProps } from "vue";

const emit = defineEmits(['pagination'])

defineProps({
  status: {
    type: Object,
    default: null
  },
});

const changePagination = (e) => {
  emit('pagination', e)
}
</script>

<style>
.pagination-wrapper {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 2rem 0;
}

.previous,
.next {
  background-color: #e6007d;
  border: none;
  border-radius: 15%;
  padding: 2px;
  cursor: pointer;
}

.previous:disabled {
  background-color: #c3c3c3;
}

.next:disabled {
  background-color: #c3c3c3;
}

svg {
  height: 100%;
}

</style>

