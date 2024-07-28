<script setup lang="ts">
import { ref } from 'vue'
import type { Data } from '@/models/data'

import CsvFileUpload from '@/components/CsvFileUpload.vue'
import TabReport from '@/components/TabReport.vue'
import TabExpenses from '@/components/TabExpenses.vue'
import { getHeadersFromCSV } from '@/utils/getHeaders'
import { getDataFromCsv } from '@/utils/getData'

const headers = ref<string[]>([])
const data = ref<Data>([])

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
        <TabReport :data="data" />
      </TabPanel>
      <TabPanel value="1">
        <TabExpenses :headers="headers" :data="data" />
      </TabPanel>
    </TabPanels>
  </Tabs>

  <Toast position="top-right" />
</template>

<style scoped></style>
