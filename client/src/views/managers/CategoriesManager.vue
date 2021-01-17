<template>
  <div>
    <div class="customer-manager"></div>
    <el-container>
      <el-header>
        <el-button type="primary" size="small" @click="addLevelOne"
          >新增商品代號</el-button
        >
        <el-button type="primary" size="small" @click="getCategories"
          >取得商品類別資訊</el-button
        >
      </el-header>
      <el-container>
        <el-aside width="50%">商品代號</el-aside>
        <el-aside width="50%">Aside</el-aside>
        <!-- <el-main>Main</el-main> -->
      </el-container>
    </el-container>
    <CategoriesDialog
      :dialog="dialog"
      :formData="formData"
      :categoriesData="categoriesData"
      @update="getCategories"
    ></CategoriesDialog>
  </div>
</template>

<script>
import CategoriesDialog from '../../components/CategoriesManager/CategoriesDialog'

export default {
  name: 'categories-manager',
  data() {
    return {
      innerDialog: false,
      categoriesData: [], // 開始就先讀取資料庫的數據
      formData: {
        type: '',
        name: '',
        describe: '',
        last_modify_user: '',
        id: ''
      },
      dialog: {
        show: false,
        title: '展示一下',
        option: 'edit'
      }
    }
  },
  components: {
    CategoriesDialog
  },
  created() {
    this.getCategories()
  },
  methods: {
    // 一開始就取得 商品分類袋號資訊
    getCategories() {
      this.$axios
        .get('/api/categories')
        .then((res) => {
          // 把資料庫的數據都先讀出來
          this.categoriesData = res.data
          // 設置分頁數據
          // this.setPaginations()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 添加一筆新的商品分類代號 TD SS GG ... 等等
    addLevelOne() {
      this.dialog = {
        show: true,
        title: '新增加第一層的商品分類目錄',
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
