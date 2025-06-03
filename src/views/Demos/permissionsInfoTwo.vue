<template>
    <div>
        <div>权限演示-2</div>
        <div v-if="hasPermission('demo1:view')">demo1:view</div>
        <div v-if="hasPermission('demo2:view')">demo2:view</div>

        <div class="button-group-container">
            <ActionButtonGroup
                :show-add="hasPermission('demo2:create')"
                :show-delete="true"
                :disabled-add="false"
                :disabled-edit="false"
                @add="handleAdd"
                @edit="handleEdit"
                @delete="handleDelete"
            />
            <el-button type="warning" :icon="Upload" circle />
            <el-button type="info" :icon="Message" circle />

        </div>
    </div>
</template>

<script lang="ts" setup>
import ActionButtonGroup from "@/components/ActionBtnHdrCont.vue";
import { usePermission } from "@/utils/permissionUtils";
import {
    Plus,
    Check,
    Delete,
    Edit,
    Message,
    Search,
    Star,
    Upload,
} from '@element-plus/icons-vue'

const hasPermission = usePermission();
const showAdd = hasPermission('add');
console.log(showAdd);

const handleAdd = () => {
    alert("新增按钮被点击了！");
};

const handleEdit = () => {
    alert("修改按钮被点击了！");
};

const handleDelete = () => {
    alert("删除按钮被点击了！");
};
</script>

<style scoped>
.button-group-container {
    display: flex;
    align-items: center; /* 垂直居中对齐 */
    gap: 5px; /* 按钮之间的间距 */
}
</style>