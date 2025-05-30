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
router.beforeEach((to, from, next) => {
    if (to.matched.length === 0) {
        next({ name: "404" }); // 如果没有匹配的路由，跳转到 404 页面
    } else {
        next();
    }
});

//暴露出去
export default router;