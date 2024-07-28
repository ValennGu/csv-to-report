<script setup lang="ts">
import { ref } from 'vue'

import CsvFileUpload from '@/components/CsvFileUpload.vue'
import CategoriesChart from '@/components/CategoriesChart.vue'
import ExpensesTab from '@/components/ExpensesTab.vue'
import type { Data } from '@/models/data'
import { getCategories } from '@/models/categories'
import { getHeadersFromCSV } from '@/utils/getHeaders'
import { getDataFromCsv } from '@/utils/getData'

const headers = ref<string[]>([])
const data = ref<Data>([])
const categories = getCategories()
const control = [558.32, 400, 150, 200, 150, 150, 100, 29.96, 400]

const handleFileChange = (file: string) => {
  headers.value = getHeadersFromCSV(file)
  data.value = getDataFromCsv(file, headers.value)
}

const tabs = [
  { id: '0', text: 'Report', icon: 'pi pi-home' },
  { id: '1', text: 'Expenses', icon: 'pi pi-list' }
]
</script>

<template>
  <CsvFileUpload
    :max-size="500000"
    :extension="'csv'"
    @data="handleFileChange"
    v-if="!data.length"
  />

  <Tabs value="0" v-if="data.length > 0">
    <TabList>
      <Tab
        v-for="tab of tabs"
        :key="tab.id"
        :value="tab.id"
        :pt="{
          root: {
            style: {
              display: 'flex',
              gap: '10px',
              alignItems: 'center'
            }
          }
        }"
      >
        <i :class="tab.icon" />
        <span>{{ tab.text }}</span>
      </Tab>
    </TabList>
    <TabPanels>
      <TabPanel value="0">
        <CategoriesChart :categories="categories" :expenses="data" :control="control" />
      </TabPanel>
      <TabPanel value="1">
        <ExpensesTab :headers="headers" :data="data" :categories="categories" />
      </TabPanel>
    </TabPanels>
  </Tabs>

  <Toast position="top-right" />
</template>

<style scoped></style>
