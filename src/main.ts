import { createApp } from 'vue'
import './index.less'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from "./router"
import {http} from './http'

createApp(App).use(createPinia()).use(router).use(http).mount('#app')
