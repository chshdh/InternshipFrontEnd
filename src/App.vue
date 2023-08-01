<script setup>
import { RouterLink, RouterView } from 'vue-router'
import request from "@/utils/request";
request({
  url: '/welcome',
  method: 'get'
}).then((resp) => {
  console.log(resp)
})


</script>

<template>
  <RouterView />
</template>

<style scoped>


</style>
