<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">麥歐有限公司管理後台</span>
        <!-- ref 協助獲取表單的內容  這個點擊事件會使用到ref @click="submitForm('registerForm')"-->
        <!-- prop 屬性名稱 :model.prop  這邊意思是 registerUser.name-->
        <!-- :rules 透過此屬性傳入驗證的規則，這個屬性需要寫在 data() 裡面-->
        <el-form
          :model="registerUser"
          :rules="rules"
          ref="registerForm"
          label-width="80px"
          class="registerForm"
        >
          <el-form-item label="用戶名" prop="name">
            <el-input
              v-model="registerUser.name"
              placeholder="請輸入用戶名稱"
            ></el-input>
          </el-form-item>
          <el-form-item label="email" prop="email">
            <el-input
              v-model="registerUser.email"
              placeholder="請輸入email"
            ></el-input>
          </el-form-item>
          <el-form-item label="密碼" prop="password">
            <el-input
              type="password"
              v-model="registerUser.password"
              placeholder="請輸入密碼"
            ></el-input>
          </el-form-item>
          <el-form-item label="確認密碼" prop="password2">
            <el-input
              type="password"
              v-model="registerUser.password2"
              placeholder="請確認密碼"
            ></el-input>
          </el-form-item>

          <el-form-item label="選擇職務" prop="identity">
            <el-select
              v-model="registerUser.identity"
              placeholder="請選擇您的職務"
              filterable
            >
              <el-option
                v-for="(item, index) in userTitleOptions"
                :key="index"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              class="submit_btn"
              @click="submitForm('registerForm')"
              >註冊</el-button
            >
          </el-form-item>
          <div class="tiparea">
            <p>
              如果已經有帳號請直接 <router-link to="/login">登入</router-link>
            </p>
          </div>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'register',
  component: {},
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.registerUser.password) {
        callback(new Error('兩次輸入密碼不一致!'))
      } else {
        callback()
      }
    }
    return {
      // 取得職務的清單
      userTitleData: [],
      userTitleOptions: [],
      registerUser: {
        name: '',
        email: '',
        password: '',
        password2: '',
        identity: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '用戶名稱不能為空',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 30,
            message: '長度在2到30個字之間',
            trigger: 'blur'
          }
        ],
        email: [
          {
            type: 'email',
            required: true,
            message: 'email格式不正確',
            trigger: 'blur'
          }
        ],
        identity: [
          {
            required: true,
            message: '請選擇您的職務',
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
        ],
        password2: [
          {
            required: true,
            message: '確認密碼不能為空',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 30,
            message: '密碼字元數最少為 6，最多 30',
            trigger: 'blur'
          },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUserTitleData()
  },
  methods: {
    getUserTitleData() {
      this.$axios
        .get('/api/user/title')
        .then((res) => {
          this.userTitleOptions = []
          this.userTitleData = [...res.data]
          res.data.forEach((item) => {
            let obj = {}
            obj.value = item._id
            obj.label = item.name
            this.userTitleOptions.push(obj)
          })
          console.log(res.data, this.userTitleOptions)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post('/api/user/register', this.registerUser)
            .then((res) => {
              // 註冊成功
              this.$message({
                message: '帳號註冊成功！',
                type: 'success'
              })
            })
          // 跳轉到 login 的頁面
          this.$router.push('login')
        } else {
          console.log(valid)
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.register {
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
  top: 10%;
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
.registerForm {
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
