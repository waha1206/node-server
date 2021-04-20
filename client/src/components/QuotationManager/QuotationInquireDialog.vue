<template>
  <div class="my-dialog">
    <el-dialog
      class="inquire-dialog"
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-model="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
      width="1845px"
    >
      <el-container class="inquire-dialog">
        <el-header class="inquire-dialog" style="height:100px;"
          ><div class="header-wrap" v-if="customerOptions">
            <el-select
              class="inquire-dialog"
              v-model="customerValue"
              clearable
              filterable
              placeholder="請輸入客戶名稱"
              size="mini"
              @change="handleSelectCustomer"
            >
              <el-option
                v-for="(item, index) in customerOptions"
                :key="item.value + index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-button
              style="margin-left:5px;"
              size="mini"
              type="primary"
              @click="handleEditCustomerData(customerValue)"
              >查看客戶資料</el-button
            >
            <el-button
              style="margin-left:5px;margin-right:25px"
              size="mini"
              type="primary"
              @click="handleProcessingQuotationDialog"
              >進行中訂單總覽</el-button
            >
            <el-checkbox-group
              v-model="statusCheckList"
              size="small"
              style="margin-top:10px"
            >
              <el-checkbox label="無下單"></el-checkbox>
              <el-checkbox label="打樣中"></el-checkbox>
              <el-checkbox label="生產中"></el-checkbox>
              <el-checkbox label="已結案"></el-checkbox>
              <el-checkbox label="打樣完待確認"></el-checkbox>
              <el-checkbox label="已出貨貨款未結清"></el-checkbox>
            </el-checkbox-group>
          </div>

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
        </el-header>
      </el-container>
      <el-container>
        <el-main>
          <div class="table-container">
            <el-table style="width:100%" :data="tableData" size="mini">
              <el-table-column
                prop="quotation_no"
                label="單號"
                width="110px"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="category_name"
                label="商品名稱"
                width="250px"
                align="left"
              >
              </el-table-column>
              <el-table-column label="檔案目錄" width="80px" align="center">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="copySpecialTopicUrl(scope.row)"
                    >複製</el-button
                  >
                </template>
              </el-table-column>
              <el-table-column
                prop=""
                label="交易狀態"
                width="68px"
                align="center"
              >
                <template v-slot="scope">
                  <el-popover
                    width="160"
                    placement="right"
                    :ref="`popover-${scope.$index}`"
                  >
                    <p>請選擇交易狀態</p>
                    <el-radio-group v-model="scope.row.trading_status">
                      <el-radio :label="0">無</el-radio><br />
                      <el-radio :label="1">進行中</el-radio><br />
                      <el-radio :label="2">已完成</el-radio><br />
                      <el-radio :label="3">客戶棄單</el-radio><br />
                    </el-radio-group>
                    <div style="text-align: right; margin: 0">
                      <el-button
                        type="text"
                        size="mini"
                        @click="handleClose(scope.$index, 'popover')"
                      >
                        取消
                      </el-button>
                      <el-button
                        type="danger"
                        size="mini"
                        @click="
                          handleChangeTradingStatus(
                            scope.row,
                            scope.row.trading_status,
                            scope.$index
                          )
                        "
                        >確定</el-button
                      >
                    </div>
                    <!-- slot="reference" 觸發 popover 顯示的 HTML 元素 -->
                    <div slot="reference">
                      <el-tag
                        :type="
                          handleTradingStatus(scope.row.trading_status, 'type')
                        "
                        :effect="
                          handleTradingStatus(
                            scope.row.trading_status,
                            'effect'
                          )
                        "
                        size="medium"
                      >
                        {{
                          handleTradingStatus(scope.row.trading_status, 'label')
                        }}
                      </el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column
                prop=""
                label="生產狀態"
                width="70px"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop=""
                label="會計狀態"
                width="70px"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop=""
                label="訂單狀態"
                width="116px"
                align="center"
              >
                <template v-slot="scope">
                  <el-popover
                    width="160"
                    placement="right"
                    :ref="`processing-${scope.$index}`"
                  >
                    <p>請選擇訂單狀態</p>
                    <el-radio-group v-model="scope.row.processing_status">
                      <el-radio :label="0">尚未安排</el-radio><br />
                      <el-radio :label="1">等待打樣檔案</el-radio><br />
                      <el-radio :label="2">等待生產檔案</el-radio><br />
                      <el-radio :label="3">打樣中</el-radio><br />
                      <el-radio :label="4">生產中</el-radio><br />
                      <el-radio :label="5">打樣完待確認</el-radio><br />
                      <el-radio :label="6">已出貨貨款未結清</el-radio><br />
                      <el-radio :label="7">等尾款結清再出貨</el-radio><br />
                      <el-radio :label="8">已結案</el-radio><br />
                    </el-radio-group>
                    <div style="text-align: right; margin: 0">
                      <el-button
                        type="text"
                        size="mini"
                        @click="handleClose(scope.$index, 'processing')"
                      >
                        取消
                      </el-button>
                      <el-button
                        type="danger"
                        size="mini"
                        @click="
                          handleChangeProcessingStatus(
                            scope.row,
                            scope.row.processing_status,
                            scope.$index
                          )
                        "
                        >確定</el-button
                      >
                    </div>
                    <!-- slot="reference" 觸發 popover 顯示的 HTML 元素 -->
                    <div slot="reference">
                      <el-tag
                        :type="
                          handleProcessingStatus(
                            scope.row.processing_status,
                            'type'
                          )
                        "
                        :effect="
                          handleProcessingStatus(
                            scope.row.processing_status,
                            'effect'
                          )
                        "
                        size="medium"
                      >
                        {{
                          handleProcessingStatus(
                            scope.row.processing_status,
                            'label'
                          )
                        }}
                      </el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column
                prop=""
                label="已付打樣費"
                width="83px"
                align="center"
              >
                <template slot-scope="scope">
                  <el-popover
                    width="860"
                    placement="top"
                    :ref="`proofing-payment-${scope.$index}`"
                  >
                    <p>(更新 / 新增) 打樣費付款紀錄</p>

                    <!-- 日期 金額 後五碼 付款方式 -->

                    <el-row
                      v-for="(item, index) in scope.row.proofing_payment_record"
                      :key="index"
                      style="margin:3px 0"
                    >
                      <el-col :span="3">
                        <el-button
                          style="margin:3px 0px"
                          size="mini"
                          type="danger"
                          @click="handleDeletePaymentRecord(index, item)"
                          >刪除此紀錄</el-button
                        >
                      </el-col>
                      <el-col :span="6">
                        付款日期：
                        <el-date-picker
                          style="width:130px"
                          v-model="item.date"
                          type="date"
                          placeholder="選擇日期"
                          size="mini"
                        >
                        </el-date-picker>
                      </el-col>
                      <el-col :span="5">
                        <span
                          style="float:left;height:26px;line-height:26px;display:inline-block"
                          >支付金額：</span
                        >
                        <my-currency-int-input
                          style="float:left"
                          :isReadyOnly="false"
                          :bgcColor="'yellow'"
                          :txtColor="'black'"
                          :height="22"
                          :width="63"
                          type="text"
                          v-model="item.amount"
                        ></my-currency-int-input>
                      </el-col>
                      <el-col :span="4">
                        <span
                          style="float:left;height:26px;line-height:26px;display:inline-block"
                          >後5碼：</span
                        >
                        <el-input
                          v-model="item.last_five_digits"
                          size="mini"
                          style="float:left;width:80px"
                        >
                        </el-input>
                      </el-col>
                      <el-col :span="6">
                        <span
                          style="float:left;height:26px;line-height:26px;display:inline-block"
                          >發票號碼：</span
                        >
                        <el-input
                          v-model="item.invoice_no"
                          size="mini"
                          placeholder="ab12345678"
                          style="float:left;width:120px"
                        >
                        </el-input>
                      </el-col>
                    </el-row>
                    <div style="text-align: right; margin: 0">
                      <el-button
                        style="margin:3px 0px"
                        size="mini"
                        type="primary"
                        @click="
                          handleUpdatePaymentRecord(
                            scope.row,
                            'add',
                            'proofing-payment'
                          )
                        "
                        >新增</el-button
                      >
                      <el-button
                        type="text"
                        size="mini"
                        @click="handleClose(scope.$index, 'proofing-payment')"
                      >
                        取消
                      </el-button>
                      <el-button
                        type="danger"
                        size="mini"
                        @click="
                          handleUpdatePaymentRecord(
                            scope.row,
                            'update',
                            'proofing-payment'
                          )
                        "
                        >更新</el-button
                      >
                    </div>
                    <!-- slot="reference" 觸發 popover 顯示的 HTML 元素 -->
                    <div slot="reference">
                      <el-tag size="small">{{
                        getProofingAmount(scope.row.proofing_payment_record)
                      }}</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column
                prop=""
                label="訂金與尾款"
                width="83px"
                align="center"
              >
                <template slot-scope="scope">
                  <el-popover
                    width="860"
                    placement="top"
                    :ref="`proofing-payment-${scope.$index}`"
                  >
                    <p>(更新 / 新增) 訂金付款紀錄</p>

                    <!-- 日期 金額 後五碼 付款方式 -->

                    <el-row
                      v-for="(item, index) in scope.row.deposit_payment_record"
                      :key="index"
                      style="margin:3px 0"
                    >
                      <el-col :span="3">
                        <el-button
                          style="margin:3px 0px"
                          size="mini"
                          type="danger"
                          @click="handleDeletePaymentRecord(index, item)"
                          >刪除此紀錄</el-button
                        >
                      </el-col>
                      <el-col :span="6">
                        付款日期：
                        <el-date-picker
                          style="width:130px"
                          v-model="item.date"
                          type="date"
                          placeholder="選擇日期"
                          size="mini"
                        >
                        </el-date-picker>
                      </el-col>
                      <el-col :span="5">
                        <span
                          style="float:left;height:26px;line-height:26px;display:inline-block"
                          >支付金額：</span
                        >
                        <my-currency-int-input
                          style="float:left"
                          :isReadyOnly="false"
                          :bgcColor="'yellow'"
                          :txtColor="'black'"
                          :height="22"
                          :width="63"
                          type="text"
                          v-model="item.amount"
                        ></my-currency-int-input>
                      </el-col>
                      <el-col :span="4">
                        <span
                          style="float:left;height:26px;line-height:26px;display:inline-block"
                          >後5碼：</span
                        >
                        <el-input
                          v-model="item.last_five_digits"
                          size="mini"
                          style="float:left;width:80px"
                        >
                        </el-input>
                      </el-col>
                      <el-col :span="6">
                        <span
                          style="float:left;height:26px;line-height:26px;display:inline-block"
                          >發票號碼：</span
                        >
                        <el-input
                          v-model="item.invoice_no"
                          size="mini"
                          placeholder="ab12345678"
                          style="float:left;width:120px"
                        >
                        </el-input>
                      </el-col>
                    </el-row>
                    <div style="text-align: right; margin: 0">
                      <el-button
                        style="margin:3px 0px"
                        size="mini"
                        type="primary"
                        @click="
                          handleUpdatePaymentRecord(
                            scope.row,
                            'add',
                            'deposit-payment'
                          )
                        "
                        >新增</el-button
                      >
                      <el-button
                        type="text"
                        size="mini"
                        @click="handleClose(scope.$index, 'deposit-payment')"
                      >
                        取消
                      </el-button>
                      <el-button
                        type="danger"
                        size="mini"
                        @click="
                          handleUpdatePaymentRecord(
                            scope.row,
                            'update',
                            'deposit-payment'
                          )
                        "
                        >更新</el-button
                      >
                    </div>
                    <!-- slot="reference" 觸發 popover 顯示的 HTML 元素 -->
                    <div slot="reference">
                      <el-tag size="medium">{{
                        getProofingAmount(scope.row.deposit_payment_record)
                      }}</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column
                prop=""
                label="尚未回收"
                width="110px"
                align="center"
              >
                <template slot-scope="scope">
                  <el-tag
                    size="medium"
                    @click="copyValue(getRecoverableAmount(scope.row))"
                    >{{ getRecoverableAmount(scope.row) }}</el-tag
                  >
                </template>
              </el-table-column>
              <el-table-column
                prop=""
                label="大貨交期"
                width="117px"
                align="center"
              >
                <template v-slot="scope">
                  <el-date-picker
                    style="width:107px"
                    v-model="scope.row.delivery_date"
                    type="date"
                    placeholder="交期"
                    format="M 月 d"
                    size="mini"
                    @change="
                      handleDeliveryDateChange(
                        scope.row,
                        scope.row.delivery_date
                      )
                    "
                  >
                  </el-date-picker>
                </template>
              </el-table-column>
              <el-table-column
                prop=""
                label="剩天數"
                width="65px"
                align="center"
              >
                <template v-slot="scope">
                  <div style="color:red;font-weight:bold">
                    {{ fewDaysLeft(scope.row.delivery_date) }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="proofing_value"
                label="打樣款"
                width="56px"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="proofing_price"
                label="打樣/單"
                width="83px"
                align="center"
              >
                <template slot-scope="scope">
                  <my-currency-int-input
                    :isReadyOnly="false"
                    :bgcColor="'yellow'"
                    :txtColor="'black'"
                    :height="22"
                    :width="43"
                    type="text"
                    v-model="scope.row.proofing_price"
                  ></my-currency-int-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="proofing_price"
                label="打樣/總"
                width="93px"
                align="center"
              >
                <template slot-scope="scope">
                  <my-currency-int-input
                    :isReadyOnly="false"
                    :bgcColor="'yellow'"
                    :txtColor="'black'"
                    :height="22"
                    :width="53"
                    type="text"
                    v-model="
                      scope.row.proofing_price * scope.row.proofing_value
                    "
                  ></my-currency-int-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="order_value"
                label="數量"
                width="50px"
                align="center"
              >
              </el-table-column>
              <el-table-column prop="" label="單價" width="72px" align="center">
                <template slot-scope="scope">
                  <my-currency-int-input
                    :isReadyOnly="false"
                    :bgcColor="'yellow'"
                    :txtColor="'black'"
                    :height="22"
                    :width="35"
                    type="text"
                    v-model="scope.row.unit_price"
                  ></my-currency-int-input>
                </template>
              </el-table-column>
              <el-table-column prop="" label="稅" width="80px" align="center">
                <template slot-scope="scope">
                  <my-currency-int-input
                    :isReadyOnly="false"
                    :bgcColor="'yellow'"
                    :txtColor="'black'"
                    :height="22"
                    :width="43"
                    type="text"
                    v-model="scope.row.tax"
                  ></my-currency-int-input>
                </template>
              </el-table-column>
              <el-table-column
                prop=""
                label="總金額含稅"
                width="110px"
                align="center"
                ><template slot-scope="scope">
                  <my-currency-int-input
                    :isReadyOnly="false"
                    :bgcColor="'yellow'"
                    :txtColor="'black'"
                    :height="22"
                    :width="65"
                    type="text"
                    v-model="scope.row.total_amount_tax"
                  ></my-currency-int-input>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-main>
      </el-container>
    </el-dialog>
    <CustomerDialog
      v-if="customerTitleData && customerTitleData && customerClassData"
      :dialog="addCustomerDialog"
      :customerClassData="customerClassData"
      :customerTitleData="customerTitleData"
      @update=""
    >
    </CustomerDialog>
    <QuotationInProcessingDialog
      :dialog="processingQuotationDialog"
      @update="getQuotationFromCustomerId"
    ></QuotationInProcessingDialog>
  </div>
</template>

<script>
import { copyValueToWindow, isEmpty, appendComma } from '../../utils/tools'
import CustomerDialog from '../../components/CustomerManager/CustomerDialog'
import QuotationInProcessingDialog from '../../components/QuotationManager/QuotationInProcessingDialog'

const types = {
  SET_IS_AUTNENTIATED: 'SET_IS_AUTNENTIATED', // 是否通過認證
  SET_USER: 'SET_USER', // 用户信息
  UPDATE_PERMISSIOM_LIST: 'UPDATE_PERMISSION_LIST' // 設定使用者的權限
}

const tradingStatusOptions = [
  { type: '', effect: 'plain', label: '無成交' },
  { type: '', effect: 'dark', label: '進行中' },
  { type: 'success', effect: 'dark', label: '已完成' },
  { type: 'warning', effect: 'dark', label: '客棄單' }
]
const processingStatusOptions = [
  { type: '', effect: 'plain', label: '尚未安排' },
  { type: 'danger', effect: 'dark', label: '等待打樣檔案' },
  { type: 'danger', effect: 'dark', label: '等待生產檔案' },
  { type: '', effect: 'dark', label: '打樣中' },
  { type: '', effect: 'dark', label: '生產中' },
  { type: 'danger', effect: 'dark', label: '打樣完待確認' },
  { type: 'danger', effect: 'dark', label: '已出貨貨款未結' },
  { type: 'danger', effect: 'dark', label: '尾款結清再出貨' },
  { type: 'success', effect: 'dark', label: '已結案' }
]

export default {
  name: 'quotation-inquire-dialog',
  props: {
    dialog: Object
  },
  data() {
    return {
      // 交貨日期
      deliveryDate: '',
      // 交易狀態
      statusVisible: false,
      // 報價單的篩選
      quotationStatus: [],
      statusCheckList: [],
      customerClassData: [], // 存放客戶分類
      customerTitleData: [], // 存放客戶職稱
      customerData: {}, // 存放客戶資料
      quotationData: [],
      tableData: [],
      // 取得 customer name and id
      customerNameAndId: [],
      // 選擇客戶的 company 然後把 _id 放到 customerValue 裡面
      customerOptions: [],
      customerValue: '',
      // 管理分頁
      my_paginations: {
        localStorage_page_size: 'inquire_quotation_page_size',
        page_index: 1, // 位於當前第幾頁
        total: 0, // 總數
        page_size: 10, // 每一頁顯示幾條數據
        page_sizes: [5, 10, 15] // 選擇一頁要顯示多少條
        // layouts: 'total, sizes, prev, pager, next, jumper'
      },
      addCustomerDialog: {
        show: false,
        title: '新增客戶資料',
        editData: {},
        option: 'edit',
        data: {}
      },
      processingQuotationDialog: {
        show: false,
        title: '進行中的訂單總覽',
        data: {}
      }
    }
  },
  mounted() {
    // this.initQuotationCustomerId()
  },
  components: {
    CustomerDialog,
    QuotationInProcessingDialog
  },
  watch: {
    dialog() {
      console.log('我是子元件')
      this.tableData.length = 0
      this.getCustomerNameAndId()
    },
    // 當取得客戶資料之後 取代掉 then 的功能
    customerNameAndId(newValue) {
      if (localStorage.quotation_customer_id) {
        this.customerValue = localStorage.quotation_customer_id
        this.getQuotationFromCustomerId(localStorage.quotation_customer_id)
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  methods: {
    // **********************************************  axios 讀取資料開始 **********************************************
    getQuotationFromCustomerId(customerId) {
      this.$axios
        .get(`/api/quotation/quotation/${customerId}`)
        .then((res) => {
          // 讀取客戶報價單資料成功
          this.$message({
            message: '讀取客戶報價單資料成功',
            type: 'success'
          })
          this.quotationData = res.data
          this.setPaginations()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getCustomerNameAndId() {
      // 輸入客戶名稱的時候用的
      this.$axios
        .get('/api/customer/name-and-id')
        .then((res) => {
          this.customerValue = ''
          this.customerOptions.length = 0
          this.customerNameAndId.length = 0
          //獲取成功
          this.$message({
            message: '成功取得客戶 name and id',
            type: 'success'
          })

          this.customerNameAndId = [...res.data]
          this.customerNameAndId.forEach((item) => {
            let obj = { value: item._id, label: item.company }
            this.customerOptions.push(obj)
          })
        })
        .catch((err) => {
          console.log('get customer name and id fail', err)
        })
    },
    // 讀取兩種資料 1.客戶分類資料 dataType = 'class'  2.客戶職務資料 dataType = 'title
    getServerData(dataType) {
      return this.$axios
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
    },
    getCustomerDataById(customerId) {
      return this.$axios
        .get(`/api/customer/${customerId}`)
        .then((res) => {
          this.customerData = null
          //獲取成功
          this.$message({
            message: '成功取得客戶資料！',
            type: 'success'
          })

          this.customerData = { ...res.data }
          console.log(this.customerData)
        })
        .catch((err) => {
          console.log('get customer name and id fail', err)
        })
    },

    handleUpdatePaymentRecord(row, type, kind) {
      let uploadData = {}
      if (type === 'add') {
        const obj = {
          date: new Date(),
          amount: 0,
          last_five_digits: '',
          payment_kind: 0
        }
        if (kind === 'proofing-payment') {
          row.proofing_payment_record.push(obj)
          uploadData = {
            id: row._id,
            proofing_payment_record: row.proofing_payment_record
          }
        } else if (kind === 'deposit-payment') {
          row.deposit_payment_record.push(obj)
          uploadData = {
            id: row._id,
            deposit_payment_record: row.deposit_payment_record
          }
        }
      } else {
        if (kind === 'proofing-payment') {
          uploadData = {
            id: row._id,
            proofing_payment_record: row.proofing_payment_record
          }
        } else if (kind === 'deposit-payment') {
          uploadData = {
            id: row._id,
            deposit_payment_record: row.deposit_payment_record
          }
        }
      }

      this.$axios
        .post('/api/quotation/update', uploadData)
        .then((res) => {
          // 添加成功
          this.$message({
            message: '新增打樣費欄位完成！',
            type: 'success'
          })

          this.getQuotationFromCustomerId(row.customer_value)
        })
        .catch((err) => {
          console.log('交期更新失敗', err)
        })
    },

    // **********************************************  axios 讀取資料結束 **********************************************
    // ************************************** 分頁開始 **************************************
    setPaginations() {
      this.my_paginations.total = this.quotationData.length
      this.my_paginations.page_index = 1
      if (localStorage[this.my_paginations.localStorage_page_size]) {
        this.my_paginations.page_size = Number(
          localStorage[this.my_paginations.localStorage_page_size]
        )
      } else {
        this.my_paginations.page_size = 5
      }
      // 設置分頁數據
      this.tableData = this.quotationData.filter((item, index) => {
        return index < this.my_paginations.page_size
      })
    },
    handleSizeChange(page_size) {
      // 切換每頁有幾條數據
      localStorage[this.my_paginations.localStorage_page_size] = page_size
      this.my_paginations.page_index = 1
      this.my_paginations.page_size = page_size
      this.tableData = this.quotationData.filter((item, index) => {
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
        if (this.quotationData[i]) {
          tables.push(this.quotationData[i])
        }
        this.tableData = tables
      }
    }, /// ************************************** 分頁結束 **************************************
    handleProcessingQuotationDialog() {
      this.processingQuotationDialog = {
        show: true,
        title: '進行中訂單總覽'
      }
    },
    // 點擊複製 使用 tools 裡面的 複製功能
    copyValue(value) {
      const message = `您需要再支付的金額為：${value}`
      copyValueToWindow(message)
      this.$message({
        message: `複製 ${message} 成功！`,
        type: 'success'
      })
    },
    // 計算尚未回收金額
    getRecoverableAmount(row) {
      let proofingFee = 0
      let depositFee = 0
      let recoverableAmount = 0
      row.proofing_payment_record.forEach((item) => {
        proofingFee += item.amount
      })
      row.deposit_payment_record.forEach((item) => {
        depositFee += item.amount
      })
      recoverableAmount = row.total_amount_tax - proofingFee - depositFee

      return appendComma('$', recoverableAmount)
    },
    // 取得打樣費用總和
    getProofingAmount(ProofingPaymentRecord) {
      if (isEmpty(ProofingPaymentRecord)) return '-------'
      let amount = 0
      ProofingPaymentRecord.forEach((item) => {
        amount += item.amount
      })

      return appendComma('$', amount)
    },
    // 刪除打樣費用的交易紀錄
    handleDeletePaymentRecord(index, item) {},
    // 交期的時間發生變化
    handleDeliveryDateChange(row, deliveryDate) {
      const uploadData = {
        id: row._id,
        delivery_date: deliveryDate
      }
      this.$axios
        .post('/api/quotation/update', uploadData)
        .then((res) => {
          // 添加成功
          this.$message({
            message: '交貨日期更新完成！',
            type: 'success'
          })

          this.getQuotationFromCustomerId(row.customer_value)
        })
        .catch((err) => {
          console.log('交期更新失敗', err)
        })
    },
    // 交期剩下幾天
    fewDaysLeft(deliveryDate) {
      if (isEmpty(deliveryDate)) return
      const setTime = new Date(deliveryDate)
      const nowTime = new Date()

      let restSec =
        parseInt(setTime.getTime() / (60 * 60 * 24 * 1000)) -
        parseInt(nowTime.getTime() / (60 * 60 * 24 * 1000))

      restSec = restSec >= 0 ? '剩 ' + restSec + ' 天' : '已截止'
      return restSec
    },
    handleProcessingStatus(processingStatus, type) {
      // el-tag 有三種主題 dark plain light 透過 effect="dark" 去設定
      const status = processingStatusOptions
      if (isEmpty(processingStatus)) return status[0][type]
      else return status[processingStatus][type]
    },
    handleTradingStatus(tradingStatus, type) {
      // el-tag 有三種主題 dark plain light 透過 effect="dark" 去設定
      const status = tradingStatusOptions
      if (isEmpty(tradingStatus)) return status[0][type]
      else return status[tradingStatus][type]
    },
    // 關閉 el-popover
    handleClose(index, type) {
      this.$refs[`${type}-${index}`].doClose()
    },
    // 點擊查看客戶資料
    async handleEditCustomerData(customerId) {
      if (isEmpty(customerId)) return
      console.log('customerId', customerId)
      await this.getServerData('class')
      await this.getServerData('title')
      await this.getCustomerDataById(customerId)
      this.addCustomerDialog = {
        show: true,
        title: '編輯客戶資料',
        option: 'edit',
        data: this.customerData[0]
      }
    },
    // 改變訂單的下單狀態 未成交、成交、客戶棄單
    handleChangeProcessingStatus(row, processingStatus, index) {
      const uploadData = {
        id: row._id,
        processing_status: processingStatus
      }
      this.$axios
        .post('/api/quotation/update', uploadData)
        .then((res) => {
          // 添加成功
          this.$message({
            message: '訂單狀態更新完成！',
            type: 'success'
          })
          this.$refs[`processing-${index}`].doClose()
          this.getQuotationFromCustomerId(row.customer_value)
        })
        .catch((err) => {
          console.log('交易狀態更新失敗', err)
        })
    },
    // 改變訂單的下單狀態 未成交、成交、客戶棄單
    handleChangeTradingStatus(row, tradingStatus, index) {
      const uploadData = {
        id: row._id,
        trading_status: tradingStatus
      }
      this.$axios
        .post('/api/quotation/update', uploadData)
        .then((res) => {
          // 添加成功
          this.$message({
            message: '交易狀態更新完成！',
            type: 'success'
          })
          this.$refs[`popover-${index}`].doClose()
          this.getQuotationFromCustomerId(row.customer_value)
        })
        .catch((err) => {
          console.log('交易狀態更新失敗', err)
        })
    },
    // 複製點選的資料
    // 技術文件出處 https://iter01.com/439667.html
    copySpecialTopicUrl(row) {
      var oInput = document.createElement('input') //建立一個隱藏input（重要！）

      if (!localStorage.quotation_file_path) {
        this.$message({
          message: '您尚未設定Dropbox的路徑！',
          type: 'error'
        })
        return
      }
      oInput.value = localStorage.quotation_file_path + row.quotation_no //賦值
      document.body.appendChild(oInput)
      oInput.select() // 選擇物件
      document.execCommand('Copy') // 執行瀏覽器複製命令
      oInput.className = 'oInput'
      oInput.style.display = 'none'
      this.$message({
        message: `${oInput.value} 複製檔案目錄成功！`,
        type: 'success'
      })
    },

    handleSelectCustomer(customerId) {
      if (isEmpty(customerId)) return
      this.getQuotationFromCustomerId(customerId)
      localStorage.quotation_customer_id = customerId
    }
  }
}
</script>

<style scoped>
.inquire-dialog .el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  padding: 0;
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
  display: block;
  float: left;
  text-align: left;
  margin-left: 0px;
  margin-top: 10px;
}
.table-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
}
</style>
