// @login & registerModule
const express = require('express')
const router = express.Router()
const passport = require('passport')

// 引入 Profile 才可以做查詢
const Profile = require('../../models/Profile')

// $router GET api/profiles/test
// @desc   返回的請求的 json 數據
// @access public
router.get('/test', (req, res) => {
  console.log('hi')
  res.json('msg:profile works')
})

// $router post api/profiles/add
// @desc   創建訊息接口
// @access private
// 使用 hander 要驗證 token
// 使用 body 要放創建的資料 key:value
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const profileFields = {}

    if (req.body.type) profileFields.type = req.body.type
    if (req.body.describe) profileFields.describe = req.body.describe
    if (req.body.income) profileFields.income = req.body.income
    if (req.body.expend) profileFields.expend = req.body.expend
    if (req.body.cash) profileFields.cash = req.body.cash
    if (req.body.remark) profileFields.remark = req.body.remark

    new Profile(profileFields).save().then((profile) => {
      res.json(profile)
    })
  }
)

// $router get api/profiles
// @desc   獲取所有訊息
// @access private
// 使用 hander 要驗證 token
// body 不用放，因為他會獲取所有訊息
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.find()
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

// $router get api/profiles/:id
// @desc   獲取單個訊息
// @access private
// 使用 hander 要驗證 token
// 使用 params
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ _di: req.params._id })
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

// $router post api/profiles/edit/:id
// @desc   編輯訊息接口
// @access private
// 使用 hander 要驗證 token
// 有看到 post 就代表他會使用到 body 傳遞 數據 {}
// 有看到 /:id 就代表要從 params 接收一個 id 進來
router.post(
  '/edit/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const profileFields = {}

    if (req.body.type) profileFields.type = req.body.type
    if (req.body.describe) profileFields.describe = req.body.describe
    if (req.body.income) profileFields.income = req.body.income
    if (req.body.expend) profileFields.expend = req.body.expend
    if (req.body.cash) profileFields.cash = req.body.cash
    if (req.body.remark) profileFields.remark = req.body.remark

    Profile.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: profileFields },
      { new: true }
    ).then((profile) => res.json(profile))
  }
)

// $router delete api/profiles/delete/:id
// @desc   刪除訊息接口
// @access private
// 選擇 delete
// 使用 hander 要驗證 token
// body 要放編輯的資料 key:value
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ _id: req.params.id })
      .then((profile) => res.json(profile))
      .catch((_err) => res.status(404).json('刪除失敗'))
  }
)
module.exports = router
