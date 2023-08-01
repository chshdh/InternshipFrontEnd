<script setup lang="ts">
import AppAside from "./AppAside.vue";
import AppHeader from "./AppHeader.vue";
</script>

<template>
  <div class="common-layout">
    <el-container>
      <AppAside />
      <el-container class="header-and-main">
        <AppHeader />

        <el-main class="content">
          <el-scrollbar>
            <Router-view />
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.common-layout {
  background-color: #f5f7fa;
  height: 100vh;
  margin: 0;
  padding: 0;
}

.header-and-main {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 64px); /* 64px is the height of the header */
}

.content {
  background-color: #fff;
  min-height: calc(100vh - 64px); /* 64px is the height of the header */
  overflow: auto;
  padding: 20px;
}
</style>