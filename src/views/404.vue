<template>
    <div class="error-page">
        <div class="error-content">
            <h1 class="error-title">404</h1>
            <h2 class="error-subtitle">页面未找到</h2>
            <p class="error-description">您访问的页面不存在，可能是链接错误或页面已被删除。</p>
            <el-button
                    type="primary"
                    @click="goBack"
                    class="error-button"
                    :loading="loading"
            >返回首页</el-button
            >
        </div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const loading = ref(false);

const goBack = () => {
    loading.value = true;
    setTimeout(() => {
        router.push("/");
        loading.value = false;
    }, 1000);
};
</script>

<style scoped>
.error-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f5f5f5;
}

.error-content {
    text-align: center;
    animation: fadeIn 1s ease-in-out;
}

.error-title {
    font-size: 72px;
    color: #ff4d4f;
    margin-bottom: 20px;
    animation: bounceIn 1s ease-in-out;
}

.error-subtitle {
    font-size: 24px;
    color: #333;
    margin-bottom: 10px;
}

.error-description {
    font-size: 16px;
    color: #666;
    margin-bottom: 20px;
}

.error-button {
    font-size: 16px;
    padding: 10px 20px;
    animation: pulse 1s infinite;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes bounceIn {
    0% {
        transform: scale(0);
        opacity: 0;
    }
    50% {
        transform: scale(1.2);
        opacity: 0.5;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes pulse {
    0% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(255, 77, 79, 0.7);
    }
    70% {
        transform: scale(1);
        box-shadow: 0 0 10px 10px rgba(255, 77, 79, 0);
    }
    100% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(255, 77, 79, 0);
    }
}
</style>