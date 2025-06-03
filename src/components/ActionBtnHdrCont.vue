<template>
    <div class="action-button-group">
        <el-tooltip content="搜索" placement="bottom"   effect="light" >
            <el-button
                :icon="Search"
                circle
                v-if="showSearch"
                :disabled="disabledSearch"
                @click="handleSearch"
            />
        </el-tooltip>
        <el-tooltip content="新增"    placement="bottom"  effect="light" >
            <el-button
                type="primary"
                :icon="DocumentAdd"
                circle
                v-if="showAdd"
                :disabled="disabledAdd"
                @click="handleAdd"
            />
        </el-tooltip>

        <el-tooltip content="修改"  placement="bottom"  effect="light" >
            <el-button
                v-if="showEdit"
                type="primary"
                :icon="Edit"
                circle
                :disabled="disabledEdit"
                @click="handleEdit"
            />
        </el-tooltip>

        <el-tooltip content="删除"    placement="top"   effect="light" >
            <el-button
                v-if="showDelete"
                type="danger"
                :icon="Delete"
                circle
                :disabled="disabledDelete"
                @click="handleDelete"
            />
        </el-tooltip>
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
    DocumentAdd,
} from '@element-plus/icons-vue'
import { ElTooltip } from 'element-plus'; // 导入 ElTooltip


const props = defineProps({
    // 是否显示搜索按钮
    showSearch: {
        type: Boolean,
        default: true,
    },

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
    // 搜索按钮是否禁用
    disabledSearch: {
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

const emit = defineEmits(["search","add", "edit", "delete"]);

const handleSearch = () => {
    emit("search");
};
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

/* 自定义 tooltip 样式 */
.el-tooltip__popper.is-customized {
    background: linear-gradient(90deg, #409EFF, #66B1FF); /* 自定义背景颜色 */
    color: #fff; /* 文字颜色 */
    padding: 8px 12px; /* 内边距 */
    border-radius: 4px; /* 圆角 */
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); /* 阴影 */
}

.el-tooltip__popper.is-customized .el-tooltip__arrow::before {
    background: linear-gradient(45deg, #409EFF, #66B1FF); /* 箭头颜色 */
    border-width: 6px; /* 箭头大小 */
}

</style>
