<template>
  <SearchForm @search="handleSearch" />
  <div class="table-wrapper">
    <table class="table">
      <thead>
        <tr>
          <th v-for="(header, i) in headers" :key="`${header}-${i}`">
            <Sorting
              v-if="header !== 'url'"
              :header="header"
              :direction="getDirection(header)"
              @sorting="handleSorting"
            />
            <span class="header" v-if="header === 'url'">{{ header }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, i) in sortedItems" :key="i">
          <td :data-label="'Name'">{{ data.name }}</td>
          <td :data-label="'Population'">{{ data.population }}</td>
          <td :data-label="'Rotation Period'">{{ data.rotation_period }}</td>
          <td :data-label="'Climate'">{{ data.climate }}</td>
          <td :data-label="'Gravity'">{{ data.gravity }}</td>
          <td :data-label="'Created'">{{ dateFormatter(data.created) }}</td>
          <td :data-label="'URL'">
            <a :href="data.url" target="_blank">{{ data.url }}</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Pagination @pagination="handlePagination" :status="data" />
</template>

<script setup>
import { computed, defineProps, ref, watch } from 'vue'

import SearchForm from '@/components/SearchForm.vue'
import Pagination from '@/components/Pagination.vue'
import Sorting from '@/components/Sorting.vue'

import { dateFormatter } from '@/utils/dateFormatter.js'

const emit = defineEmits(['pagination'])

const searchFilter = ref('')

const props = defineProps({
  headers: {
    type: Array,
    default: () => []
  },
  data: {
    type: Object,
    default: () => {}
  }
})

const sortBy = ref(null)
const sortDirection = ref('')
const sortedItems = ref([])

const filteredItems = computed(() => {
  if (searchFilter.value !== '') {
    const filter = searchFilter.value.trim().toLowerCase()
    return props.data.results?.filter(
      (item) =>
        item.name.toLowerCase().includes(filter) ||
        item.population.includes(filter) ||
        item.rotation_period.includes(filter) ||
        item.climate.toLowerCase().includes(filter) ||
        item.gravity.toLowerCase().includes(filter) ||
        item.created.toLowerCase().includes(filter)
    )
  }
  return props.data.results
})

const handleSorting = (header) => {
  if (sortBy.value === header) {
    sortDirection.value =
      sortDirection.value === 'ASC' ? 'DESC' : sortDirection.value === 'DESC' ? null : 'ASC'
    if (!sortDirection.value) sortBy.value = null
  } else {
    sortBy.value = header
    sortDirection.value = 'ASC'
  }
  sortedItems.value = applySort(filteredItems.value)
}

const getDirection = (header) => {
  return sortBy.value === header ? sortDirection.value : ''
}

const applySort = (items) => {
  if (!sortBy.value) {
    return items
  }
  const sortedItems = items.slice()

  sortedItems.sort((a, b) => {
    const direction = sortDirection.value === 'ASC' ? 1 : -1
    switch (sortBy.value) {
      case 'population':
      case 'rotation_period':
        const valueA = isNaN(a[sortBy.value]) ? Infinity : Number(a[sortBy.value])
        const valueB = isNaN(b[sortBy.value]) ? Infinity : Number(b[sortBy.value])
        return (valueA - valueB) * direction
      default:
        return a[sortBy.value].localeCompare(b[sortBy.value]) * direction
    }
  })

  return sortedItems
}

watch(
  filteredItems,
  (newFilteredItems) => {
    sortedItems.value = applySort(newFilteredItems)
  },
  { immediate: true }
)

watch([sortBy, sortDirection], () => {
  sortedItems.value = applySort(filteredItems.value)
})

const handleSearch = (search) => {
  searchFilter.value = search
}

const handlePagination = (pagination) => {
  emit('pagination', pagination)
}
</script>

<style scoped>
.table-wrapper {
  overflow-x: auto;
  margin: 0 auto;
  min-height: 40.625rem;
}

table {
  width: 100%;
  margin-bottom: 1.25rem;
  border-collapse: collapse;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  table-layout: fixed;
}

table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

thead tr {
  text-transform: capitalize;
  text-align: left;
  background-color: #e6007d;
  color: #ffffff;
}

tr:last-of-type {
  border-bottom: 2px solid #e6007d;
}

td {
  height: 2.5rem;
  min-width: 6.25rem;
}

th,
td {
  padding: 1rem;
  height: 3.125rem;
  overflow: hidden;
}

tbody {
  background-color: #ffffff;
}

@media (max-width: 1200px) {
  table {
    width: 100%;
    display: block;
  }
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }

  th,
  td {
    padding: 0.5rem;
  }

  th {
    padding-right: 1.5rem;
  }

  th button {
    width: 100%;
  }

  td {
    width: 100%;
    text-align: right;
    padding: 0.5rem;
    max-width: unset;
  }

  td:before {
    content: attr(data-label);
    position: absolute;
    left: 1.5625rem;
    font-weight: bold;
  }

  .header {
    display: none;
  }
}
</style>
