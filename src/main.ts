import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'

import App from './App.vue'
import { Noir } from './assets/noir'

import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import FileUpload from 'primevue/fileupload'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import Toolbar from 'primevue/toolbar'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Chart from 'primevue/chart'
import SelectButton from 'primevue/selectbutton'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Noir
  }
})
app.use(ToastService)

app.component('Button', Button)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('FileUpload', FileUpload)
app.component('Toast', Toast)
app.component('Toolbar', Toolbar)
app.component('InputText', InputText)
app.component('Select', Select)
app.component('Chart', Chart)
app.component('SelectButton', SelectButton)
app.component('IconField', IconField)
app.component('InputIcon', InputIcon)

app.mount('#app')
