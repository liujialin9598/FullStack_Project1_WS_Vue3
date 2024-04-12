<template>
    <el-container class="layout-container-demo" style="height: 500px">
      <el-aside width="200px">
        <el-scrollbar>
          <el-menu :default-openeds="['1', '3']">
            <el-sub-menu index="1">
              <template #title> Simulation One </template>
              <el-menu-item-group>
                <template #title>Model 1</template>
                <el-menu-item index="1-1">Single Simulation</el-menu-item>
                <el-menu-item index="1-2">Multiple Simulations</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <template #title>Model 2</template>
                <el-menu-item index="1-3">Single Simulation</el-menu-item>
                <el-menu-item index="1-4">Multiple Simulations</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>
  
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            :ellipsis="false"
            @select="handleSelect"
          >
            <el-menu-item index="0">
              <img
                style="width: 100px"
                src="/images/windlestone-logo.png"
                alt="Element logo"
              />
            </el-menu-item>
            <div class="flex-grow" />
            <el-menu-item index="1">Processing Center</el-menu-item>
            <el-sub-menu index="2">
              <template #title>Workspace</template>
              <el-menu-item index="2-1">item one</el-menu-item>
              <el-menu-item index="2-2">item two</el-menu-item>
              <el-menu-item index="2-3">item three</el-menu-item>
              <el-sub-menu index="2-4">
                <template #title>item four</template>
                <el-menu-item index="2-4-1">item one</el-menu-item>
                <el-menu-item index="2-4-2">item two</el-menu-item>
                <el-menu-item index="2-4-3">item three</el-menu-item>
              </el-sub-menu>
            </el-sub-menu>
          </el-menu>
        </el-header>
  
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </template>
  
  <script lang="ts" setup>
  import { ref } from "vue";
  import { Menu as IconMenu, Message, Setting } from "@element-plus/icons-vue";
  
  const activeIndex = ref('1')
  const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  
  
  const item = {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  };
  const tableData = ref(Array.from({ length: 20 }).fill(item));
  </script>
  
  <style scoped>
  
  .flex-grow {
    flex-grow: 1;
  }
  #app {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  .layout-container-demo .el-header {
    position: relative;
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
  }
  .layout-container-demo .el-aside {
    color: var(--el-text-color-primary);
    background: var(--el-color-primary-light-8);
    height: 100vh;
  }
  .layout-container-demo .el-menu {
    border-right: none;
    height: 100vh;
  }
  .layout-container-demo .el-main {
    padding: 0;
    height: 100vh;
  }
  .layout-container-demo .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
  }
  </style>
  