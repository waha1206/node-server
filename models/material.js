const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creat Schema
const MaterialSchema = new Schema({
  create_date: {
    type: Date,
    default: Date.now
  },
  imgs: {
    type: [String]
  },
  type: {
    type: String
  },
  product_name: {
    type: String
  },
  last_modify_date: {
    type: Date
  },
  old_serial_numbers: {
    type: String
  },
  company_profit: {
    type: String
  },
  unit: {
    type: String
  },
  product_category: {
    type: String
  },
  // 商品成本
  the_cost: {
    type: String
  },
  // 單位售價
  unit_price: {
    type: String,
    default: ''
  },
  // 商品售價
  retail_price: {
    type: String
  },
  // 商品利潤
  product_profit: {
    type: String
  },
  product_description: {
    type: String
  },
  // 現有庫存 數量
  storage: {
    type: String
  },
  product_color: {
    type: String
  },
  various_elements: {
    type: String
  },
  length: {
    type: String
  },
  extra_freight: {
    type: String
  },
  lead_time: {
    type: String
  },
  raw_material: {
    type: String
  },
  minimum_order_quantity: {
    type: String
  },
  supplier: {
    type: String
  },
  supplier_contact_person: {
    type: String
  },
  supplier_phone_number: {
    type: String
  },
  supplier_fax_number: {
    type: String
  },
  supplier_cell_phone: {
    type: String
  },
  supplier_address: {
    type: String
  },
  supplier_email: {
    type: String
  },
  remark: {
    type: String
  },
  supplier_bank_information: {
    type: String
  },
  product_website: {
    type: String
  },
  supplier_id: {
    type: String
  },
  product_picture_website: {
    type: String
  },
  last_edit_person: {
    type: String
  },
  stock_alert: {
    type: String
  },
  material_class: {
    type: String
  },
  level_two_id: {
    type: String
  },
  // 加工費用是否要計算
  processing_fee_flag: {
    type: Boolean,
    default: true
  },
  processing_remark: {
    type: String
  },
  // 原料種類 1 一般原物料  2 轉印布料 3 非轉印布料
  kind: {
    type: Number
  },
  cloth_width: {
    type: String
  },
  // 版型寬 - 配件用的
  layout_width: {
    type: String
  },
  // 版型高 - 配件用的
  layout_height: {
    type: String
  },
  // 裁切費用 - 配件用的
  crop_fee: {
    type: String
  },
  // 平車費用 - 配件用的
  tailor_fee: {
    type: String
  },
  // 配件布料的 _id
  accessory_cloth_id: {
    type: String
  },
  // 版型編號
  pattern_no: {
    type: String
  },
  // 版型下載位置
  pattern_download: {
    type: String
  },
  // 加工費用
  processing_fee: {
    type: String,
    default: ''
  },
  // 追加的耗材，這邊只根據紙跟布料去計算
  additional_height: {
    type: String
  },
  // 當選擇 4 配件專用的時候，要決定要不要智慧排版
  typesetting: {
    type: Boolean
  },
  accessory_cloth_loss: {
    type: String
  },
  pattern_free: {
    type: Boolean
  },
  inside_pattern_no: {
    type: String
  },
  inside_pattern_download: {
    type: String
  },
  monitoring: {
    type: Boolean,
    default: false
  },
  // 共使用了幾個原料
  // 1.要先把單位切到最小，例如：公分，個，組 .. 等等
  // 2.這邊代表使用了幾個最小單位
  count: {
    type: Number,
    default: Number(1)
  },
  // 初始化 0:麥歐
  // 這邊是代表管理頁面，那個供應商可以看到
  onwer: {
    type: Number,
    default: Number(0)
  },
  // 倉庫的關聯欄位，一個原料只會對應到一個父親，這邊會是 material storage 的 _id 編號
  my_father: {
    type: String,
    default: ''
  }
})

// schema 表單說明連結
// https://docs.google.com/spreadsheets/d/1l0C2AZLdgQArMpXq2O35x-luldakcrhpz9TUdB17rgk/edit#gid=1387932891

const MaterialStorageSchema = new Schema({
  // 建立時間
  create_date: {
    type: Date,
    default: Date.now
  },
  // 圖片
  imgs: {
    type: [String]
  },
  // 商品編號
  type: {
    type: String
  },
  // 商品名稱
  product_name: {
    type: String
  },
  // 修改時間
  last_modify_date: {
    type: Date
  },
  // 商品單位 碼，公分，克重
  unit: {
    type: String
  },
  // 單位售價，例如保麗龍一袋9公斤，1800元，要換算到 1800/9000=0.2元
  unit_price: {
    type: String,
    default: ''
  },
  // 商品售價，自動產生，單位售價*商品利潤 = 商品售價
  retail_price: {
    type: String
  },
  // 商品利潤
  product_profit: {
    type: String,
    default: '0'
  },
  // text area 訂購的須知等等大範圍的文字
  product_description: {
    type: String,
    default: ''
  },
  // 現有庫存 數量
  storage: {
    type: String,
    default: ''
  },
  // 商品顏色
  product_color: {
    type: String,
    default: ''
  },
  // 額外運費
  extra_freight: {
    type: String,
    default: ''
  },
  // 採購天數
  lead_time: {
    type: String,
    default: ''
  },
  // 原料材質
  raw_material: {
    type: String,
    default: ''
  },
  // 最低訂購量
  minimum_order_quantity: {
    type: String,
    default: ''
  },
  // 備註
  remark: {
    type: String,
    default: ''
  },

  product_website: {
    type: String,
    default: ''
  },
  // 供應商的 _id
  supplier_id: {
    type: String,
    default: ''
  },
  // 最後修改資料的人
  last_edit_person: {
    type: String,
    default: ''
  },
  // 安全庫存警告
  stock_alert: {
    type: String,
    default: ''
  },
  // 第一層的 _id
  level_one_id: {
    type: String,
    default: ''
  },
  // 第二層的 _id
  level_two_id: {
    type: String,
    default: ''
  },
  // 原料種類 1.一般原物料  2.轉印布料 3.非轉印布料
  // 4.配件專用，需版型寬，版型高，布料種類，平車費用，裁切費用
  // 5.紙  6.墨  7.紙箱  8.運費
  kind: {
    type: Number
  },

  // 這邊是代表管理頁面，那個供應商可以看到，這邊會讀取 supplier 的資料
  material_onwer: {
    type: String,
    default: ''
  },
  // 倉庫的關聯欄位，storage 的原料會有很多的孩子
  // 一但有孩子連結上的狀態，就無法刪除
  // 這邊會是 materila 的 _id
  my_children: {
    type: Array,
    default: []
  }
})

// 共享的模式结构
const UnitConversationRateSchema = new Schema({
  create_date: {
    type: Date,
    default: Date.now
  },
  // 識別代號，獨一無二
  type: {
    type: Number, unique: true
  },
  // 中文名稱
  name: {
    type: String
  },
  conversation_rate: {
    type: Number
  },
  // 註解
  describe: {
    type: String,
    default: ''
  }
})

// eslint-disable-next-line no-undef
// module.exports = Material = mongoose.model('materials', MaterialSchema)

// // eslint-disable-next-line no-undef
module.exports = {
  Material: mongoose.model('materials', MaterialSchema),
  MaterialStorage: mongoose.model('material_storages', MaterialStorageSchema),
  UnitConversationRate: mongoose.model('unit_conversation_rates', UnitConversationRateSchema)
}
