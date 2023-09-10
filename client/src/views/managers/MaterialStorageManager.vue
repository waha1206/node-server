<template>
  <div class="materials-manager">
    <el-container>
      <el-header>
        <el-button type="primary" size="small" @click="addMaterialLevelOneClass">新增第一層分類</el-button>
        <el-button type="primary" size="small" @click="addMaterialLevelTwoClass">新增第二層分類</el-button>
        <el-button type="primary" size="small" @click="handleAddMaterial">新增原物料</el-button>
        <div class="materal-class-container">
          <!-- <el-cascader
            @change="onOptionsChange"
            v-model="choiceLevelTwoValue"
            :props="{ expandTrigger: 'hover' }"
            size="mini"
            placeholder="請選擇第二層分類"
            :options="levelOneTowOption"
            filterable
          ></el-cascader> -->
        </div>
        <div class="cascader-wrap"></div>
        <!-- {{ materialClassName }} -->
      </el-header>
      <!-- 分頁 -->
      <div class="pagination">
        <!--  -->
      </div>
      <!-- 分頁結束 -->
      <el-container>
        <!-- 內容 -->
        <p class="text-xl font-bold text-red-700">tailwind css</p>
        <p class="text-xl font-bold text-blue-700">tailwind css</p>
      </el-container>
    </el-container>

    <!-- 非常重要的知識點，遠端讀取資料庫後，要等到接收到遠端資料完畢後，才可以掛載子元件
		判斷式大概如下：v-if="allSupplierlData[0]"
		詳細的說明網頁連結：https://bit.ly/2LCp1CV
		 -->
  </div>
</template>

<script>
export default {
  name: 'material-storage-manager',
  data() {
    return {}
  },
  computed: {},
  components: {},
  beforeRouteEnter(to, from, next) {
    // console.log('元件內的 beforeRouterEnter，不能使用this,因為此時尚未創建成功')
    next()
  },
  beforeRouteLeave(to, from, next) {
    // console.log('beforeRouteLeave 我要離開這個元件了')
    next()
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {}
}
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: left;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 800px;
  border: 1px solid red;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.pagination {
  text-align: left;
  margin-top: 3px;
}
.materal-class-container {
  display: inline-block;
  margin-left: 10px;
  width: 300px !important;
}

/* 直接調整 el-cascader 沒有用，因為外面套了一個 div 該 class 為 .el-cascader--mini */
.el-cascader--mini {
  width: 100% !important;
}
</style>
