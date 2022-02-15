const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 第一層的架構 SS TD TF ... ect
const MaterialGroupOneSchema = new Schema({
  type: {
    type: String,
    required: [true, '商品類別必填']
  },
  name: {
    type: String,
    required: true
  },
  imgs: {
    type: String
  },
  describe: {
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
const MaterialGroupTwoSchema = new Schema({
  type: {
    type: String,
    required: [true, '商品類別必填']
  },
  name: {
    type: String,
    required: true
  },
  imgs: {
    type: String
  },
  describe: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
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
  }
})

// 第三層的架構，原物料成員的組合
const MaterialGroupMemberSchema = new Schema({
  type: {
    type: String,
    required: [true, '商品類別必填']
  },
  name: {
    type: String,
    required: true
  },
  choice_level_three_material: {
    type: Array
  },
  // 存放 第一層與第二層的分類 id [id1, id2]
  choiceLevelTwoValue: {
    type: Array
  },
  // 客戶端，客戶會看到的顯示名稱
  web_side_name: {
    type: String,
    required: true
  },
  imgs: {
    type: [String]
  },
  // 加工費用
  processing_fee: {
    type: String
  },
  // 原料成員
  member: [
    {
      material_name: { type: String },
      material_id: { type: String }
    }
  ],
  // 哪個物件使用到這個原料組合
  tag_me: [
    {
      category_name: { type: String },
      category_id: { type: String }
    }
  ],
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
    type: String
  },
  level_one_id: {
    type: String
  },
  last_edit_person: {
    type: String
  },
  last_modify_date: {
    type: Date
  },
  // 原物料組分類，很重要
  kind: {
    type: Number
  },
  // 客戶選擇原料的時候所看到的說明
  select_description: {
    type: String
  }
})

// eslint-disable-next-line no-undef
module.exports = {
  MaterialGroupOne: mongoose.model('material-group-ones', MaterialGroupOneSchema),
  MaterialGroupTwo: mongoose.model('material-group-twos', MaterialGroupTwoSchema),
  MaterialGroupMember: mongoose.model('material_group_members', MaterialGroupMemberSchema)
}
