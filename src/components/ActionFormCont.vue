<template>
    <el-form
      ref="formRef"
      :model="formData"
      label-width="120px"
      :rules="rules"
      class="form"
    >
      <div v-for="item in fields" :key="item.prop">
        <el-form-item
          v-if="!item.hide"
          :label="item.label"
          :prop="item.prop"
          :rules="item.rules"
        >
          <el-input
            v-if="item.InputType === 'text'"
            v-model="formData[item.prop]"
            :disabled="item.ReadOnly"
            :placeholder="`请输入${item.label}`"
          ></el-input>
          <el-select
            v-else-if="item.InputType === 'select'"
            v-model="formData[item.prop]"
            :disabled="item.ReadOnly"
            placeholder="请选择"
          >
            <el-option
              v-for="option in item.options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            ></el-option>
          </el-select>
          <el-date-picker
            v-else-if="item.InputType === 'date'"
            v-model="formData[item.prop]"
            :disabled="item.ReadOnly"
            type="date"
            placeholder="选择日期"
            @change="formatDate(item.prop, $event)"
          ></el-date-picker>
        </el-form-item>
      </div>
    </el-form>
  </template>
  
  <script lang="ts" setup>
  import { ref, watch, PropType } from "vue";
  import type { FormInstance } from "element-plus";
  
  interface Field {
    prop: string;
    label: string;
    width?: number;
    hide?: boolean;
    ReadOnly?: boolean;
    InputType: "text" | "select" | "date";
    IsNull?: boolean;
    Validation?: any; // 校验规则
    options?: { label: string; value: any }[];
  }
  
  const props = defineProps({
    fields: {
      type: Array as PropType<Field[]>,
      required: true,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  });
  
  const emit = defineEmits(["update:data"]);
  const formRef = ref<FormInstance | null>(null);
  const formData = ref({ ...props.data });
  
  watch(() => props.data, (newValue) => {
    formData.value = { ...newValue };
  }, { deep: true });
  
/*  watch(formData, (newValue) => {
    emit("update:data", newValue);
  }, { deep: true });*/

  watch(formData, (newValue) => {
      if (JSON.stringify(newValue) !== JSON.stringify(props.data)) {
          emit("update:data", newValue);
      }
  }, { deep: true });
  
  const rules = props.fields.reduce((acc, field) => {
    acc[field.prop] = [];
    if (!field.IsNull) {
      acc[field.prop].push({
        required: true,
        message: `${field.label}不能为空`,
        trigger: "blur",
      });
    }
    if (field.Validation) {
      acc[field.prop].push(field.Validation);
    }
    return acc;
  }, {} as Record<string, any>);
  
  const formatDate = (prop: string, date: Date) => {
    if (date) {
      formData.value[prop] = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    } else {
      formData.value[prop] = '';
    }
  };
  </script>
  
  <style scoped>
  .form {
    max-width: 600px;
    margin: 0 auto;
  }
  </style>
  