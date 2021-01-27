<template>
  <div>
    <div class="customer-manager"></div>
    <el-container>
      <el-header>
        <div class="cascader-wrap">
          <el-cascader
            v-model="choiceLevelTwoValue"
            expand-trigger="hover"
            size="mini"
            placeholder="請選擇第二層分類"
            :options="levelOneTowOption"
            filterable
          ></el-cascader>
        </div>
        <el-button type="primary" size="small" @click="addLevelOne"
          >新增第一層分類</el-button
        >
        <el-button type="primary" size="small" @click="addLevelTwo"
          >新增第二層分類</el-button
        >
        <el-button type="primary" size="small" @click="addLevelThree"
          >新增第三層商品</el-button
        >
      </el-header>
      <el-container>
        <el-aside width="50%">{{ op }}</el-aside>
        <el-aside width="50%">Aside</el-aside>
        <!-- <el-main>Main</el-main> -->
      </el-container>
    </el-container>
    <!-- 新增第一層商品的 dialog -->
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
    <!-- 新增第三層商品的 dialog -->
    <CategoriesLevelThreeDialog
      v-if="categoriesLevelTwoData[0] && categoriesLevelOneData[0]"
      :dialog="categoriesLevelThreeDialog"
      :formData="categoriesLevelThreeFormData"
      :categoriesLevelOneData="categoriesLevelOneData"
      :categoriesLevelTwoData="categoriesLevelTwoData"
      :allUserNameId="allUserNameId"
      @update="getCategoriesLevelThreeData"
    ></CategoriesLevelThreeDialog>
  </div>
</template>

<script>
import CategoriesLevelOneDialog from '../../components/CategoriesManager/CategoriesLevelOneDialog'
import CategoriesLevelTwoDialog from '../../components/CategoriesManager/CategoriesLevelTwoDialog'
import CategoriesLevelThreeDialog from '../../components/CategoriesManager/categoriesLevelThreeDialog'

export default {
  name: 'categories-manager',
  data() {
    return {
      optipons: [
        {
          value: 'level one',
          label: '第一層',
          children: [{ value: 'level two', label: '第二層' }]
        },
        {
          value: 'level one',
          label: '第一層++',
          children: [{ value: 'level two++', label: '第二層++' }]
        }
      ],
      choiceLevelTwoValue: '',
      levelOneTowOption: [], // 存放第一層與第二層的分類
      allUserNameId: [], // 所有使用者
      categoriesLevelOneData: [], // 開始就先讀取資料庫的數據
      categoriesLevelTwoData: [], // 開始就先讀取資料庫的數據
      categoriesLevelThreeData: [], // 開始就先讀取資料庫的數據
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
      categoriesLevelThreeFormData: {
        type: '',
        name: '',
        describe: '',
        last_modify_user: '',
        id: '',
        level: 3,
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
      },
      categoriesLevelThreeDialog: {
        show: false,
        title: '展示一下',
        option: 'edit'
      }
    }
  },
  components: {
    CategoriesLevelOneDialog,
    CategoriesLevelTwoDialog,
    CategoriesLevelThreeDialog
  },
  computed: {
    op() {
      this.levelOneTowOption = []
      this.categoriesLevelOneData.forEach((item) => {
        // console.log(index, item.name, item._id)
        let obj = {
          value: '',
          label: '',
          children: []
        }
        obj.value = item._id
        obj.label = item.type + ' ' + item.name
        this.levelOneTowOption.push(obj)
      })

      for (let i = 0; i < this.levelOneTowOption.length; i++) {
        const level_one_id = this.levelOneTowOption[i].value
        this.categoriesLevelTwoData.forEach((item) => {
          if (item.level_one_id === level_one_id) {
            let obj2 = {
              value: '',
              label: ''
            }
            obj2.value = item._id
            obj2.label = item.type + ' ' + item.name
            this.levelOneTowOption[i].children.push(obj2)
          }
        })
      }
      return this.choiceLevelTwoValue
    }
  },

  created() {
    this.getCategoriesLevelOneData()
    this.getCategoriesLevelTwoData()
    this.getCategoriesLevelThreeData()
    this.getUserInfo()
  },
  methods: {
    // 取得所有使用者的資訊
    getUserInfo() {
      this.$axios
        .get('/api/user/user-info')
        .then((res) => {
          this.allUserNameId = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
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
    getCategoriesLevelThreeData() {
      this.$axios
        .get('/api/categories/three')
        .then((res) => {
          // 把資料庫的數據都先讀出來
          this.categoriesLevelThreeData = res.data
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
    },
    addLevelThree() {
      this.categoriesLevelThreeDialog = {
        show: true,
        title: '新增加第三層的商品',
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
.cascader-wrap {
  float: left;
  margin: 0 10px 0 0;
  padding: 0;
}
</style>
