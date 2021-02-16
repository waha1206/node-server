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
    const query = [{ name: req.body.name }]

    const level = req.body.level
    const materialGroupFields = {}
    let materialGroupLevel = {}

    switch (level) {
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

    if (level === 2) {
      if (req.body.level_one_id) {
        materialGroupFields.level_one_id = req.body.level_one_id
      }
    }

    if (level === 3) {
      if (req.body.imgs.length > 0) {
        materialGroupFields.imgs = req.body.imgs.split('|')
      }
      if (req.body.describe) {
        materialGroupFields.describe = req.body.describe
      }
      if (req.body.level_one_id) {
        materialGroupFields.level_one_id = req.body.level_one_id
      }
      if (req.body.level_two_id) {
        materialGroupFields.level_two_id = req.body.level_two_id
      }
      if (req.body.processing_fee) {
        materialGroupFields.processing_fee = req.body.processing_fee
      }
      if (req.body.web_side_name) {
        materialGroupFields.web_side_name = req.body.web_side_name
      }
      if (req.body.last_modify_date) {
        materialGroupFields.last_modify_date = req.body.last_modify_date
      }
      if (req.body.last_edit_person) {
        materialGroupFields.last_edit_person = req.body.last_edit_person
      }
      if (req.body.choiceLevelTwoValue) {
        materialGroupFields.choiceLevelTwoValue = req.body.choiceLevelTwoValue.map(
          (x) => x
        )
      }
    }
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

// $router get api/material-group/two
// @desc   獲取所有分類資訊
// @access private
// 使用 hander 要驗證 token
// body 不用放，因為他會獲取所有訊息
router.get(
  '/two',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    MaterialGroupTwo.find()
      .sort({ type: 1 })
      .then((materialGroupTwo) => {
        if (!materialGroupTwo) {
          return res.status(400).json('沒有任何內容')
        }
        res.json(materialGroupTwo)
      })
      .catch((err) => {
        res.status(404).json(err)
      })
  }
)

// $router get api/material-group/three
// @desc   獲取所有分類資訊，但是只回傳我要的欄位
// @access private
// 使用 hander 要驗證 token
// body 不用放，因為他會獲取所有訊息
router.get(
  '/three',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // query 選擇的條件
    // options 0 - 忽略 ， 1 - 放第一層 ， 2 - 放第二層
    const query = {}
    const options = {
      type: 1,
      name: 1,
      material_class: 1,
      level_two_id: 1
    }
    MaterialGroupMember.find(query, options)
      .sort({ type: 1 })
      .then((materialGroupThree) => {
        if (!materialGroupThree) {
          return res.status(400).json('沒有任何內容')
        }
        res.json(materialGroupThree)
      })
      .catch((err) => {
        res.status(404).json(err)
      })
  }
)

// $router get api/material-group/three/:id
// @desc   根據第二層的的 id 去讀取相關的 資料
// @access private
// 使用 hander 要驗證 token
// body 不用放，因為他會獲取所有訊息
router.get(
  '/three/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const query = { level_two_id: req.params.id }
    const options = {
      // imgs: 0
    }
    MaterialGroupMember.find(query, options)
      .sort({ type: 1 })
      .then((materialGroupThree) => {
        if (!materialGroupThree) {
          return res.status(400).json('沒有任何內容')
        }
        res.json(materialGroupThree)
      })
      .catch((err) => {
        res.status(404).json(err)
      })
  }
)

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
    const level = req.body.level
    const materialGroupFields = {}
    let materialGroupLevel = {}

    switch (level) {
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

    if (level === 2) {
      if (req.body.level_one_id) {
        materialGroupFields.level_one_id = req.body.level_one_id
      }
    }

    if (req.body.type) materialGroupFields.type = req.body.type
    if (req.body.name) materialGroupFields.name = req.body.name

    if (level === 3) {
      if (req.body.imgs) {
        if (req.body.imgs.length > 0) {
          materialGroupFields.imgs = req.body.imgs.split('|')
        }
      } else {
        materialGroupFields.imgs = []
      }
      if (req.body.describe) {
        materialGroupFields.describe = req.body.describe
      }
      if (req.body.level_one_id) {
        materialGroupFields.level_one_id = req.body.level_one_id
      }
      if (req.body.level_two_id) {
        materialGroupFields.level_two_id = req.body.level_two_id
      }
      if (req.body.processing_fee) {
        materialGroupFields.processing_fee = req.body.processing_fee
      }
      if (req.body.web_side_name) {
        materialGroupFields.web_side_name = req.body.web_side_name
      }
      if (req.body.last_modify_date) {
        materialGroupFields.last_modify_date = req.body.last_modify_date
      }
      if (req.body.last_edit_person) {
        materialGroupFields.last_edit_person = req.body.last_edit_person
      }
      if (req.body.choiceLevelTwoValue) {
        materialGroupFields.choiceLevelTwoValue = req.body.choiceLevelTwoValue.map(
          (x) => x
        )
      }
      if (req.body.choice_level_three_material) {
        materialGroupFields.choice_level_three_material = req.body.choice_level_three_material.map(
          (x) => x
        )
      }
    }

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

// $router delete api/material-group/delete-level-two/:id
// @desc   刪除訊息接口
// @access private
// 選擇 delete
// 使用 hander 要驗證 token
// body 要放編輯的資料 key:value
router.delete(
  '/delete-level-two/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const query = { _id: req.params.id }
    console.log(req.params)
    MaterialGroupTwo.findOneAndRemove(query)
      .then((materialGroupOne) => res.json(materialGroupOne))
      .catch((_err) => res.status(404).json('刪除失敗'))
  }
)
module.exports = router
