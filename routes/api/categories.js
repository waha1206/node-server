// @login & registerModule
const express = require('express')
const router = express.Router()
const passport = require('passport')

// 引入 categroies 才可以做查詢
const Categories = require('../../models/Categories')

// $router GET api/categories/test
// @desc   返回的請求的 json 數據
// @access public
router.get('/test', (req, res) => {
  console.log('hi')
  res.json('msg:categories works')
})

// $router post api/categories/add
// @desc   創建訊息接口
// @access private
// 使用 hander 要驗證 token
// 使用 body 要放創建的資料 key:value
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const categoriesFields = {}

    if (req.body.type) categoriesFields.type = req.body.type
    if (req.body.name) categoriesFields.name = req.body.name

    Categories.findOne({ type: req.body.type }).then((category) => {
      if (category) {
        return res.status(400).json('此商品類型(英文)已經存在')
      } else {
        new Categories(categoriesFields).save().then((category) => {
          res.json(category)
        })
      }
    })
  }
)

// $router get api/categories
// @desc   獲取所有訊息
// @access private
// 使用 hander 要驗證 token
// body 不用放，因為他會獲取所有訊息
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Categories.find()
      .then((categories) => {
        if (!categories) {
          return res.status(400).json('沒有任何內容')
        }
        res.json(categories)
      })
      .catch((err) => {
        res.status(404).json(err)
      })
  }
)

// $router get api/profiles/:id
// @desc   獲取單個訊息
// @access private
// 使用 hander 要驗證 token
// 使用 params
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Categories.findOne({ _di: req.params._id })
      .then((profile) => {
        if (!profile) {
          return res.status(400).json('沒有任何內容')
        }
        res.json(profile)
      })
      .catch((err) => {
        res.status(404).json(err)
      })
  }
)

// $router post api/categories/edit/:id
// @desc   編輯訊息接口
// @access private
// 使用 hander 要驗證 token
// 有看到 post 就代表他會使用到 body 傳遞 數據 {}
// 有看到 /:id 就代表要從 params 接收一個 id 進來
router.post(
  '/edit/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const categoryFields = {}

    if (req.body.type) categoryFields.type = req.body.type
    if (req.body.name) categoryFields.name = req.body.name

    Categories.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: categoryFields },
      { new: true }
    ).then((categories) => res.json(categories))
  }
)

// $router delete api/categories/delete/:id
// @desc   刪除訊息接口
// @access private
// 選擇 delete
// 使用 hander 要驗證 token
// body 要放編輯的資料 key:value
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Categories.findOneAndRemove({ _id: req.params.id })
      .then((categories) => res.json(categories))
      .catch((_err) => res.status(404).json('刪除失敗'))
  }
)
module.exports = router