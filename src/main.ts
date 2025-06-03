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
import {ReloadData, useAllDataStore} from '@/store';
import { i18n } from '@/locales';


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

// 国际化
// 设置 i18n 的 locale
let currentLanguage = navigator.language.replace(/-(\S*)/, '');
// 如果本地缓存记录了语言环境，则使用本地缓存
const Store = useAllDataStore();
// @ts-ignore
let lsLocale = Store.getLocale() || '';
console.log('lsLocale', lsLocale);
if (lsLocale) {
    try {
        const parsedLocale = JSON.parse(lsLocale);
        currentLanguage = parsedLocale?.curLocale || 'zh'; // 确保有默认值
    } catch (error) {
        // console.error('Failed to parse lsLocale:', error);
        currentLanguage = lsLocale; // 如果解析失败，直接使用 lsLocale
    }
}

// 校验语言是否合法，仅允许 "zh" 或 "en"
const allowedLocales: ("zh" | "en")[] = ["zh", "en"];
currentLanguage = allowedLocales.includes(currentLanguage as "zh" | "en")
    ? currentLanguage
    : "zh"; // 如果非法，默认设置为 "zh"

// 设置 i18n 的 locale
i18n.global.locale.value = currentLanguage as "zh" | "en";

ReloadData();
app.use(router);
app.mount('#app');


