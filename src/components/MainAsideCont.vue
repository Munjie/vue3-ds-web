<template>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-vertical-demo"
    >
        <!-- 渲染没有子菜单的项 -->
        <el-menu-item
            v-for="item in noChilden"
            :key="item.index"
            :index="item.index"
            @click="handlemenu(item)"
        >
            <component class="icon" :is="item.icon"></component>
            <span>{{ item.label }}</span>
        </el-menu-item>

        <!-- 渲染有子菜单的项 -->
        <el-sub-menu
            v-for="item in hasChilden"
            :key="item.index"
            :index="item.index"
        >
            <template #title>
                <component class="icon" :is="item.icon"></component>
                <span>{{ item.label }}</span>
            </template>
            <el-menu-item
                v-for="subItem in item.children"
                :key="subItem.index"
                :index="subItem.index"
                @click="handlemenuchild(item, subItem)"
            >
                <span>{{ subItem.label }}</span>
            </el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
    Document,
    Setting,
} from '@element-plus/icons-vue';

interface MenuItem {
    index: string;
    label: string;
    icon?: any;
    children?: MenuItem[];
}

const menuData = ref<MenuItem[]>([
    { index: 'Home', label: '首页', icon: Document },
    {
        index: 'SysSettings',
        label: '系统设置',
        icon: Setting,
        children: [
            { index: 'UserInfo', label: '个人资料' },
            { index: 'AccountSetting', label: '账户设置' },
        ],
    },
]);

const hasChilden = computed(() => menuData.value.filter(item => item.children && item.children.length > 0));
const noChilden = computed(() => menuData.value.filter(item => !item.children || item.children.length === 0));

const activeIndex = ref('Home');
const router = useRouter();

const handlemenu = (item: MenuItem) => {
    router.push(item.index);
};

const handlemenuchild = (item: MenuItem, subItem: MenuItem) => {
    router.push(subItem.index);
};
</script>

<style>
.el-menu {
    height: 100%; /* 设置整个布局的高度为 100%，确保布局占满整个视口 */
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
.icon {
    margin-right: 8px; /* 图标与文字之间的间距 */
    font-size: 18px;   /* 图标的大小 */
    width:18px;
    height:18px;
    size:8px;
    color: #606266;    /* 图标的默认颜色 */
    vertical-align: middle; /* 垂直居中对齐 */
}

/* 鼠标悬停时的样式 */
.icon:hover {
    color: #e28f12; /* 鼠标悬停时图标的颜色 */
}

</style>