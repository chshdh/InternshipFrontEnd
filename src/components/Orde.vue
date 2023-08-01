<template>
   <div>



        <el-main>

          <tr>
            <el-button size="large" type="primary" @click="HandleShowAdd()">录入新订单</el-button>
            <el-input size="large" v-model="inputSearch" style="width:200px ;margin-left:866px " placeholder="请输入要查询的订单"/>
            <el-button size="large" @click="HandleSearch()">查询</el-button>
          </tr>
          <!--订单信息展示-->

          <el-table :data="orderMessage" stripe border style="width:1305px">
           // <el-table-column prop="orderId" label="订单编号" width="80" />
            <el-table-column prop="productType" label="牛奶种类" width="90" />
            <el-table-column prop="productName" label="牛奶名称" width="90" />
            <el-table-column prop="customerName" label="客户名称" width="90"/>
            <el-table-column prop="customerNumber" label="客户联系方式" width="120"/>
            <el-table-column prop="customerAddress" label="客户地址" width="90"/>
            <el-table-column prop="createTime" label="下单时间" width="130"/>
            <el-table-column prop="productPrice" label="单价" width="80"/>
            <el-table-column prop="productQuantity" label="数量" width="80"/>
            <el-table-column prop="totalAmount" label="总金额" width="100"/>
            <el-table-column prop="orderStatus" label="订单状态" width="90"/>
            <el-table-column prop="completeTime" label="完成时间" width="100"/>

            <el-table-column label="操作" align="center" width="200" >
              <template #default="scope">
                <el-button size="small" @click="HandleShowUpdate(scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="HandleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <!--分页-->
          <div class="demo-pagination-block">
            <el-pagination
                v-model:current-page="ordercurrentpage"
                v-model:page-size="orderpagesize"
                :page-sizes="[10, 20, 30, 50]"
                :small="false"
                :background="true"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="OrderHandleSizeChange"
                @current-change="OrderHandleCurrentChange"/>
          </div>
          <!--录入新订单对话框-->
          <el-dialog v-model="dialogshowadd" title="录入新订单" align="center" width="40%">
            <table >
              <tr>
                <td>订单id：</td>
                <td><el-input v-model="orderId" style="height:38px" placeholder="请输入订单id"/></td>
              </tr>
              <tr>
                <td>牛奶种类：</td>
                <td>
                  <el-select v-model="productType" class="m-2" placeholder="请选择牛奶种类">
                    <el-option v-for="item in options"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value"/>
                  </el-select>
                </td>
              </tr>

              <tr>
                <td>牛奶名称：</td>
<!--                <td><el-input v-model="productName" style="height:38px" placeholder="请输入牛奶名称"/></td>-->
                <el-select v-model="productName" placeholder="请选择牛奶名称">
                  <el-option
                      v-for="item in selmilk"
                      :key="item.milkId"
                      :label="item.milkName"
                      :value="item.milkName">
                  </el-option>
                </el-select>







              </tr>
              <tr>
                <td>客户名称：</td>
                <td><el-input v-model="customerName" style="height:38px" placeholder="请输入客户名称"/></td>
              </tr>
              <tr>
                <td>客户联系方式：</td>
                <td><el-input v-model="customerNumber" style="height:38px" placeholder="请输入客户联系方式" /></td>
              </tr>
              <tr>
                <td>客户地址：</td>
                <td><el-input v-model="customerAddress" style="height:38px" placeholder="请输入客户地址" /></td>
              </tr>
              <tr>
                <td>下单时间：</td>
                <td><el-input v-model="createTime" style="height:38px" placeholder="请输入下单时间" /></td>
              </tr>
              <tr>
                <td>数量：</td>
                <td><el-input v-model="productQuantity" style="height:38px" placeholder="请输入数量" /></td>
              </tr>
              <tr>
                <td>单价：</td>
                <td><el-input v-model="productPrice" style="height:38px" placeholder="请输入单价" /></td>
              </tr>
            </table>
            <template #footer>
						      <span class="dialog-footer">
						        <el-button @click="dialogshowadd = false" >取消</el-button>
						        <el-button type="primary" @click="HandleAdd()">提交</el-button>
						      </span>
            </template>
          </el-dialog>
          <!--编辑订单对话框-->
          <el-dialog v-model="dialogshowupdate" title="修改订单" align="center" width="40%">
            <table >
<!--              <tr>-->
<!--                <td>订单编号：</td>-->
<!--                <td><el-input v-model="orderId" style="height:38px" placeholder="请输入订单编号" /></td>&lt;!&ndash;只设置一个列的长度，其它列就对齐了&ndash;&gt;-->
<!--              </tr>-->
              <tr>
                <td>客户名称：</td>
                <td><el-input v-model="customerName" style="height:38px" placeholder="请输入客户名称"/></td>
              </tr>
              <tr>
                <td>客户联系方式：</td>
                <td><el-input v-model="customerNumber" style="height:38px" placeholder="请输入客户联系方式" /></td>
              </tr>
              <tr>
                <td>客户地址：</td>
                <td><el-input v-model="customerAddress" style="height:38px" placeholder="请输入客户地址" /></td>
              </tr>
              <tr>
                <td>下单时间：</td>
                <td><el-input v-model="createTime" style="height:38px" placeholder="请输入下单时间" /></td>
              </tr>
              <tr>
                <td>数量：</td>
                <td><el-input v-model="productQuantity" style="height:38px" placeholder="请输入数量" /></td>
              </tr>
              <tr>
                <td>单价：</td>
                <td><el-input v-model="productPrice" style="height:38px" placeholder="请输入单价" /></td>
              </tr>
            </table>
            <template #footer>
						      <span class="dialog-footer">
						        <el-button @click="dialogshowupdate = false">取消</el-button>
						        <el-button type="primary" @click="HandleUpdate()">提交</el-button>
						      </span>
            </template>
          </el-dialog>
        </el-main>

  </div>

</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
import axios from 'axios';
//import {ref} from 'vue';
const router = useRouter();
const orderMessage=ref([{}]);
import {ref,onMounted } from 'vue';

import {
  Search,
} from '@element-plus/icons-vue'
onMounted(() => {
  selectOrder();
  seletMilks();

})

//订单变量定义
const orderId=ref();
const productType=ref();
const productName=ref();
const customerName=ref();
const customerNumber=ref();
const customerAddress=ref();
const createTime=ref();
const productQuantity=ref();
const productPrice=ref();
const totalAmount=ref();
const orderStatus=ref();
const completeTime=ref();
//查询订单变量定义
const inputSearch=ref();
//页面跳转

//分页
const ordercurrentpage=ref(1);
const orderpagesize=ref(10);
const total=ref(100);
const OrderHandleCurrentChange=(val)=>{
  ordercurrentpage.value= val;
}
const OrderHandleSizeChange=(val)=>{
  orderpagesize.value=val;
}

//分页查询所有订单
const selectOrder=()=>{
  axios.get('http://localhost:8080/selectOrder?currentPage='+ordercurrentpage.value+
      "&pageSize="+orderpagesize.value).then(
      (resp)=>{
        orderMessage.value=resp.data.dataList;
        total.value = resp.data.total;
      }
  )
}

//增加新订单
const dialogshowadd=ref(false);
const HandleShowAdd=()=>{
  dialogshowadd.value=true;
}
const HandleAdd=()=> {
  axios.get('http://localhost:8080/insertOrder?orderId='+orderId.value+ "&productType="+ productType.value + "&productName=" + productName.value + "&customerName=" + customerName.value
      + "&customerNumber=" + customerNumber.value + "&customerAddress=" + customerAddress.value + "&createTime=" + createTime.value + "&productQuantity=" + productQuantity.value + "&productPrice=" + productPrice.value
      + "&orderStatus=" + orderStatus.value + "未完成" + completeTime.value).then(
      (resp) => {
        //添加后刷新页面
        selectOrder();
        dialogshowadd.value=false;
      }
  )
  axios.get('http://localhost:8080/insertProcess?orderId=' + orderId.value + "&productName=" + productName.value+
      "&productType="+ productType.value ).then(
      (resp) => {
        // //添加后刷新页面
        // selectOrder();
      }
  )
}
  ElMessage({
    message: '添加成功！',
    type: 'success',
  })

const process_temp=ref({
  orderId:'',
  productName:'',
  scriptId:'',
  scriptName:'',
  stage:'',
  productType:'',
  stageStatement:''
});

const sscript=ref(
    {
      scriptId:'',
      scriptName:'',
      scriptType:'',
      scriptStatus:'',
      scriptPrice:''
    }
);
//点击删除订单
const HandleDelete=(row)=>{


  axios.get('http://localhost:8080/searchProcess?orderId='+row.orderId).then(
      (resp)=> {
        process_temp.value = resp.data;
        axios.get('http://localhost:8080/deleteProcess?orderId=' + row.orderId).then(
            (resp1) => {
              axios.get('http://localhost:8080/searchScript?scriptId=' + process_temp.value.scriptId).then(
                  (resp2) => {
                    sscript.value = resp2.data;
                    axios.get('http://localhost:8080/updataScript?scriptId=' + sscript.value.scriptId + "&scriptName=" +
                        sscript.value.scriptName +
                        "&scriptType=" + sscript.value.scriptType + "&scriptPrice=" + sscript.value.scriptPrice
                        + "&scriptStatus=" + "空闲中").then(
                        (resp3) => {
                          axios.get('http://localhost:8080/deleteOrder?orderId=' + row.orderId).then(
                              (resp4) => {
                                selectOrder();
                              }
                          )
                        }
                    )
                  }
              )
            }
        )
      }
      )


  //删除成功提示框
  ElMessage({
    message: '删除成功！',
    type: 'success',
  })
}

//点击查询订单
const HandleSearch=()=>{

  axios.get('http://localhost:8080/searchOrder?customer_name='+inputSearch.value).then(
      (resp)=>{
        orderMessage.value=resp.data;
      }
  )
}

//编辑订单
const dialogshowupdate=ref(false);
const HandleShowUpdate=(row)=>{
  orderId.value=row.orderId;
  productType.value=row.productType;
  productName.value=row.productName;
  customerName.value=row.customerName;
  customerNumber.value=row.customerNumber;
  customerAddress.value=row.customerAddress;
  createTime.value=row.createTime;
  productQuantity.value=row.productQuantity;
  productPrice.value=row.productPrice;
  orderStatus.value=row.orderStatus;
  completeTime.value=row.completeTime;
  dialogshowupdate.value=true;
}
const HandleUpdate=()=>{
  axios.get('http://localhost:8080/updateOrder?orderId='+orderId.value+"&productType="+productType.value+"&productName="+productName.value+"&customerName="+customerName.value
      +"&customerNumber="+customerNumber.value+"&customerAddress="+customerAddress.value+"&createTime="+createTime.value+"&productQuantity="+productQuantity.value+"&productPrice="+productPrice.value
      +"&orderStatus="+orderStatus.value+"&completeTime="+completeTime.value).then(
      (resp)=>{
        //编辑后刷新页面
        selectOrder();
        axios.get('http://localhost:8080/searchProcess?orderId=' + orderId.value ).then(
            (process_temp)=>{
              process.value=process_temp.data;

              axios.get('http://localhost:8080/updateProcess?orderId=' + process.value.orderId +
                  "&productName=" +
                  productName.value+
                  "&productType="+productType.value+"&scriptId="+process.value.scriptId+"&scriptName="+process.value.script_name
                  +"&stage="+process.value.stage).then(
                  (resp)=>{

                  }
              )
            }

        )
      }
  )





  ElMessage({
    message: '编辑成功！',
    type: 'success',
  })
  dialogshowupdate.value=false;
}

const process=ref({orderId:"",scriptId:"",script_name:"",stage:"",productName:"",productType:""});


const value=ref();

// const process_temp1=ref({order_id1:"",script_id1:"",script_name1:"",stage1:"",product_name1:"",productType1:""});
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
const selmilk=ref([{

  milkId:'',
  milkName:'',
  milkType:'',
  milkPrice:''




}])





const  seletMilks=()=>{
  axios.get('http://localhost:8080/selectMilk1').then(
      (resp)=>{
        selmilk.value=resp.data;

      }
  )
}


</script>

<style>
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