<template>
  <div>
    <el-container>
      <el-header>
        <!-- *************************** 一開始的下拉選單 cascader ***************************-->
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
        <el-button type="primary" size="small" @click="addGroupLevelOne"
          >新增第一層分類</el-button
        >
        <el-button type="primary" size="small" @click="addGroupLevelTwo"
          >新增第二層分類</el-button
        >
        <el-button type="primary" size="small" @click="addGroupLevelThree"
          >新增原物料容器</el-button
        >
      </el-header>
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
      <!-- 分頁結束 -->
      <el-container>
        <!-- <el-aside width="100%"> -->
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
          <!-- 表格的往下拓展選單 -->
          <!-- *************************** 表格的商品清單中的下拉選單 cascader ***************************-->
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="原料選擇：" class="cascader-item">
                  <div class="block">
                    <!-- <span class="demonstration">多选可搜索</span> -->
                    <el-cascader
                      size="mini"
                      clearable
                      v-model="props.row.choice_level_three_material"
                      placeholder="原料關鍵字"
                      @change="onMaterialOptionsChange(props.row)"
                      :options="materialOptions"
                      :props="{
                        multiple: true,
                        expandTrigger: 'hover',
                        emitPath: false
                      }"
                      filterable
                    ></el-cascader>
                  </div>
                  <el-button
                    size="mini"
                    type="primary"
                    @click="handleUpdateGroupMember(props.row)"
                    >更新原料清單</el-button
                  >
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <!-- 序號 -->
          <el-table-column
            type="index"
            label="序號"
            align="center"
            width="70"
          ></el-table-column>
          <!-- 原物組料名稱 -->
          <el-table-column
            label="原物料組名稱"
            prop="name"
            align="left"
            width="200"
          ></el-table-column>
          <!-- 編號 -->
          <el-table-column
            label="編號"
            prop="type"
            align="center"
            width="70"
          ></el-table-column>
          <!-- 加工費 -->
          <el-table-column
            label="加工費"
            prop="processing_fee"
            align="center"
            width="70"
          ></el-table-column>
          <!-- 加工費 -->
          <el-table-column
            label="客戶端顯示"
            prop="web_side_name"
            align="center"
            width="140"
          ></el-table-column>
          <!-- 多圖 -->
          <el-table-column label="縮圖" width="70" align="center">
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
          <el-table-column label="大圖" width="70" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="left">
                <img
                  v-for="(item, index) in scope.row.imgs"
                  width="480px"
                  height="480px"
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
          <!-- 備註 -->
          <el-table-column
            label="備註"
            prop="describe"
            align="left"
            width="820"
          ></el-table-column>

          <!-- 搜尋欄位、編輯與刪除的按扭 -->
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
                @click="handleEditGroupMember(scope.$index, scope.row)"
                >編輯</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDeleteGroupMember(scope.$index, scope.row)"
                >刪除</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <!-- </el-aside> -->

        <!-- <el-main>Main</el-main> -->
      </el-container>
    </el-container>
    <!-- 第一層的 dialog -- group level one -->
    <GroupLevelOneDialog
      v-if="groupLevelOneData[0]"
      :dialog="addLevelOneDialog"
      :groupLevelOneData="groupLevelOneData"
      @update="getGroupLevelOneData"
    ></GroupLevelOneDialog>
    <!-- 第二層的 dialog -- group level two -->
    <!-- :formData="levelOneData" 單筆資料 -->
    <!-- :groupLevelOneData="groupLevelOneData"  陣列資料
      :groupLevelTwoData="groupLevelTwoData" 陣列資料 -->
    <GroupLevelTwoDialog
      v-if="groupLevelOneData[0]"
      :dialog="addLevelTwoDialog"
      :groupLevelOneData="groupLevelOneData"
      :groupLevelTwoData="groupLevelTwoData"
      @update="getGroupLevelTwoData"
    ></GroupLevelTwoDialog>
    <!-- 第三層的 dialog -->
    <GroupLevelThreeDialog
      v-if="groupLevelOneData[0] && groupLevelTwoData[0]"
      :dialog="addLevelThreeDialog"
      :groupLevelOneData="groupLevelOneData"
      :groupLevelTwoData="groupLevelTwoData"
      :emptyLevelThreeFormData="levelThreeTableData"
      :editFormData="levelThreeEditTableData"
      :allUserNameId="allUserNameId"
      @update="getGroupLevelThreeData"
    ></GroupLevelThreeDialog>

    <!-- 子元件 -->
    <!-- 子元件結束 -->
  </div>
</template>

<script>
import GroupLevelOneDialog from '../../components/MaterialGroupManager/GroupLevelOneDialog'
import GroupLevelTwoDialog from '../../components/MaterialGroupManager/GroupLevelTwoDialog'
import GroupLevelThreeDialog from '../../components/MaterialGroupManager/GroupLevelThreeDialog'

export default {
  name: 'material-group-manager',
  data() {
    return {
      search: '',
      tableData: [],
      choiceLevelTwoValue: [], // 一開始選好後，會顯示 table 的資料，要選擇 one / two
      levelOneTowOption: [], // 所有可選擇的 one / two 層資料
      materialOptions: [], // 所有的原物料 第一層 第二層 第三層 拼湊出來的 cascader options
      groupLevelOneData: [], // 這個是讀取伺服器傳回來的陣列 level one
      groupLevelTwoData: [], // 這個是讀取伺服器傳回來的陣列 level two
      groupLevelThreeData: [], // 這個是讀取伺服器傳回來的陣列 level three
      materialLevelOneClass: [], // 開始就先讀取資料庫的數據
      materialLevelTwoClass: [], // 開始就先讀取資料庫的數據
      materialLevelThreeData: [], // 開始就先讀取資料庫的數據
      allUserNameId: [], // 所有使用者
      levelThreeEditTableData: {}, // 點擊編輯鈕的時候，把資料放到這邊，再送去給子元件
      levelThreeTableData: {
        type: '',
        choiceLevelTwoValue: [],
        name: '',
        imgs: [],
        // 原料成員
        member: [
          {
            material_name: '',
            material_id: ''
          }
        ],
        // 哪個物件使用到這個原料組合
        tag_me: [
          {
            category_name: '',
            category_id: ''
          }
        ],
        describe: '',
        processing_fee: '',
        web_side_name: '',
        date: Date,
        status: {
          activated: false,
          vip: false
        },
        level_two_id: '',
        level_one_id: '',
        last_edit_person: '',
        last_modify_date: new Date()
      },
      // 控制分頁
      my_paginations: {
        page_index: 1, // 位於當前第幾頁
        total: 0, // 總數
        page_size: 10, // 每一頁顯示幾條數據
        page_sizes: [5, 10, 15] // 選擇一頁要顯示多少條
        // layouts: 'total, sizes, prev, pager, next, jumper'
      },
      addLevelOneDialog: {
        show: false,
        title: '新增加第一層的商品分類組合',
        option: 'edit',
        level: 1
      },
      addLevelTwoDialog: {
        show: false,
        title: '建立原料組合',
        option: 'edit',
        level: 2
      },
      addLevelThreeDialog: {
        show: false,
        title: '建立原料組合',
        option: 'edit',
        level: 3
      }
    }
  },
  created() {
    this.getGroupLevelOneData()
    this.getGroupLevelTwoData()
    this.getMaterialLevelOneClass()
    this.getMaterialLevelTwoClass()
    this.getMaterialLevelThreeData()
    this.getUserInfo()
    this.setPaginations()
  },
  mounted() {
    this.setCascaderOptions()
  },
  components: {
    GroupLevelOneDialog,
    GroupLevelTwoDialog,
    GroupLevelThreeDialog
  },

  watch: {
    // 讀取完 level three data / level one class / level two class
    materialLevelThreeData() {
      // console.log('one', this.materialLevelOneClass)
      // console.log('two', this.materialLevelTwoClass)
      // console.log('three', this.materialLevelThreeData)
      if (this.materialLevelTwoClass[0]) {
        this.materialOptions = []
        this.materialLevelOneClass.forEach((item) => {
          // console.log(index, item.name, item._id)
          let obj = {
            value: '',
            label: '',
            children: []
          }
          obj.value = item._id
          obj.label = item.type + ' ' + item.name
          this.materialOptions.push(obj)
        })

        for (let i = 0; i < this.materialOptions.length; i++) {
          const level_one_id = this.materialOptions[i].value
          this.materialLevelTwoClass.forEach((item) => {
            if (item.level_one_id === level_one_id) {
              let obj2 = {
                value: '',
                label: '',
                children: []
              }
              obj2.value = item._id
              obj2.label = item.type + ' ' + item.name
              this.materialOptions[i].children.push(obj2)
            }
          })
          for (let j = 0; j < this.materialOptions[i].children.length; j++) {
            const level_two_id = this.materialOptions[i].children[j].value
            this.materialLevelThreeData.forEach((item) => {
              if (item.level_two_id === level_two_id) {
                let obj3 = {
                  value: '',
                  label: ''
                }
                obj3.value = item._id
                obj3.label = item.type + ' ' + item.product_name
                this.materialOptions[i].children[j].children.push(obj3)
              }
            })
          }
        }
      }
    },
    // 如果 level one 跟 level two 都有資料的時候，就更動 cascader 的聯集選擇器
    groupLevelTwoData() {
      if (this.groupLevelTwoData[0]) {
        this.levelOneTowOption = []
        this.groupLevelOneData.forEach((item) => {
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
          this.groupLevelTwoData.forEach((item) => {
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
      this.getGroupLevelThreeData()
    }
  },
  methods: {
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
    setCascaderOptions() {
      // ，就讀回來上次的紀錄
      if (
        localStorage.choiceGroupLevelTwoValue &&
        localStorage.choiceGroupLevelOneValue
      ) {
        this.choiceLevelTwoValue[0] = localStorage.choiceGroupLevelOneValue
        this.choiceLevelTwoValue[1] = localStorage.choiceGroupLevelTwoValue
      }
    },
    // 當選擇 one / two 時，有變化就會來到這邊
    onOptionsChange(value) {
      // 當分類選擇異動的時候，再重新的撈第三層的商品資料
      localStorage.choiceGroupLevelOneValue = value[0]
      localStorage.choiceGroupLevelTwoValue = value[1]
      this.getGroupLevelThreeData()
    },
    // @emit('update) 來這邊取得第一層的資料
    getGroupLevelOneData() {
      this.$axios
        .get('/api/material-group/one/')
        .then((res) => {
          // 把資料庫的數據都先讀出來
          this.groupLevelOneData = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // @emit('update) 來這邊取得第二層的資料
    getGroupLevelTwoData() {
      this.$axios
        .get('/api/material-group/two/')
        .then((res) => {
          // 把資料庫的數據都先讀出來
          this.groupLevelTwoData = res.data
          // 設置分頁數據 如果是子組件的話，不需要這邊重新整理更新頁面
          // 子組件裡面會有一個 watch 去觀察資料，如果有異動了 setPagination 會在那邊觸發
          // this.setPaginations()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 第三層 @emit('update) 來這邊取得第三層的資料
    getGroupLevelThreeData() {
      if (!this.choiceLevelTwoValue[1]) return
      this.$axios
        .get(`/api/material-group/three/${this.choiceLevelTwoValue[1]}`)
        .then((res) => {
          // 把資料庫的數據都先讀出來
          this.groupLevelThreeData = res.data
          // 設置分頁數據 如果是子組件的話，不需要這邊重新整理更新頁面
          // 子組件裡面會有一個 watch 去觀察資料，如果有異動了 setPagination 會在那邊觸發
          this.setPaginations()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // ******************************* 讀取原物料 第一層，第二層，第三層  cascader *******************************
    getMaterialLevelOneClass() {
      this.$axios
        .get('/api/material-class/one')
        .then((res) => {
          // console.log('views/FundList.vue', res)
          this.materialLevelOneClass = res.data
          // 設置分頁數據
          // this.setPaginations()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getMaterialLevelTwoClass() {
      this.$axios
        .get('/api/material-class/two')
        .then((res) => {
          // console.log('views/FundList.vue', res)
          this.materialLevelTwoClass = res.data
          // 設置分頁數據
          // this.setPaginations()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getMaterialLevelThreeData() {
      this.$axios
        .get('/api/material/three')
        .then((res) => {
          // console.log('views/FundList.vue', res)
          this.materialLevelThreeData = res.data
          // 設置分頁數據
          // this.setPaginations()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    onMaterialOptionsChange(row) {
      // console.log(this.choiceLevelThreeMaterial)
      console.log('onMaterialOptionsChange', row.choice_level_three_material)
    },
    // ******************************* 讀取原物料 第一層，第二層，第三層 cascader 結束*******************************
    // 更新原料清單 - cascader 下面的 更新按鈕
    handleUpdateGroupMember(row) {
      const uploadFormData = {
        level: 3,
        choice_level_three_material: row.choice_level_three_material
      }
      const url = `edit/${row._id}`
      this.$axios
        .post(`/api/material-group/${url}`, uploadFormData)
        .then((res) => {
          // 添加成功
          this.$message({
            message: '更新原料組合成功！',
            type: 'success'
          })
        })
        .catch((err) => {
          console.log('axios添加數據失敗==>materialGroupManager==>', err)
        })
    },

    // 新增第一層
    addGroupLevelOne() {
      this.addLevelOneDialog = {
        show: true,
        title: '新增加第一層的商品分類組合',
        option: 'add',
        level: 1
      }
    },
    // 新增第二層
    addGroupLevelTwo() {
      this.addLevelTwoDialog = {
        show: true,
        title: '新增加第二層的商品分類組合',
        option: 'add',
        level: 2
      }
    },
    // 新增原物料組合 (這邊是空殼)
    addGroupLevelThree() {
      this.addLevelThreeDialog = {
        show: true,
        title: '新增加第三層的商品組合',
        option: 'add'
      }
    },
    // 編輯與刪除 第三層 group member 把選中的 row 資料傳給子元件
    handleEditGroupMember(index, row) {
      this.addLevelThreeDialog = {
        show: true,
        title: '新增加第三層的商品組合',
        option: 'edit'
      }
      this.levelThreeEditTableData = Object.assign({}, row)
    },
    handleDeleteGroupMember() {},
    // 分頁設定 ***************************************************************************
    setPaginations() {
      this.my_paginations.total = this.groupLevelThreeData.length
      this.my_paginations.page_index = 1
      if (localStorage.material_group_page_size) {
        this.my_paginations.page_size = Number(
          localStorage.material_group_page_size
        )
      } else {
        this.my_paginations.page_size = 5
      }
      // 設置分頁數據
      this.tableData = this.groupLevelThreeData.filter((item, index) => {
        return index < this.my_paginations.page_size
      })
    },
    handleSizeChange(page_size) {
      // 切換每頁有幾條數據
      localStorage.material_group_page_size = page_size
      this.my_paginations.page_index = 1
      this.my_paginations.page_size = page_size
      this.tableData = this.groupLevelThreeData.filter((item, index) => {
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
        if (this.groupLevelThreeData[i]) {
          tables.push(this.groupLevelThreeData[i])
        }
        this.tableData = tables
      }
    }
    // 分頁設定結束 ***************************************************************************
  }
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

.pagination {
  text-align: left;
  margin-top: 3px;
}
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

/* 往下拓展表格的 style */
.block {
  width: 1500px;
}
.el-table__expanded-cell[class*='cell'] {
  padding-bottom: 0;
}
.cascader-item {
  margin-bottom: 0px;
}
</style>
