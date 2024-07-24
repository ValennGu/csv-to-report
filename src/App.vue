<script setup lang="ts">
import { computed, ref } from 'vue'
import CsvFileUpload from '@/components/CsvFileUpload.vue'
import { getHeadersFromCSV } from '@/utils/getHeaders'
import { getDataFromCsv } from '@/utils/getData'
import { getUniqueCategories } from './utils/getUniqueCategories'
import CategoriesChart from './components/CategoriesChart.vue'

const headers = ref<string[]>([])
const data = ref<{ [key: string]: string }[]>([])
const control = [400, 120, 150, 100, 29.96, 145, 220, 100, 80, 120, 558.32]

const filterTerm = ref<string>('')
const filterCategory = ref<string>('')

const filteredData = computed(() => {
  return filterByCategories().filter((elem) => elem['Name'].includes(filterTerm.value))
})
const categories = computed(() => {
  return getUniqueCategories(data.value.map((elem) => elem['Category']))
})

const filterByCategories = () => {
  if (filterCategory.value === 'All') {
    return [...data.value]
  }

  return [...data.value].filter((elem) => elem['Category'].includes(filterCategory.value))
}

const handleFileChange = (file: string) => {
  headers.value = getHeadersFromCSV(file)
  data.value = getDataFromCsv(file, headers.value)
}
</script>

<template>
  <CsvFileUpload :max-size="500000" :extension="'csv'" @data="handleFileChange" />
  <CategoriesChart
    v-if="data.length > 0"
    :categories="categories"
    :expenses="data"
    :control="control"
  />
  <Toolbar>
    <template #start>
      <InputText v-model="filterTerm" placeholder="Search" :disabled="data.length === 0" />
      <Select
        v-model="filterCategory"
        :options="['All', ...categories]"
        :disabled="data.length === 0"
        placeholder="Select a Category"
        class="w-full md:w-56"
      />
    </template>
  </Toolbar>
  <DataTable :value="filteredData" v-if="data.length > 0">
    <Column v-for="header of headers" :key="header" :field="header" :header="header" />
  </DataTable>
  <Toast position="top-right" />
</template>

<style scoped></style>
