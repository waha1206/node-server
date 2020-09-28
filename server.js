const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const app = express()

// 引入 users.js
const users = require("./routes/api/users.js")

// db config
const db = require("./config/keys").mongoURI

// 使用 body-parser 中間件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

app.get("/", (req,res)=>{
	res.send("Hello World")
})
mongoose.connect(db
,{useNewUrlParser: true,
	useUnifiedTopology: true })
.then(()=>console.log("MongoDB Connented"))
.catch(err=>console.log(err))


const port = process.env.PORT || 5000

// 使用 routes 下的 api 下的 users 其實在上面就引入了  const users = require("./routes/api/users.js")
app.use("/api/user/", users)

// 監聽
app.listen(port, ()=>{
	console.log(`http://127.0.0.1:${port}`)
})