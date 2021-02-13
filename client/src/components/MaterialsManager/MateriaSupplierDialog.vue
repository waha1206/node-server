<template>
  <div class="my-dialog">
    <el-dialog
      width="590px"
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-model="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
    >
      <div class="form">
        <el-container>
          <el-row>
            <el-col :span="24"
              ><div class="grid-content bg-purple-dark">
                <el-table
                  size="mini"
                  :stripe="true"
                  :data="
                    tableData.filter(
                      (data) =>
                        !search ||
                        data.company
                          .toLowerCase()
                          .includes(search.toLowerCase())
                    )
                  "
                  style="width: 100%"
                >
                  <el-table-column
                    label="供應商名稱"
                    prop="company"
                    width="200px"
                  >
                  </el-table-column>
                  <!-- 供應商完整說明 -->
                  <el-table-column label="詳細資料" width="80" align="center">
                    <template slot-scope="scope">
                      <el-popover trigger="hover" placement="right">
                        <p>建檔日期：{{ getDate(scope.row.create_date) }}</p>
                        <p>
                          供應商類別：{{ getSupplierClassNameById(scope.row) }}
                        </p>
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
                  <!-- 供應商完整說明結束 -->
                  <el-table-column
                    label="供應商類別"
                    width="120px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      {{ getSupplierClassNameById(scope.row) }}</template
                    >
                  </el-table-column>
                  <!-- 搜尋列 放在表頭 -->
                  <el-table-column align="center" width="150">
                    <template slot="header" slot-scope="scope">
                      <el-input
                        v-model="search"
                        size="mini"
                        placeholder="請輸入供應商名稱"
                      />
                    </template>

                    <!-- 搜尋列下的選擇按鈕 -->
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="danger"
                        @click="handleChoice(scope.$index, scope.row)"
                        >選擇</el-button
                      >
                    </template>
                    <!-- 選擇按鈕結束 -->
                  </el-table-column>
                  <!-- 搜尋列與選擇按鈕結束 -->
                </el-table>
              </div></el-col
            >
          </el-row>
          <!-- <el-main>Main</el-main> -->
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
        <!-- 分頁結束 -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { MessageBox } from 'element-ui'
export default {
  name: 'material_supplier_dialog',
  props: {
    dialog: Object,
    supplier: Array,
    supplierClassData: Array
  },
  data() {
    return {
      tableData: [],
      formLabelWidth: '',
      search: '',
      my_paginations: {
        page_index: 1, // 位於當前第幾頁
        total: 0, // 總數
        page_size: 10, // 每一頁顯示幾條數據
        page_sizes: [5, 10] // 選擇一頁要顯示多少條
        // layouts: 'total, sizes, prev, pager, next, jumper'
      }
    }
  },

  mounted() {
    // 這邊是一個知識點，要等子元件創建好了之後，父元件通常還沒有遠端讀取好資料，所以要注意
    // 判斷式大概如下：v-if="allSupplierlData[0]"		詳細的說明網頁連結：https://bit.ly/2LCp1CV

    this.setPaginations()
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  methods: {
    setPaginations() {
      // 分頁屬性設置
      this.my_paginations.total = this.supplier.length
      this.my_paginations.page_index = 1
      if (localStorage.material_supplier_page_size) {
        this.my_paginations.page_size = Number(
          localStorage.material_supplier_page_size
        )
      } else {
        this.my_paginations.page_size = 5
      }
      // 設置分頁數據
      this.tableData = this.supplier.filter((item, index) => {
        return index < this.my_paginations.page_size
      })
    },
    // 分頁操作
    handleSizeChange(page_size) {
      // 切換每頁有幾條數據
      localStorage.material_supplier_page_size = page_size
      this.my_paginations.page_index = 1
      this.my_paginations.page_size = page_size
      this.tableData = this.supplier.filter((item, index) => {
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
        if (this.supplier[i]) {
          tables.push(this.supplier[i])
        }
        this.tableData = tables
      }
    },
    // 時間轉換
    getDate(dt) {
      return this.$moment(dt).format('YYYY年MM月DD日-HH：mm')
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
    handleAdd(form) {
      this.dialog.option = 'add'
      this.onSubmit(form)
    },
    handleChoice(index, row) {
      // 按選擇之後，要把 供應商的 _id 存到 matail 的 supplier_id 的欄位裡面，如果成功就關掉這個 dialog
      // 再來要通知父元件刷新頁面 this.$emit('update')
      // this.dialog.material_id 這個是選擇的 materila 的 id

      let updateSupplierData = {}
      updateSupplierData._id = this.dialog.material
      updateSupplierData.supplier_id = row._id

      const url =
        this.dialog.option == 'add' ? 'add' : `edit/${this.dialog.material}`

      this.$axios
        .post(`/api/material/${url}`, updateSupplierData)
        .then((res) => {
          // 添加成功
          this.$message({
            message: '數據添加成功',
            type: 'success'
          })
          // 隱藏 MyDialog
          this.dialog.show = false
          // 刷新網頁，傳遞給父組件做更新
          this.$emit('update')
        })
        .catch((err) => {
          console.log('axios添加數據失敗==>MyDialog.vue==>', err)
        })
    },
    handleDelete(row) {
      if (row._id === '5ff4078d3b32f548ecebff25') return
      MessageBox.confirm(
        '注意！資料刪除會不可挽回！請確認此資料無其他應用！',
        '嚴重警告！！！'
      )
        .then(() => {
          this.$axios
            .delete(`/api/material-class/delete/${row._id}`)
            .then((res) => {
              this.$message('刪除成功！')
              this.$emit('update')
            })
        })
        .catch(() => {
          this.$message('您取消刪除了～鬆一口氣')
        })
    },
    // 新增商品類別代號
    onSubmit(form) {
      const uploadFormData =
        this.dialog.option == 'add' ? this.formData : this.materialClassEditForm
      this.$refs[form].validate((valid) => {
        if (valid && !uploadFormData.type == '') {
          const url =
            this.dialog.option == 'add'
              ? 'add'
              : `edit/${this.materialClassEditForm._id}`

          this.$axios
            .post(`/api/material-class/${url}`, uploadFormData)
            .then((res) => {
              // 添加成功
              this.$message({
                message: '數據添加成功',
                type: 'success'
              })
              // 不管怎麼樣都隱藏 edit dialog 的視窗
              this.categoriesEditDialog = false
              // this.dialog.show = false
              // 刷新網頁，傳遞給父組件做更新
              this.$emit('update')
            })
            .catch((err) => {
              console.log('axios添加數據失敗==>MyDialog.vue==>', err)
            })
        }
      })
    }
  }
}
</script>

<style scoped>
.lefe-side {
  border-right: 1px solid gray;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.table-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
}
.bg-purple-dark {
  background: #99a9bf;
}
.pagination {
  text-align: left;
  margin-top: 10px;
}
</style>
