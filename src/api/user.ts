import request from '@/utils/http.ts';


export const login = (data) => {
    return request({
        url: '/user/login',
        method: 'post',
        data,
    });
};