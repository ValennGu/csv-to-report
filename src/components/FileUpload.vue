<script setup lang="ts">
import { ref } from 'vue'

type Props = {
  maxSize: number
  extension: string
}

type File = {
  name: string
  size: number
  extension: string
}

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget
}

const props = defineProps<Props>()
const emit = defineEmits(['data'])

const error = ref<string | undefined>()
const file = ref<File>({ name: '', size: 0, extension: '' })

const handleFileChange = (event: Event) => {
  const files = (event as HTMLInputEvent).target.files
  error.value = undefined

  if (files && files[0]) {
    const upload = files[0]

    file.value.name = upload.name.split('.').shift() ?? ''
    file.value.extension = upload.name.split('.').pop() ?? ''
    file.value.size = upload.size

    if (isFileExtensionValid(file.value.extension) && isFileSizeValid(file.value.size)) {
      const reader = new FileReader()
      reader.onload = (data) => {
        emit('data', data.target?.result)
      }

      reader.readAsText(upload)
    }
  }
}

const isFileSizeValid = (size: number) => {
  if (size > props.maxSize) {
    error.value = 'File is too large.'
    return false
  }

  return true
}

const isFileExtensionValid = (ext: string) => {
  if (ext !== props.extension) {
    error.value = `Extension ${ext} is not supported file must be in ${props.extension} format.`
    return false
  }

  return true
}
</script>

<template>
  <input type="file" name="" id="" @change="handleFileChange($event)" />
  <div class="info" v-if="!error">
    ----
    <span>File name: {{ file.name || '--' }}</span>
    <span>File size: {{ file.size || '--' }}</span>
    <span>File extension: {{ file.extension || '--' }}</span>
  </div>

  <div v-if="error">
    {{ error }}
  </div>
</template>

<style>
.info {
  display: flex;
  flex-wrap: wrap;
}

span {
  width: 100%;
}
</style>
