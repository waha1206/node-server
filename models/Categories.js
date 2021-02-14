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
  pattern_download: {
    type: String
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
  }
})

// eslint-disable-next-line no-undef
module.exports = {
  Categories: mongoose.model('categroies', CategroySchema),
  CategoriesLevelTwo: mongoose.model(
    'categroies_level_two',
    CategoryLevelTwoSchema
  ),
  CategoriesLevelThree: mongoose.model(
    'categroies_level_three',
    CategoryLevelThreeSchema
  )
}
