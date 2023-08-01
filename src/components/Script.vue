<template>
  <div>

    <el-button @click="showAddscript()">增加设备</el-button>
    <el-input v-model="searchName" placeholder="请输入设备名称" style="width:150px;margin-left:50px" :prefix-icon="Search" />
    <el-button @click="searchscript()" :icon="Search">搜索</el-button>



    <el-dialog v-model="dialogVisible" title="增加设备" width="34%">
      <table>

        <tr>
          <td>设备名称：</td>
          <td>
            <el-input v-model="scriptName" placeholder="输入设备名称" />
          </td>
        </tr>
        <tr>
          <td>设备类型：</td>
          <td>
            <el-select v-model="scriptType" class="m-4" placeholder="请选择设备类型">
              <el-option v-for="item in option01" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </td>
        </tr>



        <tr>
          <td>设备价格：</td>
          <td>
            <el-input v-model="scriptPrice" placeholder="输入设备价格/￥" />
          </td>
        </tr>
        <tr>
          <td>设备状态：</td>
          <td>
            <el-select v-model="scriptStatus" class="m-3" placeholder="请选择设备状态">
              <el-option v-for="item in option02" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </td>
        </tr>


      </table>
      <template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogVisible = false">取消</el-button>
					<el-button type="primary" @click="addscript()">
						提交
					</el-button>
				</span>
      </template>
    </el-dialog>



    <el-table :data="vuescript" style="width: 100%"  stripe>
      <el-table-column type="selection" align="center" width="75" />
      <el-table-column prop="scriptId" label="设备编号" align="center" width="190" />
      <el-table-column prop="scriptName" label="设备名称" align="center" width="190" />
      <el-table-column prop="scriptType" label="设备类型" align="center" width="190" />
      <el-table-column prop="scriptPrice" label="设备价格/￥" align="center" width="190" />
      <el-table-column prop="scriptStatus" label="设备状态" align="center" width="190" />
      <el-table-column label="操作" align="center" width="190">
        <template #default="scope">
          <el-button link type="primary" @click="delscript(scope.row)">删除</el-button>
          <el-button link type="primary" @click="showUpdatascript(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>


    <!--页面跳转-->
    <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4" :page-sizes="[5, 10, 20, 50]" small="false"
                   background="true" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
                   @current-change="handleCurrentChange" />



    <!--对应修改按钮的修改功能-->
    <el-dialog v-model="updataUserDialogVisible" title="修改设备" width="30%">
      <table>
<!--        <tr>-->
<!--          <td>设备编号：</td>-->
<!--          <td>-->
<!--            <el-input v-model="scriptId" placeholder="输入设备编号" />-->
<!--          </td>-->
<!--        </tr>-->
        <tr>
          <td>设备名称：</td>
          <td>
            <el-input v-model="scriptName" placeholder="输入设备名称" />
          </td>
        </tr>
<!--        <tr>-->
<!--          <td>设备类型：</td>-->
<!--          <td>-->
<!--            <el-select v-model="scriptType" class="m-4" placeholder="请选择设备类型">-->
<!--              <el-option v-for="item in option01" :key="item.value" :label="item.label" :value="item.value" />-->
<!--            </el-select>-->
<!--          </td>-->
<!--        </tr>-->



        <tr>
          <td>设备价格：</td>
          <td>
            <el-input v-model="scriptPrice" placeholder="输入设备价格/￥" />
          </td>
        </tr>

<!--        <tr>-->
<!--          <td>设备状态：</td>-->
<!--          <td>-->
<!--            <el-select v-model="scriptStatus" class="m-3" placeholder="请选择设备状态">-->
<!--              <el-option v-for="item in option02" :key="item.value" :label="item.label" :value="item.value" />-->
<!--            </el-select>-->
<!--          </td>-->
<!--        </tr>-->
      </table>







      <template #footer>
			<span class="dialog-footer">
				<el-button @click="updataUserDialogVisible = false">取消</el-button>
				<el-button type="primary" @click="updatascript()">
					提交
				</el-button>
			</span>
      </template>
    </el-dialog>
  </div>
</template>



<script setup>
import {
  ref,
  onMounted
} from 'vue';
import axios from 'axios';
import {
  Search,
} from '@element-plus/icons-vue'
onMounted(() => {
  selectscript();
})

const vuescript = ref([{
  scriptId: '',
  scriptName: '',
  scriptType: '',
  scriptPrice: '',
  scriptStatus: ''
}])


const currentPage4 = ref(1);
const pageSize4 = ref(5);
const total = ref(0);

// sessionStorage.setItem("username",total.value);
//每页记录数改变时触发，参数为改变后的记录数
const handleSizeChange = (val) => {
  pageSize4.value = val;
  selectscript();
}
//页码改变时触发,参数为改变后的页码
const handleCurrentChange = (val) => {
  currentPage4.value = val;
  selectscript();
}
//给后端发送请求
const selectscript = () => {
  axios.get('http://localhost:8080/selectScript?currentPage=' + currentPage4.value + "&pageSize=" + pageSize4.value).then(
      (resp) => {
        vuescript.value = resp.data.dataList;
        total.value = resp.data.total;
      }
  )
}


//删除设备
const delscript = (row) => {
  //给后端发送请求
  axios.get('http://localhost:8080/deleteScript?scriptId=' + row.scriptId).then(
      (resp) => {
        selectscript();
      }
  )
}

const dialogVisible = ref(false);
const showAddscript = () => {
  dialogVisible.value = true;
}
const updataUserDialogVisible = ref(false);

const showUpdatascript = (row) => {
  scriptId.value = row.scriptId;
  scriptName.value = row.scriptName;
  scriptType.value = row.scriptType;
  scriptPrice.value = row.scriptPrice;
  scriptStatus.value = row.scriptStatus;
  updataUserDialogVisible.value = true;
}


const scriptId = ref("");
const scriptName = ref("");
const scriptType = ref("");
const scriptPrice = ref("");
const scriptStatus = ref("");

const value=ref();
const option01 = [
  {
    value: '消毒',
    label: '消毒',
  },
  {
    value: '发酵',
    label: '发酵',
  },
  {
    value: '脱脂',
    label: '脱脂',
  },
  {
    value: '罐装',
    label: '罐装',
  },
]

const option02 = [
  {
    value: '空闲中',
    label: '空闲中',
  },
  {
    value: '工作中',
    label: '工作中',
  },

]

//增加设备
const addscript = () => {
  axios.get('http://localhost:8080/insertScript?scriptName=' +scriptName.value +
      "&scriptType=" + scriptType.value +
      "&scriptPrice=" + scriptPrice.value+
      "&scriptStatus=" + scriptStatus.value).then(
      (resp) => {
        scriptId.value = "";
        scriptName.value = "";
        scriptType.value = "";
        scriptPrice.value = "";
        scriptStatus.value = "";
        selectscript();
      }
  )
  dialogVisible.value = false;
}


//修改设备
const updatascript = () => {
  axios.get('http://localhost:8080/updataScript?scriptId=' + scriptId.value + "&scriptName=" + scriptName.value +
      "&scriptType=" + scriptType.value + "&scriptPrice=" + scriptPrice.value+"&scriptStatus=" + scriptStatus.value).then(
      (resp) => {
        scriptId.value = "";
        scriptName.value = "";
        scriptType.value = "";
        scriptPrice.value = "";
        scriptStatus.value = "";
        selectscript();
      }
  )
  updataUserDialogVisible.value = false;
}
const searchName = ref("")

//搜索设备
const searchscript = () => {
  axios.get('http://localhost:8080/searchScript?scriptName=' + searchName.value).then(
      (resp) => {
        vuescript.value = resp.data;
      }
  )
}
</script>

<style>
</style>
