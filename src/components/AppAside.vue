<script setup lang = "ts">


import {Document, House, IceDrink, Setting} from "@element-plus/icons-vue";
import {ref} from "vue";
import{Iscpllapse} from "./Iscpllapse.js";
</script>
<template>
  <el-aside >
    <el-scrollbar>

    <el-menu router :unique-opened="true" :collapse="Iscpllapse">
      <a href="/Show"  class="logo">
        <img src="@/assets/img.png" alt="">
        <h1>
          牛奶加工厂
        </h1>
      </a>
      <el-sub-menu index="12">

        <template #title>
          <el-icon><IceDrink /></el-icon>   <span>产品管理 </span>
        </template>

        <el-menu-item index="/Dingdan">
          <el-icon><BellFilled /></el-icon>   <span>牛奶管理 </span>
        </el-menu-item>


      </el-sub-menu>

     <el-sub-menu index="0">

       <template #title>
         <el-icon><Document /></el-icon>  <span>订单管理 </span>
       </template>
       <el-menu-item index="/Orde">
         <el-icon><BellFilled /></el-icon>   <span>订单管理 </span>
       </el-menu-item>



     </el-sub-menu>


      <el-sub-menu  index="1">
        <template #title>
          <el-icon><Refrigerator /></el-icon>  <span>设备管理 </span>
        </template>

        <el-menu-item index="/Script">
          <el-icon><BellFilled /></el-icon>   <span>设备 </span>
        </el-menu-item>

      </el-sub-menu>


      <el-sub-menu index="2">
        <template #title >
          <el-icon>    <Setting/> </el-icon>   <span>设备加工 </span>
        </template>

        <el-menu-item index="/Process">
          <el-icon><BellFilled /></el-icon>  <span>设备加工 </span>
        </el-menu-item>

      </el-sub-menu>



    </el-menu>

    </el-scrollbar>
  </el-aside>



</template>


<style  lang="scss" scoped>

.el-aside{
  background-color: #b3e19d;
  height: 100vh;
  width: auto;

}
.logo{
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: black;
  height: 60px;
  img{
    width: 40px;
    height: 40px;
  }



}
.el-menu{
  border-right: none;
  background-color: #e1f3d8;
  width: 200px;
  &.el-menu--collapse{
    width: 60px;
    & h1{
      display: none;
    }
  }
}


</style>