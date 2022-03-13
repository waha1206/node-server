// @login & registerModule
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 10
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')

// 引入 User 才可以做查詢
const { User, UserTitle } = require('../../models/User')

// $router GET api/users/test
// @desc   返回的請求的 json 數據
// @access public
router.get('/test', (req, res) => {
  res.json('msg:login works')
})

// ***************************************** user 的 api 開始 *****************************************
// $router POST api/users/get-user-name
// @desc   返回的請求的 json 數據
// @access public
// 查詢數據庫中此ID的使用者名稱
router.post('/get-user-name', passport.authenticate('jwt', { session: false }), (req, res) => {
  // console.log(req.body)
  console.log(req.body)
  User.findOne({ _id: req.body.id }).then((user) => {
    if (!user) {
      return res.status(400).json('使用者不存在！')
    } else {
      res.json(user)
    }
  })
})

// $router POST api/users/register
// @desc   返回的請求的 json 數據
// @access public
router.post('/register', (req, res) => {
  // console.log(req.body)

  // 查詢數據庫中是否擁有 email
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json('email已經被註冊')
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      })
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
        identity: req.body.identity
      })

      // 加密的東東 bcrypt
      bcrypt.genSalt(saltRounds, function (_err, salt) {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          // Store hash in your password DB.
          if (err) {
            throw err
          }
          newUser.password = hash

          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err))
        })
      })
    }
  })
})

// $router POST api/users/login
// @desc   返回 token jwt passport
// @access public

router.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  console.log(password)
  User.findOne({ email }).then((user) => {
    if (!user || password === undefined) {
      return res.status(404).json('用戶不存在！')
    } else {
      // 用戶存在，所以準備使用雜湊加密法 bcrypt 反解析 使用者的密碼，然後進行資料庫與使用者的密碼比對
      bcrypt
        .compare(password, user.password)
        // 使用 promise 方式 .then  (本來是使用 ()=> )
        .then((isMatch) => {
          if (isMatch) {
            // jwt.sign("規則","加密名字","過期時間","箭頭函數")
            const rule = {
              name: user.name,
              id: user.id,
              emai: user.email,
              avatar: user.avatar,
              identity: user.identity
            }
            jwt.sign(
              rule,
              keys.secretOrKey,
              // token 的保存時間
              { expiresIn: 360000 },
              (err, token) => {
                if (err) throw err
                // res.json 返回給 瀏覽器 他的資料在瀏覽器裡面會看到是一個 data 對象
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                })
              }
            )
          } else {
            return res.status(400).json('密碼錯誤')
          }
        })
    }
  })
})

// $router POST api/users/current
// @desc   return current user
// @access Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  // res.json(req.user) // 不需要把整個 user 資訊返回
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    identity: req.user.identity
  })
})

// $router GET api/users/user-info
// @desc   取得所有使用者 id 與 name
// @access Private
router.get('/user-info', passport.authenticate('jwt', { session: false }), (req, res) => {
  User.find({}, { _id: 1, name: 1 }).then((users) => {
    if (!users) {
      return res.status(400).json('沒有任何使用者資料')
    }

    // // 先宣告一個數組
    // const userInfo = []
    // // keys 是你要取得的 key
    // const keys = ['_id', 'name']
    // // 把每個使用者都抓出來 index 是數字 所以要用 users[index] 去取得該物件
    // for (const index in users) {
    //   // 要複製的空對象
    //   const objCopy = {}
    //   // 把要複製的物件，用 forEach (這邊找的是 _id 跟 name) 從 users[index][key] 複製到 objCopy[key]
    //   keys.forEach((key) => (objCopy[key] = users[index][key]))
    //   // 把複製好的物件 推到 userInfo 裡面
    //   userInfo.push(objCopy)
    // }
    // console.log(userInfo)
    // res.json(userInfo)

    res.json(users)
  })
})
// $router GET api/users/user-permission-list
// @desc   取得所有的使用者資料與權限，管理使用者的管理員專用
// @access Private
router.get('/user-permission-list', passport.authenticate('jwt', { session: false }), (req, res) => {
  // https://blog.csdn.net/Altaba/article/details/79067700
  // 獲取客戶的真實IP
  const getClientIp = function (req) {
    return (
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress
    )
  }
  console.log(getClientIp(req))

  // 獲取客戶的域名
  // eslint-disable-next-line no-useless-escape
  let domain = req.headers.referer.match(/^(\w+:\/\/)?([^\/]+)/i)
  domain = domain ? domain[2].split(':')[0].split('.').slice(-2).join('.') : null
  console.log(domain)

  // User.find({}, { _id: 1, name: 1, email: 1, identity: 1 }).then((users) => {
  User.find({}, {}).then((users) => {
    if (!users) {
      return res.status(400).json('沒有任何使用者資料')
    }
    res.json(users)
  })
})

// $router post api/user/edit/:id
// @desc   編輯訊息接口
// @access private
// 使用 hander 要驗證 token
// 有看到 post 就代表他會使用到 body 傳遞 數據 {}
// 有看到 /:id 就代表要從 params 接收一個 id 進來
// 功能：更新使用者資料
router.post('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const userFields = {}

  // if (req.body.type) materialClassFields.type = req.body.type
  // if (req.body.name) materialClassFields.name = req.body.name
  // if (req.body.describe) materialClassFields.describe = req.body.describe

  console.log(req.body)

  for (const prop in req.body) {
    userFields[prop] = req.body[prop]
  }

  console.log(typeof userFields.activated)

  // res.json('msg:material is works')

  User.findByIdAndUpdate({ _id: req.params.id }, { $set: userFields }, { new: true }).then((user) => res.json(user))
})
// $router post api/user/promossion/:id
// @desc   取得單一使用者的權限
// @access private
// 使用 hander 要驗證 token
// 有看到 post 就代表他會使用到 body 傳遞 數據 {}
// 有看到 /:id 就代表要從 params 接收一個 id 進來
// 功能：更新使用者資料
router.post('/permission', passport.authenticate('jwt', { session: false }), (req, res) => {
  // const userFields = {}

  // if (req.body.type) materialClassFields.type = req.body.type
  // if (req.body.name) materialClassFields.name = req.body.name
  // if (req.body.describe) materialClassFields.describe = req.body.describe

  const query = { _id: req.body._id }
  const options = {
    'permission.permission_list': 1
  }
  console.log('permission 提取權限中')
  User.findOne(query, options)
    .then((permission) => {
      if (!permission) {
        return res.status(400).json('無此使用者')
      }
      // console.log(user)
      res.json(permission)
      console.log('permission 提取權限完畢')
    })
    .catch((err) => {
      res.status(404).json(err)
    })
})

// $router delete api/user//delete/:id
// @desc   刪除訊息接口
// @access private
// 選擇 delete
// 使用 hander 要驗證 token
// body 要放編輯的資料 key:value
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  User.findOneAndRemove({ _id: req.params.id })
    .then((user) => res.json(user))
    .catch((_err) => res.status(404).json('刪除失敗'))
})

// $router get api/user/name-and-id
// @desc   取得所有的 cumtomer 的資料
// @access private
// 使用 hander 要驗證 token
router.get('/name-and-id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const query = {}
  const options = {
    _id: 1,
    name: 1,
    'permission.quotation_authority.inquire': 1
  }
  User.find(query, options)
    // .sort({ type: 1 })
    .then((users) => {
      if (!users) {
        return res.status(400).json('沒有任何業務資料')
      }
      res.json(users)
    })
    .catch((err) => {
      res.status(404).json(err)
    })
})
// ***************************************** user 的 api 結束 *****************************************

// ***************************************** user title 的 api 開始 *****************************************
// $router post api/user/title/add
// @desc   創建訊息接口
// @access private
// 使用 hander 要驗證 token
// 使用 body 要放創建的資料 type name
router.post('/title/add', passport.authenticate('jwt', { session: false }), (req, res) => {
  const userTitleFields = {}

  // 傳送過來的資料不見得會跟 schema 會一樣
  if (req.body.type) userTitleFields.type = req.body.type
  if (req.body.name) userTitleFields.name = req.body.name

  // console.log(categoriesFields)
  UserTitle.findOne({ name: req.body.name }).then((userTitle) => {
    if (userTitle) {
      return res.status(400).json('此客戶分類已經存在')
    } else {
      new UserTitle(userTitleFields)
        .save()
        .then((userTitle) => {
          res.json(userTitle)
        })
        .catch((err) => {
          res.status(404).json(err)
        })
    }
  })
})

// $router get api/user/title
// @desc   取得所有的 cumtomerClass 的資料
// @access private
// 不需要驗證 passport
router.get(
  '/title',
  // passport.authenticate('jwt', { session: false }),  不需要驗證
  (req, res) => {
    console.log('有喔')
    UserTitle.find()
      .sort({ type: 1 })
      .then((UserTitles) => {
        if (!UserTitles) {
          return res.status(400).json('沒有任何內容')
        }
        res.json(UserTitles)
      })
      .catch((err) => {
        res.status(404).json(err)
      })
  }
)

// $router post api/user/title/edit/:id
// @desc   編輯訊息接口
// @access private
// 使用 hander 要驗證 token
// 有看到 post 就代表他會使用到 body 傳遞 數據 {}
// 有看到 /:id 就代表要從 params 接收一個 id 進來
router.post('/title/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const userTitleFields = {}
  console.log(req.params)
  if (req.body.type) userTitleFields.type = req.body.type
  if (req.body.name) userTitleFields.name = req.body.name

  UserTitle.findByIdAndUpdate({ _id: req.params.id }, { $set: userTitleFields }, { new: false }).then((userTitle) =>
    res.json(userTitle)
  )
})

// $router delete api/user/title/delete/:id
// @desc   刪除訊息接口
// @access private
// 選擇 delete
// 使用 hander 要驗證 token
// body 要放編輯的資料 key:value
router.delete('/title/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  UserTitle.findOneAndRemove({ _id: req.params.id })
    .then((userTitle) => res.json(userTitle))
    .catch((_err) => res.status(404).json('刪除失敗'))
})

// ***************************************** user title 的 api 結束 *****************************************

// 技術點，獲取IP存到 mongodb
// https://blog.csdn.net/Altaba/article/details/79067700

module.exports = router
