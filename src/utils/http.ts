//  src/utils/request.ts
import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { ElMessage, ElMessageBox } from "element-plus";

// 创建 axios 实例
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 50000,
    headers: { "Content-Type": "application/json;charset=utf-8" },
});

// 请求拦截器
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // const userStore = useUserStoreHook();
        // if (userStore.token) {
        //   config.headers.Authorization = userStore.token;
        // }
        config.headers.Authorization =
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImRlcHRJZCI6MSwiZGF0YVNjb3BlIjoxLCJleHAiOjE3NDcwMjY5NjgsInVzZXJJZCI6MiwiaWF0IjoxNzQ3MDE5NzY4LCJhdXRob3JpdGllcyI6WyJST0xFX0FETUlOIl0sImp0aSI6ImQxYmJlMjNkNzA4ZjQ2MzQ5ZGQ5MzI3YTZkYzMyNmI1In0.VH1SS3Y3Rxq8_9cBSLDhfksinDBLkgYp5mPN03bn5To";
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    (response: AxiosResponse) => {
        const { code, msg } = response.data;
        // 登录成功
        if (code === "200") {
            return response.data;
        }

        ElMessage.error(msg || "系统出错");
        return Promise.reject(new Error(msg || "Error"));
    },
    (error: any) => {
        if (error.response.data) {
            const { code, msg } = error.response.data;
            // token 过期，跳转登录页
            if (code === "1001") {
                ElMessageBox.confirm("当前页面已失效，请重新登录", "提示", {
                    confirmButtonText: "确定",
                    type: "warning",
                }).then(() => {
                    localStorage.clear(); // @vueuse/core 自动导入
                    window.location.href = "/";
                });
            } else {
                ElMessage.error(msg || "系统出错");
            }
        }
        return Promise.reject(error.message);
    }
);

// 导出 axios 实例
export default service;