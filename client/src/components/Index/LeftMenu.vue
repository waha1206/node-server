<template>
  <el-row class="menu_page">
    <el-col>
      <el-menu
        mode="vertical"
        background-color="#324057"
        text-color="#fff"
        active-text-color="#409eff"
        class="el-menu-vertical-demo"
      >
        <router-link to="/home">
          <el-menu-item index="0">
            <i class="fa fa-margin fa-server"></i>
            <span slot="title">首頁</span>
          </el-menu-item>
        </router-link>
        <template v-for="item in items">
          <el-submenu v-if="item.children" :index="item.path" :key="item.path">
            <template slot="title">
              <i :class="'fa fa-margin ' + item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </template>
            <router-link
              v-for="(citem, cindex) in item.children"
              :to="citem.path"
              :key="cindex"
            >
              <el-menu-item :index="citem.path">
                <span slot="title">{{ citem.name }}</span>
              </el-menu-item>
            </router-link>
          </el-submenu>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'leftmenu',
  data() {
    return {
      items: [
        {
          icon: 'fa-money',
          name: '資料庫增刪查找',
          path: 'fund',
          children: [
            {
              path: 'fundlist',
              name: 'DEMO表單使用'
            },
            {
              path: 'customer-manager',
              name: '客戶資料管理'
            },
            {
              path: 'categories-manager',
              name: '商品分類管理'
            },
            {
              path: 'user-manager',
              name: '使用者管理'
            },
            {
              path: 'material-manager',
              name: '原物料管理'
            },
            {
              path: 'process-manager',
              name: '加工費用管理'
            },
            {
              path: 'product-template-manager',
              name: '公版商品管理'
            },
            {
              path: 'product-profit-manager',
              name: '商品利潤管理'
            }
          ]
        },
        {
          icon: 'fa-asterisk',
          name: '權限管理',
          path: 'info',
          children: [
            {
              path: 'infoshow',
              name: '個人資料'
            },
            { path: 'a', name: '管理所有用戶' }
          ]
        },
        {
          icon: 'fa-asterisk',
          name: '程式測試區',
          path: 'b',
          children: [
            {
              path: 'c',
              name: '檔案上傳練習'
            },
            { path: 'd', name: '其他雜項' }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
.menu_page {
  position: fixed;
  top: 71px;
  left: 0;
  min-height: 100%;
  background-color: #324057;
  z-index: 99;
}
.el-menu {
  border: none;
}
.fa-margin {
  margin-right: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}

.hiddenDropdown,
.hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style>
