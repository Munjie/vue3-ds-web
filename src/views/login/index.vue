<template>
    <div class="login-container">
        <el-card class="box-card">
            <template #header>
                <span>登录</span>
            </template>
            <el-form :model="loginForm" :rules="rules" ref="loginFormRef" label-width="100px" class="demo-loginForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="loginForm.password" show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">登录</el-button>
                    <el-button @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { ElForm, ElFormItem, ElInput, ElButton, ElCard, ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { login } from '@/api/user.ts';
import { useAllDataStore } from '@/store';
import { useRouter } from 'vue-router';
import { menuAPI } from '@/api/menu';
import { permissionAPI } from '@/api/permission';


const router = useRouter();

const loginForm = reactive({
    username: '',
    password: ''
});

const rules: FormRules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ]
};
const store = useAllDataStore();
const loginFormRef = ref<FormInstance | null>(null);

// 封装登录请求处理逻辑
// 定义 API 返回的数据结构

const fetchLoginData = async () => {
    try {
        const data = await login(loginForm);
        // @ts-ignore
        store.setUsername(data.data.userName);
        // @ts-ignore
        store.setToken(data.data.token);
        await fetchLoginAfterData().then(() => {
            router.push('/main');
        }).catch((error) => {
            ElMessage.error(`菜单或权限数据获取失败，请稍后再试: ${error.message || '未知错误'}`);
        });
      /*  await fetchMenuData();
        await router.push('/main');
        console.log("login is---------->"+data.data.userName)*/
    } catch (error) {
        ElMessage.error('登录请求失败，请稍后再试');

    }
};

async function getMenu(): Promise<any> {
    // @ts-ignore
    const result = await menuAPI(store.getUsername());
    // @ts-ignore
    store.setMenuData(result.data);

}

async function getPermission(): Promise<any> {
    // @ts-ignore
    const result = await permissionAPI(store.getUsername());
    // @ts-ignore
    store.setPermissions(result.data);

}
// 获取菜单数据
const fetchLoginAfterData = async () => {
    try {
        await Promise.all([getMenu(), getPermission()]);

    }
    catch (error) {
        ElMessage.error(`菜单或权限数据获取失败，请稍后再试: ${error.message || '未知错误'}`);
    }
};

// 获取菜单数据
const fetchMenuData = async () => {
    try {
        // @ts-ignore
        console.log('store.getUsername()数据:', store.getUsername());
        // @ts-ignore
        const result = await menuAPI(store.getUsername());
        // @ts-ignore
        store.setMenuData(result.data);
        // @ts-ignore
        const resultPermission = await permissionAPI(store.getUsername());
        // @ts-ignore
        store.setPermissions(resultPermission.data);
        console.log('login result 返回的数据:', result);
        // @ts-ignore
        console.log('login menuAPI 返回的数据:', store.getMenuData());
    } catch (error) {
        console.error('获取菜单数据失败:', error);
    }
};

const submitForm = () => {
    if (!loginFormRef.value) return;
    store.resetStore();
    fetchLoginData();
    // loginFormRef.value.validate((valid) => {
    //     if (valid) {
    //         fetchLoginData();
    //     } else {
    //         console.log('验证失败!');
    //         ElMessage.error('验证失败!');
    //     }
    // });
};

const resetForm = () => {
    if (!loginFormRef.value) return;
    // loginFormRef.value.resetFields();
};
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f2f5;
}

.box-card {
    width: 480px;
}
</style>