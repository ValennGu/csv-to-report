<script setup lang="ts">
import type { Data } from '@/models/data'
import CategoriesChart from './CategoriesChart.vue'
import { control } from '@/data/control'
import { getCategories } from '@/models/categories'
import { getIncome, getSpent } from '@/utils/getSpentByCategory'
import { computed } from 'vue'

type Props = {
  data: Data
}

const props = defineProps<Props>()
const categories = getCategories()

const outcome = getSpent(props.data)
const income = getIncome(props.data)

const diff = computed(() => income - outcome)
</script>

<template>
  <div style="display: flex; gap: 10px">
    <Card>
      <template #subtitle>Expenses Distribution</template>
      <template #content>
        <CategoriesChart :categories="categories" :expenses="props.data" :control="[]" />
      </template>
    </Card>
    <div class="container">
      <Card
        :pt="{
          content: {
            style: {
              'font-size': '40px',
              'font-weight': '800',
              width: '450px'
            }
          }
        }"
      >
        <template #subtitle>Your income this month has been </template>
        <template #content>{{ income.toFixed(2) }} €</template>
      </Card>
      <Card
        :pt="{
          content: {
            style: {
              'font-size': '40px',
              'font-weight': '800',
              width: '450px'
            }
          }
        }"
      >
        <template #subtitle>You spent this month</template>
        <template #content>- {{ outcome.toFixed(2) }} €</template>
      </Card>
      <Card
        :pt="{
          content: {
            style: {
              'font-size': '40px',
              'font-weight': '800',
              color: '#16a34a',
              width: '450px'
            }
          }
        }"
      >
        <template #subtitle>You saved this month</template>
        <template #content>{{ diff.toFixed(2) }} €</template>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
