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
  company_email: {
    type: String
  },
  company_address: {
    type: String
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
  payment: {
    type: Number
  },
  payment_date: {
    type: Number
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
  service_sales: {
    type: String
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
    }
  }
})

// eslint-disable-next-line no-undef
module.exports = {
  Customer: mongoose.model('customers', CustomerSchema),
  CustomerClass: mongoose.model('customer_classes', CustomerClassSchema),
  CustomerTitle: mongoose.model('customer_titles', CustomerTitleSchema)
}
