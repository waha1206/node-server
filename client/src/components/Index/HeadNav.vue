<template>
  <!-- <header class="head-nav"> -->
  <header class="w-full h-[60px]  p-[5px] bg-gray-700 text-white flex justify-between">
    <el-col :span="6" class="log-container">
      <img src="../../assets/logo.png" class="logo" alt="" />
      <span class="title">麥歐後台管理系統</span>
    </el-col>
    <el-col :span="6" class="">
      <div class="">
        <img :src="user.avatar" class="avatar" alt="" />
        <div class="welcome">
          <p class="name comename">歡迎</p>
          <p class="name avatarname">{{ user.name }}</p>
        </div>
        <span class="username">
          <!-- 下拉選單 -->
          <el-dropdown trigger="click" @command="setDialogInfo">
            <span class="el-dropdown-link">
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="info">個人資料</el-dropdown-item>
              <el-dropdown-item command="logout">登出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </div>
    </el-col>
  </header>
</template>

<script>
export default {
  name: 'head-nav',
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  methods: {
    setDialogInfo(cmdItem) {
      switch (cmdItem) {
        case 'info':
          this.showInfoList()
          break
        case 'logout':
          this.logout()
          break
      }
    },
    showInfoList() {
      if (this.$route.path == '/infoshow') return
      this.$router.push('/infoshow')
    },
    logout() {
      // 設置 vuex store 把 登入資料刪除，這邊也會順便把權限刪除清空
      this.$store.dispatch('clearCurrentState')
      // 清除 token
      localStorage.removeItem('eleToken')

      // 跳轉到登入頁面
      this.$router.push('/login')

      window.location.reload()
    }
  }
}
</script>

<style scoped>
.head-nav {
  width: 100%;
  height: 60px;
  min-width: 600px;
  padding: 5px;
  background: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
}
.logo-container {
  line-height: 60px;
  min-width: 400px;
}
.logo {
  height: 50px;
  width: 50px;
  margin-right: 5px;
  vertical-align: middle;
  display: inline-block;
}
.title {
  vertical-align: middle;
  font-size: 22px;
  font-family: 'Microsoft YaHei';
  letter-spacing: 3px;
}
.user {
  line-height: 60px;
  text-align: right;
  float: right;
  padding-right: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}
.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}
.comename {
  font-size: 12px;
}
.avatarname {
  color: #409eff;
  font-weight: bolder;
}
.username {
  cursor: pointer;
  margin-right: 5px;
}
.el-dropdown {
  color: #fff;
}
</style>
