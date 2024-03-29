const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CustomerClassSchema = new Schema({
  create_date: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String
  },
  name: {
    type: String
  }
})

const CustomerTitleSchema = new Schema({
  create_date: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String
  },
  name: {
    type: String
  }
})

// Creat Schema
const CustomerSchema = new Schema({
  create_date: {
    type: Date,
    default: Date.now
  },
  customer_class: {
    type: String
  },
  customer_type: {
    type: String
  },
  company: {
    type: String
  },
  tax_id_number: {
    type: String
  },
  company_name: {
    type: String
  },
  company_line: {
    type: String,
    default: ''
  },
  company_sumame: {
    type: String
  },
  company_cellphone: {
    type: String
  },
  company_email: {
    type: String
  },
  company_fullname: {
    type: String
  },
  // 城市
  company_city: {
    type: String
  },
  // 國家 / 地區
  company_country: {
    type: String
  },
  // 新店區
  company_region: {
    type: String
  },
  contact_person_name: {
    type: String
  },
  contact_person_title: {
    type: String
  },
  contact_person_cell_phone: {
    type: String
  },
  // 聯絡人被注事項
  contact_person_memo: {
    type: String
  },
  // 聯絡人信箱
  contact_person_email: {
    type: String
  },
  // 聯絡人市電
  contact_person_telephone: {
    type: String
  },
  accounting_person_name: {
    type: String
  },
  accounting_person_title: {
    type: String
  },
  accounting_person_cell_phone: {
    type: String
  },
  // 聯絡人被注事項
  accounting_person_memo: {
    type: String
  },
  // 聯絡人信箱
  accounting_person_email: {
    type: String
  },
  // 聯絡人市電
  accounting_person_telephone: {
    type: String
  },
  other_person_name: {
    type: String
  },
  other_person_title: {
    type: String
  },
  other_person_cell_phone: {
    type: String
  },
  other_person_memo: {
    type: String
  },
  other_person_email: {
    type: String
  },
  other_person_telephone: {
    type: String
  },
  company_telephone: {
    type: String
  },
  company_fax: {
    type: String
  },
  company_postal: {
    type: String
  },
  company_address: {
    type: String
  },
  invoice_sumame: {
    type: String
  },
  invoice_tax_id: {
    type: String
  },
  invoice_company: {
    type: String
  },
  invoice_fullname: {
    type: String
  },
  invoice_delivery: {
    type: Number,
    default: 0
  },
  invoice_address: {
    type: String
  },
  invoice_postal: {
    type: String
  },
  invoice_name: {
    type: String
  },
  invoice_cell_phone: {
    type: String
  },
  invoice_telephone: {
    type: String
  },
  invoice_memo: {
    type: String
  },
  // 城市
  invoice_city: {
    type: String
  },
  // 國家 / 地區
  invoice_country: {
    type: String
  },
  // 新店區
  invoice_region: {
    type: String
  },
  product_invoice_tax_id: {
    type: String
  },
  product_invoice_company: {
    type: String
  },
  product_invoice_sumame: {
    type: String
  },
  product_invoice_fullname: {
    type: String
  },
  product_invoice_delivery: {
    type: Number,
    default: 0
  },
  product_invoice_type: {
    type: Number,
    default: 0
  },
  product_invoice_address: {
    type: String
  },
  product_invoice_postal: {
    type: String
  },
  product_invoice_name: {
    type: String
  },
  product_invoice_cell_phone: {
    type: String
  },
  product_invoice_telephone: {
    type: String
  },
  product_invoice_memo: {
    type: String
  },
  // 城市
  product_invoice_city: {
    type: String
  },
  // 國家 / 地區
  product_invoice_country: {
    type: String
  },
  // 新店區
  product_invoice_region: {
    type: String
  },
  payment: {
    type: Number
  },
  payment_date: {
    type: Number
  },
  sample_sumame: {
    type: String
  },
  sample_fullname: {
    type: String
  },
  sample_address: {
    type: String
  },
  sample_postal: {
    type: String
  },
  sample_name: {
    type: String
  },
  sample_cell_phone: {
    type: String
  },
  sample_telephone: {
    type: String
  },
  sample_memo: {
    type: String
  },
  sample_delivery: {
    type: Number
  },
  goods_sumame: {
    type: String
  },
  goods_fullname: {
    type: String
  },
  goods_address: {
    type: String
  },
  goods_postal: {
    type: String
  },
  goods_name: {
    type: String
  },
  goods_cell_phone: {
    type: String
  },
  goods_telephone: {
    type: String
  },
  goods_memo: {
    type: String
  },
  goods_delivery: {
    type: Number
  },
  // 城市
  goods_city: {
    type: String
  },
  // 國家 / 地區
  goods_country: {
    type: String
  },
  // 新店區
  goods_region: {
    type: String
  },
  delivery_charge: {
    type: Number
  },
  delivery_charge_fee: {
    type: String
  },
  remarks: {
    type: String
  },
  invoice_contact_person_name: {
    type: String
  },
  invoice_contact_person_phone: {
    type: String
  },
  postal: {
    type: String
  },
  invoice_type: {
    type: Number
  },
  order: {
    type: String
  },
  level: {
    type: Number
  },
  area: {
    type: String
  },
  facebook: {
    type: String
  },
  website: {
    type: String
  },
  instagram: {
    type: String
  },
  pinkoi: {
    type: String
  },
  activated: {
    type: Number
  },
  // 客戶資料的唯一識別鍵為 email 這邊使用的是 nuxt 裡面是userName
  primary_key: {
    type: String
  },
  // nuxt 裡面是抓 userUid firebase裡面的
  second_key: {
    type: String
  },
  // 我的最愛
  favorite: {
    type: Array
  },

  switch: {
    type: Boolean
  },
  service_sales_uid: {
    type: String,
    default: ''
  },
  nick_name: {
    type: String,
    default: ''
  },
  employee_data: {
    authority: {
      type: Array
    },
    number: {
      type: String
    },
    job_class: {
      type: String
    },
    join_date: {
      type: Date
    },
    name: {
      type: String
    },
    english_name: {
      type: String
    },
    job_title: {
      type: String
    },
    date_of_birth: {
      type: Date
    },
    gender: {
      type: String
    },
    telephone: {
      type: String
    },
    cellphone: {
      type: String
    },
    email: {
      type: String
    },
    address: {
      type: String
    },
    payment: {
      type: String
    },
    payment_account: {
      type: String
    },
    emergency_contact: {
      type: String
    },
    emergency_phone: {
      type: String
    },
    remarks: {
      type: String
    },
    is_employee: {
      type: Boolean,
      default: false
    },
    is_sales: {
      type: Boolean,
      default: false
    }
  }
})

// eslint-disable-next-line no-undef
module.exports = {
  Customer: mongoose.model('customers', CustomerSchema),
  CustomerClass: mongoose.model('customer_classes', CustomerClassSchema),
  CustomerTitle: mongoose.model('customer_titles', CustomerTitleSchema)
}
