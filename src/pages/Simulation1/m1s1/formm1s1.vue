<template>
  <div class="main">
    <el-form :model="form" label-width="auto" class="form">
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Execute</el-button>
      </el-form-item>
      <div v-for="(value, key) in data" :key="value">
        {{ key }}
        <el-form-item :label="value">
          <el-input v-model="form[value]" />
        </el-form-item>
      </div>
    </el-form>
    <router-view :data="resultData" v-if="condition" class="view"></router-view>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router";
import { onBeforeMount, reactive, ref } from "vue";
import axios from "axios";

// 定义响应式变量
const data = ref<any>(null);
let condition = ref<boolean>(false)
const loading = ref<boolean>(false);
const error = ref<string | null>(null);

// do not use same name with ref
const form = reactive<any>({});

// 在组件挂载时发起数据请求
onBeforeMount(async () => {
  try {
    loading.value = true;
    const response = await axios.get("/api/m1s1/");
    data.value = response.data;
    const response_default = await axios.get("/api/m1s1/default/");
    Object.assign(form, response_default.data);
  } catch (err: any) {
    error.value = err.message || "Failed to fetch data";
  } finally {
    loading.value = false;
  }
});

const resultData = ref<any>(null);
const onSubmit = async () => {
  condition.value=false
  const response = await axios.get("/api/m1s1/result/", {
    params: form,
  });
  resultData.value =JSON.parse(response.data);
  condition.value=true
  router.push("/m1s1/result");
};
</script>

<style scoped>
.main {
  display: flex;
  padding: 0%;
}

.form {
  width: 250px;
  height: 100vh;
  padding: 35px 0px;
  background: white;
}

.view{
  width: 80%;
}
</style>
