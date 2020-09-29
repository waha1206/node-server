### 驗證 token

1. 假定用戶拿到 token，下面是基本的程式架構

```javascript
// $router POST api/users/current
// @desc   return current user
// @access Private

router.get("/current", "驗證token",(req, res)=>{
	res.json({msg:"success"})
})
```

2. 再來我們需要一個 passport 插件跟 passport-jwt 共兩個插件  [passport-jwt 官網](https://www.npmjs.com/package/passport-jwt)  、 [passport](https://www.npmjs.com/package/passport)

```shell
npm install passport-jwt passport
```

3.  server.js 主程式入口引入

```javascript
const passport = require("passport")
```

4. 初始化 passport

```javascript
app.use(passport.initialize());
```

5. 做代碼抽離跟數據分離 - 建立檔案

```javascript
到 config 目錄建立 passport.js
```

6. 做代碼抽離開數據分離 - 導入中間件到該檔案中

```javascript
require("./config/passport.js")(passport)
```

7. passport.js 內容

```javascript
const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require("mongoose") // 要用到 mongoose 是因為要用到 User (資料結構)
const User = mongoose.model("users")
const keys = require("./keys")

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport =>{
	passport.use(new JwtStrategy(opts, (jwt_payload, done)=> {
		// console.log(jwt_payload)
		User.findById(jwt_payload.id)
		.then(user=>{
			if(user){
				return done(null,user)
			}
			return done(null, false)
		}).catch(err=>console.log(err))
}));
}
```

8. user.js 內容

```javascript
const passport = require("passport")

router.get("/current", passport.authenticate("jwt", {session:false}),(req, res)=>{
	// res.json(req.user) // 不需要把整個 user 資訊返回
	res.json({
		id:req.user.id,
		name:req.user.name,
		email:req.user.email
	})
})
```

