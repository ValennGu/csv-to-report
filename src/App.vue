<script setup lang="ts">
import { computed, ref } from 'vue'
import CsvFileUpload from '@/components/CsvFileUpload.vue'
import { getHeadersFromCSV } from '@/utils/getHeaders'
import { getDataFromCsv } from '@/utils/getData'

const headers = ref<string[]>([])
const data = ref<{ [key: string]: string }[]>([])
const filter = ref<string>('')

const filteredData = computed(() => {
  return [...data.value].filter((elem) => elem['Name'].includes(filter.value))
})

const handleFileChange = (file: string) => {
  headers.value = getHeadersFromCSV(file)
  data.value = getDataFromCsv(file, headers.value)
}
</script>

<template>
  <CsvFileUpload :max-size="500000" :extension="'csv'" @data="handleFileChange" />
  <Toolbar>
    <template #start>
      <InputText v-model="filter" placeholder="Search" :disabled="data.length === 0" />
    </template>
  </Toolbar>
  <DataTable :value="filteredData" v-if="data.length > 0">
    <Column v-for="header of headers" :key="header" :field="header" :header="header" />
  </DataTable>
  <Toast position="top-right" />
</template>

<style scoped></style>
