<script setup lang="ts">
import { getSpentByCategory } from '@/utils/getSpentByCategory'
import { computed, ref } from 'vue'

type Props = {
  categories: string[]
  expenses: { [key: string]: string }[]
  control?: number[]
}

const props = defineProps<Props>()

const chartData = computed(() => {
  return setChartData(props.categories)
})
const chartOptions = ref({
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
        color: '--p-gray-400'
      }
    }
  }
})

const setChartData = (categories: string[]) => {
  return {
    labels: categories,
    datasets: [
      {
        label: ['Expenses'],
        data: categories.map((c) => getSpentByCategory(props.expenses, c)),
        borderColor: '#000000',
        pointBackgroundColor: '#000000',
        backgroundColor: '#00000020',
        pointBorderColor: '#000000'
      },
      {
        label: ['Control'],
        data: props.control,
        borderColor: '#60A6FA',
        backgroundColor: '#60A6FA50',
        pointBackgroundColor: '#60A6FA',
        pointBorderColor: '#60A6FA'
      }
    ]
  }
}
</script>

<template>
  <div class="a">
    <Chart type="radar" :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
.a {
  width: 600px;
}
</style>
