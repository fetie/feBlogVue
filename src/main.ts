import { createApp } from 'vue'

import App from './App.vue'

import {setupElement} from './plugins/element'

import router from './router'
import { store, key } from './store/index'

import './assets/css/style.less'

const app=createApp(App)

setupElement(app)

app.use(router)
app.use(store,key)
app.mount('#app')

