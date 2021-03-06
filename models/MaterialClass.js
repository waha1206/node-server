const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creat Schema
const MaterialClassSchema = new Schema({
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
    type: String
  }
})

const MaterialLevelTwoClassSchema = new Schema({
  create_date: {
    type: Date,
    default: Date.now
  },
  level_one_id: {
    type: String
  },
  level_one_name: {
    type: String
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
    type: String
  }
})

// eslint-disable-next-line no-undef
module.exports = MaterialClass = mongoose.model(
  'material_classes',
  MaterialClassSchema
)

// eslint-disable-next-line no-undef
module.exports = {
  MaterialClass: mongoose.model('material_classes', MaterialClassSchema),
  MaterialLevelTwoClass: mongoose.model(
    'material_level_two_classes',
    MaterialLevelTwoClassSchema
  )
}
