<template>
    <div class="action-button-group">
        <el-button :icon="Search" circle />

        <el-button
                type="primary"
                :icon="Plus"
                circle
                v-if="showAdd"
                :disabled="disabledAdd"
                @click="handleAdd"
        />
        <el-button
                v-if="showEdit"
                type="primary"
                :icon="Edit"
                circle

                :disabled="disabledEdit"
                @click="handleEdit"
        />
        <el-button
                v-if="showDelete"
                type="danger"
                :icon="Delete"
                circle
                :disabled="disabledDelete"
                @click="handleDelete"
        />
    </div>
</template>

<script  lang="ts"  setup>
import { defineProps, defineEmits } from "vue";
import {
    Plus,
    Check,
    Delete,
    Edit,
    Message,
    Search,
    Star,
} from '@element-plus/icons-vue'


const props = defineProps({
    // 是否显示新增按钮
    showAdd: {
        type: Boolean,
        default: false,
    },
    // 是否显示修改按钮
    showEdit: {
        type: Boolean,
        default: false,
    },
    // 是否显示删除按钮
    showDelete: {
        type: Boolean,
        default: false,
    },
    // 新增按钮是否禁用
    disabledAdd: {
        type: Boolean,
        default: false,
    },
    // 修改按钮是否禁用
    disabledEdit: {
        type: Boolean,
        default: false,
    },
    // 删除按钮是否禁用
    disabledDelete: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(["add", "edit", "delete"]);

const handleAdd = () => {
    emit("add");
};

const handleEdit = () => {
    emit("edit");
};

const handleDelete = () => {
    emit("delete");
};
</script>

<style scoped>
.action-button-group {
    display: flex;
    gap: 0px;
}
</style>