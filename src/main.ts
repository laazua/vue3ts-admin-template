import { createApp } from 'vue'
import { createPinia } from "pinia"
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pina = createPinia()

app.use(router)
app.use(pina)
app.mount('#app')
