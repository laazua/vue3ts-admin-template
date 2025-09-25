import { createApp } from 'vue'
import { createPinia } from "pinia"
import ElementPlus from 'element-plus'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import { useUserStore } from './stores/user'

const app = createApp(App)
const pina = createPinia()
app.use(ElementPlus)
pina.use(piniaPluginPersistedstate)
app.use(pina)
app.use(router)

// 刷新页面重新注册路由
const userStore = useUserStore()
userStore.restoreUserRoutes()

app.mount('#app')
