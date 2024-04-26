<template>
  <el-menu
    :default-openeds="['1']"
    class="el-menu-vertical"
    @open="handleOpen"
    @close="handleClose"
    :router="true"
    :default-active="'/' + $route.path.split('/')[1]"
  >
    <el-sub-menu index="1">
      <template #title>
        <span>Simulation One</span>
      </template>
      <el-menu-item-group title="Model One">
        <el-menu-item index="/m1s1">Single simulation</el-menu-item>
        <el-menu-item index="/m1s2">Multiple simulation</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Model Two">
        <el-menu-item index="/m2s1">Single simulation</el-menu-item>
        <el-menu-item index="/m2s2">Multiple simulation</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
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
