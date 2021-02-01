// @login & registerModule
const express = require('express')
const router = express.Router()
const passport = require('passport')

// 引入 categroies 才可以做查詢
const {
  Categories,
  CategoriesLevelTwo,
  CategoriesLevelThree
} = require('../../models/Categories')

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
    let CategoryLevel = {}

    switch (req.body.level) {
      case 1:
        CategoryLevel = Categories
        break
      case 2:
        CategoryLevel = CategoriesLevelTwo
        break
      case 3:
        CategoryLevel = CategoriesLevelThree
        break
      default:
        return res.status(400).json('提交資訊出現異常')
    }

    // 傳送過來的資料不見得會跟 schema 會一樣
    if (req.body.type) categoriesFields.type = req.body.type
    if (req.body.name) categoriesFields.name = req.body.name
    if (req.body.level_one_id) {
      categoriesFields.level_one_id = req.body.level_one_id
    }

    if (req.body.level === 3) {
      if (req.body.level_two_id) {
        categoriesFields.level_two_id = req.body.level_two_id
      }
      // 多張圖片
      if (req.body.imgs) {
        categoriesFields.imgs = req.body.imgs.split('|')
      }
      if (req.body.describe) {
        categoriesFields.describe = req.body.describe
      }
      if (req.body.last_modify_date) {
        categoriesFields.last_modify_date = req.body.last_modify_date
      }
      if (req.body.last_edit_person) {
        categoriesFields.last_edit_person = req.body.last_edit_person
      }
      if (req.body.status) {
        categoriesFields.status = Object.assign({}, req.body.status)
      }
      if (req.body.pattern_no) {
        categoriesFields.pattern_no = req.body.pattern_no
      }

      if (req.body.pattern_download) {
        categoriesFields.pattern_download = req.body.pattern_download
      }

      if (req.body.introduction_video) {
        categoriesFields.introduction_video = Object.assign(
          {},
          req.body.introduction_video
        )
      }
      if (req.body.salting_on_color_video) {
        categoriesFields.salting_on_color_video = Object.assign(
          {},
          req.body.salting_on_color_video
        )
      }
      if (req.body.note_one_video) {
        categoriesFields.note_one_video = Object.assign(
          {},
          req.body.note_one_video
        )
      }
      if (req.body.note_two_video) {
        categoriesFields.note_two_video = Object.assign(
          {},
          req.body.note_two_video
        )
      }
    }
    // console.log(categoriesFields)
    CategoryLevel.findOne({ name: req.body.name }).then((category) => {
      if (category) {
        return res.status(400).json('此商品類型(英文)已經存在')
      } else {
        new CategoryLevel(categoriesFields)
          .save()
          .then((category) => {
            res.json(category)
          })
          .catch((err) => {
            res.status(404).json(err)
          })
      }
    })
  }
)

// $router get api/categories
// @desc   獲取所有分類資訊
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
// $router get api/categories/two
// @desc   獲取所有分類資訊
// @access private
// 使用 hander 要驗證 token
// body 不用放，因為他會獲取所有訊息
router.get(
  '/two',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    CategoriesLevelTwo.find()
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

// $router get api/categories/three
// @desc   獲取所有分類資訊
// @access private
// 使用 hander 要驗證 token
// body 不用放，因為他會獲取所有訊息
router.get(
  '/three/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // query 選擇的條件
    // options 0 - 忽略 ， 1 - 放第一層 ， 2 - 放第二層
    console.log(req.params)
    const query = { level_two_id: req.params.id }
    const options = {
      // imgs: 0
    }
    CategoriesLevelThree.find(query, options)
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

// $router get api/categories/:id
// @desc   獲取單個訊息
// @access private
// 使用 hander 要驗證 token
// 使用 params
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Categories.findOne({ _id: req.params._id })
      .then((category) => {
        if (!category) {
          return res.status(400).json('沒有任何內容')
        }
        res.json(category)
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
    let CategoryLevel = {}

    switch (req.body.level) {
      case 1:
        CategoryLevel = Categories
        break
      case 2:
        CategoryLevel = CategoriesLevelTwo
        if (req.body.level_one_id) {
          categoryFields.level_one_id = req.body.level_one_id
        }
        break
      case 3:
        CategoryLevel = CategoriesLevelThree
        break
      default:
        return res.status(400).json('提交資訊出現異常')
    }

    if (req.body.type) categoryFields.type = req.body.type
    if (req.body.name) categoryFields.name = req.body.name
    if (req.body.level_one_id) {
      categoryFields.level_one_id = req.body.level_one_id
    }
    if (req.body.level === 3) {
      if (req.body.level_two_id) {
        categoryFields.level_two_id = req.body.level_two_id
      }
      // 多張圖片
      if (req.body.imgs) {
        categoryFields.imgs = req.body.imgs.split('|')
      }
      if (req.body.describe) {
        categoryFields.describe = req.body.describe
      }
      if (req.body.last_modify_date) {
        categoryFields.last_modify_date = req.body.last_modify_date
      }
      if (req.body.last_edit_person) {
        categoryFields.last_edit_person = req.body.last_edit_person
      }
      if (req.body.status) {
        categoryFields.status = Object.assign({}, req.body.status)
      }
      if (req.body.pattern_no) {
        categoryFields.pattern_no = req.body.pattern_no
      }

      if (req.body.pattern_download) {
        categoryFields.pattern_download = req.body.pattern_download
      }

      if (req.body.introduction_video) {
        categoryFields.introduction_video = Object.assign(
          {},
          req.body.introduction_video
        )
      }
      if (req.body.salting_on_color_video) {
        categoryFields.salting_on_color_video = Object.assign(
          {},
          req.body.salting_on_color_video
        )
      }
      if (req.body.note_one_video) {
        categoryFields.note_one_video = Object.assign(
          {},
          req.body.note_one_video
        )
      }
      if (req.body.note_two_video) {
        categoryFields.note_two_video = Object.assign(
          {},
          req.body.note_two_video
        )
      }
    }
    if (categoryFields.imgs.length) {
      console.log(categoryFields.imgs.length)
    }
    CategoryLevel.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: categoryFields },
      { new: false }
    ).then((catrgory) => res.json(catrgory))
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
      .then((catrgory) => res.json(catrgory))
      .catch((_err) => res.status(404).json('刪除失敗'))
  }
)
// $router delete api/categories/delete/:id
// @desc   刪除訊息接口
// @access private
// 選擇 delete
// 使用 hander 要驗證 token
// body 要放編輯的資料 key:value
router.delete(
  '/delete-level-two/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    CategoriesLevelTwo.findOneAndRemove({ _id: req.params.id })
      .then((catrgory) => res.json(catrgory))
      .catch((_err) => res.status(404).json('刪除失敗'))
  }
)
module.exports = router
