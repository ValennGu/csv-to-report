<script setup lang="ts">
import { computed, ref } from 'vue'
import { filterByCategories } from '@/utils/filterByCategories'

type Props = {
  headers: string[]
  data: { [key: string]: string }[]
  categories: string[]
}

const props = defineProps<Props>()
const filterTerm = ref<string>('')
const filterCategory = ref<string>('All')

const filteredData = computed(() => {
  return filterByCategories(filterCategory.value, props.data).filter((elem) =>
    elem['Name'].includes(filterTerm.value)
  )
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
      <SelectButton v-model="filterCategory" :options="props.categories" aria-labelledby="basic" />
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
</template>
<style scoped></style>
