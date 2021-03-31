const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const app = express()

// 引入 users.js
const users = require('./routes/api/users.js')
const profiles = require('./routes/api/profiles.js')
const customers = require('./routes/api/customers')
const categories = require('./routes/api/categories')
const materials = require('./routes/api/materials')
const materialClass = require('./routes/api/materialClass')
const suppliers = require('./routes/api/suppliers')
const supplierClass = require('./routes/api/supplierClass')
const materialGroup = require('./routes/api/materialGroup')
const quotation = require('./routes/api/quotation')

// db config
const db = require('./config/keys').mongoURI

// 使用 body-parser 中間件
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('Hello World')
})

// 設定上傳文件的最大 kbs
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

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
app.use('/api/customer/', customers)
app.use('/api/categories/', categories)
app.use('/api/material/', materials)
app.use('/api/material-class/', materialClass)
app.use('/api/supplier/', suppliers)
app.use('/api/supplier-class/', supplierClass)
app.use('/api/material-group/', materialGroup)
app.use('/api/quotation/', quotation)

// 監聽
app.listen(port, () => {
  console.log(`http://127.0.0.1:${port}`)
})
