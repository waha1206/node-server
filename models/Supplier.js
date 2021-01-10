const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creat Schema
const SupplierSchema = new Schema({
  create_date: {
    type: Date,
    default: Date.now
  },
  company: {
    type: String,
    required: [true, '供應商名稱']
  },
  supplier_class: {
    type: String
  },
  tax_id_number: {
    type: String
  },
  registered_capital: {
    type: String
  },
  bank_account: {
    type: String
  },
  sales_name: {
    type: String
  },
  sales_cell_phone: {
    type: String
  },
  sales_telephone: {
    type: String
  },
  sales_email: {
    type: String
  },
  accounting_name: {
    type: String
  },
  accounting_cell_phone: {
    type: String
  },
  accounting_telephone: {
    type: String
  },
  accounting_mail: {
    type: String
  },
  company_telephone: {
    type: String
  },
  company_fax: {
    type: String
  },
  company_address: {
    type: String
  },
  storefront_telephone: {
    type: String
  },
  storefront_fax: {
    type: String
  },
  storefront_address: {
    type: String
  },
  website: {
    type: String
  },
  payment_terms: {
    type: String
  },
  major_products: {
    type: String
  },
  delivery: {
    type: String
  },
  remarks: {
    type: String
  },
  last_edit_person: {
    type: String
  },
  last_modify_date: {
    type: Date
  }
})

// eslint-disable-next-line no-undef
module.exports = Supplier = mongoose.model('suppliers', SupplierSchema)
