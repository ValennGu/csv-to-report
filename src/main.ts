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
import Image from 'primevue/image'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import Chip from 'primevue/chip'
import Card from 'primevue/card'

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
app.component('Image', Image)
app.component('Tabs', Tabs)
app.component('TabList', TabList)
app.component('Tab', Tab)
app.component('TabPanels', TabPanels)
app.component('TabPanel', TabPanel)
app.component('Chip', Chip)
app.component('Card', Card)

app.mount('#app')
