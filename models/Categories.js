const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 第一層的架構 SS TD TF ... ect
const CategroySchema = new Schema({
  type: {
    type: String,
    required: [true, '商品類別必填']
  },
  name: {
    type: String,
    required: true
  },
  img: {
    type: String
  },
  // 商品圖片
  imgs: {
    type: [String]
  },
  describe: {
    type: String
  },
  last_modify_user: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  last_edit_person: {
    type: String
  },
  last_modify_date: {
    type: Date
  }
})

// 第二層的架構 0001 小物包
const CategoryLevelTwoSchema = new Schema({
  type: {
    type: String,
    required: [true, '商品類別必填']
  },
  name: {
    type: String,
    required: true
  },
  img: {
    type: String
  },
  imgs: {
    type: [String]
  },
  describe: {
    type: String
  },
  last_modify_user: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  level_one_id: {
    type: String,
    required: [true, '多對一必填寫primarykey']
  },
  last_edit_person: {
    type: String
  },
  last_modify_date: {
    type: Date
  },
  // 縮略圖 180*180 pix
  thumbnail: {
    type: [String]
  }
})

// 第三層的架構，匯集原物料的地方
const CategoryLevelThreeSchema = new Schema({
  type: {
    type: String,
    required: [true, '商品類別必填']
  },
  name: {
    type: String,
    required: true
  },
  img: {
    type: String
  },
  imgs: {
    type: [String]
  },
  // 版型編號
  pattern_no: {
    type: String
  },
  // 是否允許版型下載
  pattern_free: {
    type: Boolean,
    default: false
  },
  // 版型下載
  pattern_download: {
    type: String
  },
  // 版型高度
  pattern_height: {
    type: Number
  },
  // 版型寬度
  pattern_width: {
    type: Number
  },
  // 校色的影片網址
  salting_on_color_video: {
    label: { type: String },
    link: { type: String }
  },
  // 商品介紹影片
  introduction_video: {
    label: { type: String },
    link: { type: String }
  },
  // 商品製作須知 (一)
  note_one_video: {
    label: { type: String },
    link: { type: String }
  },
  // 商品製作須知 (二)
  note_two_video: {
    label: { type: String },
    link: { type: String }
  },
  // 樣品購買的網址
  sample_order: {
    name: { type: String },
    url: { type: String }
  },
  describe: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    activated: {
      type: Boolean,
      dafault: false
    },
    vip: {
      type: Boolean,
      default: false
    },
    new: {
      type: Boolean,
      default: false
    },
    hot: {
      type: Boolean,
      default: false
    },
    discount: {
      type: Boolean,
      default: false
    }
  },
  level_two_id: {
    type: String,
    required: [true, '第二層分類_id必填寫']
  },
  level_one_id: {
    type: String,
    required: [true, '第一層分類_id必填寫']
  },
  last_edit_person: {
    type: String
  },
  last_modify_date: {
    type: Date
  },
  // 存放原料組合
  material_group: {
    type: Array
  },
  tailor_fee: {
    type: String
  },
  crop_fee: {
    type: String
  },
  quantity_profit: {
    type: [
      {
        quantity: { type: String },
        profit: { type: String },
        carton: { type: String },
        net_weight: { type: String }
      }
    ]
  },
  // 可以拆圖的數量
  split_quantity: {
    type: String
  },
  mini_order: {
    type: String
  },
  // 表布版型寬度
  outside_layout_width: {
    type: String
  },
  // 表布版型高度
  outside_layout_height: {
    type: String
  },
  // 表布耗損
  outside_cloth_loss: {
    type: String
  },
  // 內裡版型寬度
  inside_layout_width: {
    type: String
  },
  // 內裡版型高度
  inside_layout_height: {
    type: String
  },
  // 裡布耗損
  inside_cloth_loss: {
    type: String
  },
  // 使用的墨水
  ink_id: {
    type: String
  },
  paper_id: {
    type: String
  },
  delivery_id: {
    type: String
  },
  carton_id: {
    type: String
  },
  // 加工說明
  processing_describe: {
    type: String
  },
  // 智慧排版
  typesetting: {
    type: Boolean
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
  // 切換 商品目錄，還是優惠活動畫面
  switch: {
    type: Boolean
  },
  // 優惠活動開始日期
  start_date_of_discount: {
    type: Date
  },
  // 優惠活動結束日期
  end_date_of_discount: {
    type: Date
  },
  // 優惠活動的敘述
  sales_event_description: {
    type: String
  },
  // 新品的敘述，或是商品完整說明
  new_product_description: {
    type: String
  },
  // banner 圖片
  banner_imgs: {
    type: [String]
  },
  // 是否允許進行打樣
  disable_proofing: {
    type: Boolean,
    default: false
  },
  // 縮略圖 180*180 pix
  thumbnail: {
    type: [String]
  },
  // 縮略圖 720*600 pix
  discount: {
    type: [String]
  }
})

// eslint-disable-next-line no-undef
module.exports = {
  Categories: mongoose.model('categroies', CategroySchema),
  CategoriesLevelTwo: mongoose.model('categroies_level_two', CategoryLevelTwoSchema),
  CategoriesLevelThree: mongoose.model('categroies_level_three', CategoryLevelThreeSchema)
}
