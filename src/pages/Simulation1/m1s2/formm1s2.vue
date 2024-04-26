<template>
  <div class="main" v-loading="loading">
    <el-scrollbar class="form">
      <el-form :model="form" label-width="auto">
        <el-form-item>
          <el-button type="primary" @click="onSubmit"
            >run new simulation</el-button
          >
          <el-button type="success" @click="getDefaultValue"
            >get default value</el-button
          >

          <el-button type="warning" @click="setDefaultValue" class="setdefault"
            >set default value</el-button
          >


        </el-form-item>
        <div v-for="(value, key) in data" :key="value">
          {{ key }}
          <el-form-item :label="value">
            <el-input v-model="form[value]" />
          </el-form-item>
        </div>
      </el-form>
    </el-scrollbar>

    <el-scrollbar class="view" :v-if="resultData">
      <CHART :data="resultData"></CHART>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from "vue";
import axios from "axios";
import CHART from "./chartm1s2.vue";

// 定义响应式变量
const data = ref<any>(null);
const loading = ref<boolean>(true);
const error = ref<string | null>(null);
const resultData = ref<any[]>([]);

// do not use same name with ref
const form = reactive<any>({});

// 在组件挂载时发起数据请求
onBeforeMount(async () => {
  try {
    loading.value = true;
    // 请求表格结构
    const localapiData =
      localStorage.getItem("default_value_for_api_m1s2") || "";
    if (!localapiData || localapiData.length < 5) {
      const response = await axios.get("/api/m1s2/");
      localStorage.setItem(
        "default_value_for_api_m1s2",
        JSON.stringify(response.data)
      );
      data.value = response.data;
    } else {
      data.value = JSON.parse(localapiData);
    }

    // 请求表格default数据
    const localData = localStorage.getItem("default_value_for_m1s2") || "";
    if (!localData || localData.length < 5) {
      const response_default = await axios.get("/api/m1s2/default/");
      Object.assign(form, response_default.data);
      localStorage.setItem("default_value_for_m1s2", JSON.stringify(form));
    } else {
      const response_default = JSON.parse(localData);
      Object.assign(form, response_default);
    }

    //请求数据
    const localResultData =
      localStorage.getItem("default_value_for_m1s2_result") || "";
    if (!localResultData || localResultData.length < 5) {
      const response = await axios.get("/api/m1s2/result/", {
        params: form,
      });
      resultData.value = JSON.parse(response.data);
      localStorage.setItem(
        "default_value_for_m1s2_result",
        JSON.stringify(resultData.value)
      );
    } else {
      resultData.value = JSON.parse(localResultData);
    }
  } catch (err: any) {
    error.value = err.message || "Failed to fetch data";
  } finally {
    loading.value = false;
  }
});

const onSubmit = async () => {
  //请求新数据
  loading.value = true;

  //保存修改后的form parameter
  localStorage.removeItem("default_value_for_m1s2_result");
  localStorage.setItem("default_value_for_m1s2", JSON.stringify(form));
  //更新表格数据
  const response = await axios.get("/api/m1s2/result/", {
    params: form,
  });
  localStorage.setItem("default_value_for_m1s2_result", response.data);
  resultData.value = JSON.parse(response.data);
  loading.value = false;
};

const getDefaultValue = async () => {
  localStorage.removeItem("default_value_for_m1s2");
  localStorage.removeItem("default_value_for_api_m1s2");
  const response_default = await axios.get("/api/m1s2/default/");
  Object.assign(form, response_default.data);
  localStorage.setItem("default_value_for_m1s2", JSON.stringify(form));
};

const setDefaultValue = async () => {
  await axios.get("/api/m1s2/default/", { params: form });
};
</script>

<style scoped>
.main {
  display: flex;
  padding: 0px;
}

.form {
  width: 250px;
  padding-top: 35px;
  background: white;
  height: 94vh;
}

.view {
  flex: 1;
  height: 94vh;
  width: calc(100% - 250px); /* 使用calc()函数确保总宽度不超过main元素的宽度 */
}
.setdefault {
  margin-top: 10px;
  margin-left: 135px;
}
</style>
