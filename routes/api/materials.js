// @login & registerModule
const express = require('express')
const router = express.Router()
const passport = require('passport')

// 引入 User 才可以做查詢
const Material = require('../../models/Material')

// $router GET api/users/test
// @desc   返回的請求的 json 數據
// @access public
router.get('/test', (req, res) => {
  res.json('msg:material is works')
})

// $router POST api/material/upload
// @desc   返回的請求的 json 數據
// @access public
router.post(
  '/upload',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const materials = new Array(req.body.length)

    for (let i = 0; i < req.body.length; i++) {
      const material = new Material({
        old_serial_numbers: req.body[i].old_serial_numbers,
        product_name: req.body[i].product_name,
        unit_price: req.body[i].unit_price,
        company_profit: req.body[i].company_profit,
        unit: req.body[i].unit,
        product_category: req.body[i].product_category,
        the_cost: req.body[i].the_cost,
        retail_price: req.body[i].retail_price,
        product_profit: req.body[i].product_profit,
        product_description: req.body[i].product_description,
        storage: req.body[i].storage,
        various_elements: req.body[i].various_elements,
        length: req.body[i].length,
        extra_freight: req.body[i].extra_freight,
        lead_time: req.body[i].lead_time,
        raw_material: req.body[i].raw_material,
        minimum_order_quantity: req.body[i].minimum_order_quantity,
        supplier: req.body[i].supplier,
        supplier_contact_person: req.body[i].supplier_contact_person,
        supplier_phone_number: req.body[i].supplier_phone_number,
        supplier_fax_number: req.body[i].supplier_fax_number,
        supplier_cell_phone: req.body[i].supplier_cell_phone,
        supplier_address: req.body[i].supplier_address,
        supplier_email: req.body[i].supplier_email,
        remark: req.body[i].remark,
        supplier_bank_information: req.body[i].supplier_bank_information,
        product_website: req.body[i].product_website
      })
      materials.push(material)
    }

    Material.insertMany(materials)
      .then((ok) => {
        res.json('msg:chats works')
      })
      .catch((err) => {
        return console.log(err)
      })
  }
)

// $router GET api/material/all
// @desc   取得所有原物料的資料
// @access Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Material.find({}, null, { limit: 1000 }).then((materials) => {
      // Material.find().then((materials) => {
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
    Material.find({ _id: { $in: req.body } })
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

    Material.find(query, options)
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
      cloth_width: 1,
      imgs: 1
    }

    Material.find({ kind: { $in: ['2', '3'] } }, options)
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

    Material.find({ kind: '5' })
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

    Material.find({ kind: ['6'] })
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

    Material.findOne(query, options).then((materials) => {
      // Material.find().then((materials) => {
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
      Material.find({ level_two_id: req.params.id }, null, {}).then(
        (materials) => {
          // Material.find().then((materials) => {
          if (!materials) {
            return res.status(400).json('沒有任何原物料資訊')
          }
          res.json(materials)
        }
      )
    } else {
      Material.find({}, null, {}).then((materials) => {
        // Material.find().then((materials) => {
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
    const materialFields = {}

    // if (req.body.type) materialClassFields.type = req.body.type
    // if (req.body.name) materialClassFields.name = req.body.name
    // if (req.body.describe) materialClassFields.describe = req.body.describe

    for (const prop in req.body) {
      if (prop !== 'imgs') {
        materialFields[prop] = req.body[prop]
      } else if (prop === 'imgs') {
        if (req.body[prop].length > 0) {
          materialFields[prop] = req.body.imgs.split('|')
        } else {
          materialFields[prop] = []
        }
      }
    }
    Material.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: materialFields },
      { new: true }
    ).then((materials) => res.json(materials))
  }
)

// $router post api/material/add
// @desc   創建訊息接口
// @access private
// 使用 hander 要驗證 token
// 使用 body 要放創建的資料 key:value
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const materialFields = {}

    for (const prop in req.body) {
      if (prop !== 'imgs') {
        materialFields[prop] = req.body[prop]
      } else if (prop === 'imgs') {
        if (req.body[prop].length > 0) {
          materialFields[prop] = req.body.imgs.split('|')
        } else {
          materialFields[prop] = []
        }
      }
    }

    Material.findOne({ product_name: req.body.product_name }).then(
      (material) => {
        if (material) {
          return res.status(400).json('此原物料的名稱已經存在')
        } else {
          new Material(materialFields).save().then((material) => {
            res.json(material)
          })
        }
      }
    )
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
    Material.findOneAndRemove({ _id: req.params.id })
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

    Material.findOne(query, options).then((material) => {
      // Material.find().then((materials) => {
      if (!material) {
        return res.status(400).json('沒有任何原物料資訊')
      }
      res.json(material)
    })
  }
)
module.exports = router
