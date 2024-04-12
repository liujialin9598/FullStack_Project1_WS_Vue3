<template>
  <div class="app">
    <div class="common-layout">
      <el-container>
        <el-header><Header /></el-header>
        <el-container>
          <el-aside width="200px"><Aside></Aside></el-aside>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Aside from "./components/aside/aside.vue";
import Header from "./components/header/header.vue";
</script>

<style scoped>
.app {
  height: 100vh; /* 让整个应用占据视口的高度 */
}

.common-layout {
  height: 100%; /* 让布局容器占据整个父容器的高度 */
}

.el-container {
  height: 100%; /* 让 Element Plus 的容器占据整个布局容器的高度 */
  padding: 0px;
}

.el-header {
  background-color: #f0f2f5; /* 设置头部的背景颜色 */
  padding: 0px; /* 添加内边距 */
}

.el-aside {
  background-color: #ffffff; /* 设置侧边栏的背景颜色 */
  padding: 20px 0px; /* 添加内边距 */
}
.form {
  padding-top: 35px;
  overflow-x: hidden;
}
.el-main {
  background-image: url("/images/background.png"); /* 替换 'your-image-url.jpg' 为你的图片路径 */
  background-size: cover; /* 让背景图片铺满整个屏幕 */
  background-position: center; /* 将背景图片居中 */
  background-repeat: no-repeat; /* 防止背景图片重复显示 */
  padding: 0px; /* 添加内边距 */
}
</style>
