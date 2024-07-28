<script setup lang="ts">
import type { Data } from '@/models/data'
import CategoriesChart from './CategoriesChart.vue'
import { control } from '@/data/control'
import { getCategories } from '@/models/categories'

type Props = {
  data: Data
}

const props = defineProps<Props>()
const categories = getCategories()
</script>
<template>
  <CategoriesChart :categories="categories" :expenses="props.data" :control="control" />
</template>
<style scoped></style>
