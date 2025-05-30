import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'
// @ts-ignore
import 'virtual:svg-icons-register'
import http from './utils/http';
import router from '@/router'
// src/main.ts
import { createPinia } from "pinia";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { ReloadData } from '@/store';

const pina = createPinia();
pina.use(piniaPluginPersistedstate);

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
// 挂载到全局属性
app.config.globalProperties.$http = http;

app.use(ElementPlus, {
    locale: zhCn,
})
app.use(pina);
ReloadData();
app.use(router);
app.mount('#app');


