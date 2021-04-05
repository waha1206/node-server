<template>
  <div class="customer-manager">
    <el-container>
      <el-header>
        <div class="select-class-wrap">
          <el-select
            @change="customerClassChange"
            v-model="customerClass"
            placeholder="請選擇客戶分類"
            filterable
            size="mini"
          >
            <!-- :lable 這個是顯示出來的  :value 這個要指定到 _id 因為我要存到資料庫，我需要唯一的一個 key (_id)-->
            <el-option
              v-for="(item, index) in customerClassData"
              :key="index"
              :value="item._id"
              :label="item.name"
            ></el-option>
          </el-select>
        </div>
        <el-button type="primary" size="small" @click="addCustomerTitle"
          >新增客戶職務</el-button
        >
        <el-button type="primary" size="small" @click="addCustomerClass"
          >新增客戶分類</el-button
        >
        <el-button type="primary" size="small" @click="addCustomer"
          >新增客戶資料</el-button
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
        <el-main>
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
            <!-- 客戶名稱 -->
            <el-table-column
              prop="company"
              label="客戶名稱"
              align="left"
              width="250"
            ></el-table-column>
            <!-- 客戶名稱 -->
            <el-table-column
              prop="contact_person_name"
              label="聯絡人"
              align="center"
              width="100"
            ></el-table-column>
            <!-- 完整資料 -->
            <el-table-column label="說明" align="center" width="80">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="right">
                  <p>客戶名稱：{{ scope.row.company }}</p>
                  <p>統一編號：{{ scope.row.tax_id_number }}</p>
                  <p>
                    發票地址：{{ scope.row.invoice_postal
                    }}{{ scope.row.invoice_address }}
                  </p>
                  <p>
                    樣品地址：{{ scope.row.sample_postal
                    }}{{ scope.row.sample_address }}
                  </p>
                  <p>
                    倉庫地址：{{ scope.row.goods_postal
                    }}{{ scope.row.goods_address }}
                  </p>
                  <p>聯絡人姓名：{{ scope.row.contact_person_name }}</p>
                  <p>聯絡人市電：{{ scope.row.contact_person_telephone }}</p>
                  <p>聯絡人手機：{{ scope.row.contact_person_cell_phone }}</p>
                  <p>聯絡人信箱：{{ scope.row.contact_person_email }}</p>
                  <p>
                    聯絡人職務：{{
                      getCustomerTitle(scope.row.contact_person_title)
                    }}
                  </p>
                  <p>
                    官方網址<a :href="scope.row.website" target="_blank">{{
                      scope.row.website
                    }}</a>
                  </p>
                  <p>
                    facebook：<a :href="scope.row.facebook" target="_blank">{{
                      scope.row.facebook
                    }}</a>
                  </p>
                  <p>
                    pinkoi：<a :href="scope.row.pinkoi" target="_blank">{{
                      scope.row.pinkoi
                    }}</a>
                  </p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="mini">完整說明</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <!-- 啟用或禁用 -->
            <el-table-column prop="" label="啟用？" align="center" width="80">
              <template slot-scope="scope">
                <span
                  v-if="scope.row.activated == 1"
                  style="background:blue;color:yellow;line-height:20px;height:20px;width:40px;display:inline-block"
                  >啟用</span
                >
                <span
                  v-else
                  style="background:red;color:yellow;line-height:20px;height:20px;width:40px;display:inline-block"
                  >禁用</span
                >
              </template>
            </el-table-column>
            <!-- 發票類型 -->
            <el-table-column prop="" label="發票" align="center" width="80">
              <template slot-scope="scope">
                <el-tag size="mini" v-if="scope.row.invoice_type">{{
                  getInvoiceType(scope.row.invoice_type)
                }}</el-tag>
                <span v-else></span>
              </template>
            </el-table-column>
            <!-- 款項票期 -->
            <el-table-column
              prop=""
              label="款項票期"
              align="center"
              width="145"
            >
              <template slot-scope="scope">
                <el-tag size="mini" v-if="scope.row.payment_date">{{
                  getPaymentDate(scope.row.payment_date)
                }}</el-tag>
                <span v-else></span>
              </template>
            </el-table-column>
            <!-- 付款方式 -->
            <el-table-column prop="" label="付款方式" align="center" width="90">
              <template slot-scope="scope">
                <el-tag size="mini" v-if="scope.row.payment">
                  {{ getPayment(scope.row.payment) }}
                </el-tag>
                <span v-else></span>
              </template>
            </el-table-column>
            <!-- 樣品配送 -->
            <el-table-column prop="" label="樣品配送" align="center" width="90">
              <template slot-scope="scope">
                <el-tag size="mini" v-if="scope.row.sample_delivery">
                  {{ getDelivery(scope.row.sample_delivery) }}
                </el-tag>
                <span v-else></span>
              </template>
            </el-table-column>
            <!-- 大貨配送 -->
            <el-table-column prop="" label="大貨配送" align="center" width="90">
              <template slot-scope="scope">
                <el-tag size="mini" v-if="scope.row.goods_delivery">
                  {{ getDelivery(scope.row.goods_delivery) }}
                </el-tag>
                <span v-else></span>
              </template>
            </el-table-column>
            <!-- 每件加收 -->
            <el-table-column prop="" label="每件加收" align="center" width="90">
              <template slot-scope="scope">
                <el-tag size="mini" v-if="scope.row.goods_delivery">
                  {{ scope.row.delivery_charge_fee }} 元
                </el-tag>
                <span v-else></span>
              </template>
            </el-table-column>
            <!-- 客戶等級 -->
            <el-table-column prop="" label="客戶等級" align="center" width="90">
              <template slot-scope="scope">
                <el-tag size="mini" v-if="scope.row.level">
                  {{ getCustomerLevel(scope.row.level) }}
                </el-tag>
                <span v-else></span>
              </template>
            </el-table-column>
            <!-- 平均每月業績 -->
            <el-table-column
              prop=""
              label="平均每月業績"
              align="center"
              width="110"
            >
              <template slot-scope="scope">
                <span>每個月平均下單</span>
              </template>
            </el-table-column>
            <!-- 累積訂購金額 -->
            <el-table-column
              prop=""
              label="累積訂購金額"
              align="center"
              width="110"
            >
              <template slot-scope="scope">
                <span>1,000,000</span>
              </template>
            </el-table-column>
            <!-- 最近一筆訂單 -->
            <el-table-column
              prop=""
              label="最近一筆訂單"
              align="center"
              width="110"
            >
              <template slot-scope="scope">
                <span>20210315A0001</span>
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
                <el-button size="mini" @click="handleEditCustomer(scope.row)"
                  >編輯</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDeleteCustomer(scope.$index, scope.row)"
                  >刪除</el-button
                >
              </template>
            </el-table-column>
          </el-table>

          <!-- </el-aside> -->
        </el-main>
      </el-container>
    </el-container>

    <!-- 子元件 -->
    <CustomerTitleDialog
      :dialog="addTitleDialog"
      :customerTitleData="customerTitleData"
      @update="getServerData"
    ></CustomerTitleDialog>
    <CustomerClassDialog
      :dialog="addClassDialog"
      :customerClassData="customerClassData"
      @update="getServerData"
    ></CustomerClassDialog>
    <CustomerDialog
      :dialog="addCustomerDialog"
      :customerClassData="customerClassData"
      :customerTitleData="customerTitleData"
      @update="getCustomerData"
    >
    </CustomerDialog>
    <!-- 子元件結束 -->
  </div>
</template>

<script>
import CustomerClassDialog from '../../components/CustomerManager/CustomerClassDialog'
import CustomerDialog from '../../components/CustomerManager/CustomerDialog'
import CustomerTitleDialog from '../../components/CustomerManager/CustomerTitleDialog'

export default {
  name: 'customer-manager',
  data() {
    return {
      // table 需要的搜尋欄位
      search: '',
      // 選擇客戶的分類，然後去伺服器要資料
      customerClass: '',
      // 客戶分類資料
      customerClassData: [],
      // 客戶職務的資料
      customerTitleData: [],
      tableData: [],
      customersData: [],
      // 控制分頁
      my_paginations: {
        localStorage_page_size: 'customer_manager_page_size',
        page_index: 1, // 位於當前第幾頁
        total: 0, // 總數
        page_size: 10, // 每一頁顯示幾條數據
        page_sizes: [5, 10, 15] // 選擇一頁要顯示多少條
        // layouts: 'total, sizes, prev, pager, next, jumper'
      },
      addTitleDialog: {
        show: false,
        title: '新增客戶類型',
        option: 'edit',
        dataType: 'title'
      },
      addClassDialog: {
        show: false,
        title: '新增客戶類型',
        option: 'edit',
        dataType: 'class'
      },
      addCustomerDialog: {
        show: false,
        title: '新增客戶資料',
        editData: {},
        option: 'edit',
        data: {}
      },
      // 存處這個元件的所有 localStorage 的設定
      setLocalStorage: {
        customerClass: 'customer_class'
      },
      // customerFormData
      customerFormData: {}
    }
  },
  created() {
    this.getServerData(this.addClassDialog.dataType)
    this.getServerData(this.addTitleDialog.dataType)
    this.getCustomerData()
  },
  components: {
    CustomerClassDialog,
    CustomerDialog,
    CustomerTitleDialog
    // GroupLevelThreeDialog
  },
  methods: {
    // 客戶等級
    getCustomerLevel(level) {
      if (level === 'undefined') return
      const customerLevel = ['VIP', '潛力', '正常', '觀察名單', '拒絕往來']
      return customerLevel[Number(level) - 1]
    },
    // 貨運方式
    getDelivery(type) {
      if (type === 'undefined') return
      const deliveryClass = ['郵局', '新航', '順豐', '全家', '7-11', '自取']
      return deliveryClass[Number(type) - 1]
    },
    // 付款方式
    getPayment(type) {
      if (type === 'undefined') return
      const paymentClass = ['現金', '國內轉帳', 'paypal', '載具支付', '支票']
      return paymentClass[Number(type) - 1]
    },
    // 款項票期
    getPaymentDate(type) {
      if (type === 'undefined') return
      const paymentDateClass = [
        '30%訂金，出貨前結清',
        '貨到付款',
        '月結30天',
        '月結45天',
        '其它'
      ]
      return paymentDateClass[Number(type) - 1]
    },
    // 取得發票的類型
    getInvoiceType(type) {
      if (type === 'undefined') return
      const invoiceClass = [
        '二聯發票',
        '三聯發票',
        '電子發票',
        '其它',
        '國外地區'
      ]
      return invoiceClass[Number(type) - 1]
    },
    // 取得職務名稱
    getCustomerTitle(titleId) {
      if (titleId === 'undefined') return
      let name = ''
      this.customerTitleData.forEach((item) => {
        if (item._id == titleId) name = item.name
      })
      return name
    },
    // 當選擇客戶類別的元件變動時
    customerClassChange(customerClass) {
      localStorage[this.setLocalStorage.customerClass] = customerClass
    },
    // 新增客戶類別
    addCustomerClass() {
      this.addClassDialog = {
        show: true,
        title: '新增加客戶類型',
        dataType: 'class',
        option: 'add'
      }
    },
    // 新增客戶資料
    addCustomer() {
      this.addCustomerDialog = {
        show: true,
        title: '新增客戶資料',
        option: 'add'
      }
    },
    // 新增客戶職務類別
    addCustomerTitle() {
      this.addTitleDialog = {
        show: true,
        title: '新增客戶的職務選項',
        dataType: 'title',
        option: 'add',
        data: {}
      }
    },
    // 分頁設定
    setPaginations() {
      this.my_paginations.total = this.customersData.length
      this.my_paginations.page_index = 1
      if (localStorage[this.my_paginations.localStorage_page_size]) {
        this.my_paginations.page_size = Number(
          localStorage[this.my_paginations.localStorage_page_size]
        )
      } else {
        this.my_paginations.page_size = 5
      }
      // 設置分頁數據
      this.tableData = this.customersData.filter((item, index) => {
        return index < this.my_paginations.page_size
      })
    },
    handleSizeChange(page_size) {
      // 切換每頁有幾條數據
      localStorage[this.my_paginations.localStorage_page_size] = page_size
      this.my_paginations.page_index = 1
      this.my_paginations.page_size = page_size
      this.tableData = this.customersData.filter((item, index) => {
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
        if (this.customersData[i]) {
          tables.push(this.customersData[i])
        }
        this.tableData = tables
      }
    }, // 分頁設定結束

    // 編輯 客戶資料
    handleEditCustomer(row) {
      console.log('handleEditCustomer', row)
      this.addCustomerDialog = {
        show: true,
        title: '編輯客戶資料',
        option: 'edit',
        data: row
      }
    },
    handleDeleteCustomer(row) {},

    // ****************************************** axios 的部分 ******************************************
    // 讀取客戶的資料
    getCustomerData() {
      this.$axios
        .get(`/api/customer/customer`)
        .then((res) => {
          // 添加成功
          this.$message({
            message: '讀取客戶資料完成！',
            type: 'success'
          })
          // let result = res.data
          // result.sort(function(a, b) {
          //   return Number(a.type) - Number(b.type)
          // })
          this.customersData = res.data
          this.setPaginations()
        })
        .catch((err) => {
          console.log('axios添加數據失敗==>MyDialog.vue==>', err)
        })
    },
    // 讀取兩種資料 1.客戶分類資料 dataType = 'class'  2.客戶職務資料 dataType = 'title
    getServerData(dataType) {
      this.$axios
        .get(`/api/customer/${dataType}`)
        .then((res) => {
          // 添加成功
          this.$message({
            message: '客戶管理端資料完成！',
            type: 'success'
          })
          let result = res.data
          result.sort(function(a, b) {
            return Number(a.type) - Number(b.type)
          })
          dataType == 'class'
            ? (this.customerClassData = result)
            : (this.customerTitleData = result)
        })
        .catch((err) => {
          console.log('axios添加數據失敗==>MyDialog.vue==>', err)
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
  padding: 0px;
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

/* 調整 div 容器最大的寬度 */
.select-class-wrap {
  float: left;
  margin: 0 15px 0 0;
  padding: 0;
  width: 150px;
}
</style>
