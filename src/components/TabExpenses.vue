<script setup lang="ts">
import { computed, ref } from 'vue'
import { filterByCategories } from '@/utils/filterByCategories'
import { getCategories } from '@/models/categories'

type Props = {
  headers: string[]
  data: { [key: string]: string }[]
}

const props = defineProps<Props>()
const filterTerm = ref<string>('')
const filterCategory = ref<string>('All')

const filteredData = computed(() => {
  return filterByCategories(filterCategory.value, props.data).filter((elem) =>
    elem['Name'].includes(filterTerm.value)
  )
})

const totalAmount = computed(() => {
  return filteredData.value.reduce((total, curr) => total + parseFloat(curr['Amount']), 0)
})
</script>

<template>
  <Toolbar>
    <template #start>
      <IconField>
        <InputIcon style="top: 43%">
          <i class="pi pi-search" />
        </InputIcon>
        <InputText v-model="filterTerm" placeholder="Search" style="min-width: 275px" />
      </IconField>
    </template>
    <template #end>
      <SelectButton v-model="filterCategory" :options="getCategories()" aria-labelledby="basic" />
    </template>
  </Toolbar>
  <DataTable
    :value="filteredData"
    stripedRows
    :pt="{
      tbody: {
        style: {
          'user-select': 'none'
        }
      },
      emptymessagecell: {
        style: () => ({
          'user-select': 'none'
        })
      }
    }"
  >
    <Column v-for="header of headers" :key="header" :field="header" :header="header" />
    <template #empty>
      <Image src="data-not-found.jpg" alt="Empty table" width="250" />
    </template>
  </DataTable>
  <div
    style="display: flex; gap: 10px; justify-content: end; align-items: center; margin-top: 10px"
  >
    <b>Total:</b>
    <Chip :label="totalAmount.toFixed(2).toString().concat(' €')" />
  </div>
</template>
<style scoped></style>
