<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import type { FileUploadSelectEvent } from 'primevue/fileupload'

type Props = {
  maxSize: number
  extension: string
}

type File = {
  name: string
  size: number
  extension: string
}

const toast = useToast()
const props = defineProps<Props>()
const emit = defineEmits(['data'])
const error = ref<string | undefined>()
const file = ref<File>({ name: '', size: 0, extension: '' })

const handleFileChange = (event: FileUploadSelectEvent) => {
  const files = event.files
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
      toast.add({
        severity: 'success',
        summary: 'All good!',
        detail: 'File has been loaded and parsed.',
        life: 3000
      })
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
  <FileUpload
    mode="basic"
    accept="text/csv"
    :maxFileSize="1000000"
    @select="handleFileChange"
    chooseLabel="Browse"
  />
</template>

<style></style>
