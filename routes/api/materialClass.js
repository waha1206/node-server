// @login & registerModule
const express = require('express')
const router = express.Router()
const passport = require('passport')

// 引入 categroies 才可以做查詢

const {
  MaterialClass,
  MaterialLevelTwoClass,
  StorageLevelOneClass,
  StorageLevelTwoClass
} = require('../../models/MaterialClass')

// ---------------------------------- storage material ----------------------------------

// $router get api/material-class/get-storage-level-one-class
// @desc   獲取所有分類資訊
// @access private
// 使用 hander 要驗證 token
// body 不用放，因為他會獲取所有訊息
// 使用方式 SERVER_GET_STORAGE_LEVEL_ONE_DATA
router.put(
  '/put-storage-level-one-class',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { materialStorageLevelOneData } = req.body
    const { _id } = materialStorageLevelOneData

    StorageLevelOneClass.findByIdAndUpdate(
      { _id: _id },
      { $set: materialStorageLevelOneData },
      { new: false }
    ).then((classLevelOneData) => res.json(classLevelOneData))
  }
)

// $router get api/material-class/get-storage-level-one-class
// @desc   獲取所有分類資訊
// @access private
// 使用 hander 要驗證 token
// body 不用放，因為他會獲取所有訊息
// 使用方式 SERVER_GET_STORAGE_LEVEL_ONE_DATA
router.get(
  '/get-storage-level-one-class',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    StorageLevelOneClass.find()
      .sort({ type: 1 })
      .then((aaa) => {
        if (!aaa) {
          return res.status(200).json('沒有任何內容')
        }
        res.json(aaa)
      })
      .catch((err) => {
        res.status(404).json(err)
      })
  }
)

// -------- 二層
// $router get api/material-class/put-storage-level-two-class
// @desc   獲取所有分類資訊
// @access private
// 使用 hander 要驗證 token
// body 不用放，因為他會獲取所有訊息
// 使用方式 SERVER_PUT_STORAGE_LEVEL_TWO_DATA
router.put(
  '/put-storage-level-two-class',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { materialStorageLevelTwoData } = req.body
    const { _id } = materialStorageLevelTwoData

    StorageLevelTwoClass.findByIdAndUpdate(
      { _id: _id },
      { $set: materialStorageLevelTwoData },
      { new: false }
    ).then((classLevelTwoData) => res.json(classLevelTwoData))
  }
)

// $router get api/material-class/get-storage-level-two-class
// @desc   獲取所有分類資訊
// @access private
// 使用 hander 要驗證 token
// body 不用放，因為他會獲取所有訊息
// 使用方式 SERVER_GET_STORAGE_LEVEL_TWO_DATA
router.get(
  '/get-storage-level-two-class',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log('有喔')
    StorageLevelTwoClass.find()
      .sort({ type: 1 })
      .then((storageLevelTwoClass) => {
        if (!storageLevelTwoClass) {
          return res.status(200).json('沒有任何內容')
        }
        res.json(storageLevelTwoClass)
      })
      .catch((err) => {
        res.status(404).json(err)
      })
  }
)

// $router post api/material-class/add-storage-level-two-class
// @desc   創建訊息接口
// @access private
// 使用 hander 要驗證 token
// 使用 body 要放創建的資料 key:value
// 使用方式 SERVER_ADD_LEVEL_TWO_STORAGE_DATA, materialStorageLevelTwoData
router.post(
  '/add-storage-level-two-class',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const {
      materialStorageLevelTwoData,
      materialStorageLevelTwoData: { name }
    } = req.body
    const query = { name: name }
    const options = {}

    StorageLevelTwoClass.findOne(query, options).then((storageLevelTwoClass) => {
      if (storageLevelTwoClass) {
        res.status(403).json('Material Storage Level One 的名稱已經存在')
      } else {
        new StorageLevelTwoClass(materialStorageLevelTwoData)
          .save()
          .then((storageLevelOneClass) => {
            res.status(200).json(storageLevelTwoClass)
          })
      }
    })
  }
)

// -------- 二層 end

// ---------------------------------- storage material end ----------------------------------

// $router GET api/material-class/test
// @desc   返回的請求的 json 數據
// @access public
router.get('/test', (req, res) => {
  console.log('hi')
  res.json('msg:materialClass works')
})

// $router post api/material-class/add
// @desc   創建訊息接口
// @access private
// 使用 hander 要驗證 token
// 使用 body 要放創建的資料 key:value
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
  const materialClassFields = {}
  const level = req.body.level
  // const query = [{ name: req.body.name }, { name: req.body.type }]
  const query = [{ name: req.body.name }]

  let MaterialClassLevel = Object
  MaterialClassLevel = level === 1 ? MaterialClass : MaterialLevelTwoClass

  if (req.body.type) materialClassFields.type = req.body.type
  if (req.body.name) materialClassFields.name = req.body.name
  if (req.body.describe) materialClassFields.describe = req.body.describe

  if (level === 2 && req.body.level_one_id) {
    materialClassFields.level_one_id = req.body.level_one_id
    materialClassFields.level_one_name = req.body.level_one_name
  }

  MaterialClassLevel.findOne({ $or: query }).then((materialClass) => {
    if (materialClass) {
      return res.status(400).json('此商品類型(編號)已經存在')
    } else {
      new MaterialClassLevel(materialClassFields).save().then((materialClass) => {
        res.json(materialClass)
      })
    }
  })
})

// $router get api/material-class/one
// @desc   獲取所有分類資訊
// @access private
// 使用 hander 要驗證 token
// body 不用放，因為他會獲取所有訊息
router.get('/one', passport.authenticate('jwt', { session: false }), (req, res) => {
  MaterialClass.find()
    .sort({ type: 1 })
    .then((materialClass) => {
      if (!materialClass) {
        return res.status(400).json('沒有任何內容')
      }
      res.json(materialClass)
    })
    .catch((err) => {
      res.status(404).json(err)
    })
})

// $router get api/material-class/one
// @desc   獲取所有分類資訊
// @access private
// 使用 hander 要驗證 token
// body 不用放，因為他會獲取所有訊息
router.get('/two', passport.authenticate('jwt', { session: false }), (req, res) => {
  MaterialLevelTwoClass.find()
    .sort({ type: 1 })
    .then((materialLevelTwoClass) => {
      if (!materialLevelTwoClass) {
        return res.status(400).json('沒有任何內容')
      }
      res.json(materialLevelTwoClass)
    })
    .catch((err) => {
      res.status(404).json(err)
    })
})

// $router get api/material-class/:id
// @desc   獲取單個訊息
// @access private
// 使用 hander 要驗證 token
// 使用 params
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  MaterialClass.findOne({ _id: req.params._id })
    .then((materialClass) => {
      if (!materialClass) {
        return res.status(400).json('沒有任何內容')
      }
      res.json(materialClass)
    })
    .catch((err) => {
      res.status(404).json(err)
    })
})

// $router post api/material-class/edit/:id
// @desc   編輯訊息接口
// @access private
// 使用 hander 要驗證 token
// 有看到 post 就代表他會使用到 body 傳遞 數據 {}
// 有看到 /:id 就代表要從 params 接收一個 id 進來
router.post('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const materialClassFields = {}
  const level = req.body.level
  const filter = { _id: req.params.id }
  const update = { $set: materialClassFields }
  const action = { new: false }

  let MaterialClassLevel = Object
  MaterialClassLevel = level === 1 ? MaterialClass : MaterialLevelTwoClass

  if (req.body.type) materialClassFields.type = req.body.type
  if (req.body.name) materialClassFields.name = req.body.name
  if (req.body.describe) materialClassFields.describe = req.body.describe

  if (level === 2 && req.body.level_one_id) {
    materialClassFields.level_one_id = req.body.level_one_id
    materialClassFields.level_one_name = req.body.level_one_name
  }

  console.log(req.body)
  console.log(req.params)

  MaterialClassLevel.findByIdAndUpdate(filter, update, action).then((materialClass) =>
    res.json(materialClass)
  )

  // MaterialClass.findOne({ type: req.body.type }).then((materialClass) => {
  //   if (materialClass) {
  //     return res.status(400).json('此商品類型(編號)已經存在')
  //   } else {
  //     MaterialClass.findByIdAndUpdate(
  //       { _id: req.params.id },
  //       { $set: materialClassFields },
  //       { new: true }
  //     ).then((materialClass) => res.json(materialClass))
  //   }
  // })
})

// $router delete api/material-class/delete-level-one/:id
// @desc   刪除訊息接口
// @access private
// 選擇 delete
// 使用 hander 要驗證 token
// body 要放編輯的資料 key:value
router.delete(
  '/delete-level-one/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    MaterialClass.findOneAndRemove({ _id: req.params.id })
      .then((materialClass) => res.json(materialClass))
      .catch((_err) => res.status(404).json('刪除失敗'))
  }
)

// $router delete api/material-class/delete-level-two/:id
// @desc   刪除訊息接口
// @access private
// 選擇 delete
// 使用 hander 要驗證 token
// body 要放編輯的資料 key:value
router.delete(
  '/delete-level-two/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    MaterialLevelTwoClass.findOneAndRemove({ _id: req.params.id })
      .then((materialClass) => res.json(materialClass))
      .catch((_err) => res.status(404).json('刪除失敗'))
  }
)

// ---------------------  這邊是 Storage 的部分 ---------------------
// $router post api/material-class/add-storage-level-one-class
// @desc   創建訊息接口
// @access private
// 使用 hander 要驗證 token
// 使用 body 要放創建的資料 key:value
// 使用方式 SERVER_ADD_LEVEL_ONE_STORAGE_DATA, materialStorageLevelOneData
router.post(
  '/add-storage-level-one-class',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const {
      materialStorageLevelOneData,
      materialStorageLevelOneData: { name }
    } = req.body
    const query = { name: name }
    const options = {}

    StorageLevelOneClass.findOne(query, options).then((storageLevelOneClass) => {
      if (storageLevelOneClass) {
        res.status(403).json('Material Storage Level One 的名稱已經存在')
      } else {
        new StorageLevelOneClass(materialStorageLevelOneData)
          .save()
          .then((storageLevelOneClass) => {
            res.status(200).json(storageLevelOneClass)
          })
      }
    })
  }
)
// ---------------------  這邊是 Storage end ---------------------

module.exports = router
