import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import NotFond from '../views/404.vue'
import Home from '../views/Home.vue'
import InfoShow from '../views/InfoShow.vue'
import FundList from '../views/FundList.vue'
import store from '../store'
import { includePermission } from '../utils/permission'

// 阻止重複觸發同一個路由 出處為 https://blog.csdn.net/luer_LJS/article/details/108362563
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
} // 阻止重複觸發同一個路由結束

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      // 預設首頁要使用'/' 或 redirect指令，不然網頁會空白
      path: '/',
      redirect: '/index'
      // component:""
    },
    {
      path: '/index',
      // name: 'index', --- 這裡要刪除掉 副路由的 name 屬性
      // 要有默認子路由，那，副路由的名字 name 得去掉
      // path:'/' 的路由是子路由，這個例子來說是這樣，所以他不能有 name 屬性，要碼刪掉這個子路由的 name 屬性，要麼設置他的path 不為 '/'
      component: Index,
      meta: {
        permission: ['ACTIVATED']
      },
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/',
          component: Home
        },
        {
          path: '/infoshow',
          name: 'infoshow',
          component: InfoShow
        },
        {
          path: '/fundlist',
          name: 'fundlist',
          component: FundList,
          meta: {
            permission: ['customer_authority_r', 'other']
          }
        },
        {
          path: '/customer-manager', // 客戶資料管理
          name: 'customer-manager',
          component: () => import('../views/managers/CustomerManager.vue'),
          meta: {
            permission: ['customer_authority_r']
          }
        },
        {
          path: '/suppliers-manager', // 供應商管理
          name: 'suppliers-manager',
          component: () => import('../views/managers/SuppliersManager.vue'),

          meta: {
            permission: ['supplier_authority_r']
          }
        },
        {
          path: '/user-manager', // 使用者管理
          name: 'user-manager',
          component: () => import('../views/managers/UserManager.vue'),
          meta: {
            permission: ['user_authority_r']
          }
        },
        {
          path: '/setting', // 使用者管理
          name: 'setting',
          component: () => import('../views/managers/Setting.vue'),
          meta: {
            permission: ['user_authority_r']
          }
        },
        {
          path: '/quotation-manager', // 報價單管理
          // name: 'quotation-manager',
          component: () => import('../views/managers/QuotationManager.vue'),

          meta: {
            permission: ['quotation_authority_r']
          },
          children: [
            {
              path: '/',
              name: 'quotation-level-one',
              component: () =>
                import('../components/QuotationManager/QuotationLevelOne.vue'),
              meta: {
                title: '第一層分類',
                class: 'quotation',
                permission: ['quotation_authority_r']
              }
            },
            {
              path: '/quotation-level-two/:id',
              name: 'quotation-level-two',
              component: () =>
                import('../components/QuotationManager/QuotationLevelTwo.vue'),
              meta: {
                title: '第二層分類',
                class: 'quotation',
                permission: ['quotation_authority_r']
              }
            },
            {
              path: '/quotation-level-three/:id',
              name: 'quotation-level-three',
              component: () =>
                import(
                  '../components/QuotationManager/QuotationLevelThree.vue'
                ),
              meta: {
                title: '第三層分類',
                class: 'quotation',
                permission: ['quotation_authority_r']
              }
            },
            {
              path: '/quotation-level-four',
              name: 'quotation-level-four',
              component: () =>
                import('../components/QuotationManager/QuotationLevelFour.vue'),
              meta: {
                title: '選中的商品',
                class: 'quotation',
                permission: ['quotation_authority_r']
              }
            }
          ]
        },
        {
          path: '/categories-manager', // 商品建構管理
          name: 'categories-manager',
          component: () => import('../views/managers/CategoriesManager.vue'),
          meta: {
            permission: ['product_authority_r']
          }
        },
        {
          path: '/materials-group-manager', // 原物料組管理
          name: 'materials-manager',
          component: () =>
            import('../views/managers/MaterialsGroupManager.vue'),
          meta: {
            permission: ['material_authority_r']
          }
        },
        {
          path: '/materials-manager', // 原物料管理
          name: 'materials-manager',
          component: () => import('../views/managers/MaterialsManager.vue'),
          meta: {
            permission: ['material_authority_r']
          }
        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },

    {
      path: '*',
      name: '/404',
      component: NotFond
    }
  ]
})
// route = 路線    router = 路由器
// 路由守衛 --- 要在這邊實現
// 說明範例，如何做權限管理 https://codepen.io/CHUPAIWANG/pen/LYZQaXr
router.beforeEach((to, from, next) => {
  console.log('我是全域前置守衛 beforeEach')

  const isLogin = localStorage.eleToken ? true : false
  if (to.path == '/login' || to.path == '/register') {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})

router.beforeResolve(async (to, from, next) => {
  // console.log(
  //   '解析守衛：跳轉前觸發，但是在beforeEach後觸發，所有元件內守衛與非同步路由元件被解析後才呼叫'
  // )
  console.log('我是解析守衛，負責判斷有沒有權限在這邊處理')
  // await store.dispatch('getPermissionList')
  const { permission } = to.meta
  if (includePermission(permission)) {
    // console.log('有權限')
    next()
  } else {
    // 沒有權限就會禁止跳轉，先做到這邊吧
    // console.log('沒有權限')
    next('/')
  }
})

router.afterEach((to, from, next) => {
  // console.log(
  //   '後置鉤子，導航被確認後觸發，所以被稱為鉤子，不是守衛，因為跳轉後觸發，所以沒有next()'
  // )
})

export default router
