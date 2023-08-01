<template>
  <div >
    <el-container>
      <!--左侧菜单栏-->

      <el-container>

        <el-main>
          <el-button type="primary" @click="HandleAddMilk()">添加牛奶</el-button>

          <el-table :data="milkMessage" stripe border style="width:1305px">
            <el-table-column prop="milkId" label="牛奶编号" width="100" />
            <el-table-column prop="milkName" label="牛奶名称" width="90" />
            <el-table-column prop="milkType" label="牛奶种类" width="90" />
            <el-table-column prop="milkPrice" label="单价" width="80"/>
            <el-table-column label="操作" align="center" >
              <template #default="scope">
                <el-button size="small" @click="HandleShowUpdate(scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="HandleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--增加牛奶对话框-->
          <el-dialog v-model="dialogaddmilk" title="增加牛奶产品" align="center" width="40%">
            <table >
              <tr>
                <td>牛奶编号：</td>
                <td><el-input v-model="milkId" style="height:38px" placeholder="请输入订单编号" /></td>
              </tr>
              <tr>
                <td>牛奶名称：</td>
                <td><el-input v-model="milkName" style="height:38px" placeholder="请输入牛奶名称"/></td>
              </tr>
              <tr>
                <td>牛奶种类：</td>
                <td>
                  <el-select v-model="value" class="m-2" placeholder="请选择牛奶种类">
                    <el-option v-for="item in options"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value"/>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>单价：</td>
                <td><el-input v-model="milkPrice" style="height:38px" placeholder="请输入单价" /></td>
              </tr>
            </table>
            <template #footer>
			      <span class="dialog-footer">
			        <el-button @click="dialogaddmilk = false" >取消</el-button>
			        <el-button type="primary" @click="HandleAdd()">提交</el-button>
			      </span>
            </template>
          </el-dialog>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import {ref} from 'vue';
import { ElMessage } from 'element-plus'
const router = useRouter();

const milkId=ref();
const milkName=ref();
const milkType=ref();
const milkPrice=ref();

const HandleAdd=()=>{
  ElMessage({
    message: '添加成功！',
    type: 'success',
  })

  dialogaddmilk.value=false;
}

const dialogaddmilk=ref(false);
const HandleAddMilk=()=>{
  dialogaddmilk.value=true;
}


const value=ref();
const options = [
  {
    value: 'Option1',
    label: '酸奶',
  },
  {
    value: 'Option2',
    label: '纯牛奶',
  },
]
</script>

<style>
.shopping-classify {
  display: flex;
  justify-content: center;
  align-items: stretch;
  background-size: 100% 100%;
  height: 100%;
  width: 100%;
  position: fixed;
}
html,body,#app{
  height:100%;
  margin: 0px;
  padding: 0px;
}
.headerset{
  width: 1346px;
  background-color: #373d41;
  display: flex; /* 设置显示为flex布局 */
  /* justify-content: space-between; *//* 设置为flex左右布局 */
  padding-left: 0;/* 左内边距为0（Logo贴左边） */
  align-items: center;/* 元素上下居中（防止右边按钮贴上下边 )*/
  color: #fff;
  font-size: 20px;
}
</style>

