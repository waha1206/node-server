<template>
  <div class="materials-manager">
    <el-container>
      <el-header>
        <el-button type="primary" size="small" @click="handleAddSupplierClass"
          >新增供應商分類</el-button
        >
        <el-button type="primary" size="small" @click="handleAddSupplier"
          >新增供應商</el-button
        >
        <div class="materal-class-container">
          <el-select
            v-model="supplierClassName"
            @change="handleMaterialClassChange"
            filterable
            size="mini"
            placeholder="可以透過關鍵字搜尋"
          >
            <!-- 我的理解 option 裡面的 :value 所綁定的值，會往上傳遞到 el-select 裡面的 v-model="data return 裡面設定的變數名稱" -->
            <el-option
              v-for="item in supplierClassData"
              :key="item.type"
              :label="item.name"
              :value="item._id"
            >
            </el-option>
          </el-select>
        </div>
        <!-- {{ supplierClassName }} -->
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
      <el-container>
        <!-- <el-aside width="100%"> -->
        <el-table
          size="mini"
          :stripe="true"
          :data="
            tableData.filter(
              (data) =>
                !search ||
                data.company.toLowerCase().includes(search.toLowerCase())
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
          <!-- 供應商公司抬頭 -->
          <el-table-column
            label="供應商公司抬頭"
            prop="company"
            align="left"
            width="180"
          >
          </el-table-column>
          <!-- 統編 -->
          <el-table-column
            label="統編"
            prop="tax_id_number"
            align="center"
            width="70"
          >
          </el-table-column>
          <!-- 分類 -->
          <el-table-column label="分類" align="center" width="120">
            <template slot-scope="scope">
              {{ getSupplierClassNameById(scope.row) }}
            </template>
          </el-table-column>
          <!-- 商品說明 -->
          <!-- 說明跳出來對話框的區塊 -->
          <el-table-column label="詳細資料" width="70" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="right">
                <p>建檔日期：{{ getDate(scope.row.create_date) }}</p>
                <p>供應商類別：{{ getSupplierClassNameById(scope.row) }}</p>
                <p>公司名稱：{{ scope.row.company }}</p>
                <p>公司統編：{{ scope.row.tax_id_number }}</p>
                <p>資本額：{{ scope.row.registered_capital }}</p>
                <p>匯款帳號：{{ scope.row.bank_account }}</p>
                <p>業務姓名：{{ scope.row.sales_name }}</p>
                <p>業務手機：{{ scope.row.sales_cell_phone }}</p>
                <p>業務電話：{{ scope.row.sales_telephone }}</p>
                <p>業務MAIL：{{ scope.row.sales_email }}</p>
                <p>會計姓名：{{ scope.row.accounting_name }}</p>
                <p>會計手機：{{ scope.row.accounting_cell_phone }}</p>
                <p>會計電話：{{ scope.row.accounting_telephone }}</p>
                <p>會計MAIL：{{ scope.row.accounting_mail }}</p>
                <p>公司電話：{{ scope.row.company_telephone }}</p>
                <p>公司傳真：{{ scope.row.company_fax }}</p>
                <p>公司地址：{{ scope.row.company_address }}</p>
                <p>店面電話：{{ scope.row.storefront_telephone }}</p>
                <p>店面傳真：{{ scope.row.storefront_fax }}</p>
                <p>店面地址：{{ scope.row.storefront_address }}</p>
                <p>
                  官網：<a :href="scope.row.website" target="_blank">{{
                    scope.row.website
                  }}</a>
                </p>
                <p>付款條件：{{ scope.row.payment_terms }}</p>
                <p>商品交期：{{ scope.row.delivery }}</p>
                <p>廠長備註：{{ scope.row.remarks }}</p>
                <p>會計備註：{{ scope.row.accounting_remarks }}</p>

                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">完整說明</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>

          <!-- 匯款帳號 -->
          <el-table-column
            label="匯款帳號"
            prop="bank_account"
            align="center"
            width="140"
          >
          </el-table-column>
          <!-- 原物料分類，從分類ID回傳分類名稱 -->
          <!-- <el-table-column label="分類" align="center" width="120">
            <template slot-scope="scope">
              {{ getSupplierClassNameById(scope.row) }}
            </template>
          </el-table-column> -->
          <!-- 業務名稱 -->
          <el-table-column
            label="業務名稱"
            prop="sales_name"
            align="center"
            width="90"
          >
          </el-table-column>
          <!-- 業務手機 -->
          <el-table-column
            label="業務電話"
            prop="sales_cell_phone"
            align="center"
            width="100"
          >
          </el-table-column>
          <!-- 業務分機 -->
          <el-table-column
            label="業務分機"
            prop="sales_telephone"
            align="center"
            width="110"
          >
          </el-table-column>
          <!-- 公司地址 -->
          <el-table-column
            label="公司地址"
            prop="company_address"
            align="center"
            width="320"
          >
          </el-table-column>
          <!-- 付款條件 -->
          <el-table-column
            label="訂購天數"
            prop="payment_terms"
            align="center"
            width="100"
          >
          </el-table-column>
          <!-- 訂貨交期 -->
          <el-table-column
            label="訂貨交期"
            prop="delivery"
            align="center"
            width="150"
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

        <!-- </el-aside> -->

        <!-- <el-main>Main</el-main> -->
      </el-container>
    </el-container>
    <SupplierClassDialog
      v-if="supplierClassData[0]"
      :dialog="addSupplierClassDialog"
      :formData="formData"
      :supplierClassData="supplierClassData"
      @update="getSupplierClass"
    ></SupplierClassDialog>
    <SupplierEditDialog
      :dialog="supplierEditDialog"
      :formData="supplierFormDate"
      :supplierClassData="supplierClassData"
      :allUserNameId="allUserNameId"
      @update="getSuppliers"
    ></SupplierEditDialog>
  </div>
</template>

<script>
import SupplierClassDialog from '../../components/SuppliersManager/SupplierClassDialog'
import SupplierEditDialog from '../../components/SuppliersManager/SupplierEditDialog'
import { MessageBox } from 'element-ui'

export default {
  name: 'suppliers-manager',
  data() {
    return {
      supplierClassName: '',
      tableData: [],
      supplierClassData: [],
      allSupplierlData: [],
      allUserNameId: [],
      search: '',
      innerDialog: false,
      materialsData: [], // 開始就先讀取資料庫的數據
      supplierFormDate: {
        supplier_class: '',
        company: '',
        tax_id_number: '',
        registered_capital: '',
        bank_account: '',
        sales_name: '',
        sales_cell_phone: '',
        sales_telephone: '',
        sales_email: '',
        accounting_name: '',
        accounting_cell_phone: '',
        accounting_telephone: '',
        accounting_mail: '',
        company_telephone: '',
        company_fax: '',
        company_address: '',
        storefront_telephone: '',
        storefront_fax: '',
        storefront_address: '',
        website: '',
        payment_terms: '',
        major_products: '',
        delivery: '',
        remarks: '',
        last_edit_person: '',
        last_modify_date: ''
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
      // 新增供應商類別的控制物件
      addSupplierClassDialog: {
        show: false,
        title: '展示一下',
        option: 'edit'
      },
      // 讀取所有 supplier class 紀錄後傳到 SupplierClassDialog 元件，prop 的屬性
      supplierClassFormData: {},

      // 編輯原物料的跳出視窗
      supplierEditDialog: {
        show: false,
        title: '展示一下',
        option: 'edit',
        supplierClass: ''
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
    SupplierClassDialog,
    SupplierEditDialog
  },
  created() {
    this.getSuppliers()
    this.getSupplierClass()
    this.getUserInfo()
  },
  methods: {
    // 時間轉換
    getDate(dt) {
      return this.$moment(dt).format('YYYY年MM月DD日-HH：mm')
    },
    handleMaterialClassChange(value) {
      localStorage.supplier_class = value
      this.getSuppliers()
    },
    // 分頁
    handleSizeChange(page_size) {
      // 切換每頁有幾條數據
      localStorage.supplier_page_size = page_size
      this.my_paginations.page_index = 1
      this.my_paginations.page_size = page_size
      this.tableData = this.allSupplierlData.filter((item, index) => {
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
        if (this.allSupplierlData[i]) {
          tables.push(this.allSupplierlData[i])
        }
        this.tableData = tables
      }
    },
    handleAddSupplier(index, row) {
      this.supplierEditDialog = {
        show: true,
        title: '新增供應商',
        option: 'add',
        supplierClass: ''
      }
      // 把選中的原物料資訊 賦值到 this.materialFormData 裡面去
      // 先清空
      for (let prop in this.supplierFormDate) {
        this.supplierFormDate[prop] = ''
      }
    },
    handleEditSupplier(index, row) {
      console.log('重新選擇供應商')
    },
    handleEditMaterial(index, row) {
      this.supplierEditDialog = {
        show: true,
        title: '原物料編輯',
        option: 'edit',
        supplierClass: this.getSupplierClassNameById(row)
      }
      // 把選中的原物料資訊 賦值到 this.materialFormData 裡面去
      // 先清空
      for (let prop in this.supplierFormDate) {
        this.supplierFormDate[prop] = ''
      }
      // 再把點擊到的 row 的資料複製過去
      for (let prop in row) {
        this.supplierFormDate[prop] = row[prop]
      }
    },
    handleDeleteMaterial(index, row) {
      console.log(index, row)
    },
    getSupplierClass() {
      this.$axios
        .get('/api/supplier-class')
        .then((res) => {
          // console.log('views/FundList.vue', res)
          this.supplierClassData = res.data
          // 設置分頁數據
          // this.setPaginations()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getSuppliers() {
      // 	第一次進來，要是沒有找到 localStorage.supplier_class 就會全讀資料庫
      // 如果有紀錄的話，就會只讀紀錄部分的分類商品
      if (localStorage.supplier_class) {
        // 如果一進來這個 元件 的時候發現有紀錄 原料分類，就先把它放進去 select 中
        this.supplierClassName = localStorage.supplier_class
        // const url = `get-from-class/${this.localStorage.supplier_class}`
        this.$axios
          .get(`/api/supplier/get-from-class/${localStorage.supplier_class}`)
          .then((res) => {
            this.allSupplierlData = res.data
            // this.tableData = res.data

            this.setPaginations()
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        // 撈整個資料庫所有的原物料資料
        this.$axios
          .get('/api/supplier')
          .then((res) => {
            // console.log('views/FundList.vue', res)
            this.allSupplierlData = res.data
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
      this.my_paginations.total = this.allSupplierlData.length
      this.my_paginations.page_index = 1
      if (localStorage.supplier_page_size) {
        this.my_paginations.page_size = Number(localStorage.supplier_page_size)
      } else {
        this.my_paginations.page_size = 5
      }
      // 設置分頁數據
      this.tableData = this.allSupplierlData.filter((item, index) => {
        return index < this.my_paginations.page_size
      })
    },
    // 添加一筆新的商品分類代號 TD SS GG ... 等等
    handleAddSupplierClass() {
      this.addSupplierClassDialog = {
        show: true,
        title: '新增供應商分類',
        option: 'add'
      }
    },
    getSupplierClassNameById(row) {
      let className = ''
      this.supplierClassData.forEach((e) => {
        if (e._id === row.supplier_class) {
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
  margin-top: 3px;
}
.materal-class-container {
  display: inline-block;
  margin-left: 10px;
}
</style>
