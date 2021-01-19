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
        <!-- 首頁 -->
        <router-link to="/home">
          <el-menu-item index="0">
            <i class="fa fa-margin fa-server"></i>
            <span slot="title">首頁</span>
          </el-menu-item>
        </router-link>
        <!-- 把下面的子分類 v-for 展示出來 -->
        <template v-for="item in items">
          <!-- 判斷權限要放在這邊 -v-permision 這個是第一層 先暫時拿掉，測試 children 中-->
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
              <!-- 判斷權限要放在這邊 -v-permision 這個是第二層 -->
              <!-- 這邊有個技術點，重新渲染 :key="componentKey" 透過改變 componentKey 的值，讓這個組件重新渲染-->
              <!-- 我這邊觀察了 permissionList 的數組變化，要是有異動，就會重新的把有權限的連結消失或是隱藏 -->
              <el-menu-item
                :index="citem.path"
                v-permission="citem.meta.permission"
                :key="componentKey"
              >
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
import { mapGetters } from 'vuex'

export default {
  name: 'leftmenu',
  data() {
    return {
      componentKey: 0,
      items: [
        {
          icon: 'fa-money',
          name: '資料庫增刪查找',
          path: 'fund',
          children: [
            {
              path: 'fundlist',
              name: 'DEMO表單使用',
              meta: {
                permission: ['']
              }
            },
            {
              path: 'customer-manager',
              name: '客戶資料管理',
              meta: {
                permission: ['customer_authority_r']
              }
            },
            {
              path: 'suppliers-manager',
              name: '供應商管理',
              meta: {
                permission: ['supplier_authority_r']
              }
            },
            {
              path: 'categories-manager',
              name: '商品建構管理',
              meta: {
                permission: ['product_authority_r']
              }
            },
            {
              path: 'user-manager',
              name: '使用者管理',
              meta: {
                permission: ['user_authority_r']
              }
            },
            {
              path: 'materials-manager',
              name: '原物料管理',
              meta: {
                permission: ['material_authority_r']
              }
            },
            {
              path: 'process-manager',
              name: '加工費用管理',
              meta: {
                permission: ['']
              }
            },
            {
              path: 'product-template-manager',
              name: '公版商品管理',
              meta: {
                permission: ['']
              }
            },
            {
              path: 'product-profit-manager',
              name: '商品利潤管理',
              meta: {
                permission: ['']
              }
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
              name: '個人資料',
              meta: {
                permission: ['']
              }
            },
            {
              path: 'a',
              name: '管理所有用戶',
              meta: {
                permission: ['']
              }
            }
          ]
        },
        {
          icon: 'fa-asterisk',
          name: '程式測試區',
          path: 'b',
          children: [
            {
              path: 'c',
              name: '檔案上傳練習',
              meta: {
                permission: ['']
              }
            },
            {
              path: 'd',
              name: '其他雜項',
              meta: {
                permission: ['XX']
              }
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['permissionList'])
  },
  // 監聽 permissionList，然後根據他的變化重新渲染
  // 重新渲染的方式 最好就是 在組件上面設定一個 :key 的值，然後觀察到資料有變化的時候
  // 去改變 :key 的值，這樣就可以重新渲染組件了，高招
  // 技術點出處 https://segmentfault.com/a/1190000038846881
  watch: {
    permissionList(newPL, oldPL) {
      this.componentKey += 1
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
.hide {
  display: none;
}
</style>
