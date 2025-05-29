import request from '@/utils/http';

/**
 * 使用添加用户信息接口
 * @param data
 */
export function addUser(data: any) {
    return request({
        url: '/api/index/users',
        method: 'post',
        data: data
    });
}