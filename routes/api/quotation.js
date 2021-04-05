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

// $router POST api/quotation/update
// @desc   透過客戶的 _id 取得該客戶的所有報價單，並且用日期排序後回傳
// @access Private
router.post(
  '/update',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // query 選擇的條件
    // options 0 - 忽略 ， 1 - 放第一層 ， 2 - 放第二層
    const query = { _id: req.body.id }
    const quotationFields = {}
    const options = {
      // _id: 1
    }
    for (const prop in req.body) {
      if (prop !== 'id') {
        quotationFields[prop] = req.body[prop]
      }
    }

    Quotation.findOneAndUpdate(query, { $set: quotationFields }, options)
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

module.exports = router
