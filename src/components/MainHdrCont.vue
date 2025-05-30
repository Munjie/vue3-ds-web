<template>

  <!-- 顶部导航栏 -->
    <div class="header-layout">
        <div class="header-left">
            <div class="mb-4">
                <el-button type="primary" :key="bntMenuText" @click="handleMenu">{{bntMenuText}}</el-button>

            </div>
        </div>
        <div class="header-right">
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
<script  lang="ts"  setup>
import { ref,computed,defineComponent } from 'vue';
import { useAllDataStore } from '@/store';

const store = useAllDataStore();

// 定义按钮文本，根据 store.isCollapse 的值动态设置
const bntMenuText = computed(() => {
    return store.isCollapse ? 'expand' : 'collapse';
});

// 定义单击事件的处理函数
function handleMenu() {
    store.isCollapse =! store.isCollapse

    // 在这里可以添加更多逻辑，例如切换菜单状态
}
function handleLogout() {
    store.logout();
}
/*
export const MainAHdrCont = defineComponent({
  name: 'MainAHdrCont'
});
*/
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

</style>