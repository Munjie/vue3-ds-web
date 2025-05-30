import { createPinia } from "pinia";
import persistedstate from "pinia-plugin-persistedstate";
import { defineStore } from 'pinia';




// 定义公共 store
export const useAllDataStore = defineStore('useAllData', {
    // 定义状态
    state: () => ({
        isCollapse: false, // 定义初始状态
        username: '',
        token: '',
        menuData:[],
    }),

    // 定义 actions
    actions: {
        // 设置用户名
        setUsername(username: string) {
            this.username = username;
        },

        // 获取用户名
        getUsername(): string {
            return this.username;
        },

        // 设置 token_key
        setToken(token: string) {
            this.token = token;
        },

        // 获取 token_key
        getToken(): string {
            return this.token;
        },

        // 设置菜单数据
        setMenuData(menuData: any){
            this.menuData = menuData
        },
        // 获取菜单数据
        getMenuData(): [] {
            // @ts-ignore
            return this.menuData;
        },
    },
});



const pinia = createPinia();
pinia.use(persistedstate); // 数据持久化

export * from "./modules/counter";
export default pinia;