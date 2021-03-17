const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creat Schema
const UserTitleSchema = new Schema({
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

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, '使用者名稱必填']
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
  // 是否允許客戶訪問網站
  activated: {
    type: Boolean,
    default: false
  },
  permission: {
    permission_list: [],
    // 供應商權限 inquire 只能讀取，edit 可以編輯寫入
    supplier_authority: {
      inquire: {
        type: Boolean,
        default: false
      },
      edit: {
        type: Boolean,
        default: false
      }
    },
    // 原物料權限
    material_authority: {
      inquire: {
        type: Boolean,
        default: false
      },
      edit: {
        type: Boolean,
        default: false
      }
    },
    // 使用者權限
    user_authority: {
      inquire: {
        type: Boolean,
        default: false
      },
      edit: {
        type: Boolean,
        default: false
      }
    },
    // 客戶管理權限
    customer_authority: {
      inquire: {
        type: Boolean,
        default: false
      },
      edit: {
        type: Boolean,
        default: false
      }
    },
    // 報價單管理權限
    quotation_authority: {
      inquire: {
        type: Boolean,
        default: false
      },
      edit: {
        type: Boolean,
        default: false
      }
    },
    // 輸出管理權限
    print_authority: {
      inquire: {
        type: Boolean,
        default: false
      },
      edit: {
        type: Boolean,
        default: false
      }
    },
    // 布料轉印管理權限
    sublimation_authority: {
      inquire: {
        type: Boolean,
        default: false
      },
      edit: {
        type: Boolean,
        default: false
      }
    },
    // 配送管理
    delivery_authority: {
      inquire: {
        type: Boolean,
        default: false
      },
      edit: {
        type: Boolean,
        default: false
      }
    },
    // 會計系統管理
    accounting_authority: {
      inquire: {
        type: Boolean,
        default: false
      },
      edit: {
        type: Boolean,
        default: false
      }
    },
    // 產品系統管理
    product_authority: {
      inquire: {
        type: Boolean,
        default: false
      },
      edit: {
        type: Boolean,
        default: false
      }
    },
    // 加工系統管理
    process_authority: {
      inquire: {
        type: Boolean,
        default: false
      },
      edit: {
        type: Boolean,
        default: false
      }
    }
  },
  last_edit_person: {
    type: String
  },
  last_modify_date: {
    type: Date
  },
  date: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String
  }
})

// eslint-disable-next-line no-undef
module.exports = {
  User: mongoose.model('users', UserSchema),
  UserTitle: mongoose.model('user_titles', UserTitleSchema)
}
