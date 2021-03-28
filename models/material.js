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
    type: String
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
    type: String
  },
  // 追加的耗材，這邊只根據紙跟布料去計算
  additional_height: {
    type: String
  },
  // 當選擇 4 配件專用的時候，要決定要不要智慧排版
  typesetting: {
    type: Boolean
  }
})

// eslint-disable-next-line no-undef
module.exports = Material = mongoose.model('materials', MaterialSchema)
