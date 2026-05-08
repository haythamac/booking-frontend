import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { setupCalendar, Calendar, DatePicker } from 'v-calendar'
import 'v-calendar/style.css'

import './style.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// Use plugin defaults (optional)
app.use(setupCalendar, {})
// Use the components
app.component('VCalendar', Calendar)
app.component('VDatePicker', DatePicker)
app.use(createPinia())
app.use(router)

app.mount('#app')
