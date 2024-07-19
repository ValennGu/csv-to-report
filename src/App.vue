<script setup lang="ts">
import FileUpload from '@/components/FileUpload.vue'
</script>

<template>
  <FileUpload :max-size="500000" :extension="'csv'" @data="(data) => console.log(data)" />
</template>

<style scoped></style>
