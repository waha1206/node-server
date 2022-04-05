const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 報價單
const QuotationSchema = new Schema({
  quotation_no: {
    // 紀錄商品的 _id
    type: String,
    required: [true, '訂單編號必須要有']
  },
  // 版型編號
  pattern_no: {
    type: String
  },
  // 是否允許刪除，一旦啟動交易就無法刪除
  allow_delete: {
    type: Boolean,
    default: true
  },
  category_id: {
    type: String,
    // 紀錄商品的 _id
    required: true
  },
  category_name: {
    // 商品的名稱
    type: String
  },
  order_value: {
    type: String
  },
  profit: {
    type: String
  },
  proofing_value: {
    type: String
  },
  sales_value: {
    type: String
  },
  customer_value: {
    type: String
  },
  material_group: {
    type: Array
  },
  select_material: {
    type: Array
  },
  tailor_fee: {
    type: Number
  },
  crop_fee: {
    type: Number
  },
  unit_price: {
    type: Number
  },
  proofing_price: {
    type: Number
  },
  total_amount: {
    type: Number
  },
  total_amount_tax: {
    type: Number
  },
  tax: {
    type: Number
  },
  creation_date: {
    type: Date,
    default: Date.now
  },
  modified_date: {
    type: Date,
    default: Date.now
  },
  modifiedUser_id: {
    type: String
  },
  save_calculation_data: {
    type: Array
  },
  index_date: {
    type: String
  },
  order_status: {
    order: {
      type: String
    }
  },
  trading_status: {
    type: Number
  },
  // processing_status 的狀態
  // '尚未安排', 0
  // '等待打樣檔案', 1
  // '等待生產檔案', 2
  // '打樣中', 3
  // '生產中', 4
  // '打樣完待確認', 5
  // '已出貨貨款未結', 6
  // '尾款結清再出貨', 7
  // '已結案' 8
  processing_status: {
    type: Number
  },
  delivery_date: {
    type: Date
  },
  // 打樣費用的付款紀錄
  proofing_payment_record: {
    type: [
      {
        date: Date, // 轉帳時間
        amount: Number, // 轉帳總金額 NT 計算，無小數點
        last_five_digits: String, // 轉出帳號的後五碼
        invoice_no: String, // 發票號碼
        payment_kind: Number // 0.現金 1.國內轉帳 2.paypal 3.信用卡支付 4.載具支付
      }
    ]
  },
  // 訂金的付款紀錄
  deposit_payment_record: {
    type: [
      {
        date: Date, // 支付訂金日期
        amount: Number, // 轉帳總金額 NT 計算，無小數點
        last_five_digits: String, // 轉出帳號的後五碼
        invoice_no: String, // 發票號碼
        payment_kind: Number // 0.現金 1.國內轉帳 2.paypal 3.信用卡支付 4.載具支付
      }
    ]
  },
  // 新增找尋報價單的索引，firebase uid
  customer_uid: {
    type: String
  },
  // 繼承 category裡的 level_one_id
  level_one_id: {
    type: String
  },
  // 繼承 category裡的 level_two_id
  level_two_id: {
    type: String
  },
  // 裝箱數
  carton: {
    type: String
  },
  // 商品淨重
  net_weight: {
    type: String
  },
  // 箱子費用
  carton_fee: {
    type: String
  },
  // 單箱運費
  delivery_fee: {
    type: String
  },
  // 總運費 = (carton_fee + delivery_fee) * carton
  total_delivery_fee: {
    type: String
  },
  // 商品特色，web端看的，不超過10字
  feature: {
    type: String
  },
  // 市售價
  selling_price: {
    type: String
  },
  // 簡易規格
  specification: {
    type: String
  },
  case_closed: {
    type: Boolean,
    default: false
  },
  // 是否允許進行打樣
  disable_proofing: {
    type: Boolean,
    default: false
  },
  // 款項是否結清，true 結清，false 尚未結清
  // 注意，有可能款項結清但是案子尚未結束，所以要同步檢查 case_close
  settle_account: {
    type: Boolean,
    default: true
  },
  code: { type: Number, default: 1000 }, // 目前這張報價單的狀態
  // 訂單流程資料欄位
  order_process: [
    {
      index: { type: Number }, // 流水號
      order_close: { type: Boolean }, // 此訂單是否關閉 A
      close_date: { type: Date }, // 訂單關閉的時間 B
      code: { type: Number },
      created_date: { type: Date },
      update_date: { type: Date },
      customer_notes: { type: String },
      staff_notes: { type: String },
      staff_uid: { type: String },
      unit_price_off: { type: Number },
      product_delivery_date: { type: Number },
      proofing_delivery_date: { type: Number },
      notesIsRead: { type: Boolean, default: false },
      last_five_digits: { type: String, default: '' },
      buyer_paypal_email: { type: String, default: '' }
    }
  ]
})

// eslint-disable-next-line no-undef
module.exports = {
  Quotation: mongoose.model('quotations', QuotationSchema)
}
