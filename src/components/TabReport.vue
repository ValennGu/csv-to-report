<script setup lang="ts">
import type { Data } from '@/models/data'
import CategoriesChart from './CategoriesChart.vue'
import { control } from '@/data/control'
import { getCategories } from '@/models/categories'
import { getSpent } from '@/utils/getSpentByCategory'
import { computed } from 'vue'

type Props = {
  data: Data
}

const props = defineProps<Props>()
const categories = getCategories()

const outcome = getSpent(props.data)
const income = 2900
const diff = computed(() => income - outcome)
</script>
ç
<template>
  <div class="container">
    <Card
      :pt="{
        content: {
          style: {
            'font-size': '70px',
            'font-weight': '800',
            color: '#16a34a'
          }
        }
      }"
    >
      <template #subtitle>You saved this month</template>
      <template #content>+ {{ diff.toFixed(2) }} €</template>
    </Card>
    <Card>
      <template #subtitle>Expenses Distribution</template>
      <template #content>
        <CategoriesChart :categories="categories" :expenses="props.data" :control="[]" />
      </template>
    </Card>
  </div>
</template>
<style scoped>
.container {
  display: flex;
  flex: 1 1;
}
</style>
