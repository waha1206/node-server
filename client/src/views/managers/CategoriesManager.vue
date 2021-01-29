<template>
  <div>
    <div class="customer-manager"></div>
    <el-container>
      <el-header>
        <div class="cascader-wrap">
          <el-cascader
            @change="onOptionsChange"
            v-model="choiceLevelTwoValue"
            props.expand-trigger="hover"
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
        <el-table
          size="mini"
          :stripe="true"
          :data="
            tableData.filter(
              (data) =>
                !search ||
                data.name.toLowerCase().includes(search.toLowerCase())
            )
          "
          style="width: 100%"
        >
          <!-- 序號 -->
          <el-table-column
            type="index"
            label="序號"
            align="center"
            width="70"
          ></el-table-column>
          <!-- 商品名稱 -->
          <el-table-column
            label="供應商公司抬頭"
            prop="name"
            align="left"
            width="180"
          ></el-table-column>
          <!-- 商品名稱 -->
          <el-table-column
            label="狀態"
            prop="status.activated"
            align="left"
            width="70"
          >
          </el-table-column>

          <!-- 搜尋欄位 -->
          <el-table-column align="center" width="150">
            <!-- header 代表放到列的說明文字那邊 -->
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="輸入關鍵字搜尋"
              />
            </template>
            <!-- slot 崁入兩個按鈕 -->
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEditMaterial(scope.$index, scope.row)"
                >編輯</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDeleteMaterial(scope.$index, scope.row)"
                >刪除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- <el-aside width="50%">{{ choiceLevelTwoClass }}</el-aside>
        <el-aside width="50%">Aside</el-aside> -->
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
      search: '',
      tableData: [],
      choiceLevelTwoValue: [], // cascader 選擇的品項
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
  computed: {},

  created() {
    this.getCategoriesLevelOneData()
    this.getCategoriesLevelTwoData()
    this.getUserInfo()
  },
  mounted() {
    this.setCascaderOptions()
    this.getCategoriesLevelThreeData()
  },

  methods: {
    setCascaderOptions() {
      // ，就讀回來上次的紀錄
      if (
        localStorage.choiceLevelTwoValue &&
        localStorage.choiceLevelOneValue
      ) {
        this.choiceLevelTwoValue[0] = localStorage.choiceLevelOneValue
        this.choiceLevelTwoValue[1] = localStorage.choiceLevelTwoValue
      }
    },
    watch: {
      categoriesLevelOneData() {
        console.log(this.categoriesLevelOneData)
        console.log(this.categoriesLevelTwoData)
      }
    },
    onOptionsChange(value) {
      // 當分類選擇異動的時候，再重新的撈第三層的商品資料
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
      this.getCategoriesLevelThreeData()
    },
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
    // 一開始就取得 商品分類代號資訊
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
    // 取得第三層的商品資訊，使用選擇到的第二層分類 id ，回傳值忽略掉 imgs 欄位，有需要再另外取得
    getCategoriesLevelThreeData() {
      console.log('this.choiceLevelTwoValue', this.choiceLevelTwoValue)
      if (!this.choiceLevelTwoValue[1]) return
      this.$axios
        .get(`/api/categories/three/${localStorage.choiceLevelTwoValue}`)
        .then((res) => {
          // 把資料庫的數據都先讀出來
          this.categoriesLevelThreeData = res.data
          this.tableData = res.data
          console.log(res.data)
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
/* 調整 div 容器最大的寬度 */
.cascader-wrap {
  float: left;
  margin: 0 15px 0 0;
  padding: 0;
  width: 300px;
}

/* 直接調整 el-cascader 沒有用，因為外面套了一個 div 該 class 為 .el-cascader--mini */
.el-cascader--mini {
  width: 100% !important;
}
</style>
