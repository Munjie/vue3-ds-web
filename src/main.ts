import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'
// @ts-ignore
import 'virtual:svg-icons-register'
import http from './utils/http';
import router from '@/router'
import store from "@/store";
// src/main.ts
import { createPinia } from "pinia";

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'




const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(ElementPlus, {
    locale: zhCn,
})

// 挂载到全局属性
app.config.globalProperties.$http = http;

app.use(store);
app.use(router)
app.use(createPinia)
app.mount('#app');


