// @login & registerModule
const express = require('express')
const router = express.Router()
const passport = require('passport')

//  引入 schema
const { Quotation } = require('../../models/Quotation')

// ************************************* quotation 開始 *************************************

// $router post api/quotation/add
// @desc   創建訊息接口
// @access private
// 使用 hander 要驗證 token
// 使用 body 要放創建的資料
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(req.body)
    const quotationFields = {}

    for (const prop in req.body) {
      if (prop !== 'imgs') {
        quotationFields[prop] = req.body[prop]
      } else if (prop === 'imgs') {
        if (req.body[prop].length > 0) {
          quotationFields[prop] = req.body.imgs.split('|')
        } else {
          quotationFields[prop] = []
        }
      }
    }

    Quotation.findOne({ quotation_no: req.body.quotation_no }).then(
      (quotation) => {
        if (quotation) {
          return res.status(400).json('此訂單編號已經存在')
        } else {
          new Quotation(quotationFields).save().then((quotation) => {
            res.json(quotation)
          })
        }
      }
    )
  }
)

// $router GET api/quotation/quantity
// @desc   取得當天日期已經有多少的報價單並且回傳ID，用來製作報價單流水號的 api
// @access Private
router.get(
  '/quantity/:index_date',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // query 選擇的條件
    // options 0 - 忽略 ， 1 - 放第一層 ， 2 - 放第二層
    // const query = {}
    const options = {
      _id: 1
    }

    Quotation.find({ index_date: { $in: req.params.index_date } }, options)
      // .sort({ type: 1 }) 如果需要排序的話
      .then((quotations) => {
        if (!quotations) {
          return res.status(400).json('沒有任何內容')
        }
        res.json(quotations)
      })
      .catch((err) => {
        res.status(404).json(err)
      })
  }
)
// $router GET api/quotation/quotation/:id
// @desc   透過客戶的 _id 取得該客戶的所有報價單，並且用日期排序後回傳
// @access Private
router.get(
  '/quotation/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // query 選擇的條件
    // options 0 - 忽略 ， 1 - 放第一層 ， 2 - 放第二層
    const query = { customer_value: req.params.id }
    const options = {
      // _id: 1
    }

    Quotation.find(query, options)
      .sort({ creation_date: -1 }) // 如果需要排序的話
      .then((quotations) => {
        if (!quotations) {
          return res.status(400).json('沒有任何內容')
        }
        res.json(quotations)
      })
      .catch((err) => {
        res.status(404).json(err)
      })
  }
)

// ************************************* quotation 結束 *************************************

// $router GET api/users/test
// @desc   返回的請求的 json 數據
// @access public
router.get('/test', (req, res) => {
  res.json('msg:material is works')
})

// $router GET api/material/all
// @desc   取得所有原物料的資料
// @access Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Quotation.find({}, null, { limit: 1000 }).then((materials) => {
      // Quotation.find().then((materials) => {
      if (!materials) {
        return res.status(400).json('沒有任何原物料資訊')
      }
      res.json(materials)
    })
  }
)

// $router get api/material/many
// @desc   透過 _id 取得很多資料
// @access private
// 使用 hander 要驗證 token
// body 不用放，因為他會獲取所有訊息
router.post(
  '/many',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Quotation.find({ _id: { $in: req.body } })
      .sort({ type: 1 })
      .then((materials) => {
        if (!materials) {
          return res.status(400).json('沒有任何內容')
        }
        res.json(materials)
      })
      .catch((err) => {
        res.status(404).json(err)
      })
  }
)

// $router GET api/material/three
// @desc   取得所有原料的 level one two class name _id
// @access Private
router.get(
  '/three',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // query 選擇的條件
    // options 0 - 忽略 ， 1 - 放第一層 ， 2 - 放第二層
    const query = {}
    const options = {
      type: 1,
      product_name: 1,
      material_class: 1,
      level_two_id: 1
    }

    Quotation.find(query, options)
      // .sort({ type: 1 }) 如果需要排序的話
      .then((materials) => {
        if (!materials) {
          return res.status(400).json('沒有任何內容')
        }
        res.json(materials)
      })
      .catch((err) => {
        res.status(404).json(err)
      })
  }
)
// $router GET api/material/cloth
// @desc   取得所有原料中的布料，轉印與非轉印類的
// @access Private
router.get(
  '/cloth',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // query 選擇的條件
    // options 0 - 忽略 ， 1 - 放第一層 ， 2 - 放第二層
    // const query = {}
    const options = {
      _id: 1,
      product_name: 1,
      unit_price: 1,
      cloth_width: 1
    }

    Quotation.find({ kind: { $in: ['2', '3'] } }, options)
      // .sort({ type: 1 }) 如果需要排序的話
      .then((materials) => {
        if (!materials) {
          return res.status(400).json('沒有任何內容')
        }
        res.json(materials)
      })
      .catch((err) => {
        res.status(404).json(err)
      })
  }
)
// $router GET api/material/paper
// @desc   取得所有原料中的紙類原物料
// @access Private
router.get(
  '/paper',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // query 選擇的條件
    // options 0 - 忽略 ， 1 - 放第一層 ， 2 - 放第二層
    // const query = {}
    // const options = {}

    Quotation.find({ kind: '5' })
      // .sort({ type: 1 }) 如果需要排序的話
      .then((materials) => {
        if (!materials) {
          return res.status(400).json('沒有任何內容')
        }
        res.json(materials)
      })
      .catch((err) => {
        res.status(404).json(err)
      })
  }
)
// $router GET api/material/ink
// @desc   取得所有原料中的墨水類原物料
// @access Private
router.get(
  '/ink',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // query 選擇的條件
    // options 0 - 忽略 ， 1 - 放第一層 ， 2 - 放第二層
    // const query = {}
    // const options = {}

    Quotation.find({ kind: ['6'] })
      // .sort({ type: 1 }) 如果需要排序的話
      .then((materials) => {
        if (!materials) {
          return res.status(400).json('沒有任何內容')
        }
        res.json(materials)
      })
      .catch((err) => {
        res.status(404).json(err)
      })
  }
)

// $router post api/material/get-material-name-by-id/:id
// @desc   透過 _id 取得商品名稱
// @access private
// 使用 hander 要驗證 token
// 有看到 post 就代表他會使用到 body 傳遞 數據 {}
// 有看到 /:id 就代表要從 params 接收一個 id 進來
// 這個接口是根據 _id 返回 該原料的 product_name
router.get(
  '/get-material-name-by-id/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // query 選擇的條件
    // options 0 - 忽略 ， 1 - 放第一層 ， 2 - 放第二層
    const query = { _id: req.params.id }
    const options = { product_name: 1 }

    Quotation.findOne(query, options).then((materials) => {
      // Quotation.find().then((materials) => {
      if (!materials) {
        return res.status(400).json('沒有任何原物料資訊')
      }
      res.json(materials)
    })
  }
)

// $router post api/material/get-from-class/:class
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
    if (req.params.id !== '6030d6473ef72612c87842b4') {
      Quotation.find({ level_two_id: req.params.id }, null, {}).then(
        (materials) => {
          // Quotation.find().then((materials) => {
          if (!materials) {
            return res.status(400).json('沒有任何原物料資訊')
          }
          res.json(materials)
        }
      )
    } else {
      Quotation.find({}, null, {}).then((materials) => {
        // Quotation.find().then((materials) => {
        if (!materials) {
          return res.status(400).json('沒有任何原物料資訊')
        }
        res.json(materials)
      })
    }
  }
)

// $router post api/material/edit/:id
// @desc   編輯訊息接口
// @access private
// 使用 hander 要驗證 token
// 有看到 post 就代表他會使用到 body 傳遞 數據 {}
// 有看到 /:id 就代表要從 params 接收一個 id 進來
router.post(
  '/edit/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const quotationFields = {}

    // if (req.body.type) materialClassFields.type = req.body.type
    // if (req.body.name) materialClassFields.name = req.body.name
    // if (req.body.describe) materialClassFields.describe = req.body.describe

    for (const prop in req.body) {
      if (prop !== 'imgs') {
        quotationFields[prop] = req.body[prop]
      } else if (prop === 'imgs') {
        if (req.body[prop].length > 0) {
          quotationFields[prop] = req.body.imgs.split('|')
        } else {
          quotationFields[prop] = []
        }
      }
    }
    Quotation.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: quotationFields },
      { new: true }
    ).then((materials) => res.json(materials))
  }
)

// $router delete api/material/delete/:id
// @desc   刪除訊息接口
// @access private
// 選擇 delete
// 使用 hander 要驗證 token
// body 要放編輯的資料 key:value
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Quotation.findOneAndRemove({ _id: req.params.id })
      .then((material) => res.json(material))
      .catch((_err) => res.status(404).json('刪除失敗'))
  }
)

// $router post api/material/get-material-by-id/:id
// @desc   透過 _id 取得商品的資料
// @access private
// 使用 hander 要驗證 token
// 有看到 post 就代表他會使用到 body 傳遞 數據 {}
// 有看到 /:id 就代表要從 params 接收一個 id 進來
// 這個接口是根據 _id 返回 該原料的 完整資料
router.get(
  '/get-material-by-id/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // query 選擇的條件
    // options 0 - 忽略 ， 1 - 放第一層 ， 2 - 放第二層
    const query = { _id: req.params.id }
    const options = {}

    Quotation.findOne(query, options).then((material) => {
      // Quotation.find().then((materials) => {
      if (!material) {
        return res.status(400).json('沒有任何原物料資訊')
      }
      res.json(material)
    })
  }
)
module.exports = router
