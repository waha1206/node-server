const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creat Schema
const SupplierClassSchema = new Schema({
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

// eslint-disable-next-line no-undef
module.exports = SupplierClass = mongoose.model(
  'supplier_classes',
  SupplierClassSchema
)
