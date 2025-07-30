import request from '@/utils/http.ts';


export const pageTask = (data) => {
    return request({
        url: '/task/page-task',
        method: 'post',
        data,
    });
};