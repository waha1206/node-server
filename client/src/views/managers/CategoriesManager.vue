<template>
  <div>
    <div class="customer-manager"></div>
    <el-container>
      <el-header>
        <div class="cascader-wrap">
          <el-cascader
            @change="onOptionsChange"
            v-model="choiceLevelTwoValue"
            :props="{ expandTrigger: 'hover' }"
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
          <!-- 商品編號 -->
          <el-table-column
            label="商品編號"
            prop="type"
            align="center"
            width="70"
          >
          </el-table-column>
          <!-- 版型商品編號 -->
          <el-table-column
            label="版型編號"
            prop="pattern_no"
            align="center"
            width="120"
          >
          </el-table-column>
          <!-- 啟用/VIP -->
          <el-table-column label="啟用 / VIP" align="center" width="110">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status.activated" type="" size="mini"
                >啟用</el-tag
              >
              <el-tag v-else type="warning" size="mini">關閉</el-tag>
              &nbsp
              <el-tag v-if="scope.row.status.vip" type="" size="mini"
                >啟用</el-tag
              >
              <el-tag v-else type="warning" size="mini">關閉</el-tag>
            </template>
          </el-table-column>
          <!-- 多圖 -->
          <el-table-column label="單圖" width="70" align="center">
            <template slot-scope="scope">
              <!-- v-for="(item, index) in scope.row.imgs" -->
              <img
                v-if="scope.row.imgs[0]"
                width="50px"
                height="50px"
                :src="scope.row.imgs[0]"
                alt=""
              />
            </template>
          </el-table-column>
          <!-- 多圖 -->
          <el-table-column label="多圖" width="70" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="left">
                <img
                  v-for="(item, index) in scope.row.imgs"
                  width="200px"
                  height="200px"
                  :key="index"
                  :src="item"
                  alt=""
                />
                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">多圖</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>

          <!-- 說明跳出來對話框的區塊 -->
          <el-table-column label="詳細資料" width="70" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="right">
                <p>建檔日期：{{ getDate(scope.row.create_date) }}</p>
                <p>商品名稱：{{ scope.row.name }}</p>
                <p>商品編號：{{ scope.row.type }}</p>
                <p>商品說明：{{ scope.row.describe }}</p>
                <p>
                  商品狀態：<span v-if="scope.row.status.activated"
                    >已經啟用</span
                  >
                  <span else>尚未啟用</span>
                  <span>、</span>
                  <span v-if="scope.row.status.vip">VIP已啟用</span>
                  <span v-else>VIP未啟用</span>
                </p>
                <p>修改時間：{{ getDate(scope.row.last_modify_date) }}</p>
                <p>
                  修改人員：{{ getUserNameById(scope.row.last_edit_person) }}
                </p>
                <p>影片名稱：{{ scope.row.introduction_video.label }}</p>
                <p>
                  影片連結：<a
                    :href="scope.row.introduction_video.link"
                    target="_blank"
                    >{{ scope.row.introduction_video.link }}</a
                  >
                </p>
                <p>布料校色：{{ scope.row.salting_on_color_video.label }}</p>
                <p>
                  校色連結：<a
                    :href="scope.row.salting_on_color_video.link"
                    target="_blank"
                    >{{ scope.row.salting_on_color_video.link }}</a
                  >
                </p>
                <p>其它影片(一)：{{ scope.row.note_one_video.label }}</p>
                <p>
                  影片連結(一)：<a
                    :href="scope.row.note_one_video.link"
                    target="_blank"
                    >{{ scope.row.note_one_video.link }}</a
                  >
                </p>
                <p>其它影片(二)：{{ scope.row.note_two_video.label }}</p>
                <p>
                  影片連結(二)：<a
                    :href="scope.row.note_two_video.link"
                    target="_blank"
                    >{{ scope.row.note_two_video.link }}</a
                  >
                </p>
                <p>版型編號：{{ scope.row.pattern_no }}</p>
                <p>
                  版型連結：<a
                    :href="scope.row.pattern_download"
                    target="_blank"
                    >{{ scope.row.pattern_download }}</a
                  >
                </p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">完整說明</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <!-- 商品說明 -->
          <el-table-column
            label="商品說明"
            prop="describe"
            align="center"
            width="500"
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
                @click="handleEditcategory(scope.$index, scope.row)"
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
    <!-- 分頁 -->
    <div class="pagination">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="my_paginations.page_index"
        :page-size="my_paginations.page_size"
        :page-sizes="my_paginations.page_sizes"
        :total="my_paginations.total"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </div>
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
    <!-- v-if 判斷很重要，add 的話，原始的 form 裡面會有一個內定的 level = 3 如果是 edit 的話就要判斷有沒有 _id 這個值 -->
    <CategoriesLevelThreeDialog
      v-if="formData.level == 3 || formData._id"
      :dialog="categoriesLevelThreeDialog"
      :levelThreeFormData="formData"
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
import CategoriesLevelThreeDialog from '../../components/CategoriesManager/CategoriesLevelThreeDialog'

export default {
  name: 'categories-manager',
  data() {
    return {
      // 管理分頁的物件
      my_paginations: {
        page_index: 1, // 位於當前第幾頁
        total: 0, // 總數
        page_size: 10, // 每一頁顯示幾條數據
        page_sizes: [5, 10, 15, 17] // 選擇一頁要顯示多少條
        // layouts: 'total, sizes, prev, pager, next, jumper'
      },
      search: '', // 表格搜尋的值
      tableData: [], // 表格的資料
      choiceLevelTwoValue: [], // cascader 選擇的品項
      levelOneTowOption: [], // 存放第一層與第二層的分類
      allUserNameId: [], // 所有使用者
      categoriesLevelOneData: [], // 開始就先讀取資料庫的數據
      categoriesLevelTwoData: [], // 開始就先讀取資料庫的數據
      categoriesLevelThreeData: [], // 開始就先讀取資料庫的數據
      formData: {},
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
        imgs: [],
        level_one_id: '',
        level_two_id: '',
        name: '',
        type: '',
        describe: '',
        level: 0,
        pattern_no: '', // 版型編號
        pattern_download: '', // 雲端下載連結，存放雲端資料夾的網址
        introduction_video: { label: '', link: '' }, // 商品影片
        salting_on_color_video: { label: '', link: '' }, // 校色影片
        note_one_video: { label: '', link: '' }, // 其它影片(一)
        note_two_video: { label: '', link: '' }, // 其它影片(二)
        last_modify_date: '',
        last_edit_person: '',
        status: { activated: false, vip: false }, // 啟用？網頁端會看到商品與否，VIP = 客製化商品專屬
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

  created() {
    this.getCategoriesLevelOneData()
    this.getCategoriesLevelTwoData()
    this.getUserInfo()
  },
  mounted() {
    this.setCascaderOptions()
  },
  watch: {
    // 如果 level one 跟 level two 都有資料的時候，就更動 cascader 的聯集選擇器
    categoriesLevelTwoData() {
      if (this.categoriesLevelTwoData[0]) {
        console.log('categoriesManage.vue watch', '設定  cascader')
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
      }
      this.getCategoriesLevelThreeData()
    }
  },

  methods: {
    getUserNameById(id) {
      if (!id) return
      let name = ''
      this.allUserNameId.forEach((item, index) => {
        if (item._id == id) name = item.name
      })
      return name
    },

    // 時間轉換
    getDate(dt) {
      return this.$moment(dt).format('YYYY年MM月DD日-HH：mm')
    },
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

    onOptionsChange(value) {
      // 當分類選擇異動的時候，再重新的撈第三層的商品資料
      localStorage.choiceLevelOneValue = value[0]
      localStorage.choiceLevelTwoValue = value[1]
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
      if (!this.choiceLevelTwoValue[1]) return
      this.$axios
        .get(`/api/categories/three/${this.choiceLevelTwoValue[1]}`)
        .then((res) => {
          // 把資料庫的數據都先讀出來
          this.categoriesLevelThreeData = [...res.data]
          // 設置分頁數據
          this.setPaginations()
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
      // 新增，就把要傳到子元件裡面的資料清空，這邊傳到子元件是 formData
      this.formData = Object.assign({}, this.categoriesLevelThreeFormData)
    },
    // 編輯選中的商品資料
    handleEditcategory(index, row) {
      this.categoriesLevelThreeDialog = {
        show: true,
        title: '編輯加第三層的商品',
        option: 'edit'
      }
      // 把 row 裡面的資料深拷貝一份給 formdata 這是是傳到 子元件裡面所需要的屬性
      this.formData = Object.assign({}, row)
    },
    // 分頁設定
    setPaginations() {
      // 分頁屬性設置
      this.my_paginations.total = this.categoriesLevelThreeData.length
      this.my_paginations.page_index = 1
      if (localStorage.categories_page_size) {
        this.my_paginations.page_size = Number(
          localStorage.categories_page_size
        )
      } else {
        this.my_paginations.page_size = 5
      }
      // 設置分頁數據
      this.tableData = this.categoriesLevelThreeData.filter((item, index) => {
        return index < this.my_paginations.page_size
      })
    },
    handleSizeChange(page_size) {
      // 切換每頁有幾條數據
      localStorage.categories_page_size = page_size
      this.my_paginations.page_index = 1
      this.my_paginations.page_size = page_size
      this.tableData = this.categoriesLevelThreeData.filter((item, index) => {
        return index < page_size
      })
    },
    handleCurrentChange(page) {
      // 獲取當前頁面
      let index = this.my_paginations.page_size * (page - 1)
      // 數據的總數
      let nums = this.my_paginations.page_size * page
      // 容器
      let tables = []
      for (let i = index; i < nums; i++) {
        if (this.categoriesLevelThreeData[i]) {
          tables.push(this.categoriesLevelThreeData[i])
        }
        this.tableData = tables
      }
    }
    // 分頁設定結束
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
.pagination {
  text-align: left;
  margin-top: 10px;
}
</style>
