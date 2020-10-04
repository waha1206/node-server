import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import NotFond from '../views/404.vue'
import Home from '../views/Home.vue'
import InfoShow from '../views/InfoShow.vue'
import FundList from '../views/FundList.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
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
          component: FundList
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

// 路由守衛 --- 要在這邊實現
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false
  if (to.path == '/login' || to.path == '/register') {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})

export default router
