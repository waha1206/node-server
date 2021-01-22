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
    type: String
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
    type: String
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
    type: String
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
  level_two_id: {
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
