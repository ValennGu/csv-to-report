<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import CsvFileUpload from '@/components/CsvFileUpload.vue'
import { getHeadersFromCSV } from '@/utils/getHeaders'
import { getDataFromCsv } from '@/utils/getData'
import { getUniqueCategories } from './utils/getUniqueCategories'

const headers = ref<string[]>([])
const data = ref<{ [key: string]: string }[]>([])
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

const chartData = ref()
const chartOptions = ref()

onMounted(() => {
  chartData.value = setChartData()
  chartOptions.value = setChartOptions()
})

const setChartData = () => {
  const documentStyle = getComputedStyle(document.body)

  return {
    labels: ['A', 'B', 'C'],
    datasets: [
      {
        data: [540, 325, 702],
        backgroundColor: [
          documentStyle.getPropertyValue('--p-cyan-500'),
          documentStyle.getPropertyValue('--p-orange-500'),
          documentStyle.getPropertyValue('--p-gray-500')
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue('--p-cyan-400'),
          documentStyle.getPropertyValue('--p-orange-400'),
          documentStyle.getPropertyValue('--p-gray-400')
        ]
      }
    ]
  }
}

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--p-text-color')

  return {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          color: textColor
        }
      }
    }
  }
}
</script>

<template>
  <CsvFileUpload :max-size="500000" :extension="'csv'" @data="handleFileChange" />
  <Chart type="pie" :data="chartData" :options="chartOptions" />
  <Toolbar>
    <template #start>
      <InputText v-model="filterTerm" placeholder="Search" :disabled="data.length === 0" />
      <Select
        v-model="filterCategory"
        :options="categories"
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
