import { createApp } from 'vue'
import './index.less'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from "./router"
import {http} from './http'
import { MotionPlugin } from '@vueuse/motion'
import {createPersistedStatePlugin} from "pinia-plugin-persistedstate-2";
const installPersisted = createPersistedStatePlugin();
createApp(App).use(createPinia().use((context)=>installPersisted(context))).use(router).use(MotionPlugin).use(http).mount('#app')
