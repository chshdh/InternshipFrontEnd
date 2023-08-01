<template>
  <div>

    <el-button @click="showAddMilk()" >增加牛奶产品类型</el-button>
    <el-input v-model="searchName" placeholder="请输入产品名称" style="width:150px;margin-left:50px" :prefix-icon="Search"/>
    <el-button @click="searchMilk()" :icon="Search">搜索</el-button>



    <el-dialog v-model="dialogVisible" title="增加牛奶产品" width="30%"  >
      <table>
        <tr>
          <td>牛奶编号：</td>
          <td>
            <el-input v-model="milkId" placeholder="输入牛奶编号" />
          </td>
        </tr>
        <tr>
          <td>牛奶名称：</td>
          <td>
            <el-input v-model="milkName" placeholder="输入牛奶名称" />
          </td>
        </tr>
        <tr>
          <td>牛奶种类：</td>
          <td>
            <el-select v-model="milkType" class="m-2" placeholder="请选择牛奶种类">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"/>
            </el-select>
          </td>
        </tr>



        <tr>
          <td>单价：</td>
          <td>
            <el-input v-model="milkPrice" placeholder="输入单价/￥" />
          </td>
        </tr>

      </table>
      <template #footer>
		      <span class="dialog-footer">
		        <el-button @click="dialogVisible = false">取消</el-button>
		        <el-button type="primary" @click="addMilk()">
		          提交
		        </el-button>
		      </span>
      </template>
    </el-dialog>


    <div class="table-container">
    <el-table :data="vueMilk" >
      <el-table-column type="selection" align="center" width="75" />
      <el-table-column prop="milkId" label="牛奶编号" align="center" width="210" />
      <el-table-column prop="milkName" label="牛奶名称" align="center" width="210" />
      <el-table-column prop="milkType" label="牛奶类型" align="center" width="210" />
      <el-table-column prop="milkPrice" label="单价/￥" align="center" width="210" />

      <el-table-column label="操作" align="center" width="210">
        <template #default="scope">
          <el-button link type="primary" @click="delMilk(scope.row)">删除</el-button>
          <el-button link type="primary" @click="showUpdataMilk(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>


    <!--页面跳转-->
    <el-pagination
        v-model:current-page="currentPage4"
        v-model:page-size="pageSize4"
        :page-sizes="[5, 10, 20, 50]"
        small="false"
        background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />



    <!--对应修改按钮的修改功能-->
    <el-dialog v-model="updataUserDialogVisible" title="修改产品" width="30%"  >
      <table>
        <tr>
          <td>牛奶编号：</td>
          <td>
            <el-input v-model="milkId" placeholder="输入牛奶编号" />
          </td>
        </tr>
        <tr>
          <td>牛奶名称：</td>
          <td>
            <el-input v-model="milkName" placeholder="输入牛奶名称" />
          </td>
        </tr>

<!--        <tr>-->
<!--          <td>牛奶种类：</td>-->
<!--          <td>-->
<!--            <el-select v-model="value" class="m-2" placeholder="请选择牛奶种类">-->
<!--              <el-option v-for="item in options"-->
<!--                         :key="item.value"-->
<!--                         :label="item.label"-->
<!--                         :value="item.value"/>-->
<!--            </el-select>-->
<!--          </td>-->
<!--        </tr>-->



        <tr>
          <td>单价：</td>
          <td>
            <el-input v-model="milkPrice" placeholder="输入单价/￥" />
          </td>
        </tr>

      </table>
      <template #footer>
		      <span class="dialog-footer">
		        <el-button @click="updataUserDialogVisible = false">取消</el-button>
		        <el-button type="primary" @click="updataMilk()">
		          提交
		        </el-button>
		      </span>
      </template>
    </el-dialog>
  </div>
</template>



<script setup>
import {ref,onMounted } from 'vue';
import axios from 'axios';
import {
  Search,
} from '@element-plus/icons-vue'
onMounted(() => {
  selectMilk();
})

const vueMilk = ref([{milkId:'',milkName:'',milkType:'',milkPrice:''}])


const currentPage4 = ref(1);
const pageSize4 = ref(5);
const total = ref(0);

// sessionStorage.setItem("username",total.value);
//每页记录数改变时触发，参数为改变后的记录数
const handleSizeChange = (val)=>{
  pageSize4.value = val;
  selectMilk();
}
//页码改变时触发,参数为改变后的页码
const handleCurrentChange = (val)=>{
  currentPage4.value = val;
  selectMilk();
}
//给后端发送请求
const selectMilk = () =>{
  axios.get('http://localhost:8080/selectMilk?currentPage='+currentPage4.value+"&pageSize="+pageSize4.value).then(
      (resp)=>{
        vueMilk.value = resp.data.dataList;
        total.value = resp.data.total;
      }
  )
}


//点击删除方法
const delMilk = (row)=>{
  //给后端发送请求
  axios.get('http://localhost:8080/deleteMilk?milkId='+row.milkId).then(
      (resp)=>{
        selectMilk();
      }
  )
}

const dialogVisible = ref(false);
const showAddMilk = ()=>{
  dialogVisible.value = true;
}
const updataUserDialogVisible = ref(false);

const showUpdataMilk = (row)=>{
  milkId.value = row.milkId;
  milkName.value = row.milkName;
  milkType.value = row.milkType;
  milkPrice.value = row.milkPrice;
  updataUserDialogVisible.value = true;
}


const milkId = ref("");
const milkName = ref("");
const milkType = ref("");
const milkPrice =ref("");


//点击增加方法
const addMilk = ()=>{
  axios.get('http://localhost:8080/insertMilk?milkId='+milkId.value+"&milkName="+milkName.value+"&milkType="+milkType.value+
      "&milkPrice="+milkPrice.value).then(
      (resp)=>{
        milkId.value="";
        milkName.value = "";
        milkType.value="";
        milkPrice.value="";
        selectMilk();
      }
  )
  dialogVisible.value = false;
}


//点击修改方法
const updataMilk = () =>{
  axios.get('http://localhost:8080/updataMilk?milkId='+milkId.value+"&milkName="+milkName.value+"&milkType="+milkType.value+"&milkPrice="+milkPrice.value).then(
      (resp)=>{
        milkId.value="";
        milkName.value = "";
        milkType.value="";
        milkPrice.value="";
        selectMilk();
      }
  )
  updataUserDialogVisible.value = false;
}
const searchName = ref("")

//搜索用户
const searchMilk = () =>{
  axios.get('http://localhost:8080/searchMilk?milkName='+searchName.value).then(
      (resp)=>{
        vueMilk.value = resp.data;
      }
  )
}
const value=ref();
const options = [
  {
    value: '酸奶',
    label: '酸奶',
  },
  {
    value: '纯牛奶',
    label: '纯牛奶',
  },
]

</script>

<style>
.table-container {
  margin: 20px;
}

.el-table__header-wrapper {
  background-color: #f8f8f9;
  border: none;
  font-weight: bold;
}

.el-table__body-wrapper {
  background-color: #fff;
  border: none;
}

.el-table__row--striped>.el-table-column {
  background-color: #f9fafc;
}

.el-table-column {
  padding: 12px 0;
}

.el-button {
  margin-right: 10px;
  font-size: 14px;
  padding: 8px 20px;
}

.el-button.link {
  color: #409eff;
  border: none;
  background-color: transparent;
}

.el-button.primary {
  background-color: #409eff;
  color: #fff;
}

.el-button:hover:not(.disabled) {
  opacity: 0.9;
}

.el-table__empty-block {
  font-size: 16px;
  padding: 20px 0;
  color: #999;
}

.el-pagination__total {
  margin-right: 20px;
  font-size: 14px;
  color: #666;
}

.el-pagination__sizes {
  margin-left: 20px;
  font-size: 14px;
  color: #666;
}

.el-pagination__jump {
  margin-left: 20px;
  font-size: 14px;
  color: #666;
}
</style>
