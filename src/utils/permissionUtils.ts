// src/utils/permissionUtils.ts
import { computed } from 'vue';
import { useAllDataStore } from '@/store';
import { useRouter } from 'vue-router';

function usePermission(): (permission: string) => boolean {
    const store = useAllDataStore();
    const router = useRouter();

    // 获取当前页面路径并去掉开头的 '/'
    let currentPagePath = router.currentRoute.value.path;
    currentPagePath = currentPagePath.startsWith('/') ? currentPagePath.slice(1) : currentPagePath;

    // 获取用户权限列表，并添加默认值处理
    // @ts-ignore
    const Permissions = store.getPermissions() || [];

    // 获取当前页面的按钮权限
    const userPermissions = computed(() => {
        if (!Array.isArray(Permissions)) {
            console.error('Permissions is not an array:', Permissions);
            return []; // 如果 Permissions 不是数组，返回空数组
        }

        const currentMenu = Permissions.find(permissions => permissions.index === currentPagePath);
        return currentMenu?.permissions || []; // 确保返回的是一个数组
    });

    // 返回一个函数，用于检查用户是否具有某种权限
    return (permission: string): boolean => {
        // 解包 ComputedRef 的值后再调用 includes 方法
        return userPermissions.value.includes(permission);
    };
}

export { usePermission };