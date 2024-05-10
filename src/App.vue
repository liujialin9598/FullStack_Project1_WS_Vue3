<template>
  <div class="app">
    <el-container class="common-layout">
      <el-header><Header /></el-header>
      <el-container class="common-layout2">
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import Header from "./components/header/header.vue";
</script>

<style>
.app {
  height: 100%; /* 让整个应用占据视口的高度 */
  overflow: hidden;
}

.common-layout {
  height: 100%; /* 让布局容器占据整个父容器的高度 */
  padding: 0px;
}

.common-layout2 {
  padding: 0px;
  height: 94vh; /* 让布局容器占据整个父容器的高度 */
}

.el-header {
  background-color: #f0f2f5; /* 设置头部的背景颜色 */
  padding: 0px; /* 添加内边距 */
  height: 6vh;
}

.el-aside {
  background-color: #ffffff; /* 设置侧边栏的背景颜色 */
  padding-top: 20px; /* 添加内边距 */
}
.form {
  padding-top: 35px;
  overflow-x: hidden;
}
.el-main {
  padding: 0px; /* 添加内边距 */
  height: 100%;
}
</style>
