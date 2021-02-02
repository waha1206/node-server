// @login & registerModule
const express = require('express')
const router = express.Router()
const passport = require('passport')

// 引入 categroies 才可以做查詢
const {
  MaterialGroupOne,
  MaterialGroupTwo,
  MaterialGroupMember
} = require('../../models/MaterialGroup')

// $router GET api/categories/test
// @desc   返回的請求的 json 數據
// @access public
router.get('/test', (req, res) => {
  console.log('hi')
  res.json('msg:materal group works')
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
    // 傳送過來的資料格式先建立起來
    const query = [{ name: req.body.name }, { type: req.body.type }]

    const materialGroupFields = {}
    let materialGroupLevel = {}

    switch (req.body.level) {
      case 1:
        materialGroupLevel = MaterialGroupOne
        break
      case 2:
        materialGroupLevel = MaterialGroupTwo
        break
      case 3:
        materialGroupLevel = MaterialGroupMember
        break
      default:
        return res.status(400).json('提交資訊出現異常')
    }

    // 傳送過來的資料不見得會跟 schema 會一樣
    if (req.body.type) materialGroupFields.type = req.body.type
    if (req.body.name) materialGroupFields.name = req.body.name

    materialGroupLevel
      .findOne({
        $or: query
      })
      .then((materialGroup) => {
        if (materialGroup) {
          return res.status(400).json('此商品類型(英文)已經存在')
        } else {
          new materialGroupLevel(materialGroupFields)
            .save()
            .then((materialGroup) => {
              res.json(materialGroup)
            })
            .catch((err) => {
              res.status(404).json(err)
            })
        }
      })
  }
)

// // $router get api/categories
// // @desc   獲取所有分類資訊
// // @access private
// // 使用 hander 要驗證 token
// // body 不用放，因為他會獲取所有訊息
// router.get(
//   '/',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     Categories.find()
//       .then((categories) => {
//         if (!categories) {
//           return res.status(400).json('沒有任何內容')
//         }
//         res.json(categories)
//       })
//       .catch((err) => {
//         res.status(404).json(err)
//       })
//   }
// )

// $router get api/material-group/one
// @desc   獲取所有分類資訊
// @access private
// 使用 hander 要驗證 token
// body 不用放，因為他會獲取所有訊息
router.get(
  '/one',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    MaterialGroupOne.find()
      .sort({ type: 1 })
      .then((materialGroupOne) => {
        if (!materialGroupOne) {
          return res.status(400).json('沒有任何內容')
        }
        res.json(materialGroupOne)
      })
      .catch((err) => {
        res.status(404).json(err)
      })
  }
)

// // $router get api/categories/three
// // @desc   獲取所有分類資訊
// // @access private
// // 使用 hander 要驗證 token
// // body 不用放，因為他會獲取所有訊息
// router.get(
//   '/three/:id',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     // query 選擇的條件
//     // options 0 - 忽略 ， 1 - 放第一層 ， 2 - 放第二層
//     const query = { level_two_id: req.params.id }
//     const options = {
//       // imgs: 0
//     }
//     CategoriesLevelThree.find(query, options)
//       .then((categories) => {
//         if (!categories) {
//           return res.status(400).json('沒有任何內容')
//         }
//         res.json(categories)
//       })
//       .catch((err) => {
//         res.status(404).json(err)
//       })
//   }
// )

// // $router get api/categories/:id
// // @desc   獲取單個訊息
// // @access private
// // 使用 hander 要驗證 token
// // 使用 params
// router.get(
//   '/:id',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     Categories.findOne({ _id: req.params._id })
//       .then((category) => {
//         if (!category) {
//           return res.status(400).json('沒有任何內容')
//         }
//         res.json(category)
//       })
//       .catch((err) => {
//         res.status(404).json(err)
//       })
//   }
// )

// $router post api/material-group/edit/:id
// @desc   編輯訊息接口
// @access private
// 使用 hander 要驗證 token
// 有看到 post 就代表他會使用到 body 傳遞 數據 {}
// 有看到 /:id 就代表要從 params 接收一個 id 進來
router.post(
  '/edit/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const materialGroupFields = {}
    let materialGroupLevel = {}

    switch (req.body.level) {
      case 1:
        materialGroupLevel = MaterialGroupOne
        break
      case 2:
        materialGroupLevel = MaterialGroupTwo
        break
      case 3:
        materialGroupLevel = MaterialGroupMember
        break
      default:
        return res.status(400).json('提交資訊出現異常')
    }

    if (req.body.type) materialGroupFields.type = req.body.type
    if (req.body.name) materialGroupFields.name = req.body.name

    const filter = { _id: req.params.id }
    const update = { $set: materialGroupFields }
    const action = { new: false }

    materialGroupLevel
      .findByIdAndUpdate(filter, update, action)
      .then((materialGroupOne) => res.json(materialGroupOne))
  }
)

// $router delete api/material-group/delete-level-one/:id
// @desc   刪除訊息接口
// @access private
// 選擇 delete
// 使用 hander 要驗證 token
// body 要放編輯的資料 key:value
router.delete(
  '/delete-level-one/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const query = { _id: req.params.id }

    MaterialGroupOne.findOneAndRemove(query)
      .then((materialGroupOne) => res.json(materialGroupOne))
      .catch((_err) => res.status(404).json('刪除失敗'))
  }
)
module.exports = router
