<template>
  <el-menu
    :default-active="activeIndex"
    class="header_menu"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
    :router="true"
  >
    <el-menu-item>
      <img
        style="width: 100px; align-items: center"
        src="/images/windlestone-logo.png"
        alt="Element logo"
    /></el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="/">Welcome Page</el-menu-item>
    <el-sub-menu index="">
      <template #title>Workspace</template>
      <el-menu-item index="/Sone">Simulation One</el-menu-item>
      <el-menu-item index="/Stwo">Simulation Two</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const activeIndex = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
.header_menu {
  width: 100%;
  height: 100%;
}
</style>
