const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const app = express()

// 引入 users.js
const users = require('./routes/api/users.js')
const profiles = require('./routes/api/profiles.js')
const customers = require('./routes/api/customers')

// db config
const db = require('./config/keys').mongoURI

// 使用 body-parser 中間件
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('Hello World')
})
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB Connented'))
  .catch((err) => console.log(err))

// 初始化 passport
app.use(passport.initialize())
require('./config/passport')(passport) // 直接把 passoprt 傳到 passport.js 裡面去寫程式，做到真正的數據分離，代碼抽離

const port = process.env.PORT || 5000

// 使用 routes 下的 api 下的 users 其實在上面就引入了  const users = require("./routes/api/users.js")
app.use('/api/user/', users)
app.use('/api/profiles/', profiles)
app.use('/api/customer', customers)

// 監聽
app.listen(port, () => {
  console.log(`http://127.0.0.1:${port}`)
})
