import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./assets/tailwind.css"
import store from './app/auth.js'
import VueApexCharts from "vue3-apexcharts"
const app = createApp(App)

app.use(router).use(store).use(VueApexCharts)
app.mount('#app')
