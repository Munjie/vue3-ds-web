<template>
  <div>
    <el-button type="primary" @click="handleAdd">新增</el-button>
    <el-button type="success" @click="handleEdit">编辑</el-button>
    <el-button type="info" @click="handleDetailAdd">明细新增</el-button>
    <el-dialog
      v-model="dialogVisible"
      title="表单操作"
      width="50%"
      :before-close="handleClose"
    >
      <FormComponent
        ref="formComponentRef"
        :fields="fields"
        v-model:data="formData"
        @update:data="handleFormDataUpdate"
      ></FormComponent>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handleSave">保存</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="detailDialogVisible"
      title="明细新增"
      width="50%"
      :before-close="handleDetailClose"
    >
      <FormComponent
        ref="detailFormComponentRef"
        :fields="detailFields"
        v-model:data="detailFormData"
        @update:data="handleDetailFormDataUpdate"
      ></FormComponent>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleDetailCancel">取消</el-button>
          <el-button type="primary" @click="handleDetailSave">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import FormComponent from "@/components/ActionFormCont.vue";

const formComponentRef = ref(null);
const detailFormComponentRef = ref(null);
const formData = ref({});
const detailFormData = ref({});
const dialogVisible = ref(false);
const detailDialogVisible = ref(false);

// 主表单的校验函数
const nameValidator = (rule: any, value: any, callback: any) => {
  if (value && value.length < 3) {
    callback(new Error("姓名长度不能小于3"));
  } else {
    callback();
  }
};

// 明细表单的校验函数
const detailNameValidator = (rule: any, value: any, callback: any) => {
  if (value && value.length < 3) {
    callback(new Error("明细名称长度不能小于3"));
  } else {
    callback();
  }
};

const fields = ref([
  {
    prop: "name",
    label: "姓名",
    width: 200,
    hide: false,
    ReadOnly: false,
    InputType: "text",
    IsNull: false,
    Validation: {
      validator: nameValidator,
      trigger: "blur",
    },
  },
  {
    prop: "age",
    label: "年龄",
    width: 200,
    hide: false,
    ReadOnly: false,
    InputType: "text",
    IsNull: true,
  },
  {
    prop: "gender",
    label: "性别",
    width: 200,
    hide: false,
    ReadOnly: false,
    InputType: "select",
    options: [
      { label: "男", value: "male" },
      { label: "女", value: "female" },
    ],
    IsNull: false,
  },
  {
    prop: "birthDate",
    label: "出生日期",
    width: 200,
    hide: false,
    ReadOnly: false,
    InputType: "date",
    IsNull: true,
  },
]);

const detailFields = ref([
  {
    prop: "detailName",
    label: "明细名称",
    width: 200,
    hide: false,
    ReadOnly: false,
    InputType: "text",
    IsNull: false,
    Validation: {
      validator: detailNameValidator,
      trigger: "blur",
    },
  },
  {
    prop: "detailAmount",
    label: "明细金额",
    width: 200,
    hide: false,
    ReadOnly: false,
    InputType: "text",
    IsNull: true,
  },
]);

const handleAdd = () => {
  formData.value = {
    name: "默认姓名",
    age: "",
    gender: "",
    birthDate: "",
  };
  dialogVisible.value = true;
};

const handleEdit = () => {
  formData.value = {
    name: "张三",
    age: "25",
    gender: "male",
    birthDate: "2025-04-09",
  };
  dialogVisible.value = true;
};

const handleDetailAdd = () => {
  detailFormData.value = {
    detailName: "默认明细名称",
    detailAmount: "100",
  };
  detailDialogVisible.value = true;
};

const handleSave = () => {
  (formComponentRef.value as any).$refs.formRef.validate((valid: boolean, errors: any) => {
    if (valid) {
      const latestFormData = { ...formData.value };
      console.log("保存的数据:", latestFormData);
      alert("保存成功");
      dialogVisible.value = false;
    } else {
      const errorMessages = Object.values(errors).map((error: any) => error.message).join("\n");
      alert(`表单校验失败:\n${errorMessages}`);
    }
  });
};

const handleDetailSave = () => {
  (detailFormComponentRef.value as any).$refs.formRef.validate((valid: boolean, errors: any) => {
    if (valid) {
      const latestDetailFormData = { ...detailFormData.value };
      console.log("明细保存的数据:", latestDetailFormData);
      alert("明细保存成功");
      detailDialogVisible.value = false;
    } else {
      const errorMessages = Object.values(errors).map((error: any) => error.message).join("\n");
      alert(`明细表单校验失败:\n${errorMessages}`);
    }
  });
};

const handleCancel = () => {
  dialogVisible.value = false;
};

const handleDetailCancel = () => {
  detailDialogVisible.value = false;
};

const handleClose = (done: () => void) => {
  dialogVisible.value = false;
  done();
};

const handleDetailClose = (done: () => void) => {
  detailDialogVisible.value = false;
  done();
};

const handleFormDataUpdate = (newData: any) => {
  formData.value = { ...newData };
};

const handleDetailFormDataUpdate = (newData: any) => {
  detailFormData.value = { ...newData };
};
</script>
