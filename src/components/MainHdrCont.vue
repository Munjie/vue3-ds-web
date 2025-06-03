<template>
  <!-- 顶部导航栏 -->
    <div class="header-layout">
        <div class="header-left">
            <div class="mb-4">
                <el-button type="primary" :key="bntMenuText" @click="handleMenu">{{ bntMenuText }}</el-button>
            </div>
        </div>
        <div class="header-right">
            <el-switch
                    v-model="isZh"
                    class="ml-2"
                    inline-prompt
                    active-icon-class="el-icon-zh"
                    inactive-icon-class="el-icon-en"
                    active-text="中文"
                    inactive-text="English"
                    @change="handleLanguageChange"
                    style="--el-switch-off-color: #13ce66"
            />
            <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar :size="30" src="../assets/vue.svg" />
          <el-icon><ArrowDown /></el-icon>
        </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item>设置</el-dropdown-item>
                        <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, defineComponent } from 'vue';
import { useAllDataStore } from '@/store';
import { i18n } from '@/locales'; // 引入 i18n 实例

const store = useAllDataStore();

// 定义按钮文本，根据 store.isCollapse 的值动态设置
const bntMenuText = computed(() => {
    return store.isCollapse ? 'expand' : 'collapse';
});

// 定义单击事件的处理函数
function handleMenu() {
    store.isCollapse = !store.isCollapse;
    // 在这里可以添加更多逻辑，例如切换菜单状态
}

function handleLogout() {
    store.logout();
}

// 定义 isZh 变量，根据 store.locale 的值动态设置
const isZh = computed({
    get() {
        return store.locale === 'zh';
    },
    set(value) {
        store.setLocale(value ? 'zh' : 'en');
        i18n.global.locale.value = value ? 'zh' : 'en'; // 更新 i18n 的语言
    }
});

// 处理语言切换事件
function handleLanguageChange(value: boolean) {
    store.setLocale(value ? 'zh' : 'en');
    i18n.global.locale.value = value ? 'zh' : 'en'; // 更新 i18n 的语言
}
</script>

<style scoped>
.header-layout {
    display: flex;
    justify-content: space-between; /* 使 header-left 和 header-right 分别靠左和靠右 */
    align-items: center;
    width: 100%; /* 确保 header 占据整个容器宽度 */
}

.header-left {
    display: flex;
    align-items: center;
}

.header-right {
    display: flex;
    align-items: center;
}

/* 自定义图标样式 */
.el-icon-zh::before {
    content: '\e70a'; /* 中文图标 */
    font-family: 'element-icons' !important;
}

.el-icon-en::before {
    content: '\e70b'; /* 英文图标 */
    font-family: 'element-icons' !important;
}
</style>