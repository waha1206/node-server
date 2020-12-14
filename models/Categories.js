const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creat Schema
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
  }
})

// eslint-disable-next-line no-undef
module.exports = Categroy = mongoose.model('categroies', CategroySchema)
