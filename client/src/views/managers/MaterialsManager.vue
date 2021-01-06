<template>
  <div class="materials-manager">
    <el-container>
      <el-header>
        <el-button type="primary" size="small" @click="addMaterialClass"
          >新增原物料分類</el-button
        >
        <el-button type="primary" size="small" @click="handleAddMaterial"
          >新增原物料</el-button
        >
        <div class="materal-class-container">
          <el-select
            v-model="materialClassName"
            @change="handleMaterialClassChange"
            filterable
            size="mini"
            placeholder="可以透過關鍵字搜尋"
          >
            <!-- 我的理解 option 裡面的 :value 所綁定的值，會往上傳遞到 el-select 裡面的 v-model="data return 裡面設定的變數名稱" -->
            <el-option
              v-for="item in materialClassData"
              :key="item.type"
              :label="item.name"
              :value="item._id"
            >
            </el-option>
          </el-select>
        </div>
        <!-- {{ materialClassName }} -->
      </el-header>
      <el-container>
        <!-- <el-aside width="100%"> -->
        <el-table
          size="mini"
          :stripe="true"
          :data="
            tableData.filter(
              (data) =>
                !search ||
                data.product_name.toLowerCase().includes(search.toLowerCase())
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
          <!-- 原物料名稱 -->
          <el-table-column
            label="原物料名稱"
            prop="product_name"
            align="left"
            width="350"
          >
          </el-table-column>
          <!-- 商品說明 -->
          <!-- 說明跳出來對話框的區塊 -->
          <el-table-column label="說明" width="70" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>分類：{{ getMaterilaClassNameById(scope.row) }}</p>
                <p>品名：{{ scope.row.product_name }}</p>
                <p>成本：{{ scope.row.the_cost }}</p>
                <p>售價：{{ scope.row.retail_price }}</p>
                <p>單價：{{ scope.row.unit_price }}</p>
                <p>利潤：{{ scope.row.company_profit }}</p>
                <p>庫存：{{ scope.row.storage }}</p>
                <p>材質：{{ scope.row.raw_material }}</p>
                <p>單位：{{ scope.row.unit }}</p>
                <p>供應商：{{ scope.row.supplier }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">完整說明</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <!-- 圖片 -->
          <el-table-column label="圖片" width="50" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">圖片</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <!-- 顏色 -->
          <el-table-column
            label="顏色"
            prop="product_color"
            align="center"
            width="70"
          >
          </el-table-column>
          <!-- 原物料分類，從分類ID回傳分類名稱 -->
          <el-table-column label="分類" align="center" width="120">
            <template slot-scope="scope">
              {{ getMaterilaClassNameById(scope.row) }}
            </template>
          </el-table-column>
          <!-- 售價 -->
          <el-table-column
            label="售價"
            prop="retail_price"
            align="center"
            width="70"
          >
          </el-table-column>
          <!-- 單位售價 -->
          <el-table-column
            label="單位售價"
            prop="unit_price"
            align="center"
            width="70"
          >
          </el-table-column>
          <!-- 目前庫存 -->
          <el-table-column
            label="目前庫存"
            prop="storage"
            align="center"
            width="80"
          >
          </el-table-column>
          <!-- 最低庫存 -->
          <el-table-column
            label="最低庫存"
            prop="stock_alert"
            align="center"
            width="80"
          >
          </el-table-column>
          <!-- 訂購天數 -->
          <el-table-column
            label="訂購天數"
            prop="lead_time"
            align="center"
            width="80"
          >
          </el-table-column>
          <!-- 商品材質 -->
          <el-table-column
            label="商品材質"
            prop="raw_material"
            align="center"
            width="150"
          >
          </el-table-column>
          <!-- 供應商資料 -->
          <el-table-column label="供應商" width="200" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>姓名: {{ scope.row.name }}</p>
                <p>住址: {{ scope.row.address }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag
                    size="mini"
                    v-if="scope.row.supplier"
                    @click="handleEditSupplier(scope.$index, scope.row)"
                  >
                    {{ scope.row.supplier }}
                  </el-tag>
                  <el-tag
                    size="mini"
                    v-else="scope.row.supplier"
                    @click="handleEditSupplier(scope.$index, scope.row)"
                    style="background:red; color:yellow"
                    >點擊我選擇供應商</el-tag
                  >
                </div>
              </el-popover>
            </template>
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

        <!-- </el-aside> -->

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
    <MaterialClassDialog
      :dialog="dialog"
      :formData="formData"
      :materialClassData="materialClassData"
      @update="getMaterialClass"
    ></MaterialClassDialog>
    <MaterialEditDialog
      :dialog="materialEditDialog"
      :formData="materilaFormDate"
      :materialClassData="materialClassData"
      :allUserNameId="allUserNameId"
      @update="getMaterials"
    ></MaterialEditDialog>
  </div>
</template>

<script>
import MaterialClassDialog from '../../components/MaterialsManager/MaterialClassDialog'
import MaterialEditDialog from '../../components/MaterialsManager/MaterialEditDialog'
import { MessageBox } from 'element-ui'

export default {
  name: 'materials-manager',
  data() {
    return {
      materialClassName: '',
      tableData: [],
      materialClassData: [],
      allMaterialData: [],
      allUserNameId: [],
      search: '',
      innerDialog: false,
      materialsData: [], // 開始就先讀取資料庫的數據
      materilaFormDate: {
        old_serial_numbers: '',
        product_name: '',
        unit_price: '',
        company_profit: '',
        unit: '',
        product_category: '',
        the_cost: '',
        retail_price: '',
        product_profit: '',
        product_description: '',
        storage: '',
        product_color: '',
        various_elements: '',
        length: '',
        extra_freight: '',
        lead_time: '',
        raw_material: '',
        minimum_order_quantity: '',
        supplier: '',
        supplier_contact_person: '',
        supplier_phone_number: '',
        supplier_fax_number: '',
        supplier_cell_phone: '',
        supplier_address: '',
        supplier_email: '',
        remark: '',
        supplier_bank_information: '',
        product_website: '',
        supplier_number: '',
        product_picture_website: '',
        create_date: '',
        last_archive_person: '',
        last_edit_person: '',
        stock_alert: ''
      },
      // 編輯原物料的分類跳出視窗
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
      },
      // 編輯原物料的跳出視窗
      materialEditDialog: {
        show: false,
        title: '展示一下',
        option: 'edit',
        materialClass: ''
      },
      my_paginations: {
        page_index: 1, // 位於當前第幾頁
        total: 0, // 總數
        page_size: 10, // 每一頁顯示幾條數據
        page_sizes: [5, 10, 15] // 選擇一頁要顯示多少條
        // layouts: 'total, sizes, prev, pager, next, jumper'
      }
    }
  },
  components: {
    MaterialClassDialog,
    MaterialEditDialog
  },
  created() {
    this.getMaterials()
    this.getMaterialClass()
    this.getUserInfo()
  },
  methods: {
    handleMaterialClassChange(value) {
      localStorage.material_class = value
      this.getMaterials()
    },
    handleSizeChange(page_size) {
      // 切換每頁有幾條數據

      localStorage.material_page_size = page_size
      this.my_paginations.page_index = 1
      this.my_paginations.page_size = page_size
      this.tableData = this.allMaterialData.filter((item, index) => {
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
        if (this.allMaterialData[i]) {
          tables.push(this.allMaterialData[i])
        }
        this.tableData = tables
      }
    },
    handleAddMaterial(index, row) {
      this.materialEditDialog = {
        show: true,
        title: '原物料編輯',
        option: 'add',
        materialClass: ''
      }
      // 把選中的原物料資訊 賦值到 this.materialFormData 裡面去
      // 先清空
      for (let prop in this.materilaFormDate) {
        this.materilaFormDate[prop] = ''
      }
    },
    handleEditSupplier(index, row) {
      console.log('重新選擇供應商')
    },
    handleEditMaterial(index, row) {
      this.materialEditDialog = {
        show: true,
        title: '原物料編輯',
        option: 'edit',
        materialClass: this.getMaterilaClassNameById(row)
      }
      // 把選中的原物料資訊 賦值到 this.materialFormData 裡面去
      // 先清空
      for (let prop in this.materilaFormDate) {
        this.materilaFormDate[prop] = ''
      }
      // 再把點擊到的 row 的資料複製過去
      for (let prop in row) {
        this.materilaFormDate[prop] = row[prop]
      }
    },
    handleDeleteMaterial(index, row) {
      console.log(index, row)
    },
    getMaterialClass() {
      this.$axios
        .get('/api/material-class')
        .then((res) => {
          // console.log('views/FundList.vue', res)
          this.materialClassData = res.data
          // 設置分頁數據
          // this.setPaginations()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getMaterials() {
      // 	第一次進來，要是沒有找到 localStorage.material_class 就會全讀資料庫
      // 如果有紀錄的話，就會只讀紀錄部分的分類商品
      if (localStorage.material_class) {
        // 如果一進來這個 元件 的時候發現有紀錄 原料分類，就先把它放進去 select 中
        this.materialClassName = localStorage.material_class
        // const url = `get-from-class/${this.localStorage.material_class}`
        this.$axios
          .get(`/api/material/get-from-class/${localStorage.material_class}`)
          .then((res) => {
            this.allMaterialData = res.data
            this.tableData = res.data

            this.setPaginations()
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        // 撈整個資料庫所有的原物料資料
        this.$axios
          .get('/api/material')
          .then((res) => {
            // console.log('views/FundList.vue', res)
            this.allMaterialData = res.data
            // 設置分頁數據
            this.setPaginations()
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    setPaginations() {
      // 分頁屬性設置
      this.my_paginations.total = this.allMaterialData.length
      this.my_paginations.page_index = 1
      if (localStorage.material_page_size) {
        this.my_paginations.page_size = Number(localStorage.material_page_size)
      } else {
        this.my_paginations.page_size = 5
      }
      // 設置分頁數據
      this.tableData = this.allMaterialData.filter((item, index) => {
        return index < this.my_paginations.page_size
      })
    },
    // 添加一筆新的商品分類代號 TD SS GG ... 等等
    addMaterialClass() {
      this.dialog = {
        show: true,
        title: '新增原物料分類',
        option: 'add'
      }
    },
    getMaterilaClassNameById(row) {
      let className = ''
      this.materialClassData.forEach((e) => {
        if (e._id === row.material_class) {
          className = e.name
        }
      })
      return className
    },
    getUserInfo() {
      this.$axios
        .get('/api/user/user-info')
        .then((res) => {
          this.allUserNameId = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    }
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
  margin-top: 10px;
}
.materal-class-container {
  display: inline-block;
  margin-left: 10px;
}
</style>
