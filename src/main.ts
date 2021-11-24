import { createApp } from 'vue'

import App from './App.vue'

import { ElImage,ElButton,ElForm,ElFormItem,ElInput } from 'element-plus'

import router from './router'
import { store, key } from './store/index'

import './assets/css/style.less'
import './assets/font/iconfont.css'

const app=createApp(App)

const elementComp=[ElImage,ElButton,ElForm,ElFormItem,ElInput]
elementComp.forEach(v=>{
  app.component(v.name,v)
})

app.use(router)
app.use(store,key)
app.mount('#app')

