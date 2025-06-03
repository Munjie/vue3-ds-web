<template>
    <div>
        <ActionButtonGroup
                :show-add="hasPermission('demo2:create')"
                :show-delete="true"
                :disabled-add="false"
                :disabled-edit="!selectedData.length"
                :disabled-delete="!selectedData.length"
                @add="handleAdd"
                @edit="handleEdit"
                @delete="handleDelete"
        />
        <!-- 表格 -->
        <CustomTable
                :tableColumns="columns"
                :tableData="data"
                :pageSize="pageSize"
                :pageSizes="[5, 10, 15, 20, 30]"
                :showSelection="true"
                @update:currentPage="currentPage = $event"
                @update:pageSize="pageSize = $event"
                @selection-change="handleSelectionChange"
        />


        <!-- 显示选中数据 -->
        <div v-if="selectedData.length > 0" style="margin-top: 20px">
            <h3>选中的数据：</h3>
            <pre>{{ selectedData }}</pre>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue';
import CustomTable from '@/components/ActionTableCont.vue';
import {usePermission} from "@/utils/permissionUtils";
import ActionButtonGroup from "@/components/ActionBtnHdrCont.vue";
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

const columns = ref([
    {
        prop: 'date',
        label: '日期',
    },
    {
        prop: 'name',
        label: '姓名',
    },
    {
        prop: 'address',
        label: '地址',
    },
]);

const data = ref([
    {
        id: 1,
        date: '2025-04-14',
        name: '张三',
        address: '上海市普陀区金沙江路 1518 弄',
    },
    {
        id: 2,
        date: '2025-04-15',
        name: '李四',
        address: '上海市普陀区金沙江路 1517 弄',
    },
    {
        id: 3,
        date: '2025-04-16',
        name: '王五',
        address: '上海市普陀区金沙江路 1516 弄',
    },
    {
        id: 4,
        date: '2025-04-17',
        name: '赵六',
        address: '上海市普陀区金沙江路 1515 弄',
    },
    {
        id: 5,
        date: '2025-04-18',
        name: '孙七',
        address: '上海市普陀区金沙江路 1514 弄',
    },
    {
        id: 6,
        date: '2025-04-19',
        name: '周八',
        address: '上海市普陀区金沙江路 1513 弄',
    },
    {
        id: 7,
        date: '2025-04-20',
        name: '吴九',
        address: '上海市普陀区金沙江路 1512 弄',
    },
    {
        id: 8,
        date: '2025-04-21',
        name: '郑十',
        address: '上海市普陀区金沙江路 1511 弄',
    },
    {
        id: 9,
        date: '2025-04-22',
        name: '钱十一',
        address: '上海市普陀区金沙江路 1510 弄',
    },
    {
        id: 10,
        date: '2025-04-23',
        name: '孔十二',
        address: '上海市普陀区金沙江路 1509 弄',
    },
    {
        id: 11,
        date: '2025-04-24',
        name: '秦十三',
        address: '上海市普陀区金沙江路 1508 弄',
    },
    {
        id: 12,
        date: '2025-04-25',
        name: '尤十四',
        address: '上海市普陀区金沙江路 1507 弄',
    },
]);

const currentPage = ref(1);
const pageSize = ref(5);// 默认每页显示5条数据

// 用于存储选中的数据
const selectedData = ref([]);

// 处理选中数据变化
const handleSelectionChange = (selection) => {
    selectedData.value = selection;
};

// 获取选中数据
const handleDelete = () => {
    console.log('Selected Data:', selectedData.value);
    console.log('Selected  Data length:', selectedData.value.length);
    if (selectedData.value.length > 0) {
        // 删除逻辑
        console.log('Deleting selected data...');
        selectedData.value = [];
    } else {
        console.log('No selected data to delete.');
    }

};
</script>