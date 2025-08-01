import {defineStore} from 'pinia';

import router from '../router';
import type {Component} from 'vue';
// 定义公共 store
// @ts-ignore
type Modules = Record<string, () => Promise<{ default: Component }>>;

function stateIni(): {
    isCollapse: boolean;
    username: string;
    userid: number;
    token: string;
    menuData: any[];
    tabs: { path: string; index: string; label: string; icon: string }[];
    currentMenu: any;
    permissions: any[];// 用户的权限列表
    currentPagePath: string;// 当前页面路径
    locale: string; // 当前语言
} {
    return {
        isCollapse: false,
        username: '',
        userid: 0,
        token: '',
        menuData: [],
        tabs: [
            {
                path: "/home",
                index: "Home",
                label: "home",
                icon: "home"
            }
        ],
        currentMenu: null,
        permissions: [], // 用户的权限列表
        currentPagePath: '/' ,// 当前页面路径
        locale: 'en' ,//当前语言默认en英语
    };
}
// @ts-ignore
export const useAllDataStore = defineStore('useAllData', {
    // 定义状态
    // 定义状态
    state: stateIni,
 /*   state: () => ({
        isCollapse: false, // 定义初始状态
        username: '',
        token: '',
        menuData: [],
        tabs:[
            {path:"/home"
                ,name:"home"
                ,label:"home"
                ,icon:"home"}

        ],
        currentMenu:null,
        permissions: [],
        // @ts-ignore// 用户的权限列表
        currentPagePath: string,// 当前页面路径
    }),*/

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
        //
        setUserid(userid: number) {
            this.userid = userid;
        },

        // 获取用户名
        getUserid(): number {
            return this.userid;
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
        setMenuData(menuData: any) {
            addRouter(menuData)
            this.menuData = menuData
        },
        // 获取菜单数据
        getMenuData(): [] {
            // @ts-ignore
            return this.menuData;
        },
        // 权限
        setPermissions(val: any) {
            this.permissions = val;
        },
        getPermissions(): [] {
            // @ts-ignore
            return this.permissions  ;
        },
        // 当前语言
        setLocale(val: any) {
            this.locale = val;
        },
        getLocale() {
            return this.locale  ;
        },


        // 当前页面路径
        setCurrentPagePath(val: any) {
            this.currentPagePath = val;
        },
        getCurrentPagePath() {
            return this.currentPagePath  ;
        },
        resetStore() {
            // @ts-ignore
            this.$reset(); // 重置 Pinia 状态
            localStorage.removeItem('useAllData-store');
        },
        // tabs
        setTabsData(val: any)
        {
            console.log('val',val)
            if(val.name==='home')
            {
                this.currentMenu=null;

            }
            else
            {
                let index=this.tabs.findIndex((item:any)=>item.index===val.index);
                console.log(index)
                index===-1?  this.tabs.push(val):"";
                console.log('tabs:',this.tabs)

            }
        },
        getTabsData(): [] {
            // @ts-ignore
            return this.tabs;
        },
        removeTagsData(val: any)
        {
            let index=this.tabs.findIndex((item:any)=>item.index===val.index);
            this.tabs.splice(index,1)
        },
       // 登出方法
        logout() {
            // @ts-ignore
            this.resetStore()
            // 检查登录后的逻辑
            router.push({name: 'login'}).then(() => {
            });
        }
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'useAllData-store',
                storage: localStorage,
                paths: ['token', 'menuData'], // 指定需要持久化的字段
            },
        ],
    },
});


function addRouter(menuData: any) {
    const routerList = router.getRoutes()
    const modules: Modules = import.meta.glob('../views/**/*.vue') as Modules;
    const routerArr = []

    menuData.forEach((item: any) => {
        // console.log(item)
        if (item.children) {
            item.children.forEach((child: any) => {

                const componentPath = `../${child.path}.vue`;

                const module = modules[componentPath];

                if (module) {
                    /*
                    module().then(({ default: component }) => {
                      child.component = component;
                    });
                    */
                    child.component = module;
                    // @ts-ignore
                    routerArr.push(child)

                }
            });
        } else {
            const componentPath = `../${item.path}.vue`;
            const module = modules[componentPath];
            if (module) {
                item.component = module;
                // @ts-ignore
                routerArr.push(item)
            }

        }
    });
    // 增加删除路由
    routerList.forEach((item: any) => {

        if (item.name === 'main'
            || item.name === 'home'
            || item.name === '404'
            || item.name === 'login'
            || item.name === 'error'
            || item.name === 'undefined'
            || item.path === '/'
            || item.path === '/main')
            return
        router.removeRoute(item.name)
    });

    routerArr.forEach((item: any) => {

        router.addRoute('main',
            {
                path: item.index,
                name: item.label,
                component: item.component,

            });

    })
    const routerListLast = router.getRoutes()
    console.log(routerListLast)

}

export function ReloadData() {
    const store = useAllDataStore();
    // @ts-ignore
    const menuData = store.getMenuData();
    addRouter(menuData);
}

