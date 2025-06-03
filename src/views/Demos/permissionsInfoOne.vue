<template >
    <div>
        <div>权限演示-1</div>
        <div v-if="hasPermission('demo1:view')">demo1:view</div>
        <div v-if="hasPermission('demo2:view')">demo2:view</div>
        <div>
            <el-button :icon="Search" circle />
            <el-button v-if="hasPermission('demo2:create')" type="primary" :icon="Plus" circle />

            <el-button v-if="hasPermission('demo1:edit')" type="primary" :icon="Edit" circle />
            <el-button type="success" :icon="Check" circle />
            <el-button type="info" :icon="Message" circle />
            <el-button type="warning" :icon="Star" circle />
            <el-button v-if="hasPermission('demo1:delete')"  type="danger" :icon="Delete" circle />
        </div>
    </div>

</template>
<script lang="ts" setup>
import { usePermission } from "@/utils/permissionUtils";
import {
    Plus,
    Check,
    Delete,
    Edit,
    Message,
    Search,
    Star,
} from '@element-plus/icons-vue'
const hasPermission = usePermission();

</script>