// @login & registerModule
const express = require('express')
const router = express.Router()
const passport = require('passport')

// 引入 categroies 才可以做查詢
const SupplierClass = require('../../models/SupplierClass')

// $router GET api/material-class/test
// @desc   返回的請求的 json 數據
// @access public
router.get('/test', (req, res) => {
  console.log('hi')
  res.json('msg:SupplierClass works')
})

// $router post api/material-class/add
// @desc   創建訊息接口
// @access private
// 使用 hander 要驗證 token
// 使用 body 要放創建的資料 key:value
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const SupplierClassFields = {}

    if (req.body.type) SupplierClassFields.type = req.body.type
    if (req.body.name) SupplierClassFields.name = req.body.name
    if (req.body.describe) SupplierClassFields.describe = req.body.describe

    SupplierClass.findOne({ type: req.body.type }).then((supplierClass) => {
      if (supplierClass) {
        return res.status(400).json('此商品類型(英文)已經存在')
      } else {
        new SupplierClass(SupplierClassFields).save().then((supplierClass) => {
          res.json(supplierClass)
        })
      }
    })
  }
)

// $router get api/material-class
// @desc   獲取所有分類資訊
// @access private
// 使用 hander 要驗證 token
// body 不用放，因為他會獲取所有訊息
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    SupplierClass.find()
      .then((supplierClass) => {
        if (!supplierClass) {
          return res.status(400).json('沒有任何內容')
        }
        res.json(supplierClass)
      })
      .catch((err) => {
        res.status(404).json(err)
      })
  }
)

// $router get api/material-class/:id
// @desc   獲取單個訊息
// @access private
// 使用 hander 要驗證 token
// 使用 params
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    SupplierClass.findOne({ _id: req.params._id })
      .then((supplierClass) => {
        if (!supplierClass) {
          return res.status(400).json('沒有任何內容')
        }
        res.json(supplierClass)
      })
      .catch((err) => {
        res.status(404).json(err)
      })
  }
)

// $router post api/material-class/edit/:id
// @desc   編輯訊息接口
// @access private
// 使用 hander 要驗證 token
// 有看到 post 就代表他會使用到 body 傳遞 數據 {}
// 有看到 /:id 就代表要從 params 接收一個 id 進來
router.post(
  '/edit/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const SupplierClassFields = {}

    if (req.body.type) SupplierClassFields.type = req.body.type
    if (req.body.name) SupplierClassFields.name = req.body.name
    if (req.body.describe) SupplierClassFields.describe = req.body.describe

    SupplierClass.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: SupplierClassFields },
      { new: true }
    ).then((supplierClass) => res.json(supplierClass))
  }
)

// $router delete api/material-class/delete/:id
// @desc   刪除訊息接口
// @access private
// 選擇 delete
// 使用 hander 要驗證 token
// body 要放編輯的資料 key:value
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    SupplierClass.findOneAndRemove({ _id: req.params.id })
      .then((supplierClass) => res.json(supplierClass))
      .catch((_err) => res.status(404).json('刪除失敗'))
  }
)
module.exports = router
