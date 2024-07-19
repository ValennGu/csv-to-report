<script setup lang="ts">
import { ref } from 'vue'
import FileUpload from '@/components/FileUpload.vue'
import { getHeadersFromCSV } from '@/utils/getHeaders'

const headers = ref<string[]>([])

const handleFileChange = (data: string) => {
  headers.value = getHeadersFromCSV(data)
}
</script>

<template>
  <FileUpload :max-size="500000" :extension="'csv'" @data="handleFileChange" />
  <h3>Headers</h3>
  <ul>
    <li v-for="header in headers" :key="header">{{ header }}</li>
  </ul>
</template>

<style scoped></style>
