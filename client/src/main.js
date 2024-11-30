import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./assets/tailwind.css"
import store from './app/auth.js'
const app = createApp(App)

app.use(router).use(store)
app.mount('#app')
