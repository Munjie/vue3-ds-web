// src/locales/index.ts
import { createI18n } from 'vue-i18n';
import zh from '@/locales/zh.json';
import en  from '@/locales/en.json';

export const i18n = createI18n({
    locale: 'en', // 默认语言，后续会在 main.ts 中被覆盖
    legacy: false, // 修复组件引入 i18n 时 Vite 脚手架报错的问题
    globalInjection: true, // 全局注册 $t
    messages: {
        zh,
        en
    }
});

export const langs = [
    { key: 'zh', title: '中文' },
    { key: 'en', title: 'English' }
];