// @login & registerModule
const express = require('express')
const router = express.Router()
const passport = require('passport')
const _ = require('lodash')

// 引入 User 才可以做查詢
const {
  EmployeeAuthority,
  EmployeeJobClass,
  EmployeeJobTitle,
  EmployeePayment
} = require('../../models/Employee')

// ***************************************** authority 的 api *****************************************
// $router post api/employee/authority/add
// @desc   新增一筆權限
// @access private
// 使用 hander 要驗證 token
// 使用 body 要放創建的資料 type name
router.post(
  '/authority/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const employeeAuthority = _.cloneDeep(req.body.employeeAuthority)

    EmployeeAuthority.findOne({ name: employeeAuthority.name }).then(
      (employeeAuthorityData) => {
        if (employeeAuthorityData) {
          return res.status(400).json('此權限的分類已經存在！')
        } else {
          new EmployeeAuthority(employeeAuthority)
            .save()
            .then((employeeAuthorityData) => {
              res.json(employeeAuthorityData)
            })
            .catch((err) => {
              res.status(404).json(err)
            })
        }
      }
    )
  }
)

// $router get api/employee/authority
// @desc   取得所有的 authority 的資料
// @access private
// 使用 hander 要驗證 token
router.get('/authority', passport.authenticate('jwt', { session: false }), (req, res) => {
  EmployeeAuthority.find()
    .sort({ type: 1 })
    .then((employeeAuthority) => {
      if (!employeeAuthority) {
        return res.status(400).json('沒有任何內容')
      }
      res.json(employeeAuthority)
    })
    .catch((err) => {
      res.status(404).json(err)
    })
})

// $router post api/employee/authority/edit/:id
// @desc   編輯訊息接口
// @access private
// 使用 hander 要驗證 token
// 有看到 post 就代表他會使用到 body 傳遞 數據 {} type name
// 有看到 /:id 就代表要從 params 接收一個 id 進來 要更新的數據的 _id
router.post(
  '/authority/edit/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const employeeAuthority = _.cloneDeep(req.body.employeeAuthority)

    EmployeeAuthority.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: employeeAuthority },
      { new: true }
    ).then((employeeAuthority) => res.json(employeeAuthority))
  }
)

// $router delete api/employee/authority/delete/:id
// @desc   刪除訊息接口
// @access private
// 選擇 delete
// 使用 hander 要驗證 token
// body 要放編輯的資料 key:value
router.delete(
  '/authority/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    EmployeeAuthority.findOneAndRemove({ _id: req.params.id })
      .then((employeeAuthority) => res.json(employeeAuthority))
      .catch((_err) => res.status(404).json('刪除失敗'))
  }
)
// ***************************************** authority 的 api 結束 *****************************************
// ***************************************** job class 的 api *****************************************
// $router post api/employee/job-class/add
// @desc   創建訊息接口
// @access private
// 使用 hander 要驗證 token
// 使用 body 要放創建的資料 type name
router.post(
  '/job-class/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const employeeJobClass = _.cloneDeep(req.body.employeeJobClass)

    EmployeeJobClass.findOne({ name: employeeJobClass.name }).then(
      (employeeJobClassData) => {
        if (employeeJobClassData) {
          return res.status(400).json('此權限的分類已經存在！')
        } else {
          new EmployeeJobClass(employeeJobClass)
            .save()
            .then((employeeJobClassData) => {
              res.json(employeeJobClassData)
            })
            .catch((err) => {
              res.status(404).json(err)
            })
        }
      }
    )
  }
)

// $router get api/employee/job-class
// @desc   取得所有的 job-class 的資料
// @access private
// 使用 hander 要驗證 token
router.get('/job-class', passport.authenticate('jwt', { session: false }), (req, res) => {
  EmployeeJobClass.find()
    .sort({ type: 1 })
    .then((employeeJobClassData) => {
      if (!employeeJobClassData) {
        return res.status(400).json('沒有任何內容')
      }
      res.json(employeeJobClassData)
    })
    .catch((err) => {
      res.status(404).json(err)
    })
})

// $router post api/employee/job-class/edit/:id
// @desc   編輯訊息接口
// @access private
// 使用 hander 要驗證 token
// 有看到 post 就代表他會使用到 body 傳遞 數據 {}
// 有看到 /:id 就代表要從 params 接收一個 id 進來
router.post(
  '/job-class/edit/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const employeeJobClass = _.cloneDeep(req.body.employeeJobClass)
    EmployeeJobClass.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: employeeJobClass },
      { new: true }
    ).then((employeeJobClassData) => res.json(employeeJobClassData))
  }
)

// $router delete api/employee/job-class/delete/:id
// @desc   刪除訊息接口
// @access private
// 選擇 delete
// 使用 hander 要驗證 token
// body 要放編輯的資料 key:value
router.delete(
  '/job-class/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    EmployeeJobClass.findOneAndRemove({ _id: req.params.id })
      .then((employeeJobClassData) => res.json(employeeJobClassData))
      .catch((_err) => res.status(404).json('刪除失敗'))
  }
)
// ***************************************** job class 的 api 結束 *****************************************
// ***************************************** job title 的 api *****************************************
// $router post api/employee/job-title/add
// @desc   創建訊息接口
// @access private
// 使用 hander 要驗證 token
// 使用 body 要放創建的資料 type name
router.post(
  '/job-title/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const employeeJobTitle = _.cloneDeep(req.body.employeeJobTitle)

    EmployeeJobTitle.findOne({ name: employeeJobTitle.name }).then(
      (employeeJobTitleData) => {
        if (employeeJobTitleData) {
          return res.status(400).json('此職務抬頭的分類已經存在！')
        } else {
          new EmployeeJobTitle(employeeJobTitle)
            .save()
            .then((employeeJobTitleData) => {
              res.json(employeeJobTitleData)
            })
            .catch((err) => {
              res.status(404).json(err)
            })
        }
      }
    )
  }
)

// $router get api/employee/job-title
// @desc   取得所有的 job-title 的資料
// @access private
// 使用 hander 要驗證 token
router.get('/job-title', passport.authenticate('jwt', { session: false }), (req, res) => {
  EmployeeJobTitle.find()
    .sort({ type: 1 })
    .then((employeeJobTitleData) => {
      if (!employeeJobTitleData) {
        return res.status(400).json('沒有任何內容')
      }
      res.json(employeeJobTitleData)
    })
    .catch((err) => {
      res.status(404).json(err)
    })
})

// $router post api/employee/job-title/edit/:id
// @desc   編輯訊息接口
// @access private
// 使用 hander 要驗證 token
// 有看到 post 就代表他會使用到 body 傳遞 數據 {}
// 有看到 /:id 就代表要從 params 接收一個 id 進來
router.post(
  '/job-title/edit/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const employeeJobTitle = _.cloneDeep(req.body.employeeJobTitle)

    EmployeeJobTitle.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: employeeJobTitle },
      { new: true }
    ).then((employeeJobTitleData) => res.json(employeeJobTitleData))
  }
)

// $router delete api/employee/job-title/delete/:id
// @desc   刪除訊息接口
// @access private
// 選擇 delete
// 使用 hander 要驗證 token
// body 要放編輯的資料 key:value
router.delete(
  '/job-title/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    EmployeeJobTitle.findOneAndRemove({ _id: req.params.id })
      .then((employeeJobTitleData) => res.json(employeeJobTitleData))
      .catch((_err) => res.status(404).json('刪除失敗'))
  }
)
// ***************************************** job title 的 api 結束 *****************************************
// ***************************************** payment 的 api *****************************************
// $router post api/employee/payment/add
// @desc   創建訊息接口
// @access private
// 使用 hander 要驗證 token
// 使用 body 要放創建的資料 type name
router.post(
  '/payment/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const employeePayment = _.cloneDeep(req.body.employeePayment)

    EmployeePayment.findOne({ name: employeePayment.name }).then(
      (employeePaymentData) => {
        if (employeePaymentData) {
          return res.status(400).json('此付款方式已經存在！')
        } else {
          new EmployeePayment(employeePayment)
            .save()
            .then((employeePaymentData) => {
              res.json(employeePaymentData)
            })
            .catch((err) => {
              res.status(404).json(err)
            })
        }
      }
    )
  }
)

// $router get api/employee/payment
// @desc   取得所有的 付款方式 的資料
// @access private
// 使用 hander 要驗證 token
router.get('/payment', passport.authenticate('jwt', { session: false }), (req, res) => {
  EmployeePayment.find()
    .sort({ type: 1 })
    .then((employeePaymentData) => {
      if (!employeePaymentData) {
        return res.status(400).json('沒有任何內容')
      }
      res.json(employeePaymentData)
    })
    .catch((err) => {
      res.status(404).json(err)
    })
})

// $router post api/employee/class/edit/:id
// @desc   編輯訊息接口
// @access private
// 使用 hander 要驗證 token
// 有看到 post 就代表他會使用到 body 傳遞 數據 {}
// 有看到 /:id 就代表要從 params 接收一個 id 進來
router.post(
  '/payment/edit/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const employeePayment = _.cloneDeep(req.body.employeePayment)

    EmployeePayment.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: employeePayment },
      { new: true }
    ).then((employeePaymentData) => res.json(employeePaymentData))
  }
)

// $router delete api/employee/payment/delete/:id
// @desc   刪除訊息接口
// @access private
// 選擇 delete
// 使用 hander 要驗證 token
// body 要放編輯的資料 key:value
router.delete(
  '/payment/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    EmployeePayment.findOneAndRemove({ _id: req.params.id })
      .then((employeePaymentData) => res.json(employeePaymentData))
      .catch((_err) => res.status(404).json('刪除失敗'))
  }
)
// ***************************************** payment 的 api 結束 *****************************************

module.exports = router
