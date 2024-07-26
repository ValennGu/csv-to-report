<script setup lang="ts">
import { computed, ref } from 'vue'

import CsvFileUpload from '@/components/CsvFileUpload.vue'
import CategoriesChart from '@/components/CategoriesChart.vue'

import { getHeadersFromCSV } from '@/utils/getHeaders'
import { getDataFromCsv } from '@/utils/getData'
import { getUniqueCategories } from './utils/getUniqueCategories'

const headers = ref<string[]>([])
const data = ref<{ [key: string]: string }[]>([])
const control = [400, 120, 150, 100, 29.96, 145, 220, 100, 80, 120, 558.32]

const filterTerm = ref<string>('')
const filterCategory = ref<string>('All')

const filteredData = computed(() => {
  return filterByCategories().filter((elem) => elem['Name'].includes(filterTerm.value))
})
const categories = computed(() => {
  return getUniqueCategories(data.value.map((elem) => elem['Category']))
})
const displayContent = computed(() => {
  return data.value.length > 0
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
  <CsvFileUpload
    :max-size="500000"
    :extension="'csv'"
    @data="handleFileChange"
    v-if="!displayContent"
  />
  <CategoriesChart
    v-if="displayContent"
    :categories="categories"
    :expenses="data"
    :control="control"
  />
  <Toolbar v-if="displayContent">
    <template #start>
      <IconField>
        <InputIcon style="top: 43%">
          <i class="pi pi-search" />
        </InputIcon>
        <InputText v-model="filterTerm" placeholder="Search" style="min-width: 400px" />
      </IconField>
    </template>
    <template #end>
      <SelectButton
        v-model="filterCategory"
        :options="[
          'All',
          'Mortgage',
          'Home',
          'Investment',
          'Groceries',
          'Gas',
          'Services',
          'Gym',
          'Cats',
          'Services',
          'Extra'
        ]"
        aria-labelledby="basic"
      />
    </template>
  </Toolbar>
  <DataTable v-if="displayContent" :value="filteredData" stripedRows>
    <Column v-for="header of headers" :key="header" :field="header" :header="header" />
  </DataTable>
  <Toast position="top-right" />
</template>

<style scoped></style>
