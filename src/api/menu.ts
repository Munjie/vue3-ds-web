// 引入 request、post 和 get 函数
import {get} from '@/utils/http.ts'; // 绝对路径

// 登录接口
export const menuAPI = async (data: any) => {
    try {
         // 使用封装的 get 方法
        return await get('/user/list-menu/'+data)  ;
    } catch (error) {
        console.error('获取菜单数据失败:', error);
        return [];
    }
};