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
  // 是否允許刪除，一旦啟動送審就無法刪除
  allow_delete: {
    type: Boolean,
    default: true
  },
  category_id: {
    type: String,
    // 紀錄商品的 _id
    required: true
  },
  // 商品的名稱
  category_name: {
    type: String
  },
  order_value: {
    type: String
  },
  // 利潤
  profit: {
    type: String
  },
  proofing_value: {
    type: String
  },
  // sales 的 uid
  sales_value: {
    type: String
  },
  // 使用者的 _id (mongodb 裡面的 _id)
  // 2023/8/10 修正，這邊會是，誰創建了這一筆訂單
  // 因為有時候會是業務創建表單後，把此表單轉讓給某個特定的客戶
  // 轉讓後發現此欄位並沒有同步轉移給客戶
  // 所以未來要去定義此訂單的欄位會是使用 customer_uid
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
  // 訂單總金額
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
  // 0-無
  // 1-進行中
  // 2-已完成
  // 3-客戶氣單
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
  // 打樣費用的付款紀錄-這個應該沒用了 2022/6/22 改用 accounting
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
  // 訂金的付款紀錄-這個應該沒用了 2022/6/22 改用 accounting
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
  // 2023/8/10 因為 customer_value 此欄位重新定義其為，創建此報價單的人
  // 所以未來定義此報價單的客戶歸屬人員是誰，就是要使用這個欄位
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
  // 是否結案
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
    memo: { type: String, default: '' },
    // 款項是否結清，true 未結清，false 結清。代表有未回收款項存在
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
    // 0:尚未決定 2501:ATM 2502:PayPal 2503:月結之類 2504:信用卡 2505:現金 2506:載具(未登錄)
    // 這個是細分類
    charge_method: { type: Number, default: 0 },
    charge_method_name: { type: String, default: '' },
    // 1000:尚未分類 1001:使用 ATM PayPal 1002:使用月結之類的 (大分類)
    // 目前把 ATM 與 PayPal 歸為 1001  月結類的歸為 1002  其他，還沒想到
    charge_class: { type: Number, default: 0 }, // 2601	ATM、PayPal	   2602	期約客戶
    charge_class_name: { type: String, default: '' }, // charge_class 的中文名稱
    code: { type: Number, default: Number(2000) }, // 屬於 accounting 自己的 code
    last_five_digits: { type: String, default: '' }, // 存 ATM 後五碼
    buyer_paypal_email: { type: String, default: '' }, // 存 PayPal 的信箱
    proofing_price_tax: { type: Number, default: 0 }, // 打樣費用
    product_price_tax: { type: Number, default: 0 }, // 生產費用
    total_price_tax: { type: Number, default: 0 }, // total_price_tax 商品含稅總金額 proofing_price_tax 樣品含稅組金額 兩者相加 = 訂單總金額
    // proofing_or_product submit 的時候是自動選擇判斷，到後期進行的時候會根據流程做改變
    proofing_or_product: { type: Boolean }, // true = proofing  false = product  nudefined = 尚未決定
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
      code: { type: Number }, // 這個訂單流程的代碼為，直接同步 報價單上面的 code
      created_date: { type: Date }, // 此流程創建的時間
      update_date: { type: Date }, // 異動時間，暫時沒有設定與想法
      customer_notes: { type: String },
      staff_notes: { type: String }, // 員工回覆客戶的訊息
      staff_uid: { type: String }, // 如果是員工回覆，則該員工的 uid 放這
      unit_price_off: { type: Number, default: '' }, // 如果有對於訂單折扣的話，放這，這邊是商品的未稅單價，請使用整數
      product_delivery_date: { type: Number }, // 大貨需要幾個工作天
      proofing_delivery_date: { type: Number }, // 打樣需要幾個工作天
      notesIsRead: { type: Boolean, default: false },
      last_five_digits: { type: String, default: '' },
      buyer_paypal_email: { type: String, default: '' }
    }
  ],

  // 當打樣的配件異動的時候，就寫到這邊，初始值複製 material_group select_material 這邊的
  // 有幾筆資料參考打樣幾款的欄位 proofing_value
  proofing_material_record: [
    {
      record_id: { type: String },
      material_group: { type: Array },
      select_material: { type: Array }
    }
  ],
  // quotation.code = 3002 已付費打樣中
  // quotation.code = 3102 未付費打樣中
  proofing_process: {
    // 完成時間，由業務輸入
    completion_date: { type: Date, default: null },
    // 紀錄流程，方便客戶在看旅程的時後看到哪個階段是哪個人操作的
    proofing_record: [
      {
        index: { type: Number }, // 流水號
        code: { type: Number }, // 目前的狀態
        created_date: { type: Date }, // 異動的時間
        // 3500-業務檢查》 3501-布標》3502-輸出》3503-轉印》3504-裁切》3505-平車》3506-手工》3507-整燙》3508-拍照》3509-包裝》3510-出貨》3511-結案
        // 3599-檔案錯誤退回重上 3598-配件缺少退回重選
        status_code: { type: Number },
        who_did_it_uid: { type: String }, // 這個紀錄是誰送出的
        who_did_it_name: { type: String }, // 填表人員中文姓名
        who_did_it_message: { type: String }, // 輸入人員所要表達的訊息
        previous_quotation_code: { Number } // 前一個 quotation code 如果出錯就需要退到上一個 code 去讓客戶重新上傳檔案
      }
    ]
  },
  // 生產的配件選擇
  product_material_record: [
    {
      record_id: { type: String },
      material_group: { type: Array },
      select_material: { type: Array },
      production_quantity: { type: Number }
    }
  ],
  // quotation.code = 4002 已付費生產中
  // quotation.code = 4102 未付費生產中
  product_process: {
    // 完成時間，由業務輸入
    completion_date: { type: Date, default: null },
    // 紀錄流程，方便客戶在看旅程的時後看到哪個階段是哪個人操作的
    product_record: [
      {
        index: { type: Number }, // 流水號
        code: { type: Number }, // 目前的狀態
        created_date: { type: Date }, // 異動的時間
        // 3500-業務檢查》 3501-布標》3502-輸出》3503-轉印》3504-裁切》3505-平車》3506-手工》3507-整燙》3508-拍照》3509-包裝》3510-出貨》3511-結案
        // 3599-檔案錯誤退回重上 3598-配件缺少退回重選
        status_code: { type: Number },
        who_did_it_uid: { type: String }, // 這個紀錄是誰送出的
        who_did_it_name: { type: String }, // 填表人員中文姓名
        who_did_it_message: { type: String }, // 輸入人員所要表達的訊息
        previous_quotation_code: { Number } // 前一個 quotation code 如果出錯就需要退到上一個 code 去讓客戶重新上傳檔案
      }
    ]
  },
  // 20221112 新增兩個欄位 打樣注意事項 跟 生產注意事項
  please_note_that_proofing: { type: String, default: '' },
  please_note_that_product: { type: String, default: '' },
  print: {
    print_device: { type: String, default: '' },
    print_memo: { type: String, default: '' }
  },
  // 20221217 新增 options 2023/8/30 新增 打完加工單的勾勾
  options: {
    sales_track: { type: Boolean, default: false }, // 樑家要的功能，追蹤所有報價單
    proofing_print_track: { type: Boolean, default: false }, // 紫燕要的功能，標示打樣輸出是否完成
    product_print_track: { type: Boolean, default: false }, // 紫燕要的功能，標示生產輸出是否完成
    production_order_finished: { type: Boolean, default: false } // 加工單是否已經完成
  },
  // 商品別名
  category_alias: { type: String, default: '' },
  // 關於原物料倉庫 true 有扣過了  false 沒扣過
  about_material_storage: {
    proofing_material_been_dedcuted: { type: Boolean, default: false },
    product_material_been_dedcuted: { type: Boolean, default: false }
  }
})

// eslint-disable-next-line no-undef
module.exports = {
  Quotation: mongoose.model('quotations', QuotationSchema)
}
