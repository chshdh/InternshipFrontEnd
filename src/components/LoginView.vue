<script setup>
import { useRouter } from 'vue-router';
import {ref} from 'vue';
// import { h } from 'vue'
import { ElMessage } from 'element-plus'
//注册成功弹窗消息
const open = () => {
	ElMessage({
	    message: '注册成功！',
	    type: 'success',
	  })
  
  CloseRegister();
}
//页面跳转需要用到userRouter类的push方法
const router = useRouter();
//点击登录跳转到主页面，MainMenuView.vue
const login = ()=>{
	router.push({path:"/Show"});
}
//注册框
const RegisterDialog=ref(false);
//打开注册框
const ShowRegisterDialog = ()=>{
	RegisterDialog.value=true;
}
//关闭注册框
const CloseRegister =()=>{
	RegisterDialog.value=false;
}
//登录用户信息
const name=ref();
const password=ref();
//注册用户信息
const inputname=ref();
const inputpassword=ref();


</script>

<template>
<div id="login_box">
    <h2 >欢迎登录</h2>
    <div id="input_box">
      <span style="color: black">请输入用户名:</span><input type="text" >
    </div>
    <div class="input_box">
	<span style="color: black">请输入密码:</span><input type="password" >
    </div>
	<div>
    <button @click="login()">登录</button><br>
	<span style="color: black">没有账户?</span>
	<span class="clickable-text" @click="ShowRegisterDialog()">注册</span>
	</div>
</div>

<el-dialog v-model="RegisterDialog" title="欢迎注册" align="center" width="30%" :before-close="handleClose">
			<tr >
				<td>  <el-input v-model="inputname" style="height:48px" placeholder="请输入用户名"/>  </td>
			</tr>
			<tr>
				<td>  <el-input v-model="inputpassword" style="height:48px" placeholder="请输入手机号码"/>  </td>
			</tr>
			<tr>
				<td>  <el-input v-model="inputpassword" style="height:48px" placeholder="设置6到20位登录密码"/>  </td>
			</tr>
			<tr>
				<td>  <el-input v-model="inputpassword" style="height:48px" placeholder="请在此输入登录密码"/>  </td>
			</tr>
			<tr>
				<td>  <el-button type="primary" style="margin-right:40px" size="large" @click="open() ">注册</el-button>  </td>
				<!-- <td>  <el-button :plain="true" style="margin-left:0px" size="large" type="primary" @click="CloseRegister()">返回</el-button>  </td> -->
			</tr>
	</el-dialog>
</template>

<!-- :append-to-body="true" -->

<style>
    body {
      background: url('../image/milk.png') no-repeat;
      background-size: 100% 120%;
    }

    #login_box {
      width: 100%;
      height: 400px;
      background-color: #00000060;
      margin: auto;
      margin-top: 10%;
      text-align: center;
      border-radius: 10px;
      padding: 50px 50px;
    }

    h2 {
      color: #ffffff90;
      margin-top: 5%;
    }

    #input-box {
      margin-top: 5%;
	  color:black;
    }

    span {
      color: #fff;
    }

    input {
      border: 0;
      width: 60%;
      font-size: 15px;
      color: #000000;
      background: transparent;
      border-bottom: 2px solid #161717;
      padding: 5px 10px;
      outline: none;
      margin-top: 10px;
    }

    button {
      margin-top: 50px;
      width: 60%;
      height: 30px;
      border-radius: 10px;
      border: 0;
      color: #fff;
      text-align: center;
      line-height: 30px;
      font-size: 15px;
      background-image: linear-gradient(to right, #30cfd0, #330867);
    }

    #sign_up {
      margin-top: 45%;
      margin-left: 60%;
    }

    a {
      color: #b94648;
    }
	.clickable-text {
	      cursor: pointer;
	      /* 在此设置你想要的文字样式 */
	   }
  </style>