<script setup lang="ts">

import {ArrowDown, Expand, Fold} from "@element-plus/icons-vue";
import {ref} from "vue";
import{Iscpllapse} from "./Iscpllapse.js";
</script>


<template>

  <el-header >
    <el-icon @click="Iscpllapse=!Iscpllapse">

      <Expand v-show="Iscpllapse"/>
      <Fold v-show="!Iscpllapse" />
    </el-icon>



    <el-dropdown>
    <span class="el-dropdown-link">
     <el-avatar :size="50" :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
      <template #dropdown>
        <el-dropdown-menu>

          <el-dropdown-item>用户姓名</el-dropdown-item>
          <el-dropdown-item divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>



  </el-header>
</template>


<style lang="scss" scoped>
.el-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #b3e19d;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12);
  z-index: 1;
  position: relative;
  .el-icon--right{
    margin-left: 10px;
  }
}




</style>