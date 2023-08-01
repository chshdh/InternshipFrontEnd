<template>
  <div >



      <el-main>

        <div class="table-container">
        <el-table :data="ProcessMessage" stripe border style="width:1305px">
          <el-table-column prop="orderId" label="订单编号" width="140" />
          <el-table-column prop="productName" label="产品名称" width="140"  />
          <el-table-column prop="scriptName" label="设备名称" width="140" />
          <el-table-column prop="scriptId" label="设备ID" width="140" />
          <el-table-column prop="stageStatement" label="牛奶状态" width="110"  />
          <el-table-column prop="productType" label="产品类型" width="140" />
          <el-table-column label="操作" align="center" >
            <template #default="scope">
              <el-button  type="primary" @click="judge(scope.row);">下一步</el-button>
            </template>
          </el-table-column>
        </el-table>


        </div>




        <!--分页-->
        <div class="demo-pagination-block">
          <el-pagination
              v-model:current-page="currentpage"
              v-model:page-size="pagesize"
              :page-sizes="[10, 20, 30, 50]"
              :small="false"
              :background="true"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="OrderHandleSizeChange"
              @current-change="OrderHandleCurrentChange"/>
        </div>
        <!--下一步对话框-->
        <el-dialog v-model="dialogshownext" title="下一步计划安排" align="center" width="40%">
          <table >
            <tr>
              <td style="font-size: 16px;">选择下一步要使用的机器：</td>
              <td>
                <el-select v-model="scriptId_temp" size="large" class="m-2" placeholder="请选择空闲机器">
                  <el-option v-for="item in searchScript"
                             :key="item.scriptId"
                             :label="item.scriptName"
                             :value="item.scriptId"
                             :disabled="item.scriptStatus=='工作中'"/>
                </el-select>
              </td>
            </tr>
          </table>
          <template #footer #default="scope">
						      <span class="dialog-footer">
						        <el-button @click="dialogshownext = false" >取消</el-button>
						        <el-button type="primary" @click="HandleShowNext(row_temp),HandleNext(row_temp)
						        ">提交</el-button>
						      </span>
          </template>
        </el-dialog>

      </el-main>

  </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
import {computed, onMounted, ref} from "vue";


const router = useRouter();
//const planMessage=ref([{}]);
const ProcessMessage=ref([{}]);

onMounted(() => {
  selectProcess();



})

const currentpage=ref(1);
const pagesize=ref(10);
const total=ref(100);
const OrderHleCurrentChange=(val)=>{
  currentpage.value=val;
}
const OrderHandleSizeChange=(val)=>{
  pagesize.value=val;
}
const  scriptId_temp=ref();



const selectProcess=()=>{
  axios.get('http://localhost:8080/selectProcess?currentPage='+currentpage.value+
      "&pageSize="+pagesize.value).then(
      (resp)=>{
        ProcessMessage.value=resp.data.dataList;
        total.value = resp.data.total;
      }
  )
}

let xianshi=ref();


//下一步
const dialogshownext=ref(false);
let stage_temp=ref();
let type_temp=ref();
const HndaleShow=(row)=>{
  dialogshownext.value=true;
  stage_temp=row.stage;
  type_temp=row.productType;
  row_temp=row;
}
let row_temp=ref();

const HandleShowNext=(row_temp)=>{


  // if((row_temp.productType=="纯牛奶"&&row_temp.stage<4)||(row_temp.productType=="酸奶"&&row_temp.stage<4))
  // {
          axios.get('http://localhost:8080/updateProcess?orderId=' + row_temp.orderId +
              "&productName=" +
              row_temp.productName+
              "&productType="+row_temp.productType+"&scriptId="+row_temp.scriptId+"&scriptName="+row_temp.scriptName
              +"&stage="+(row_temp.stage+1)).then(
              (resp1)=>{
              }
    )
  selectProcess();
  // }
  // else {
  //   axios.get('http://localhost:8080/deleteProcess?orderId='+row_temp.orderId).then(
  //       (resp)=>{
  //         axios.get('http://localhost:8080/searchOrder1?orderId='+row_temp.orderId).then(
  //             (order_temp)=> {
  //               order.value=order_temp.data;
  //               axios.get('http://localhost:8080/updateOrder?orderId='+order.value.orderId+"&productType="+order.value.productType
  //                   +"&productName="+order.value.productName+"&customerName="+order.value.customerName
  //                   +"&customerNumber="+order.value.customerNumber+"&customerAddress="+order.value.customerAddress
  //                   +"&createTime="+order.value.createTime+"&productQuantity="+order.value.productQuantity+"&productPrice="
  //                   +order.value.productPrice
  //                   +"&orderStatus="+"已完成").then(
  //                   (resp)=> {
  //                     axios.get('http://localhost:8080/searchScript?scriptId='+row_temp.scriptId).then(
  //                         (resp1)=> {
  //                           sscript.value = resp1.data;
  //                           axios.get('http://localhost:8080/updataScript?scriptId=' + sscript.value.scriptId + "&scriptName=" +
  //                               sscript.value.scriptName +
  //                               "&scriptType=" + sscript.value.scriptType + "&scriptPrice=" + sscript.value.scriptPrice
  //                               +"&scriptStatus=" + "空闲中").then(
  //                               (resp2) => {
  //
  //                               }
  //                           )
  //                         }
  //                     )
  //                   }
  //               )
  //             }
  //         )
  //         // //添加后刷新页面
  //         // selectOrder();
  //       }
  //   )

  // }
  //调用updataProcess请求后端对状态加一
}
const order=ref({orderId:'',productName:'',productType:'',productPrice:'',productQuantity:'',
      customerName:'',customerNumber:'',
      customerAddress:'',orderStatus:'',createTime:''
    })

const HandleNext=(row_temp)=>{
  dialogshownext.value=true;
  // stage_temp=row.stage;
  // type_temp=row.type;

if(row_temp.scriptId!=-1){
  axios.get('http://localhost:8080/searchScript?scriptId='+row_temp.scriptId).then(
      (resp)=> {
        sscript.value = resp.data;
        axios.get('http://localhost:8080/updataScript?scriptId=' + sscript.value.scriptId + "&scriptName=" +
            sscript.value.scriptName +
            "&scriptType=" + sscript.value.scriptType + "&scriptPrice=" + sscript.value.scriptPrice
            +"&scriptStatus=" + "空闲中").then(
            (resp1) => {
              axios.get('http://localhost:8080/searchScript?scriptId='+scriptId_temp.value).then(
                  (resp2)=> {
                    sscript.value = resp2.data;
                    axios.get('http://localhost:8080/updataScript?scriptId=' + scriptId_temp.value + "&scriptName=" +
                        sscript.value.scriptName +
                        "&scriptType=" + sscript.value.scriptType + "&scriptPrice=" + sscript.value.scriptPrice
                        +"&scriptStatus=" + "工作中").then(
                        (resp3) => {
                          axios.get('http://localhost:8080/updateProcess?orderId=' + row_temp.orderId +
                              "&productName=" +
                              row_temp.productName+
                              "&productType="+row_temp.productType+"&scriptId="+sscript.value.scriptId+"&scriptName="+sscript.value.scriptName
                              +"&stage="+(row_temp.stage+1)).then(
                              (resp4)=>{
                                selectProcess();
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

}
else {
  axios.get('http://localhost:8080/searchScript?scriptId='+scriptId_temp.value).then(
      (resp)=> {
        ssscript.value = resp.data;
        axios.get('http://localhost:8080/updataScript?scriptId=' + scriptId_temp.value + "&scriptName=" +
            ssscript.value.scriptName +
            "&scriptType=" + ssscript.value.scriptType + "&scriptPrice=" + ssscript.value.scriptPrice
            +"&scriptStatus=" + "工作中").then(
            (resp3) => {
              axios.get('http://localhost:8080/updateProcess?orderId=' + row_temp.orderId +
                  "&productName=" +
                  row_temp.productName+
                  "&productType="+row_temp.productType+"&scriptId="+ssscript.value.scriptId+"&scriptName="+ssscript.value.scriptName
                  +"&stage="+(row_temp.stage+1)).then(
                  (resp4)=>{
                    selectProcess();
                  }
              )
            }
        )
      }
  )


}










  ElMessage({
    message: '提交成功！',
    type: 'success',
  })
  dialogshownext.value=false;

  //location.reload();
  //重新进入页面


}

const value=ref();
const options1=[
  {
    value: 'Option1',
    label: '发酵机',
  },
  {
    value: 'Option2',
    label: '消毒器',
  },
  {
    value: 'Option3',
    label: '脱脂机',
  },
  {
    value: 'Option4',
    label: '罐装机',
  },
]
const sscript=ref(
    {
     scriptId:'',
      scriptName:'',
      scriptType:'',
      scriptStatus:'',
      scriptPrice:''
    }
);
const ssscript=ref(
    {
      scriptId:'',
      scriptName:'',
      scriptType:'',
      scriptStatus:'',
      scriptPrice:''
    }
);

const  searchScript=ref([{
  scriptId:'',
  scriptName:'',
  scriptType:'',
  scriptStatus:'',
  scriptPrice:'',
  //disable:false
  //  disabled:computed(() => {
  //   return scriptStatus === '工作中';

}])


const judge=(row_temp)=>{
  if ((row_temp.stage==4)&&(row_temp.productType=="纯牛奶")||(row_temp.stage==5)&&(row_temp.productType=="酸奶"))
  {
    axios.get('http://localhost:8080/deleteProcess?orderId='+row_temp.orderId).then(
        (resp)=>{
          axios.get('http://localhost:8080/searchOrder1?orderId='+row_temp.orderId).then(
              (order_temp)=> {
                order.value=order_temp.data;
                axios.get('http://localhost:8080/updateOrder?orderId='+order.value.orderId+"&productType="+order.value.productType
                    +"&productName="+order.value.productName+"&customerName="+order.value.customerName
                    +"&customerNumber="+order.value.customerNumber+"&customerAddress="+order.value.customerAddress
                    +"&createTime="+order.value.createTime+"&productQuantity="+order.value.productQuantity+"&productPrice="
                    +order.value.productPrice
                    +"&orderStatus="+"已完成").then(
                    (resp)=> {
                      axios.get('http://localhost:8080/searchScript?scriptId='+row_temp.scriptId).then(
                          (resp1)=> {
                            sscript.value = resp1.data;
                            axios.get('http://localhost:8080/updataScript?scriptId=' + sscript.value.scriptId + "&scriptName=" +
                                sscript.value.scriptName +
                                "&scriptType=" + sscript.value.scriptType + "&scriptPrice=" + sscript.value.scriptPrice
                                +"&scriptStatus=" + "空闲中").then(
                                (resp2) => {
                                  selectProcess();
                                }
                            )
                          }
                      )
                    }
                )
              }
          )
          // //添加后刷新页面
          // selectOrder();
        }
    )
   // location.reload(); q
  }
  else {
    HndaleShow(row_temp) ,selectScript();

  }

}


const  selectScript=()=>{
  if(stage_temp==1)
  {
    axios.get('http://localhost:8080/selectX').then(
        (resp)=>{
          searchScript.value=resp.data;
        }
    )
  }
  else if(stage_temp==2)
  {
    axios.get('http://localhost:8080/selectT').then(
        (resp)=>{
          searchScript.value=resp.data;
        }
    )
  }
  else if(stage_temp==3&&type_temp=="酸奶")
  {
    axios.get('http://localhost:8080/selectF').then(
        (resp)=>{
          searchScript.value=resp.data;
        }
    )
  }
  else
  {
    axios.get('http://localhost:8080/selectG').then(
        (resp)=>{
          searchScript.value=resp.data;
        }
    )
  }


}
import {  inject } from 'vue-demi'

const reload = inject('reload')







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
.table-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
