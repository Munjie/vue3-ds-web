import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// src/stores/index.ts
import { defineStore } from 'pinia';


// 定义公共 store
export const useAllDataStore = defineStore('useAllData', {
    // 定义状态
    state: () => ({
        isCollapse: false, // 定义初始状态
    }),

});

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate); // 数据持久化

export * from "./modules/counter";
export default pinia;