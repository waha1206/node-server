// @login & registerModule
const express = require('express')
const router = express.Router()
const passport = require('passport')

// 引入 suppliers 才可以做查詢
const Supplier = require('../../models/Supplier')

// $router GET api/supplier/test
// @desc   返回的請求的 json 數據
// @access public
router.get('/test', (req, res) => {
  res.json('msg:supplier works')
})

// $router GET api/supplier/
// @desc   取得所有使用者資料
// @access Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Supplier.find({}, null, { limit: 10 }).then((supplier) => {
      // Material.find().then((materials) => {
      if (!supplier) {
        return res.status(400).json('沒有任何原物料資訊')
      }
      res.json(supplier)
    })
  }
)

// $router post api/supplier/get-from-class/:class
// @desc   編輯訊息接口
// @access private
// 使用 hander 要驗證 token
// 有看到 post 就代表他會使用到 body 傳遞 數據 {}
// 有看到 /:id 就代表要從 params 接收一個 id 進來
// 這個接口是根據 class 返回 符合該分類的原料資訊 class = _id
router.get(
  '/get-from-class/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.params.id !== '5ffab3a6e9ef2204146af688') {
      Supplier.find({ supplier_class: req.params.id }, null, {}).then(
        (supplier) => {
          // Material.find().then((supplier) => {
          if (!supplier) {
            return res.status(400).json('沒有任何原物料資訊')
          }
          res.json(supplier)
        }
      )
    } else {
      Supplier.find({}, null, {}).then((supplier) => {
        // Material.find().then((materials) => {
        if (!supplier) {
          return res.status(400).json('沒有任何原物料資訊')
        }
        res.json(supplier)
      })
    }
  }
)

// $router post api/supplier/edit/:id
// @desc   編輯訊息接口
// @access private
// 使用 hander 要驗證 token
// 有看到 post 就代表他會使用到 body 傳遞 數據 {}
// 有看到 /:id 就代表要從 params 接收一個 id 進來
router.post(
  '/edit/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const supplierFields = {}

    // if (req.body.type) materialClassFields.type = req.body.type
    // if (req.body.name) materialClassFields.name = req.body.name
    // if (req.body.describe) materialClassFields.describe = req.body.describe

    console.log(req.body)

    for (const prop in req.body) {
      supplierFields[prop] = req.body[prop]
    }

    console.log(supplierFields)

    Supplier.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: supplierFields },
      { new: true }
    ).then((materials) => res.json(materials))
  }
)

// $router post api/supplier/add
// @desc   創建訊息接口
// @access private
// 使用 hander 要驗證 token
// 使用 body 要放創建的資料 key:value
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const supplierFields = {}

    for (const prop in req.body) {
      if (req.body[prop] !== '') {
        supplierFields[prop] = req.body[prop]
      }
    }
    Supplier.findOne({ company: req.body.company }).then((supplier) => {
      if (supplier) {
        return res.status(400).json('此原物料的名稱已經存在')
      } else {
        new Supplier(supplierFields).save().then((supplier) => {
          res.json(supplier)
        })
      }
    })
  }
)

module.exports = router
