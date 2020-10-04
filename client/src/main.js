import Vue from 'vue'
import App from './App.vue'
import axios from './http'
import moment from 'moment'

import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

import router from './router'
import store from './store'
// https://www.cnblogs.com/yck123/p/11212979.html
// 滑鼠事件控制台警告 - 使用的插件
import 'default-passive-events'

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.$axios = axios

moment.locale('zh-TW')
Vue.prototype.$moment = moment

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
