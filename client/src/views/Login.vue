<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">麥歐有限公司管理後台</span>
        <!-- ref 協助獲取表單的內容  這個點擊事件會使用到ref @click="submitForm('registerForm')"-->
        <!-- prop 屬性名稱 :model.prop  這邊意思是 registerUser.name-->
        <!-- :rules 透過此屬性傳入驗證的規則，這個屬性需要寫在 data() 裡面-->
        <el-form
          :model="loginUser"
          :rules="rules"
          ref="loginForm"
          label-width="80px"
          class="loginForm"
        >
          <el-form-item label="email" prop="email">
            <el-input
              v-model="loginUser.email"
              placeholder="請輸入email"
            ></el-input>
          </el-form-item>
          <el-form-item label="密碼" prop="password">
            <!-- @keyup.13.native="enter" el-input 的監聽事件被 vue
            隱藏了，如果要使用原生的監聽事件，要在後面加上 native -->
            <el-input
              @keyup.enter.native="submitForm('loginForm')"
              type="password"
              v-model="loginUser.password"
              placeholder="請輸入密碼"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              class="submit_btn"
              @click="submitForm('loginForm')"
              >登入</el-button
            >
          </el-form-item>
          <div class="tiparea">
            <p>如果沒帳號請先 <router-link to="/register">註冊</router-link></p>
          </div>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode'

export default {
  name: 'register',
  component: {},
  data() {
    return {
      loginUser: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          {
            type: 'email',
            required: true,
            message: 'email格式不正確',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密碼不能為空',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 30,
            message: '密碼字元數最少為 6，最多 30',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/api/user/login', this.loginUser).then((res) => {
            // 註冊成功
            this.$message({
              message: '登入成功！',
              type: 'success'
            })
            // 取得 token 並且放到 application 下面的 localstorage
            // res.json 從伺服器端發送過來，在  client 接收到後，要去解析 res.data 因為，返回的資料會放到裡面
            // 我們這次 server 端返回的是  {success:true , token:****************}

            const { token } = res.data
            // 上面等同於  const token = res.data.token

            // 把 token 存到 ls 裡面
            localStorage.setItem('eleToken', token)

            // 解析 token
            const decoded = jwt_decode(token)
            console.log('decoded', decoded)

            // token 存儲到 vuex 中
            this.$store.dispatch('setIsAutnenticated', !this.isEmpty(decoded))
            this.$store.dispatch('setUser', decoded)

            this.$router.push('/index')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
      )
    }
  }
}
</script>

<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 20%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: 'Microsoft YaHei';
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>
