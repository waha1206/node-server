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

// 局部註冊的自定義指令，把值轉換成為有千位符號的逗號
// https://medium.com/itsems-frontend/vue-custom-directives-c991ce456748
// 使用方式 → <span id="number" v-price:currency="temp"></span>
Vue.directive('price', {
  bind: function(el, binding) {
    el.innerHTML = binding.value
      .toString()
      .replace(/^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/, function(
        all,
        pre,
        groupOf3Digital
      ) {
        return pre + groupOf3Digital.replace(/\d{3}/g, ',$&')
      })
  }
})

// 輸入數字轉加標點符號
// https://jsfiddle.net/mani04/bgzhw68m/
// 有個小BUG就是，要先把 this.value 用 parseFloat 轉換過，後面才可以使用 .toFixed()
// 使用方式 <my-currency-input type="registered_capital" v-model="formData.registered_capital" ></my-currency-input>
Vue.component('my-currency-input', {
  props: ['value'],
  template: `
			<div>
					<input type="text" v-model="displayValue" @blur="isInputActive = false" @focus="isInputActive = true"/>
			</div>`,
  data: function() {
    return {
      isInputActive: false
    }
  },
  computed: {
    displayValue: {
      get: function() {
        if (this.isInputActive) {
          // Cursor is inside the input field. unformat display value for user
          return this.value.toString()
        } else {
          console.log(this)
          // User is not modifying now. Format display value for user interface
          return (
            '$ ' +
            parseFloat(this.value)
              .toFixed(2)
              .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
          )
        }
      },
      set: function(modifiedValue) {
        // Recalculate value after ignoring "$" and "," in user input
        let newValue = parseFloat(modifiedValue.replace(/[^\d\.]/g, ''))
        // Ensure that it is not NaN
        if (isNaN(newValue)) {
          newValue = 0
        }
        // Note: we cannot set this.value as it is a "prop". It needs to be passed to parent component
        // $emit the event so that parent component gets it
        this.$emit('input', newValue)
      }
    }
  }
})

moment.locale('zh-TW')
Vue.prototype.$moment = moment

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
