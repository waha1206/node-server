const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 設定功能，關於使用 ink paper 等 耗材資料
const Setting = new Schema({
  paper: {
    type: String
  },
  ink: {
    type: String
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

// 其他設定 - 用途先保留
const OtherSetting = new Schema({
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

// eslint-disable-next-line no-undef
module.exports = {
  Setting: mongoose.model('settings', Setting),
  OtherSetting: mongoose.model('other_settings', OtherSetting)
}
