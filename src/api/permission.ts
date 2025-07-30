// 引入 request、post 和 get 函数
import {get} from '@/utils/http.ts'; // 绝对路径

// 获取权限接口
export const permissionAPI  = async (data: any) => {
    try {
         // 使用封装的 get 方法
        return await get('/user/list-permission/'+data)  ;
    } catch (error) {
        console.error('获取权限失败:', error);
        return [];
    }
};