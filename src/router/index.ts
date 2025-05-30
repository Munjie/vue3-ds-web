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


//定义路由规则
const routes = [
    {
        path: '/',
        name: 'main',
        component: Main,
        redirect: { name: 'home' }, // 默认重定向到 home 子路由
        children: [
            {
                path: 'home',
                name: 'home',
                component: Home,

            },
            {
                path: 'UserInfo',
                name: 'UserInfo',
                component: UserInfo,

            },
            {
                path: 'AccountSetting',
                name: 'AccountSetting',
                component:AccountSetting
            },
        ],
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/main', // 如果确实需要 /main 路径
        redirect: { name: 'home' }, // 仅保留重定向规则
    },
];

//2.创建路由实例并传递上面路由对象routes
const router = createRouter({
    //路由的一种前端展现方式，通常使用这个就行了
    history: createWebHistory(),
    routes,
});

//暴露出去
export default router;