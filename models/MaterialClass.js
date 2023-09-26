const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 共享的模式结构
const commonSchema = new Schema({
  create_date: {
    type: Date,
    default: Date.now
  },
  // 英文名稱
  type: {
    type: String
  },
  // 中文名稱
  name: {
    type: String
  },
  // 註解
  describe: {
    type: String,
    default: ''
  },
  // onwer 如果是 麥歐的話：0 如果是其他間的工廠的話：1 ~ n 可自行定義
  onwer: {
    type: Number,
    default: 0
  }
})

// // eslint-disable-next-line no-undef
module.exports = {
  MaterialClass: mongoose.model('material_classes', commonSchema),
  StorageLevelOneClass: mongoose.model('storage_level_one_classes', commonSchema),
  MaterialLevelTwoClass: mongoose.model('material_level_two_classes', commonSchema)
}
