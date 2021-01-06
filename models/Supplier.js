const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creat Schema
const SupplierSchema = new Schema({
  name: {
    type: String,
    required: [true, '客戶名稱']
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  identity: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

// eslint-disable-next-line no-undef
module.exports = Supplier = mongoose.model('suppliers', SupplierSchema)
