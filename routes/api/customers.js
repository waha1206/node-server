// @login & registerModule
const express = require('express')
const router = express.Router()
const passport = require('passport')

// 引入 User 才可以做查詢
const {
  Customer,
  CustomerClass,
  CustomerTitle
} = require('../../models/Customer')

// $router GET api/customer/test
// @desc   返回的請求的 json 數據
// @access public
router.get('/test', (req, res) => {
  res.json('msg:login works')
})

// $router POST api/customer/register
// @desc   返回的請求的 json 數據
// @access public
router.post(
  '/upload',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(req.body)
    console.log(req.body.length)

    const customers = new Array(req.body.length)

    for (let i = 0; i < req.body.length; i++) {
      const customer = new Customer({
        create_date: req.body[i].create_date,
        customer_type: req.body[i].customer_type,
        company: req.body[i].company,
        contact_person_name: req.body[i].contact_person_name,
        contact_person_cell_phone: req.body[i].contact_person_cell_phone,
        company_telephone: req.body[i].company_telephone,
        company_fax: req.body[i].company_fax,
        company_email: req.body[i].company_email,
        company_address: req.body[i].company_address,
        invoice_address: req.body[i].invoice_address,
        sample_address: req.body[i].sample_address,
        payment_terms: req.body[i].payment_terms,
        invoice_contact_person_name: req.body[i].invoice_contact_person_name,
        invoice_contact_person_phone: req.body[i].invoice_contact_person_phone,
        postal: req.body[i].postal
      })
      customers.push(customer)
    }

    Customer.insertMany(customers)
      .then((ok) => {
        res.json('msg:chats works')
      })
      .catch((err) => {
        return console.log(err)
      })
  }
)

// $router POST api/customer/login
// @desc   返回 token jwt passport
// @access public

// $router GET api/customer/all
// @desc   取得所有使用者資料
// @access Private
router.post(
  '/search',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Customer.find({ company: { $regex: req.body.key } }).then((customers) => {
      res.json(customers)
    })
  }
)
// ***************************************** class 的 api *****************************************
// $router post api/cistomer/class/add
// @desc   創建訊息接口
// @access private
// 使用 hander 要驗證 token
// 使用 body 要放創建的資料 type name
router.post(
  '/class/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const customerFields = {}

    // 傳送過來的資料不見得會跟 schema 會一樣
    if (req.body.type) customerFields.type = req.body.type
    if (req.body.name) customerFields.name = req.body.name

    // console.log(categoriesFields)
    CustomerClass.findOne({ name: req.body.name }).then((customerClass) => {
      if (customerClass) {
        return res.status(400).json('此客戶分類已經存在')
      } else {
        new CustomerClass(customerFields)
          .save()
          .then((customerClass) => {
            res.json(customerClass)
          })
          .catch((err) => {
            res.status(404).json(err)
          })
      }
    })
  }
)

// $router get api/cistomer/class
// @desc   取得所有的 cumtomerClass 的資料
// @access private
// 使用 hander 要驗證 token
router.get(
  '/class',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    CustomerClass.find()
      .sort({ type: 1 })
      .then((customerClasses) => {
        if (!customerClasses) {
          return res.status(400).json('沒有任何內容')
        }
        res.json(customerClasses)
      })
      .catch((err) => {
        res.status(404).json(err)
      })
  }
)

// $router post api/customer/class/edit/:id
// @desc   編輯訊息接口
// @access private
// 使用 hander 要驗證 token
// 有看到 post 就代表他會使用到 body 傳遞 數據 {}
// 有看到 /:id 就代表要從 params 接收一個 id 進來
router.post(
  '/class/edit/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const customerFields = {}
    console.log(req.params)
    if (req.body.type) customerFields.type = req.body.type
    if (req.body.name) customerFields.name = req.body.name

    CustomerClass.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: customerFields },
      { new: false }
    ).then((customer) => res.json(customer))
  }
)

// $router delete api/customer/class/delete/:id
// @desc   刪除訊息接口
// @access private
// 選擇 delete
// 使用 hander 要驗證 token
// body 要放編輯的資料 key:value
router.delete(
  '/class/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    CustomerClass.findOneAndRemove({ _id: req.params.id })
      .then((customer) => res.json(customer))
      .catch((_err) => res.status(404).json('刪除失敗'))
  }
)
// ***************************************** class 的 api 結束 *****************************************

// ***************************************** title 的 api *****************************************
// $router post api/cistomer/title/add
// @desc   創建訊息接口
// @access private
// 使用 hander 要驗證 token
// 使用 body 要放創建的資料 type name
router.post(
  '/title/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const customerTitleFields = {}

    // 傳送過來的資料不見得會跟 schema 會一樣
    if (req.body.type) customerTitleFields.type = req.body.type
    if (req.body.name) customerTitleFields.name = req.body.name

    // console.log(categoriesFields)
    CustomerTitle.findOne({ name: req.body.name }).then((customerTitle) => {
      if (customerTitle) {
        return res.status(400).json('此客戶分類已經存在')
      } else {
        new CustomerTitle(customerTitleFields)
          .save()
          .then((customerTitle) => {
            res.json(customerTitle)
          })
          .catch((err) => {
            res.status(404).json(err)
          })
      }
    })
  }
)

// $router get api/cistomer/title
// @desc   取得所有的 cumtomerClass 的資料
// @access private
// 使用 hander 要驗證 token
router.get(
  '/title',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    CustomerTitle.find()
      .sort({ type: 1 })
      .then((customerTitles) => {
        if (!customerTitles) {
          return res.status(400).json('沒有任何內容')
        }
        res.json(customerTitles)
      })
      .catch((err) => {
        res.status(404).json(err)
      })
  }
)

// $router post api/customer/title/edit/:id
// @desc   編輯訊息接口
// @access private
// 使用 hander 要驗證 token
// 有看到 post 就代表他會使用到 body 傳遞 數據 {}
// 有看到 /:id 就代表要從 params 接收一個 id 進來
router.post(
  '/title/edit/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const customerTitleFields = {}
    console.log(req.params)
    if (req.body.type) customerTitleFields.type = req.body.type
    if (req.body.name) customerTitleFields.name = req.body.name

    CustomerTitle.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: customerTitleFields },
      { new: false }
    ).then((customerTitles) => res.json(customerTitles))
  }
)

// $router delete api/customer/title/delete/:id
// @desc   刪除訊息接口
// @access private
// 選擇 delete
// 使用 hander 要驗證 token
// body 要放編輯的資料 key:value
router.delete(
  '/title/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    CustomerTitle.findOneAndRemove({ _id: req.params.id })
      .then((customerTitle) => res.json(customerTitle))
      .catch((_err) => res.status(404).json('刪除失敗'))
  }
)
// ***************************************** title 的 api 結束 *****************************************

// ***************************************** customer 的 api *****************************************
// $router post api/customer/add
// @desc   創建訊息接口
// @access private
// 使用 hander 要驗證 token
// 使用 body 要放創建的資料 key:value
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const customerFields = {}

    for (const prop in req.body) {
      if (prop !== 'imgs') {
        customerFields[prop] = req.body[prop]
      } else if (prop === 'imgs') {
        if (req.body[prop].length > 0) {
          customerFields[prop] = req.body.imgs.split('|')
        } else {
          customerFields[prop] = []
        }
      }
    }

    Customer.findOne({ company: req.body.company }).then((customer) => {
      if (customer) {
        return res.status(400).json('此原物料的名稱已經存在')
      } else {
        new Customer(customerFields).save().then((customer) => {
          res.json(customer)
        })
      }
    })
  }
)

// $router get api/cistomer/customer
// @desc   取得所有的 cumtomer 的資料
// @access private
// 使用 hander 要驗證 token
router.get(
  '/customer',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Customer.find()
      .sort({ type: 1 })
      .then((customers) => {
        if (!customers) {
          return res.status(400).json('沒有任何內容')
        }
        res.json(customers)
      })
      .catch((err) => {
        res.status(404).json(err)
      })
  }
)

// $router post api/customer/customer/edit/:id
// @desc   編輯訊息接口
// @access private
// 使用 hander 要驗證 token
// 有看到 post 就代表他會使用到 body 傳遞 數據 {}
// 有看到 /:id 就代表要從 params 接收一個 id 進來
router.post(
  '/edit/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const customerFields = {}
    for (const prop in req.body) {
      customerFields[prop] = req.body[prop]
    }
    console.log('/edit/:id', req.body)

    Customer.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: customerFields },
      { new: false }
    ).then((customer) => res.json(customer))
  }
)

// $router get api/customer/name-and-id
// @desc   取得所有的 cumtomer 的資料
// @access private
// 使用 hander 要驗證 token
router.get(
  '/name-and-id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const query = {}
    const options = {
      _id: 1,
      company: 1
    }
    Customer.find(query, options)
      // .sort({ type: 1 })
      .then((customers) => {
        if (!customers) {
          return res.status(400).json('沒有任何客戶資料')
        }
        res.json(customers)
      })
      .catch((err) => {
        res.status(404).json(err)
      })
  }
)
// ***************************************** customer 的 api 結束 *****************************************

module.exports = router
