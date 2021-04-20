const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 報價單
const QuotationSchema = new Schema({
  quotation_no: {
    // 紀錄商品的 _id
    type: String,
    required: [true, '訂單編號必須要有']
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
        last_five_digits: Number, // 轉出帳號的後五碼
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
        last_five_digits: Number, // 轉出帳號的後五碼
        invoice_no: String, // 發票號碼
        payment_kind: Number // 0.現金 1.國內轉帳 2.paypal 3.信用卡支付 4.載具支付
      }
    ]
  }
})

// eslint-disable-next-line no-undef
module.exports = {
  Quotation: mongoose.model('quotations', QuotationSchema)
}
