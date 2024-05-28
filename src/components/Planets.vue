<template>
  <Table :headers="headers" :data="planetsData" @pagination="handlePagination" />
</template>

<script setup>
import { ref, onMounted } from 'vue'

import { apiClient } from '@/utils/axios'
import { filterProperties } from '@/utils/filterProperties'

import Table from './Table.vue'

const planetsData = ref({})
const headers = ref([])
const propertiesToKeep = [
  'name',
  'population',
  'rotation_period',
  'climate',
  'gravity',
  'created',
  'url'
]

const fetchData = (url = 'https://swapi.dev/api/planets') => {
  apiClient
    .get(url)
    .then((response) => {
      planetsData.value = filterProperties(response.data, propertiesToKeep)
      headers.value = getHeaders(planetsData.value.results[0])
    })
    .then(() => {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    })
    .catch((error) => {
      console.error('Error fetching data:', error)
    })
}

const handlePagination = (ev) => {
  const url = planetsData.value?.[ev]
  if (url) fetchData(url)
}

const getHeaders = (headers) => {
  return Object.keys(headers)
}

onMounted(fetchData)
</script>
