<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-sub-menu index="1">
      <template #title>
        <span>Simulation One</span>
      </template>
      <el-menu-item-group title="Model One">
        <router-link to="/m1s1">
          <el-menu-item index="1-1">Single simulation</el-menu-item>
        </router-link>
        <router-link to="/m1s2">
          <el-menu-item index="1-2">Multiple simulation</el-menu-item>
        </router-link>
      </el-menu-item-group>
      <el-menu-item-group title="Model Two">
        <router-link to="/m2s1">
          <el-menu-item index="1-3">Single simulation</el-menu-item>
        </router-link>
        <router-link to="/m2s2">
          <el-menu-item index="1-4">Multiple simulation</el-menu-item>
        </router-link>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style scoped>
.el-menu-vertical {
  border: 0px;
}
</style>
