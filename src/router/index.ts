import { createRouter, createWebHistory } from "vue-router";

//导入组件的方式1，先导入，下面引用（在路由这里需要明确导入组件）
// @ts-ignore
import Main from "../views/main/index.vue";
// @ts-ignore
import Home from '@/views/home/index.vue'
// @ts-ignore
import UserInfo from '@/views//UserInfo/index.vue'
// @ts-ignore
import AccountSetting from '@/views/AccountSetting/index.vue'
// @ts-ignore
import Login from '@/views/login/index.vue'
// @ts-ignore
import NotFound from "@/views/404.vue";
import {useAllDataStore} from "@/store";

//定义路由规则
const routes = [
    {
        path: '/',
        name: 'main',
        component: Main,
        redirect: { name: 'login' },
        children: [
            {
                path: 'home',
                name: 'home',
                component: Home,

            }
        ],
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/main',
        redirect: { name: 'home' },
    },
    // 其他路由配置...
    {
        path: '/404',
        name: "404",
        component: NotFound,
    },
];

//2.创建路由实例并传递上面路由对象routes
const router = createRouter({
    //路由的一种前端展现方式，通常使用这个就行了
    history: createWebHistory(),
    routes,
});

// @ts-ignore
// 全局前置守卫
router.beforeEach((to, from, next) => {
    const store = useAllDataStore();
    // @ts-ignore
    const tokenKey = store.getToken();
    console.log("tokenKey",tokenKey);
    // else if (!tokenKey && to.name !== 'login') {
    if (!tokenKey && isChildrenRoute(to)) {
        console.log("tokenKey",tokenKey);
        next({ name: "login" }); // 如果有 token 并且是登录页面，重定向到主页
    }
    else   if (to.matched.length === 0) {
        next({ name: "404" }); // 如果没有匹配的路由，跳转到 404 页面
    }
    else {
        next();
    }
});


function isChildrenRoute(to: any): boolean {
    // 检查路由是否为 children 路由
    console.log("to.matched",to.matched);
    if (to.name === 'main'  ||  to.name === 'home'|| to.matched.length === 0) {
        return true;
    }
    return to.matched.some(record => record.parent && record.parent.name === 'main');
}

//暴露出去
export default router;