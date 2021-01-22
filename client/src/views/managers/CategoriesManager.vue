<template>
  <div>
    <div class="customer-manager"></div>
    <el-container>
      <el-header>
        <el-button type="primary" size="small" @click="addLevelOne"
          >新增第一層分類</el-button
        >
        <el-button type="primary" size="small" @click="addLevelTwo"
          >新增第二層分類</el-button
        >
      </el-header>
      <el-container>
        <el-aside width="50%">商品代號</el-aside>
        <el-aside width="50%">Aside</el-aside>
        <!-- <el-main>Main</el-main> -->
      </el-container>
    </el-container>
    <CategoriesLevelOneDialog
      v-if="categoriesLevelOneData[0]"
      :dialog="categoriesLevelOneDialog"
      :formData="categoriesLevelOneFormData"
      :categoriesData="categoriesLevelOneData"
      @update="getCategoriesLevelOneData"
    ></CategoriesLevelOneDialog>
    <!-- v-if="categoriesLevelTwoData[0]" -->
    <CategoriesLevelTwoDialog
      :dialog="categoriesLevelTwoDialog"
      :formData="categoriesLevelTwoFormData"
      :categoriesLevelTwoData="categoriesLevelTwoData"
      :categoriesLevelOneData="categoriesLevelOneData"
      @update="getCategoriesLevelTwoData"
    ></CategoriesLevelTwoDialog>
  </div>
</template>

<script>
import CategoriesLevelOneDialog from '../../components/CategoriesManager/CategoriesLevelOneDialog'
import CategoriesLevelTwoDialog from '../../components/CategoriesManager/CategoriesLevelTwoDialog'

export default {
  name: 'categories-manager',
  data() {
    return {
      categoriesLevelOneData: [], // 開始就先讀取資料庫的數據
      categoriesLevelTwoData: [], // 開始就先讀取資料庫的數據
      categoriesLevelOneFormData: {
        type: '',
        name: '',
        describe: '',
        last_modify_user: '',
        id: '',
        level: 1
      },
      categoriesLevelTwoFormData: {
        type: '',
        name: '',
        describe: '',
        last_modify_user: '',
        id: '',
        level: 2,
        level_one_id: ''
      },
      categoriesLevelOneDialog: {
        show: false,
        title: '展示一下',
        option: 'edit',
        level_one_id: ''
      },
      categoriesLevelTwoDialog: {
        show: false,
        title: '展示一下',
        option: 'edit'
      }
    }
  },
  components: {
    CategoriesLevelOneDialog,
    CategoriesLevelTwoDialog
  },
  created() {
    this.getCategoriesLevelOneData()
    this.getCategoriesLevelTwoData()
  },
  methods: {
    // 一開始就取得 商品分類袋號資訊
    getCategoriesLevelOneData() {
      this.$axios
        .get('/api/categories')
        .then((res) => {
          // 把資料庫的數據都先讀出來
          this.categoriesLevelOneData = res.data
          // 設置分頁數據
          // this.setPaginations()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getCategoriesLevelTwoData() {
      this.$axios
        .get('/api/categories/two')
        .then((res) => {
          // 把資料庫的數據都先讀出來
          this.categoriesLevelTwoData = res.data
          // 設置分頁數據
          // this.setPaginations()
        })
        .catch((err) => {
          console.log(err)
        })
    },

    // 添加一筆新的商品分類代號 TD SS GG ... 等等
    addLevelOne() {
      this.categoriesLevelOneDialog = {
        show: true,
        title: '新增加第一層的商品分類目錄',
        option: 'add'
      }
    },
    addLevelTwo() {
      this.categoriesLevelTwoDialog = {
        show: true,
        title: '新增加第二層的商品分類目錄',
        option: 'add'
      }
    }
  }
}
</script>

<style scoped>
.customer-manager {
  width: 100%;
  height: 100%;
  /* padding: 16px; */
  box-sizing: border-box;
}

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
  line-height: 160px;
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
</style>
