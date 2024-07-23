import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import { Noir } from './assets/noir'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import FileUpload from 'primevue/fileupload'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import Toolbar from 'primevue/toolbar'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Noir
  }
})
app.component('Button', Button)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('FileUpload', FileUpload)
app.component('Toast', Toast)
app.component('Toolbar', Toolbar)
app.component('InputText', InputText)
app.component('Select', Select)
app.use(ToastService)
app.mount('#app')
