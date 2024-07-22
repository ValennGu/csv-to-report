<script setup lang="ts">
import { ref } from 'vue'
import FileUpload from '@/components/FileUpload.vue'
import { getHeadersFromCSV } from '@/utils/getHeaders'
import { getDataFromCsv } from './utils/getData'

const headers = ref<string[]>([])
const data = ref<{ [key: string]: string }[]>([])

const handleFileChange = (file: string) => {
  headers.value = getHeadersFromCSV(file)
  data.value = getDataFromCsv(file, headers.value)

  console.log(data.value)
}
</script>

<template>
  <FileUpload :max-size="500000" :extension="'csv'" @data="handleFileChange" />
  <h3>Headers</h3>
  <ul>
    <li v-for="header in headers" :key="header">{{ header }}</li>
  </ul>
  <h3>Rows</h3>
  <ul>
    <li v-for="item in data" :key="item.name">{{ item }}</li>
  </ul>
  <Button label="Cancel" />

  <DataTable :value="data" v-if="data.length > 0">
    <Column field="name" header="Name" />
    <Column field="amount" header="Amount" />
    <Column field="date" header="Date" />
    <Column field="entity" header="Entity" />
    <Column field="category" header="Category" />
  </DataTable>
</template>

<style scoped></style>
