<template>
  <div class="login-container">
    <h2 class="login-title">Welcome Back!</h2>
    <el-form :model="form" label-width="0">
      <el-form-item>
        <el-input
          class="login-input"
          v-model="form.username"
          placeholder="Username"
          @keyup.enter="onSubmit"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-input
          class="login-input"
          v-model="form.password"
          placeholder="Password"
          type="password"
          @keyup.enter="onSubmit"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button class="login-button" type="primary" @click="onSubmit"
          >Login</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();

const form = reactive({
  username: "",
  password: "",
});

const onSubmit = () => {
  if (form.username === "admin" && form.password === "admin") {
    localStorage.setItem("isLoggedIn", "true");
    router.push({ name: "Home" });
  } else {
    ElMessage.error("Invalid username or password");
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 40px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.login-title {
  margin-bottom: 30px;
  text-align: center;
  font-size: 24px;
}

.login-input {
  width: 100%;
}

.login-button {
  width: 100%;
}
</style>
