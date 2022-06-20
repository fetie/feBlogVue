import { createApp } from 'vue'

import App from './App.vue'

import { setupElement } from './plugins/element'

import router from './router'
import { key, store } from '@/store'

import './assets/css/style.less'

const app = createApp(App)

setupElement(app)

app.use(store, key)
app.use(router)

app.mount('#app')
