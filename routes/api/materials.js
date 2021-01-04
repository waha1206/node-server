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
    // console.log(req.body);
    console.log(req.body.length)

    // res.json('msg:chats works');
    // return;

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
// @desc   取得所有使用者資料
// @access Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Material.find({}, null, { limit: 300 }).then((materials) => {
      // Material.find().then((materials) => {
      if (!materials) {
        return res.status(400).json('沒有任何原物料資訊')
      }
      res.json(materials)
    })
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
      materialFields[prop] = req.body[prop]
    }

    // console.log(materialFields)
    // res.json('msg:material is works')

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
      materialFields[prop] = req.body[prop]
    }

    console.log(materialFields)
    console.log(req.body.product_name)

    Material.findOne({ product_name: req.body.product_name }).then(
      (material) => {
        if (material) {
          return res.status(400).json('此原物料的名稱已經存在')
        } else {
          new Material(material).save().then((material) => {
            res.json(material)
          })
        }
      }
    )
  }
)

module.exports = router
