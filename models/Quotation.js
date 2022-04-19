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
  // 會計頁面的所有操作請參考這個欄位
  accounting: {
    // 款項是否結清，true 結清，false 尚未結清。代表有未回收款項存在
    // 注意，有可能款項結清但是案子尚未結束，所以要同步檢查 case_close
    // 當進入打樣或是生產的時候，會設定此欄位為未結清款項 false
    // 會計可以透過此欄位抓出來所有尚未結清款項的訂單
    settle_account: {
      type: Boolean,
      default: true
    },
    // 付款過幾次
    payment_times: {
      type: Number,
      default: 0
    },
    // 0:尚未決定 1:ATM 2:PayPal 3:月結之類 4:信用卡 5:現金 6:載具
    // 這個是細分類
    charge_method: { type: Number, default: 0 },
    charge_method_name: { type: String },
    // 1000:尚未分類 1001:使用 ATM PayPal 1002:使用月結之類的 (大分類)
    // 目前把 ATM 與 PayPal 歸為 1001  月結類的歸為 1002  其他，還沒想到
    charge_class: { type: Number, default: 0 },
    charge_class_name: { type: String },
    code: { type: Number, default: Number(2001) }, // 屬於 accounting 自己的 code
    last_five_digits: { type: String, default: '' }, // 存 ATM 後五碼
    buyer_paypal_email: { type: String, default: '' }, // 存 PayPal 的信箱
    proofing_price_tax: { type: Number, default: 0 }, // 打樣費用
    product_price_tax: { type: Number, default: 0 }, // 生產費用
    total_price_tax: { type: Number, default: 0 }, // 總金額
    // proofing_or_product submit 的時候是自動選擇判斷，到後期進行的時候會根據流程做改變
    proofing_or_product: { type: Boolean }, // true = proofing  false = product
    payment_record: [
      {
        index: { type: Number }, // 流水號
        created_date: { type: Date }, // 會計輸入時間
        amount: { type: Number }, // 付款金額，不給他小數點
        payment_kind: { type: Number }, // 0.現金 1.國內轉帳 2.paypal 3.信用卡支付 4.載具支付
        invoice_no: { type: String }, // 發票號碼
        staff_uid: { type: String }, // 填表人員 uid
        staff_name: { type: String }, // 填表人員中文姓名
        memo: { type: String } // 備註
      }
    ]
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
