const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 員工權限
const EmployeeAuthoritySchema = new Schema({
  create_date: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String
  },
  name: {
    type: String
  },
  imgs: {
    type: [String]
  },
  kind: {
    type: Number,
    default: 0
  }
})

// 員工職務類別
const EmployeeJobClassSchema = new Schema({
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

// 員工職稱
const EmployeeJobTitleSchema = new Schema({
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

// 員工支付薪資方式
const EmployeePaymentSchema = new Schema({
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

// eslint-disable-next-line no-undef
module.exports = {
  EmployeeAuthority: mongoose.model('employee_authority', EmployeeAuthoritySchema),
  EmployeeJobClass: mongoose.model('employee_job_class', EmployeeJobClassSchema),
  EmployeeJobTitle: mongoose.model('employee_job_title', EmployeeJobTitleSchema),
  EmployeePayment: mongoose.model('employee_payment', EmployeePaymentSchema)
}
